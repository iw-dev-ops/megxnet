package net.megx.security.filter.impl;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.megx.security.auth.Authentication;
import net.megx.security.auth.SecurityContext;
import net.megx.security.auth.web.WebContextUtils;
import net.megx.security.auth.web.WebLoginHandler;
import net.megx.security.auth.SecurityException;
import net.megx.security.filter.StopFilterException;
import net.megx.utils.OSGIUtils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class WebLoginSecurity extends BaseSecurityEntrypoint{

	private Log log = LogFactory.getLog(getClass());
	
	private WebLoginHandler webLoginHandler;
	
	@Override
	public void doFilter(HttpServletRequest request,
			HttpServletResponse response) throws IOException, ServletException,
			SecurityException, StopFilterException {
		if(webLoginHandler == null){
			throw new SecurityException("WebAuthenticationHandler service is not available yet!",HttpServletResponse.SC_SERVICE_UNAVAILABLE);
		}
		SecurityContext context = WebContextUtils.getSecurityContext(request);
		if(context != null){
			context.clearAuthentication();
		}
		Authentication authentication = webLoginHandler.createAuthentication(request);
		
		if(authentication != null){
			
			saveAuthentication(authentication, request);
			String redirectURL = context.getLastRequestedURL();
			if(redirectURL != null){
				log.debug(" ### Redirect ===> " + redirectURL);
				context.storeLastRequestedURL(null);
				response.sendRedirect(request.getContextPath() + redirectURL);
				throw new StopFilterException();
			}
		}
	}

	@Override
	protected void doInitialize() {
		OSGIUtils.requestService(WebLoginHandler.class.getName(), this.context, new OSGIUtils.OnServiceAvailable<WebLoginHandler>() {
			@Override
			public void serviceAvailable(String serviceName, WebLoginHandler service) {
				WebLoginSecurity.this.webLoginHandler = service;
			}
			
		});
	}

}
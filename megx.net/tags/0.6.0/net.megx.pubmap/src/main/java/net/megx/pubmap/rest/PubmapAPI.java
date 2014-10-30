package net.megx.pubmap.rest;

import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import net.megx.megdb.exceptions.DBGeneralFailureException;
import net.megx.megdb.pubmap.PubMapService;
import net.megx.model.pubmap.Article;
import net.megx.ws.core.BaseRestService;
import net.megx.ws.core.Result;

@Path("v1/pubmap/v1.0.0")
public class PubmapAPI extends BaseRestService {

	private PubMapService service;

	public PubmapAPI(PubMapService service) {
		this.service = service;
	}

	@Path("article")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String storeArticle(@FormParam("article") String articleJson,
			@Context HttpServletRequest request) {
		try {
			if (articleJson == null) {
				return toJSON(new Result<String>(true, "article not provided",
						"bad-request"));
			}
			Article article = gson.fromJson(articleJson, Article.class);
			String articleCreator;

			article.setArticleXML(article.getArticleXML()
					.replaceAll("&lt;", "<").replaceAll("&gt;", ">"));
			article.setCreated(Calendar.getInstance().getTime());

			if (request.getUserPrincipal() != null) {
				articleCreator = request.getUserPrincipal().getName();
			} else {
				articleCreator = "anonymous";
			}
			article.setUserName(articleCreator);

			service.storeArticle(article);

			return toJSON(article);
		} catch (DBGeneralFailureException e) {
			log.error("Could not store article:" + e);
			return toJSON(handleException(e));
		} catch (Exception e) {
			log.error("Server error:" + e);
			return toJSON(handleException(e));
		}
	}

}
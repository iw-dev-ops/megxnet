package net.megx.ws.blast;

import javax.jcr.RepositoryException;

import net.megx.chon.core.model.ModuleUtils;
import net.megx.ws.blast.mock.MockBlast;
import net.megx.ws.blast.rest.BlastRestService;
import net.megx.ws.blast.ui.BlastExtension;
import net.megx.ws.blast.ui.module.BlastProcessor;

import org.chon.cms.core.JCRApplication;
import org.chon.cms.core.ResTplConfiguredActivator;
import org.chon.cms.model.ContentModel;
import org.chon.web.RegUtils;
import org.osgi.framework.BundleContext;

public class Activator extends ResTplConfiguredActivator {

	@Override
	protected void registerExtensions(JCRApplication app) {
		BlastService blastService = MockBlast.getInstance();
		
		BundleContext bundleContext = getBundleContext();
		ContentModel contentModel = app.createContentModelInstance(getName());
		
		BlastProcessor blastProcessor = new BlastProcessor(blastService);
		ModuleUtils.registerModuleInstance(bundleContext, contentModel, "megx.module.blast", blastProcessor);
		
		app.regExtension("blast", new BlastExtension(blastService));
		
		BlastRestService blastRestService = new BlastRestService(blastService);
		RegUtils.reg(getBundleContext(), BlastRestService.class.getName(), blastRestService, null);
		
		try {
			contentModel.getSession().save();
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		contentModel.getSession().logout();
	}

	@Override
	protected String getName() {
		return "net.megx.ws.blast";
	}
	
}
/*
 * Copyright 2011 Max Planck Institute for Marine Microbiology 
 * 
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


package net.megx.ws.mixs.service;

import java.util.List;
import java.util.Map;

import net.megx.model.ws.mixs.ChecklistItemDetails;
import net.megx.model.ws.mixs.EnvPackage;
import net.megx.model.ws.mixs.ExistingChecklists;
import net.megx.model.ws.mixs.IndependentMetadataItem;

public interface MixsWsService {
	
	public List<IndependentMetadataItem> getIndependentMetadataItems(Map<Object, Object> map, String version)
			throws Exception;

	public List<ChecklistItemDetails> getGeneralSpecificationItems(
			String clNameEnvPkg, String version) throws Exception;

	public List<ChecklistItemDetails> getCombinedChecklistSpecificationItems(
			String clName, String envPackage, String version) throws Exception;

	public ChecklistItemDetails getParticularSpecificationItem(String itemName,
			String clNameEnvPkg, String version) throws Exception;
	
	public List<ExistingChecklists> getExistingChecklists(String version)
			throws Exception; 
	
	public List<EnvPackage> getEnvPackagesList(String version) throws Exception;

}

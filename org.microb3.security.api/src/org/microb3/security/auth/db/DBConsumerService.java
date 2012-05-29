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


package org.microb3.security.auth.db;

import java.util.List;

import org.microb3.security.auth.Consumer;
import org.microb3.security.auth.ConsumerService;



public class DBConsumerService extends BaseDBService implements ConsumerService{
	
	//private ConsumerMapper mapper;
	
	//public void setMapper(ConsumerMapper mapper) {
	//	this.mapper = mapper;
	//}

	public Consumer getConsumer(final String name) throws Exception {
		//return mapper.getConsumerForName(name);
		return doInSession(new DBTask<ConsumerMapper, Consumer>() {

			@Override
			public Consumer execute(ConsumerMapper mapper) throws Exception {
				return mapper.getConsumerForName(name);
			}
			
		}, ConsumerMapper.class);
	}

	public Consumer getConsumerForKey(final String key) throws Exception {
		return doInSession(new DBTask<ConsumerMapper, Consumer>() {

			@Override
			public Consumer execute(ConsumerMapper mapper) throws Exception {
				return mapper.getConsumerForName(key);
			}
			
		}, ConsumerMapper.class);
	}

	
	public Consumer addConsumer(final Consumer consumer) throws Exception {
		
		return doInTransaction(new DBTask<ConsumerMapper, Consumer>() {
			@Override
			public Consumer execute(ConsumerMapper mapper) throws Exception {
				mapper.addConsumer(consumer);
				return null;
			}
			
		}, ConsumerMapper.class);
	}

	public Consumer getConsumerForKeyAndName(final String key, final String name)
			throws Exception {
		return doInSession(new DBTask<ConsumerMapper, Consumer>() {

			@Override
			public Consumer execute(ConsumerMapper mapper) throws Exception {
				return mapper.getConsumerForKeyAndName(key, name);
			}
			
		}, ConsumerMapper.class);
	}

	
	public void removeConsumer(final Consumer consumer) throws Exception {
		doInTransaction(new DBTask<ConsumerMapper, Consumer>() {
			@Override
			public Consumer execute(ConsumerMapper mapper) throws Exception {
				mapper.removeTokensForConsumer(consumer.getKey());
				mapper.removeConsumer(consumer);
				return null;
			}
			
		}, ConsumerMapper.class);
		
	}

	
	public Consumer updateConsumer(final Consumer consumer) throws Exception {
		return doInTransaction(new DBTask<ConsumerMapper, Consumer>() {
			@Override
			public Consumer execute(ConsumerMapper mapper) throws Exception {
				mapper.updateConsumer(consumer);
				 return mapper.getConsumerForName(consumer.getName());
			}
			
		}, ConsumerMapper.class);
	}

	public List<Consumer> getConsumersForUser(final String userId) throws Exception {
		return doInSession(new DBTask<ConsumerMapper, List<Consumer>>() {
			@Override
			public List<Consumer> execute(ConsumerMapper mapper)
					throws Exception {
				return mapper.getConsumersForUserId(userId);
			}
			
		}, ConsumerMapper.class);
	}

	
	
}

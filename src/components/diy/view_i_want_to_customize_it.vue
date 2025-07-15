<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce">
							<el-col v-if="$check_field('get','order_number') || $check_field('add','order_number') || $check_field('set','order_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="订单号" prop="order_number">
												<el-input id="order_number" v-model="form['order_number']" placeholder="请输入订单号"
							  v-if="(form['i_want_to_customize_it_id'] && $check_field('set','order_number')) || (!form['i_want_to_customize_it_id'] && $check_field('add','order_number'))" :disabled="true">
				  					</el-input>
					<div v-else-if="$check_field('get','order_number')">
						{{form['order_number']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','commodity_number') || $check_field('add','commodity_number') || $check_field('set','commodity_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商品编号" prop="commodity_number">
												<el-input id="commodity_number" v-model="form['commodity_number']" placeholder="请输入商品编号"
							  v-if="(form['i_want_to_customize_it_id'] && $check_field('set','commodity_number')) || (!form['i_want_to_customize_it_id'] && $check_field('add','commodity_number'))" :disabled="disabledObj['commodity_number_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','commodity_number')">
						{{form['commodity_number']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','name_of_commodity') || $check_field('add','name_of_commodity') || $check_field('set','name_of_commodity')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商品名称" prop="name_of_commodity">
												<el-input id="name_of_commodity" v-model="form['name_of_commodity']" placeholder="请输入商品名称"
							  v-if="(form['i_want_to_customize_it_id'] && $check_field('set','name_of_commodity')) || (!form['i_want_to_customize_it_id'] && $check_field('add','name_of_commodity'))" :disabled="disabledObj['name_of_commodity_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','name_of_commodity')">
						{{form['name_of_commodity']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','category_name') || $check_field('add','category_name') || $check_field('set','category_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="分类名称" prop="category_name">
												<el-input id="category_name" v-model="form['category_name']" placeholder="请输入分类名称"
							  v-if="(form['i_want_to_customize_it_id'] && $check_field('set','category_name')) || (!form['i_want_to_customize_it_id'] && $check_field('add','category_name'))" :disabled="disabledObj['category_name_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','category_name')">
						{{form['category_name']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','commodity_cover') || $check_field('add','commodity_cover') || $check_field('set','commodity_cover')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商品封面" prop="commodity_cover">
								<el-upload :disabled="disabledObj['commodity_cover_isDisabled']" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_commodity_cover"
						:show-file-list="false" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','commodity_cover')) || (!form['i_want_to_customize_it_id'] && $check_field('add','commodity_cover'))">
						<img id="commodity_cover" v-if="form['commodity_cover']" :src="$fullUrl(form['commodity_cover'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-image v-else-if="$check_field('get','commodity_cover')" style="width: 100px; height: 100px"
						:src="$fullUrl(form['commodity_cover'])" :preview-src-list="[$fullUrl(form['commodity_cover'])]">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','production_date') || $check_field('add','production_date') || $check_field('set','production_date')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="生产日期" prop="production_date">
								<el-date-picker :disabled="disabledObj['production_date_isDisabled']" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','production_date')) || (!form['i_want_to_customize_it_id'] && $check_field('add','production_date'))" id="production_date"
						v-model="form['production_date']" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
					</el-date-picker>
					<div v-else-if="$check_field('get','production_date')">{{form['production_date']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','shelf_life_time') || $check_field('add','shelf_life_time') || $check_field('set','shelf_life_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="保质时间" prop="shelf_life_time">
								<el-date-picker :disabled="disabledObj['shelf_life_time_isDisabled']" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','shelf_life_time')) || (!form['i_want_to_customize_it_id'] && $check_field('add','shelf_life_time'))" id="shelf_life_time"
						v-model="form['shelf_life_time']" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<div v-else-if="$check_field('get','shelf_life_time')">{{form['shelf_life_time']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','business_user') || $check_field('add','business_user') || $check_field('set','business_user')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商家用户" prop="business_user">
													<el-select v-if="(form['i_want_to_customize_it_id'] && $check_field('set','business_user')) || (!form['i_want_to_customize_it_id'] && $check_field('add','business_user'))" id="business_user" v-model="form['business_user']" :disabled="disabledObj['business_user_isDisabled']">
							<el-option v-for="o in list_user_business_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
						<el-select v-else-if="$check_field('get','business_user')" id="business_user" v-model="form['business_user']" :disabled="true">
							<el-option v-for="o in list_user_business_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','customized_price') || $check_field('add','customized_price') || $check_field('set','customized_price')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="定制价格" prop="customized_price">
												<el-input id="customized_price" v-model="form['customized_price']" placeholder="请输入定制价格"
							  v-if="(form['i_want_to_customize_it_id'] && $check_field('set','customized_price')) || (!form['i_want_to_customize_it_id'] && $check_field('add','customized_price'))" :disabled="disabledObj['customized_price_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','customized_price')">
						{{form['customized_price']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','commodity_album') || $check_field('add','commodity_album') || $check_field('set','commodity_album')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商品相册" prop="commodity_album">
								<el-upload :disabled="disabledObj['commodity_album_isDisabled']" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" multiple action="" :http-request="upload_commodity_album"
						:show-file-list="false" v-if="((form['i_want_to_customize_it_id'] && $check_field('set','commodity_album')) || (!form['i_want_to_customize_it_id'] && $check_field('add','commodity_album'))) && !disabledObj['commodity_album_isDisabled']">
						<i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<div class="img_multiple" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','commodity_album')) || (!form['i_want_to_customize_it_id'] && $check_field('add','commodity_album'))">
						<div v-if="Array.isArray(form['commodity_album'])">
							<div class="img_block" v-for="(img,img_index) in form['commodity_album']" :key="img_index">
								<img id="commodity_album" :src="$fullUrl(img)" class="avatar"/>
								<span class="img_del" @click="delImg(img_index,'commodity_album')">x</span>
							</div>
						</div>
						<div class="img_block" v-else>
							<span>上传中...</span>
						</div>
					</div>
					<el-image v-else-if="$check_field('get','commodity_album')" style="width: 100px; height: 100px"
						:src="$fullUrl(item)" v-for="item in commodity_album_imgs" :preview-src-list="commodity_album_imgs">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','customized_commodity_quantity') || $check_field('add','customized_commodity_quantity') || $check_field('set','customized_commodity_quantity')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="定制商品数量" prop="customized_commodity_quantity">
								<el-input-number id="customized_commodity_quantity" v-model.number="form['customized_commodity_quantity']"
						v-if="(form['i_want_to_customize_it_id'] && $check_field('set','customized_commodity_quantity')) || (!form['i_want_to_customize_it_id'] && $check_field('add','customized_commodity_quantity'))" :disabled="disabledObj['customized_commodity_quantity_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','customized_commodity_quantity')">{{form['customized_commodity_quantity']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','total_price') || $check_field('add','total_price') || $check_field('set','total_price')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="总价格" prop="total_price">
												<el-input id="total_price" v-model="form['total_price']" placeholder="请输入总价格"
							  v-if="(form['i_want_to_customize_it_id'] && $check_field('set','total_price')) || (!form['i_want_to_customize_it_id'] && $check_field('add','total_price'))"  @focus="set_total_price()" :disabled="disabledObj['total_price_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','total_price')">
						{{form['total_price']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','custom_user') || $check_field('add','custom_user') || $check_field('set','custom_user')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="定制用户" prop="custom_user">
																		<div v-if="user_group !== '管理员'">
							{{ get_user_session_custom_user(form['custom_user']) }}
							<el-select v-if="(form['i_want_to_customize_it_id'] && $check_field('set','custom_user')) || (!form['i_want_to_customize_it_id'] && $check_field('add','custom_user'))" id="custom_user" v-model="form['custom_user']" :disabled="disabledObj['custom_user_isDisabled']">
								<el-option v-for="o in list_user_custom_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','custom_user')" id="custom_user" v-model="form['custom_user']" :disabled="true">
								<el-option v-for="o in list_user_custom_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="custom_user" v-model="form['custom_user']" :disabled="disabledObj['custom_user_isDisabled']">
							<el-option v-for="o in list_user_custom_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
																</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','user_name') || $check_field('add','user_name') || $check_field('set','user_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户姓名" prop="user_name">
												<el-input id="user_name" v-model="form['user_name']" placeholder="请输入用户姓名"
							  v-if="(form['i_want_to_customize_it_id'] && $check_field('set','user_name')) || (!form['i_want_to_customize_it_id'] && $check_field('add','user_name'))" :disabled="disabledObj['user_name_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','user_name')">
						{{form['user_name']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','delivery_date') || $check_field('add','delivery_date') || $check_field('set','delivery_date')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="交付日期" prop="delivery_date">
								<el-date-picker :disabled="disabledObj['delivery_date_isDisabled']" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','delivery_date')) || (!form['i_want_to_customize_it_id'] && $check_field('add','delivery_date'))" id="delivery_date"
						v-model="form['delivery_date']" type="date" placeholder="选择日期" :picker-options="delivery_date_disableOptions" value-format="yyyy-MM-dd">
					</el-date-picker>
					<div v-else-if="$check_field('get','delivery_date')">{{form['delivery_date']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','custom_audio') || $check_field('add','custom_audio') || $check_field('set','custom_audio')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="定制音频" prop="custom_audio">
												<el-upload v-if="(form['i_want_to_customize_it_id'] && $check_field('set','custom_audio')) || (!form['i_want_to_customize_it_id'] && $check_field('add','custom_audio'))" class="upload-demo" :file-list="custom_audio_FileList" :on-preview="openPreview" :on-remove="custom_audioRemove" drag
						action="" style="max-width: 300px;width: 100%;" :http-request="upload_custom_audio" :limit="1" accept="audio/ogg,audio/mp3,audio/wav">
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将音频拖到此处，或<em>点击上传</em></div>
					</el-upload>
					<div v-else-if="$check_field('get','custom_audio')">
						<el-button type="primary" @click="$download($fullUrl(form['custom_audio']),form['custom_audio'])">下载<i
								class="el-icon-download el-icon--right"></i></el-button>
					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','custom_video') || $check_field('add','custom_video') || $check_field('set','custom_video')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="定制视频" prop="custom_video">
												<el-upload v-if="(form['i_want_to_customize_it_id'] && $check_field('set','custom_video')) || (!form['i_want_to_customize_it_id'] && $check_field('add','custom_video'))" class="upload-demo" :file-list="custom_video_FileList" :on-preview="openPreview" :on-remove="custom_videoRemove" drag
						action="" style="max-width: 300px;width: 100%;" :http-request="upload_custom_video" :limit="1" accept="video/ogg,video/mp4,video/webm">
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
					</el-upload>
					<div v-else-if="$check_field('get','custom_video')">
						<el-button type="primary" @click="$download($fullUrl(form['custom_video']),form['custom_video'])">下载<i
								class="el-icon-download el-icon--right"></i></el-button>
					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','customized_accessories') || $check_field('add','customized_accessories') || $check_field('set','customized_accessories')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="定制附件" prop="customized_accessories">
												<div v-if="disabledObj['customized_accessories_isDisabled']">
						<div v-if="$check_field('get','customized_accessories')">
							<el-button type="primary" @click="$download($fullUrl(form['customized_accessories']),form['customized_accessories'])">下载<i
									class="el-icon-download el-icon--right"></i></el-button>
						</div>
					</div>
					<div v-else>
						<el-upload v-if="(form['i_want_to_customize_it_id'] && $check_field('set','customized_accessories')) || (!form['i_want_to_customize_it_id'] && $check_field('add','customized_accessories'))" class="upload-demo" :file-list="customized_accessories_FileList" :on-preview="openPreview" :on-remove="customized_accessoriesRemove" drag
								   action="" style="max-width: 300px;width: 100%;" :http-request="upload_customized_accessories" :limit="1" accept="">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						</el-upload>
						<div v-else-if="$check_field('get','customized_accessories')">
							<el-button type="primary" @click="$download($fullUrl(form['customized_accessories']),form['customized_accessories'])">下载<i
									class="el-icon-download el-icon--right"></i></el-button>
						</div>
					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','custom_picture') || $check_field('add','custom_picture') || $check_field('set','custom_picture')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="定制图片" prop="custom_picture">
								<el-upload :disabled="disabledObj['custom_picture_isDisabled']" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" multiple action="" :http-request="upload_custom_picture"
						:show-file-list="false" v-if="((form['i_want_to_customize_it_id'] && $check_field('set','custom_picture')) || (!form['i_want_to_customize_it_id'] && $check_field('add','custom_picture'))) && !disabledObj['custom_picture_isDisabled']">
						<i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<div class="img_multiple" v-if="(form['i_want_to_customize_it_id'] && $check_field('set','custom_picture')) || (!form['i_want_to_customize_it_id'] && $check_field('add','custom_picture'))">
						<div v-if="Array.isArray(form['custom_picture'])">
							<div class="img_block" v-for="(img,img_index) in form['custom_picture']" :key="img_index">
								<img id="custom_picture" :src="$fullUrl(img)" class="avatar"/>
								<span class="img_del" @click="delImg(img_index,'custom_picture')">x</span>
							</div>
						</div>
						<div class="img_block" v-else>
							<span>上传中...</span>
						</div>
					</div>
					<el-image v-else-if="$check_field('get','custom_picture')" style="width: 100px; height: 100px"
						:src="$fullUrl(item)" v-for="item in custom_picture_imgs" :preview-src-list="custom_picture_imgs">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','regional_location') || $check_field('add','regional_location') || $check_field('set','regional_location')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="地区位置" prop="regional_location">
								<el-cascader v-model="regional_location_region" :options="jsonData" :props="props" placeholder="请选择地区位置" clearable @change="handle_regional_location_change" v-if=" (form['i_want_to_customize_it_id'] && $check_field('set', 'regional_location')) || (!form['i_want_to_customize_it_id'] && $check_field('add', 'regional_location'))" :disabled="disabledObj['regional_location_isDisabled']" />
					<div v-else-if="$check_field('get','regional_location')">{{form['regional_location']}}</div>
							</el-form-item>
			</el-col>
								<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="审核状态" prop="examine_state">
					<el-select id="examine_state" v-model="form['examine_state']"
						v-if="(form['examine_state'] && $check_examine()) || (!form['examine_state'] && $check_examine())" :disabled="true">
						<el-option key="未审核" label="未审核" value="未审核"></el-option>
						<el-option key="已通过" label="已通过" value="已通过"></el-option>
						<el-option key="未通过" label="未通过" value="未通过"></el-option>
					</el-select>
					<div v-else>{{form["examine_state"]}}</div>
				</el-form-item>
			</el-col>
					<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="审核回复" prop="examine_reply">
					<el-input id="examine_reply" v-model="form['examine_reply']" placeholder="请输入审核回复"
						v-if="(form['examine_reply'] && $check_examine()) || (!form['examine_reply'] && $check_examine())" :disabled="true"></el-input>
					<div v-else>{{form["examine_reply"]}}</div>
				</el-form-item>
			</el-col>
	
	
	
		
		
						<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp" v-if="!form['source_user_id'] && 0 > 0">
			  <el-form-item label="评价反馈限次">
				<el-input id="limit_times" v-model="form['evaluation_feedback_limit_times']" placeholder="评价反馈限制次数，0为不限"
						  v-if="$check_option('/i_want_to_customize_it/view','can_limits')"
				></el-input>
				<div v-else-if="$check_action('/i_want_to_customize_it/view','get')" v-html="form['evaluation_feedback_limit_times']"></div>
			  </el-form-item>
			</el-col>
			
				<el-col :xs="24" :sm="24" :lg="24" class="el_form_item_warp">
				<el-form-item label="选座" prop="seat">
				  <div class="seat-wrapper">
					<div class="illustration">
					  <div class="illustration-img-wrapper unselected-seat"></div>
					  <span class="illustration-text">可选</span>
					  <div class="illustration-img-wrapper selected-seat"></div>
					  <span class="illustration-text">已选</span>
					  <div class="illustration-img-wrapper bought-seat"></div>
					  <span class="illustration-text">不可选</span>
					  <div class="btn-buy" @click="buySeat">选定座位</div>
					</div>
					<div class="inner-seat-wrapper" ref="innerSeatWrapper">
					  <div v-for="row in seatRow">
						<!--这里的v-if很重要，如果没有则会导致报错，因为seatArray初始状态为空-->
						<div
						  v-for="col in seatCol"
						  v-if="seatArray.length > 0"
						  class="seat"
						  :style="{ width: seatSize + 'px', height: seatSize + 'px' }"
						>
						  <div
							class="inner-seat"
							@click="handleChooseSeat(row - 1, col - 1)"
							v-if="seatArray[row - 1][col - 1] !== -1"
							:class="
							  seatArray[row - 1][col - 1] === 2
								? 'bought-seat'
								: seatArray[row - 1][col - 1] === 1
								? 'selected-seat'
								: 'unselected-seat'
							"
						  ></div>
						</div>
					  </div>
					</div>
				  </div>
				</el-form-item>
			</el-col>
	
	
	
	</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/i_want_to_customize_it/view','set') || $check_action('/i_want_to_customize_it/view','add')">
					<el-button type="primary" @click="submit()">提交</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
				<el-form-item v-else>
					<el-button @click="cancel()">返回</el-button>
				</el-form-item>
			</el-col>

		</el-form>
	</el-main>
</template>

<script>
	import mixin from "@/mixins/page.js";
                                        	import pcaCodeData from '@/assets/json/pca-code.json';
  
	export default {
		mixins: [mixin],
		data() {
			return {
				field: "i_want_to_customize_it_id",
				url_add: "~/api/i_want_to_customize_it/add?",
				url_set: "~/api/i_want_to_customize_it/set?",
				url_get_obj: "~/api/i_want_to_customize_it/get_obj?",
				url_upload: "~/api/i_want_to_customize_it/upload?",

				query: {
					"i_want_to_customize_it_id": 0,
				},

				form: {
								"order_number": this.$get_stamp(), // 订单号
										"commodity_number":  '', // 商品编号
										"name_of_commodity":  '', // 商品名称
										"category_name":  '', // 分类名称
										"commodity_cover":  '', // 商品封面
										"production_date":  '', // 生产日期
										"shelf_life_time":  '', // 保质时间
										"business_user": 0, // 商家用户
										"customized_price":  '', // 定制价格
										"commodity_album": [], // 商品相册
										"customized_commodity_quantity":  0, // 定制商品数量
										"total_price":  '', // 总价格
										"custom_user": 0, // 定制用户
										"user_name":  '', // 用户姓名
										"delivery_date":  '', // 交付日期
										"custom_audio":  '', // 定制音频
										"custom_video":  '', // 定制视频
										"customized_accessories":  '', // 定制附件
										"custom_picture": [], // 定制图片
										"regional_location":  '', // 地区位置
									"examine_state": "未审核",
							"examine_reply": "",
							"i_want_to_customize_it_id": 0, // ID
								"seat": "", // 座位
											"evaluation_feedback_limit_times": 0, // 评价反馈限制次数
										},
				disabledObj:{
								"order_number_isDisabled": false,
										"commodity_number_isDisabled": false,
										"name_of_commodity_isDisabled": false,
										"category_name_isDisabled": false,
										"commodity_cover_isDisabled": false,
										"production_date_isDisabled": false,
										"shelf_life_time_isDisabled": false,
										"business_user_isDisabled": false,
										"customized_price_isDisabled": false,
										"commodity_album_isDisabled": false,
					          			"customized_commodity_quantity_isDisabled": false,
										"total_price_isDisabled": false,
										"custom_user_isDisabled": false,
										"user_name_isDisabled": false,
										"delivery_date_isDisabled": false,
										"custom_audio_isDisabled": false,
										"custom_video_isDisabled": false,
										"customized_accessories_isDisabled": false,
										"custom_picture_isDisabled": false,
										"regional_location_isDisabled": false,
										},

																																																	// 用户列表
				list_user_business_user: [],
																					commodity_album_imgs: [],
																					// 用户列表
				list_user_custom_user: [],
						// 用户组
				group_user_custom_user: "",
																				delivery_date_disableOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					},
				},
									custom_audio_FileList: [],
											custom_video_FileList: [],
											customized_accessories_FileList: [],
														custom_picture_imgs: [],
												// 省市区数据
				jsonData: pcaCodeData,
				regional_location_region: [],
				props: {
					value: 'name',
					label: 'name',
					children: 'children'
				},
	
				//影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
				seatArray: [],
				//影院座位行数
				seatRow: 5,
				//影院座位列数
				seatCol: 8,
				//座位尺寸
				seatSize: "",
				seatArr: [],
				list_: [],
				seatList: "",
			}
		},
		methods: {
																					  handle_regional_location_change(value) {
	  	this.form.regional_location = value.join('/');
	  },
		  openPreview(file) {
	    window.open(file.url)
	  },
		
	
				
	
				
	
				
	
						/**
			 * 上传商品封面
			 * @param {Object} param 图片参数
			 */
			upload_commodity_cover(param){
									this.uploadFile(param.file, "commodity_cover");
								},
		
	
				
	
				
	
				
	
				/**
			 * 获取商家用户用户列表
			 */
			async get_list_user_business_user() {
                var json = await this.$get("~/api/user/get_list?user_group=商家用户");
                if(json.result && json.result.list){
                    this.list_user_business_user = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
					get_user_business_user(id){
				var obj = this.list_user_business_user.getObj({"user_id":id});
				var ret = "";
				if(obj){
					if(obj.nickname){
						ret = obj.nickname;}
					else{
						ret = obj.username;
					}
				}
				return ret;
			},
				
	
						/**
			 * 上传商品相册
			 * @param {Object} param 图集参数
			 */
			upload_commodity_album(param){
									this.uploadFileMultiple(param.file, "commodity_album");
								},
		
	
				
	
				
	
										set_total_price(){
				this.form.total_price = parseFloat(this.form.customized_price) * parseFloat(this.form.购买数量)
			},
							// 自动计算精度处理
		toFixed: function(num){
			if (!isNaN(num)) {
				return ((num + '').indexOf('.') == -1) ? num : num.toFixed(2);
			}
		},
			
	
				/**
			 * 获取注册用户用户列表
			 */
			async get_list_user_custom_user() {
                var json = await this.$get("~/api/user/get_list?user_group=注册用户");
                if(json.result && json.result.list){
                    this.list_user_custom_user = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
					/**
			 * 获取注册用户用户组
			 */
			async get_group_user_custom_user() {
							this.form["custom_user"] = this.$store.state.user.user_id;
							var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
				if(json.result && json.result.obj){
					this.group_user_custom_user = json.result.obj;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_session_custom_user(id){
				var _this = this;
				var user_id = {"user_id":id}
				var url = "~/api/"+_this.group_user_custom_user.source_table+"/get_obj?"
				this.$get(url, user_id, function(res) {
					if (res.result && res.result.obj) {
						var arr = []
						for (let key in res.result.obj) {
							arr.push(key)
						}
						var arrForm = []
									for (let key in _this.form) {
							arrForm.push(key)
						}
												_this.form["custom_user"] = id
									_this.disabledObj['custom_user' + '_isDisabled'] = true
						for (var i=0;i<arr.length;i++){
						  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
							for (var j = 0; j < arrForm.length; j++) {
							  if (arr[i] === arrForm[j]) {
								if (arr[i] !== "custom_user") {
			                      _this.form[arrForm[j]] = res.result.obj[arr[i]]
			                      _this.disabledObj[arrForm[j] + '_isDisabled'] = true
								  break;
								} else {
								  _this.disabledObj[arrForm[j] + '_isDisabled'] = true
								}
							  }
							}
						  }
						}
					}
				});
			},
					get_user_custom_user(id){
				var obj = this.list_user_custom_user.getObj({"user_id":id});
				var ret = "";
				if(obj){
					if(obj.nickname){
						ret = obj.nickname;}
					else{
						ret = obj.username;
					}
				}
				return ret;
			},
				
	
				
	
						/**
			 * 上传定制音频
			 * @param {Object} param 音频参数
			 */
			upload_custom_audio(param){
									this.uploadFile(param.file, "custom_audio");
								},
					custom_audioRemove() {
			  this.custom_audio_FileList = []
			  this.form.custom_audio = ""
			},
	
	
						/**
			 * 上传定制视频
			 * @param {Object} param 视频参数
			 */
			upload_custom_video(param){
									this.uploadFile(param.file, "custom_video");
								},
					custom_videoRemove() {
			  this.custom_video_FileList = []
			  this.form.custom_video = ""
			},
	
	
						/**
			 * 上传定制附件
			 * @param {Object} param 文件参数
			 */
			upload_customized_accessories(param){
									this.uploadFile(param.file, "customized_accessories");
								},
					customized_accessoriesRemove() {
			  this.customized_accessories_FileList = []
			  this.form.customized_accessories = ""
			},
	
	
						/**
			 * 上传定制图片
			 * @param {Object} param 图集参数
			 */
			upload_custom_picture(param){
									this.uploadFileMultiple(param.file, "custom_picture");
								},
		
	
				
	
		
			/**
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
											// 获取缓存数据附加
				form = $.db.get("form");
						if(form != null){
					if("examine_state" in form){
						delete form.examine_state
					}
								if("examine_reply" in form){
						delete form.examine_reply
					}
							}
									$.push(this.form ,form);
																				if(this.form && form){
					Object.keys(this.form).forEach(key => {
						Object.keys(form).forEach(dbKey => {
							// if(dbKey === "charging_standard"){
							// 	this.form['charging_rules'] = form[dbKey];
							// 	this.disabledObj['charging_rules_isDisabled'] = true;
							// };
							if(key === dbKey){
								this.disabledObj[key+'_isDisabled'] = true;
								this.form[key] = form[dbKey]
							}
							if(dbKey === "source_table"){
								this.form['source_table'] = form[dbKey];
							}
							if(dbKey === "source_id"){
								this.form['source_id'] = form[dbKey];
							}
							if(dbKey === "source_user_id"){
								this.form['source_user_id'] = form[dbKey];
							}
						})
					})
				}
												        if (this.form["production_date"] && JSON.stringify(this.form["production_date"]).indexOf("-")===-1){
          this.form["production_date"] = this.$toTime(parseInt(this.form["production_date"]),"yyyy-MM-dd")
        }
		        if (this.form["shelf_life_time"] && JSON.stringify(this.form["shelf_life_time"]).indexOf("-")===-1){
            this.form["shelf_life_time"] = this.$toTime(parseInt(this.form["shelf_life_time"]),"yyyy-MM-dd hh:mm:ss")
        }
																		        if (this.form["delivery_date"] && JSON.stringify(this.form["delivery_date"]).indexOf("-")===-1){
          this.form["delivery_date"] = this.$toTime(parseInt(this.form["delivery_date"]),"yyyy-MM-dd")
        }
															$.db.del("form");
				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){

																																									if(json.result.obj["production_date"]=="0000-00-00"){
				  json.result.obj["production_date"] = null;
				}
				if(parseInt(json.result.obj["production_date"]) > 9999){
					json.result.obj["production_date"] = this.$toTime(parseInt(json.result.obj["production_date"]),"yyyy-MM-dd")
				}
											if(json.result.obj["shelf_life_time"]=="0000-00-00 00:00:00"){
				  json.result.obj["shelf_life_time"] = null;
				}
				if(parseInt(json.result.obj["shelf_life_time"]) > 9999){
					json.result.obj["shelf_life_time"] = this.$toTime(parseInt(json.result.obj["shelf_life_time"]),"yyyy-MM-dd hh:mm:ss")
				}
																															if (json.result.obj.commodity_album){
					json.result.obj["commodity_album"] = JSON.parse(json.result.obj["commodity_album"])
					let commodity_album_arr = new Array();
					json.result.obj["commodity_album"].map((value, key) => {
						commodity_album_arr[key] = this.$fullUrl(value)
					})
					this.commodity_album_imgs = commodity_album_arr;
				}
																																				if(json.result.obj["delivery_date"]=="0000-00-00"){
				  json.result.obj["delivery_date"] = null;
				}
				if(parseInt(json.result.obj["delivery_date"]) > 9999){
					json.result.obj["delivery_date"] = this.$toTime(parseInt(json.result.obj["delivery_date"]),"yyyy-MM-dd")
				}
														this.custom_audio_FileList = []
				if (json.result.obj["custom_audio"]) {
				    this.custom_audio_FileList = [
				        {
				            url: this.$fullUrl(json.result.obj['custom_audio']),
				            name: json.result.obj['custom_audio'],
				        },
				    ];
				}
												this.custom_video_FileList = []
				if (json.result.obj["custom_video"]) {
				    this.custom_video_FileList = [
				        {
				            url: this.$fullUrl(json.result.obj['custom_video']),
				            name: json.result.obj['custom_video'],
				        },
				    ];
				}
												this.customized_accessories_FileList = []
				if (json.result.obj["customized_accessories"]) {
				    this.customized_accessories_FileList = [
				        {
				            url: this.$fullUrl(json.result.obj['customized_accessories']),
				            name: json.result.obj['customized_accessories'],
				        },
				    ];
				}
														if (json.result.obj.custom_picture){
					json.result.obj["custom_picture"] = JSON.parse(json.result.obj["custom_picture"])
					let custom_picture_arr = new Array();
					json.result.obj["custom_picture"].map((value, key) => {
						custom_picture_arr[key] = this.$fullUrl(value)
					})
					this.custom_picture_imgs = custom_picture_arr;
				}
													if (this.form.regional_location) {
				    this.regional_location_region = this.form.regional_location.split("/");
				}
	

				this.get_list(json);
			},

																																																																																																																																																		async submit(param, func){
				if (!param) {
					param = this.form;
				}
								var pm = this.events("submit_before", Object.assign({}, param)) || param;
				var msg = await this.events("submit_check", pm);
				var ret;
				if (msg) {
					this.$toast(msg, 'danger');
				} else {
																																																																											if(pm["commodity_album"]){
						pm["commodity_album"] = JSON.stringify(pm["commodity_album"]);
					}
																																																																								if(pm["custom_picture"]){
						pm["custom_picture"] = JSON.stringify(pm["custom_picture"]);
					}
																						ret = this.events("submit_main", pm, func);
				}
				return ret;
			},
			/**
			 * 提交前验证事件
			 * @param {Object} 请求参数
			 * @return {String} 验证成功返回null, 失败返回错误提示
			 */
						submit_check(param) {
																																																																		if (!param.production_date){
					return "生产日期不能为空";
				}
																	if (!param.shelf_life_time){
					return "保质时间不能为空";
				}
																																																																																														if (!param.delivery_date){
					return "交付日期不能为空";
				}
																																																																							return null;
			},

			is_view(){
				// var bl = this.user_group == "管理员";
				var bl = false;

				if(!bl){
					bl = this.$check_action('/i_want_to_customize_it/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/i_want_to_customize_it/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/i_want_to_customize_it/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/i_want_to_customize_it/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/i_want_to_customize_it/view','get');
					console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
				}

				console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

				return bl;
			},
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "avatar");
			},
			// 选座
			//选定且购买座位
			buySeat: function () {
			  //遍历seatArray，将值为1的座位变为2
			  let oldArray = this.seatArray.slice();
			  for (let i = 0; i < this.seatRow; i++) {
				for (let j = 0; j < this.seatCol; j++) {
				  if (oldArray[i][j] === 1) {
					oldArray[i][j] = 2;
				  }
				}
			  }
			  this.seatArray = oldArray;
			  let string = "";
			  for (let x = 0; x < oldArray.length; x++) {
				let array = oldArray[x];
				for (let j = 0; j < array.length; j++) {
				  if (oldArray[x][j] === 2) {
					if (string == "") {
					  string = "" + (x * 8 + j);
					} else {
					  string = string + "," + (x * 8 + j);
					}
				  }
				}
			  }
			  // 对比判断哪些是新增的座位
			  let seat = this.form.seat;
			  let seatB = "";
			  if (string != "" && string != null) {
				let stringList = string.split(",");
				let seatList = this.seatList;
				if (seatList.length != 0) {
				  let seatListArr = seatList.split(",");
				  for (let v = 0; v < stringList.length; v++) {
					if (
					  seatListArr.indexOf(stringList[v]) == -1 &&
					  seat.indexOf(stringList[v]) == -1
					) {
					  if (seat == "" || seat == null) {
						seat = stringList[v] + "";
						seatB = seat;
					  } else {
						if (seat.indexOf(stringList[v]) == -1) {
						  seat = seat + "," + stringList[v];
						  if (seatB == "" || seatB == null) {
							seatB = stringList[v];
						  } else {
							seatB = seatB + "," + stringList[v];
						  }
						}
					  }
					}
				  }
				} else {
				  seat = string;
				}
			  }

			  if (this.form.seat == "") {
				this.form.seat = seat;
			  } else {
				if (seatB != "") {
				  this.form.seat = this.form.seat + "," + seatB;
				}
			  }
			  this.seatList = string;
			},
			//处理座位选择逻辑
			handleChooseSeat: function (row, col) {
			  let seatValue = this.seatArray[row][col];
			  let newArray = this.seatArray;
			  //如果是已购座位，直接返回
			  if (seatValue === 2) return;
			  //如果是已选座位点击后变未选
			  if (seatValue === 1) {
				newArray[row][col] = 0;
			  } else if (seatValue === 0) {
				newArray[row][col] = 1;
			  }
			  //必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
			  this.seatArray = newArray.slice();
			},
			/**
			 * 获取所有座位
			 */
			async get_list(param_json) {
			  var json = await this.$get("~/api/i_want_to_customize_it/get_list"
							  );
			  if (json.result && json.result.list) {
				this.list_ = json.result.list;
			  } else if (json.error) {
				console.error(json.error);
			  }
			  console.log(json);
			  let list = json.result.list;
			  if (list != null && list.length != 0) {
				let seatArr = "";
				for (let j = 0; j < list.length; j++) {
				  let seat = list[j].seat;
				  if (seat != null && seat != "") {
					if (seatArr == "") {
					  seatArr = seat + "";
					} else {
					  seatArr = seatArr + "," + seat;
					}
				  }
				}
				this.seatList = seatArr;
			  }
			  this.initSeatArray(5, 8);
			},

			//初始座位数组
			initSeatArray: function () {
			  let seatList = this.seatList;
			  let seatArr = seatList.split(",");
			  if (seatList == "" || seatList == null) {
				seatArr = [];
			  }
			  this.seatArr = seatArr;

			  let seatArray = Array(this.seatRow)
				.fill(0)
				.map(() => Array(this.seatCol).fill(0));
			  this.seatArray = seatArray;
			  for (let j = 0; j < seatArr.length; j++) {
				let i = Math.floor(seatArr[j] / 8);
				let x = seatArr[j] % 8;
				seatArray[i][x] = 2;
			  }
			  this.seatSize = this.$refs.innerSeatWrapper
				? parseInt(
					parseInt(
					  window.getComputedStyle(this.$refs.innerSeatWrapper).width,
					  10
					) / this.seatCol,
					10
				  )
				: 0;
			},

		},
		created() {
																			this.get_list_user_business_user();
																this.get_list_user_custom_user();
					this.get_group_user_custom_user();
																			},
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	
	.img_multiple{
		overflow: hidden;
	}
	.img_multiple .img_block{
		float: left;
		margin-right: 5px;
		margin-bottom: 5px;
		position: relative;
	}
	.img_multiple .img_block img{
		height: 100px;
		width: auto;
	}
	.img_multiple .img_del{
		position: absolute;
		top: 5px;
		right: 5px;
		width: 20px;
		height: 20px;
		background: #0000008a;
		color: #fff;
		line-height: 20px;
		text-align: center;
		border-radius: 100%;
		cursor: pointer;
	}

	.seat-wrapper {
	height: 370px;
	width: 500px;
	border: 1px dotted #c5c5c5;
	/* margin: 0 auto; */
	position: relative;
	overflow: hidden;
	}

	.inner-seat-wrapper {
	position: absolute;
	bottom: 0;
	width: 100%;
	box-sizing: border-box;
	}
	.seat {
	float: left;
	display: flex;
	justify-content: center;
	align-items: center;
	}
	.inner-seat {
	width: 80%;
	height: 80%;
	cursor: pointer;
	}

	.btn-wrapper {
	margin: 20px auto;
	width: 1000px;
	height: 30px;
	text-align: center;
	}

	.btn-buy {
	height: 100%;
	line-height: 35px;
	font-size: 15px;
	border-radius: 5px;
	padding: 0 5px;
	background-color: #ffa349;
	color: #ffffff;
	display: inline-block;
	cursor: pointer;
	margin: 5px;
	}

	.illustration {
	position: absolute;
	left: 10px;
	top: 20px;
	height: 35px;
	width: 300px;
	}

	.illustration-img-wrapper {
	width: 25px;
	height: 25px;
	position: relative;
	top: 50%;
	display: inline-block;
	transform: translateY(-50%);
	margin-left: 10px;
	}

	.illustration-text {
	display: inline-block;
	height: 100%;
	line-height: 35px;
	font-size: 14px;
	position: relative;
	top: -2px;
	}


    .selected-seat {
	background: url("../../../public/img/selected2.png") center center no-repeat;
	background-size: 100% 100%;
	}

	.unselected-seat {
	background: url("../../../public/img/unselected2.png") center center no-repeat;
	background-size: 100% 100%;
	}

	.bought-seat {
	background: url("../../../public/img/bought2.png") center center no-repeat;
	background-size: 100% 100%;
	}

</style>

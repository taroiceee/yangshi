<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce">
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="头像" prop="avatar">
					<el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
						action="" :http-request="uploadimg" :show-file-list="false">
						<img v-if="form.avatar" :src="$fullUrl(form.avatar)" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="账号" prop="username">
			        <span v-if="obj.username">{{obj.username}}</span>
					<el-input v-else v-model="form.username" placeholder="请输入账号"></el-input>
				</el-form-item>
			</el-col>

			<el-col v-if="!obj.password" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="密码" prop="password">
					<!--<span v-if="obj.password">{{obj.password}}</span>-->
					<!--<el-input v-else type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>-->
					<el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
				</el-form-item>
			</el-col>


			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="邮箱" prop="email">
					<el-input type="email" v-model="form.email" placeholder="请输入邮箱"></el-input>
				</el-form-item>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="状态" prop="state">
					<el-select :disabled="user_group!=='管理员'" v-model="form.state" placeholder="请选择">
						<el-option v-for="group in list_user_state" :key="group.value" :label="group.name"
							:value="group.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>

				<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="会员等级" prop="vip_level">
					<el-select :disabled="user_group!=='管理员'" v-model="form.vip_level" placeholder="请选择" @change="vip_level_change">
						<el-option v-for="vip_level in list_user_vip_level" :key="vip_level.name" :label="vip_level.name"
								   :value="vip_level.name">
						</el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="会员折扣" prop="vip_discount">
					<el-input :disabled="true" v-model="form.vip_discount" placeholder="请输入会员折扣"></el-input>
				</el-form-item>
			</el-col>
	
						<el-col v-if="$check_field('get','user_membership_card_number') || $check_field('add','user_membership_card_number') || $check_field('set','user_membership_card_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户会员卡号" prop="user_membership_card_number">
												<el-input id="user_membership_card_number" v-model="form_sub['user_membership_card_number']" placeholder="请输入用户会员卡号"
							  v-if="(form_sub['registered_user_id'] && $check_field('set','user_membership_card_number')) || (!form_sub['registered_user_id'] && $check_field('add','user_membership_card_number'))">
				  					</el-input>
					<div v-else-if="$check_field('get','user_membership_card_number')">
						{{form_sub['user_membership_card_number']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','real_name') || $check_field('add','real_name') || $check_field('set','real_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="真实姓名" prop="real_name">
												<el-input id="real_name" v-model="form_sub['real_name']" placeholder="请输入真实姓名"
							  v-if="(form_sub['registered_user_id'] && $check_field('set','real_name')) || (!form_sub['registered_user_id'] && $check_field('add','real_name'))">
				  					</el-input>
					<div v-else-if="$check_field('get','real_name')">
						{{form_sub['real_name']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','user_gender') || $check_field('add','user_gender') || $check_field('set','user_gender')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户性别" prop="user_gender">
								<el-select id="user_gender" v-model="form_sub['user_gender']"
						v-if="(form_sub['registered_user_id'] && $check_field('set','user_gender')) || (!form_sub['registered_user_id'] && $check_field('add','user_gender'))">
						<el-option v-for="o in list_user_gender" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','user_gender')">{{form_sub['user_gender']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','user_age') || $check_field('add','user_age') || $check_field('set','user_age')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户年龄" prop="user_age">
								<el-input-number id="user_age" v-model.number="form_sub['user_age']"
						v-if="(form_sub['registered_user_id'] && $check_field('set','user_age')) || (!form_sub['registered_user_id'] && $check_field('add','user_age'))"></el-input-number>
					<div v-else-if="$check_field('get','user_age')">{{form_sub['user_age']}}</div>
									<span style="font-size: 13px;color: #999;margin-left: 5px;">岁</span>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','height') || $check_field('add','height') || $check_field('set','height')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="身高" prop="height">
								<el-input-number id="height" v-model.number="form_sub['height']"
						v-if="(form_sub['registered_user_id'] && $check_field('set','height')) || (!form_sub['registered_user_id'] && $check_field('add','height'))"></el-input-number>
					<div v-else-if="$check_field('get','height')">{{form_sub['height']}}</div>
									<span style="font-size: 13px;color: #999;margin-left: 5px;">CM</span>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','user_weight') || $check_field('add','user_weight') || $check_field('set','user_weight')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户体重" prop="user_weight">
								<el-input-number id="user_weight" v-model.number="form_sub['user_weight']"
						v-if="(form_sub['registered_user_id'] && $check_field('set','user_weight')) || (!form_sub['registered_user_id'] && $check_field('add','user_weight'))"></el-input-number>
					<div v-else-if="$check_field('get','user_weight')">{{form_sub['user_weight']}}</div>
									<span style="font-size: 13px;color: #999;margin-left: 5px;">KG</span>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','region') || $check_field('add','region') || $check_field('set','region')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="所属地区" prop="region">
								<el-cascader v-model="region_region" :options="jsonData" :props="props" placeholder="请选择所属地区" clearable @change="handle_region_change" v-if=" (form_sub['registered_user_id'] && $check_field('set', 'region')) || (!form_sub['registered_user_id'] && $check_field('add', 'region'))" :disabled="disabledObj['region_isDisabled']" />
					<div v-else-if="$check_field('get','region')">{{form_sub['region']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','user_label') || $check_field('add','user_label') || $check_field('set','user_label')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户标签" prop="user_label">
								<el-select id="user_label" v-model="user_label_multiple_value" multiple @change="select_user_label_multiple"
							   v-if="(form_sub['registered_user_id'] && $check_field('set','user_label')) || (!form_sub['registered_user_id'] && $check_field('add','user_label'))">
						<el-option v-for="o in list_user_label" :key="o['classification_name']" :label="o['classification_name']"
								   :value="o['classification_name']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','user_label')">{{form_sub['user_label']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','user_preferences') || $check_field('add','user_preferences') || $check_field('set','user_preferences')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户喜好" prop="user_preferences">
								<el-select id="user_preferences" v-model="form_sub['user_preferences']" filterable  @change="select_user_preferences_field"						v-if="(form_sub['registered_user_id'] && $check_field('set','user_preferences')) || (!form_sub['registered_user_id'] && $check_field('add','user_preferences'))">
						<el-option v-for="o in list_user_preferences" :key="o['classification_name']" :label="o['classification_name']"
							:value="o['classification_name']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','user_preferences')">{{form_sub['user_preferences']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','description_description') || $check_field('add','description_description') || $check_field('set','description_description')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="描述说明" prop="description_description">
								<el-input id="description_description" v-model="form_sub['description_description']"
						v-if="(form_sub['registered_user_id'] && $check_field('set','description_description')) || (!form_sub['registered_user_id'] && $check_field('add','description_description'))" :disabled="true">
									</el-input>
					<div v-else-if="$check_field('get','description_description')">
						{{form_sub['description_description']}}
									</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','certificate_number') || $check_field('add','certificate_number') || $check_field('set','certificate_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="证件号" prop="certificate_number">
												<el-input id="certificate_number" v-model="form_sub['certificate_number']" placeholder="请输入证件号"
							  v-if="(form_sub['registered_user_id'] && $check_field('set','certificate_number')) || (!form_sub['registered_user_id'] && $check_field('add','certificate_number'))">
				  					</el-input>
					<div v-else-if="$check_field('get','certificate_number')">
						{{form_sub['certificate_number']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','portfolio') || $check_field('add','portfolio') || $check_field('set','portfolio')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="作品集" prop="portfolio">
								<el-upload :disabled="disabledObj['portfolio_isDisabled']" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" multiple action="" :http-request="upload_portfolio"
						:show-file-list="false" v-if="((form_sub['registered_user_id'] && $check_field('set','portfolio')) || (!form_sub['registered_user_id'] && $check_field('add','portfolio'))) && !disabledObj['portfolio_isDisabled']">
						<i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<div class="img_multiple" v-if="(form_sub['registered_user_id'] && $check_field('set','portfolio')) || (!form_sub['registered_user_id'] && $check_field('add','portfolio'))">
						<div v-if="Array.isArray(form_sub['portfolio'])">
							<div class="img_block" v-for="(img,img_index) in form_sub['portfolio']" :key="img_index">
								<img id="portfolio" :src="$fullUrl(img)" class="avatar"/>
								<span class="img_del" @click="delImg(img_index,'portfolio')">x</span>
							</div>
						</div>
						<div class="img_block" v-else>
							<span>上传中...</span>
						</div>
					</div>
					<el-image v-else-if="$check_field('get','portfolio')" style="width: 100px; height: 100px"
						:src="$fullUrl(item)" v-for="item in portfolio_imgs" :preview-src-list="portfolio_imgs">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','user_photos') || $check_field('add','user_photos') || $check_field('set','user_photos')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户照片" prop="user_photos">
								<el-upload :disabled="disabledObj['user_photos_isDisabled']" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_user_photos"
						:show-file-list="false" v-if="(form_sub['registered_user_id'] && $check_field('set','user_photos')) || (!form_sub['registered_user_id'] && $check_field('add','user_photos'))">
						<img id="user_photos" v-if="form_sub['user_photos']" :src="$fullUrl(form_sub['user_photos'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-image v-else-if="$check_field('get','user_photos')" style="width: 100px; height: 100px"
						:src="$fullUrl(form_sub['user_photos'])" :preview-src-list="[$fullUrl(form_sub['user_photos'])]">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','user_notes') || $check_field('add','user_notes') || $check_field('set','user_notes')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="用户备注" prop="user_notes">
								<el-input type="textarea" id="user_notes" v-model="form_sub['user_notes']" placeholder="请输入用户备注"
						v-if="(form_sub['registered_user_id'] && $check_field('set','user_notes')) || (!form_sub['registered_user_id'] && $check_field('add','user_notes'))"></el-input>
					<div v-else-if="$check_field('get','user_notes')">{{form_sub['user_notes']}}</div>
							</el-form-item>
			</el-col>
			
			
	</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/registered_user/view','set') || $check_action('/registered_user/view','add')">
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
				field: "user_id",
				url_add: "~/api/user/register?",
				url_set: "~/api/user/set?",
				url_get_obj: "~/api/user/get_obj?",
				url_upload: "~/api/user/upload?",

				group_table: "registered_user",
				is_password: true,

				query: {
					"user_id": 0,
				},

				obj: {
					user_id: 0,
					username: '',
					nickname: '',
					password: '',
					avatar: '',
					// phone: '',
					email: '',
					user_group: "注册用户",
					// phone_state: 0,
					// email_state: 0,
					state: 1,
						vip_level: '',
					vip_discount: 0,
					},

				form: {
					user_id: 0,
				    username: '',
					nickname: '',
				    password: '',
					avatar: '',
					// phone: '',
					email: '',
					user_group: "注册用户",
					// phone_state: 0,
					// email_state: 0,
					state: 1,
						vip_level: '',
					vip_discount: 0,
					},

				disabledObj:{
								"user_membership_card_number_isDisabled": false,
										"real_name_isDisabled": false,
										"user_gender_isDisabled": false,
																									"region_isDisabled": false,
										"user_label_isDisabled": false,
										"user_preferences_isDisabled": false,
										"description_description_isDisabled": false,
										"certificate_number_isDisabled": false,
										"portfolio_isDisabled": false,
										"user_photos_isDisabled": false,
										"user_notes_isDisabled": false,
							},

				form_sub: {
								"user_membership_card_number":  '', // 用户会员卡号
										"real_name":  '', // 真实姓名
										"user_gender":  '', // 用户性别
										"user_age":  0, // 用户年龄
										"height":  0, // 身高
										"user_weight":  0, // 用户体重
										"region":  '', // 所属地区
										"user_label":  '', // 用户标签
										"user_preferences":  '', // 用户喜好
										"description_description":  '', // 描述说明
										"certificate_number":  '', // 证件号
										"portfolio":  '', // 作品集
										"user_photos":  '', // 用户照片
										"user_notes":  '', // 用户备注
									    "user_id": 0,
					"registered_user_id": 0 // ID
				},

				list_state: [{
					value: 0,
					name: "未认证"
				}, {
					value: 1,
					name: "审核中"
				}, {
					value: 2,
					name: "已认证"
				}],

				list_user_state: [{
					value: 1,
					name: "可用"
				}, {
					value: 2,
					name: "禁用"
				}],
					list_user_vip_level:[],
	

																			// 用户性别选项列表
				list_user_gender: ['男','女'],
																																		// 省市区数据
				jsonData: pcaCodeData,
				region_region: [],
				props: {
					value: 'name',
					label: 'name',
					children: 'children'
				},
								user_label_multiple_value:[],
						// 用户标签选项列表
				list_user_label: [""],
													// 用户喜好选项列表
				list_user_preferences: [""],
																											portfolio_imgs: [],
														
			}
		},
		methods: {
								  handle_region_change(value) {
	  	this.form.region = value.join('/');
	  },
									  openPreview(file) {
	    window.open(file.url)
	  },
		
	
				
	
				
	
				
	
				
	
				
	
				
	
				
				/**
			 * 获取用户标签列表
			 */
			async get_list_user_label() {
				var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					this.list_user_label = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
							select_user_label_multiple(v){
									this.form_sub.user_label = "";
								if (v && v.length > 0) {
											this.form_sub.user_label = v.toString();
									}
			},
			
				
				/**
			 * 获取用户喜好列表
			 */
			async get_list_user_preferences() {
				var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					this.list_user_preferences = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
					select_user_preferences_field(v){
				this.$get('~/api/classification_information/get_obj?classification_name='+v,{},(res)=>{
					if(res.result && res.result.obj){
																																																																																																																																																			this.form_sub.description_description = res.result.obj.description_description;
																																																																														}else{
						console.error(res.error);
					}
				})
			},
					
				
	
				
	
						/**
			 * 上传作品集
			 * @param {Object} param 图集参数
			 */
			upload_portfolio(param){
						let _this = this;
				var form = new FormData() // FormData 对象
				form.append('file', param.file) // 文件对象
				this.$upload(this.url_upload, form, function(json) {
					if (json.result) {
												if(_this.form_sub['portfolio'].length > 0){
							_this.form_sub['portfolio'].push(json.result.url);
						}else{
							_this.form_sub['portfolio'] = [json.result.url];
						}
											} else {
						_this.$toast('上传失败！');
					}
				});
					},
		
	
						/**
			 * 上传用户照片
			 * @param {Object} param 图片参数
			 */
			upload_user_photos(param){
						let _this = this;
				var form = new FormData() // FormData 对象
				form.append('file', param.file) // 文件对象
				this.$upload(this.url_upload, form, function(json) {
					if (json.result) {
												_this.form_sub['user_photos'] = json.result.url;
											} else {
						_this.$toast('上传失败！');
					}
				});
					},
		
	
				
	
		
			/**
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
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
																																$.db.del("form");
				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){
				var user = json.result.obj;
				this.is_password = user.password ? false : true;
				var user_id = user.user_id;
				this.$get("~/api/" + this.group_table + "/get_obj?" ,{user_id} ,(res)=>{
					if(res.result && res.result.obj){
						var o = res.result.obj;
						delete o["create_time"];
						delete o["update_time"];
						this.form_sub = res.result.obj;
																																												if (res.result.obj.user_label){
							this.user_label_multiple_value = res.result.obj.user_label.split(",")
						}
																														if (res.result.obj.portfolio){
							res.result.obj["portfolio"] = JSON.parse(res.result.obj["portfolio"])
							let portfolio_arr = new Array();
							res.result.obj["portfolio"].map((value, key) => {
								portfolio_arr[key] = this.$fullUrl(value)
							})
							this.portfolio_imgs = portfolio_arr;
						}
																		}else if(res.error){
						console.log(res.error);
						console.log("获取不到相关信息");
					}
				})

																																																					if (this.form.region) {
				    this.region_region = this.form.region.split("/");
				}
										if (json.result.obj.user_label){
					this.user_label_multiple_value = json.result.obj.user_label.split(",")
				}
																																													

			},

			delImg(img, key = "img"){
				var _this = this;
				_this.form_sub[key].splice(img, 1);
			},
			async submit(param, func){
				if (!param) {
					param = this.form;
				}
				param.avatar = param.avatar == "" ? "/api/upload/default_avatar.jpg" : param.avatar;
				var pm = this.events("submit_before", Object.assign({}, param)) || param;
				var msg = await this.events("submit_check", pm);
				var ret;
				if (msg) {
					this.$toast(msg, 'danger');
				} else {
																																																																																									if(pm["portfolio"]){
						pm["portfolio"] = JSON.stringify(pm["portfolio"]);
					}
																										ret = this.events("submit_main", pm, func);
				}
				return ret;
			},

			// 提交前校验
			async submit_check(param){
				var ret = null;

				var email_regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				// var phone_regular = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

				// var {username ,password ,nickname ,user_group ,email ,phone} = param;
				var {username ,password ,nickname ,user_group ,email} = param;

				var confirm_password = this.confirm_password;

				console.log("表单校验username ,password ,email ,nickname ,user_group" ,username ,password ,email ,nickname ,user_group);

				if(!username){
					ret = "账号不能为空";
				}
				else if(username.length > 16 || username.length < 5){
					ret = "账号长度应为5到16个字符之间！";
				}
				else if(!password){
					ret = "密码不能为空!";
				}
				else if(this.is_password && (password.length > 16 || password.length < 5)){
					ret = "密码长度应为5到16个字符之间！";
				}
				else if(nickname && nickname.length > 12 || nickname.length < 2){
					ret = "昵称长度应为2个字符到12个字符之间";
				}
				else if(email && !email_regular.test(email)){
					ret = "请输入正确的邮箱地址 例：test@test.com!";
				}
				// else if(phone && !phone_regular.test(phone)){
				// 	ret = "请输入正确的手机号码 例：18955552312!";
				// }
				else if(!user_group){
					ret = "请选择用户组!";
				}

				var p = {"username": param.username};

				var form_sub = Object.assign({} ,this.form_sub);
									if(!ret && !form_sub["user_membership_card_number"]){
					ret = "用户会员卡号不能为空!";
				} else if (!ret && !form_sub["registered_user_id"]) {
					let res = await this.$get("~/api/registered_user/count?", {"user_membership_card_number": form_sub["user_membership_card_number"]});
					if(res.result){
						ret = "用户会员卡号已存在!";
					}
				}
																																																																																																																																																												let certificate_number_id_regular = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				if(form_sub.certificate_number && !certificate_number_id_regular.test(form_sub.certificate_number)){
					return "身份证号格式错误"
				}
																																															
				return ret;
			},

			// 提交成功后
			submit_after(json,func){
				var form = Object.assign({} ,this.form);
				delete form.password;
				console.log("查询表单form",form)
				this.get_register(form);
			},

			/**
			 * 获取注册表信息
			 * @param {Object} form
			 * @param {Object} table
			 */
			get_register(form){
				var form_sub = this.form_sub;
				this.$get("~/api/user/get_obj?",form,(res)=>{
					console.log("注册表信息res",res);
					if(res.result && res.result.obj){
						form_sub.user_id = res.result.obj.user_id;
						this.submit_sub(form_sub);
					}else if(res.error){
						console.error(res.error);
						this.$toast(res.error.message,"error");
					}
				})
			},

			// 提交附加信息
			submit_sub(form_sub){
        form_sub = this.events("submit_before", Object.assign({}, form_sub)) || form_sub;
																																																																if(form_sub["portfolio"]){
					form_sub["portfolio"] = JSON.stringify(form_sub["portfolio"]);
				}
																			if(form_sub["registered_user_id"]){
					// 提交事件
					this.$post("~/api/" + this.group_table + "/set?registered_user_id=" + form_sub["registered_user_id"],form_sub,(res)=>{
						console.log("提交结果：" ,res)
						if(res.result){
							this.$toast("修改成功!" ,"success");
							this.$router.go(-1);
						}else if(res.error){
							console.error(res.error);
							this.$toast(res.error.message,"error");
						}
					});
				}
				else{
					// 提交事件
					this.$post("~/api/" + this.group_table + "/add?",form_sub,(res)=>{
						console.log("提交结果：" ,res)
						if(res.result){
							this.$toast("添加成功!" ,"success");
							this.$router.go(-1);
						}else if(res.error){
							var user_id = form_sub["user_id"];
							this.$get("~/api/user/del?",{user_id});
							console.error(res.error);
							this.$toast(res.error.message,"error");
						}
					});
				}
			},

			is_view(){
				// var bl = this.user_group == "管理员";
				var bl = false;

				if(!bl){
					bl = this.$check_action('/registered_user/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/registered_user/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/registered_user/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/registered_user/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/registered_user/view','get');
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
			async get_list_vip_level() {
				var list = await this.$get("~/api/vip_level/get_list?");
				this.list_user_vip_level = list.result.list;
			},
			vip_level_change(v){
				for (let i=0;i<this.list_user_vip_level.length;i++){
					if (v==this.list_user_vip_level[i].name){
						this.form.vip_discount = this.list_user_vip_level[i].discount
						this.obj.vip_discount = this.list_user_vip_level[i].discount
						break
					}
				}
			},

		},
		created() {
																		this.get_list_user_label();
						this.get_list_user_preferences();
															this.get_list_vip_level();
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




</style>

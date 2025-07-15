<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce">
							<el-col v-if="$check_field('get','title_name') || $check_field('add','title_name') || $check_field('set','title_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="标题名" prop="title_name">
												<el-input id="title_name" v-model="form['title_name']" placeholder="请输入标题名"
							  v-if="(form['feedback_on_opinions_id'] && $check_field('set','title_name')) || (!form['feedback_on_opinions_id'] && $check_field('add','title_name'))" :disabled="disabledObj['title_name_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','title_name')">
						{{form['title_name']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','type_of_feedback_information') || $check_field('add','type_of_feedback_information') || $check_field('set','type_of_feedback_information')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="反馈信息类型" prop="type_of_feedback_information">
								<el-select id="type_of_feedback_information" v-model="form['type_of_feedback_information']" filterable 						v-if="(form['feedback_on_opinions_id'] && $check_field('set','type_of_feedback_information')) || (!form['feedback_on_opinions_id'] && $check_field('add','type_of_feedback_information'))">
						<el-option v-for="o in list_type_of_feedback_information" :key="o['classification_name']" :label="o['classification_name']"
							:value="o['classification_name']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','type_of_feedback_information')">{{form['type_of_feedback_information']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','feedback_user') || $check_field('add','feedback_user') || $check_field('set','feedback_user')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="反馈用户" prop="feedback_user">
																		<div v-if="user_group !== '管理员'">
							{{ get_user_session_feedback_user(form['feedback_user']) }}
							<el-select v-if="(form['feedback_on_opinions_id'] && $check_field('set','feedback_user')) || (!form['feedback_on_opinions_id'] && $check_field('add','feedback_user'))" id="feedback_user" v-model="form['feedback_user']" :disabled="disabledObj['feedback_user_isDisabled']">
								<el-option v-for="o in list_user_feedback_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','feedback_user')" id="feedback_user" v-model="form['feedback_user']" :disabled="true">
								<el-option v-for="o in list_user_feedback_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="feedback_user" v-model="form['feedback_user']" :disabled="disabledObj['feedback_user_isDisabled']">
							<el-option v-for="o in list_user_feedback_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
																</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','refund_type') || $check_field('add','refund_type') || $check_field('set','refund_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="退款类型" prop="refund_type">
								<el-select id="refund_type" v-model="form['refund_type']"
						v-if="(form['feedback_on_opinions_id'] && $check_field('set','refund_type')) || (!form['feedback_on_opinions_id'] && $check_field('add','refund_type'))">
						<el-option v-for="o in list_refund_type" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','refund_type')">{{form['refund_type']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','refund_goods') || $check_field('add','refund_goods') || $check_field('set','refund_goods')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="退款商品" prop="refund_goods">
								<el-select id="refund_goods" v-model="refund_goods_multiple_value" multiple @change="select_refund_goods_multiple"
							   v-if="(form['feedback_on_opinions_id'] && $check_field('set','refund_goods')) || (!form['feedback_on_opinions_id'] && $check_field('add','refund_goods'))">
						<el-option v-for="o in list_refund_goods" :key="o['name_of_commodity']" :label="o['name_of_commodity']"
								   :value="o['name_of_commodity']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','refund_goods')">{{form['refund_goods']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','upload_credential') || $check_field('add','upload_credential') || $check_field('set','upload_credential')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="上传凭证" prop="upload_credential">
								<el-upload :disabled="disabledObj['upload_credential_isDisabled']" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_upload_credential"
						:show-file-list="false" v-if="(form['feedback_on_opinions_id'] && $check_field('set','upload_credential')) || (!form['feedback_on_opinions_id'] && $check_field('add','upload_credential'))">
						<img id="upload_credential" v-if="form['upload_credential']" :src="$fullUrl(form['upload_credential'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-image v-else-if="$check_field('get','upload_credential')" style="width: 100px; height: 100px"
						:src="$fullUrl(form['upload_credential'])" :preview-src-list="[$fullUrl(form['upload_credential'])]">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','more_vouchers') || $check_field('add','more_vouchers') || $check_field('set','more_vouchers')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="更多凭证" prop="more_vouchers">
								<el-upload :disabled="disabledObj['more_vouchers_isDisabled']" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" multiple action="" :http-request="upload_more_vouchers"
						:show-file-list="false" v-if="((form['feedback_on_opinions_id'] && $check_field('set','more_vouchers')) || (!form['feedback_on_opinions_id'] && $check_field('add','more_vouchers'))) && !disabledObj['more_vouchers_isDisabled']">
						<i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<div class="img_multiple" v-if="(form['feedback_on_opinions_id'] && $check_field('set','more_vouchers')) || (!form['feedback_on_opinions_id'] && $check_field('add','more_vouchers'))">
						<div v-if="Array.isArray(form['more_vouchers'])">
							<div class="img_block" v-for="(img,img_index) in form['more_vouchers']" :key="img_index">
								<img id="more_vouchers" :src="$fullUrl(img)" class="avatar"/>
								<span class="img_del" @click="delImg(img_index,'more_vouchers')">x</span>
							</div>
						</div>
						<div class="img_block" v-else>
							<span>上传中...</span>
						</div>
					</div>
					<el-image v-else-if="$check_field('get','more_vouchers')" style="width: 100px; height: 100px"
						:src="$fullUrl(item)" v-for="item in more_vouchers_imgs" :preview-src-list="more_vouchers_imgs">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','upload_file') || $check_field('add','upload_file') || $check_field('set','upload_file')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="上传文件" prop="upload_file">
												<div v-if="disabledObj['upload_file_isDisabled']">
						<div v-if="$check_field('get','upload_file')">
							<el-button type="primary" @click="$download($fullUrl(form['upload_file']),form['upload_file'])">下载<i
									class="el-icon-download el-icon--right"></i></el-button>
						</div>
					</div>
					<div v-else>
						<el-upload v-if="(form['feedback_on_opinions_id'] && $check_field('set','upload_file')) || (!form['feedback_on_opinions_id'] && $check_field('add','upload_file'))" class="upload-demo" :file-list="upload_file_FileList" :on-preview="openPreview" :on-remove="upload_fileRemove" drag
								   action="" style="max-width: 300px;width: 100%;" :http-request="upload_upload_file" :limit="1" accept="">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						</el-upload>
						<div v-else-if="$check_field('get','upload_file')">
							<el-button type="primary" @click="$download($fullUrl(form['upload_file']),form['upload_file'])">下载<i
									class="el-icon-download el-icon--right"></i></el-button>
						</div>
					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','upload_audio') || $check_field('add','upload_audio') || $check_field('set','upload_audio')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="上传音频" prop="upload_audio">
												<el-upload v-if="(form['feedback_on_opinions_id'] && $check_field('set','upload_audio')) || (!form['feedback_on_opinions_id'] && $check_field('add','upload_audio'))" class="upload-demo" :file-list="upload_audio_FileList" :on-preview="openPreview" :on-remove="upload_audioRemove" drag
						action="" style="max-width: 300px;width: 100%;" :http-request="upload_upload_audio" :limit="1" accept="audio/ogg,audio/mp3,audio/wav">
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将音频拖到此处，或<em>点击上传</em></div>
					</el-upload>
					<div v-else-if="$check_field('get','upload_audio')">
						<el-button type="primary" @click="$download($fullUrl(form['upload_audio']),form['upload_audio'])">下载<i
								class="el-icon-download el-icon--right"></i></el-button>
					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','upload_video') || $check_field('add','upload_video') || $check_field('set','upload_video')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="上传视频" prop="upload_video">
												<el-upload v-if="(form['feedback_on_opinions_id'] && $check_field('set','upload_video')) || (!form['feedback_on_opinions_id'] && $check_field('add','upload_video'))" class="upload-demo" :file-list="upload_video_FileList" :on-preview="openPreview" :on-remove="upload_videoRemove" drag
						action="" style="max-width: 300px;width: 100%;" :http-request="upload_upload_video" :limit="1" accept="video/ogg,video/mp4,video/webm">
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
					</el-upload>
					<div v-else-if="$check_field('get','upload_video')">
						<el-button type="primary" @click="$download($fullUrl(form['upload_video']),form['upload_video'])">下载<i
								class="el-icon-download el-icon--right"></i></el-button>
					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','feedback_content') || $check_field('add','feedback_content') || $check_field('set','feedback_content')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="反馈内容" prop="feedback_content">
								<el-input type="textarea" id="feedback_content" v-model="form['feedback_content']" placeholder="请输入反馈内容"
						v-if="(form['feedback_on_opinions_id'] && $check_field('set','feedback_content')) || (!form['feedback_on_opinions_id'] && $check_field('add','feedback_content'))" :disabled="disabledObj['feedback_content_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','feedback_content')">{{form['feedback_content']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','detailed_description') || $check_field('add','detailed_description') || $check_field('set','detailed_description')" :xs="24" :sm="24" :lg="24" class="el_form_editor_warp">
				<el-form-item label="详细描述" prop="detailed_description">
					<quill-editor v-model.number="form['detailed_description']"
						v-if="(form['feedback_on_opinions_id'] && $check_field('set','detailed_description')) || (!form['feedback_on_opinions_id'] && $check_field('add','detailed_description')) ">
					</quill-editor>
					<div v-else-if="$check_field('get','detailed_description')" v-html="form['detailed_description']"></div>
				</el-form-item>
			</el-col>
						
	
	
		
		
	
	
	
	
	</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/feedback_on_opinions/view','set') || $check_action('/feedback_on_opinions/view','add')">
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
                        
	export default {
		mixins: [mixin],
		data() {
			return {
				field: "feedback_on_opinions_id",
				url_add: "~/api/feedback_on_opinions/add?",
				url_set: "~/api/feedback_on_opinions/set?",
				url_get_obj: "~/api/feedback_on_opinions/get_obj?",
				url_upload: "~/api/feedback_on_opinions/upload?",

				query: {
					"feedback_on_opinions_id": 0,
				},

				form: {
								"title_name":  '', // 标题名
										"type_of_feedback_information":  '', // 反馈信息类型
										"feedback_user": 0, // 反馈用户
										"refund_type":  '', // 退款类型
										"refund_goods":  '', // 退款商品
										"upload_credential":  '', // 上传凭证
										"more_vouchers": [], // 更多凭证
										"upload_file":  '', // 上传文件
										"upload_audio":  '', // 上传音频
										"upload_video":  '', // 上传视频
										"feedback_content":  '', // 反馈内容
										"detailed_description":  '', // 详细描述
											"feedback_on_opinions_id": 0, // ID
													},
				disabledObj:{
								"title_name_isDisabled": false,
										"type_of_feedback_information_isDisabled": false,
										"feedback_user_isDisabled": false,
										"refund_type_isDisabled": false,
										"refund_goods_isDisabled": false,
										"upload_credential_isDisabled": false,
										"more_vouchers_isDisabled": false,
										"upload_file_isDisabled": false,
										"upload_audio_isDisabled": false,
										"upload_video_isDisabled": false,
										"feedback_content_isDisabled": false,
										"detailed_description_isDisabled": false,
										},

													// 反馈信息类型选项列表
				list_type_of_feedback_information: [""],
													// 用户列表
				list_user_feedback_user: [],
						// 用户组
				group_user_feedback_user: "",
													// 退款类型选项列表
				list_refund_type: ['其他','退款退货','仅退款','部分退款'],
													refund_goods_multiple_value:[],
						// 退款商品选项列表
				list_refund_goods: [""],
																					more_vouchers_imgs: [],
								upload_file_FileList: [],
											upload_audio_FileList: [],
											upload_video_FileList: [],
																	
			}
		},
		methods: {
													  openPreview(file) {
	    window.open(file.url)
	  },
		
	
				
				/**
			 * 获取反馈信息类型列表
			 */
			async get_list_type_of_feedback_information() {
				var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					this.list_type_of_feedback_information = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
					
				
	
				/**
			 * 获取注册用户用户列表
			 */
			async get_list_user_feedback_user() {
                var json = await this.$get("~/api/user/get_list?user_group=注册用户");
                if(json.result && json.result.list){
                    this.list_user_feedback_user = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
					/**
			 * 获取注册用户用户组
			 */
			async get_group_user_feedback_user() {
							this.form["feedback_user"] = this.$store.state.user.user_id;
							var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
				if(json.result && json.result.obj){
					this.group_user_feedback_user = json.result.obj;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_session_feedback_user(id){
				var _this = this;
				var user_id = {"user_id":id}
				var url = "~/api/"+_this.group_user_feedback_user.source_table+"/get_obj?"
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
												_this.form["feedback_user"] = id
									_this.disabledObj['feedback_user' + '_isDisabled'] = true
						for (var i=0;i<arr.length;i++){
						  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
							for (var j = 0; j < arrForm.length; j++) {
							  if (arr[i] === arrForm[j]) {
								if (arr[i] !== "feedback_user") {
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
					get_user_feedback_user(id){
				var obj = this.list_user_feedback_user.getObj({"user_id":id});
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
			 * 获取退款商品列表
			 */
			async get_list_refund_goods() {
				var json = await this.$get("~/api/customized_products/get_list?");
				if(json.result && json.result.list){
					this.list_refund_goods = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
							select_refund_goods_multiple(v){
									this.form.refund_goods = "";
								if (v && v.length > 0) {
											this.form.refund_goods = v.toString();
									}
			},
			
						/**
			 * 上传上传凭证
			 * @param {Object} param 图片参数
			 */
			upload_upload_credential(param){
									this.uploadFile(param.file, "upload_credential");
								},
		
	
						/**
			 * 上传更多凭证
			 * @param {Object} param 图集参数
			 */
			upload_more_vouchers(param){
									this.uploadFileMultiple(param.file, "more_vouchers");
								},
		
	
						/**
			 * 上传上传文件
			 * @param {Object} param 文件参数
			 */
			upload_upload_file(param){
									this.uploadFile(param.file, "upload_file");
								},
					upload_fileRemove() {
			  this.upload_file_FileList = []
			  this.form.upload_file = ""
			},
	
	
						/**
			 * 上传上传音频
			 * @param {Object} param 音频参数
			 */
			upload_upload_audio(param){
									this.uploadFile(param.file, "upload_audio");
								},
					upload_audioRemove() {
			  this.upload_audio_FileList = []
			  this.form.upload_audio = ""
			},
	
	
						/**
			 * 上传上传视频
			 * @param {Object} param 视频参数
			 */
			upload_upload_video(param){
									this.uploadFile(param.file, "upload_video");
								},
					upload_videoRemove() {
			  this.upload_video_FileList = []
			  this.form.upload_video = ""
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

																																					if (json.result.obj.refund_goods){
					this.refund_goods_multiple_value = json.result.obj.refund_goods.split(",")
				}
																				if (json.result.obj.more_vouchers){
					json.result.obj["more_vouchers"] = JSON.parse(json.result.obj["more_vouchers"])
					let more_vouchers_arr = new Array();
					json.result.obj["more_vouchers"].map((value, key) => {
						more_vouchers_arr[key] = this.$fullUrl(value)
					})
					this.more_vouchers_imgs = more_vouchers_arr;
				}
										this.upload_file_FileList = []
				if (json.result.obj["upload_file"]) {
				    this.upload_file_FileList = [
				        {
				            url: this.$fullUrl(json.result.obj['upload_file']),
				            name: json.result.obj['upload_file'],
				        },
				    ];
				}
												this.upload_audio_FileList = []
				if (json.result.obj["upload_audio"]) {
				    this.upload_audio_FileList = [
				        {
				            url: this.$fullUrl(json.result.obj['upload_audio']),
				            name: json.result.obj['upload_audio'],
				        },
				    ];
				}
												this.upload_video_FileList = []
				if (json.result.obj["upload_video"]) {
				    this.upload_video_FileList = [
				        {
				            url: this.$fullUrl(json.result.obj['upload_video']),
				            name: json.result.obj['upload_video'],
				        },
				    ];
				}
																		

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
																																																						if(pm["more_vouchers"]){
						pm["more_vouchers"] = JSON.stringify(pm["more_vouchers"]);
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
																																																																																																																																														return null;
			},

			is_view(){
				// var bl = this.user_group == "管理员";
				var bl = false;

				if(!bl){
					bl = this.$check_action('/feedback_on_opinions/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/feedback_on_opinions/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/feedback_on_opinions/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/feedback_on_opinions/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/feedback_on_opinions/view','get');
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

		},
		created() {
						this.get_list_type_of_feedback_information();
							this.get_list_user_feedback_user();
					this.get_group_user_feedback_user();
									this.get_list_refund_goods();
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

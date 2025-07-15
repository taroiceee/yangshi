<template>
	<div class="diy_edit page_feedback_on_opinions" id="feedback_on_opinions_edit">
		<div class='warp'>
			<div class='container'>
				<div class='row diy_edit_content_box'>
						<div v-if="$check_field('set','title_name') || $check_field('add','title_name') || $check_field('get','title_name')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								标题名:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<div class="input-block" v-if="(form['title_name'] && $check_field('set','title_name')) || (!form['title_name'] && $check_field('add','title_name'))">
								<input type="text" id="form_title_name" v-model="form['title_name']" placeholder="请输入标题名" v-if="(form['title_name'] && $check_field('set','title_name')) || (!form['title_name'] && $check_field('add','title_name'))"  :disabled="disabledObj['title_name_isDisabled']"/>
															</div>
							<span v-else-if="$check_field('get','title_name')">{{ form['title_name'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','type_of_feedback_information') || $check_field('add','type_of_feedback_information') || $check_field('get','type_of_feedback_information')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								反馈信息类型:
							</span>
						</div>
								<!-- 选项 -->
						<div class="diy_field diy_down">
							<select id="form_type_of_feedback_information" v-model="form['type_of_feedback_information']" v-if="(form['type_of_feedback_information'] && $check_field('set','type_of_feedback_information')) || (!form['type_of_feedback_information'] && $check_field('add','type_of_feedback_information'))" >
								<option v-for="o in list_type_of_feedback_information" :value="o['classification_name']">
									{{ o['classification_name'] }}
								</option>
							</select>
							<span v-else-if="$check_field('get','type_of_feedback_information')">{{ form['type_of_feedback_information'] }}</span>
						</div>
							</div>
							<div v-if="$check_field('set','feedback_user') || $check_field('add','feedback_user') || $check_field('get','feedback_user')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								反馈用户:
							</span>
						</div>
						<div class="diy_field diy_down">
							<select id="form_feedback_user" :disabled="disabledObj['feedback_user_isDisabled']" v-model="form['feedback_user']" v-if="(form['feedback_user'] && $check_field('set','feedback_user')) || (!form['feedback_user'] && $check_field('add','feedback_user'))" >
								<option v-for="o in list_user_feedback_user" :value="o['user_id']">
									{{o['nickname'] + '-' + o['username']}}
								</option>
							</select>
							<span v-else-if="$check_field('get','feedback_user')">{{ get_user_info("feedback_user", form['feedback_user']) }}</span>
						</div>
					</div>
							<div v-if="$check_field('set','refund_type') || $check_field('add','refund_type') || $check_field('get','refund_type')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								退款类型:
							</span>
						</div>
								<!-- 选项 -->
						<div class="diy_field diy_down">
							<select id="form_refund_type" v-model="form['refund_type']" v-if="(form['refund_type'] && $check_field('set','refund_type')) || (!form['refund_type'] && $check_field('add','refund_type'))" >
								<option v-for="o in list_refund_type" :value="o">
									{{o}}
								</option>
							</select>
							<span v-else-if="$check_field('get','refund_type')">{{ form['refund_type'] }}</span>
						</div>
							</div>
							<div v-if="$check_field('set','refund_goods') || $check_field('add','refund_goods') || $check_field('get','refund_goods')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								退款商品:
							</span>
						</div>
								<!-- 选项 -->
						<div class="diy_field diy_down">
							<el-select id="refund_goods" v-model="refund_goods_multiple_value" multiple
									   @change="select_refund_goods_multiple"
									   v-if="(form['refund_goods'] && $check_field('set','refund_goods')) || (!form['refund_goods'] && $check_field('add','refund_goods'))">
								<el-option v-for="o in list_refund_goods" :key="o['name_of_commodity']" :label="o['name_of_commodity']"
										   :value="o['name_of_commodity']">
								</el-option>
							</el-select>
							<span v-else-if="$check_field('get','refund_goods')">{{ form['refund_goods'] }}</span>
						</div>
							</div>
							<div v-if="$check_field('set','upload_credential') || $check_field('add','upload_credential') || $check_field('get','upload_credential')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								上传凭证:
							</span>
						</div>
								<!-- 图片 -->
						<input type="file" :disabled="disabledObj['upload_credential_isDisabled']" style="display: none;" id="form_img_upload_credential" title="upload_credential" @change="change_file($event.target.files,'upload_credential')"/>
						<!-- 修改权限 -->
						<div class="diy_field diy_img" v-if="form['upload_credential'] && $check_field('set','upload_credential')">
							<label for="form_img_upload_credential">
								<img :src="$fullUrl(form['upload_credential'])" />
							</label>
						</div>
						<!-- 添加权限 -->
						<div class="diy_field diy_img" v-else-if="!form['upload_credential'] && $check_field('add','upload_credential')">
							<label for="form_img_upload_credential">
								<div class="btn_add_img">
									<span>+</span>
								</div>
							</label>
						</div>
						<!-- 查询权限 -->
						<div class="diy_field diy_img" v-else-if="$check_field('get','upload_credential')">
							<img :src="$fullUrl(form['upload_credential'])" />
						</div>
							</div>
							<div v-if="$check_field('set','more_vouchers') || $check_field('add','more_vouchers') || $check_field('get','more_vouchers')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								更多凭证:
							</span>
						</div>
								<!-- 图集 -->
						<input type="file" :disabled="disabledObj['more_vouchers_isDisabled']" style="display: none;" id="form_img_more_vouchers" title="more_vouchers" multiple="true" @change="change_file_multiple($event.target.files,'more_vouchers')"/>
						<!-- 添加权限 -->
						<div class="diy_field diy_img diy_img_multiple" v-if="$check_field('add','more_vouchers') || $check_field('set','more_vouchers')">
							<label for="form_img_more_vouchers">
								<div class="btn_add_img">
									<span>+</span>
								</div>
								<div v-for="(item, index) in form['more_vouchers']" :key="index" >
									<img :src="$fullUrl(item)" />
									<span class="img_del" @click="delImg(index,'more_vouchers')">x</span>
								</div>
							</label>
						</div>
						<!-- 修改权限 -->
						<div class="diy_field diy_img diy_img_multiple" v-else-if="form['more_vouchers'] && $check_field('set','more_vouchers')">
							<label for="form_img_more_vouchers">
								<div v-for="(item, index) in form['more_vouchers']" :key="index" >
									<img :src="$fullUrl(item)" />
									<span class="img_del" @click="delImg(index,'more_vouchers')">x</span>
								</div>
							</label>
						</div>
						
						<!-- 查询权限 -->
						<div class="diy_field diy_img diy_img_multiple" v-else-if="$check_field('get','more_vouchers')">
							<img :src="$fullUrl(item)" v-for="(item, index) in form['more_vouchers']" :key="index" />
						</div>
							</div>
							<div v-if="$check_field('set','upload_file') || $check_field('add','upload_file') || $check_field('get','upload_file')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								上传文件:
							</span>
						</div>
								<!-- 文件 -->
						<input type="file" style="display: none;" id="form_file_upload_file" title="upload_file" @change="change_file($event.target.files,'upload_file')"/>
						<!-- 修改权限 -->
						<div class="diy_field diy_img" v-if="form['upload_file'] && $check_field('set','upload_file')">
							<label for="form_file_upload_file">
								<!--<span>{{form['upload_file']}} </span>-->
								<a :href="$fullUrl(form['upload_file'])" target="_blank" style="color: rgb(64, 158, 255);">点击下载</a>
							</label>
						</div>
						<!-- 添加权限 -->
						<div class="diy_field diy_img" v-else-if="!form['upload_file'] && $check_field('add','upload_file')">
							<label for="form_file_upload_file">
								<div class="btn_add_img">
									<span>+</span>
								</div>
							</label>
						</div>
						<!-- 查询权限 -->
						<div class="diy_field diy_img" v-else-if="$check_field('get','upload_file')">
							<span>{{form['upload_file']}} </span>
						</div>
							</div>
							<div v-if="$check_field('set','upload_audio') || $check_field('add','upload_audio') || $check_field('get','upload_audio')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								上传音频:
							</span>
						</div>
								<!-- 音频 -->
						<div class="diy_field diy_music">
							<input type="file" id="form_music_upload_audio" title="upload_audio" @change="change_file($event.target.files,'upload_audio')" v-if="(form['upload_audio'] && $check_field('set','upload_audio')) || (!form['upload_audio'] && $check_field('add','upload_audio'))" />
							<router-link :to="'/media/music?url=' + form['upload_audio']" v-else-if="$check_field('get','upload_audio')">聆听音频</router-link>
						</div>
							</div>
							<div v-if="$check_field('set','upload_video') || $check_field('add','upload_video') || $check_field('get','upload_video')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								上传视频:
							</span>
						</div>
								<!-- 视频 -->
						<div class="diy_field diy_video">
							<input type="file" id="form_video_upload_video" title="upload_video" @change="change_file($event.target.files,'upload_video')" v-if="(form['upload_video'] && $check_field('set','upload_video')) || (!form['upload_video'] && $check_field('add','upload_video'))" />
							<router-link :to="'/media/video?url=' + form['upload_video']" v-else-if="$check_field('get','upload_video')">查看视频</router-link>
						</div>
							</div>
							<div v-if="$check_field('set','feedback_content') || $check_field('add','feedback_content') || $check_field('get','feedback_content')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								反馈内容:
							</span>
						</div>
								<!-- 多文本 -->
						<div class="diy_field diy_desc">
							<textarea id="form_feedback_content" v-model="form['feedback_content']" v-if="(form['feedback_content'] && $check_field('set','feedback_content')) || (!form['feedback_content'] && $check_field('add','feedback_content'))" :disabled="disabledObj['feedback_content_isDisabled']" />
							<span v-else-if="$check_field('get','feedback_content')">{{ form['feedback_content'] }}</span>
						</div>
							</div>
							<div v-if="$check_field('set','detailed_description') || $check_field('add','detailed_description') || $check_field('get','detailed_description')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								详细描述:
							</span>
						</div>
								<!-- 多文本 -->
						<div class="diy_field diy_desc">
							<textarea id="form_detailed_description" v-model="form['detailed_description']" v-if="(form['detailed_description'] && $check_field('set','detailed_description')) || (!form['detailed_description'] && $check_field('add','detailed_description'))"  :disabled="disabledObj['detailed_description_isDisabled']"/>
							<view v-else-if="$check_field('get','detailed_description')" v-html="form['detailed_description']"></view>
						</div>
							</div>
	




				</div>
				<div class="diy_edit_submit_box row">
					<div class="col-12">
						<div class="btn_box">
							<button class="btn_submit" @click="submit()">提交</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mixin from "@/mixins/page.js";
                        	export default {
		mixins: [mixin],
		components: {},
		data() {
			return {
				url_get_obj: "~/api/feedback_on_opinions/get_obj?",
				url_add: "~/api/feedback_on_opinions/add?",
				url_set: "~/api/feedback_on_opinions/set?",
																// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},

				// 查询条件
				query: {
						"title_name": "",
							"type_of_feedback_information": "",
							"feedback_user": 0,
							"refund_type": "",
							"refund_goods": "",
							"upload_credential": "",
							"more_vouchers": "",
							"upload_file": "",
							"upload_audio": "",
							"upload_video": "",
							"feedback_content": "",
							"detailed_description": "",
						"feedback_on_opinions_id": 0,
				},

				obj: {
						"title_name":  '', // 标题名
							"type_of_feedback_information":  '', // 反馈信息类型
							"feedback_user": 0, // 反馈用户
							"refund_type":  '', // 退款类型
							"refund_goods":  '', // 退款商品
							"upload_credential":  '', // 上传凭证
							"more_vouchers": [],
							"upload_file":  '', // 上传文件
							"upload_audio":  '', // 上传音频
							"upload_video":  '', // 上传视频
							"feedback_content":  '', // 反馈内容
							"detailed_description":  '', // 详细描述
						"feedback_on_opinions_id": 0,
				},

				// 表单字段
				form: {
						"title_name":  '', // 标题名
							"type_of_feedback_information":  '', // 反馈信息类型
							"feedback_user": 0, // 反馈用户
							"refund_type":  '', // 退款类型
							"refund_goods":  '', // 退款商品
							"upload_credential":  '', // 上传凭证
							"more_vouchers":  '', // 更多凭证
							"upload_file":  '', // 上传文件
							"upload_audio":  '', // 上传音频
							"upload_video":  '', // 上传视频
							"feedback_content":  '', // 反馈内容
							"detailed_description":  '', // 详细描述
						"feedback_on_opinions_id": 0,
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
									// 退款类型选项列表
				list_refund_type: ['其他','退款退货','仅退款','部分退款'],
										refund_goods_multiple_value:[],
						// 退款商品选项列表
				list_refund_goods: [""],
																								
				// ID字段
				field: "feedback_on_opinions_id",

			}
		},
		methods: {
																																																																																																																		formatDateValue(value) {
		  const date = new Date(value);
		  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
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
					async get_user_session_feedback_user(){
				var _this = this;
				var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
				if(json.result && json.result.obj){
					var source_table = json.result.obj.source_table;
					var user_id = _this.$store.state.user.user_id;
					if (user_id){
						var url = "~/api/"+source_table+"/get_obj?"
						this.$get(url, {"user_id":_this.$store.state.user.user_id}, function(res) {
							if (res.result && res.result.obj) {
								var arr = []
								for (let key in res.result.obj) {
									arr.push(key)
								}
								var arrForm = []
								for (let key in _this.form) {
									arrForm.push(key)
								}
								_this.form["feedback_user"] = user_id
								_this.disabledObj['feedback_user' + '_isDisabled'] = true
								for (var i=0;i<arr.length;i++){
                  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                    for (var j = 0; j < arrForm.length; j++) {
                      if (arr[i] === arrForm[j]) {
                        if (arr[i] !== "feedback_user") {
                          _this.form[arrForm[j]] = res.result.obj[arr[i]]
                          _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                          break;
                        }
                      }
                    }
                  }
								}
							}
						});
					}
				}
				else if(json.error){
					console.error(json.error);
				}
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
				if (v && v.length>0){
					this.form.refund_goods = v.toString();
				}
			},
					
				
				
				
				
				
				
				
		  		get_user_info(name,id){
				var obj = null;
      				  if (name == 'feedback_user'){
					  obj = this.list_user_feedback_user.getObj({"user_id":id});
				  }
                    				var ret = "";
				if(obj){
				  ret = obj.nickname+"-"+obj.username;
				}
				return ret;
			},
			/**
			 * 修改文件
			 * @param { Object } files 上传文件对象
			 * @param { String } str 表单的属性名
			 */
			change_file(files, str) {
				var form = new FormData();
				form.append("file", files[0]);
				this.$post("~/api/feedback_on_opinions/upload?", form, (res) => {
					if (res.result) {
						this.form[str] = res.result.url;
					} else if (res.error) {
						this.$toast(res.error.message);
					}
				});
			},
			
			/**
			 * 修改文件
			 * @param { Object } files 上传文件对象
			 * @param { String } str 表单的属性名
			 */
			change_file_multiple(files, str) {
				let _this = this;
				var form = new FormData();
				for (var i = 0; i < files.length; i++) {
					form.set("file", files[i]);
					_this.$post("~/api/feedback_on_opinions/upload?", form, (res) => {
						if (res.result) {
							if (_this.form[str].length > 0) {
								_this.form[str].push(res.result.url);
							} else {
								_this.form[str] = [res.result.url];
							}
						} else if (res.error) {
							_this.$toast(res.error.message);
						}
					});
				}
			},

			/**
			 * 获取对象后获取缓存表单
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_before(param){
				var form = $.db.get("form");
				// if (form) {
        //   delete(form.examine_state)
        //   delete(form.examine_reply)
        //   this.obj = $.push(this.obj ,form);
				// 	this.form = $.push(this.form ,form);
				// }
				// var arr = []
				// for (let key in form) {
				// 	arr.push(key)
				// }
				// for (var i=0;i<arr.length;i++){
				// 	this.disabledObj[arr[i] + '_isDisabled'] = true
				// }
        if (form) {
          var arr = []
          for (let key in form) {
            arr.push(key)
          }
          var arrForm = []
          for (let key in this.form) {
            arrForm.push(key)
          }
          for (var i=0;i<arr.length;i++){
            if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
              for (var j = 0; j < arrForm.length; j++) {
                if (arrForm[j] === arr[i]) {
                  this.form[arrForm[j]] = form[arr[i]]
                  this.obj[arrForm[j]] = form[arr[i]]
                  this.disabledObj[arrForm[j] + '_isDisabled'] = true
                  break;
                }
              }
			  if(arr[i] === "source_table"){
			  	this.form['source_table'] = form[arr[i]]
			  }
			  if(arr[i] === "source_id"){
			  	this.form['source_id'] = form[arr[i]]
			  }
			  if(arr[i] === "source_user_id"){
			  	this.form['source_user_id'] = form[arr[i]]
			  }
            }
          }
        }
																							if (this.form["more_vouchers"]) {
		  this.form["more_vouchers"] = JSON.parse(this.form["more_vouchers"])
		}
																
        $.db.del("form");
				return param;
			},

			/**
			 * 获取对象后获取缓存表单
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json ,func){
				// var form = $.db.get("form");
				// var obj = Object.assign({} ,form ,this.obj);
				// if (obj) {
        //   delete(obj.examine_state)
        //   delete(obj.examine_reply)
				// 	this.obj = $.push(this.obj ,obj);
				// }
				// if (form) {
        //   delete(form.examine_state)
        //   delete(form.examine_reply)
				// 	this.form = $.push(this.form ,form);
				// }

				if(func){
					func(json);
				}
			},

		},
		created() {
								this.get_list_type_of_feedback_information();
									this.get_user_session_feedback_user();
					this.get_list_user_feedback_user();
										this.get_list_refund_goods();
																																		},
	}
</script>

<style>
	.diy_compute{
		line-height: 40px;
	}
	.diy_field.diy_img_multiple{
		margin: 0;
	}
	.diy_field.diy_img_multiple div{
		float: left;
		position: relative;
		margin: 0 10px 10px 0;
	}
	.diy_field.diy_img_multiple img{
		height: 100px;
		width: auto;
	}
	.diy_field.diy_img_multiple span{
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



.input-block{
    display: flex;
    align-items: center;
}
.input-block .units{
    font-size: 14px;
    color: #666;
}
</style>

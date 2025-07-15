<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce">
							<el-col v-if="$check_field('get','name_of_session') || $check_field('add','name_of_session') || $check_field('set','name_of_session')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="场次名称" prop="name_of_session">
												<el-input id="name_of_session" v-model="form['name_of_session']" placeholder="请输入场次名称"
							  v-if="(form['schedule_of_sessions_id'] && $check_field('set','name_of_session')) || (!form['schedule_of_sessions_id'] && $check_field('add','name_of_session'))" :disabled="disabledObj['name_of_session_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','name_of_session')">
						{{form['name_of_session']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','schedule_of_sessions') || $check_field('add','schedule_of_sessions') || $check_field('set','schedule_of_sessions')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="场次安排" prop="schedule_of_sessions">
												<el-input id="schedule_of_sessions" v-model="form['schedule_of_sessions']" placeholder="请输入场次安排"
							  v-if="(form['schedule_of_sessions_id'] && $check_field('set','schedule_of_sessions')) || (!form['schedule_of_sessions_id'] && $check_field('add','schedule_of_sessions'))" :disabled="disabledObj['schedule_of_sessions_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','schedule_of_sessions')">
						{{form['schedule_of_sessions']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','activity_arrangement') || $check_field('add','activity_arrangement') || $check_field('set','activity_arrangement')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="活动安排" prop="activity_arrangement">
								<el-select id="activity_arrangement" v-model="activity_arrangement_multiple_value" multiple @change="select_activity_arrangement_multiple"
							   v-if="(form['schedule_of_sessions_id'] && $check_field('set','activity_arrangement')) || (!form['schedule_of_sessions_id'] && $check_field('add','activity_arrangement'))">
						<el-option v-for="o in list_activity_arrangement" :key="o['activity_type']" :label="o['activity_type']"
								   :value="o['activity_type']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','activity_arrangement')">{{form['activity_arrangement']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','activity_location') || $check_field('add','activity_location') || $check_field('set','activity_location')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="活动地点" prop="activity_location">
								<el-select id="activity_location" v-model="activity_location_multiple_value" multiple @change="select_activity_location_multiple"
							   v-if="(form['schedule_of_sessions_id'] && $check_field('set','activity_location')) || (!form['schedule_of_sessions_id'] && $check_field('add','activity_location'))">
						<el-option v-for="o in list_activity_location" :key="o['location_information']" :label="o['location_information']"
								   :value="o['location_information']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','activity_location')">{{form['activity_location']}}</div>
							</el-form-item>
			</el-col>
						
	
	
		
		
	
	
	
	
	</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/schedule_of_sessions/view','set') || $check_action('/schedule_of_sessions/view','add')">
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
				field: "schedule_of_sessions_id",
				url_add: "~/api/schedule_of_sessions/add?",
				url_set: "~/api/schedule_of_sessions/set?",
				url_get_obj: "~/api/schedule_of_sessions/get_obj?",
				url_upload: "~/api/schedule_of_sessions/upload?",

				query: {
					"schedule_of_sessions_id": 0,
				},

				form: {
								"name_of_session":  '', // 场次名称
										"schedule_of_sessions":  '', // 场次安排
										"activity_arrangement":  '', // 活动安排
										"activity_location":  '', // 活动地点
											"schedule_of_sessions_id": 0, // ID
													},
				disabledObj:{
								"name_of_session_isDisabled": false,
										"schedule_of_sessions_isDisabled": false,
										"activity_arrangement_isDisabled": false,
										"activity_location_isDisabled": false,
										},

																			activity_arrangement_multiple_value:[],
						// 活动安排选项列表
				list_activity_arrangement: [""],
													activity_location_multiple_value:[],
						// 活动地点选项列表
				list_activity_location: [""],
						
			}
		},
		methods: {
					  openPreview(file) {
	    window.open(file.url)
	  },
		
	
				
	
				
				/**
			 * 获取活动安排列表
			 */
			async get_list_activity_arrangement() {
				var json = await this.$get("~/api/offline_activities/get_list?");
				if(json.result && json.result.list){
					this.list_activity_arrangement = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
							select_activity_arrangement_multiple(v){
									this.form.activity_arrangement = "";
								if (v && v.length > 0) {
											this.form.activity_arrangement = v.toString();
									}
			},
			
				
				/**
			 * 获取活动地点列表
			 */
			async get_list_activity_location() {
				var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					this.list_activity_location = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
							select_activity_location_multiple(v){
									this.form.activity_location = "";
								if (v && v.length > 0) {
											this.form.activity_location = v.toString();
									}
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

																							if (json.result.obj.activity_arrangement){
					this.activity_arrangement_multiple_value = json.result.obj.activity_arrangement.split(",")
				}
												if (json.result.obj.activity_location){
					this.activity_location_multiple_value = json.result.obj.activity_location.split(",")
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
					bl = this.$check_action('/schedule_of_sessions/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/schedule_of_sessions/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/schedule_of_sessions/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/schedule_of_sessions/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/schedule_of_sessions/view','get');
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
								this.get_list_activity_arrangement();
						this.get_list_activity_location();
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

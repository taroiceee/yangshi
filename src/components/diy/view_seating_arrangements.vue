<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce">
							<el-col v-if="$check_field('get','name_of_session') || $check_field('add','name_of_session') || $check_field('set','name_of_session')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="场次名称" prop="name_of_session">
												<el-input id="name_of_session" v-model="form['name_of_session']" placeholder="请输入场次名称"
							  v-if="(form['seating_arrangements_id'] && $check_field('set','name_of_session')) || (!form['seating_arrangements_id'] && $check_field('add','name_of_session'))" :disabled="disabledObj['name_of_session_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','name_of_session')">
						{{form['name_of_session']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','date_of_session') || $check_field('add','date_of_session') || $check_field('set','date_of_session')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="场次日期" prop="date_of_session">
								<el-date-picker :disabled="disabledObj['date_of_session_isDisabled']" v-if="(form['seating_arrangements_id'] && $check_field('set','date_of_session')) || (!form['seating_arrangements_id'] && $check_field('add','date_of_session'))" id="date_of_session"
						v-model="form['date_of_session']" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
					</el-date-picker>
					<div v-else-if="$check_field('get','date_of_session')">{{form['date_of_session']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','schedule_of_sessions') || $check_field('add','schedule_of_sessions') || $check_field('set','schedule_of_sessions')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="场次安排" prop="schedule_of_sessions">
								<el-input-number id="schedule_of_sessions" v-model.number="form['schedule_of_sessions']"
						v-if="(form['seating_arrangements_id'] && $check_field('set','schedule_of_sessions')) || (!form['seating_arrangements_id'] && $check_field('add','schedule_of_sessions'))" :disabled="disabledObj['schedule_of_sessions_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','schedule_of_sessions')">{{form['schedule_of_sessions']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','arrange_person_times') || $check_field('add','arrange_person_times') || $check_field('set','arrange_person_times')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="安排人次" prop="arrange_person_times">
												<el-input id="arrange_person_times" v-model="form['arrange_person_times']" placeholder="请输入安排人次"
							  v-if="(form['seating_arrangements_id'] && $check_field('set','arrange_person_times')) || (!form['seating_arrangements_id'] && $check_field('add','arrange_person_times'))" :disabled="disabledObj['arrange_person_times_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','arrange_person_times')">
						{{form['arrange_person_times']}}
				  					</div>
											</el-form-item>
			</el-col>
						
	
	
		
		
	
	
	
	
	</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/seating_arrangements/view','set') || $check_action('/seating_arrangements/view','add')">
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
				field: "seating_arrangements_id",
				url_add: "~/api/seating_arrangements/add?",
				url_set: "~/api/seating_arrangements/set?",
				url_get_obj: "~/api/seating_arrangements/get_obj?",
				url_upload: "~/api/seating_arrangements/upload?",

				query: {
					"seating_arrangements_id": 0,
				},

				form: {
								"name_of_session":  '', // 场次名称
										"date_of_session":  '', // 场次日期
										"schedule_of_sessions":  0, // 场次安排
										"arrange_person_times":  '', // 安排人次
											"seating_arrangements_id": 0, // ID
													},
				disabledObj:{
								"name_of_session_isDisabled": false,
										"date_of_session_isDisabled": false,
					          			"schedule_of_sessions_isDisabled": false,
										"arrange_person_times_isDisabled": false,
										},

																									arrange_person_times_multiple_value:[],
						// 安排人次选项列表
				list_arrange_person_times: [""],
						
			}
		},
		methods: {
					  openPreview(file) {
	    window.open(file.url)
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
				        if (this.form["date_of_session"] && JSON.stringify(this.form["date_of_session"]).indexOf("-")===-1){
          this.form["date_of_session"] = this.$toTime(parseInt(this.form["date_of_session"]),"yyyy-MM-dd")
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

													if(json.result.obj["date_of_session"]=="0000-00-00"){
				  json.result.obj["date_of_session"] = null;
				}
				if(parseInt(json.result.obj["date_of_session"]) > 9999){
					json.result.obj["date_of_session"] = this.$toTime(parseInt(json.result.obj["date_of_session"]),"yyyy-MM-dd")
				}
																						if (json.result.obj.arrange_person_times){
					this.arrange_person_times_multiple_value = json.result.obj.arrange_person_times.split(",")
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
																						if (!param.date_of_session){
					return "场次日期不能为空";
				}
																																						return null;
			},

			is_view(){
				// var bl = this.user_group == "管理员";
				var bl = false;

				if(!bl){
					bl = this.$check_action('/seating_arrangements/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/seating_arrangements/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/seating_arrangements/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/seating_arrangements/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/seating_arrangements/view','get');
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

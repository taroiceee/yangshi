<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce">
							<el-col v-if="$check_field('get','activity_name') || $check_field('add','activity_name') || $check_field('set','activity_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="活动名称" prop="activity_name">
												<el-input id="activity_name" v-model="form['activity_name']" placeholder="请输入活动名称"
							  v-if="(form['offline_activities_id'] && $check_field('set','activity_name')) || (!form['offline_activities_id'] && $check_field('add','activity_name'))" :disabled="disabledObj['activity_name_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','activity_name')">
						{{form['activity_name']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','activity_type') || $check_field('add','activity_type') || $check_field('set','activity_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="活动类型" prop="activity_type">
												<el-input id="activity_type" v-model="form['activity_type']" placeholder="请输入活动类型"
							  v-if="(form['offline_activities_id'] && $check_field('set','activity_type')) || (!form['offline_activities_id'] && $check_field('add','activity_type'))" :disabled="disabledObj['activity_type_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','activity_type')">
						{{form['activity_type']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','activity_description') || $check_field('add','activity_description') || $check_field('set','activity_description')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="活动描述" prop="activity_description">
								<el-input type="textarea" id="activity_description" v-model="form['activity_description']" placeholder="请输入活动描述"
						v-if="(form['offline_activities_id'] && $check_field('set','activity_description')) || (!form['offline_activities_id'] && $check_field('add','activity_description'))" :disabled="disabledObj['activity_description_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','activity_description')">{{form['activity_description']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','activity_date') || $check_field('add','activity_date') || $check_field('set','activity_date')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="活动日期" prop="activity_date">
								<el-date-picker :disabled="disabledObj['activity_date_isDisabled']" v-if="(form['offline_activities_id'] && $check_field('set','activity_date')) || (!form['offline_activities_id'] && $check_field('add','activity_date'))" id="activity_date"
						v-model="form['activity_date']" type="date" placeholder="选择日期" :picker-options="activity_date_disableOptions" value-format="yyyy-MM-dd">
					</el-date-picker>
					<div v-else-if="$check_field('get','activity_date')">{{form['activity_date']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','number_of_enrolment') || $check_field('add','number_of_enrolment') || $check_field('set','number_of_enrolment')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="报名人数" prop="number_of_enrolment">
								<el-input-number id="number_of_enrolment" v-model.number="form['number_of_enrolment']"
						v-if="(form['offline_activities_id'] && $check_field('set','number_of_enrolment')) || (!form['offline_activities_id'] && $check_field('add','number_of_enrolment'))" :disabled="disabledObj['number_of_enrolment_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','number_of_enrolment')">{{form['number_of_enrolment']}}</div>
											</el-form-item>
			</el-col>
						
	
	
		
				<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
			  <el-form-item label="详细地址">
			    <el-input id="mark_address" v-model="form['mark_address']" placeholder="请输入地址" clearable v-if="(form['offline_activities_id}'] && $check_action('/offline_activities/view', 'set')) || (!form['offline_activities_id}'] && $check_action('/offline_activities/view', 'add'))"></el-input>
			    <div v-else-if="$check_action('/offline_activities/view', 'get')" v-html="form['mark_address']"></div>
			  </el-form-item>
			</el-col>
		
	
	
	
	
	</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/offline_activities/view','set') || $check_action('/offline_activities/view','add')">
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
	import { baiduMap } from "@/utils/baidu_map.js";
          
	export default {
		mixins: [mixin],
		data() {
			return {
				field: "offline_activities_id",
				url_add: "~/api/offline_activities/add?",
				url_set: "~/api/offline_activities/set?",
				url_get_obj: "~/api/offline_activities/get_obj?",
				url_upload: "~/api/offline_activities/upload?",

				query: {
					"offline_activities_id": 0,
				},

				form: {
								"activity_name":  '', // 活动名称
										"activity_type":  '', // 活动类型
										"activity_description":  '', // 活动描述
										"activity_date":  '', // 活动日期
										"number_of_enrolment":  0, // 报名人数
											"offline_activities_id": 0, // ID
														"mark_address": "",	// 详细地址
					},
				disabledObj:{
								"activity_name_isDisabled": false,
										"activity_type_isDisabled": false,
										"activity_description_isDisabled": false,
										"activity_date_isDisabled": false,
					          			"number_of_enrolment_isDisabled": false,
										},

													// 活动类型选项列表
				list_activity_type: [""],
																				activity_date_disableOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					},
				},
									
			}
		},
		mounted() {
		  baiduMap().then((BMap) => {
		    this.initMap(BMap);
		  });
		},
		methods: {
			initMap(BMap) {
			  // 创建地图实例
			  var ac = new BMap.Autocomplete({
			    input: "mark_address",
			    location: "中国",
			  });
			  // 监听选中地址事件
			  ac.addEventListener("onconfirm", (e) => {
			    const _value = e.item.value;
			    const value =
			      _value.province +
			      _value.city +
			      _value.district +
			      _value.street +
			      _value.business;
			    this.form.mark_address = value;
			  });
			},
			// 创建地址转经纬度
			getCoordinates(address) {
			  return new Promise((resolve, reject) => {
			    var myGeo = new BMap.Geocoder();
			    myGeo.getPoint(
			      address,
			      function (point) {
			        if (point) {
			          resolve(point);
			        } else {
			          reject("无法获取坐标，请检查地址是否正确");
			        }
			      },
			      "中国"
			    );
			  });
			},
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
								        if (this.form["activity_date"] && JSON.stringify(this.form["activity_date"]).indexOf("-")===-1){
          this.form["activity_date"] = this.$toTime(parseInt(this.form["activity_date"]),"yyyy-MM-dd")
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

																											if(json.result.obj["activity_date"]=="0000-00-00"){
				  json.result.obj["activity_date"] = null;
				}
				if(parseInt(json.result.obj["activity_date"]) > 9999){
					json.result.obj["activity_date"] = this.$toTime(parseInt(json.result.obj["activity_date"]),"yyyy-MM-dd")
				}
													

			},

																																									async submit(param, func){
				if (!param) {
					param = this.form;
				}
									if (param["mark_address"]) {
					  const point = await this.getCoordinates(param["mark_address"]);
					  param["mark_lng"] = Number(point.lng.toFixed(8));
					  param["mark_lat"] = Number(point.lat.toFixed(8));
					};
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
																																												if (!param.activity_date){
					return "活动日期不能为空";
				}
																											return null;
			},

			is_view(){
				// var bl = this.user_group == "管理员";
				var bl = false;

				if(!bl){
					bl = this.$check_action('/offline_activities/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/offline_activities/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/offline_activities/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/offline_activities/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/offline_activities/view','get');
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

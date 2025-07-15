<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce">
							<el-col v-if="$check_field('get','order_number') || $check_field('add','order_number') || $check_field('set','order_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="订单号" prop="order_number">
												<el-input id="order_number" v-model="form['order_number']" placeholder="请输入订单号"
							  v-if="(form['evaluation_feedback_id'] && $check_field('set','order_number')) || (!form['evaluation_feedback_id'] && $check_field('add','order_number'))" :disabled="disabledObj['order_number_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','order_number')">
						{{form['order_number']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','name_of_commodity') || $check_field('add','name_of_commodity') || $check_field('set','name_of_commodity')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商品名称" prop="name_of_commodity">
												<el-input id="name_of_commodity" v-model="form['name_of_commodity']" placeholder="请输入商品名称"
							  v-if="(form['evaluation_feedback_id'] && $check_field('set','name_of_commodity')) || (!form['evaluation_feedback_id'] && $check_field('add','name_of_commodity'))" :disabled="disabledObj['name_of_commodity_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','name_of_commodity')">
						{{form['name_of_commodity']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','category_name') || $check_field('add','category_name') || $check_field('set','category_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="分类名称" prop="category_name">
												<el-input id="category_name" v-model="form['category_name']" placeholder="请输入分类名称"
							  v-if="(form['evaluation_feedback_id'] && $check_field('set','category_name')) || (!form['evaluation_feedback_id'] && $check_field('add','category_name'))" :disabled="disabledObj['category_name_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','category_name')">
						{{form['category_name']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','business_user') || $check_field('add','business_user') || $check_field('set','business_user')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商家用户" prop="business_user">
													<el-select v-if="(form['evaluation_feedback_id'] && $check_field('set','business_user')) || (!form['evaluation_feedback_id'] && $check_field('add','business_user'))" id="business_user" v-model="form['business_user']" :disabled="disabledObj['business_user_isDisabled']">
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
							  v-if="(form['evaluation_feedback_id'] && $check_field('set','customized_price')) || (!form['evaluation_feedback_id'] && $check_field('add','customized_price'))" :disabled="disabledObj['customized_price_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','customized_price')">
						{{form['customized_price']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','custom_user') || $check_field('add','custom_user') || $check_field('set','custom_user')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="定制用户" prop="custom_user">
													<el-select v-if="(form['evaluation_feedback_id'] && $check_field('set','custom_user')) || (!form['evaluation_feedback_id'] && $check_field('add','custom_user'))" id="custom_user" v-model="form['custom_user']" :disabled="disabledObj['custom_user_isDisabled']">
							<el-option v-for="o in list_user_custom_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
						<el-select v-else-if="$check_field('get','custom_user')" id="custom_user" v-model="form['custom_user']" :disabled="true">
							<el-option v-for="o in list_user_custom_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','delivery_date') || $check_field('add','delivery_date') || $check_field('set','delivery_date')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="交付日期" prop="delivery_date">
								<el-date-picker :disabled="disabledObj['delivery_date_isDisabled']" v-if="(form['evaluation_feedback_id'] && $check_field('set','delivery_date')) || (!form['evaluation_feedback_id'] && $check_field('add','delivery_date'))" id="delivery_date"
						v-model="form['delivery_date']" type="date" placeholder="选择日期" :picker-options="delivery_date_disableOptions" value-format="yyyy-MM-dd">
					</el-date-picker>
					<div v-else-if="$check_field('get','delivery_date')">{{form['delivery_date']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','evaluation_time') || $check_field('add','evaluation_time') || $check_field('set','evaluation_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="评价时间" prop="evaluation_time">
								<el-date-picker :disabled="disabledObj['evaluation_time_isDisabled']" v-if="(form['evaluation_feedback_id'] && $check_field('set','evaluation_time')) || (!form['evaluation_feedback_id'] && $check_field('add','evaluation_time'))" id="evaluation_time"
						v-model="form['evaluation_time']" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<div v-else-if="$check_field('get','evaluation_time')">{{form['evaluation_time']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','evaluation_grade') || $check_field('add','evaluation_grade') || $check_field('set','evaluation_grade')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="评价等级" prop="evaluation_grade">
								<el-select id="evaluation_grade" v-model="form['evaluation_grade']"
						v-if="(form['evaluation_feedback_id'] && $check_field('set','evaluation_grade')) || (!form['evaluation_feedback_id'] && $check_field('add','evaluation_grade'))">
						<el-option v-for="o in list_evaluation_grade" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','evaluation_grade')">{{form['evaluation_grade']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','optimization_recommendations') || $check_field('add','optimization_recommendations') || $check_field('set','optimization_recommendations')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="优化建议" prop="optimization_recommendations">
								<el-input type="textarea" id="optimization_recommendations" v-model="form['optimization_recommendations']" placeholder="请输入优化建议"
						v-if="(form['evaluation_feedback_id'] && $check_field('set','optimization_recommendations')) || (!form['evaluation_feedback_id'] && $check_field('add','optimization_recommendations'))" :disabled="disabledObj['optimization_recommendations_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','optimization_recommendations')">{{form['optimization_recommendations']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','performance_score') || $check_field('add','performance_score') || $check_field('set','performance_score')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="性能评分" prop="performance_score">
								<el-input-number id="performance_score" v-model.number="form['performance_score']"
						v-if="(form['evaluation_feedback_id'] && $check_field('set','performance_score')) || (!form['evaluation_feedback_id'] && $check_field('add','performance_score'))" :disabled="disabledObj['performance_score_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','performance_score')">{{form['performance_score']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','practicality_score') || $check_field('add','practicality_score') || $check_field('set','practicality_score')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="实用性评分" prop="practicality_score">
								<el-input-number id="practicality_score" v-model.number="form['practicality_score']"
						v-if="(form['evaluation_feedback_id'] && $check_field('set','practicality_score')) || (!form['evaluation_feedback_id'] && $check_field('add','practicality_score'))" :disabled="disabledObj['practicality_score_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','practicality_score')">{{form['practicality_score']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','appearance_appearance_rating') || $check_field('add','appearance_appearance_rating') || $check_field('set','appearance_appearance_rating')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="外貌外观评分" prop="appearance_appearance_rating">
								<el-input-number id="appearance_appearance_rating" v-model.number="form['appearance_appearance_rating']"
						v-if="(form['evaluation_feedback_id'] && $check_field('set','appearance_appearance_rating')) || (!form['evaluation_feedback_id'] && $check_field('add','appearance_appearance_rating'))" :disabled="disabledObj['appearance_appearance_rating_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','appearance_appearance_rating')">{{form['appearance_appearance_rating']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','cost_effective') || $check_field('add','cost_effective') || $check_field('set','cost_effective')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="性价比" prop="cost_effective">
								<el-input-number id="cost_effective" v-model.number="form['cost_effective']"
						v-if="(form['evaluation_feedback_id'] && $check_field('set','cost_effective')) || (!form['evaluation_feedback_id'] && $check_field('add','cost_effective'))" :disabled="disabledObj['cost_effective_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','cost_effective')">{{form['cost_effective']}}</div>
											</el-form-item>
			</el-col>
						
	
	
		
		
	
	
	
	
	</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/evaluation_feedback/view','set') || $check_action('/evaluation_feedback/view','add')">
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
				field: "evaluation_feedback_id",
				url_add: "~/api/evaluation_feedback/add?",
				url_set: "~/api/evaluation_feedback/set?",
				url_get_obj: "~/api/evaluation_feedback/get_obj?",
				url_upload: "~/api/evaluation_feedback/upload?",

				query: {
					"evaluation_feedback_id": 0,
				},

				form: {
								"order_number":  '', // 订单号
										"name_of_commodity":  '', // 商品名称
										"category_name":  '', // 分类名称
										"business_user": 0, // 商家用户
										"customized_price":  '', // 定制价格
										"custom_user": 0, // 定制用户
										"delivery_date":  '', // 交付日期
										"evaluation_time":  '', // 评价时间
										"evaluation_grade":  '', // 评价等级
										"optimization_recommendations":  '', // 优化建议
										"performance_score":  0, // 性能评分
										"practicality_score":  0, // 实用性评分
										"appearance_appearance_rating":  0, // 外貌外观评分
										"cost_effective":  0, // 性价比
											"evaluation_feedback_id": 0, // ID
													},
				disabledObj:{
								"order_number_isDisabled": false,
										"name_of_commodity_isDisabled": false,
										"category_name_isDisabled": false,
										"business_user_isDisabled": false,
										"customized_price_isDisabled": false,
										"custom_user_isDisabled": false,
										"delivery_date_isDisabled": false,
										"evaluation_time_isDisabled": false,
										"evaluation_grade_isDisabled": false,
										"optimization_recommendations_isDisabled": false,
					          			"performance_score_isDisabled": false,
					          			"practicality_score_isDisabled": false,
					          			"appearance_appearance_rating_isDisabled": false,
					          			"cost_effective_isDisabled": false,
										},

																									// 用户列表
				list_user_business_user: [],
																			// 用户列表
				list_user_custom_user: [],
														delivery_date_disableOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					},
				},
																// 评价等级选项列表
				list_evaluation_grade: ['优','良','中','差'],
																																				
			}
		},
		methods: {
															  openPreview(file) {
	    window.open(file.url)
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
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
															// 获取缓存数据附加
				form = $.db.get("form");
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
														        if (this.form["delivery_date"] && JSON.stringify(this.form["delivery_date"]).indexOf("-")===-1){
          this.form["delivery_date"] = this.$toTime(parseInt(this.form["delivery_date"]),"yyyy-MM-dd")
        }
		        if (this.form["evaluation_time"] && JSON.stringify(this.form["evaluation_time"]).indexOf("-")===-1){
            this.form["evaluation_time"] = this.$toTime(parseInt(this.form["evaluation_time"]),"yyyy-MM-dd hh:mm:ss")
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

																																																if(json.result.obj["delivery_date"]=="0000-00-00"){
				  json.result.obj["delivery_date"] = null;
				}
				if(parseInt(json.result.obj["delivery_date"]) > 9999){
					json.result.obj["delivery_date"] = this.$toTime(parseInt(json.result.obj["delivery_date"]),"yyyy-MM-dd")
				}
											if(json.result.obj["evaluation_time"]=="0000-00-00 00:00:00"){
				  json.result.obj["evaluation_time"] = null;
				}
				if(parseInt(json.result.obj["evaluation_time"]) > 9999){
					json.result.obj["evaluation_time"] = this.$toTime(parseInt(json.result.obj["evaluation_time"]),"yyyy-MM-dd hh:mm:ss")
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
																																																																													if (!param.delivery_date){
					return "交付日期不能为空";
				}
																	if (!param.evaluation_time){
					return "评价时间不能为空";
				}
																																																																																		return null;
			},

			is_view(){
				// var bl = this.user_group == "管理员";
				var bl = false;

				if(!bl){
					bl = this.$check_action('/evaluation_feedback/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/evaluation_feedback/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/evaluation_feedback/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/evaluation_feedback/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/evaluation_feedback/view','get');
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
											this.get_list_user_business_user();
										this.get_list_user_custom_user();
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

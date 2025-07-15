<template>
	<el-main class="bg edit_wrap">
		<iframe :srcdoc="iframeContent" id='printIframe' width="600" height="400" style="display: none;"></iframe>
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce">
	            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="封面图" prop="cart_avatar">
                    <el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
                               action="" :http-request="upload_cart_img" :show-file-list="false">
                        <img id="cart_img" v-if="form.cart_img" :src="$fullUrl(form.cart_img)" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="主图_1" prop="cart_avatar">
                    <el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
                               action="" :http-request="upload_cart_img_1" :show-file-list="false">
                        <img id="cart_img_1" v-if="form.cart_img_1" :src="$fullUrl(form.cart_img_1)" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="主图_2" prop="cart_avatar">
                    <el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
                               action="" :http-request="upload_cart_img_2" :show-file-list="false">
                        <img id="cart_img_2" v-if="form.cart_img_2" :src="$fullUrl(form.cart_img_2)" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="主图_3" prop="cart_avatar">
                    <el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
                               action="" :http-request="upload_cart_img_3" :show-file-list="false">
                        <img id="cart_img_3" v-if="form.cart_img_3" :src="$fullUrl(form.cart_img_3)" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="主图_4" prop="cart_avatar">
                    <el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
                               action="" :http-request="upload_cart_img_4" :show-file-list="false">
                        <img id="cart_img_4" v-if="form.cart_img_4" :src="$fullUrl(form.cart_img_4)" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="主图_5" prop="cart_avatar">
                    <el-upload class="avatar-uploader" drag accept="image/gif, image/jpeg, image/png, image/jpg"
                               action="" :http-request="upload_cart_img_5" :show-file-list="false">
                        <img id="cart_img_5" v-if="form.cart_img_5" :src="$fullUrl(form.cart_img_5)" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="12" class="el_form_item_warp">
                <el-form-item label="标题" prop="cart_title">
                    <el-input v-model="form.cart_title" placeholder="请输入标题"></el-input>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="12" class="el_form_item_warp">
                <el-form-item label="描述" prop="cart_description">
                    <el-input v-model="form.cart_description" placeholder="请输入描述"></el-input>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="原价" prop="cart_price_ago">
                    <el-input-number v-model="form.cart_price_ago"></el-input-number>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="卖价" prop="cart_price">
                    <el-input-number v-model="form.cart_price"></el-input-number>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="库存" prop="cart_inventory">
                    <el-input-number v-model="form.cart_inventory" placeholder="请输入库存"></el-input-number>
                </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
                <el-form-item label="分类" prop="cart_type">
                    <el-select v-model="form.cart_type">
                        <el-option v-for="(o ,i) in list_cart_goods_type" :value="o.name" :key="i"
                                   :label="o.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
							<el-col v-if="$check_field('get','commodity_number') || $check_field('add','commodity_number') || $check_field('set','commodity_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商品编号" prop="commodity_number">
												<el-input id="commodity_number" v-model="form['commodity_number']" placeholder="请输入商品编号"
							  v-if="(form['fresh_goods_id'] && $check_field('set','commodity_number')) || (!form['fresh_goods_id'] && $check_field('add','commodity_number'))" :disabled="true">
				  					</el-input>
					<div v-else-if="$check_field('get','commodity_number')">
						{{form['commodity_number']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','order_rules') || $check_field('add','order_rules') || $check_field('set','order_rules')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="下单规则" prop="order_rules">
												<el-input id="order_rules" v-model="form['order_rules']" placeholder="请输入下单规则"
							  v-if="(form['fresh_goods_id'] && $check_field('set','order_rules')) || (!form['fresh_goods_id'] && $check_field('add','order_rules'))" :disabled="disabledObj['order_rules_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','order_rules')">
						{{form['order_rules']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','seller_user') || $check_field('add','seller_user') || $check_field('set','seller_user')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="卖家用户" prop="seller_user">
																		<div v-if="user_group !== '管理员'">
							{{ get_user_session_seller_user(form['seller_user']) }}
							<el-select v-if="(form['fresh_goods_id'] && $check_field('set','seller_user')) || (!form['fresh_goods_id'] && $check_field('add','seller_user'))" id="seller_user" v-model="form['seller_user']" :disabled="disabledObj['seller_user_isDisabled']">
								<el-option v-for="o in list_user_seller_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','seller_user')" id="seller_user" v-model="form['seller_user']" :disabled="true">
								<el-option v-for="o in list_user_seller_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="seller_user" v-model="form['seller_user']" :disabled="disabledObj['seller_user_isDisabled']">
							<el-option v-for="o in list_user_seller_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
																</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','store_address') || $check_field('add','store_address') || $check_field('set','store_address')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="店铺地址" prop="store_address">
												<el-input id="store_address" v-model="form['store_address']" placeholder="请输入店铺地址"
							  v-if="(form['fresh_goods_id'] && $check_field('set','store_address')) || (!form['fresh_goods_id'] && $check_field('add','store_address'))" :disabled="disabledObj['store_address_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','store_address')">
						{{form['store_address']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','shop_name') || $check_field('add','shop_name') || $check_field('set','shop_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="店铺名称" prop="shop_name">
												<el-input id="shop_name" v-model="form['shop_name']" placeholder="请输入店铺名称"
							  v-if="(form['fresh_goods_id'] && $check_field('set','shop_name')) || (!form['fresh_goods_id'] && $check_field('add','shop_name'))" :disabled="disabledObj['shop_name_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','shop_name')">
						{{form['shop_name']}}
				  					</div>
											</el-form-item>
			</el-col>
						
	
	
		
		
	
	
	
	            <el-col :xs="24" :sm="24" :lg="24" class="el_form_editor_warp">
                <el-form-item label="正文" prop="cart_content">
                    <quill-editor v-model="form.cart_content">
                    </quill-editor>
                </el-form-item>
            </el-col>
	
	</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/fresh_goods/view','set') || $check_action('/fresh_goods/view','add')">
					<el-button type="primary" @click="submit()">提交</el-button>
					<el-button @click="cancel()">取消</el-button>
					<el-button v-if="!!query.fresh_goods_id"  type="primary" @click="sendprint">打印</el-button>
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
				iframeContent:'',
				field: "fresh_goods_id",
				url_add: "~/api/fresh_goods/add?",
				url_set: "~/api/fresh_goods/set?",
				url_get_obj: "~/api/fresh_goods/get_obj?",
				url_upload: "~/api/fresh_goods/upload?",

				query: {
					"fresh_goods_id": 0,
				},

				form: {
								"commodity_number": this.$get_stamp(), // 商品编号
										"order_rules":  '', // 下单规则
										"seller_user": 0, // 卖家用户
										"store_address":  '', // 店铺地址
										"shop_name": '', // 店铺名称
						                    cart_title: "",
                    cart_img: "",
                    cart_description: "",
                    cart_price_ago: 0,
                    cart_price: 0,
                    cart_inventory: 0,
                    cart_type: '',
                    cart_content: "",
                    cart_img_1: "",
                    cart_img_2: "",
                    cart_img_3: "",
                    cart_img_4: "",
                    cart_img_5: "",
						"fresh_goods_id": 0, // ID
													},
				disabledObj:{
								"commodity_number_isDisabled": false,
										"order_rules_isDisabled": false,
										"seller_user_isDisabled": false,
										"store_address_isDisabled": false,
										"shop_name_isDisabled": false,
										},

																			// 用户列表
				list_user_seller_user: [],
						// 用户组
				group_user_seller_user: "",
																		                list_cart_goods_type: [],
				goods_form:{
					goods_id: 0,
					title: "",
					img: "",
					description: "",
					price_ago: 0,
					price: 0,
					inventory: 0,
					type: '',
					content: "",
					img_1: "",
					img_2: "",
					img_3: "",
					img_4: "",
					img_5: "",
					source_table: "",
					source_field: "",
					source_id: 0,
					user_id:this.$store.state.user.user_id
				},

			}
		},
		methods: {
			sendprint(){
				let imgArrs = [
											{ label: '封面图', key: 'cart_img', value: document.getElementById('cart_img').src},
						{ label: '主图_1', key: 'cart_img_1', value: document.getElementById('cart_img_1').src },
						{ label: '主图_2', key: 'cart_img_2', value: document.getElementById('cart_img_2').src },
						{ label: '主图_3', key: 'cart_img_3', value: document.getElementById('cart_img_3').src},
						{ label: '主图_4', key: 'cart_img_4', value: document.getElementById('cart_img_4').src },
						{ label: '主图_5', key: 'cart_img_5', value: document.getElementById('cart_img_2').src },
																																																																					];
				let formArrs = [
											{ label: '标题', key: 'cart_title', value: '' },
						{ label: '描述', key: 'cart_description', value: '' },
						{ label: '原价', key: 'cart_price_ago', value: '' },
						{ label: '卖价', key: 'cart_price', value: '' },
						{ label: '库存', key: 'cart_inventory', value: '' },
						{ label: '分类', key: 'cart_type', value: '' },
						{ label: '正文', key: 'cart_content', value: '' },
																							{ label: '商品编号', key: 'commodity_number', value: '' },
																								{ label: '下单规则', key: 'order_rules', value: '' },
																								{ label: '卖家用户', key: 'seller_user', value: '' },
																								{ label: '店铺地址', key: 'store_address', value: '' },
																								{ label: '店铺名称', key: 'shop_name', value: '' },
																				]
				let otherAddArrs=[
														]
				this.printFrame(imgArrs,formArrs,this.obj,otherAddArrs)
			},
						  openPreview(file) {
	    window.open(file.url)
	  },
		
	
				
	
				
	
				/**
			 * 获取商家用户用户列表
			 */
			async get_list_user_seller_user() {
                var json = await this.$get("~/api/user/get_list?user_group=商家用户");
                if(json.result && json.result.list){
                    this.list_user_seller_user = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
					/**
			 * 获取商家用户用户组
			 */
			async get_group_user_seller_user() {
							this.form["seller_user"] = this.$store.state.user.user_id;
							var json = await this.$get("~/api/user_group/get_obj?name=商家用户");
				if(json.result && json.result.obj){
					this.group_user_seller_user = json.result.obj;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_session_seller_user(id){
				var _this = this;
				var user_id = {"user_id":id}
				var url = "~/api/"+_this.group_user_seller_user.source_table+"/get_obj?"
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
												_this.form["seller_user"] = id
									_this.disabledObj['seller_user' + '_isDisabled'] = true
						for (var i=0;i<arr.length;i++){
						  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
							for (var j = 0; j < arrForm.length; j++) {
							  if (arr[i] === arrForm[j]) {
								if (arr[i] !== "seller_user") {
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
					get_user_seller_user(id){
				var obj = this.list_user_seller_user.getObj({"user_id":id});
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
																																																							if (!param.shop_name){
					return "店铺名称不能为空";
				}
																return null;
			},

			is_view(){
				// var bl = this.user_group == "管理员";
				var bl = false;

				if(!bl){
					bl = this.$check_action('/fresh_goods/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/fresh_goods/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/fresh_goods/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/fresh_goods/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/fresh_goods/view','get');
					console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
				}

				console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

				return bl;
			},
            /**
             * 获取商品分类
             */
            async get_cart_goods_type() {
                var res = await this.$get("~/api/goods_type/get_list?");
                this.list_cart_goods_type = res.result.list;
            },
            /**
             * 上传封面图
             * @param {Object} param
             */
            upload_cart_img(param) {
                this.uploadFile(param.file, "cart_img");
            },

            /**
             * 上传文件
             * @param {Object} param
             */
            upload_cart_img_1(param) {
                this.uploadFile(param.file, "cart_img_1");
            },

            /**
             * 上传文件
             * @param {Object} param
             */
            upload_cart_img_2(param) {
                this.uploadFile(param.file, "cart_img_2");
            },

            /**
             * 上传文件
             * @param {Object} param
             */
            upload_cart_img_3(param) {
                this.uploadFile(param.file, "cart_img_3");
            },

            /**
             * 上传文件
             * @param {Object} param
             */
            upload_cart_img_4(param) {
                this.uploadFile(param.file, "cart_img_4");
            },

            /**
             * 上传文件
             * @param {Object} param
             */
            upload_cart_img_5(param) {
                this.uploadFile(param.file, "cart_img_5");
            },

            submit_after(){
                console.log(this.form[this.field])
                if (this.form[this.field]){
                    this.submit_goods(this.form[this.field],"set");
                } else {
                    let query_form = {
                        cart_title:this.form.cart_title,
                        cart_description:this.form.cart_description
                    }
                    this.$get("~/api/fresh_goods/get_obj?",query_form,(res)=>{
                        console.log("商品息res",res);
                        if(res.result && res.result.obj){
                            this.submit_goods(res.result.obj[this.field],"add");
                        }else if(res.error){
                            console.error(res.error);
                            this.$toast(res.error.message,"error");
                        }
                    })
                }
            },
            submit_goods(source_id,add_flag){
				let customize_field = []
							customize_field.push({"field_name":"商品编号","field_value":this.form.commodity_number});
									customize_field.push({"field_name":"下单规则","field_value":this.form.order_rules});
									customize_field.push({"field_name":"卖家用户","field_value":this.form.seller_user});
									customize_field.push({"field_name":"店铺地址","field_value":this.form.store_address});
									customize_field.push({"field_name":"店铺名称","field_value":this.form.shop_name});
			                this.goods_form = {
                    goods_id: 0,
                    title: this.form.cart_title,
                    img: this.form.cart_img,
                    description: this.form.cart_description,
                    price_ago: this.form.cart_price_ago,
                    price: this.form.cart_price,
                    inventory: this.form.cart_inventory,
                    type: this.form.cart_type,
                    content: this.form.cart_content,
                    img_1: this.form.cart_img_1,
                    img_2: this.form.cart_img_2,
                    img_3: this.form.cart_img_3,
                    img_4: this.form.cart_img_4,
                    img_5: this.form.cart_img_5,
                    source_table: "fresh_goods",
                    source_field: this.field,
                    source_id: source_id,
					customize_field: JSON.stringify(customize_field),
					user_id:this.$store.state.user.user_id
                }
                if (add_flag==='set'){
                    delete this.goods_form.goods_id;
					delete this.goods_form.user_id;
                    // 提交事件
                    this.$post("~/api/goods/set?source_table=fresh_goods&source_field=" + this.field + "&source_id=" + source_id,this.goods_form,(res)=>{
                        console.log("提交结果：" ,res)
                        if(res.result){
                            this.$toast("修改成功!" ,"success");
                            this.$router.go(-1);
                        }else if(res.error){
                            console.error(res.error);
                            this.$toast(res.error.message,"error");
                        }
                    });
                }else {
                    // 提交事件
                    this.$post("~/api/goods/add?",this.goods_form,(res)=>{
                        console.log("提交结果：" ,res)
                        if(res.result){
                            this.$toast("添加成功!" ,"success");
                            this.$router.go(-1);
                        }else if(res.error){
                            console.error(res.error);
                            this.$toast(res.error.message,"error");
                        }
                    });
                }
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
									this.get_list_user_seller_user();
					this.get_group_user_seller_user();
							            this.get_cart_goods_type();
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

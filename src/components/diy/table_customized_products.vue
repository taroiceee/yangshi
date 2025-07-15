<template>
  <el-main class="bg table_wrap">
    <el-form label-position="right" :model="query" class="form p_4" label-width="120">
      <el-row class="rows row1">

          
                                                                                              <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="商品名称">
                                                      <el-input v-model="query.name_of_commodity"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="分类名称">
                                                      <el-select v-model="query.category_name">
                                                                  <el-option v-for="o in list_category_name" :key="o.classification_name" :label="o.classification_name"
                                             :value="o.classification_name">
                                  </el-option>
                                                            </el-select>
                                                </el-form-item>
                    </el-col>
                                                                                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="定制库存">
                          							<div class="num_range">
							  <el-input-number v-model="query.custom_inventory_min"></el-input-number>
							  <span class="num_range_span">-</span>
							  <el-input-number v-model="query.custom_inventory_max"></el-input-number>
							</div>
                                                </el-form-item>
                    </el-col>
                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="产品生产日期">
                          							<el-date-picker v-model="query.product_production_date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
						                        </el-form-item>
                    </el-col>
                                                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="保质时间">
                          							<el-date-picker v-model="query.shelf_life_time" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
						                        </el-form-item>
                    </el-col>
                                                                                                                                                                                                                                                            <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
            <el-form-item label="审核状态">
              <el-select v-model="query.examine_state">
                <el-option value="">全部</el-option>
                <el-option value="未审核">未审核</el-option>
                <el-option value="已通过">已通过</el-option>
                <el-option value="未通过">未通过</el-option>
              </el-select>
            </el-form-item>
          </el-col>
                      </el-row>
      <el-row class="rows row2">
      	<el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap search_btns">
         <el-col :xs="24" :sm="10" :lg="8" class="search_btn_1 search_btn_wrap_1 btns">
                              <el-button type="primary" @click="search()" class="search_btn_find">查询</el-button>
                <el-button @click="reset()" style="margin-right: 74px;" class="search_btn_reset">重置</el-button>
                                            <el-button v-if="$check_option('/customized_products/table','export_db')" @click="export_db('dataTable')"  class="derive" style="margin-right: 155px;">导出</el-button>
                                            <el-button v-if="$check_option('/customized_products/table','print')" @click="print('dataTable')" style="margin-right: 155px;" class="search_btn_print">打印</el-button>
                          <el-button v-if="$check_action('/customized_products/table','add') || $check_action('/customized_products/view','add')" @click="$router.push('./view?')" class="add">添加</el-button>
			<el-button v-if="$check_option('/customized_products/table', 'examine')" @click="batchInfo()" class="examine_btn_state">批量审核</el-button>
            <el-button v-if="$check_action('/customized_products/table','del') || $check_action('/customized_products/view','del')" class="search_btn_del" type="danger" @click="delInfo()">删除</el-button>
                              <download-excel v-if="$check_option('/customized_products/table','import_db')" class="export-excel-wrapper" :data="DetailsForm" :fields="json_fields" name="数据导入表格.xls" >
                  <el-button type="success">下载导入文档</el-button>
                </download-excel>
                <el-upload v-if="$check_option('/customized_products/table','import_db')" action accept = ".xlsx, .xls" :auto-upload="false" :show-file-list="false" :on-change="handle_import">
                  <el-button type="primary">导入</el-button>
                </el-upload>
                        </el-col>
       
        </el-col>
      </el-row>
    </el-form>
	    <el-table :data="list" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" id="dataTable">
	                <el-table-column type="selection" tooltip-effect="dark" width="55">
            </el-table-column>
                                                  <el-table-column prop="commodity_number" @sort-change="$sortChange" label="商品编号"                                v-if="$check_field('get','commodity_number')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="name_of_commodity" @sort-change="$sortChange" label="商品名称"                                v-if="$check_field('get','name_of_commodity')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="category_name" @sort-change="$sortChange" label="分类名称"                                v-if="$check_field('get','category_name')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="commodity_cover" @sort-change="$sortChange" label="商品封面"                                v-if="$check_field('get','commodity_cover')" min-width="200">
                                      <template slot-scope="scope">
                      <el-image style="width: 100px; height: 100px" :src="$fullUrl(scope.row['commodity_cover'])"
                                :preview-src-list="[$fullUrl(scope.row['commodity_cover'])]">
                        <div slot="error" class="image-slot">
                          <img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
                        </div>
                      </el-image>
                    </template>
				                </el-table-column>
                                              <el-table-column prop="commodity_album" @sort-change="$sortChange" label="商品相册"                                v-if="$check_field('get','commodity_album')" min-width="200">
                  				  		<template slot-scope="scope">
				  			<el-image style="width: 100px; height: 100px" :src="$fullUrl(scope.row['commodity_album'][0])"
				  				:preview-src-list="scope.row['commodity_album_imgs']">
				  				<div slot="error" class="image-slot">
				  					<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
				  				</div>
				  			</el-image>
				  		</template>
                                </el-table-column>
                                              <el-table-column prop="custom_inventory" @sort-change="$sortChange" label="定制库存"                                v-if="$check_field('get','custom_inventory')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="product_production_date" @sort-change="$sortChange" label="产品生产日期"                                v-if="$check_field('get','product_production_date')" min-width="200">
                                      <template slot-scope="scope">
                      {{ $toTime(scope.row["product_production_date"],"yyyy-MM-dd") }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="business_user" @sort-change="$sortChange" label="商家用户"                                v-if="$check_field('get','business_user')" min-width="200">
                                      <template slot-scope="scope">
                      {{ get_user_business_user(scope.row['business_user']) }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="shelf_life_time" @sort-change="$sortChange" label="保质时间"                                v-if="$check_field('get','shelf_life_time')" min-width="200">
                                      <template slot-scope="scope">
                      {{ $toTime(scope.row["shelf_life_time"],"yyyy-MM-dd hh:mm:ss") }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="custom_statement_content" @sort-change="$sortChange" label="定制声明内容"                                v-if="$check_field('get','custom_statement_content')" min-width="200">
                                      <template slot-scope="scope">
                      <a :href="$fullUrl(scope.row['custom_statement_content'])" target="_blank" style="color: rgb(64, 158, 255);">点击下载</a>
                    </template>
                                </el-table-column>
                                              <el-table-column prop="custom_type" @sort-change="$sortChange" label="定制类型"                                v-if="$check_field('get','custom_type')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="custom_requirements" @sort-change="$sortChange" label="定制要求"                                v-if="$check_field('get','custom_requirements')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="customized_price" @sort-change="$sortChange" label="定制价格"                                v-if="$check_field('get','customized_price')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="notes" @sort-change="$sortChange" label="说明备注"                                v-if="$check_field('get','notes')" min-width="200">
                                </el-table-column>
                                                    				                  <el-table-column label="审核状态" prop="examine_state">
          </el-table-column>
        
        
                
      <el-table-column sortable prop="create_time" label="创建时间" min-width="200">
        <template slot-scope="scope">
          {{ $toTime(scope.row["create_time"],"yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>

      <el-table-column sortable prop="update_time" label="更新时间" min-width="200">
        <template slot-scope="scope">
          {{ $toTime(scope.row["update_time"],"yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>

                  <el-table-column prop="qrcode_title" label="二维码标题"
                           v-if="$check_field('get','qrcode_title')" min-width="200">
          </el-table-column>
          <el-table-column prop="qrcode_img" label="二维码图片"
                           v-if="$check_field('get','qrcode_img')" min-width="200">
            <template slot-scope="scope">
              <el-popover placement="right" trigger="hover">
                <img :src="$fullUrl(scope.row['qrcode_img'])" style="width:300px;height:450px;"/>
                <img slot="reference" :src="$fullUrl(scope.row['qrcode_img'])"  style="max-width: 100px;max-height: 100px">
              </el-popover>
            </template>
          </el-table-column>
        
        
                  <el-table-column prop="timer_title" label="计时器标题"
                           v-if="$check_field('get','timer_title')" min-width="200">
          </el-table-column>
          <el-table-column sortable prop="timing_start_time" label="计时开始时间" min-width="200">
            <template slot-scope="scope">
              {{ $toTime(scope.row["timing_start_time"],"yyyy-MM-dd hh:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column sortable prop="timing_end_time" label="计时结束时间" min-width="200">
            <template slot-scope="scope">
              {{ $toTime(scope.row["timing_end_time"],"yyyy-MM-dd hh:mm:ss") }}
            </template>
          </el-table-column>
        
                  <el-table-column sortable prop="location_address" label="当前位置" min-width="200">
          </el-table-column>
        
                  <el-table-column
              prop="limit_times"	label="限制次数" v-if="$check_field('get', 'limit_times')"	min-width="200">
          </el-table-column>
        

                <el-table-column label="操作" min-width="120" v-if="$check_action('/customized_products/table','set') || $check_action('/customized_products/view','set') || $check_action('/customized_products/view','get')
												|| $check_action('/i_want_to_customize_it/table','add') || $check_action('/i_want_to_customize_it/view','add')
											 ">
        

      <template slot-scope="scope">
        <router-link class="el-button el-button--small is-plain el-button--success" style="margin: 5px !important;"
                     v-if="$check_action('/customized_products/table','set') || $check_action('/customized_products/view','set') || $check_action('/customized_products/view','get')"
                                 :to="'./view?' + field + '=' + scope.row[field]"
                                 size="small">
          <span>详情</span>
        </router-link>
                                        <!--跨表按钮-->
                  										<el-button class="el-button el-button--small is-plain el-button--default" style="margin: 5px !important;" size="small"  @click="to_table(scope.row,'/i_want_to_customize_it/view')" v-if="($check_action('/i_want_to_customize_it/table','add') || $check_action('/i_want_to_customize_it/view','add')) && scope.row['examine_state'] == '已通过' && !scope.row['i_want_to_customize_it_limit']">
					  <span>定制</span>
					</el-button>
					                                                                                            <router-link v-if="$check_comment('/customized_products/table')" class="el-button el-button--small is-plain el-button--primary"
                             :to="'../comment/table?size=10&page=1&source_table=customized_products&source_field=' + field + '&source_id=' + scope.row[field]" size="small">
                  查看评论
                </router-link>
                                  		  		  		  	<el-button class="el-button el-button--small is-plain el-button--default" style="margin: 5px !important;" size="small" @click="changeSigning(scope.row, scope.$index)" v-if="$check_option('/customized_products/table', 'examine')">
		  		<span>审核</span>
		  	</el-button>
		        </template>
    </el-table-column>

    </el-table>

    <!-- 分页器 -->
    <div class="mt text_center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="query.page" :page-sizes="[7, 10, 30, 100]" :page-size="query.size"
                     layout="total, sizes, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>
    <!-- /分页器 -->
		<el-dialog title="审核" :visible.sync="dialogVisible" width="30%" :show-close="true" :before-close="handleClose">
			<el-form ref="verifyForm" :rules="rules" :model="verifyItem">
				<el-form-item label="审核状态" prop="radio">
					<el-radio-group v-model="verifyItem.examine_state" style="margin-top: 9px;">
						<el-radio label="已通过" value="已通过"></el-radio>
						<el-radio label="未通过" value="已通过"></el-radio>
					</el-radio-group>
				</el-form-item>
							</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="assureVerify">确 定</el-button>
			</span>
		</el-dialog>
                                                                                                                                                                                                                                                                  
    <div class="modal_wrap" v-if="showModal">
      <div class="modal_box">
        <!-- <div class="modal_box_close" @click="closeModal">X</div> -->
        <p class="modal_box_title">重要提醒</p>
        <p class="modal_box_text">当前有数据达到预警值！</p>
        <p class="modal_box_text">{{ message }}</p>
        <div class="btn_box">
          <span @click="closeModal">取消</span>
          <span @click="closeModal">确定</span>
        </div>
      </div>
    </div>


  </el-main>
</template>
<script>
  import mixin from "@/mixins/page.js";
    import * as XLSX from 'xlsx/xlsx.mjs'
                                                      export default {
    mixins: [mixin],
    data() {
      return {
																														        // 弹框
        showModal: false,
        // 获取数据地址
        url_get_list: "~/api/customized_products/get_list?like=0",
        url_del: "~/api/customized_products/del?",

        // 字段ID
        field: "customized_products_id",
		dialogVisible: false,
		verifyIdx: 0,
		verifyItem: {},
		rules: {
			"examine_state": [
				{ required: true, message: '请选择审核状态', trigger: 'change' },
			],
		},
        // 查询
        query: {
          "size": 7,
          "page": 1,
                                                                                                  "name_of_commodity": "",
                                                                                                          "category_name": "",
                                                                                                                                                                  "custom_inventory_min": '',
                      "custom_inventory_max": '',
                                                                                                          "product_production_date": "",
                                                                                                                                      "shelf_life_time": "",
                                                                                                                                                                                                                                            "examine_state":"",
                                          "login_time": "",
          "create_time": "",
          "orderby": `create_time desc`
        },

                  // 数据
        list: [],
                                          json_fields: {
                                                  "商品编号":'commodity_number',
                                  "商品名称":'name_of_commodity',
                                  "分类名称":'category_name',
                                  "商品封面":'commodity_cover',
                                  "商品相册":'commodity_album',
                                  "定制库存":'custom_inventory',
                                  "产品生产日期":'product_production_date',
                                  "商家用户":'business_user',
                                  "保质时间":'shelf_life_time',
                                  "定制声明内容":'custom_statement_content',
                                  "定制类型":'custom_type',
                                  "定制要求":'custom_requirements',
                                  "定制价格":'customized_price',
                                  "说明备注":'notes',
                                  "商品详情":'commodity_details',
                            },
            DetailsForm: [
              {
                                                              commodity_number:"文本类型",
                                            name_of_commodity:"文本类型",
                                            category_name:"下寻类型",
                                            commodity_cover:"图片类型",
                                            commodity_album:"图集类型",
                                            custom_inventory:"数字类型",
                                            product_production_date:"日期类型",
                                            business_user:"UID类型",
                                            shelf_life_time:"日长类型",
                                            custom_statement_content:"文件类型",
                                            custom_type:"下选类型",
                                            custom_requirements:"下多类型",
                                            customized_price:"下随类型",
                                            notes:"多文本类型",
                                            commodity_details:"编辑类型",
                                },
            ],
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                // 分类名称列表
                list_category_name: [""],
                                                                                                                                                                                                                                                            // 用户列表
                list_user_business_user: [],
                                                                                                                                                                                                                                                                                                  		  		  message: '',
				  batchAllState: false,
		  batchAllList: [],
		      }
    },
    methods: {
    	    	        	    	      	                    // 关闭弹框
      closeModal(){
        this.showModal = false;
      },
        			// 审核弹窗
			changeSigning(query, index) {
			  let beforeQuery=JSON.parse(JSON.stringify(query));
			  this.verifyIdx = index;
			  this.verifyItem = beforeQuery;
			  this.batchAllState = false;
			  this.batchAllList = [];
			  this.dialogVisible = true;
			},
			batchAll(list) {
				this.batchAllState = true;
				this.batchAllList = list;
				this.dialogVisible = true;
			},
			assureVerify() {
				//审核
				let _this = this;
				let examineForm = this.$refs["verifyForm"];
				examineForm.validate(async (valid) => {
					if (valid) {
						let apiState = true;
						if (this.batchAllState) {
							for (var i = 0; i < this.batchAllList.length; i++) {
								let url = "~/api/customized_products/set?customized_products_id=" + this.batchAllList[i]["customized_products_id"];
								let json = await _this.$post(url,{
									examine_state: _this.verifyItem.examine_state,
																	  }
								)
								if (json.error) {
									apiState = false;
									_this.$toast(json.error.message, "danger");
									break;
								}
							}
							if (apiState) {
							  _this.$toast("审核成功！", "success");
							  _this.dialogVisible = false;
							  _this.get_list();
							}
						}else{
							var url = "~/api/customized_products/set?customized_products_id=" + this.verifyItem['customized_products_id']
							_this.$post(url, {
								'examine_state': _this.verifyItem.examine_state,
															}, (json, status) => {
								if (json.result) {
									_this.$toast('审核成功！', 'success');
									_this.dialogVisible = false;
									_this.get_list();
								} else if (json.error) {
									_this.$toast(json.error.message, 'danger');
								}
							})
						}
					}
				})
			},
		  /**
		   * @description 获取到列表事件
		   * @param {Object} res 响应结果
		   */
		  get_list_after: function get_list_after(res, func, url) {
		  	let _this = this
					  			  	_this.list.map((item) => {
		  		let param = {
		  			source_table: "customized_products",
		  			source_id: item.customized_products_id,
		  			source_user_id: _this.user.user_id
		  		};
		  		if(item.i_want_to_customize_it_limit_times > 0){
		  			_this.$get("~/api/i_want_to_customize_it/count?",param,(result)=>{
		  				if(result){
		  					if(result.result >= item.i_want_to_customize_it_limit_times){
		  						_this.$set(item,'i_want_to_customize_it_limit',true);
		  					}else{
		  						_this.$set(item,'i_want_to_customize_it_limit',false);
		  					}
		  				}
		  			})
		  		}else{
		  			_this.$set(item,'i_want_to_customize_it_limit',false);
		  		}
		  		Object.assign(item, param)
		  	})
		  																						_this.list.map((item) => {
				if(item.commodity_album != "" && item.commodity_album != null ){
					let commodity_album_obj = JSON.parse(item.commodity_album)
					_this.$set(item,'commodity_album',commodity_album_obj);
					let commodity_album_arr = new Array();
					commodity_album_obj.map((value, key) => {
						commodity_album_arr[key] = _this.$fullUrl(value)
					})
					_this.$set(item, 'commodity_album_imgs', commodity_album_arr);
				}
			})
																																			  },
        
                  get_list_before(param){
            var user_group = this.$store.state.user.user_group;
            if(user_group != "管理员"){
                                  let sqlwhere = "(";
                                                                                                                                                                                                                                                                                                                                                                                          if(user_group=="商家用户"){
                            sqlwhere+= "business_user = " + this.$store.state.user.user_id + " or ";
                          }
                                                                                                                                                                                                                                                                                                                                                                                  if (sqlwhere.length>1){
                    sqlwhere = sqlwhere.substr(0,sqlwhere.length-4);
                    sqlwhere += ")";
                    param["sqlwhere"] = sqlwhere;
                  }
                            }
            return param;
          },
        
                                                                                                  /**
               * 获取分类名称列表
               */
              async get_list_category_name() {
                var json = await this.$get("~/api/classification_information/get_list?");
                if(json.result){
                  this.list_category_name = json.result.list;
                }else if (json.error){
                  console.log(json.error);
                }
              },
                                                                                                                                                                                                                                                                                                                                                                                                                                                  open_tip() {
            const h = this.$createElement;

            var message = "";
            var list = this.list;

            var ifs = [
                                                                                                                                                                                                                                              {
                        title: "定制库存",
                        factor: "custom_inventory",
                      start: 0,
                      end: 2,
                        type: "数内",
                        idx: 0
                      },
                                                                                                                                                                                                                                                                                                                                                                                    ];
            for (var n = 0; n < ifs.length; n++) {
              var o = ifs[n];
              for (var i = 0; i < list.length; i++) {
                var lt = list[i];
                if (o.type == "数内") {
                  if ((o.start || o.start === 0) && (o.end || o.end === 0)) {
                    if (lt[o.factor] > o.start && lt[o.factor] < o.end) {
                      o["idx"] = o["idx"] + 1;
                    }
                  } else if (o.start || o.start === 0) {
                    if (lt[o.factor] > o.start) {
                      o["idx"] = o["idx"] + 1;
                    }
                  } else if (o.end || o.end === 0) {
                    if (lt[o.factor] < o.end) {
                      o["idx"] = o["idx"] + 1;
                    }
                  }
                } else if (o.type == "数外") {
                  if ((o.start || o.start === 0) && (o.end || o.end === 0)) {
                    if (lt[o.factor] < o.start || lt[o.factor] > o.end) {
                      o["idx"] = o["idx"] + 1;
                    }
                  } else if (o.start || o.start === 0) {
                    if (lt[o.factor] < o.start) {
                      o["idx"] = o["idx"] + 1;
                    }
                  } else if (o.end || o.end === 0) {
                    if (lt[o.factor] > o.end) {
                      o["idx"] = o["idx"] + 1;
                    }
                  }
                } else if (o.type == "日内") {
                  if ((o.start) && (o.end)) {
                    if (lt[o.factor] > o.start && lt[o.factor] < o.end) {
                      o["idx"] = o["idx"] + 1;
                    }
                  } else if (o.start) {
                    if (lt[o.factor] < o.start) {
                      o["idx"] = o["idx"] + 1;
                    }
                  } else if (o.end) {
                    if (lt[o.factor] > o.end) {
                      o["idx"] = o["idx"] + 1;
                    }
                  }
                } else if (o.type == "日外") {
                  if (o.start && o.end) {
                    if (lt[o.factor] < o.start || lt[o.factor] > o.end) {
                      o["idx"] = o["idx"] + 1;
                    }
                  } else if (o.start) {
                    if (lt[o.factor] < o.start) {
                      o["idx"] = o["idx"] + 1;
                    }
                  } else if (o.end) {
                    if (lt[o.factor] > o.end) {
                      o["idx"] = o["idx"] + 1;
                    }
                  }
                }
              }

              if (o["idx"]) {
                message += o.title;
                if (o["type"] == "数内") {
                  if (o.start || o.start === 0) {
                    message += "大于" + o.start;
                  }
                  if ((o.start || o.start === 0) && (o.end || o.end === 0)) {
                    message += "并且";
                  }
                  if (o.end || o.end === 0) {
                    message += "小于" + o.end;
                  }
                } else if (o["type"] == "数外") {
                  if (o.start || o.start === 0) {
                    message += "小于" + o.start;
                  }
                  if ((o.start || o.start === 0) || (o.end || o.end === 0)) {
                    message += "或者";
                  }
                  if (o.end || o.end === 0) {
                    message += "大于" + o.end;
                  }
                } else if (o["type"] == "日内") {
                  if (o.start) {
                    message += "在" + o.start + "之后";
                  }
                  if (o.start && o.end) {
                    message += "并且";
                  }
                  if (o.end) {
                    message += "在" + o.end + "之前";
                  }
                } else if (o["type"] == "日外") {
                  if (o.start) {
                    message += "在" + o.start + "之前";
                  }
                  if (o.start || o.end) {
                    message += "或者";
                  }
                  if (o.end) {
                    message += "在" + o.end + "之后";
                  }
                }
                message += "的有" + o["idx"] + "条";
              }
            }

            if (message) {
              message += "，请尽快处理。";
              this.showModal = true;
			  this.message = message
              // this.$notify({
              // 	title: '提醒',
              // 	dangerouslyUseHTMLString: true,
              // 	message: h('i', {
              // 		style: 'color: teal'
              // 	}, message)
              // });
            }
          },
		  /**
		   * 页数变更
		   * @param {Object} page
		   */
		  handleCurrentChange(page) {
		      this.query.page = page;
		      this.get_list();
		  	setTimeout(() => {
		  		this.open_tip();
		  	}, 1000)
		  },
        
                  /**
           * 导出
           */
          export_db(tableid){
            // var query = this.query;
            // this.$get("~/api/customized_products/export_db?",query,(json)=>{
            // 	if(json.result){
            // 		console.log(json.result);
            // 	}else if(json.error){
            // 		console.error(json.error);
            // 	}
            // });


            //导出表格
            var idTmr;

            function getExplorer() {
              var explorer = window.navigator.userAgent;
              //ie
              if(explorer.indexOf("MSIE") >= 0) {
                return 'ie';
              }
              //firefox
              else if(explorer.indexOf("Firefox") >= 0) {
                return 'Firefox';
              }
              //Chrome
              else if(explorer.indexOf("Chrome") >= 0) {
                return 'Chrome';
              }
              //Opera
              else if(explorer.indexOf("Opera") >= 0) {
                return 'Opera';
              }
              //Safari
              else if(explorer.indexOf("Safari") >= 0) {
                return 'Safari';
              }
            }
            function Cleanup() {
              window.clearInterval(idTmr);
              CollectGarbage();
            }
            var tableToExcel = (function() {
              var uri = 'data:application/vnd.ms-excel;base64,',
                  template = '<html><head><meta charset="UTF-8"></head><body><table  border="1">{table}</table></body></html>',
                  base64 = function(
                      s) {
                    return window.btoa(unescape(encodeURIComponent(s)))
                  },
                  format = function(s, c) {
                    return s.replace(/{(\w+)}/g, function(m, p) {
                      return c[p];
                    })
                  }
              return function(table, name) {
                if(!table.nodeType)
                  table = document.getElementById(table)
                var ctx = {
                  worksheet: name || 'Worksheet',
                  table: table.innerHTML
                }
                window.location.href = uri + base64(format(template, ctx))
              }
            })();
            if(getExplorer() == 'ie') {
              var curTbl = document.getElementById(tableid);
              var oXL = new ActiveXObject("Excel.Application");
              var oWB = oXL.Workbooks.Add();
              var xlsheet = oWB.Worksheets(1);
              var sel = document.body.createTextRange();
              sel.moveToElementText(curTbl);
              sel.select();
              sel.execCommand("Copy");
              xlsheet.Paste();
              oXL.Visible = true;

              try {
                var fname = oXL.Application.GetSaveAsFilename("Excel.xls",
                    "Excel Spreadsheets (*.xls), *.xls");
              } catch(e) {
                print("Nested catch caught " + e);
              } finally {
                oWB.SaveAs(fname);
                oWB.Close(savechanges = false);
                oXL.Quit();
                oXL = null;
                idTmr = window.setInterval("Cleanup();", 1);
              }

            } else {
              tableToExcel(tableid)
            }


          },
        
        
          /**
           * 打印开始
           */
          print(tableid){

            //	打印表格
            var win = window.open('');

            var tableToPrintA = document.getElementById(tableid);
            win.document.write(tableToPrintA.outerHTML);
            win.document.write('</div></body></html>');
            win.document.close();
            win.focus();
            win.print();
            win.close();
          },

          /**
           *
           * 打印结束
           *
           * **/

        
                  /**
           * 导入
           */
          readFile(file){//文件读取
            return new Promise(resolve => {
              let reader = new FileReader();
              reader.readAsBinaryString(file);//以二进制的方式读取
              reader.onload = ev =>{
                resolve(ev.target.result);
              }
            })
          },
          async handle_import(ev){
            let file = ev.raw;
            console.log(file)
            if(!file){
              console.log("文件打开失败")
              return ;
            }else{
              let data = await this.readFile(file);
              let workbook = XLSX.read(data,{ type: "binary"});//解析二进制格式数据
              let worksheet = workbook.Sheets[workbook.SheetNames[0]];//获取第一个Sheet
              let result = XLSX.utils.sheet_to_json(worksheet);//json数据格式
              result.forEach((item) => {
                // 将中文的键名替换成英文的
                for (let k in this.json_fields) {
                  let newKey = this.json_fields[k];
                  if (newKey) {
                    item[newKey] = item[k];
                    delete item[k];
                  }
                }
              });
              let _this = this;
                                  for (let i=0;i<result.length;i++){
                    let url = "~/api/customized_products/add?";
                    await this.$post(url, result[i], function (json, status) {
                      console.log("提交结果：", json);
                      if (json.result) {
                        _this.$toast("操作成功", 'success');
                      } else if (json.error) {
                        _this.$toast(json.error.message, 'danger');
                      }
                    });
                  }
                            }
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
                  ret = obj.nickname+"-"+obj.username;
                  // if(obj.nickname){
                  // 	ret = obj.nickname;
                  // }
                  // else{
                  // 	ret = obj.username;
                  // }
                }
                return ret;
              },
                                                                                                                                                                                                                                                                                        		      deleteRow(index, rows) {
        rows.splice(index, 1);
      },

    },
	    created() {
                                                                                                          // 初始化分类名称列表
              this.get_list_category_name();
                                                                                                                                                                                                                      this.get_list_user_business_user();
                                                                                                                                                                                                                                                                      setTimeout(() => {
            this.open_tip();
          }, 1000)
            }
  }
</script>

<style type="text/css">
  .bg {
    background: white;
  }

  .form.p_4 {
    padding: 1rem;
  }

  .form .el-input {
    width: initial;
  }

  .mt {
    margin-top: 1rem;
  }

  .text_center {
    text-align: center;
  }

  .float-right {
    float: right;
  }


  .modal_wrap{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 9999999999;
  }
  .modal_wrap .modal_box{
    width: 400px;
    height: auto;
    background: url("../../assets/modal_bg.jpg") no-repeat center;
    background-size: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -100px;
    border-radius: 10px;
    padding: 10px;
  }
  .modal_wrap .modal_box .modal_box_close{
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  .modal_wrap .modal_box .modal_box_title{
    text-align: center;
    font-size: 18px;
    margin: 16px auto;
    color: #fff;
    border-bottom: 1px solid rgba(117, 116, 116,0.5);
    padding-bottom: 16px;
    width: 356px;
  }
  .modal_wrap .modal_box .modal_box_text{
    text-align: center;
    font-size: 14px;
    color: #fff;
    margin: 5px auto;
    width: 90%;
  }
  .modal_wrap .modal_box .btn_box{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 42px;
  }
  .modal_wrap .modal_box .btn_box span{
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    font-size: 14px;
    cursor: pointer;
    color: #fff;
  }
  .modal_wrap .modal_box .btn_box span:nth-child(2){
    background: #409EFF;
    color: #fff;
    border-color: #409EFF;
    margin-left: 15px;
  }
  .el-date-editor .el-range-separator{
  	width: 10% !important;
  }
  .num_range {
    display: flex;
    align-items: center;
  }
  
  .num_range_span {
    font-size: 28px;
  }
</style>

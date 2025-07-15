<template>
  <el-main class="bg table_wrap">
    <el-form label-position="right" :model="query" class="form p_4" label-width="120">
      <el-row class="rows row1">

          
                                                              <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="订单号">
                                                      <el-input v-model="query.order_number"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="商品名称">
                                                      <el-input v-model="query.name_of_commodity"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="生产日期">
                          							<el-date-picker v-model="query.production_date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
						                        </el-form-item>
                    </el-col>
                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="保质时间">
                          							<el-date-picker v-model="query.shelf_life_time" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
						                        </el-form-item>
                    </el-col>
                                                                                                                                                                                                                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="用户姓名">
                                                      <el-input v-model="query.user_name"></el-input>
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
                          <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
            <el-form-item label="支付状态">
              <el-select v-model="query.pay_state">
                <el-option value="">全部</el-option>
                <el-option value="未支付">未支付</el-option>
                <el-option value="已支付">已支付</el-option>
              </el-select>
            </el-form-item>
          </el-col>
              </el-row>
      <el-row class="rows row2">
      	<el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap search_btns">
         <el-col :xs="24" :sm="10" :lg="8" class="search_btn_1 search_btn_wrap_1 btns">
                              <el-button type="primary" @click="search()" class="search_btn_find">查询</el-button>
                <el-button @click="reset()" style="margin-right: 74px;" class="search_btn_reset">重置</el-button>
                                          			<el-button v-if="$check_option('/i_want_to_customize_it/table', 'examine')" @click="batchInfo()" class="examine_btn_state">批量审核</el-button>
            <el-button v-if="$check_action('/i_want_to_customize_it/table','del') || $check_action('/i_want_to_customize_it/view','del')" class="search_btn_del" type="danger" @click="delInfo()">删除</el-button>
                        </el-col>
       
        </el-col>
      </el-row>
    </el-form>
	    <el-table :data="list" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" id="dataTable">
	                <el-table-column fixed type="selection" tooltip-effect="dark" width="55">
            </el-table-column>
                                                  <el-table-column prop="order_number" @sort-change="$sortChange" label="订单号"                                v-if="$check_field('get','order_number')" min-width="200">
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
                                              <el-table-column prop="production_date" @sort-change="$sortChange" label="生产日期"                                v-if="$check_field('get','production_date')" min-width="200">
                                      <template slot-scope="scope">
                      {{ $toTime(scope.row["production_date"],"yyyy-MM-dd") }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="shelf_life_time" @sort-change="$sortChange" label="保质时间"                                v-if="$check_field('get','shelf_life_time')" min-width="200">
                                      <template slot-scope="scope">
                      {{ $toTime(scope.row["shelf_life_time"],"yyyy-MM-dd hh:mm:ss") }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="business_user" @sort-change="$sortChange" label="商家用户"                                v-if="$check_field('get','business_user')" min-width="200">
                                      <template slot-scope="scope">
                      {{ get_user_business_user(scope.row['business_user']) }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="customized_price" @sort-change="$sortChange" label="定制价格"                                v-if="$check_field('get','customized_price')" min-width="200">
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
                                              <el-table-column prop="customized_commodity_quantity" @sort-change="$sortChange" label="定制商品数量"                                v-if="$check_field('get','customized_commodity_quantity')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="total_price" @sort-change="$sortChange" label="总价格"                                v-if="$check_field('get','total_price')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="custom_user" @sort-change="$sortChange" label="定制用户"                                v-if="$check_field('get','custom_user')" min-width="200">
                                      <template slot-scope="scope">
                      {{ get_user_custom_user(scope.row['custom_user']) }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="user_name" @sort-change="$sortChange" label="用户姓名"                                v-if="$check_field('get','user_name')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="delivery_date" @sort-change="$sortChange" label="交付日期"                                v-if="$check_field('get','delivery_date')" min-width="200">
                                      <template slot-scope="scope">
                      {{ $toTime(scope.row["delivery_date"],"yyyy-MM-dd") }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="custom_audio" @sort-change="$sortChange" label="定制音频"                                v-if="$check_field('get','custom_audio')" min-width="200">
                                      <template slot-scope="scope">
                      <a href="javascript:void(0)" @click="custom_audioAudioPlay($fullUrl(scope.row['custom_audio']))" >点此播放</a>
                    </template>
                                </el-table-column>
                                              <el-table-column prop="custom_video" @sort-change="$sortChange" label="定制视频"                                v-if="$check_field('get','custom_video')" min-width="200">
                                      <template slot-scope="scope">
                      <a href="javascript:void(0)" @click="custom_videoVideoPlay($fullUrl(scope.row['custom_video']))" >点此播放</a>
                    </template>
                                </el-table-column>
                                              <el-table-column prop="customized_accessories" @sort-change="$sortChange" label="定制附件"                                v-if="$check_field('get','customized_accessories')" min-width="200">
                                      <template slot-scope="scope">
                      <a :href="$fullUrl(scope.row['customized_accessories'])" target="_blank" style="color: rgb(64, 158, 255);">点击下载</a>
                    </template>
                                </el-table-column>
                                              <el-table-column prop="custom_picture" @sort-change="$sortChange" label="定制图片"                                v-if="$check_field('get','custom_picture')" min-width="200">
                  				  		<template slot-scope="scope">
				  			<el-image style="width: 100px; height: 100px" :src="$fullUrl(scope.row['custom_picture'][0])"
				  				:preview-src-list="scope.row['custom_picture_imgs']">
				  				<div slot="error" class="image-slot">
				  					<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
				  				</div>
				  			</el-image>
				  		</template>
                                </el-table-column>
                                              <el-table-column prop="regional_location" @sort-change="$sortChange" label="地区位置"                                v-if="$check_field('get','regional_location')" min-width="200">
                                </el-table-column>
                    				                  <el-table-column label="审核状态" prop="examine_state">
          </el-table-column>
        
                  <el-table-column label="审核回复" prop="examine_reply">
          </el-table-column>
        
                  <el-table-column label="支付状态" prop="pay_state">
          </el-table-column>

          <el-table-column label="支付类型" prop="pay_type">
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

        
                  <el-table-column
              prop="seat" label="座位" min-width="200">
          </el-table-column>
        
        
        
        

                <el-table-column fixed="right" label="操作" min-width="120" v-if="$check_action('/i_want_to_customize_it/table','set') || $check_action('/i_want_to_customize_it/view','set') || $check_action('/i_want_to_customize_it/view','get')
												|| $check_action('/evaluation_feedback/table','add') || $check_action('/evaluation_feedback/view','add')
											 ">
        

      <template slot-scope="scope">
        <router-link class="el-button el-button--small is-plain el-button--success" style="margin: 5px !important;"
                     v-if="$check_action('/i_want_to_customize_it/table','set') || $check_action('/i_want_to_customize_it/view','set') || $check_action('/i_want_to_customize_it/view','get')"
                                 :to="'./view?' + field + '=' + scope.row[field]"
                                 size="small">
          <span>详情</span>
        </router-link>
                                        <!--跨表按钮-->
                  										<el-button class="el-button el-button--small is-plain el-button--default" style="margin: 5px !important;" size="small"  @click="to_table(scope.row,'/evaluation_feedback/view')" v-if="($check_action('/evaluation_feedback/table','add') || $check_action('/evaluation_feedback/view','add')) && scope.row['examine_state'] == '已通过' && !scope.row['evaluation_feedback_limit']">
					  <span>评价反馈</span>
					</el-button>
					                                                                              <el-button class="el-button el-button--small is-plain el-button--default" style="margin: 5px !important;" size="small" @click="openPayModal(scope.row)" v-if="scope.row.pay_state==='未支付' && ($check_pay('/i_want_to_customize_it/table'))">
              <span>支付</span>
            </el-button>
                                            		  		  		  	<el-button class="el-button el-button--small is-plain el-button--default" style="margin: 5px !important;" size="small" @click="changeSigning(scope.row, scope.$index)" v-if="$check_option('/i_want_to_customize_it/table', 'examine')">
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
								<el-form-item label="审核回复" prop="reply">
					<el-input type="textarea" placeholder="请填写审核回复" v-model="verifyItem.examine_reply"></el-input>
				</el-form-item>
							</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="assureVerify">确 定</el-button>
			</span>
		</el-dialog>
                                                                                                                                                                                                                                                                            <el-dialog
                title="音频详情"
                :visible.sync="custom_audioAudioPlayerModalVisible"
                width="30%"
            >
              <audio id="custom_audioAudioPlayer" :src="custom_audioAudioUrl" autoplay="autoplay" width="100%" controls>
                您的浏览器不支持Audio标签。
              </audio>
              <span slot="footer" class="dialog-footer">
					<el-button @click="custom_audioCancelAudioModalVisible">取 消</el-button>
					</span>
            </el-dialog>
                                      <el-dialog
                title="视频详情"
                :visible.sync="custom_videoPlayerModalVisible"
                width="30%"
            >
              <video id="custom_videoPlayer" :src="custom_videoVideoUrl" autoplay="autoplay" width="100%" controls>
                您的浏览器不支持Video标签。
              </video>
              <span slot="footer" class="dialog-footer">
				<el-button @click="custom_videoCancelModalVisible">取 消</el-button>
				</span>
            </el-dialog>
                                                                              <el-dialog
            title="支付"
            :visible.sync="payModalVisible"
            width="500px"
        >
          <el-tabs v-model="pay_obj.payActiveName" :stretch="true">
            <el-tab-pane label="微信" name="微信">
              <div style="width: 80%;margin: 0 auto;">
                <div style="width: 60%;margin: 30px auto;">
                  <el-image style="width: 100%;" :src="require('../../../public/wx.png')"
                            :preview-src-list="[require('../../../public/wx.png')]">
                    <div slot="error" class="image-slot">
                      <img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
                    </div>
                  </el-image>
                </div>
                <div style="width: 80%;margin: 0 auto;">
                  <div style="width: 100%;background-color: #409EFF;color: white;font-size: 14px;text-align: center;line-height: 40px;cursor: pointer" @click="submitPay()">确认支付</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="支付宝" name="支付宝">
              <div style="width: 80%;margin: 0 auto;">
                <div style="width: 60%;margin: 30px auto;">
                  <el-image style="width: 100%;" :src="require('../../../public/alipay.png')"
                            :preview-src-list="[require('../../../public/alipay.png')]">
                    <div slot="error" class="image-slot">
                      <img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
                    </div>
                  </el-image>
                </div>
                <div style="width: 80%;margin: 0 auto;">
                  <div style="width: 100%;background-color: #409EFF;color: white;font-size: 14px;text-align: center;line-height: 40px;cursor: pointer" @click="submitPay()">确认支付</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="网银" name="网银">
              <div style="width: 80%;margin: 0 auto;margin-top: 30px;">
                <div style="width: 80%;margin: 0 auto;">
                  <div style="line-height: 40px">请输入网银账号：</div>
                </div>
                <div style="width: 80%;margin: 0 auto;">
                  <el-input v-model="pay_obj.account" placeholder="请输入网银账号"></el-input>
                </div>
              </div>
              <div style="width: 80%;margin: 0 auto;margin-top: 20px;">
                <div style="width: 80%;margin: 0 auto;">
                  <div style="line-height: 40px">请输入支付密码，6位数字：</div>
                </div>
                <div style="width: 80%;margin: 0 auto;">
                  <el-input placeholder="请输入密码" v-model="pay_obj.password" show-password maxlength="6"></el-input>
                </div>
              </div>
              <div style="width: 80%;margin: 0 auto;margin-top: 40px;">
                <div style="width: 100%;background-color: #409EFF;color: white;font-size: 14px;text-align: center;line-height: 40px;cursor: pointer" @click="submitPay()">确认支付</div>
              </div>
            </el-tab-pane>
          </el-tabs>
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
                                                                export default {
    mixins: [mixin],
    data() {
      return {
																																			        // 弹框
        showModal: false,
        // 获取数据地址
        url_get_list: "~/api/i_want_to_customize_it/get_list?like=0",
        url_del: "~/api/i_want_to_customize_it/del?",

        // 字段ID
        field: "i_want_to_customize_it_id",
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
                                                                      "order_number": "",
                                                                                                                                      "name_of_commodity": "",
                                                                                                                                                                  "production_date": "",
                                                                                                          "shelf_life_time": "",
                                                                                                                                                                                                                                                                                  "user_name": "",
                                                                                                                                                                                                                                            "examine_state":"",
                              "pay_state":"",
                                "login_time": "",
          "create_time": "",
          "orderby": `create_time desc`
        },

                  // 数据
        list: [],
                      payModalVisible:false,
            pay_obj:{
              payActiveName:"微信",
              account:"",
              password:"",
              id:""
            },
                                                                                                                                                                                                                                                                                                                                                                                                                                                    custom_audioAudioPlayerModalVisible:false,
                      custom_audioAudioUrl:"",
                                                            custom_videoPlayerModalVisible:false,
                      custom_videoVideoUrl:"",
                                                                                                                                                                                                                                                                                                                                                                                                                                                  // 用户列表
                list_user_business_user: [],
                                                                                                                                                                                                                                              // 用户列表
                list_user_custom_user: [],
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
								let url = "~/api/i_want_to_customize_it/set?i_want_to_customize_it_id=" + this.batchAllList[i]["i_want_to_customize_it_id"];
								let json = await _this.$post(url,{
									examine_state: _this.verifyItem.examine_state,
																		'examine_reply': _this.verifyItem.examine_reply
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
							var url = "~/api/i_want_to_customize_it/set?i_want_to_customize_it_id=" + this.verifyItem['i_want_to_customize_it_id']
							_this.$post(url, {
								'examine_state': _this.verifyItem.examine_state,
																'examine_reply': _this.verifyItem.examine_reply
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
		  			source_table: "i_want_to_customize_it",
		  			source_id: item.i_want_to_customize_it_id,
		  			source_user_id: _this.user.user_id
		  		};
		  		if(item.evaluation_feedback_limit_times > 0){
		  			_this.$get("~/api/evaluation_feedback/count?",param,(result)=>{
		  				if(result){
		  					if(result.result >= item.evaluation_feedback_limit_times){
		  						_this.$set(item,'evaluation_feedback_limit',true);
		  					}else{
		  						_this.$set(item,'evaluation_feedback_limit',false);
		  					}
		  				}
		  			})
		  		}else{
		  			_this.$set(item,'evaluation_feedback_limit',false);
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
																																_this.list.map((item) => {
				if(item.custom_picture != "" && item.custom_picture != null ){
					let custom_picture_obj = JSON.parse(item.custom_picture)
					_this.$set(item,'custom_picture',custom_picture_obj);
					let custom_picture_arr = new Array();
					custom_picture_obj.map((value, key) => {
						custom_picture_arr[key] = _this.$fullUrl(value)
					})
					_this.$set(item, 'custom_picture_imgs', custom_picture_arr);
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
                                                                                                                                                                                                                                                                              if(user_group=="注册用户"){
                            sqlwhere+= "custom_user = " + this.$store.state.user.user_id + " or ";
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
                                                                                                                                            custom_audioAudioPlay(v) {
                this.custom_audioAudioUrl = v
                this.custom_audioAudioPlayerModalVisible = true
              },

                    custom_audioCancelAudioModalVisible(){
                this.custom_audioAudioUrl = ""
                this.custom_audioAudioPlayerModalVisible = false
              },
                                                                custom_videoVideoPlay(v) {
                this.custom_videoVideoUrl = v
                this.custom_videoPlayerModalVisible = true
              },

                    custom_videoCancelModalVisible(){
                this.custom_videoVideoUrl = ""
                this.custom_videoPlayerModalVisible = false
              },
                                                                                                                                      openPayModal(v){
            this.pay_obj.id = v.i_want_to_customize_it_id
            this.payModalVisible = true
          },
          submitPay(){
            let _this = this;
			if(_this.pay_obj.payActiveName == "网银"){
				if(_this.pay_obj.account == ""){
					_this.$toast("请输入网银账号", 'danger');
					return false
				}
				if(_this.pay_obj.password.length < 6){
					_this.$toast("请输入6位数的支付密码", 'danger');
					return false
				}
			}
            let url = this.$toUrl(this.query, "~/api/i_want_to_customize_it/set?i_want_to_customize_it_id="+this.pay_obj.id);
            let param = {"pay_state":"已支付","pay_type":this.pay_obj.payActiveName}
            this.$post(url, param, function(json, status) {
              console.log("提交结果：" ,json);
              if (json.result) {
                _this.$toast('支付成功！', 'success');
                _this.payModalVisible = false;
                _this.get_list();
              } else if (json.error) {
                _this.$toast(json.error.message, 'danger');
              }
            });
          },
                        		      deleteRow(index, rows) {
        rows.splice(index, 1);
      },

    },
	    created() {
                                                                                                                                                                                                                                                                                                      this.get_list_user_business_user();
                                                                                                                                                                                                          this.get_list_user_custom_user();
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

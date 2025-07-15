<template>
  <el-main class="bg table_wrap">
    <el-form label-position="right" :model="query" class="form p_4" label-width="120">
      <el-row class="rows row1">

          
                                                              <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="负责人">
                                                      <el-input v-model="query.person_in_charge"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="店铺电话">
                                                      <el-input v-model="query.shop_phone"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="店铺地址">
                          							<el-cascader v-model="store_address" :options="jsonData" :props="props" clearable @change="handle_store_address_change" />
                                                </el-form-item>
                    </el-col>
                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="注册资金">
                          							<div class="num_range">
							  <el-input-number v-model="query.registered_capital_min"></el-input-number>
							  <span class="num_range_span">-</span>
							  <el-input-number v-model="query.registered_capital_max"></el-input-number>
							</div>
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
                                                      <el-button v-if="$check_action('/business_user/table','add') || $check_action('/business_user/view','add')" @click="$router.push('./view?')" class="add">添加</el-button>
			<el-button v-if="$check_option('/business_user/table', 'examine')" @click="batchInfo()" class="examine_btn_state">批量审核</el-button>
            <el-button v-if="$check_action('/business_user/table','del') || $check_action('/business_user/view','del')" class="search_btn_del" type="danger" @click="delInfo()">删除</el-button>
                        </el-col>
       
        </el-col>
      </el-row>
    </el-form>
	    <el-table :data="list" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" id="dataTable">
	                <el-table-column fixed type="selection" tooltip-effect="dark" width="55">
            </el-table-column>
        		  <el-table-column fixed prop="user_id" label="用户ID" width="80">
		  </el-table-column>
          <el-table-column prop="username" label="用户名" width="120">
          </el-table-column>
                        <el-table-column fixed prop="nickname" label="昵称">
                    </el-table-column>
                                                  <el-table-column prop="person_in_charge" @sort-change="$sortChange" label="负责人"                                v-if="$check_field('get','person_in_charge')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="head_gender" @sort-change="$sortChange" label="负责人性别"                                v-if="$check_field('get','head_gender')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="shop_name" @sort-change="$sortChange" label="店铺名称"                                v-if="$check_field('get','shop_name')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="shop_phone" @sort-change="$sortChange" label="店铺电话"                                v-if="$check_field('get','shop_phone')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="store_address" @sort-change="$sortChange" label="店铺地址"                                v-if="$check_field('get','store_address')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="registered_capital" @sort-change="$sortChange" label="注册资金(万元)"                                v-if="$check_field('get','registered_capital')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="number_of_companies" @sort-change="$sortChange" label="公司人数(人)"                                v-if="$check_field('get','number_of_companies')" min-width="200">
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

        
        
        
        
        

                <el-table-column fixed="right" label="操作" min-width="120" v-if="$check_action('/business_user/table','set') || $check_action('/business_user/view','set') || $check_action('/business_user/view','get')
					 ">
        

      <template slot-scope="scope">
        <router-link class="el-button el-button--small is-plain el-button--success" style="margin: 5px !important;"
                     v-if="$check_action('/business_user/table','set') || $check_action('/business_user/view','set') || $check_action('/business_user/view','get')"
                                 :to="'./view?user_id=' + scope.row['user_id']"
                                 size="small">
          <span>详情</span>
        </router-link>
                                        		  		  		  	<el-button class="el-button el-button--small is-plain el-button--default" style="margin: 5px !important;" size="small" @click="changeSigning(scope.row, scope.$index)" v-if="$check_option('/business_user/table', 'examine')">
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
                        import pcaCodeData from '@/assets/json/pca-code.json';
              export default {
    mixins: [mixin],
    data() {
      return {
															  // 省市区数据
		  jsonData: pcaCodeData,
		  region: [],
		  props: {
			value: 'name',
			label: 'name',
			children: 'children'
		  },
								        // 弹框
        showModal: false,
        // 获取数据地址
        url_get_list: "~/api/business_user/get_list?like=0",
        url_del: "~/api/business_user/del?",

        // 字段ID
        field: "business_user_id",
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
                                                                      "person_in_charge": "",
                                                                                                                                                                  "shop_phone": "",
                                                                                                          "store_address": "",
                                                                                                          "registered_capital_min": '',
                      "registered_capital_max": '',
                                                                                                "examine_state":"",
                                          "login_time": "",
          "create_time": "",
          "orderby": `create_time desc`
        },

                  // 数据
        list: [],
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    		  		  message: '',
				  batchAllState: false,
		  batchAllList: [],
		      }
    },
    methods: {
  	        	    			reset() {
		    this.$options.mixins[0].methods.reset.call(this);
		    this.store_address = [];
		},
		handle_store_address_change(value) {
			this.query.store_address = value.join('/');
		},
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
								let url = "~/api/business_user/set?business_user_id=" + this.batchAllList[i]["business_user_id"];
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
							var url = "~/api/business_user/set?business_user_id=" + this.verifyItem['business_user_id']
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
																									  },
                  delInfo() {
            var list = this.selection;
            if (list.length === 0) {
              this.$message({
                type: 'info',
                message: '选择对象不能为空!'
              });
              return;
            }
            this.$confirm('此操作将永久删除该文件, 是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async () => {
              await this.delAll(list ,async (list)=>{
                var bl = true;
                for(var i=0; i < list.length; i++){
                  var user_id = list[i].user_id;
                  var res = await this.$get("~/api/user/del?",{user_id});
                  if(res.result){
                    console.log("删除成功" + i);
                  }
                  else{
                    console.log("删除失败" + i);
                    bl = false;
                    break;
                  }
                }
                if(bl){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.get_list();
                }

              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          get_list_after(param){
            let _this = this;
            for (let i = 0;i<this.list.length;i++){
              let user_id = _this.list[i].user_id
              _this.$get("~/api/user/get_obj?", {
                user_id
              }, (json) => {
                if (json.result.obj){
                  _this.$delete(_this.list[i],'username');
                  _this.$set(_this.list[i],'username',json.result.obj.username);
                  _this.$delete(_this.list[i],'nickname');
                  _this.$set(_this.list[i],'nickname',json.result.obj.nickname);
																					                }
              });
            }
          },
        
        
                                                                                                                                                                                                                                                
        
        
        
                                                                                                                                                                                                                                                                		      deleteRow(index, rows) {
        rows.splice(index, 1);
      },

    },
	    created() {
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

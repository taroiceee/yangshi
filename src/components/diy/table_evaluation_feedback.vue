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
                      <el-form-item label="评价时间">
                          							<el-date-picker v-model="query.evaluation_time" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
						                        </el-form-item>
                    </el-col>
                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="评价等级">
                                                      <el-select v-model="query.evaluation_grade">
                                                                  <el-option v-for="o in list_evaluation_grade" :key="o" :label="o"
                                             :value="o">
                                  </el-option>
                                                            </el-select>
                                                </el-form-item>
                    </el-col>
                                                                                                                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="外貌外观评分">
                          							<div class="num_range">
							  <el-input-number v-model="query.appearance_appearance_rating_min"></el-input-number>
							  <span class="num_range_span">-</span>
							  <el-input-number v-model="query.appearance_appearance_rating_max"></el-input-number>
							</div>
                                                </el-form-item>
                    </el-col>
                                                                                                </el-row>
      <el-row class="rows row2">
      	<el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap search_btns">
         <el-col :xs="24" :sm="10" :lg="8" class="search_btn_1 search_btn_wrap_1 btns">
                              <el-button type="primary" @click="search()" class="search_btn_find">查询</el-button>
                <el-button @click="reset()" style="margin-right: 74px;" class="search_btn_reset">重置</el-button>
                                          			<el-button v-if="$check_option('/evaluation_feedback/table', 'examine')" @click="batchInfo()" class="examine_btn_state">批量审核</el-button>
            <el-button v-if="$check_action('/evaluation_feedback/table','del') || $check_action('/evaluation_feedback/view','del')" class="search_btn_del" type="danger" @click="delInfo()">删除</el-button>
                        </el-col>
       
        </el-col>
      </el-row>
    </el-form>
	    <el-table :data="list" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" id="dataTable">
	                <el-table-column fixed type="selection" tooltip-effect="dark" width="55">
            </el-table-column>
                                                  <el-table-column prop="order_number" @sort-change="$sortChange" label="订单号"                                v-if="$check_field('get','order_number')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="name_of_commodity" @sort-change="$sortChange" label="商品名称"                                v-if="$check_field('get','name_of_commodity')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="category_name" @sort-change="$sortChange" label="分类名称"                                v-if="$check_field('get','category_name')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="business_user" @sort-change="$sortChange" label="商家用户"                                v-if="$check_field('get','business_user')" min-width="200">
                                      <template slot-scope="scope">
                      {{ get_user_business_user(scope.row['business_user']) }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="customized_price" @sort-change="$sortChange" label="定制价格"                                v-if="$check_field('get','customized_price')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="custom_user" @sort-change="$sortChange" label="定制用户"                                v-if="$check_field('get','custom_user')" min-width="200">
                                      <template slot-scope="scope">
                      {{ get_user_custom_user(scope.row['custom_user']) }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="delivery_date" @sort-change="$sortChange" label="交付日期"                                v-if="$check_field('get','delivery_date')" min-width="200">
                                      <template slot-scope="scope">
                      {{ $toTime(scope.row["delivery_date"],"yyyy-MM-dd") }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="evaluation_time" @sort-change="$sortChange" label="评价时间"                                v-if="$check_field('get','evaluation_time')" min-width="200">
                                      <template slot-scope="scope">
                      {{ $toTime(scope.row["evaluation_time"],"yyyy-MM-dd hh:mm:ss") }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="evaluation_grade" @sort-change="$sortChange" label="评价等级"                                v-if="$check_field('get','evaluation_grade')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="optimization_recommendations" @sort-change="$sortChange" label="优化建议"                                v-if="$check_field('get','optimization_recommendations')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="performance_score" @sort-change="$sortChange" label="性能评分"                                v-if="$check_field('get','performance_score')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="practicality_score" @sort-change="$sortChange" label="实用性评分"                                v-if="$check_field('get','practicality_score')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="appearance_appearance_rating" @sort-change="$sortChange" label="外貌外观评分"                                v-if="$check_field('get','appearance_appearance_rating')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="cost_effective" @sort-change="$sortChange" label="性价比"                                v-if="$check_field('get','cost_effective')" min-width="200">
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

        
        
        
        
        

                <el-table-column fixed="right" label="操作" min-width="120" v-if="$check_action('/evaluation_feedback/table','set') || $check_action('/evaluation_feedback/view','set') || $check_action('/evaluation_feedback/view','get')
					 ">
        

      <template slot-scope="scope">
        <router-link class="el-button el-button--small is-plain el-button--success" style="margin: 5px !important;"
                     v-if="$check_action('/evaluation_feedback/table','set') || $check_action('/evaluation_feedback/view','set') || $check_action('/evaluation_feedback/view','get')"
                                 :to="'./view?' + field + '=' + scope.row[field]"
                                 size="small">
          <span>详情</span>
        </router-link>
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
        url_get_list: "~/api/evaluation_feedback/get_list?like=0",
        url_del: "~/api/evaluation_feedback/del?",

        // 字段ID
        field: "evaluation_feedback_id",
        // 查询
        query: {
          "size": 7,
          "page": 1,
                                                                      "order_number": "",
                                                                                                                                                                                                                                                                                  "evaluation_time": "",
                                                                                                          "evaluation_grade": "",
                                                                                                                                                                                              "appearance_appearance_rating_min": '',
                      "appearance_appearance_rating_max": '',
                                                                                                                      "login_time": "",
          "create_time": "",
          "orderby": `create_time desc`
        },

                  // 数据
        list: [],
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  // 用户列表
                list_user_business_user: [],
                                                                                                                            // 用户列表
                list_user_custom_user: [],
                                                                                                                                  // 评价等级列表
                list_evaluation_grade: ['优','良','中','差'],
                                                                                                                                                                                                                                    		  		  message: '',
		      }
    },
    methods: {
  	                	    	          	          // 关闭弹框
      closeModal(){
        this.showModal = false;
      },
        		  /**
		   * @description 获取到列表事件
		   * @param {Object} res 响应结果
		   */
		  get_list_after: function get_list_after(res, func, url) {
		  	let _this = this
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

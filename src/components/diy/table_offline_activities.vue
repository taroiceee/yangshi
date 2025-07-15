<template>
  <el-main class="bg table_wrap">
    <el-form label-position="right" :model="query" class="form p_4" label-width="120">
      <el-row class="rows row1">

          
                                                              <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="活动名称">
                                                      <el-input v-model="query.activity_name"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="活动类型">
                                                      <el-select v-model="query.activity_type">
                                                            </el-select>
                                                </el-form-item>
                    </el-col>
                                                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="活动日期">
                          							<el-date-picker v-model="query.activity_date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
						                        </el-form-item>
                    </el-col>
                                                                                                </el-row>
      <el-row class="rows row2">
      	<el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap search_btns">
         <el-col :xs="24" :sm="10" :lg="8" class="search_btn_1 search_btn_wrap_1 btns">
                              <el-button type="primary" @click="search()" class="search_btn_find">查询</el-button>
                <el-button @click="reset()" style="margin-right: 74px;" class="search_btn_reset">重置</el-button>
                                                      <el-button v-if="$check_action('/offline_activities/table','add') || $check_action('/offline_activities/view','add')" @click="$router.push('./view?')" class="add">添加</el-button>
			<el-button v-if="$check_option('/offline_activities/table', 'examine')" @click="batchInfo()" class="examine_btn_state">批量审核</el-button>
            <el-button v-if="$check_action('/offline_activities/table','del') || $check_action('/offline_activities/view','del')" class="search_btn_del" type="danger" @click="delInfo()">删除</el-button>
                        </el-col>
       
        </el-col>
      </el-row>
    </el-form>
		<el-table :data="scoreList" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" id="dataTable"
	>
	                <el-table-column fixed type="selection" tooltip-effect="dark" width="55">
            </el-table-column>
                                                  <el-table-column prop="activity_name" @sort-change="$sortChange" label="活动名称"                                v-if="$check_field('get','activity_name')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="activity_type" @sort-change="$sortChange" label="活动类型"                                v-if="$check_field('get','activity_type')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="activity_description" @sort-change="$sortChange" label="活动描述"                                v-if="$check_field('get','activity_description')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="activity_date" @sort-change="$sortChange" label="活动日期"                                v-if="$check_field('get','activity_date')" min-width="200">
                                      <template slot-scope="scope">
                      {{ $toTime(scope.row["activity_date"],"yyyy-MM-dd") }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="number_of_enrolment" @sort-change="$sortChange" label="报名人数"                                v-if="$check_field('get','number_of_enrolment')" min-width="200">
                                </el-table-column>
                    				<el-table-column v-if="$check_option('/offline_activities/view','can_show_score')" prop="score" @sort-change="$sortChange" label="评分" min-width="80"></el-table-column>
				        
        
                
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

        
        
        
        
        

                <el-table-column fixed="right" label="操作" min-width="120" v-if="$check_action('/offline_activities/table','set') || $check_action('/offline_activities/view','set') || $check_action('/offline_activities/view','get')
					 ">
        

      <template slot-scope="scope">
        <router-link class="el-button el-button--small is-plain el-button--success" style="margin: 5px !important;"
                     v-if="$check_action('/offline_activities/table','set') || $check_action('/offline_activities/view','set') || $check_action('/offline_activities/view','get')"
                                 :to="'./view?' + field + '=' + scope.row[field]"
                                 size="small">
          <span>详情</span>
        </router-link>
                                                            <router-link v-if="$check_comment('/offline_activities/table')" class="el-button el-button--small is-plain el-button--primary"
                             :to="'../comment/table?size=10&page=1&source_table=offline_activities&source_field=' + field + '&source_id=' + scope.row[field]" size="small">
                  查看评论
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
        url_get_list: "~/api/offline_activities/get_list?like=0",
        url_del: "~/api/offline_activities/del?",

        // 字段ID
        field: "offline_activities_id",
        // 查询
        query: {
          "size": 7,
          "page": 1,
                                                                      "activity_name": "",
                                                                                                          "activity_type": "",
                                                                                                                                      "activity_date": "",
                                                                                                                      "login_time": "",
          "create_time": "",
          "orderby": `create_time desc`
        },

                  // 数据
        list: [],
                                                                                                                                                                                                                                              // 活动类型列表
                list_activity_type: [""],
                                                                                                                                                        		  		  scoreList: [], // 评分数据
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
        
        
                                                                                                                                                                                
        
        
        
                                                                                                                                                                                                				async getScore() {
		  const arr = this.list;
		  Promise.all(
		    arr.map(async item => {
		      const url = `~/api/score/avg`;
		      const params = {
				    field:'score_num',
					source_table: "offline_activities",
				    source_field: 'offline_activities_id',
					source_id: item.offline_activities_id,
		      };
		      const res = await this.$get(url, params);
		      const num = res.result || 0.0
		      item.score = Number(num.toFixed(2)) ;
		      return item;
		    })
		  )
		    .then(res => {
		      this.scoreList = res || this.list;
		    })
		    .catch(err => {
		      this.scoreList = this.list;
		    });
		},
		      deleteRow(index, rows) {
        rows.splice(index, 1);
      },

    },
		watch: {
	  list() {
	    this.getScore();
	  }
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

<template>
  <el-main class="bg table_wrap">
    <el-form label-position="right" :model="query" class="form p_4" label-width="120">
      <el-row class="rows row1">

          
                                                              <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="用户会员卡号">
                                                      <el-input v-model="query.user_membership_card_number"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="真实姓名">
                                                      <el-input v-model="query.real_name"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                                                                                                                                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="用户标签">
                                                      <el-input v-model="query.user_label"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                                                                                                                                                                                                                </el-row>
      <el-row class="rows row2">
      	<el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap search_btns">
         <el-col :xs="24" :sm="10" :lg="8" class="search_btn_1 search_btn_wrap_1 btns">
                              <el-button type="primary" @click="search()" class="search_btn_find">查询</el-button>
                <el-button @click="reset()" style="margin-right: 74px;" class="search_btn_reset">重置</el-button>
                                                      <el-button v-if="$check_action('/registered_user/table','add') || $check_action('/registered_user/view','add')" @click="$router.push('./view?')" class="add">添加</el-button>
			<el-button v-if="$check_option('/registered_user/table', 'examine')" @click="batchInfo()" class="examine_btn_state">批量审核</el-button>
            <el-button v-if="$check_action('/registered_user/table','del') || $check_action('/registered_user/view','del')" class="search_btn_del" type="danger" @click="delInfo()">删除</el-button>
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
                                                  <el-table-column prop="user_membership_card_number" @sort-change="$sortChange" label="用户会员卡号"                                v-if="$check_field('get','user_membership_card_number')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="real_name" @sort-change="$sortChange" label="真实姓名"                                v-if="$check_field('get','real_name')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="user_gender" @sort-change="$sortChange" label="用户性别"                                v-if="$check_field('get','user_gender')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="user_age" @sort-change="$sortChange" label="用户年龄(岁)"                                v-if="$check_field('get','user_age')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="height" @sort-change="$sortChange" label="身高(CM)"                                v-if="$check_field('get','height')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="user_weight" @sort-change="$sortChange" label="用户体重(KG)"                                v-if="$check_field('get','user_weight')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="region" @sort-change="$sortChange" label="所属地区"                                v-if="$check_field('get','region')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="user_label" @sort-change="$sortChange" label="用户标签"                                v-if="$check_field('get','user_label')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="user_preferences" @sort-change="$sortChange" label="用户喜好"                                v-if="$check_field('get','user_preferences')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="description_description" @sort-change="$sortChange" label="描述说明"                                v-if="$check_field('get','description_description')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="certificate_number" @sort-change="$sortChange" label="证件号"                                v-if="$check_field('get','certificate_number')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="portfolio" @sort-change="$sortChange" label="作品集"                                v-if="$check_field('get','portfolio')" min-width="200">
                  				  		<template slot-scope="scope">
				  			<el-image style="width: 100px; height: 100px" :src="$fullUrl(scope.row['portfolio'][0])"
				  				:preview-src-list="scope.row['portfolio_imgs']">
				  				<div slot="error" class="image-slot">
				  					<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
				  				</div>
				  			</el-image>
				  		</template>
                                </el-table-column>
                                              <el-table-column prop="user_photos" @sort-change="$sortChange" label="用户照片"                                v-if="$check_field('get','user_photos')" min-width="200">
                                      <template slot-scope="scope">
                      <el-image style="width: 100px; height: 100px" :src="$fullUrl(scope.row['user_photos'])"
                                :preview-src-list="[$fullUrl(scope.row['user_photos'])]">
                        <div slot="error" class="image-slot">
                          <img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
                        </div>
                      </el-image>
                    </template>
				                </el-table-column>
                                              <el-table-column prop="user_notes" @sort-change="$sortChange" label="用户备注"                                v-if="$check_field('get','user_notes')" min-width="200">
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

        
        
        
        
        

                <el-table-column fixed="right" label="操作" min-width="120" v-if="$check_action('/registered_user/table','set') || $check_action('/registered_user/view','set') || $check_action('/registered_user/view','get')
					 ">
        

      <template slot-scope="scope">
        <router-link class="el-button el-button--small is-plain el-button--success" style="margin: 5px !important;"
                     v-if="$check_action('/registered_user/table','set') || $check_action('/registered_user/view','set') || $check_action('/registered_user/view','get')"
                                 :to="'./view?user_id=' + scope.row['user_id']"
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
        url_get_list: "~/api/registered_user/get_list?like=0",
        url_del: "~/api/registered_user/del?",

        // 字段ID
        field: "registered_user_id",
        // 查询
        query: {
          "size": 7,
          "page": 1,
                                                                      "user_membership_card_number": "",
                                                                                                          "real_name": "",
                                                                                                                                                                                                                                                      "user_label": "",
                                                                                                                                                                                                                                                                  "login_time": "",
          "create_time": "",
          "orderby": `create_time desc`
        },

                  // 数据
        list: [],
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
																																								_this.list.map((item) => {
				if(item.portfolio != "" && item.portfolio != null ){
					let portfolio_obj = JSON.parse(item.portfolio)
					_this.$set(item,'portfolio',portfolio_obj);
					let portfolio_arr = new Array();
					portfolio_obj.map((value, key) => {
						portfolio_arr[key] = _this.$fullUrl(value)
					})
					_this.$set(item, 'portfolio_imgs', portfolio_arr);
				}
			})
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
																																							if(_this.list[i]['portfolio'] != "" && _this.list[i]['portfolio'] != null ){
					let portfolio_obj = JSON.parse(_this.list[i]['portfolio'])
					_this.$set(_this.list[i],'portfolio',portfolio_obj);
					let portfolio_arr = new Array();
					portfolio_obj.map((value, key) => {
						portfolio_arr[key] = _this.$fullUrl(value)
					})
					_this.$set(_this.list[i], 'portfolio_imgs', portfolio_arr);
				}
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

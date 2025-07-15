<template>
  <el-main class="bg table_wrap">
    <el-form label-position="right" :model="query" class="form p_4" label-width="120">
      <el-row class="rows row1">

          
                                                              <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="标题名">
                                                      <el-input v-model="query.title_name"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="反馈信息类型">
                                                      <el-select v-model="query.type_of_feedback_information">
                                                                  <el-option v-for="o in list_type_of_feedback_information" :key="o.classification_name" :label="o.classification_name"
                                             :value="o.classification_name">
                                  </el-option>
                                                            </el-select>
                                                </el-form-item>
                    </el-col>
                                                                                                                                                                                                                                                                                                                                                                                                </el-row>
      <el-row class="rows row2">
      	<el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap search_btns">
         <el-col :xs="24" :sm="10" :lg="8" class="search_btn_1 search_btn_wrap_1 btns">
                              <el-button type="primary" @click="search()" class="search_btn_find">查询</el-button>
                <el-button @click="reset()" style="margin-right: 74px;" class="search_btn_reset">重置</el-button>
                                                      <el-button v-if="$check_action('/feedback_on_opinions/table','add') || $check_action('/feedback_on_opinions/view','add')" @click="$router.push('./view?')" class="add">添加</el-button>
			<el-button v-if="$check_option('/feedback_on_opinions/table', 'examine')" @click="batchInfo()" class="examine_btn_state">批量审核</el-button>
            <el-button v-if="$check_action('/feedback_on_opinions/table','del') || $check_action('/feedback_on_opinions/view','del')" class="search_btn_del" type="danger" @click="delInfo()">删除</el-button>
                        </el-col>
       
        </el-col>
      </el-row>
    </el-form>
	    <el-table :data="list" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" id="dataTable">
	                <el-table-column fixed type="selection" tooltip-effect="dark" width="55">
            </el-table-column>
                                                  <el-table-column prop="title_name" @sort-change="$sortChange" label="标题名"                                v-if="$check_field('get','title_name')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="type_of_feedback_information" @sort-change="$sortChange" label="反馈信息类型"                                v-if="$check_field('get','type_of_feedback_information')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="feedback_user" @sort-change="$sortChange" label="反馈用户"                                v-if="$check_field('get','feedback_user')" min-width="200">
                                      <template slot-scope="scope">
                      {{ get_user_feedback_user(scope.row['feedback_user']) }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="refund_type" @sort-change="$sortChange" label="退款类型"                                v-if="$check_field('get','refund_type')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="refund_goods" @sort-change="$sortChange" label="退款商品"                                v-if="$check_field('get','refund_goods')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="upload_credential" @sort-change="$sortChange" label="上传凭证"                                v-if="$check_field('get','upload_credential')" min-width="200">
                                      <template slot-scope="scope">
                      <el-image style="width: 100px; height: 100px" :src="$fullUrl(scope.row['upload_credential'])"
                                :preview-src-list="[$fullUrl(scope.row['upload_credential'])]">
                        <div slot="error" class="image-slot">
                          <img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
                        </div>
                      </el-image>
                    </template>
				                </el-table-column>
                                              <el-table-column prop="more_vouchers" @sort-change="$sortChange" label="更多凭证"                                v-if="$check_field('get','more_vouchers')" min-width="200">
                  				  		<template slot-scope="scope">
				  			<el-image style="width: 100px; height: 100px" :src="$fullUrl(scope.row['more_vouchers'][0])"
				  				:preview-src-list="scope.row['more_vouchers_imgs']">
				  				<div slot="error" class="image-slot">
				  					<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
				  				</div>
				  			</el-image>
				  		</template>
                                </el-table-column>
                                              <el-table-column prop="upload_file" @sort-change="$sortChange" label="上传文件"                                v-if="$check_field('get','upload_file')" min-width="200">
                                      <template slot-scope="scope">
                      <a :href="$fullUrl(scope.row['upload_file'])" target="_blank" style="color: rgb(64, 158, 255);">点击下载</a>
                    </template>
                                </el-table-column>
                                              <el-table-column prop="upload_audio" @sort-change="$sortChange" label="上传音频"                                v-if="$check_field('get','upload_audio')" min-width="200">
                                      <template slot-scope="scope">
                      <a href="javascript:void(0)" @click="upload_audioAudioPlay($fullUrl(scope.row['upload_audio']))" >点此播放</a>
                    </template>
                                </el-table-column>
                                              <el-table-column prop="upload_video" @sort-change="$sortChange" label="上传视频"                                v-if="$check_field('get','upload_video')" min-width="200">
                                      <template slot-scope="scope">
                      <a href="javascript:void(0)" @click="upload_videoVideoPlay($fullUrl(scope.row['upload_video']))" >点此播放</a>
                    </template>
                                </el-table-column>
                                              <el-table-column prop="feedback_content" @sort-change="$sortChange" label="反馈内容"                                v-if="$check_field('get','feedback_content')" min-width="200">
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

        
        
        
        
        

                <el-table-column fixed="right" label="操作" min-width="120" v-if="$check_action('/feedback_on_opinions/table','set') || $check_action('/feedback_on_opinions/view','set') || $check_action('/feedback_on_opinions/view','get')
					 ">
        

      <template slot-scope="scope">
        <router-link class="el-button el-button--small is-plain el-button--success" style="margin: 5px !important;"
                     v-if="$check_action('/feedback_on_opinions/table','set') || $check_action('/feedback_on_opinions/view','set') || $check_action('/feedback_on_opinions/view','get')"
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
                                                                                                                                                            <el-dialog
                title="音频详情"
                :visible.sync="upload_audioAudioPlayerModalVisible"
                width="30%"
            >
              <audio id="upload_audioAudioPlayer" :src="upload_audioAudioUrl" autoplay="autoplay" width="100%" controls>
                您的浏览器不支持Audio标签。
              </audio>
              <span slot="footer" class="dialog-footer">
					<el-button @click="upload_audioCancelAudioModalVisible">取 消</el-button>
					</span>
            </el-dialog>
                                      <el-dialog
                title="视频详情"
                :visible.sync="upload_videoPlayerModalVisible"
                width="30%"
            >
              <video id="upload_videoPlayer" :src="upload_videoVideoUrl" autoplay="autoplay" width="100%" controls>
                您的浏览器不支持Video标签。
              </video>
              <span slot="footer" class="dialog-footer">
				<el-button @click="upload_videoCancelModalVisible">取 消</el-button>
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
                                    export default {
    mixins: [mixin],
    data() {
      return {
																		        // 弹框
        showModal: false,
        // 获取数据地址
        url_get_list: "~/api/feedback_on_opinions/get_list?like=0",
        url_del: "~/api/feedback_on_opinions/del?",

        // 字段ID
        field: "feedback_on_opinions_id",
        // 查询
        query: {
          "size": 7,
          "page": 1,
                                                                      "title_name": "",
                                                                                                          "type_of_feedback_information": "",
                                                                                                                                                                                                                                                                                                                                                                                  "login_time": "",
          "create_time": "",
          "orderby": `create_time desc`
        },

                  // 数据
        list: [],
                                                                                                                                                                                                                                                                            upload_audioAudioPlayerModalVisible:false,
                      upload_audioAudioUrl:"",
                                                            upload_videoPlayerModalVisible:false,
                      upload_videoVideoUrl:"",
                                                                                                                                                      // 反馈信息类型列表
                list_type_of_feedback_information: [""],
                                                                                                    // 用户列表
                list_user_feedback_user: [],
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
				if(item.more_vouchers != "" && item.more_vouchers != null ){
					let more_vouchers_obj = JSON.parse(item.more_vouchers)
					_this.$set(item,'more_vouchers',more_vouchers_obj);
					let more_vouchers_arr = new Array();
					more_vouchers_obj.map((value, key) => {
						more_vouchers_arr[key] = _this.$fullUrl(value)
					})
					_this.$set(item, 'more_vouchers_imgs', more_vouchers_arr);
				}
			})
																				  },
        
                  get_list_before(param){
            var user_group = this.$store.state.user.user_group;
            if(user_group != "管理员"){
                                  let sqlwhere = "(";
                                                                                                                                                              if(user_group=="注册用户"){
                            sqlwhere+= "feedback_user = " + this.$store.state.user.user_id + " or ";
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
               * 获取反馈信息类型列表
               */
              async get_list_type_of_feedback_information() {
                var json = await this.$get("~/api/classification_information/get_list?");
                if(json.result){
                  this.list_type_of_feedback_information = json.result.list;
                }else if (json.error){
                  console.log(json.error);
                }
              },
                                                                                                                                                                                                                                                                                                                                                                        
        
        
        
                                                                                                  /**
               * 获取注册用户用户列表
               */
              async get_list_user_feedback_user() {
                var json = await this.$get("~/api/user/get_list?user_group=注册用户");
                if(json.result && json.result.list){
                  this.list_user_feedback_user = json.result.list;
                }
                else if(json.error){
                  console.error(json.error);
                }
              },

              get_user_feedback_user(id){
                var obj = this.list_user_feedback_user.getObj({"user_id":id});
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
                                                                                                                                                                                                                                            upload_audioAudioPlay(v) {
                this.upload_audioAudioUrl = v
                this.upload_audioAudioPlayerModalVisible = true
              },

                    upload_audioCancelAudioModalVisible(){
                this.upload_audioAudioUrl = ""
                this.upload_audioAudioPlayerModalVisible = false
              },
                                                                upload_videoVideoPlay(v) {
                this.upload_videoVideoUrl = v
                this.upload_videoPlayerModalVisible = true
              },

                    upload_videoCancelModalVisible(){
                this.upload_videoVideoUrl = ""
                this.upload_videoPlayerModalVisible = false
              },
                                                                                                            		      deleteRow(index, rows) {
        rows.splice(index, 1);
      },

    },
	    created() {
                                                                          // 初始化反馈信息类型列表
              this.get_list_type_of_feedback_information();
                                                                                      this.get_list_user_feedback_user();
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

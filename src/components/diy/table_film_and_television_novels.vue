<template>
  <el-main class="bg table_wrap">
    <el-form label-position="right" :model="query" class="form p_4" label-width="120">
      <el-row class="rows row1">

          
                                                              <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="专辑名称">
                                                      <el-input v-model="query.album_name"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="作者姓名">
                                                      <el-input v-model="query.authors_name"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                                                </el-row>
      <el-row class="rows row2">
      	<el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap search_btns">
         <el-col :xs="24" :sm="10" :lg="8" class="search_btn_1 search_btn_wrap_1 btns">
                              <el-button type="primary" @click="search()" class="search_btn_find">查询</el-button>
                <el-button @click="reset()" style="margin-right: 74px;" class="search_btn_reset">重置</el-button>
                                                      <el-button v-if="$check_action('/film_and_television_novels/table','add') || $check_action('/film_and_television_novels/view','add')" @click="$router.push('./view?')" class="add">添加</el-button>
			<el-button v-if="$check_option('/film_and_television_novels/table', 'examine')" @click="batchInfo()" class="examine_btn_state">批量审核</el-button>
            <el-button v-if="$check_action('/film_and_television_novels/table','del') || $check_action('/film_and_television_novels/view','del')" class="search_btn_del" type="danger" @click="delInfo()">删除</el-button>
                        </el-col>
       
        </el-col>
      </el-row>
    </el-form>
		<el-table :data="scoreList" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" id="dataTable"
	>
	                <el-table-column fixed type="selection" tooltip-effect="dark" width="55">
            </el-table-column>
                                                  <el-table-column prop="album_name" @sort-change="$sortChange" label="专辑名称"                                v-if="$check_field('get','album_name')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="album_cover" @sort-change="$sortChange" label="专辑封面"                                v-if="$check_field('get','album_cover')" min-width="200">
                                      <template slot-scope="scope">
                      <el-image style="width: 100px; height: 100px" :src="$fullUrl(scope.row['album_cover'])"
                                :preview-src-list="[$fullUrl(scope.row['album_cover'])]">
                        <div slot="error" class="image-slot">
                          <img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
                        </div>
                      </el-image>
                    </template>
				                </el-table-column>
                                              <el-table-column prop="authors_name" @sort-change="$sortChange" label="作者姓名"                                v-if="$check_field('get','authors_name')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="audio_content" @sort-change="$sortChange" label="音频内容"                                v-if="$check_field('get','audio_content')" min-width="200">
                                      <template slot-scope="scope">
                      <a href="javascript:void(0)" @click="audio_contentAudioPlay($fullUrl(scope.row['audio_content']))" >点此播放</a>
                    </template>
                                </el-table-column>
                    				<el-table-column v-if="$check_option('/film_and_television_novels/view','can_show_score')" prop="score" @sort-change="$sortChange" label="评分" min-width="80"></el-table-column>
				        
        
                
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

        
        
        
                  <el-table-column sortable prop="location_address" label="当前位置" min-width="200">
          </el-table-column>
        
        

                <el-table-column fixed="right" label="操作" min-width="120" v-if="$check_action('/film_and_television_novels/table','set') || $check_action('/film_and_television_novels/view','set') || $check_action('/film_and_television_novels/view','get')
					 ">
        

      <template slot-scope="scope">
        <router-link class="el-button el-button--small is-plain el-button--success" style="margin: 5px !important;"
                     v-if="$check_action('/film_and_television_novels/table','set') || $check_action('/film_and_television_novels/view','set') || $check_action('/film_and_television_novels/view','get')"
                                 :to="'./view?' + field + '=' + scope.row[field]"
                                 size="small">
          <span>详情</span>
        </router-link>
                                                            <router-link v-if="$check_comment('/film_and_television_novels/table')" class="el-button el-button--small is-plain el-button--primary"
                             :to="'../comment/table?size=10&page=1&source_table=film_and_television_novels&source_field=' + field + '&source_id=' + scope.row[field]" size="small">
                  查看评论
                </router-link>
                                              <router-link class="e-button el-button--small is-plain el-button--primary"
                         :to="'../novel_chapters/table?novel_reading_id=' + scope.row[field] + '&source_table=film_and_television_novels&source_field=film_and_television_novels_id'"
                         size="small">
              <span>内容设置</span>
            </router-link>
          		  		    <router-link class="e-button el-button--small is-plain el-button--primary"
		                 :to="'../movie_episode/table?move_info_id=' + scope.row[field] + '&source_table=film_and_television_novels&source_field=film_and_television_novels_id'"
		                 size="small">
		      <span>视频设置</span>
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
                :visible.sync="audio_contentAudioPlayerModalVisible"
                width="30%"
            >
              <audio id="audio_contentAudioPlayer" :src="audio_contentAudioUrl" autoplay="autoplay" width="100%" controls>
                您的浏览器不支持Audio标签。
              </audio>
              <span slot="footer" class="dialog-footer">
					<el-button @click="audio_contentCancelAudioModalVisible">取 消</el-button>
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
        url_get_list: "~/api/film_and_television_novels/get_list?like=0",
        url_del: "~/api/film_and_television_novels/del?",

        // 字段ID
        field: "film_and_television_novels_id",
        // 查询
        query: {
          "size": 7,
          "page": 1,
                                                                      "album_name": "",
                                                                                                                                      "authors_name": "",
                                                                                                                      "login_time": "",
          "create_time": "",
          "orderby": `create_time desc`
        },

                  // 数据
        list: [],
                                                                                                                                                    audio_contentAudioPlayerModalVisible:false,
                      audio_contentAudioUrl:"",
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
        
        
                                                                                                                                                
        
        
        
                                                                                                                                                    audio_contentAudioPlay(v) {
                this.audio_contentAudioUrl = v
                this.audio_contentAudioPlayerModalVisible = true
              },

                    audio_contentCancelAudioModalVisible(){
                this.audio_contentAudioUrl = ""
                this.audio_contentAudioPlayerModalVisible = false
              },
                                            				async getScore() {
		  const arr = this.list;
		  Promise.all(
		    arr.map(async item => {
		      const url = `~/api/score/avg`;
		      const params = {
				    field:'score_num',
					source_table: "film_and_television_novels",
				    source_field: 'film_and_television_novels_id',
					source_id: item.film_and_television_novels_id,
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

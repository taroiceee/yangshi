<template>
  <el-main class="bg table_wrap">
    <el-form label-position="right" :model="query" class="form p_4" label-width="120">
      <el-row class="rows row1">

                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
              <el-form-item label="标题">
                <el-input v-model="query.cart_title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
              <el-form-item label="分类">
                <el-select v-model="query.cart_type">
                  <el-option :key="-1" :value="''" :label="'无'"></el-option>
                  <el-option v-for="(o,i) in list_goods_cart_type" :key="i" :value="o.name" :label="o.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          
                                                              <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="商品编号">
                                                      <el-input v-model="query.commodity_number"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="店铺地址">
                                                      <el-input v-model="query.store_address"></el-input>
                                                </el-form-item>
                    </el-col>
                                                                      <el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
                      <el-form-item label="店铺名称">
                                                      <el-input v-model="query.shop_name"></el-input>
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
                                                          <el-button v-if="$check_option('/fresh_goods/table','print')" @click="print('dataTable')" style="margin-right: 155px;" class="search_btn_print">打印</el-button>
                          <el-button v-if="$check_action('/fresh_goods/table','add') || $check_action('/fresh_goods/view','add')" @click="$router.push('./view?')" class="add">添加</el-button>
			<el-button v-if="$check_option('/fresh_goods/table', 'examine')" @click="batchInfo()" class="examine_btn_state">批量审核</el-button>
            <el-button v-if="$check_action('/fresh_goods/table','del') || $check_action('/fresh_goods/view','del')" class="search_btn_del" type="danger" @click="delInfo()">删除</el-button>
                        </el-col>
       
        </el-col>
      </el-row>
    </el-form>
		<el-table :data="scoreList" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" id="dataTable"
	>
	                <el-table-column type="selection" tooltip-effect="dark" width="55">
            </el-table-column>
                                        <el-table-column prop="cart_title" label="标题" sortable width="100">
            
        </el-table-column>

          <el-table-column prop="cart_img" label="封面图" min-width="110">
            <template slot-scope="scope">
              <el-image style="width: 100px; height: 100px" :src="$fullUrl(scope.row.cart_img)" :preview-src-list="[$fullUrl(scope.row.cart_img)]">
                <div slot="error" class="image-slot">
                  <img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
                </div>
              </el-image>
            </template>
          </el-table-column>

          <el-table-column prop="cart_price" label="卖价" sortable min-width="120">
          </el-table-column>

          <el-table-column prop="cart_price_ago" label="原价" sortable min-width="120">
          </el-table-column>

          <el-table-column prop="cart_inventory" label="商品库存" sortable min-width="120">
          </el-table-column>

          <el-table-column prop="cart_type" label="产品分类" min-width="180">
          </el-table-column>

          <el-table-column prop="cart_description" label="描述" min-width="200">
          </el-table-column>
                                          <el-table-column prop="commodity_number" @sort-change="$sortChange" label="商品编号"                                v-if="$check_field('get','commodity_number')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="order_rules" @sort-change="$sortChange" label="下单规则"                                v-if="$check_field('get','order_rules')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="seller_user" @sort-change="$sortChange" label="卖家用户"                                v-if="$check_field('get','seller_user')" min-width="200">
                                      <template slot-scope="scope">
                      {{ get_user_seller_user(scope.row['seller_user']) }}
                    </template>
                                </el-table-column>
                                              <el-table-column prop="store_address" @sort-change="$sortChange" label="店铺地址"                                v-if="$check_field('get','store_address')" min-width="200">
                                </el-table-column>
                                              <el-table-column prop="shop_name" @sort-change="$sortChange" label="店铺名称"                                v-if="$check_field('get','shop_name')" min-width="200">
                                </el-table-column>
                    				<el-table-column v-if="$check_option('/fresh_goods/view','can_show_score')" prop="score" @sort-change="$sortChange" label="评分" min-width="80"></el-table-column>
				        
        
                
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

        
        
        
        
        

                <el-table-column label="操作" min-width="120" v-if="$check_action('/fresh_goods/table','set') || $check_action('/fresh_goods/view','set') || $check_action('/fresh_goods/view','get')
					 ">
        

      <template slot-scope="scope">
        <router-link class="el-button el-button--small is-plain el-button--success" style="margin: 5px !important;"
                     v-if="$check_action('/fresh_goods/table','set') || $check_action('/fresh_goods/view','set') || $check_action('/fresh_goods/view','get')"
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
        url_get_list: "~/api/fresh_goods/get_list?like=0",
        url_del: "~/api/fresh_goods/del?",

        // 字段ID
        field: "fresh_goods_id",
        // 查询
        query: {
          "size": 7,
          "page": 1,
                                                                      "commodity_number": "",
                                                                                                                                                                  "store_address": "",
                                                                                                          "shop_name": "",
                                                                              "pay_state":"",
                                    cart_title:"",
              cart_type:"",
                      "login_time": "",
          "create_time": "",
          "orderby": `create_time desc`
        },

                      // 商品分类
            list_goods_cart_type:[],
                  // 数据
        list: [],
                                                                                                                                                                                                                                                                                                                    // 用户列表
                list_user_seller_user: [],
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
           * 获取商品分类
           */
          async get_goods_cart_type() {
            var json = await this.$get("~/api/goods_type/get_list?");
            if(json.result){
              this.list_goods_cart_type = json.result.list;
            }
            else if(json.error){
              console.error(json.error);
            }
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
                            sqlwhere+= "seller_user = " + this.$store.state.user.user_id + " or ";
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

              get_user_seller_user(id){
                var obj = this.list_user_seller_user.getObj({"user_id":id});
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
                  var form = {
                    source_table:"fresh_goods",
                    source_field:this.field,
                    source_id:list[i][this.field]
                  }
                  var res = await this.$get("~/api/goods/del?",form);
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
        				async getScore() {
		  const arr = this.list;
		  Promise.all(
		    arr.map(async item => {
		      const url = `~/api/score/avg`;
		      const params = {
				    field:'score_num',
					source_table: "fresh_goods",
				    source_field: 'fresh_goods_id',
					source_id: item.fresh_goods_id,
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
                  this.get_goods_cart_type();
                                                                                                                                      this.get_list_user_seller_user();
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

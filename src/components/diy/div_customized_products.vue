<template>
	<div class="diy_details_box diy_div_customized_products">
		<div class="warp diy_warp">
			<div class="container">
				<div class="details_title">详情</div>
				<div @click="goPage" class="user_box">
				  <img class="user_avatar" :src="followUserInfo.avatar?$fullUrl(followUserInfo.avatar):'../../../public/img/error.png'" alt="">
				  <div class="user_info" style="display: flex;flex-direction: column;margin-right: 20px">
					<span class="user_nickname">{{ followUserInfo.nickname }}</span>
					<span class="user_fans">共{{followList.length}}个粉丝关注</span>
				  </div>
				  <el-button v-if="followUserInfo.user_id != $store.state.user.user_id" @click.stop="attention(followUserInfo)" type="primary" size="small" plain round>{{followState?'已关注':'+ 关注'}}</el-button>
				</div>
				<div class="row row_det">
						<div v-if="this.$store.state.user.user_id" class="btns_add col-12 col-sm-6">
							<div v-if="$check_action('/customized_products/details','set')">
								<!-- 点赞按钮 -->
								<div
										v-if="state_praise"
										class="praise_btn praise_change"
										@click="change_praise()"
								>
									<b-icon icon="hand-thumbs-up-fill" class="icon icon_change"></b-icon
									><span class="word_change">点赞</span>
								</div>
								<div v-else class="praise_btn" @click="change_praise()">
									<b-icon icon="hand-thumbs-up" class="icon"></b-icon>
									<span>点赞</span>
								</div>
							</div>
							<div v-if="$check_action('/customized_products/details','set')">
								<!-- 收藏按钮 -->
								<div v-if="state_collect"
									 class="collect_btn collect_change"
									 @click="change_collect()"
								>
									<b-icon icon="heart-fill" class="icon icon_change"></b-icon>
									<span class="word_change">收藏</span>
								</div>
								<div v-else class="collect_btn" @click="change_collect()">
									<b-icon icon="heart" class="icon"></b-icon>
									<span>收藏</span>
								</div>
							</div>
						</div>
						<div class="row_top_wrap">
						<!-- 图片 -->
							<div class="row_1" v-if="imgList.length">
									<div class="diy_img" v-for="(item,index) in imgList" :key="item+index">
									<img :src="$fullUrl(obj[item.name])" />
								</div>
							
							</div>
							<!-- 内容 -->
							<div class="row_2" :class="{flex_row2: !imgList.length}">
							<div class="row_cont" :class="{flex_row2_item: !imgList.length}" v-for="(item,index) in itemList" :key="item+index" v-show="$check_field('get',item.name)">
								<div class="view">
								<div class="diy_title">
									<span>{{item.title}}:</span>
								</div>

								<div class="diy_field diy_uid" :class="{flex_row2_item_text:imgList.length}" v-if="item.type == 'UID'">
									<span>
										{{ get_user_info(item.name,obj[item.name]) }}
									</span>
								</div>
								<div class="diy_field diy_video" :class="{flex_row2_item_text:imgList.length}" v-else-if="item.type == '视频'">
									<router-link :to="'/media/video?filename=' + $fullUrl(obj[item.name])" v-if="obj[item.name]" >
										<span>
											查看视频
										</span>
									</router-link>
								</div>
								<div class="diy_field diy_music" :class="{flex_row2_item_text:imgList.length}" v-else-if="item.type == '音频'">
									<audio v-if="obj[item.name]" style="text-align: left" :src="$fullUrl(obj[item.name])" controls></audio>
								</div>
								<div class="diy_field diy_music" :class="{flex_row2_item_text:imgList.length}" v-else-if="item.type == '文件'">
									<a :href="$fullUrl(obj[item.name])" target="_blank" style="color: rgb(64, 158, 255);">点击下载</a>
								</div>
								<div class="diy_field diy_date" :class="{flex_row2_item_text:imgList.length}" v-else-if="item.type == '日期' || item.type == '日后'">
									<span>
										{{ $toTime(obj[item.name] ,"yyyy-MM-dd") }}
									</span>
								</div>
								<div class="diy_field diy_time" :class="{flex_row2_item_text:imgList.length}" v-else-if="item.type == '时间'">
									<span>
										{{ $toTime(obj[item.name] ,"hh:mm:ss") }}
									</span>
								</div>
								<div class="diy_field diy_datetime" :class="{flex_row2_item_text:imgList.length}" v-else-if="item.type == '日长'">
									<span>
										{{ $toTime(obj[item.name] ,"yyyy-MM-dd hh:mm:ss") }}
									</span>
								</div>
								<div class="diy_field diy_phone" :class="{flex_row2_item_text:imgList.length}"  v-else-if="item.type == '电话' || item.type == '手机'">
									<span>
										{{ obj[item.name] }}
									</span>
								</div>
								<div class="diy_field diy_number" :class="{flex_row2_item_text:imgList.length}" v-else-if="item.type == '数字'">
									<span>
										{{ obj[item.name] }} {{ item.units }}
									</span>
								</div>
								<div class="diy_field diy_url" :class="{flex_row2_item_text:imgList.length}" v-else-if="item.type == '网址'">
									<div>
										<a :href="obj[item.name]" target="_blank" style="color: rgb(64, 158, 255);">{{ obj[item.name] }}</a>
									</div>
								</div>
								<div class="diy_field diy_multiple_img" :class="{flex_row2_item_text:imgList.length}" v-else-if="item.type == '图集'">
									<div>
										<el-image class="diy_multiple_img_item"
											:src="img" v-for="img in obj[item.name]" :preview-src-list="obj[item.name]">
											<div slot="error" class="image-slot">
												<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
											</div>
										</el-image>
									</div>
								</div>
								<div class="diy_field diy_desc" :class="{flex_row2_item_text:imgList.length}" v-else-if="item.type == '多文本'">
									<div>
										{{ obj[item.name] }}
									</div>
								</div>
								<!-- <div class="diy_field diy_html"  v-else-if="item.type == '编辑'" v-html="obj[item.name]" >

								</div> -->
								<div class="diy_field diy_text" :class="{flex_row2_item_text:imgList.length}" v-else>
									<span>
										{{ obj[item.name] }} {{ item.units }}
									</span>
								</div>
							
							</div>
						</div>
															<div class="view praise_wrap">
									<span class="diy_title">点赞数：</span>	<span class="diy_field diy_text">
									{{ praiseLen }}
									</span>
								</div>
																						<div class="view praise_wrap">
									<span class="diy_title">点击数：</span>	<span class="diy_field diy_text">
									{{ hitsLen }}
									</span>
								</div>
																				</div>
					</div>

			<div class="details_btn_wrap">
																											<button class="btn btn-primary details_btn" v-if="$check_action('/i_want_to_customize_it/edit','add') && !i_want_to_customize_it_limit" @click="to_form('/i_want_to_customize_it/edit')" ><span> 定制</span> </button>
																										</div>
						<!-- 富文本 -->
			<div class="rich_text" v-for="(item,index) in richList" :key="item+index" v-show="$check_field('get',item.name)">
						<div class="view">
						<div class="diy_title">
							<span v-text="item.title"></span>
						</div>
							<div class="diy_html" v-html="obj[item.name]" >

						</div>
						</div>
			</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mixin from "@/mixins/component.js";
	import mixinPage from "@/mixins/page.js";

	export default {
		mixins: [mixin,mixinPage],
		components: {

		},
		props: {
			obj: {
				type: Object,
				default: function() {
					return {};
				},
			}
		},
		data() {
			return {
				praiseLen: this.obj["praise_len"],
				hitsLen: this.obj["hits"],
				imgList: [
						{
							title: "商品封面",
							name: "commodity_cover",
							type: "图片"
						},
				],
				itemList: [
						{
							title: "商品编号",
							name: "commodity_number",
							type: "文本",
							},
						{
							title: "商品名称",
							name: "name_of_commodity",
							type: "文本",
							},
						{
							title: "分类名称",
							name: "category_name",
							type: "下寻",
							},
						{
							title: "商品相册",
							name: "commodity_album",
							type: "图集",
							},
						{
							title: "定制库存",
							name: "custom_inventory",
							type: "数字",
							},
						{
							title: "产品生产日期",
							name: "product_production_date",
							type: "日期",
							},
						{
							title: "商家用户",
							name: "business_user",
							type: "UID",
							},
						{
							title: "保质时间",
							name: "shelf_life_time",
							type: "日长",
							},
						{
							title: "定制声明内容",
							name: "custom_statement_content",
							type: "文件",
							},
						{
							title: "定制类型",
							name: "custom_type",
							type: "下选",
							},
						{
							title: "定制要求",
							name: "custom_requirements",
							type: "下多",
							},
						{
							title: "定制价格",
							name: "customized_price",
							type: "下随",
							},
				],
				richList: [
						{
							title: "说明备注",
							name: "notes",
							type: "多文本"
						},
						{
							title: "商品详情",
							name: "commodity_details",
							type: "编辑"
						},
				],
												// 用户列表
				list_user_business_user: [],
												state_praise:false,
				state_collect:false,
							i_want_to_customize_it_limit: false,
							followUserInfo: {},
				followList: [],
				followState: false,
				oneself: null,
			};
		},
		methods: {
			async getUserInfo() {
			  let res = await this.$get("~/api/user/get_obj",{user_id: this.obj.business_user});
			  this.followUserInfo = res.result.obj;
			  this.getFollowList(this.followUserInfo);
			},
			async getFollowList(followUserInfo) {
			  let res = await this.$get("~/api/follow/get_list", {
				followed_id: followUserInfo.user_id
			  });
			  this.followList = res.result.list;
			  this.oneself = this.followList.find(item => item.follower_id === this.$store.state.user.user_id);
			  
			  if(this.oneself) {
				this.followState = true;
			  }else {
				this.followState = false;
			  }
			},
			async attention(obj) {
			  let parnm = {
				follower_id: this.$store.state.user.user_id,
				follower_avatar: this.$store.state.user.avatar,
				follower_nickname: this.$store.state.user.nickname,
				followed_id: obj.user_id,
				followed_avatar: obj.avatar,
				followed_nickname: obj.nickname,
			  }
			  if(this.followState) {
				this.$confirm("不再关注该用户？", "提示", {
				  confirmButtonText: "确定",
				  cancelButtonText: "取消",
				  type: "warning",
				})
				.then(async () => {
				  let res = await this.$get("~/api/follow/del", {
					follow_id: this.oneself.follow_id
				  });
				  if(res.result) {
					this.getUserInfo();
					this.$message({
					  type: "success",
					  message: "取消关注",
					});
				  }
				})
			  }else {
				let res = await this.$post("~/api/follow/add", parnm);
				if(res.result) {
				  this.getUserInfo();
				  this.$message({
					type: "success",
					message: "关注成功",
				  });
				}
			  }
			},
			goPage() {
			  this.$router.push("/user/my_home_page?follower_id="+this.followUserInfo.user_id);
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
											get_user_info(name,id){
				var obj = null;
												if (name == 'business_user'){
					obj = this.list_user_business_user.getObj({"user_id":id});
				}
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
			 * 改变点赞数
			 */
			change_praise(obj) {
				var user_id = this.user.user_id;

				var query = {
					source_table: "customized_products",
					source_field: "customized_products_id",
					source_id: this.obj["customized_products_id"],
					user_id
				};

				var _this = this;

				// 点赞状态
				if (this.state_praise) {
					this.state_praise = false;
					this.$get('~/api/praise/del?', query, (res) => {
						if(res.result){
              _this.praiseLen = parseInt(_this.praiseLen)-1;
              var praise_len = _this.praiseLen;
							this.$post('~/api/customized_products/set?customized_products_id=' + _this.obj["customized_products_id"], {
								praise_len
							}, (res) => {
								if(res.result){
									console.log("添加点赞数状态：" ,res.result);
								}
								else if(res.error){
									console.error(res.error);
								}
							});
							// this.$toast("取消点赞");
							this.$message.success("取消点赞")
						}
						else if (res.error){
							this.$toast(res.error.message);
							console.error(res.error);
						}
					});
				} else {
					this.state_praise = true;
					this.$post('~/api/praise/add?', query, (res) => {
						if (res.result) {
              _this.praiseLen = parseInt(_this.praiseLen)+1;
              var praise_len = _this.praiseLen;
							this.$post('~/api/customized_products/set?customized_products_id=' + _this.obj["customized_products_id"], {
								praise_len
							}, (res) => {
								if(res.result){
									console.log("添加点赞数状态：" ,res.result);
								}
								else if(res.error){
									console.error(res.error);
								}
							});
							// this.$toast("点赞成功");
							this.$message.success("点赞成功")
						}
						else if (res.error) {
							this.$toast(res.error.message);
							console.error(res.error);
						}
					});
				};
			},
      /**
       * 获取点赞
       */
      get_praise() {
        var user_id = this.$store.state.user.user_id;
        this.$get("~/api/praise/count?", {
          source_table: "customized_products",
          source_field: "customized_products_id",
          source_id: this.obj.customized_products_id,
          user_id
        }, (res) => {
          if (res.result || res.result === 0) {
            console.log("sadsfasf"+JSON.stringify(res))
            this.state_praise = res.result ? true : false;
            console.log("点赞状态：" ,this.state_praise);
          }
          else if (res.error){
            this.$toast(res.error.message);
            console.error(res.error);
          }
        })
      },

				/**
			 * 改变收藏状态
			 */
			change_collect() {
				var user_id = this.user.user_id;

				var query = {
					source_table: "customized_products",
					source_field: "customized_products_id",
					source_id: this.obj["customized_products_id"],
					user_id
				};

				// 收藏状态
				if (this.state_collect) {
					this.state_collect = false;
					this.$get('~/api/collect/del?', query, (res) => {
						if(res.result){
							// this.$toast("取消收藏");
							this.$message.success("取消收藏")
						}
						else if (res.error){
							this.$toast(res.error.message);
							console.error(res.error);
						}
					});
				} else {
					this.state_collect = true;
													query.title = this.obj.name_of_commodity
																			query.img = this.obj.commodity_cover
																																																															this.$post('~/api/collect/add?', query, (res) => {
						if (res.result) {
							// this.$toast("收藏成功");
							this.$message.success("收藏成功")
						}
						else if (res.error) {
							this.$toast(res.error.message);
							console.error(res.error);
						}
					});
				};
			},
      check_collect() {
        var user_id = this.$store.state.user.user_id;
        var customized_products_id = this.obj.customized_products_id;
        this.$get('~/api/collect/count?', {
          user_id,
          source_table: "customized_products",
          source_field: "customized_products_id",
          source_id: customized_products_id
        }, (res) => {
          this.state_collect = res.result
        });
      },
			  get_i_want_to_customize_it_limit(){
	  	let param = {
	  		source_table: "customized_products",
	  		source_id: this.obj.customized_products_id,
	  		source_user_id: this.user.user_id
	  	};
	  	if(this.obj.i_want_to_customize_it_limit_times > 0){
	  		this.$get("~/api/i_want_to_customize_it/count?",param,(result)=>{
	  			if(result){
	  				if(result.result >= this.obj.i_want_to_customize_it_limit_times){
	  					this.i_want_to_customize_it_limit = true;
	  				}else{
	  					this.i_want_to_customize_it_limit = false;
	  				}
	  			}
	  		})
	  	}else{
	  		this.i_want_to_customize_it_limit = false;
	  	}
		this.obj.source_table = param.source_table;
		this.obj.source_id = param.source_id;
		this.obj.source_user_id = param.source_user_id;
	  },
			  },
		created() {
											this.get_list_user_business_user();
								      setTimeout(() => {
        this.get_praise();
        this.check_collect();
				this.get_i_want_to_customize_it_limit();
		      }, 1000);
		},
		watch:{
			obj:{
				deep: true,
				handler(newVal){
					this.praiseLen = this.obj["praise_len"]
					this.hitsLen = this.obj["hits"]
																									this.getUserInfo();
									}
			},
		},
	};
</script>

<style>
.collect_btn,
.praise_btn {
	margin-right: 0.5rem;
	display: flex;
	white-space: nowrap;
	padding: 0.125rem 0.5rem;
	border-radius: 0.25rem;
	color: var(--color_base);
	border: 1px solid var(--color_default);
	cursor: pointer;
}

.icon_change {
	color: var(--color_base);
}

.collect_btn:hover {
	border: 1px solid var(--color_base);
	color: var(color_base);
}

.praise_btn:hover {
	border: 1px solid var(color_base);
	color: var(--color_base);
}
.icon {
	font-size: 15px;
	margin: 3px;
}
.word_change {
	color: var(--color_base);
	font-weight: bold;
}
#app .diy_details_box .warp .container .row .btns_add{
	margin-left: 20px;
}
.btns_add {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	margin: 0 0.625rem 0.625rem 0;
	font-size: 0.875rem;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	color: rgba(0, 0, 0, 0.3);
}
.btns_add > * {
	display: flex;
	align-items: center;
	height: 2rem;
}
.diy_multiple_img{
	width: 100%;
}
.diy_multiple_img_item{
	float: left;
	margin: 0 10px 10px 0;
}
.diy_multiple_img_item img{
	height: 100px;
	width: auto;
}
.user_box {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 20px;
}

.user_avatar {
  width: 40px !important;
  height: 40px !important;
  border-radius: 100%;
  margin-right: 10px
}

.user_info {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.user_nickname {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
}
.user_fans {
  font-size: 12px;
  color: #999;
}
</style>

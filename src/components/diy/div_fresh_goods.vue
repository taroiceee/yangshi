<template>
	<div class="diy_details_box diy_div_fresh_goods">
		<div class="warp diy_warp">
			<div class="container">
				<div class="details_title">详情</div>
				<div class="row row_det">
						<div v-if="this.$store.state.user.user_id" class="btns_add col-12 col-sm-6">
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
																													<div class="view praise_wrap score_wrap" v-if="$check_option('/fresh_goods/details','can_show_score') || $check_option('/fresh_goods/details', 'can_score')">
								    <span class="diy_title" v-if="$check_option('/fresh_goods/details','can_show_score')">评分：</span>
									<div class="diy_field diy_text rating-item">
										<div class="rating-item" style="background-color: #fff;" v-if="$check_option('/fresh_goods/details','can_score')">
											<el-rate v-model="own_score_num" show-text :texts="['很差', '较差', '还行', '推荐', '力荐']" @change="setRating" :disabled="scoreReadOnly" />
										</div>
										<div class="rating-item" v-else>
											<span>您不能提交评分</span>
										</div>
									</div>
								</div>
													</div>
					</div>

			<div class="details_btn_wrap">
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
				score_num: 0,
				scoreReadOnly: false,
				imgList: [
				],
				itemList: [
						{
							title: "商品编号",
							name: "commodity_number",
							type: "文本",
							},
						{
							title: "下单规则",
							name: "order_rules",
							type: "文本",
							},
						{
							title: "卖家用户",
							name: "seller_user",
							type: "UID",
							},
						{
							title: "店铺地址",
							name: "store_address",
							type: "文本",
							},
						{
							title: "店铺名称",
							name: "shop_name",
							type: "文本",
							},
				],
				richList: [
				],
							// 用户列表
				list_user_seller_user: [],
						};
		},
		methods: {
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
						get_user_info(name,id){
				var obj = null;
							if (name == 'seller_user'){
					obj = this.list_user_seller_user.getObj({"user_id":id});
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

	  // 提交评分
	  setRating(num) {
	    const user_id = this.$store.state.user.user_id;
	    const fresh_goods_id = this.obj.fresh_goods_id;
	    const params = {
	      source_table: "fresh_goods",
	      source_field: "fresh_goods_id",
	  	  score_num: num,
	      source_id: fresh_goods_id,
	  	  user_id
	    }
	    this.$post("~/api/score/add?", params, res => {
	      this.scoreReadOnly = true;
	      this.$toast("评分成功");
	      this.getScore();
		  this.$emit("change_score");
	    });
	  },
	  // 查询平均评分
	  async getScore() {
	    const url = `~/api/score/avg`;
	    const params = {
	      field:'score_num',
	      source_table: "fresh_goods",
	      source_field: 'fresh_goods_id',
	      source_id: this.obj.fresh_goods_id,
	    };
	    const res = await this.$get(url, params);
	      const num = res.result || 0.0
	    this.score_num = Number(num.toFixed(2)) ;
	  },
	  // 查询个人评分
	  async getOwnScore() {
	    const url = "~/api/score/get_obj";
	    const user_id = this.$store.state.user.user_id;
	    const params = {
	      source_table: "fresh_goods",
	  	    source_field: 'fresh_goods_id',
	      source_id: this.obj.fresh_goods_id,
	      user_id: user_id,
	    };
	    const res = await this.$get(url, params);
	    this.own_score_num = res.result.obj?.score_num || 0;
	    if(this.own_score_num > 0) {
	      this.scoreReadOnly = true;
	    } else {
	      this.scoreReadOnly = false;
	    }
	  },
	  },
		created() {
						this.get_list_user_seller_user();
			      setTimeout(() => {
      }, 1000);
		},
		watch:{
			obj:{
				deep: true,
				handler(newVal){
					this.praiseLen = this.obj["praise_len"]
					this.hitsLen = this.obj["hits"]
										this.getScore();
					this.getOwnScore();
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

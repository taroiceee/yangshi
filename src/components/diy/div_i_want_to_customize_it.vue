<template>
	<div class="diy_details_box diy_div_i_want_to_customize_it">
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
				imgList: [
						{
							title: "商品封面",
							name: "commodity_cover",
							type: "图片"
						},
				],
				itemList: [
						{
							title: "订单号",
							name: "order_number",
							type: "文本",
							},
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
							type: "文本",
							},
						{
							title: "生产日期",
							name: "production_date",
							type: "日期",
							},
						{
							title: "保质时间",
							name: "shelf_life_time",
							type: "日长",
							},
						{
							title: "商家用户",
							name: "business_user",
							type: "UID",
							},
						{
							title: "定制价格",
							name: "customized_price",
							type: "文本",
							},
						{
							title: "商品相册",
							name: "commodity_album",
							type: "图集",
							},
						{
							title: "定制商品数量",
							name: "customized_commodity_quantity",
							type: "数字",
							},
						{
							title: "总价格",
							name: "total_price",
							type: "文本",
							},
						{
							title: "定制用户",
							name: "custom_user",
							type: "UID",
							},
						{
							title: "用户姓名",
							name: "user_name",
							type: "文本",
							},
						{
							title: "交付日期",
							name: "delivery_date",
							type: "日后",
							},
						{
							title: "定制音频",
							name: "custom_audio",
							type: "音频",
							},
						{
							title: "定制视频",
							name: "custom_video",
							type: "视频",
							},
						{
							title: "定制附件",
							name: "customized_accessories",
							type: "文件",
							},
						{
							title: "定制图片",
							name: "custom_picture",
							type: "图集",
							},
						{
							title: "地区位置",
							name: "regional_location",
							type: "地区",
							},
				],
				richList: [
				],
												// 用户列表
				list_user_business_user: [],
										// 用户列表
				list_user_custom_user: [],
											};
		},
		methods: {
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
											get_user_info(name,id){
				var obj = null;
												if (name == 'business_user'){
					obj = this.list_user_business_user.getObj({"user_id":id});
				}
										if (name == 'custom_user'){
					obj = this.list_user_custom_user.getObj({"user_id":id});
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

	  },
		created() {
											this.get_list_user_business_user();
									this.get_list_user_custom_user();
								      setTimeout(() => {
      }, 1000);
		},
		watch:{
			obj:{
				deep: true,
				handler(newVal){
					this.praiseLen = this.obj["praise_len"]
					this.hitsLen = this.obj["hits"]
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

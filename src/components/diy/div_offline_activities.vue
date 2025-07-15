<template>
	<div class="diy_details_box diy_div_offline_activities">
		<div class="warp diy_warp">
			<div class="container">
				<div class="details_title">详情</div>
				<div class="row row_det">
						<div v-if="this.$store.state.user.user_id" class="btns_add col-12 col-sm-6">
							<div v-if="$check_action('/offline_activities/details','set')">
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
																													<div class="view praise_wrap score_wrap" v-if="$check_option('/offline_activities/details','can_show_score') || $check_option('/offline_activities/details', 'can_score')">
								    <span class="diy_title" v-if="$check_option('/offline_activities/details','can_show_score')">评分：</span>
									<div class="diy_field diy_text rating-item">
										<div class="rating-item" style="background-color: #fff;" v-if="$check_option('/offline_activities/details','can_score')">
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
							title: "活动名称",
							name: "activity_name",
							type: "文本",
							},
						{
							title: "活动类型",
							name: "activity_type",
							type: "下寻",
							},
						{
							title: "活动日期",
							name: "activity_date",
							type: "日后",
							},
						{
							title: "报名人数",
							name: "number_of_enrolment",
							type: "数字",
							},
				],
				richList: [
						{
							title: "活动描述",
							name: "activity_description",
							type: "多文本"
						},
				],
									state_praise:false,
			};
		},
		methods: {
								get_user_info(name,id){
				var obj = null;
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
					source_table: "offline_activities",
					source_field: "offline_activities_id",
					source_id: this.obj["offline_activities_id"],
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
							this.$post('~/api/offline_activities/set?offline_activities_id=' + _this.obj["offline_activities_id"], {
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
							this.$post('~/api/offline_activities/set?offline_activities_id=' + _this.obj["offline_activities_id"], {
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
          source_table: "offline_activities",
          source_field: "offline_activities_id",
          source_id: this.obj.offline_activities_id,
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

	  // 提交评分
	  setRating(num) {
	    const user_id = this.$store.state.user.user_id;
	    const offline_activities_id = this.obj.offline_activities_id;
	    const params = {
	      source_table: "offline_activities",
	      source_field: "offline_activities_id",
	  	  score_num: num,
	      source_id: offline_activities_id,
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
	      source_table: "offline_activities",
	      source_field: 'offline_activities_id',
	      source_id: this.obj.offline_activities_id,
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
	      source_table: "offline_activities",
	  	    source_field: 'offline_activities_id',
	      source_id: this.obj.offline_activities_id,
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
					      setTimeout(() => {
        this.get_praise();
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

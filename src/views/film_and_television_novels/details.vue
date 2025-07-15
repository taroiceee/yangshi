<template>
	<div class="diy_details page_film_and_television_novels" id="film_and_television_novels_details">

		<div class='warp_dt_box'>
		<div class='warp'>
			<div class='container'>
				<div class='row'>
					<div class='col'>
						<div class='card_film_and_television_novels'>
							<div_film_and_television_novels :obj="obj" @change_score="change_score"></div_film_and_television_novels>
							<scoreStatisticsChart :obj="obj" :refreshScore="refreshScore" sourcetable="film_and_television_novels" sourcefield="film_and_television_novels_id" />

						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 地图 -->
		<div class="warp">
			<div class="container" style="margin-top:8px;">
				<div class="row">
					<div class="col">
						<template>
							<div>
								<iframe style="border: none" :width="searchTableHeight+100" :height="searchTableHeight"
										v-bind:src="reportUrl"></iframe>
							</div>
						</template>
					</div>
				</div>
			</div>
		</div>
		<!-- 地图 -->
		<div class="warp">
			<div class="container" style="margin-top:8px;">
				<div class="row">
					<div class="col">
						<div class="location_address" style="width: 100%;">当前定位:{{obj.location_address}}</div>
						<div id="map_container" style="width: 100%;height: 500px;"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- 评论区 -->
		<div class="warp" v-if="$check_action('/comment/list', 'get')">
			<div class="container">
				<div class="row review">
					<!-- 评论区 -->
					<div class="col">
						<bar_title class="mt" title="评论区"	v-if="list_comment.length"/>
						<div class="comment_box"	v-if="list_comment.length">
							<list_comment
									class="w-100"
									:list="list_comment"
									:obj="form_comment" 
									@reset="update_comment()"
							/>
							<b-pagination-nav
									:base-url="$route.path"
									:number-of-pages="count_pages"
									:link-gen="link_gen"
									@change="change_page"
									first-number
									last-number
							/>
						</div>

						<!-- 发表评论 -->
						<div class="form_editor form_edit_box">
							<div class="details_form_editor_title">发表评论</div>
							<div class="fl ml-3 answer_title" v-show="form_comment.reply_to_id">
								对 <i>{{ respondent }}</i> 回复:
							</div>
							<div class="fr mr-3" v-show="form_comment.reply_to_id">
								<b-button
										variant="outline-primary reset_answer_personnel"
										size="sm"
										@click="form_comment.reply_to_id = 0"
								>重置回复人
								</b-button
								>
							</div>
							<form_editor
									class="fn"
									:form="form_comment"
									@update_comment="update_comment"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
</div>
	</div>
</template>

<script>
	import div_film_and_television_novels from "@/components/diy/div_film_and_television_novels.vue";
	import list_comment from "@/components/diy/list_comment.vue";
	import bar_title from "@/components/diy/bar_title.vue";
	import form_editor from "@/components/diy/form_editor.vue";
	import AMapLoader from '@amap/amap-jsapi-loader';
	import scoreStatisticsChart from "@/components/charts/score_statistics_chart";
	import mixin from "@/mixins/page.js";
	export default {
		mixins:[mixin],
		components:{
			list_comment,
			bar_title,
			form_editor,
			scoreStatisticsChart,
			div_film_and_television_novels
		},
		data(){
			return{
				url_get_obj: "~/api/film_and_television_novels/get_obj?",

				field: "film_and_television_novels_id",

				obj: {
					"praise_len": 0,
					"location_address": "", // 定位地址
					"location_lng": "", // 定位地址经度
					"location_lat": "", // 定位地址纬度
				},

				query: {
						"album_name": "",
							"album_cover": "",
							"authors_name": "",
							"audio_content": "",
						"film_and_television_novels_id":0,
				},
				// 点赞
				praise: 0,
				// 点赞状态
				state_praise: false,
				// 收藏状态
				state_collect: false,
				list_comment: [],
				form_comment: {
					source_table: "film_and_television_novels",
					source_field: "film_and_television_novels_id",
					source_id: 0,
					reply_to_id: 0,
				},
				count_pages: 1, // 页面数
				reportUrl: "https://map.baidu.com/@12683619.778731756,2559833.254994969,18.04z",
				searchTableHeight: 0,
				searchTableWidth: 0,
				location_map:null,
				refreshScore: false,
			}
		},
		methods:{
			change_score() {
				this.refreshScore = true;
			},
			/**
			 * 添加访问量
			 */
			add_hits(obj) {
				obj["hits"] = obj["hits"] + 1;
				var hits = obj["hits"];
				this.$post('~/api/film_and_television_novels/set?film_and_television_novels_id=' + obj["film_and_television_novels_id"], {
					hits
				}, (res) => {
					if(res.result){
						console.log("添加访问量状态：" ,res.result);
						var body = {
							source_table: "film_and_television_novels",
							source_field: "film_and_television_novels_id",
							source_id: this.obj.film_and_television_novels_id,
							user_id: this.$store.state.user.user_id,
						};
						this.$post("~/api/hits/add?", body, (res) => {
							console.log(res);
						});
					}
					else if(res.error){
						console.error(res.error);
					}
				});
			},
			async get_obj_after(json) {
				// 判断是否获取到数据
				if (json && json.result && json.result.obj) {
					console.log(json.result.obj)
													var obj = json.result.obj;
					this.obj = obj
					// 增加点击数
					this.add_hits(obj);
					// 获取点赞数
					this.get_praise(obj);
					// 初始化收藏状态
					this.get_collect(obj);
					this.get_comment(obj);
					this.form_comment.source_id = this.obj.film_and_television_novels_id;
					this.initLocationMap();
								}
			},
							/**
			 * 初始化收藏状态
			 * @param {Object} obj
			 */
			get_collect(obj) {
				var user_id = this.user.user_id;

				var query = {
					source_table: "film_and_television_novels",
					source_field: "film_and_television_novels_id",
					source_id: obj["film_and_television_novels_id"],
					user_id
				};

				this.$get('~/api/collect/count?', query, (res) => {
					console.log(res);
					if (res.result || res.result === 0) {
						var bl = res.result ? true : false;
						this.state_collect = bl;
						console.log("收藏状态：" + bl);
					}
					else if(res.error) {
						console.error(res.error);
					}
				});
			},
		 /****
			 * 分享点击
			 *
			 *  */
			toShare(e){
				window.open(e);
			},
			/**
			 * 改变收藏状态
			 */
			change_collect() {
				var user_id = this.user.user_id;

				var query = {
					source_table: "film_and_television_novels",
					source_field: "film_and_television_novels_id",
					source_id: this.obj["film_and_television_novels_id"],
					user_id
				};

				// 收藏状态
				if (this.state_collect) {
					this.state_collect = false;
					this.$get('~/api/collect/del?', query, (res) => {
						if(res.result){
							var collect = _this.obj.collect-1
							this.$post('~/api/film_and_television_novels/set?film_and_television_novels_id=' + _this.obj["film_and_television_novels_id"], {
								collect
							}, (res) => {
								if(res.result){
									console.log("添加收藏数状态：" ,res.result);
								}
								else if(res.error){
									console.error(res.error);
								}
							});
							this.$toast("取消收藏");
						}
						else if (res.error){
							this.$toast(res.error.message);
							console.error(res.error);
						}
					});
				} else {
					this.state_collect = true;
																										this.$post('~/api/collect/add?', query, (res) => {
						if (res.result) {
							var collect = _this.obj.collect+1
							this.$post('~/api/film_and_television_novels/set?film_and_television_novels_id=' + _this.obj["film_and_television_novels_id"], {
								collect
							}, (res) => {
								if(res.result){
									console.log("添加收藏数状态：" ,res.result);
								}
								else if(res.error){
									console.error(res.error);
								}
							});
							this.$toast("收藏成功");
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
			 * @param {Object} obj
			 */
			get_praise(obj) {
				var user_id = this.user.user_id;

				this.$get("~/api/praise/count?", {
					source_table: "film_and_television_novels",
					source_field: "film_and_television_novels_id",
					source_id: obj["film_and_television_novels_id"]
				}, (res) => {
					if (res.result || res.result === 0) {
						this.praise = res.result;
						console.log("点赞数：" ,res.result);
					}
					else if (res.error){
						this.$toast(res.error.message);
						console.error(res.error);
					}
				});

				this.$get("~/api/praise/count?", {
					source_table: "film_and_television_novels",
					source_field: "film_and_television_novels_id",
					source_id: obj["film_and_television_novels_id"],
					user_id
				}, (res) => {
					if (res.result || res.result === 0) {
						this.state_praise = res.result ? true : false;
						console.log("点赞状态：" ,res.result);
					}
					else if (res.error){
						this.$toast(res.error.message);
						console.error(res.error);
					}
				})
			},

			/**
			 * 改变点赞数
			 */
			change_praise(obj) {
				var user_id = this.user.user_id;

				var query = {
					source_table: "film_and_television_novels",
					source_field: "film_and_television_novels_id",
					source_id: this.obj["film_and_television_novels_id"],
					user_id
				};

				var _this = this;
        _this.obj.praise_len = parseInt(_this.obj.praise_len)
				// 点赞状态
				if (this.state_praise) {
					this.state_praise = false;
					this.$get('~/api/praise/del?', query, (res) => {
						if(res.result){
							var praise_len = _this.obj.praise_len-1
							this.$post('~/api/film_and_television_novels/set?film_and_television_novels_id=' + _this.obj["film_and_television_novels_id"], {
								praise_len
							}, (res) => {
								if(res.result){
									console.log("添加点赞数状态：" ,res.result);
								}
								else if(res.error){
									console.error(res.error);
								}
							});
							this.$toast("取消点赞");
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
							var praise_len = _this.obj.praise_len+1
							this.$post('~/api/film_and_television_novels/set?film_and_television_novels_id=' + _this.obj["film_and_television_novels_id"], {
								praise_len
							}, (res) => {
								if(res.result){
									console.log("添加点赞数状态：" ,res.result);
								}
								else if(res.error){
									console.error(res.error);
								}
							});
							this.$toast("点赞成功");
						}
						else if (res.error) {
							this.$toast(res.error.message);
							console.error(res.error);
						}
					});
				};
			},
			/**
			 * 分页器
			 * @param { Number } page_num 分页数
			 * @return { Object } 查询对象
			 */
			link_gen(page_num) {
				return {
					query: this.query,
				};
			},
			/**
			 *加载下一页
			 */
			change_page(page_num) {
				this.get_comment(this.obj, page_num);
				this.form_comment.reply_to_id = 0;
			},
			/**
			 * 更新评论
			 */
			update_comment() {
				this.get_comment(this.obj);
			},
			/**
			 * 获取评论
			 * @param { Object } obj 文章对象
			 * @param { Number } page 分页数
			 * @param { Number } size 评论显示条数
			 */
			get_comment(obj, page = 1, size = 5) {
				this.$get(
						"~/api/comment/get_list?",
						{
							source_table: "film_and_television_novels",
							source_field: "film_and_television_novels_id",
							source_id: this.obj["film_and_television_novels_id"],
							page,
							size,
							reply_to_id: "0",
							orderby: "create_time desc",
						},
						(json) => {
							if (json.result) {
								var list_comment = json.result.list;
								list_comment.map((o) => {
									o.list_reply = [];
								});
								this.add_reply(list_comment).then((list) => {
									this.list_comment = list;
								});
								this.count_pages = Math.ceil(json.result.count / size) || 1
							}
						}
				);
			},
			/**
			 * @param { Array } list 评论列表
			 * 添加回复到评论列表
			 */
			add_reply(list) {
				return new Promise((resolve) => {
					for (let idx = 0; idx < list.length; idx++) {
						const obj = list[idx];
						this.$get(
								"~/api/comment/get_list?",
								{
									source_table: "film_and_television_novels",
									source_field: "film_and_television_novels_id",
									source_id: this.obj["film_and_television_novels_id"],
									orderby: "create_time desc",
									reply_to_id: obj.comment_id,
								},
								(res) => {
									if (res.result) {
										obj.list_reply = res.result.list;
									}
								}
						);
					}
					resolve(list);
				});
			},
			initLocationMap(){
				let _this = this;
				AMapLoader.load({
					key:"6c91f593f56f0ab0d6fe02f20276e97a",             // 申请好的Web端开发者Key，首次调用 load 时必填
					version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
					plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
				}).then((AMap)=>{
					_this.location_map = new AMap.Map("map_container",{  //设置地图容器id
						viewMode:"3D",    //是否为3D地图模式
						zoom:12,           //初始化地图级别
						center:[_this.obj.location_lng,_this.obj.location_lat], //初始化地图中心点位置
					});
					let marker = new AMap.Marker({
						position: new AMap.LngLat(_this.obj.location_lng,_this.obj.location_lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
						title: '北京'
					});
					// 将创建的点标记添加到已有的地图实例：
					_this.location_map.add(marker);
				}).catch(e=>{
					console.log(e);
				})
			},
			widthHeight() {
				this.searchTableHeight = window.innerHeight - 146;
				this.searchTableWidth = window.innerWidth - 280;
			},

		},
		computed: {
			respondent() {
				var reply_to_id = this.form_comment.reply_to_id;
				var respondent = "";
				this.list_comment.map((o) => {
					if (o.comment_id === reply_to_id) {
						respondent = o.nickname;
					}
				});
				return respondent;
			},
		},

		mounted() {
			window.onresize = () => {
				this.widthHeight(); // 自适应高宽度
			};
			this.$nextTick(function() {
				this.widthHeight();
			});
		},

	}
</script>

<style>
.qecode {
  display: flex;
  align-content: center;
  width: 270px;
  background: white;
  position: absolute;
  left: 20%;
  top: 20px;
  z-index: 999;
}
.qecodeImg {
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  padding-top: 10px;
  margin: 0 auto;
}
.btn_share{
	display: inline-block;
	position: relative;
	top: 15px;
	background: rgb(240, 238, 238);
	border: 1px solid #ccc;
	height: 38px;
	margin-left: 10px;
	padding: 3px 10px;
	cursor: pointer;
	overflow: hidden;
	border-radius: 5px;
}
.btn_share_icon{
	width: 30px;
	height: 28px;
	float: left;
	margin-right: 10px;
}
.share_box{
	display: none;
	float: left;
}
.share_box img{
	width: 30px;
	height: 28px;
	margin-right: 10px;
}
.btn_share:hover .share_box{
	display: block;
}
</style>

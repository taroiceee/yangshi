<template>
	<div class="diy_details page_customized_products" id="customized_products_details">

		<div class='warp_dt_box'>
		<div class='warp'>
			<div class='container'>
				<div class='row'>
					<div class='col'>
						<div class='card_customized_products'>
							<div_customized_products :obj="obj"></div_customized_products>
								<div  class="">
									<span >限制次数：{{ obj.limit_times }}</span>
								</div>
							<div class='time_type' v-if='timeTypeShow'>
								<span>
									{{ obj['timer_title'] }}
								</span>
								<div id="start">
									<span>00</span>天
									<span>00</span>小时
									<span>00</span>分
									<span>00</span>秒
								</div>
							</div>

							<div class="btn_share">
							 <img class="btn_share_icon" src="../../../public/img/share_icon.png"/>
							 <span class="share_box">
								 <img @click="toShare('https://weixin.qq.com/')" src="../../../public/img/wx_icon.png" alt="">
								 <img @click="toShare('https://weixin.qq.com/')" src="../../../public/img/friend_icon.png" alt="">
								 <img @click="toShare('https://im.qq.com/')" src="../../../public/img/qq_icon.png" alt="">
								 <img @click="toShare('https://qzone.qq.com/')" src="../../../public/img/qq_space.png" alt="">
								 <img @click="toShare('https://weibo.com/')" src="../../../public/img/wb_icon.png" alt="">
								 <img @click="toShare('https://douyin.com/')" src="../../../public/img/tiktok_icon.png" alt="">
							 </span>
							</div>
						    <img src="../../../public/img/qrcode_img.png" style="width: 35px; height: 35px;margin-left:3px;" :preview-src-list="[obj.qrcode_img]" @mouseenter="enters()" />
							<div  class="qecode" >
								<div  class="qecodeImg"  v-if="qecodeImg" @mouseleave="leaver()">
									<img :src="$fullUrl(obj['qrcode_img'])" style="width:250px;height:300px;" />
									<span >{{ obj.qrcode_title }}</span>
								</div>
							</div>
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
	import div_customized_products from "@/components/diy/div_customized_products.vue";
	import list_comment from "@/components/diy/list_comment.vue";
	import bar_title from "@/components/diy/bar_title.vue";
	import form_editor from "@/components/diy/form_editor.vue";
	import AMapLoader from '@amap/amap-jsapi-loader';
	import mixin from "@/mixins/page.js";
	export default {
		mixins:[mixin],
		components:{
			list_comment,
			bar_title,
			form_editor,
			div_customized_products
		},
		data(){
			return{
				url_get_obj: "~/api/customized_products/get_obj?",

				field: "customized_products_id",

				obj: {
					"praise_len": 0,
					"location_address": "", // 定位地址
					"location_lng": "", // 定位地址经度
					"location_lat": "", // 定位地址纬度
				},

				query: {
						"commodity_number": "",
							"name_of_commodity": "",
							"category_name": "",
							"commodity_cover": "",
							"commodity_album": "",
							"custom_inventory": 0,
							"product_production_date": "",
							"business_user": 0,
							"shelf_life_time": "",
							"custom_statement_content": "",
							"custom_type": "",
							"custom_requirements": "",
							"customized_price": "",
							"notes": "",
							"commodity_details": "",
						"customized_products_id":0,
					"qrcode_img": "", // 图片
					"qrcode_title": "", // 二维码标题
					"timer_title":'', // 计时器标题
					"timing_start_time":'', // 计时开始时间
					"timing_end_time":'', // 计时结束时间
				},
				// 点赞
				praise: 0,
				// 点赞状态
				state_praise: false,
				// 收藏状态
				state_collect: false,
				list_comment: [],
				form_comment: {
					source_table: "customized_products",
					source_field: "customized_products_id",
					source_id: 0,
					reply_to_id: 0,
				},
				count_pages: 1, // 页面数
				reportUrl: "https://map.baidu.com/@12683619.778731756,2559833.254994969,18.04z",
				searchTableHeight: 0,
				searchTableWidth: 0,
				qecodeImg: false,
				timeTypeShow: true,
				location_map:null,
			}
		},
		methods:{
			/**
			 * 添加访问量
			 */
			add_hits(obj) {
				obj["hits"] = obj["hits"] + 1;
				var hits = obj["hits"];
				this.$post('~/api/customized_products/set?customized_products_id=' + obj["customized_products_id"], {
					hits
				}, (res) => {
					if(res.result){
						console.log("添加访问量状态：" ,res.result);
						var body = {
							source_table: "customized_products",
							source_field: "customized_products_id",
							source_id: this.obj.customized_products_id,
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
																			if(json.result.obj["product_production_date"]=="0000-00-00"){
					  json.result.obj["product_production_date"] = null;
					}
					if(parseInt(json.result.obj["product_production_date"]) > 9999){
						json.result.obj["product_production_date"] = this.$toTime(parseInt(json.result.obj["product_production_date"]),"yyyy-MM-dd")
					}
									if(json.result.obj["shelf_life_time"]=="0000-00-00 00:00:00"){
					  json.result.obj["shelf_life_time"] = null;
					}
					if(parseInt(json.result.obj["shelf_life_time"]) > 9999){
						json.result.obj["shelf_life_time"] = this.$toTime(parseInt(json.result.obj["shelf_life_time"]),"yyyy-MM-dd hh:mm:ss")
					}
																			var obj = json.result.obj;
					this.obj = obj
					// 增加点击数
					this.add_hits(obj);
					// 获取点赞数
					this.get_praise(obj);
					// 初始化收藏状态
					this.get_collect(obj);
					this.get_comment(obj);
					this.form_comment.source_id = this.obj.customized_products_id;
					  if (JSON.stringify(this.obj["timing_end_time"]).indexOf("-")===-1) {
						this.obj["timing_end_time"] = this.$toTime(parseInt(this.obj["timing_end_time"]), "yyyy-MM-dd hh:mm:ss")
					  }
					  if (JSON.stringify(this.obj["timing_start_time"]).indexOf("-")===-1) {
						this.obj["timing_start_time"] = this.$toTime(parseInt(this.obj["timing_start_time"]), "yyyy-MM-dd hh:mm:ss")
					  }
					this.runTiming();
					this.initLocationMap();
										if (this.obj.commodity_album) {
						let commodity_album_arr = await this.getDataArr(JSON.parse(obj["commodity_album"]))
						this.$set(this.obj,"commodity_album",commodity_album_arr);
					}
															}
			},
								/**
			 * 格式化图集
			 * @param {Object} arr
			 */
			getDataArr(arr){
				let new_arr = [];
				new_arr = arr.map((item) => {
					item = this.$fullUrl(item)
					return item
				})
				return new_arr;
			},
														/**
			 * 初始化收藏状态
			 * @param {Object} obj
			 */
			get_collect(obj) {
				var user_id = this.user.user_id;

				var query = {
					source_table: "customized_products",
					source_field: "customized_products_id",
					source_id: obj["customized_products_id"],
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
							var collect = _this.obj.collect-1
							this.$post('~/api/customized_products/set?customized_products_id=' + _this.obj["customized_products_id"], {
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
													query.title = this.obj.name_of_commodity
																			query.img = this.obj.commodity_cover
																																																															this.$post('~/api/collect/add?', query, (res) => {
						if (res.result) {
							var collect = _this.obj.collect+1
							this.$post('~/api/customized_products/set?customized_products_id=' + _this.obj["customized_products_id"], {
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
					source_table: "customized_products",
					source_field: "customized_products_id",
					source_id: obj["customized_products_id"]
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
					source_table: "customized_products",
					source_field: "customized_products_id",
					source_id: obj["customized_products_id"],
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
					source_table: "customized_products",
					source_field: "customized_products_id",
					source_id: this.obj["customized_products_id"],
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
							source_table: "customized_products",
							source_field: "customized_products_id",
							source_id: this.obj["customized_products_id"],
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
									source_table: "customized_products",
									source_field: "customized_products_id",
									source_id: this.obj["customized_products_id"],
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
			enters() {
			  this.qecodeImg = true;
			},
			leaver() {
			  this.qecodeImg = false;
			},

			/**
			 * 倒计时
			 */
			oDiv(el) {
				if(typeof(el) == 'string') {
					return(document.getElementById(el));
				}
				return(el);
			},

			fillZero(num, digit) {
				var str = '' + num;
				if(str.length < digit) {
					str = '0' + str;
				}
				return str;
			},
			runTiming() {
				var oDiv2 = this.oDiv('start');
				var aSpan = oDiv2.getElementsByTagName('span');
				var sTxtDay = aSpan[0]; //天
				var sTxtHour = aSpan[1] //小时
				var sTxtMin = aSpan[2] //分
				var sTxtSec = aSpan[3] //秒
				var timer = null;
				var _this = this;
				timer = setInterval(updateTime, 1000);
				updateTime();

				function updateTime() {
					var oEndDate = _this.obj.timing_end_time;
					var seart = _this.obj.timing_start_time;
          if(oEndDate.indexOf("-") != -1){
            oEndDate = new Date(oEndDate).getTime();
          }
          if(seart.indexOf("-") != -1){
            seart = new Date(seart).getTime();
          }
					var oNowDate = new Date();
					var iRemain = 0
					iRemain = parseInt((oNowDate.getTime() - seart) / 1000);
					if(iRemain <= 0) { //判断开始时间是否小于或等于今天
						clearInterval(timer);
						iRemain = 0;
						_this.timeTypeShow = false;
					}else{
					iRemain = parseInt((oEndDate - oNowDate.getTime()) / 1000);
						if(iRemain <= 0) { //判断结束时间是否小于或等于今天
							clearInterval(timer);
							iRemain = 0;
							_this.timeTypeShow = false;
						}else{
							_this.timeTypeShow = true;
							var iDay = parseInt(iRemain / 86400); //剩余天数

							iRemain %= 86400;
							var iHour = parseInt(iRemain / 3600); //剩余小时

							iRemain %= 3600;
							var iMin = parseInt(iRemain / 60); //剩余分钟

							iRemain %= 60;
							var iSec = iRemain; //剩余秒

							sTxtDay.innerHTML = _this.fillZero(iDay, 2);
							sTxtHour.innerHTML = _this.fillZero(iHour, 2);
							sTxtMin.innerHTML = _this.fillZero(iMin, 2);
							sTxtSec.innerHTML = _this.fillZero(iSec, 2);
						}
					}
				}
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

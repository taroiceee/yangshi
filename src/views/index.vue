<template>
	<div class="page_root" id="root_demo">
		<div class="warp banner">
		    <div class="container swiper_box">
		        <div class="row">
		            <div class="col-12">
		                <div class="sw_no">
		                    <!-- 轮播图组件 -->
		                    <div class="swiper_img">
		                        <swiper_img :list="list_slide"/>
		                    </div>
							<div class="card_notice">
								<div class="notice_title">网站公告 <router-link to="notice/list" class="not_more more"><span class="mor">更多</span></router-link></div>
								<!-- 公告组件 -->
								<swiper_notice :list="list_notice"/>
							</div>
		                </div>
		            </div>
		        </div>
		    </div>
		</div>

		<div class="warp adver">
		    <div class="container">
		        <div class="row">
		            <div class="col">
		                <div class="card_ad">
		                    <!-- 顶部 -->
		                    <list_ad
		                            :list="list_ad"
		                            location="顶部广告"
		                    />
		                </div>
		            </div>
		        </div>
		    </div>
		</div>

		<div class="warp product" v-if="$check_action('/goods/list', 'get')">
		    <div class="container">
		        <div class="row">
		            <div class="col-12">
		                <div class="article_recommend">
		                    <div class="title">
									                        <span> 水果商城 </span>
									                    </div>
							<div class="text_t"><span></span></div>
		                    <div class="more_box">
		                        <router-link to="/goods/list" class="pro_more more">
		                            <span class="mor">更多</span>
		                        </router-link>
		                    </div>

		                </div>
		                <!-- 商品推荐列表组件 -->
						<div class="list_goods_box">
						 <div class="Left_box">
								<span class="i"></span>
								<span class="i"></span>
								<span class="i"></span>
							</div>
						   <list_goods  :list="list_goods"/>
						<goods_slisd  :list="list_goods"/>

		                <!-- 商品推荐表格组件 -->
		                <div class="overflow-auto table_goods" >
		                    <table id="list_goods" role="table" aria-busy="false" :aria-colcount="fields_goods.length"
		                           class="table b-table table-striped table-hover">
		                        <thead>
		                        <tr>
		                            <th v-for="(o,i) in fields_goods" :key="i">
		                                {{o.label}}
		                            </th>
		                        </tr>
		                        </thead>
		                        <tbody>
		                        <tr v-for="(o, i) in list_table_goods" :key="i">
		                            <td v-for="(oj,n) in fields_goods" @click="to_details('goods',o)">
		                                <img v-if="oj.type && oj.type == '图片' " :src="$fullUrl(o[oj.key])" alt=""
		                                     v-default-img="'../../public/img/default.png'">
		                               <span v-else-if="oj.key === 'create_time'">{{ o[oj.key] | formatDate}}</span>
		                                <span v-else>{{ o[oj.key] }}</span>
		                            </td>
		                        </tr>
		                        </tbody>
		                    </table>
		                </div>
						 <div class="right_box">
								<span class="i"></span>
								<span class="i"></span>
								<span class="i"></span>
                        </div>
						</div>

		            </div>
		        </div>
		    </div>
		</div>
		<div class="warp adver">
		    <div class="container">
		        <div class="row">
		            <div class="col">
		                <div class="card_ad">
		                    <!-- 中部 -->
		                    <list_ad
		                            :list="list_ad"
		                            location="中部广告"
		                    />
		                </div>
		            </div>
		        </div>
		    </div>
		</div>
		<div class="warp article_s">
		    <!-- 容器 -->
		    <div class="container">
		        <div class="row">
		            <div class="col-12">
		                <!-- 标题栏组件 -->
		                <div class="article_recommend">
		                    <div class="title">
		                        <span> 商城资讯 </span>
		                    </div>
							<div class="text_t"><span></span></div>
		                    <div class="more_box">
		                        <router-link to="/article/list" class="art_more more">
		                            <span class="mor">更多</span>
		                        </router-link>
		                    </div>

		                </div>
						<div class="list_article_box">
						<div class="Left_box">
								<span class="i"></span>
								<span class="i"></span>
								<span class="i"></span>
                        </div>
							<!-- 商城资讯列表组件 -->
							<list_article v-if="show_list_article" :list="list_article" />
							<div class="overflow-auto table_article" >
								<table id="list_article" role="table" aria-busy="false"
									:aria-colcount="fields_article.length"
									class="table b-table table-striped table-hover">
									<thead>
									<tr>
										<th v-for="(o,i) in fields_article" :key="i">
											{{o.label}}
										</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="(o, i) in list_table_article" :key="i">
										<td v-for="(oj,n) in fields_article" @click="to_details('article',o)">
											<img v-if="oj.type && oj.type == '图片' " :src="$fullUrl(o[oj.key])" alt=""
												 v-default-img="'../../public/img/default.png'">
											<span v-else-if="oj.key === 'create_time'">{{ o[oj.key] | formatDate }}</span>
											<span v-else>{{ o[oj.key] }}</span>
										</td>
									</tr>
									</tbody>
								</table>
							</div>
							<div class="right_box">
								<span class="i"></span>
								<span class="i"></span>
								<span class="i"></span>
                        	</div>
						</div>

		            </div>
		        </div>
		    </div>
		</div>
							<!-- 推荐定制商品模块(开始) -->
		<div class="ins warp model1" v-if="$check_action('/customized_products/list', 'get')">
		    <!-- 容器 -->
		    <div class="container">
		        <div class="row">
		            <div class="col-12">
		                <!-- 标题栏组件 -->
		                <div class="diy_recommend">
		                    <div class="title">
		                        <span> 定制商品推荐 </span>
		                    </div>
							<div class="text_t"><span></span></div>
		                    <div class="more_box">
		                        <router-link to="/customized_products/list" class="ins_more more">
		                            <span calss="mor">更多</span>
		                        </router-link>
		                    </div>

		                </div>
		                <!-- 定制商品推荐列表组件 -->
						<div class="list_customized_products_box" ins_box>
							<div class="Left_box">
								<span class="i"></span>
								<span class="i"></span>
								<span class="i"></span>
                        	</div>
							<list_customized_products :list="list_customized_products" />
							<div class="right_box">
								<span class="i"></span>
								<span class="i"></span>
								<span class="i"></span>
                        	</div>
						</div>

		            </div>
		        </div>
		    </div>
		</div>
		<!-- 推荐定制商品模块(结束) -->
										<!-- 推荐影视小说模块(开始) -->
		<div class="ins warp model2" v-if="$check_action('/film_and_television_novels/list', 'get')">
		    <!-- 容器 -->
		    <div class="container">
		        <div class="row">
		            <div class="col-12">
		                <!-- 标题栏组件 -->
		                <div class="diy_recommend">
		                    <div class="title">
		                        <span> 影视小说推荐 </span>
		                    </div>
							<div class="text_t"><span></span></div>
		                    <div class="more_box">
		                        <router-link to="/film_and_television_novels/list" class="ins_more more">
		                            <span calss="mor">更多</span>
		                        </router-link>
		                    </div>

		                </div>
		                <!-- 影视小说推荐列表组件 -->
						<div class="list_film_and_television_novels_box" ins_box>
							<div class="Left_box">
								<span class="i"></span>
								<span class="i"></span>
								<span class="i"></span>
                        	</div>
							<list_film_and_television_novels :list="list_film_and_television_novels" />
							<div class="right_box">
								<span class="i"></span>
								<span class="i"></span>
								<span class="i"></span>
                        	</div>
						</div>

		            </div>
		        </div>
		    </div>
		</div>
		<!-- 推荐影视小说模块(结束) -->
							
		<div class="warp adver">
			<div class="container">
				<div class="row">
					<div class="col">
						<div class="card_ad">
							<!-- 底部 -->
							<list_ad
									:list="list_ad"
									location="底部广告"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 智能机器人回复 -->
		<img class="robotic" src="../../public/robot.png" @click="showDialog(true)" alt=""/>
		<div class="robot_box">
			<robotic_robot
					v-show="robot_dialog_visible"
					:dialog_visible="robot_dialog_visible"
					@dialogVisibleEvent="showDialog">
			</robotic_robot>
		</div>
		<img class="support_entry" src="../../static/support.jpg" @click="openSupportModal" alt="">

		<div class="support_module" v-if="showChat">
			<div class="container" :class="{small_css:isSmall,big_css:!isSmall}">
				<div class="support_module_title">
					<span class="title_btn" @click="scaleSmall">{{!isSmall? '一' : '□' }}</span>
				</div>

				<div class="content" ref="support_content">
					<div v-for="(item,index) in chatList" :key="item+index">
						<div class="item item-center" v-if="item.sendTime"><span v-text="item.sendTime"></span></div>
						<div class="item" :class="{item_left: item.isAdmin, item_right: !item.isAdmin}">
							<div class="avatar" v-if="item.isAdmin">
								<img src="../../static/system_icon.jpg"/>
							</div>
							<div class="bubble" :class="{ 'bubble-right': !item.isAdmin}" v-text="item.content"></div>
							<div class="avatar" v-if="!item.isAdmin">
								<img src="../../static/mine.jpg"/>
							</div>
						</div>
					</div>


				</div>
				<div class="input-area">
					<textarea name="text" style="height:50px;" v-model="sendValue" id="textarea"
							  placeholder="输入内容"></textarea>

				</div>
				<div class="button-area">
					<!-- <div style="width: 100px;height:50px;cursor: pointer;" @click="toToggle"></div> -->
					<button id="send-btn" @click="sendChat">发 送</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mixin from "@/mixins/page.js";
						import list_customized_products from "@/components/diy/list_customized_products.vue";
					import list_film_and_television_novels from "@/components/diy/list_film_and_television_novels.vue";
						import bar_title from "@/components/diy/bar_title.vue";
	import list_goods from "@/components/diy/list_goods.vue";
	import goods_slisd from "@/components/diy/goods_slisd.vue";
	import list_article from "@/components/diy/list_article.vue";
	import robotic_robot from '@/components/diy/ourts.vue'
	import swiper_img from "@/components/diy/swiper_img.vue";
	import list_ad from "@/components/diy/list_ad.vue";
	import swiper_notice from "@/components/diy/swiper_notice.vue";

	export default {
		mixins: [mixin],
		components: {
								list_customized_products,
							list_film_and_television_novels,
								bar_title,
			list_goods,
			goods_slisd,
			list_article,
			robotic_robot,
			swiper_img,
			swiper_notice,
			list_ad,
		},
		data() {
			return {
				isSmall: false,
				sendValue: "",
				chatList:[],
				showChat: false,
				isAdmin: false,
				token:"",
				// 文章模型数组
				list_article: [],
				vm_arr_article: [
					"article_id",
					"img",
					"title",
					"praise_len",
					"hits",
					"type",
					"create_time",
				],
				fields_article: [
					{key: "img", label: "图片", type: "图片"},
					{key: "title", label: "标题", type: "文本"},
					{key: "praise_len", label: "点赞数", type: "文本"},
					{key: "hits", label: "点击量", type: "文本"},
					{key: "type", label: "分类", type: "文本"},
					{key: "create_time", label: "发布时间", type: "文本"},
				],
				show_list_article: true,
									list_customized_products: [],
								list_film_and_television_novels: [],
									// 商品模型数组
				list_goods: [],
				vm_arr_goods: [
					"goods_id",
					"img",
					"title",
					"description",
					"price",
					"price_ago",
						"sales",
					"type",
					"hits",
					"create_time",
					"hits"
				],
				fields_goods: [
				    {key: "img", label: "图片",type: "图片"},
				    {key: "title", label: "标题",type: "文本"},
				    {key: "description", label: "描述",type: "多文本"},
				    {key: "price", label: "价格",type: "数字"},
				    {key: "price_ago", label: "原价格",type: "数字"},
				    {key: "type", label: "分类",type: "文本"},
				    {key: "hits", label: "点击量",type: "数字"},
				    {key: "create_time", label: "上架时间",type: "日长"},
				],
				show_list_goods: true,
				robot_dialog_visible:false,
				list_slide: [],
				list_menu: [],
				list_notice: [],
				list_ad: []
			};
		},
		created(){
			this.get_token();
			this.getChat();
		},
		methods: {
			getHashParams() {
				let key = "token";
				// / 获取所有参数
				let query = window.location.search.substring(1);
				let hash = window.location.hash.substring(1);
				// 如果锚点后面有参数，把锚点后面的参数加入到search参数中
				if(hash.indexOf("?") > -1){
					query += "&" + hash.split("?")[1];
				}
				let key_values = query.split("&");
				let params = {};
				// 遍历参数并存入params对象
				key_values.map(function (key_val){
					let key_val_arr = key_val.split("=");
					params[key_val_arr[0]] = key_val_arr[1];
				});
				// 如果找到了key对应的参数，返回对应值
				if(typeof params[key]!="undefined"){
					return params[key];
				}
				// 如果没找到，返回空字符串
				return "";
			},
			get_token(){
				// let token = this.$route.query.token
				let token = this.getHashParams();
				console.log(token)
				if (token){
					$.db.set("token",token,120);
					let new_href = window.location.href.replaceAll("?token="+encodeURIComponent(token));
					location.href = new_href
				}
			},
					// toggle
			toToggle(){
				this.isAdmin = !this.isAdmin;
			},
			// open
			openSupportModal(){
				if(!this.token){
					this.$toast("请先进行登录","error");
				}
				console.log("打开客服")
				this.showChat = !this.showChat;
				if(this.showChat && this.chatList.length){
						setTimeout(() => {
					this.scrollBottom();
				},0)
				}

			},
			//获取用户信息
			async get_user_by_user_id(o,oj,key){
				let obj = await this.$get("~/api/user/get_obj?user_id="+o[key]);
				let ret = "";
				if(obj){
					ret = obj.result.obj.nickname+"-"+obj.result.obj.username;
					oj.value = ret;
				}
			},
			// 缩小聊天窗口
			scaleSmall(){
				this.isSmall = !this.isSmall;
			},
			// 获取聊天记录
			getChat(){
				let record = window.localStorage.getItem('supportChat');
				let userGroup = window.localStorage.getItem('user_group');
				let _token = window.localStorage.getItem('token');

				if(record){
					this.chatList = JSON.parse(record);
				}
				if(userGroup){
					let _userGroup =JSON.parse(userGroup);
					this.isAdmin = _userGroup["value"] == "管理员" ? true : false;
				}
				if(_token){
					let tokenObj =JSON.parse(_token);
					this.token = tokenObj["value"] || "";
				}

			},
			// 滚动到最底部
			scrollBottom(){
				let contentBox = this.$refs['support_content'];
					contentBox.scrollTop = contentBox.scrollHeight+500;
			},
			// 发送聊天
			sendChat(){
				let nowTime = new Date( +new Date() + 8 * 3600 * 1000 ).toJSON().substr(0,16).replace("T"," ");
				let nowTimeChuo = new Date().getTime();
				let reallyTime = "";
				let spaceTime = 12000;	//	20分钟
				if(!this.sendValue){
					this.$toast("不能发送空内容","error");
				};
		   this.chatList.length && (reallyTime =	nowTimeChuo - this.chatList[this.chatList.length-1]['nowTime'] > spaceTime ?  nowTime : "");
				!this.chatList.length && (reallyTime = nowTime);
			  let	obj = {
						isAdmin: this.isAdmin,
						content: this.sendValue,
						sendTime: reallyTime,
						nowTime: nowTimeChuo,
				}
				this.chatList.push(obj);

				setTimeout(() => {
						this.scrollBottom();
				},0)

				window.localStorage.setItem('supportChat',JSON.stringify(this.chatList));
				this.sendValue = "";
			},

								// 获取定制商品列表
			get_customized_products() {
				let url = "~/api/customized_products/get_list?";
						var oNowDate = this.dateFormat("yyyy-MM-dd hh:mm:ss")+"";
				var url_get_list = "~/api/customized_products/get_list?timing_start_time_max=" + oNowDate +
					"&timing_end_time_min=" + oNowDate + "&like=0";
				url = url_get_list;
														let param = {
							"examine_state": "已通过", // 审核状态
									"page": 1,
					"size": 12
				}
								this.$get(url, param, (json) => {
					if (json.result) {
						this.list_customized_products = json.result.list;
					}
				})
			},
							// 获取影视小说列表
			get_film_and_television_novels() {
				let url = "~/api/film_and_television_novels/get_list?";
														let param = {
									"page": 1,
					"size": 12
				}
								this.$get(url, param, (json) => {
					if (json.result) {
						this.list_film_and_television_novels = json.result.list;
					}
				})
			},
					
			/**
			 * 当前年月日时分秒方法
			 * @param {Object} fmt
			 */
			dateFormat(fmt) {
				var myDate = new Date();
				var o = {
					"M+": myDate.getMonth() + 1, // 月份
					"d+": myDate.getDate(), // 日
					"h+": myDate.getHours(), // 小时
					"m+": myDate.getMinutes(), // 分
					"s+": myDate.getSeconds(), // 秒
					"q+": Math.floor((myDate.getMonth() + 3) / 3), // 季度
					"S": myDate.getMilliseconds() // 毫秒
				};
				if (/(y+)/.test(fmt))
					fmt = fmt.replace(RegExp.$1, (myDate.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
						return fmt;
			},

			// 获取轮播图
			get_slides() {
			    this.$get("~/api/slides/get_list?", {}, (json) => {
			        if (json.result) {
			            this.list_slide = json.result.list;
			        }
			    });
			},
			// 获取导航栏
			get_menu() {
				var user_group = this.user_group;
			    this.$get(
			        "~/api/auth/get_list?",
			        {
			            page: "",
						user_group,
						get: 1,
						position: "top"
			        },
			        (json) => {
			            if (json.result) {
			                this.list_menu = json.result.list;
			            }
			        }
			    );
			},
			// 获取文章
			get_article() {
			    this.$get(
			        "~/api/article/get_list?",
			        {
			            page: 1,
			            size: 6,
			        },
			        (json) => {
			            if (json.result) {
			                var list_article = json.result.list;
			                this.list_article = list_article;
			            }
			        }
			    );
			},
			// 获取广告
			get_ad() {
			    this.$get(
			        "~/api/ad/get_list?",
			        {
			            orderby: '`display` desc'
			        },
			        (json) => {
			            if (json.result) {
			                this.list_ad = json.result.list;
			            }
			        }
			    );
			},
			// 获取商品
			get_goods() {
				let url = "~/api/goods/get_list?"
				let query = { "page": 1, "size": 12 }
																																																																    this.$get(
			        url,
			        query,
			        (json) => {
			            if (json.result) {
			                var list_goods = json.result.list;
			                this.list_goods = list_goods;
			            }
			        }
			    );
			},
			showDialog(visible){
				this.robot_dialog_visible = visible;
			},
			// 获取公告列表
			get_notice() {
			    this.$get(
			        "~/api/notice/get_list?",
			        {
			            page: 1,
			            size: 3,
			        },
			        (json) => {
			            if (json.result) {
			                var list_notice = json.result.list;
			                this.list_notice = list_notice;
			            }
			        }
			    );
			},
			to_details(key,o,id) {
				if(!id){
					id = key + "_id";
				}
			    this.$router.push('/' + key + '/details?' + id + '=' + o[id]);
			}
		},
		mounted() {
								this.get_customized_products();
							this.get_film_and_television_novels();
								this.get_menu();
			this.get_slides();
			this.get_article();
			this.get_goods();
			this.get_notice();
			this.get_ad();
		},
		computed: {
							    list_table_feedback_on_opinions() {
		        var list = this.list_customized_products;
		        var list_table = [];
		        for (let i = 0; i < list.length; i++) {
		            list_table[i] = {};
		            this.vm_arr_customized_products.map((o) => {
		                // 第二个中括号是对象的属性
		                list_table[i][o] = list[i][o] || "";
		            });
		        }
		        return list_table;
		    },
						    list_table_feedback_on_opinions() {
		        var list = this.list_film_and_television_novels;
		        var list_table = [];
		        for (let i = 0; i < list.length; i++) {
		            list_table[i] = {};
		            this.vm_arr_film_and_television_novels.map((o) => {
		                // 第二个中括号是对象的属性
		                list_table[i][o] = list[i][o] || "";
		            });
		        }
		        return list_table;
		    },
					
			list_table_goods() {
		        var list = this.list_goods;
		        var list_table = [];
		        for (let i = 0; i < list.length; i++) {
		            list_table[i] = {};
		            this.vm_arr_goods.map((o) => {
		                // 第二个中括号是对象的属性
		                list_table[i][o] = list[i][o];
		            });
		        }
		        return list_table;
		    },

		    list_table_article() {
		        var list = this.list_article;
		        var list_table = [];
		        for (let i = 0; i < list.length; i++) {
		            list_table[i] = {};
		            this.vm_arr_article.map((o) => {
		                // 第二个中括号是对象的属性
		                list_table[i][o] = list[i][o];
		            });
		        }
		        return list_table;
		    },
		}
	};
</script>

<style scoped>
.page_root{
	position: relative;
}
.support_entry{
	position: fixed;
	top: 400px;
	right: 20px;
	width: 80px;
	height: 80px;
	cursor: pointer;
	z-index: 99999;
}
.support_module .container{
        /* height: 650px; */
        height: 70%;
        width: 700px;
        border-radius: 4px;
        border: 0.5px solid #e0e0e0;
        background-color: #f5f5f5;
        /* display: flex;
        flex-flow: column; */
        overflow: hidden;
				position: fixed;
				/* top: 100px; */
				padding: 0;
				margin-left: -350px;
				z-index: 99999999;
    }
	.support_module	.small_css{
		height: 40px;
		width: 200px;
		right: 0;
		bottom: 0px;
	}
	.support_module	.big_css{
				top: 60px;
				left: 50%;
				}
    .support_module .content{
        width: calc(100% - 0px);
        padding: 20px 30px;
        overflow-y: scroll;
				height: 70%;
    }
		.support_module .content::-webkit-scrollbar{
	display: none
}
.support_module_title{
	text-align: right;
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #ccc;

}
.support_module_title .title_btn{
	font-size: 20px;
	cursor: pointer;
	margin-right: 20px;
	color: #888;

}
    .support_module .content:hover::-webkit-scrollbar-thumb{
        background:rgba(0,0,0,0.1);
    }
    .support_module .bubble{
        max-width: 400px;
        padding: 10px;
        border-radius: 5px;
        position: relative;
        color: #000;
        word-wrap:break-word;
        word-break:normal;
    }
    .support_module .item_left .bubble{
        margin-left: 15px;
        background-color: #fff;
    }
    .support_module .item_left .bubble:before{
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-top: 10px solid transparent;
        border-right: 10px solid #fff;
        border-bottom: 10px solid transparent;
        left: -20px;
    }
    .support_module .item_right .bubble{
        margin-right: 15px;
        background-color: #9eea6a;
    }
    .support_module .item_right .bubble:before{
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-left: 10px solid #9eea6a;
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid transparent;
				left: none;

				        right: -20px;
    }
    .support_module .item{
        margin-top: 15px;
        display: flex;
        width: 100%;
    }
    .support_module .item.item_right{
        justify-content: flex-end;
				min-width: 400px;
    }
    .support_module .item.item-center{
        justify-content: center;
    }
    .support_module .item.item-center span{
        font-size: 12px;
        padding: 2px 4px;
        color: #fff;
        background-color: #dadada;
        border-radius: 3px;
        -moz-user-select:none; /*火狐*/
        -webkit-user-select:none; /*webkit浏览器*/
        -ms-user-select:none; /*IE10*/
        -khtml-user-select:none; /*早期浏览器*/
        user-select:none;
    }

    .support_module .avatar img{
        width: 42px;
        height: 42px;
        border-radius: 50%;
    }
    .support_module .input-area{
        border-top:0.5px solid #e0e0e0;
        height: 16%;

        background-color: #fff;
    }
    .support_module textarea{
        flex: 1;
        padding: 10px;
        font-size: 14px;
        border: none;
        overflow-y: auto;
        overflow-x: hidden;
        outline:none;
        resize:none;
				width: 102%;
				height: 100%;
				min-height: 100%;
				max-height: 100%;
    }
    .support_module .button-area{
      display: flex;
    height: 50px;
    line-height: 50px;
    padding: 5px;
    justify-content: flex-end;
    text-align: right;
    width: 100%;
		background: #fff;
    }
    .support_module .button-area button{
        width: 80px;
				height: 40px;
				line-height: 40px;
        border: none;
        outline: none;
        border-radius: 4px;
        float: right;
        cursor: pointer;
				background: #9eea6a;
				color: #333;
				margin: 0px;
    }

    /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
        width:10px;
    }
    /* 滚动槽 */
    ::-webkit-scrollbar-track {
        -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
        border-radius:8px;
    }
    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
        border-radius:10px;
        background:rgba(0,0,0,0);
        -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
    }

	.sw_no {
	    margin: 0.5rem;
	    display: flex;
	    flex-wrap: wrap;
	}

	.swiper_img {
	    width: 60%;
	    height: 18.75rem;
	}

	.card_notice {
	    width: 40%;
	    padding-left: 1rem;
	    height: 18.75rem;
	}

	.notice_title {
	    font-size: 1.2rem;
	    font-weight: bold;
	    color: white;
	    display: flex;
		justify-content: space-between;
	    align-items: center;
	    background-color: #d2d2d2;
	    height: 3rem;
	    padding: 0 1.5rem;
	}

	.article_recommend > * {
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}

	.article_recommend {
	    display: block;
	    margin: 1.5rem 0.5rem;
	    height: 4rem;
	    border-radius: 0.5rem;
	    background-color: var(--color_primary);
	}

	.diy_recommend > * {
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}

	.diy_recommend {
	    display: block;
	    margin: 1.5rem 0.5rem;
	    height: 4rem;
	    border-radius: 0.5rem;
	    background-color: var(--color_primary);
	}

	.title {
	    float: left;
	    height: 4rem;
	    color: white;
	    font-size: 1.5rem;
	    font-weight: bold;
	    padding-left: 1rem;
	}

	.more_box {
	    float: right;
	    height: 4rem;
	    color: white;
	    font-size: 1.5rem;
	    padding-right: 1rem;
	}

	.more_box .more {
	    border-radius: 0.5rem;
	    border: 0.125rem solid white;
	    display: flex;
	    align-items: center;
	    font-size: 1.2rem;
	    justify-content: center;
	    height: 3rem;
	    width: 3.5rem;
	}

	.switch {
	    float: right;
	    height: 4rem;
	    color: white;
	    padding-right: 1rem;
	}

	.switch_box {
	    border-radius: 0.5rem;
	    border: 0.125rem solid white;
	    display: flex;
	    align-items: center;
	    font-size: 1.2rem;
	    justify-content: center;
	    height: 3rem;
	    width: 6rem;
	}

	.switch_box:hover, .more:hover {
	    background-color: white;
	    color: var(--color_primary) !important;
	}

	.overflow-auto .table th,
	.overflow-auto .table td {
	    text-align: center;
	    text-wrap: normal;
	    font-size: 1rem;
	    vertical-align: middle;
	}

	/*.page_index {*/
	/*    margin: 0 auto;*/
	/*    max-width: 1200px;*/
	/*}*/

	/*.main {*/
	/*    display: flex;*/
	/*    justify-content: space-between;*/
	/*}*/

	/*.content {*/
	/*    flex: 0 0 79%;*/
	/*}*/

	/*.aside {*/
	/*    flex: 0 0 20%;*/
	/*}*/

	.card_ad {
	    margin-top: 1rem;
	}

	@media (max-width: 996px) {
	    .swiper_img {
	        width: 100%;
	        height: 12.5rem;
	    }

	    .card_notice {
	        width: 100%;
	        padding-left: 0;
	    }
	}
	.robotic{
		position: fixed;
		top: 166px;
		left: -4px;
		width: 50px;
		height: 50px;
		cursor: pointer;
		z-index: 99999;
	}

	.robot_box{
		top: 208px;
		left: 38px;
		position: fixed;
		z-index: 9999;
	}
</style>

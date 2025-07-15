<template>
	<div class="diy_list page_customized_products" id="customized_products_list">
		<div class="warp">
			<div class="container diy_list_container">
				<div class="diy_list_title">
					<div class="col">
						<span class="title">定制商品列表</span>
					</div>
				</div>
				<div class="leis_box"> 
				<div class="iudis_box">
			
				<div class="row diy_list_search">
					<div class="col">
						<!-- 搜索栏 -->
						<div class="view Search">
							<span class="diy_list_search_title">关键字搜索：</span>
																																												<b-form-input size="sm" class="mr-sm-2" placeholder="商品名称搜索" v-model="query['name_of_commodity']" />
																																														<b-form-input size="sm" class="mr-sm-2" placeholder="分类名称搜索" v-model="query['category_name']" />
																																																																								<div class="num_range">
											<b-form-input size="sm" placeholder="定制库存开始" v-model="query['custom_inventory_min']" />
											<span class="num_range_span">-</span>
											<b-form-input size="sm" placeholder="定制库存结束" v-model="query['custom_inventory_max']" />
										</div>
																																														<el-date-picker v-model="query['product_production_date']" type="daterange" range-separator="至" start-placeholder="产品生产日期开始" end-placeholder="产品生产日期结束"></el-date-picker>
																																																										<el-date-picker v-model="query['shelf_life_time']" type="datetimerange" range-separator="至" start-placeholder="保质时间开始" end-placeholder="保质时间结束"></el-date-picker>
																																																																																																																						<b-button size="sm" @click="search_customized_products()" >
														<b-icon icon="search"/>
													</b-button>
												</div>
						<!-- /搜索栏 -->
					</div>
				</div>
				<div class="diy_list_select_box">
					<span class="diy_list_select_title">下拉搜索：</span>
						<div class="diy_list_dropdown_box">
						<div class="col">
							<!-- 筛选 -->
							<div class="view sift">
																<b-dropdown text="分类名称" variant="outline-dark" left>
									<b-dropdown-item @click="filter_set('全部','category_name')">全部</b-dropdown-item>
										<b-dropdown-item v-for="(o, i) in list_category_name" :key="i" @click="filter_set(o['classification_name'],'category_name')" >
												{{ o['classification_name'] }}
										</b-dropdown-item>
								</b-dropdown>
																																<!-- 排序 -->
							
								<b-dropdown text="排序" variant="outline-dark" left>
										<b-dropdown-item v-for="(o, i) in list_sort" :key="i" @click="set_sort(o)" >
												{{ o.name }}
										</b-dropdown-item>
								</b-dropdown>
						
							<!--/排序 -->
							</div>
							<!-- /筛选 -->
						</div>
					</div>
				
				</div>
								<div class="map_btn">
					<el-button class="search_btn_map" @click="openMap()">查看地图</el-button>
				</div>
							</div>
				<div class="row diy_list_box">
					<div class="col">
						<!-- tab -->
															<b-tabs content-class="mt-3">
							<b-tab v-for="(o, i) in list_type_category_name" :title="o['category_name']" :active="i===0" @click="tab_select(o['category_name'])">
								<div class="row">
									<div class="col">
										<!-- tab -->
										<list_customized_products :list="type_list[o['category_name']]" />
										<!-- /tab -->
									</div>
								</div>
							</b-tab>
						</b-tabs>
																																													<!-- /tab -->
					</div>
				</div>
	</div>
	<!-- 大盒子结尾 -->
				<div class="row diy_list_page_box">
					<div class="col overflow-auto flex_cc">
						<!-- 分页器 -->
<!--						<diy_pager v-model="query['page']" :size="query['size']" :count="count" v-on:toPage="toPage" v-on:toSize="toSize" ></diy_pager>-->
            <b-pagination
                v-model="query.page"
                :total-rows="count"
                :per-page="query.size"
                @change="goToPage"
            />
						<!-- /分页器 -->
					</div>
				</div>
				<div>
					<div class="drawer-button">
						<el-button type="info" @click="drawer = true">
							数据对比
						</el-button>
					</div>
					<el-drawer
						title="数据对比"
						:visible.sync="drawer"
						size="20%"
						show-close
						>
						<vs_customized_products :productList="productList"  @update-product-list="getProductList"/>
					</el-drawer>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import list_customized_products from "@/components/diy/list_customized_products.vue";
	import diy_pager from "@/components/diy/diy_pager";
	import mixin from "@/mixins/page.js";
	import vs_customized_products from "@/components/diy/vs_customized_products.vue";

	export default {
		mixins: [mixin],
		components: {
			diy_pager,
			list_customized_products,
			vs_customized_products,
		},
		data() {
			return {
				url_get_list: "~/api/customized_products/get_list?like=0",

				// 查询条件
				query: {
					keyword: "",
					page: 1,
					size: 12,
									"name_of_commodity": "", // 商品名称
											"category_name": "", // 分类名称
													"custom_inventory_min": '', // 定制库存
					"custom_inventory_max": '', // 定制库存
											"product_production_date": "", // 产品生产日期
												"shelf_life_time": "", // 保质时间
														"examine_state": "已通过", // 审核状态
				},
				drawer: false,
				productList: [],
				showProductVs: true,
				// 排序内容
				list_sort: [{
						name: "创建时间从高到低",
						value: "create_time desc",
					},
					{
						name: "创建时间从低到高",
						value: "create_time asc",
					},
					{
						name: "更新时间从高到低",
						value: "update_time desc",
					},
					{
						name: "更新时间从低到高",
						value: "update_time asc",
					},
																			],

									// 分类名称列表
				"list_category_name": [""],
																										
													"list_type_category_name": [],
				"type_list":{},
																																										}
		},
		methods: {
      get_list_before(param) {
        var oNowDate = this.dateFormat("yyyy-MM-dd hh:mm:ss")+"";
        var url_get_list = "~/api/customized_products/get_list?timing_start_time_max=" + oNowDate +
            "&timing_end_time_min=" + oNowDate + "&like=0";
        this.url_get_list= url_get_list;
      },
			/**
			 * 筛选选择
			 */
			filter_set(o,key) {
			    if (o == "全部") {
			        this.query[key] = "";
			    } else {
			        this.query[key] = o;
			    }
			    this.search();
			},

			/**
			 * 排序
			 */
			set_sort(o) {
			    this.query.orderby = o.value;
			    this.search();
			},
												async get_list_type_category_name() {
				var json = await this.$get("~/api/customized_products/get_list?groupby=category_name"
										,{"examine_state": "已通过"}
				);
				if (json.result) {
					this.list_type_category_name = json.result.list;
					for (let i = 0;i<this.list_type_category_name.length;i++){
						this.get_category_name_type_list(this.list_type_category_name[i].category_name);
					}
					this.query.category_name = this.list_type_category_name[0].category_name;
					this.get_list();
				} else if (json.error) {
					console.log(json.error);
				}
			},

			get_category_name_type_list(type){
				let _this = this;
				this.$get("~/api/customized_products/get_list?", {"category_name":type
									,"examine_state": "已通过"
								}, (json) => {
					if (json.result) {
						_this.$set(_this.type_list,type, json.result.list);
					}
				});
			},
			tab_select(v){
				this.query.category_name = v;
				this.get_list();
			},
			search_customized_products(){
				let _this = this;
				this.$get("~/api/customized_products/get_list?like=0", _this.query, (json) => {
					if (json.result) {
						_this.$set(_this.type_list,_this.query.category_name, json.result.list);
						_this.get_list();
					}
				});
			},
																																													/**
			 * 获取分类名称列表
			 */
			async get_list_category_name() {
				var json = await this.$get("~/api/classification_information/get_list?");
				if (json.result) {
					this.list_category_name = json.result.list;
				} else if (json.error) {
					console.log(json.error);
				}
			},
																/**
			 * 筛选
			 */
													filter_category_name(o) {
				if (o == "全部") {
					this.query["category_name"] = "";
				} else {
					this.query["category_name"] = o;
				}
				this.search();
			},
																																			/**
			 * 重置
			 */
			reset() {
								this.query.name_of_commodity = ""
										this.query.category_name = ""
												this.query.custom_inventory = 0
										this.query.product_production_date = ""
											this.query.shelf_life_time = ""
													this.search();
			},

			// 返回条数
			toSize(i){
				this.query.size = i;
				this.first();
			},

			// 返回页数
			toPage(i){
				this.query.page = i;
				this.first();
			},

      goToPage(v){
        this.query.page = v;
        this.goToNew(v)
      },

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
			openMap(){
				this.$router.push("/customized_products/map")
			},
			getProductList(list){
				this.productList = [...list];
			},
		},
		computed: {
		},
		created() {
								/**
			 * 获取分类名称列表
			 */
			this.get_list_category_name();
																																						this.get_list_type_category_name();
																																									}
	}
</script>

<style>
.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner,.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
	width: 100%;
}
.el-date-editor .el-range-separator{
	width: 11% !important;
}
.num_range {
  display: flex;
  align-items: center;
}

.num_range_span {
  font-size: 28px;
}
.diy_list{
	position: relative;/* 设置相对定位 */
}
.drawer-button {
	z-index: 999;
	position: fixed; /* 使用固定定位 */
	/* 设置绝对定位 */
	top: 240px;
	/* 距离顶部的距离 */
	right: 10px;
	writing-mode: vertical-rl;
  text-orientation: upright;
}
button > i {
  font-size: 18px !important;
}
.checkbox-container .el-checkbox__label{
	padding-left: 0;
}
</style>

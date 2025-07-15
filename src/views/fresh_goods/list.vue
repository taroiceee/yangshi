<template>
	<div class="diy_list page_fresh_goods" id="fresh_goods_list">
		<div class="warp">
			<div class="container diy_list_container">
				<div class="diy_list_title">
					<div class="col">
						<span class="title">生鲜商品列表</span>
					</div>
				</div>
				<div class="leis_box"> 
				<div class="iudis_box">
			
				<div class="row diy_list_search">
					<div class="col">
						<!-- 搜索栏 -->
						<div class="view Search">
							<span class="diy_list_search_title">关键字搜索：</span>
																															<b-form-input size="sm" class="mr-sm-2" placeholder="商品编号搜索" v-model="query['commodity_number']" />
																																																																								<b-form-input size="sm" class="mr-sm-2" placeholder="店铺地址搜索" v-model="query['store_address']" />
																																														<b-form-input size="sm" class="mr-sm-2" placeholder="店铺名称搜索" v-model="query['shop_name']" />
																																		<b-button size="sm" @click="search()" >
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
							</div>
				<div class="row diy_list_box">
					<div class="col">
						<!-- 列表 -->
												<list_fresh_goods :list="list" :goods="productList" :vs="showProductVs" @update-product-list="getProductList" />
												<!-- /列表 -->
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
						<vs_fresh_goods :productList="productList"  @update-product-list="getProductList"/>
					</el-drawer>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import list_fresh_goods from "@/components/diy/list_fresh_goods.vue";
	import diy_pager from "@/components/diy/diy_pager";
	import mixin from "@/mixins/page.js";
	import vs_fresh_goods from "@/components/diy/vs_fresh_goods.vue";

	export default {
		mixins: [mixin],
		components: {
			diy_pager,
			list_fresh_goods,
			vs_fresh_goods,
		},
		data() {
			return {
				url_get_list: "~/api/fresh_goods/get_list?like=0",

				// 查询条件
				query: {
					keyword: "",
					page: 1,
					size: 12,
								"commodity_number": "", // 商品编号
													"store_address": "", // 店铺地址
											"shop_name": "", // 店铺名称
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

										
			}
		},
		methods: {
      get_list_before(param) {
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
								/**
			 * 筛选
			 */
																							/**
			 * 重置
			 */
			reset() {
							this.query.commodity_number = ""
												this.query.store_address = ""
										this.query.shop_name = ""
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

			getProductList(list){
				this.productList = [...list];
			},
		},
		computed: {
		},
		created() {
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

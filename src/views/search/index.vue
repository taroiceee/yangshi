<template>
  <div class="page_search search_index">
	<div class="warp">
	  <div class="container">
		<div class="row">
		  <div class="col-12">
			<div class="card_result_search">
			  <div class="title">搜索结果</div>
				<!-- 商品搜索结果 -->
			  <list_result_search
				:list="result_goods"
				title="水果商城"
				source_table="goods"
			  ></list_result_search>

				<!-- 文章搜索结果 -->
			  <list_result_search
				:list="result_article"
				title="商城资讯"
				source_table="article"
			  ></list_result_search>

				<!-- 论坛搜索结果 -->
			  <list_result_search
				:list="result_forum"
				title="交流论坛"
				source_table="forum"
			  ></list_result_search>

						  <list_result_search
				v-if="$check_action('/registered_user/list', 'get')"
				:list="result_registered_user_user_membership_card_number"
				title="注册用户用户会员卡号"
				source_table="registered_user"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/registered_user/list', 'get')"
				:list="result_registered_user_real_name"
				title="注册用户真实姓名"
				source_table="registered_user"
			  ></list_result_search>
																							  <list_result_search
				v-if="$check_action('/registered_user/list', 'get')"
				:list="result_registered_user_user_label"
				title="注册用户用户标签"
				source_table="registered_user"
			  ></list_result_search>
																											  <list_result_search
				v-if="$check_action('/business_user/list', 'get')"
				:list="result_business_user_person_in_charge"
				title="商家用户负责人"
				source_table="business_user"
			  ></list_result_search>
														  <list_result_search
				v-if="$check_action('/business_user/list', 'get')"
				:list="result_business_user_shop_phone"
				title="商家用户店铺电话"
				source_table="business_user"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/business_user/list', 'get')"
				:list="result_business_user_store_address"
				title="商家用户店铺地址"
				source_table="business_user"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/business_user/list', 'get')"
				:list="result_business_user_registered_capital"
				title="商家用户注册资金"
				source_table="business_user"
			  ></list_result_search>
												  <list_result_search
				v-if="$check_action('/fresh_goods/list', 'get')"
				:list="result_fresh_goods_commodity_number"
				title="生鲜商品商品编号"
				source_table="fresh_goods"
			  ></list_result_search>
														  <list_result_search
				v-if="$check_action('/fresh_goods/list', 'get')"
				:list="result_fresh_goods_store_address"
				title="生鲜商品店铺地址"
				source_table="fresh_goods"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/fresh_goods/list', 'get')"
				:list="result_fresh_goods_shop_name"
				title="生鲜商品店铺名称"
				source_table="fresh_goods"
			  ></list_result_search>
									  <list_result_search
				v-if="$check_action('/classification_information/list', 'get')"
				:list="result_classification_information_classification_name"
				title="分类信息分类名称"
				source_table="classification_information"
			  ></list_result_search>
																		  <list_result_search
				v-if="$check_action('/customized_products/list', 'get')"
				:list="result_customized_products_name_of_commodity"
				title="定制商品商品名称"
				source_table="customized_products"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/customized_products/list', 'get')"
				:list="result_customized_products_category_name"
				title="定制商品分类名称"
				source_table="customized_products"
			  ></list_result_search>
														  <list_result_search
				v-if="$check_action('/customized_products/list', 'get')"
				:list="result_customized_products_custom_inventory"
				title="定制商品定制库存"
				source_table="customized_products"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/customized_products/list', 'get')"
				:list="result_customized_products_product_production_date"
				title="定制商品产品生产日期"
				source_table="customized_products"
			  ></list_result_search>
											  <list_result_search
				v-if="$check_action('/customized_products/list', 'get')"
				:list="result_customized_products_shelf_life_time"
				title="定制商品保质时间"
				source_table="customized_products"
			  ></list_result_search>
																											  <list_result_search
				v-if="$check_action('/i_want_to_customize_it/list', 'get')"
				:list="result_i_want_to_customize_it_order_number"
				title="我要定制订单号"
				source_table="i_want_to_customize_it"
			  ></list_result_search>
											  <list_result_search
				v-if="$check_action('/i_want_to_customize_it/list', 'get')"
				:list="result_i_want_to_customize_it_name_of_commodity"
				title="我要定制商品名称"
				source_table="i_want_to_customize_it"
			  ></list_result_search>
														  <list_result_search
				v-if="$check_action('/i_want_to_customize_it/list', 'get')"
				:list="result_i_want_to_customize_it_production_date"
				title="我要定制生产日期"
				source_table="i_want_to_customize_it"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/i_want_to_customize_it/list', 'get')"
				:list="result_i_want_to_customize_it_shelf_life_time"
				title="我要定制保质时间"
				source_table="i_want_to_customize_it"
			  ></list_result_search>
																										  <list_result_search
				v-if="$check_action('/i_want_to_customize_it/list', 'get')"
				:list="result_i_want_to_customize_it_user_name"
				title="我要定制用户姓名"
				source_table="i_want_to_customize_it"
			  ></list_result_search>
																											  <list_result_search
				v-if="$check_action('/evaluation_feedback/list', 'get')"
				:list="result_evaluation_feedback_order_number"
				title="评价反馈订单号"
				source_table="evaluation_feedback"
			  ></list_result_search>
																										  <list_result_search
				v-if="$check_action('/evaluation_feedback/list', 'get')"
				:list="result_evaluation_feedback_evaluation_time"
				title="评价反馈评价时间"
				source_table="evaluation_feedback"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/evaluation_feedback/list', 'get')"
				:list="result_evaluation_feedback_evaluation_grade"
				title="评价反馈评价等级"
				source_table="evaluation_feedback"
			  ></list_result_search>
																	  <list_result_search
				v-if="$check_action('/evaluation_feedback/list', 'get')"
				:list="result_evaluation_feedback_appearance_appearance_rating"
				title="评价反馈外貌外观评分"
				source_table="evaluation_feedback"
			  ></list_result_search>
												  <list_result_search
				v-if="$check_action('/film_and_television_novels/list', 'get')"
				:list="result_film_and_television_novels_album_name"
				title="影视小说专辑名称"
				source_table="film_and_television_novels"
			  ></list_result_search>
											  <list_result_search
				v-if="$check_action('/film_and_television_novels/list', 'get')"
				:list="result_film_and_television_novels_authors_name"
				title="影视小说作者姓名"
				source_table="film_and_television_novels"
			  ></list_result_search>
												  <list_result_search
				v-if="$check_action('/offline_activities/list', 'get')"
				:list="result_offline_activities_activity_name"
				title="线下活动活动名称"
				source_table="offline_activities"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/offline_activities/list', 'get')"
				:list="result_offline_activities_activity_type"
				title="线下活动活动类型"
				source_table="offline_activities"
			  ></list_result_search>
											  <list_result_search
				v-if="$check_action('/offline_activities/list', 'get')"
				:list="result_offline_activities_activity_date"
				title="线下活动活动日期"
				source_table="offline_activities"
			  ></list_result_search>
												  <list_result_search
				v-if="$check_action('/schedule_of_sessions/list', 'get')"
				:list="result_schedule_of_sessions_name_of_session"
				title="场次安排场次名称"
				source_table="schedule_of_sessions"
			  ></list_result_search>
																		  <list_result_search
				v-if="$check_action('/seating_arrangements/list', 'get')"
				:list="result_seating_arrangements_name_of_session"
				title="座位安排场次名称"
				source_table="seating_arrangements"
			  ></list_result_search>
																		  <list_result_search
				v-if="$check_action('/feedback_on_opinions/list', 'get')"
				:list="result_feedback_on_opinions_title_name"
				title="意见反馈标题名"
				source_table="feedback_on_opinions"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/feedback_on_opinions/list', 'get')"
				:list="result_feedback_on_opinions_type_of_feedback_information"
				title="意见反馈反馈信息类型"
				source_table="feedback_on_opinions"
			  ></list_result_search>
																																				</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>
import mixin from "../../mixins/page.js";
import list_result_search from "../../components/diy/list_result_search.vue";

export default {
  mixins: [mixin],
  data() {
	return {
	  "query": {
		word: "",
	  },
	  "result_goods": [],
	  "result_article": [],
	  "result_forum": [],
						"result_registered_user_user_membership_card_number":[],
								"result_registered_user_real_name":[],
																							"result_registered_user_user_label":[],
																											"result_business_user_person_in_charge":[],
														"result_business_user_shop_phone":[],
								"result_business_user_store_address":[],
								"result_business_user_registered_capital":[],
												"result_fresh_goods_commodity_number":[],
														"result_fresh_goods_store_address":[],
								"result_fresh_goods_shop_name":[],
									"result_classification_information_classification_name":[],
																		"result_customized_products_name_of_commodity":[],
								"result_customized_products_category_name":[],
														"result_customized_products_custom_inventory":[],
								"result_customized_products_product_production_date":[],
											"result_customized_products_shelf_life_time":[],
																											"result_i_want_to_customize_it_order_number":[],
											"result_i_want_to_customize_it_name_of_commodity":[],
														"result_i_want_to_customize_it_production_date":[],
								"result_i_want_to_customize_it_shelf_life_time":[],
																										"result_i_want_to_customize_it_user_name":[],
																											"result_evaluation_feedback_order_number":[],
																										"result_evaluation_feedback_evaluation_time":[],
								"result_evaluation_feedback_evaluation_grade":[],
																	"result_evaluation_feedback_appearance_appearance_rating":[],
												"result_film_and_television_novels_album_name":[],
											"result_film_and_television_novels_authors_name":[],
												"result_offline_activities_activity_name":[],
								"result_offline_activities_activity_type":[],
											"result_offline_activities_activity_date":[],
												"result_schedule_of_sessions_name_of_session":[],
																		"result_seating_arrangements_name_of_session":[],
																		"result_feedback_on_opinions_title_name":[],
								"result_feedback_on_opinions_type_of_feedback_information":[],
																																		};
  },
  methods: {
	/**
	 * 获取${fmodel.filter.cart_name}
	 */
	get_goods() {
	  this.$get("~/api/goods/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_goods = json.result.list;
		}
	  });
	},
	/**
	 * 获取文章
	 */
	get_article() {
	  this.$get("~/api/article/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_article = json.result.list;
		}
	  });
	},
	/**
	 * 获取交流论坛
	 */
	get_forum() {
	  this.$get("~/api/forum/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_forum = json.result.list;
		}
	  });
	},

				/**
	 * 获取user_membership_card_number
	 */
	get_registered_user_user_membership_card_number(){
		let url = "~/api/registered_user/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "user_membership_card_number": this.query.word }, (json) => {
		  if (json.result) {
			var result_registered_user_user_membership_card_number = json.result.list;
			result_registered_user_user_membership_card_number.map(o => o.title = o['user_membership_card_number'])
	  			this.result_registered_user_user_membership_card_number = result_registered_user_user_membership_card_number
		 	}
		});
	},
						/**
	 * 获取real_name
	 */
	get_registered_user_real_name(){
		let url = "~/api/registered_user/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "real_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_registered_user_real_name = json.result.list;
			result_registered_user_real_name.map(o => o.title = o['real_name'])
	  			this.result_registered_user_real_name = result_registered_user_real_name
		 	}
		});
	},
																					/**
	 * 获取user_label
	 */
	get_registered_user_user_label(){
		let url = "~/api/registered_user/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "user_label": this.query.word }, (json) => {
		  if (json.result) {
			var result_registered_user_user_label = json.result.list;
			result_registered_user_user_label.map(o => o.title = o['user_label'])
	  			this.result_registered_user_user_label = result_registered_user_user_label
		 	}
		});
	},
																									/**
	 * 获取person_in_charge
	 */
	get_business_user_person_in_charge(){
		let url = "~/api/business_user/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "person_in_charge": this.query.word }, (json) => {
		  if (json.result) {
			var result_business_user_person_in_charge = json.result.list;
			result_business_user_person_in_charge.map(o => o.title = o['person_in_charge'])
	  			this.result_business_user_person_in_charge = result_business_user_person_in_charge
		 	}
		});
	},
												/**
	 * 获取shop_phone
	 */
	get_business_user_shop_phone(){
		let url = "~/api/business_user/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "shop_phone": this.query.word }, (json) => {
		  if (json.result) {
			var result_business_user_shop_phone = json.result.list;
			result_business_user_shop_phone.map(o => o.title = o['shop_phone'])
	  			this.result_business_user_shop_phone = result_business_user_shop_phone
		 	}
		});
	},
						/**
	 * 获取store_address
	 */
	get_business_user_store_address(){
		let url = "~/api/business_user/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "store_address": this.query.word }, (json) => {
		  if (json.result) {
			var result_business_user_store_address = json.result.list;
			result_business_user_store_address.map(o => o.title = o['store_address'])
	  			this.result_business_user_store_address = result_business_user_store_address
		 	}
		});
	},
						/**
	 * 获取registered_capital
	 */
	get_business_user_registered_capital(){
		let url = "~/api/business_user/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "registered_capital": this.query.word }, (json) => {
		  if (json.result) {
			var result_business_user_registered_capital = json.result.list;
			result_business_user_registered_capital.map(o => o.title = o['registered_capital'])
	  			this.result_business_user_registered_capital = result_business_user_registered_capital
		 	}
		});
	},
										/**
	 * 获取commodity_number
	 */
	get_fresh_goods_commodity_number(){
		let url = "~/api/fresh_goods/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "commodity_number": this.query.word }, (json) => {
		  if (json.result) {
			var result_fresh_goods_commodity_number = json.result.list;
			result_fresh_goods_commodity_number.map(o => o.title = o['commodity_number'])
	  			this.result_fresh_goods_commodity_number = result_fresh_goods_commodity_number
		 	}
		});
	},
												/**
	 * 获取store_address
	 */
	get_fresh_goods_store_address(){
		let url = "~/api/fresh_goods/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "store_address": this.query.word }, (json) => {
		  if (json.result) {
			var result_fresh_goods_store_address = json.result.list;
			result_fresh_goods_store_address.map(o => o.title = o['store_address'])
	  			this.result_fresh_goods_store_address = result_fresh_goods_store_address
		 	}
		});
	},
						/**
	 * 获取shop_name
	 */
	get_fresh_goods_shop_name(){
		let url = "~/api/fresh_goods/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "shop_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_fresh_goods_shop_name = json.result.list;
			result_fresh_goods_shop_name.map(o => o.title = o['shop_name'])
	  			this.result_fresh_goods_shop_name = result_fresh_goods_shop_name
		 	}
		});
	},
							/**
	 * 获取classification_name
	 */
	get_classification_information_classification_name(){
		let url = "~/api/classification_information/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "classification_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_classification_information_classification_name = json.result.list;
			result_classification_information_classification_name.map(o => o.title = o['classification_name'])
	  			this.result_classification_information_classification_name = result_classification_information_classification_name
		 	}
		});
	},
																/**
	 * 获取name_of_commodity
	 */
	get_customized_products_name_of_commodity(){
		let url = "~/api/customized_products/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "name_of_commodity": this.query.word }, (json) => {
		  if (json.result) {
			var result_customized_products_name_of_commodity = json.result.list;
			result_customized_products_name_of_commodity.map(o => o.title = o['name_of_commodity'])
	  			this.result_customized_products_name_of_commodity = result_customized_products_name_of_commodity
		 	}
		});
	},
						/**
	 * 获取category_name
	 */
	get_customized_products_category_name(){
		let url = "~/api/customized_products/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "category_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_customized_products_category_name = json.result.list;
			result_customized_products_category_name.map(o => o.title = o['category_name'])
	  			this.result_customized_products_category_name = result_customized_products_category_name
		 	}
		});
	},
												/**
	 * 获取custom_inventory
	 */
	get_customized_products_custom_inventory(){
		let url = "~/api/customized_products/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "custom_inventory": this.query.word }, (json) => {
		  if (json.result) {
			var result_customized_products_custom_inventory = json.result.list;
			result_customized_products_custom_inventory.map(o => o.title = o['custom_inventory'])
	  			this.result_customized_products_custom_inventory = result_customized_products_custom_inventory
		 	}
		});
	},
						/**
	 * 获取product_production_date
	 */
	get_customized_products_product_production_date(){
		let url = "~/api/customized_products/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "product_production_date": this.query.word }, (json) => {
		  if (json.result) {
			var result_customized_products_product_production_date = json.result.list;
			result_customized_products_product_production_date.map(o => o.title = o['product_production_date'])
	  			this.result_customized_products_product_production_date = result_customized_products_product_production_date
		 	}
		});
	},
									/**
	 * 获取shelf_life_time
	 */
	get_customized_products_shelf_life_time(){
		let url = "~/api/customized_products/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "shelf_life_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_customized_products_shelf_life_time = json.result.list;
			result_customized_products_shelf_life_time.map(o => o.title = o['shelf_life_time'])
	  			this.result_customized_products_shelf_life_time = result_customized_products_shelf_life_time
		 	}
		});
	},
																									/**
	 * 获取order_number
	 */
	get_i_want_to_customize_it_order_number(){
		let url = "~/api/i_want_to_customize_it/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "order_number": this.query.word }, (json) => {
		  if (json.result) {
			var result_i_want_to_customize_it_order_number = json.result.list;
			result_i_want_to_customize_it_order_number.map(o => o.title = o['order_number'])
	  			this.result_i_want_to_customize_it_order_number = result_i_want_to_customize_it_order_number
		 	}
		});
	},
									/**
	 * 获取name_of_commodity
	 */
	get_i_want_to_customize_it_name_of_commodity(){
		let url = "~/api/i_want_to_customize_it/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "name_of_commodity": this.query.word }, (json) => {
		  if (json.result) {
			var result_i_want_to_customize_it_name_of_commodity = json.result.list;
			result_i_want_to_customize_it_name_of_commodity.map(o => o.title = o['name_of_commodity'])
	  			this.result_i_want_to_customize_it_name_of_commodity = result_i_want_to_customize_it_name_of_commodity
		 	}
		});
	},
												/**
	 * 获取production_date
	 */
	get_i_want_to_customize_it_production_date(){
		let url = "~/api/i_want_to_customize_it/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "production_date": this.query.word }, (json) => {
		  if (json.result) {
			var result_i_want_to_customize_it_production_date = json.result.list;
			result_i_want_to_customize_it_production_date.map(o => o.title = o['production_date'])
	  			this.result_i_want_to_customize_it_production_date = result_i_want_to_customize_it_production_date
		 	}
		});
	},
						/**
	 * 获取shelf_life_time
	 */
	get_i_want_to_customize_it_shelf_life_time(){
		let url = "~/api/i_want_to_customize_it/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "shelf_life_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_i_want_to_customize_it_shelf_life_time = json.result.list;
			result_i_want_to_customize_it_shelf_life_time.map(o => o.title = o['shelf_life_time'])
	  			this.result_i_want_to_customize_it_shelf_life_time = result_i_want_to_customize_it_shelf_life_time
		 	}
		});
	},
																								/**
	 * 获取user_name
	 */
	get_i_want_to_customize_it_user_name(){
		let url = "~/api/i_want_to_customize_it/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "user_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_i_want_to_customize_it_user_name = json.result.list;
			result_i_want_to_customize_it_user_name.map(o => o.title = o['user_name'])
	  			this.result_i_want_to_customize_it_user_name = result_i_want_to_customize_it_user_name
		 	}
		});
	},
																									/**
	 * 获取order_number
	 */
	get_evaluation_feedback_order_number(){
		let url = "~/api/evaluation_feedback/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "order_number": this.query.word }, (json) => {
		  if (json.result) {
			var result_evaluation_feedback_order_number = json.result.list;
			result_evaluation_feedback_order_number.map(o => o.title = o['order_number'])
	  			this.result_evaluation_feedback_order_number = result_evaluation_feedback_order_number
		 	}
		});
	},
																								/**
	 * 获取evaluation_time
	 */
	get_evaluation_feedback_evaluation_time(){
		let url = "~/api/evaluation_feedback/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "evaluation_time": this.query.word }, (json) => {
		  if (json.result) {
			var result_evaluation_feedback_evaluation_time = json.result.list;
			result_evaluation_feedback_evaluation_time.map(o => o.title = o['evaluation_time'])
	  			this.result_evaluation_feedback_evaluation_time = result_evaluation_feedback_evaluation_time
		 	}
		});
	},
						/**
	 * 获取evaluation_grade
	 */
	get_evaluation_feedback_evaluation_grade(){
		let url = "~/api/evaluation_feedback/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "evaluation_grade": this.query.word }, (json) => {
		  if (json.result) {
			var result_evaluation_feedback_evaluation_grade = json.result.list;
			result_evaluation_feedback_evaluation_grade.map(o => o.title = o['evaluation_grade'])
	  			this.result_evaluation_feedback_evaluation_grade = result_evaluation_feedback_evaluation_grade
		 	}
		});
	},
															/**
	 * 获取appearance_appearance_rating
	 */
	get_evaluation_feedback_appearance_appearance_rating(){
		let url = "~/api/evaluation_feedback/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "appearance_appearance_rating": this.query.word }, (json) => {
		  if (json.result) {
			var result_evaluation_feedback_appearance_appearance_rating = json.result.list;
			result_evaluation_feedback_appearance_appearance_rating.map(o => o.title = o['appearance_appearance_rating'])
	  			this.result_evaluation_feedback_appearance_appearance_rating = result_evaluation_feedback_appearance_appearance_rating
		 	}
		});
	},
										/**
	 * 获取album_name
	 */
	get_film_and_television_novels_album_name(){
		let url = "~/api/film_and_television_novels/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "album_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_film_and_television_novels_album_name = json.result.list;
			result_film_and_television_novels_album_name.map(o => o.title = o['album_name'])
	  			this.result_film_and_television_novels_album_name = result_film_and_television_novels_album_name
		 	}
		});
	},
									/**
	 * 获取authors_name
	 */
	get_film_and_television_novels_authors_name(){
		let url = "~/api/film_and_television_novels/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "authors_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_film_and_television_novels_authors_name = json.result.list;
			result_film_and_television_novels_authors_name.map(o => o.title = o['authors_name'])
	  			this.result_film_and_television_novels_authors_name = result_film_and_television_novels_authors_name
		 	}
		});
	},
										/**
	 * 获取activity_name
	 */
	get_offline_activities_activity_name(){
		let url = "~/api/offline_activities/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "activity_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_offline_activities_activity_name = json.result.list;
			result_offline_activities_activity_name.map(o => o.title = o['activity_name'])
	  			this.result_offline_activities_activity_name = result_offline_activities_activity_name
		 	}
		});
	},
						/**
	 * 获取activity_type
	 */
	get_offline_activities_activity_type(){
		let url = "~/api/offline_activities/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "activity_type": this.query.word }, (json) => {
		  if (json.result) {
			var result_offline_activities_activity_type = json.result.list;
			result_offline_activities_activity_type.map(o => o.title = o['activity_type'])
	  			this.result_offline_activities_activity_type = result_offline_activities_activity_type
		 	}
		});
	},
									/**
	 * 获取activity_date
	 */
	get_offline_activities_activity_date(){
		let url = "~/api/offline_activities/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "activity_date": this.query.word }, (json) => {
		  if (json.result) {
			var result_offline_activities_activity_date = json.result.list;
			result_offline_activities_activity_date.map(o => o.title = o['activity_date'])
	  			this.result_offline_activities_activity_date = result_offline_activities_activity_date
		 	}
		});
	},
										/**
	 * 获取name_of_session
	 */
	get_schedule_of_sessions_name_of_session(){
		let url = "~/api/schedule_of_sessions/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "name_of_session": this.query.word }, (json) => {
		  if (json.result) {
			var result_schedule_of_sessions_name_of_session = json.result.list;
			result_schedule_of_sessions_name_of_session.map(o => o.title = o['name_of_session'])
	  			this.result_schedule_of_sessions_name_of_session = result_schedule_of_sessions_name_of_session
		 	}
		});
	},
																/**
	 * 获取name_of_session
	 */
	get_seating_arrangements_name_of_session(){
		let url = "~/api/seating_arrangements/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "name_of_session": this.query.word }, (json) => {
		  if (json.result) {
			var result_seating_arrangements_name_of_session = json.result.list;
			result_seating_arrangements_name_of_session.map(o => o.title = o['name_of_session'])
	  			this.result_seating_arrangements_name_of_session = result_seating_arrangements_name_of_session
		 	}
		});
	},
																/**
	 * 获取title_name
	 */
	get_feedback_on_opinions_title_name(){
		let url = "~/api/feedback_on_opinions/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "title_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_feedback_on_opinions_title_name = json.result.list;
			result_feedback_on_opinions_title_name.map(o => o.title = o['title_name'])
	  			this.result_feedback_on_opinions_title_name = result_feedback_on_opinions_title_name
		 	}
		});
	},
						/**
	 * 获取type_of_feedback_information
	 */
	get_feedback_on_opinions_type_of_feedback_information(){
		let url = "~/api/feedback_on_opinions/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "type_of_feedback_information": this.query.word }, (json) => {
		  if (json.result) {
			var result_feedback_on_opinions_type_of_feedback_information = json.result.list;
			result_feedback_on_opinions_type_of_feedback_information.map(o => o.title = o['type_of_feedback_information'])
	  			this.result_feedback_on_opinions_type_of_feedback_information = result_feedback_on_opinions_type_of_feedback_information
		 	}
		});
	},
																																	
  },
  components: { list_result_search },
	created(){
    this.query.word = this.$route.query.word || "";
  },
  mounted() {
	this.get_goods();
	this.get_article();
	this.get_forum();
					this.get_registered_user_user_membership_card_number();
							this.get_registered_user_real_name();
																						this.get_registered_user_user_label();
																										this.get_business_user_person_in_charge();
													this.get_business_user_shop_phone();
							this.get_business_user_store_address();
							this.get_business_user_registered_capital();
											this.get_fresh_goods_commodity_number();
													this.get_fresh_goods_store_address();
							this.get_fresh_goods_shop_name();
								this.get_classification_information_classification_name();
																	this.get_customized_products_name_of_commodity();
							this.get_customized_products_category_name();
													this.get_customized_products_custom_inventory();
							this.get_customized_products_product_production_date();
										this.get_customized_products_shelf_life_time();
																										this.get_i_want_to_customize_it_order_number();
										this.get_i_want_to_customize_it_name_of_commodity();
													this.get_i_want_to_customize_it_production_date();
							this.get_i_want_to_customize_it_shelf_life_time();
																									this.get_i_want_to_customize_it_user_name();
																										this.get_evaluation_feedback_order_number();
																									this.get_evaluation_feedback_evaluation_time();
							this.get_evaluation_feedback_evaluation_grade();
																this.get_evaluation_feedback_appearance_appearance_rating();
											this.get_film_and_television_novels_album_name();
										this.get_film_and_television_novels_authors_name();
											this.get_offline_activities_activity_name();
							this.get_offline_activities_activity_type();
										this.get_offline_activities_activity_date();
											this.get_schedule_of_sessions_name_of_session();
																	this.get_seating_arrangements_name_of_session();
																	this.get_feedback_on_opinions_title_name();
							this.get_feedback_on_opinions_type_of_feedback_information();
																																	  },
  watch: {
	$route() {
	  $.push(this.query, this.$route.query);
	  this.get_goods();
	  this.get_article();
	  this.get_forum();
				  this.get_registered_user_user_membership_card_number();
						  this.get_registered_user_real_name();
																					  this.get_registered_user_user_label();
																									  this.get_business_user_person_in_charge();
												  this.get_business_user_shop_phone();
						  this.get_business_user_store_address();
						  this.get_business_user_registered_capital();
										  this.get_fresh_goods_commodity_number();
												  this.get_fresh_goods_store_address();
						  this.get_fresh_goods_shop_name();
							  this.get_classification_information_classification_name();
																  this.get_customized_products_name_of_commodity();
						  this.get_customized_products_category_name();
												  this.get_customized_products_custom_inventory();
						  this.get_customized_products_product_production_date();
									  this.get_customized_products_shelf_life_time();
																									  this.get_i_want_to_customize_it_order_number();
									  this.get_i_want_to_customize_it_name_of_commodity();
												  this.get_i_want_to_customize_it_production_date();
						  this.get_i_want_to_customize_it_shelf_life_time();
																								  this.get_i_want_to_customize_it_user_name();
																									  this.get_evaluation_feedback_order_number();
																								  this.get_evaluation_feedback_evaluation_time();
						  this.get_evaluation_feedback_evaluation_grade();
															  this.get_evaluation_feedback_appearance_appearance_rating();
										  this.get_film_and_television_novels_album_name();
									  this.get_film_and_television_novels_authors_name();
										  this.get_offline_activities_activity_name();
						  this.get_offline_activities_activity_type();
									  this.get_offline_activities_activity_date();
										  this.get_schedule_of_sessions_name_of_session();
																  this.get_seating_arrangements_name_of_session();
																  this.get_feedback_on_opinions_title_name();
						  this.get_feedback_on_opinions_type_of_feedback_information();
																																		},
  },
};
</script>

<style scoped>
.card_search {
  text-align: center;
}
.card_result_search>.title {
  text-align: center;
  padding: 10px 0;
}
</style>

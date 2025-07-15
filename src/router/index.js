import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index.vue'
import login from '../views/account/login.vue';
import otherLogin from '../views/account/otherLogin.vue';
Vue.use(VueRouter)

const routes = [
	// 主页
	{
		path: '/',
		name: 'index',
		component: index
	},
	// 登录
	{
		path: '/account/login',
		name: 'login',
		component: login
	},
	// 忘记密码
	{
		path: '/account/forgot',
		name: 'forgot',
		component: () => import('../views/account/forgot.vue')
	},
	// 注册账号
	{
		path: '/account/register',
		name: 'register',
		component: () => import('../views/account/register.vue')
	},
		   // 第三方授权登录
	   {
	      path: '/account/otherLogin',
	      name: 'otherLogin',
	      component: otherLogin
	      },
		// 媒体图片
	{
		path: '/media/image',
		name: 'media_image',
		component: () => import('../views/media/image.vue')
	},

	// 音乐
	// {
	// 	path: '/media/music',
	// 	name: 'media_music',
	// 	component: () => import('../views/media/music.vue')
	// },
	// 媒体视频
	{
		path: '/media/video',
		name: 'media_video',
		component: () => import('../views/media/video.vue')
	},
	// 媒体视频
	{
		path: '/user_center/index',
		name: 'user_center_index',
		component: () => import('../views/user_center/index.vue')
	},
	// 文章路由
	{
		path: '/article/list',
		name: 'article_list',
		component: () => import('../views/article/list.vue')
	},
	{
		path: '/article/details',
		name: 'article_details',
		component: () => import('../views/article/details.vue')
	},
	// 浏览网站
	// 收藏路由
	{
		path: '/user/collect',
		name: 'collect_list',
		component: () => import('../views/user/collect.vue')
	},

	// 论坛路由
	{
		path: '/forum/list',
		name: 'forum_list',
		component: () => import('../views/forum/list.vue')
	},

	{
		path: '/forum/details',
		name: 'forum_details',
		component: () => import('../views/forum/details.vue')
	},
	{
		path: '/forum/edit',
		name: 'forum_edit',
		component: () => import('../views/forum/edit.vue')
	},
	{
		path: '/forum/table',
		name: 'forum_table',
		component: () => import('../views/forum/table.vue')
	},
	{
		path: '/forum/view',
		name: 'forum_view',
		component: () => import('../views/forum/view.vue')
	},

	{
		path: '/comment/table',
		name: 'comment_table',
		component: () => import('../views/comment/table.vue')
	},
	{
		path: '/comment/view',
		name: 'comment_view',
		component: () => import('../views/comment/view.vue')
	},

	// 考试路由
	{
		path: '/exam/list',
		name: 'exam_list',
		component: () => import('../views/exam/list.vue')
	},

	{
		path: '/exam/details',
		name: 'exam_details',
		component: () => import('../views/exam/details.vue')
	},
	// 考试路由
	{
		path: '/exam/table',
		name: 'exam_table',
		component: () => import('../views/exam/table.vue')
	},
	{
		path: '/exam/view',
		name: 'exam_view',
		component: () => import('../views/exam/view.vue')
	},
	{
		path: '/question_table/table',
		name: 'question_table_table',
		component: () => import('../views/exam/question_table.vue'),
		meta: {
			index: 0,
			title: '题库列表'
		}
	},
	{
		path: '/question_table/table',
		name: 'question_table_table',
		component: () => import('../views/exam/question_table.vue'),
		meta: {
			index: 0,
			title: '题库列表'
		}
	},
	{
		path: '/question_view/view',
		name: 'question_view_view',
		component: () => import('../views/exam/question_view.vue'),
		meta: {
			index: 0,
			title: '题库详情'
		}
	},
	{
		path: '/score_table/table',
		name: 'score_table_table',
		component: () => import('../views/exam/score_table.vue'),
		meta: {
			index: 0,
			title: '评分列表'
		}
	},
	{
		path: '/score_view/view',
		name: 'score_view_view',
		component: () => import('../views/exam/score_view.vue'),
		meta: {
			index: 0,
			title: '评分详情'
		}
	},
	{
		path: '/answer_view/view',
		name: 'answer_view_view',
		component: () => import('../views/exam/answer_view.vue'),
		meta: {
			index: 0,
			title: '评分详情'
		}
	},
		// 考试路由
	{
		path: '/subject_exam/list',
		name: 'exam_list',
		component: () => import('../views/subject_exam/list.vue')
	},
	{
		path: '/subject_exam/details',
		name: 'exam_details',
		component: () => import('../views/subject_exam/details.vue')
	},
	// 错题路由
	{
		path: '/subject_exam/answer_wrong_table',
		name: 'exam_answer_wrong_table',
		component: () => import('../views/subject_exam/answer_wrong_table.vue')
	},
	{
		path: '/subject_exam/answer_wrong_view',
		name: 'exam_answer_wrong_view',
		component: () => import('../views/subject_exam/answer_wrong_view.vue')
	},
	

	// 商品路由
	{
		path: '/goods/list',
		name: 'goods_list',
		component: () => import('../views/goods/list.vue')
	},
	{
		path: '/goods/details',
		name: 'goods_details',
		component: () => import('../views/goods/details.vue')
	},
		{
		path: '/goods/coupon',
		name: 'goods_coupon',
		component: () => import('../views/goods/coupon.vue')
	},
	// 我的优惠券
	{
		path: '/user/coupon',
		name: 'coupon',
		component: () => import('../views/user/coupon.vue')
	},
		{
		path: '/pay/detail',
		name: 'pay_detail',
		component: () => import('../views/pay/details.vue')
	},
	// 购物车路由
	{
		path: '/cart/list',
		name: 'cart_list',
		component: () => import('../views/cart/list.vue')
	},
	// 订单路由
	{
		path: '/order/list',
		name: 'order_list',
		component: () => import('../views/order/list.vue')
	},
	{
		path: '/order/details',
		name: 'order_details',
		component: () => import('../views/order/details.vue')
	},
		// 物流配送表格路由
	{
		path: '/logistics_delivery/table',
		name: '/logistics_delivery_table',
		component: () => import('../views/logistics_delivery/table.vue')
	},
	// 物流配送详情路由
	{
		path: '/logistics_delivery/view',
		name: '/logistics_delivery_view',
		component: () => import('../views/logistics_delivery/view.vue')
	},
	// 收货地址路由
	{
		path: '/user/address',
		name: 'address',
		component: () => import('../views/user/address.vue')
	},
	{
		path: '/user/address_edit',
		name: 'address_edit',
		component: () => import('../views/user/address_edit.vue')
	},
	
	 // 留言路由
	 {
	 	path: '/message/list',
	 	name: 'message_list',
	 	component: () => import('../views/message/list.vue')
	 },
	 {
		path: '/message/edit',
		name: 'message_edit',
		component: () => import('../views/message/edit.vue')
	 },
	// 留言板路由
	{
		path: '/message/table',
		name: 'message_table',
		component: () => import('../views/message/table.vue')
	},
	{
		path: '/message/view',
		name: 'message_view',
		component: () => import('../views/message/view.vue')
	},
	{
		path: '/chat',
		name: 'chat',
		component: () => import('../views/chat/index.vue')
	},

	// 公告路由
	{
		path: '/notice/list',
		name: 'notice_list',
		component: () => import('../views/notice/list.vue')
	},
	{
		path: '/notice/details',
		name: 'notice_details',
		component: () => import('../views/notice/details.vue')
	},
	// 章节路由
	{
		path: '/novel_chapters/table',
		name: 'novel_chapters_table',
		component: () => import('../views/novel_chapters/table.vue')
	},
	{
		path: '/novel_chapters/view',
		name: 'novel_chapters_view',
		component: () => import('../views/novel_chapters/view.vue')
	},
	{
		path: '/novel_chapters/read',
		name: 'novel_chapters_read',
		component: () => import('../views/novel_chapters/read.vue')
	},
	// 影视路由
	{
		path: '/movie_episode/table',
		name: 'movie_episode_table',
		component: () => import('../views/movie_episode/table.vue')
	},
	{
		path: '/movie_episode/view',
		name: 'movie_episode_view',
		component: () => import('../views/movie_episode/view.vue')
	},
	{
		path: '/movie_episode/playvideo',
		name: 'movie_episode_playvideo',
		component: () => import('../views/movie_episode/playvideo.vue')
	},
	// 天气预报
	{
		path: '/web/index',
		name: 'web_index',
		component: () => import('../views/web/index.vue')
	},
	// 注册用户表格路由
	{
		path: '/registered_user/table',
		name: '/registered_user_table',
		component: () => import('../views/registered_user/table.vue')
	},
	// 注册用户详情路由
	{
		path: '/registered_user/view',
		name: '/registered_user_view',
		component: () => import('../views/registered_user/view.vue')
	},
	
	
		
		
		
	// 商家用户表格路由
	{
		path: '/business_user/table',
		name: '/business_user_table',
		component: () => import('../views/business_user/table.vue')
	},
	// 商家用户详情路由
	{
		path: '/business_user/view',
		name: '/business_user_view',
		component: () => import('../views/business_user/view.vue')
	},
	
	
		
		
		
	// 生鲜商品表格路由
	{
		path: '/fresh_goods/table',
		name: '/fresh_goods_table',
		component: () => import('../views/fresh_goods/table.vue')
	},
	// 生鲜商品详情路由
	{
		path: '/fresh_goods/view',
		name: '/fresh_goods_view',
		component: () => import('../views/fresh_goods/view.vue')
	},
	
		// 生鲜商品列表路由
	{
		path: '/fresh_goods/list',
		name: '/fresh_goods_list',
		component: () => import('../views/fresh_goods/list.vue')
	},
	
		// 生鲜商品详情路由
	{
		path: '/fresh_goods/details',
		name: '/fresh_goods_details',
		component: () => import('../views/fresh_goods/details.vue')
	},
		
		
		// 生鲜商品商品对比路由
	{
		path: '/fresh_goods/vs_detail',
		name: '/fresh_goods_vs_detail',
		component: () => import('../views/fresh_goods/vs_detail.vue')
	},
		
	// 分类信息表格路由
	{
		path: '/classification_information/table',
		name: '/classification_information_table',
		component: () => import('../views/classification_information/table.vue')
	},
	// 分类信息详情路由
	{
		path: '/classification_information/view',
		name: '/classification_information_view',
		component: () => import('../views/classification_information/view.vue')
	},
	
	
		
		
		
	// 定制商品表格路由
	{
		path: '/customized_products/table',
		name: '/customized_products_table',
		component: () => import('../views/customized_products/table.vue')
	},
	// 定制商品详情路由
	{
		path: '/customized_products/view',
		name: '/customized_products_view',
		component: () => import('../views/customized_products/view.vue')
	},
	
		// 定制商品列表路由
	{
		path: '/customized_products/list',
		name: '/customized_products_list',
		component: () => import('../views/customized_products/list.vue')
	},
	
		// 定制商品详情路由
	{
		path: '/customized_products/details',
		name: '/customized_products_details',
		component: () => import('../views/customized_products/details.vue')
	},
		
		// 定制商品地图路由
	{
		path: '/customized_products/map',
		name: '/customized_products_map',
		component: () => import('../views/customized_products/map.vue')
	},
		
		// 定制商品商品对比路由
	{
		path: '/customized_products/vs_detail',
		name: '/customized_products_vs_detail',
		component: () => import('../views/customized_products/vs_detail.vue')
	},
		
	// 我要定制表格路由
	{
		path: '/i_want_to_customize_it/table',
		name: '/i_want_to_customize_it_table',
		component: () => import('../views/i_want_to_customize_it/table.vue')
	},
	// 我要定制详情路由
	{
		path: '/i_want_to_customize_it/view',
		name: '/i_want_to_customize_it_view',
		component: () => import('../views/i_want_to_customize_it/view.vue')
	},
		// 我要定制添加路由
	{
		path: '/i_want_to_customize_it/edit',
		name: '/i_want_to_customize_it_edit',
		component: () => import('../views/i_want_to_customize_it/edit.vue')
	},
	
	
		
		
		
	// 评价反馈表格路由
	{
		path: '/evaluation_feedback/table',
		name: '/evaluation_feedback_table',
		component: () => import('../views/evaluation_feedback/table.vue')
	},
	// 评价反馈详情路由
	{
		path: '/evaluation_feedback/view',
		name: '/evaluation_feedback_view',
		component: () => import('../views/evaluation_feedback/view.vue')
	},
	
	
		
		
		
	// 影视小说表格路由
	{
		path: '/film_and_television_novels/table',
		name: '/film_and_television_novels_table',
		component: () => import('../views/film_and_television_novels/table.vue')
	},
	// 影视小说详情路由
	{
		path: '/film_and_television_novels/view',
		name: '/film_and_television_novels_view',
		component: () => import('../views/film_and_television_novels/view.vue')
	},
	
		// 影视小说列表路由
	{
		path: '/film_and_television_novels/list',
		name: '/film_and_television_novels_list',
		component: () => import('../views/film_and_television_novels/list.vue')
	},
	
		// 影视小说详情路由
	{
		path: '/film_and_television_novels/details',
		name: '/film_and_television_novels_details',
		component: () => import('../views/film_and_television_novels/details.vue')
	},
		
		// 影视小说地图路由
	{
		path: '/film_and_television_novels/map',
		name: '/film_and_television_novels_map',
		component: () => import('../views/film_and_television_novels/map.vue')
	},
		
		
	// 线下活动表格路由
	{
		path: '/offline_activities/table',
		name: '/offline_activities_table',
		component: () => import('../views/offline_activities/table.vue')
	},
	// 线下活动详情路由
	{
		path: '/offline_activities/view',
		name: '/offline_activities_view',
		component: () => import('../views/offline_activities/view.vue')
	},
	
		// 线下活动列表路由
	{
		path: '/offline_activities/list',
		name: '/offline_activities_list',
		component: () => import('../views/offline_activities/list.vue')
	},
	
		// 线下活动详情路由
	{
		path: '/offline_activities/details',
		name: '/offline_activities_details',
		component: () => import('../views/offline_activities/details.vue')
	},
		
		// 线下活动地图路由
	{
		path: '/offline_activities/map',
		name: '/offline_activities_map',
		component: () => import('../views/offline_activities/map.vue')
	},
		
		
	// 场次安排表格路由
	{
		path: '/schedule_of_sessions/table',
		name: '/schedule_of_sessions_table',
		component: () => import('../views/schedule_of_sessions/table.vue')
	},
	// 场次安排详情路由
	{
		path: '/schedule_of_sessions/view',
		name: '/schedule_of_sessions_view',
		component: () => import('../views/schedule_of_sessions/view.vue')
	},
	
		// 场次安排列表路由
	{
		path: '/schedule_of_sessions/list',
		name: '/schedule_of_sessions_list',
		component: () => import('../views/schedule_of_sessions/list.vue')
	},
	
		// 场次安排详情路由
	{
		path: '/schedule_of_sessions/details',
		name: '/schedule_of_sessions_details',
		component: () => import('../views/schedule_of_sessions/details.vue')
	},
		
		
		
	// 座位安排表格路由
	{
		path: '/seating_arrangements/table',
		name: '/seating_arrangements_table',
		component: () => import('../views/seating_arrangements/table.vue')
	},
	// 座位安排详情路由
	{
		path: '/seating_arrangements/view',
		name: '/seating_arrangements_view',
		component: () => import('../views/seating_arrangements/view.vue')
	},
	
		// 座位安排列表路由
	{
		path: '/seating_arrangements/list',
		name: '/seating_arrangements_list',
		component: () => import('../views/seating_arrangements/list.vue')
	},
	
		// 座位安排详情路由
	{
		path: '/seating_arrangements/details',
		name: '/seating_arrangements_details',
		component: () => import('../views/seating_arrangements/details.vue')
	},
		
		
		
	// 意见反馈表格路由
	{
		path: '/feedback_on_opinions/table',
		name: '/feedback_on_opinions_table',
		component: () => import('../views/feedback_on_opinions/table.vue')
	},
	// 意见反馈详情路由
	{
		path: '/feedback_on_opinions/view',
		name: '/feedback_on_opinions_view',
		component: () => import('../views/feedback_on_opinions/view.vue')
	},
		// 意见反馈添加路由
	{
		path: '/feedback_on_opinions/edit',
		name: '/feedback_on_opinions_edit',
		component: () => import('../views/feedback_on_opinions/edit.vue')
	},
	
	
		
		
		

	// 用户路由
	{
		path: '/user/index',
		name: 'user_index',
		component: () => import('../views/user/index.vue')
	},
	// 基本信息
	{
		path: '/user/info',
		name: 'user_info',
		component: () => import('../views/user/info.vue')
	},
	// 钱包充值
	{
		path: '/user/wallet',
		name: 'user_wallet',
		component: () => import('../views/user/wallet.vue')
	},
	{
	    path: "/map_navigation",
	    name: "map_navigation",
	    component: () => import("../views/map_navigation/map_navigation.vue")
	  },
	{
	    path: "/user/my_home_page",
	    name: "my_home_page",
	    component: () => import("../views/user/my_home_page.vue"),
	},
	// 找回密码
	{
		path: '/user/password',
		name: 'user_password',
		component: () => import('../views/user/password.vue')
	},

	// 搜索
	{
		path: '/search',
		name: 'search',
		component: () => import('../views/search/index.vue')
	},
	// 局部搜索
	{
		path: '/search/details',
		name: 'search_details',
		component: () => import('../views/search/details.vue')
	}
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

router.afterEach((to, from, next) => {
	let title = "样式开发测试测试测试测试单-home";
	document.title = title;
	document.logo = "样式开发测试测试测试测试单"
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router

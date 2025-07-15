<template>
  <div class="list_menu diy_menu">
    <router-link
            to="/user_center/index"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/user_center/index'}"
     >
      <span class="left_span">个人首页</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
          <router-link
          to="/registered_user/table"
          class="menu_item"
          :class="{ selected: this.$route.path=== '/registered_user/table'}"
          v-if="$check_action('/registered_user/table','get')">
        <span class="left_span">{{ $page_title("/registered_user/table") || 注册用户 }}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
              <router-link
          to="/business_user/table"
          class="menu_item"
          :class="{ selected: this.$route.path=== '/business_user/table'}"
          v-if="$check_action('/business_user/table','get')">
        <span class="left_span">{{ $page_title("/business_user/table") || 商家用户 }}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
                  <router-link
          to="/classification_information/table"
          class="menu_item"
          :class="{ selected: this.$route.path=== '/classification_information/table'}"
          v-if="$check_action('/classification_information/table','get')">
        <span class="left_span">{{ $page_title("/classification_information/table") || 分类信息 }}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
              <router-link
          to="/customized_products/table"
          class="menu_item"
          :class="{ selected: this.$route.path=== '/customized_products/table'}"
          v-if="$check_action('/customized_products/table','get')">
        <span class="left_span">{{ $page_title("/customized_products/table") || 定制商品 }}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
              <router-link
          to="/i_want_to_customize_it/table"
          class="menu_item"
          :class="{ selected: this.$route.path=== '/i_want_to_customize_it/table'}"
          v-if="$check_action('/i_want_to_customize_it/table','get')">
        <span class="left_span">{{ $page_title("/i_want_to_customize_it/table") || 我要定制 }}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
              <router-link
          to="/evaluation_feedback/table"
          class="menu_item"
          :class="{ selected: this.$route.path=== '/evaluation_feedback/table'}"
          v-if="$check_action('/evaluation_feedback/table','get')">
        <span class="left_span">{{ $page_title("/evaluation_feedback/table") || 评价反馈 }}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
              <router-link
          to="/film_and_television_novels/table"
          class="menu_item"
          :class="{ selected: this.$route.path=== '/film_and_television_novels/table'}"
          v-if="$check_action('/film_and_television_novels/table','get')">
        <span class="left_span">{{ $page_title("/film_and_television_novels/table") || 影视小说 }}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
              <router-link
          to="/offline_activities/table"
          class="menu_item"
          :class="{ selected: this.$route.path=== '/offline_activities/table'}"
          v-if="$check_action('/offline_activities/table','get')">
        <span class="left_span">{{ $page_title("/offline_activities/table") || 线下活动 }}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
              <router-link
          to="/schedule_of_sessions/table"
          class="menu_item"
          :class="{ selected: this.$route.path=== '/schedule_of_sessions/table'}"
          v-if="$check_action('/schedule_of_sessions/table','get')">
        <span class="left_span">{{ $page_title("/schedule_of_sessions/table") || 场次安排 }}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
              <router-link
          to="/seating_arrangements/table"
          class="menu_item"
          :class="{ selected: this.$route.path=== '/seating_arrangements/table'}"
          v-if="$check_action('/seating_arrangements/table','get')">
        <span class="left_span">{{ $page_title("/seating_arrangements/table") || 座位安排 }}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
              <router-link
          to="/feedback_on_opinions/table"
          class="menu_item"
          :class="{ selected: this.$route.path=== '/feedback_on_opinions/table'}"
          v-if="$check_action('/feedback_on_opinions/table','get')">
        <span class="left_span">{{ $page_title("/feedback_on_opinions/table") || 意见反馈 }}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
        	<router-link
		to="/logistics_delivery/table"
		class="menu_item"
		:class="{ selected: this.$route.path=== '/logistics_delivery/table'}"
        v-if="$check_action('/logistics_delivery/table')"
	>
		<span class="left_span">订单配送</span>
		<span class="right_span"><b-icon icon="house-fill"></b-icon></span>
	</router-link>
          <router-link
              to="/forum/table"
              class="menu_item"
              :class="{ selected: this.$route.path=== '/forum/table'}"
              v-if="$check_action('/forum/table','get')">
        <span class="left_span">{{$page_title("/forum/table") || "论坛"}}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
      <router-link
              to="/message/table"
              class="menu_item"
              :class="{ selected: this.$route.path=== '/message/table'}"
              v-if="$check_action('/message/table','get')">
        <span class="left_span">{{$page_title("/message/table") || "在线留言"}}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
      <router-link
              to="/exam/table"
              class="menu_item"
              :class="{ selected: this.$route.path=== '/exam/table'}"
              v-if="$check_action('/exam/table','get')">
        <span class="left_span">{{$page_title("/exam/table") || "知识问答"}}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
    <router-link
        to="/subject_exam/answer_wrong_table"
        class="menu_item"
        :class="{ selected: this.$route.path=== '/subject_exam/answer_wrong_table'}"
        v-if="$check_action('/user_answer_wrong/table','get')">
      <span class="left_span">错题记录</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
  <router-link
              to="/user/collect"
              class="menu_item"
              :class="{ selected: this.$route.path=== '/user/collect'}"
              v-if="$check_action('/collect/list','get')">
        <span class="left_span">收藏</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
  </router-link>
	<router-link
	            to="/comment/table"
	            class="menu_item"
	            :class="{ selected: this.$route.path=== '/comment/table'}"
	            v-if="$check_action('/comment/table','get')">
	      <span class="left_span">评论管理</span>
	      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
	</router-link>
  </div>
</template>

<script>
import mixin from "@/mixins/page.js";
export default {
  mixins: [mixin],
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },

  components: {
  },
};
</script>

<style scoped>
.list_menu {
  flex: 0 0 25%;
  border-bottom: 1px solid #eee;
}
.menu_item {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border: 1px solid #eee;
  border-bottom: none;
  background-color: #fff;
}
.menu_item.selected {
  background-color: #000;
}
.menu_item.selected span {
  color: #fff ;
}
.content {
  flex: 0 0 74%;
}
</style>

<template>
  <div class="page_user exam_view" id="user_address">
    <div class="warp">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-12 col-md-3">
            <div class="card_menu">
              <!-- 左侧边栏 -->
              <list_admin_menu_user></list_admin_menu_user>
            </div>
          </div>
          <div class="col-12 col-md-9">
            <div class="card_address pl-2">
              <!-- 题库 -->
              <div><span>题库</span></div>
              <exam_question_view v-if="$check_action('/exam/table','get')"></exam_question_view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import list_admin_menu_user from "@/components/diy/list_admin_menu_user.vue";
  import exam_question_view from "../../components/diy/exam/exam_question_view.vue";
  export default {
    data() {
      return {
      };
    },
    mounted() {
    },
    methods: {
    },
    components: {
      list_admin_menu_user,
      exam_question_view,
    },
  };
</script>

<style scoped>
  .container {
    min-height: 800px;
  }
</style>

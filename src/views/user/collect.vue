<template>
  <div class="page_user collect_list" id="user_collect">
    <div class="warp">
      <div class="container">
        <div class="row justify-content-between">
        
          <div class="col-12 col-md-3">
            <div class="card_menu">
                <!--<list_menu_user :list_info="list_info"></list_menu_user>-->
              <list_admin_menu_user/>
            </div>
          </div>
        
          <div class="col-12 col-md-9 user_right_box">
            <div class="filter_block">
              <!-- 筛选 -->
              <div class="bar_filter">
                <div style="height: 30px">
                </div>
              </div>
            </div>
            <!-- /筛选 -->
            <list_collect :list="list"></list_collect>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins/page.js";
// import list_menu_user from "@/components/diy/list_menu_user.vue";
import list_admin_menu_user from "@/components/diy/list_admin_menu_user.vue";
import list_collect from "@/components/diy/list_collect.vue";
export default {
  mixins: [mixin],
  data() {
    return {
      url_get_list: "~/api/collect/get_list?",
      query: {
        user_id: this.$store.state.user.user_id,
        orderby: "create_time asc",
      },
      list: [],
      list_info: [
        {
          title: "个人资料",
          url: "/user/info",
          icon: "house-fill",
          selected: false,
        },
        {
          title: "密码修改",
          url: "/user/password",
          icon: "person-fill",
          selected: false,
        },

      ]
    };
  },
  methods: {
    /**
     * 筛选选择
     */
    filter_cart(o) {
      this.query.source_table = o.value;
      this.search();
    },
  },
  mounted() {
    // this.title = "收藏分类";
  },
  components: {
   // list_menu_user,
   list_admin_menu_user,
    list_collect,
  },
};
</script>

<style scoped>
.container {
  min-height: 800px;
}
.filter_block {
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 10px;
}
.bar_filter {
  display: flex;
  align-items: center;
}
li {
  list-style: none;
}
.bar_sort {
  margin-left: 5px;
}
</style>

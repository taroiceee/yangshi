<template>
  <div class="page_user" id="user_address">
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
            <div class="card_addres pl-2">
              <!-- 小说阅读 -->
              <div><span>小说阅读</span></div>
              <novel_chapters_table></novel_chapters_table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins/page";
import list_admin_menu_user from "@/components/diy/list_admin_menu_user.vue";
import novel_chapters_table from "@/components/diy/novel_chapters_table.vue";

export default {
  components: {
    novel_chapters_table,
    list_admin_menu_user
  },
  mixins: [mixin],
  name: "content_table",
}
</script>

<style scoped>

</style>
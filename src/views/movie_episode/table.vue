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
              <!-- 影视播放 -->
              <div><span>影视播放</span></div>
              <movie_episode_table></movie_episode_table>
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
import movie_episode_table from "@/components/diy/movie_episode_table.vue";

export default {
  components: {
    movie_episode_table,
    list_admin_menu_user
  },
  mixins: [mixin],
  name: "content_table",
}
</script>

<style scoped>

</style>
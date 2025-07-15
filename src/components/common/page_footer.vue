<template>
  <footer class="page_footer">
    <div class="wrap">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card_copyright">
                   <div class="is1">
                <span class="as1" ></span>
                <span class="as2"></span>
                <span class="as3"></span>
                <span class="as4"></span>
              </div>
              <div class="is2">
                <span class="bs1"></span>
                <span class="bs2"></span>
                <span class="bs3"></span>
                <span class="bs4"></span>
                </div>
              <div class="is3">
                <span class="cs1"></span>
                <span class="cs2"></span>
                <span class="cs3"></span>
                <span class="cs4"></span>
              </div>
              <div class="is4">
                <span class="ds1"></span>
                <span class="ds2"></span>
                <span class="ds3"></span>
                <span class="ds4"></span>
              </div>
              
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="card_link">
              <!-- 底部友情链接 -->
              <list_link
                  :list="list_link"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import mixin from "@/mixins/component.js";
import list_link from "@/components/diy/list_link.vue";
export default {
  mixins: [mixin],
  components: {
          list_link,
      },
  data() {
    return {
              list_link: [],
          };
  },
  methods: {
          // 获取链接列表
      get_link() {
        this.$get(
                "~/api/link/get_list?",
                {
                  page: 1,
                  size: 8,
                },
                (json) => {
                  if (json.result) {
                    this.list_link = json.result.list;
                  }
                }
        );
      },
      },
  created() {
          this.get_link();
      },
};
</script>

<style scoped="scoped">

.page_footer .wrap {
    background-color: #e2e2e2;
  color: rgb(167, 167, 167);
}
.card_copyright {
	padding: 30px 10px;
  text-align: center;
}
</style>

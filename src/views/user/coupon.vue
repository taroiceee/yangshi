<template>
  <div id="page_pay" class="page_pay">
    <div class="warp">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6">
            <div v-for="item in list"
                      :key="item.coupon_id">
              <div class="coupon_box"
                   :class="!isEffective(item.coupon_time) || isUse(item.id)?'bg_grey':''"
                   >
                <div style="margin-left: 10px">
                  <div>{{ item.coupon_name }}</div>
                  <div>使用规则:满{{ item.coupon_price }}减 {{item.coupon_price1}}</div>
                  <div>有效期：{{ item["coupon_time"].split(",")[0], "yyyy-MM-dd hh:mm:ss" }}
                    到
                    {{ item["coupon_time"].split(",")[1], "yyyy-MM-dd hh:mm:ss" }}
                  </div>
                </div>
                <div style="margin-right: 10px" v-if="isUse(item.id)">已使用</div>
                <div style="margin-right: 10px" v-if="!isEffective(item.coupon_time) && !isUse(item.id)">不在有效期内</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixins/page.js";

export default {
  mixins: [mixin],

  components: {},
  data() {
    return {

    };
  },

  methods: {
    /**
     *  当前用户的优惠券
     */
    async get_coupon_user_list(){
      const result = await this.$get("~/api/coupon_user/get_list", {
        user_id: this.$store.state.user.user_id
      })

      for (let i = 0; i < result.result.list.length; i++) {
        const res = await this.$get("~/api/coupon/get_obj", {
          coupon_id: result.result.list[i].coupon_id,
        })

        this.list.push({
          ...res.result.obj,
          id: result.result.list[i].id,
          is_use: result.result.list[i].is_use
        })
      }
    },
  },
  mounted() {

  },
  computed:{
    isUse(id){
      return function (id){
        if(this.list){
          for (let i = 0; i < this.list.length; i++) {
            if(this.list[i].id === id && this.list[i].is_use == 1){
              return true
            }
          }
        }
      }
    },
    isEffective(time){
      return function (time){
        const now = new Date().getTime()
        const date = time.split(",")
        const start = new Date(date[0])
        const end = new Date(date[1])
        return  (start <= now && now <= end)
      }
    }
  },
  created() {
    this.get_coupon_user_list()
  }
};
</script>

<style scoped>
.container {
  min-height: 800px;
}

.coupon_box {
  width: 100%;
  height: 80px;
  border-radius: 10px;
  background: rgb(243, 116, 116);
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>

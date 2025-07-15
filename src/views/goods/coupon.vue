<template>
  <div id="page_pay" class="page_pay">
    <div class="warp">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6">
            <div v-for="item in list"
                      :key="item.coupon_id">
              <div class="coupon_box"
                   v-if="item.coupon_user_id == admin_userId || item.coupon_user_id == $route.query.userId">
                <div style="margin-left: 10px">
                  <div>{{ item.coupon_name }}</div>
                  <div>使用规则:满{{ item.coupon_price }}减 {{item.coupon_price1}}</div>
                  <div>有效期：{{ item["coupon_time"].split(",")[0], "yyyy-MM-dd hh:mm:ss" }}
                    到
                    {{ item["coupon_time"].split(",")[1], "yyyy-MM-dd hh:mm:ss" }}
                  </div>
                </div>
                <el-button
                    :disabled="isDisabled(item.coupon_id)"
                    style="margin-right: 10px"
                    type="primary"
                    @click="receive_coupon({
                      user_id: $store.state.user.user_id,
                      coupon_id: item.coupon_id,
                      is_use: 0
                    })">
                  {{isDisabled(item.coupon_id)?"已领取":"领取"}}
                </el-button>
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
      url_get_list: "~/api/coupon/get_list?like=0",
      field: "coupon_id",
      list: [],
      admin_userId: 0,
      coupon_user_list:[]
    };
  },

  methods: {
    /**
     * 获取用户
     */
    async get_list_user() {
      var json = await this.$get("~/api/user/get_list?");
      if (json.result) {
        for (let i = 0; i < json.result.list.length; i++) {
          if(json.result.list[i].user_group === "管理员"){
            this.admin_userId = json.result.list[i].user_id
          }
        }
      } else if (json.error) {
        console.error(json.error);
      }
    },
    /**
    *  领取优惠券
    */
    receive_coupon(data){
      this.$post("~/api/coupon_user/add",data,(res)=>{
        if(res.result === 1 || res.result == true){
          this.get_coupon_user_list()
          this.$message({
            type: 'success',
            message: '领取成功'
          });
        }
      })
    },
    /**
     *  当前用户的优惠券
     */
    async get_coupon_user_list(){
      const result = await this.$get("~/api/coupon_user/get_list",{
        user_id: this.$store.state.user.user_id
      })
      this.coupon_user_list = result.result.list
    },
  },
  mounted() {

  },
  computed:{
    isDisabled(id){
      return function (id){
        if(this.coupon_user_list){
          for (let i = 0; i < this.coupon_user_list.length; i++) {
            if(this.coupon_user_list[i].coupon_id === id){
              return true
            }
          }
        }
      }
    }
  },
  created() {
    this.get_list_user()
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

<template>
  <div class="page_user user_list" id="user_index">
    <div class="warp">
      <div class="container">
        <div class="row justify-content-between">
         <!-- 左侧边栏 
          <div class="col-12 col-md-3">
            <div class="card_menu">
             
              <list_menu_user :list_info="list_info"></list_menu_user>
            </div>
          </div>
          -->
          <div class="col-12 col-md-9 user_bg">
            <div class="card_default pl-2"  >
              <div class="user_block" v-if="user.user_id">
                <div class="img_block">
                  <img
                    style="width: 6rem; height: 6rem"
                    :src="user.avatar ? $fullUrl(user.avatar) : '../../../public/img/default.png'"
                  />
                </div>
                <div class="nickname">
                  <h4>{{ user.nickname }}</h4>
                </div>
                <div class="user_group">
                  <span>{{ user.user_group }}</span>
                </div>
                <div class="wallet-show-container">
                    <div class="wallet-show-one">
                    钱包余额 <span class="num">￥{{ user.balance }}</span>
                  </div>
                      <div class="wallet-show-one">
                    积分 <span class="num">{{ user.integral }}</span>
                  </div>
                  </div>
                <div class="log_out">
                  <b-button class="Personal_data" @click="$router.push('/user/info')">个人资料</b-button>
                  <b-button class="Personal_data" @click="goWallet">钱包充值</b-button>
                  <b-button variant="info" @click="sign_out()">退出登录</b-button>
                </div>
              </div>
              <div v-else class="sign_in">
                <b-button class="btn_block" variant="info" @click="$router.push('/account/login')">登录</b-button>
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
// import list_menu_user from "@/components/diy/list_menu_user.vue";
export default {
  mixins: [mixin],
  data() {
    return {
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

        {
          title: "收藏",
          url: "/user/collect",
          icon: "heart-fill",
          selected: false,
        },

      ],
    };
  },
  methods: {
    sign_out(){
        this.$store.commit('sign_out');
        location.href = "/";
        location.reload();
    },
    goWallet(){
      this.$router.push({path:'/user/wallet',query:{balance:this.user.balance}})
    }
  },
  components: {
   // list_menu_user,
  },
};
</script>

<style scoped>
.wallet-show-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  justify-content: center;
  width: 100%;
}

.wallet-show-container .wallet-show-one {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  border-right: 2px solid #000;
  font-size: 17px;
  width: calc(50% - 40px);
  padding: 0 20px;
}

.wallet-show-container .wallet-show-one:last-child {
  border-right: none;
  justify-content: flex-start;
  width: calc(50% - 42px);
}

.wallet-show-container .wallet-show-one .num {
  color: #E13A0C;
  margin-left: 5px;
  font-weight: bolder;
}
.container {
  min-height: 800px;
}
.user_block {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
}
.user_block > * {
  margin-top: 5px;
}
.img_block img {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 8px rgba(0, 0, 0, 0.04);
}
.nickname {
  color: var(--color_black);
}
.user_group {
  color: var(--color_subtitle);
}
.user_bg {
  background: url(../../../public/img/user_bg.jpg);
}
.log_out {
  margin-top: 20px;
  height: 30px;
}
.log_out >*{
  line-height: 20px;
}
.sign_in{
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 5rem;
  margin-top: 100px;
}
.btn_block{
  width: 90px;
  height: 60px;
}
</style>

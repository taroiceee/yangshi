<template>
  <div class="page_header">
    <transition name="fade">
      <div v-show="visible" class="header_warp">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="my_header">

                <div class="conton-top">
                  <router-link to="/">
                  <div class="logo">样式开发测试测试测试测试单</div>
                  </router-link>

                  <div ref="search" class="search-box">
                  <input class="search-txt" v-model.trim="search_val" type="text" placeholder="输入关键词">
                  <div class="search-btn" @click="submit_search">
                    <svg viewBox="0 0 16 16" width="1em" height="1em"
                         focusable="false" role="img" aria-label="search"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                         class="bi-search b-icon bi">
                      <g>
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z">

                        </path>
                      </g>
                    </svg>
                  </div>
                  </div>


                  <div class="user" v-if="!user.user_id">
                    <router-link class="ml" :to="o.url" v-for="(o, i) in not_login_dropdown" :key="i">
                      {{ o.name }}
                    </router-link>
                  </div>
                  <div ref="my" v-else class="user">
                    <div ref="own" class="own" @click="my()">
                      <div class="user_pr">
                        <div class="img_box" >
                          <img class="user_img" style="width: 40px;" :src="$fullUrl(user_avatar)" alt="">
                        </div>
                        <div class="own_text" >{{ user_nickname }}    <span class="caret" v-bind:style="{transform: 'rotate('+ angle2 +'deg)'}"/> </div>
                      </div>

                    </div>
                    <div v-show="my_show" class="dropdown">
                      <div class="my_item" v-for="(o,i) in my_nav">
                        <router-link :to="o.url">
                          {{o.name}}
                        </router-link>
                      </div>
									  <div class="my_item">
                        <router-link :to="'/user/my_home_page?follower_id=' + user.user_id">
                          我的主页
                        </router-link>
                      </div>
				                      <div class="my_item">
                        <router-link to="/user_center/index">
                          个人中心
                        </router-link>
                      </div>
                      <div class="my_item" @click="sign_out()">
                        <router-link to="/">
                          退出
                        </router-link>
                      </div>
                    </div>
                  </div>

                </div>

                <div ref="nav_target" class="nav_list">
                  <ul class="nav_ul">
                    <li class="nav_li">
                      <router-link to="/" class="nav_a">
                        首页
                      </router-link>
                    </li>
                                              <li v-if="$check_action('/forum/list','get')">
                          <router-link to="/forum/list">
                              交流论坛
                          </router-link>
                        </li>
                                                                                        <li class="nav_li" v-if="$check_exam('/exam/list','answers')">
                          <router-link to="/exam/list" class="nav_a">
                              {{$page_title("/exam/list") || 知识问答}}
                          </router-link>
                        </li>
                      
                                              <li class="nav_li" v-if="$check_exam('/subject_exam/list','answers')">
                          <router-link to="/subject_exam/list" class="nav_a">
                            {{$page_title("/subject_exam/list") || 在线考试}}
                          </router-link>
                        </li>
                      					  
					  
                                              <li class="nav_li">
                          <router-link to="/notice/list" class="nav_a">
                              网站公告
                          </router-link>
                        </li>
                                                                    <li class="nav_li">
                          <router-link to="/article/list" class="nav_a">
                            {{"商城资讯" || "新闻通知"}}
                          </router-link>
                        </li>
                                                                    <li class="nav_li" v-if="$check_action('/message/list','get')">
                          <router-link to="/message/list" class="nav_a">
                              {{$page_title("/message/list") || 在线留言}}
                          </router-link>
                        </li>
                                                                    <li class="nav_li">
                          <router-link class="nav_a" to="/chat">
                            在线聊天
                          </router-link>
                        </li>
                                                                    <li class="nav_li" v-if="$check_action('/goods/list','get')">
                          <router-link to="/goods/list" class="nav_a">
                              水果商城                          </router-link>
                        </li>
                        <li class="nav_li" v-if="$check_action('/goods/list','get')">
                            <el-dropdown>
                              <span class="el-dropdown-link nav_a" >
                                商城管理<i class="el-icon-arrow-down el-icon--right"></i>
                              </span>
                              <el-dropdown-menu slot="dropdown">
                                <div class="dro" >
                                  <li v-for="(o,i) in my_cart" class="dro_li">
                                      <i></i>
                                    <router-link :to="o.url" class="nav_a">
                                      {{o.name}}
                                    </router-link>
                                  </li>

                                </div>

                              </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                                                                    <li class="nav_li">
                          <router-link to="/web/index" class="nav_a">
                              天气预报
                          </router-link>
                        </li>
                      					  						<li class="nav_li">
						  <router-link class="nav_a" to="/map_navigation">
							地图导航
						  </router-link>
						</li>
					                      <li v-if="nav_top && i < top_max" v-for="(o,i) in nav_top" v-bind:key="i" class="nav_li">
                      <router-link :to="o.path" class="nav_a">
                        {{o.page_title}}
                      </router-link>
                    </li>
                    <li v-if="nav_top.length > top_max" class="nav_li">
                      <div ref="more" class="more" @click="change()">
                        <span class="more_text">更多</span>
                        <span class="caret" v-bind:style="
												{transform: 'rotate('+ angle1 +'deg)'}"/>
                      </div>
                      <div v-show="show" class="dropdown">
                        <div v-if="i >= top_max" class="item" v-for="(o,i) in nav_top">
                          <router-link :to="o.path" class="nav_a">
                            {{o.page_title}}
                          </router-link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div ref="mini" class="mini_nav" @click="open_mini()">
                  <div ref="mini" class="mini">
                    <span class="mini_text">菜单</span>
                    <span class="caret" v-bind:style="
												{transform: 'rotate('+ angle3 +'deg)'}"/>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>

  import mixin from "@/mixins/component.js";

  const OFFSET_HEIGHT = 60;
  export default {

    mixins: [mixin],

    data() {
      return {
        top_max: 15,
        angle1: 0,
        angle2: 0,
        angle3: 0,
        visible: true,
        show: false,
        my_show: false,
        nav_top: [],
        my_cart:[
                         {
                name: "我的购物车",
                url: "/cart/list",
              },
              {
                name: "我的订单",
                url: "/order/list",
              },
                              {
                name: "我的地址",
                url: "/user/address",
              },
                                       {
               name: "我的优惠券",
               url: "/user/coupon",
             },
                                 ],
        my_nav: [
          {
            name: "我的账户",
            url: "/user/index",
          },


        ],
        not_login_dropdown: [{
          name: "登录",
          url: "/account/login",
        },
                          {
                name: "注册",
                url: "/account/register",
              },
                    ],
        showInput: false,
        search_val: "",
        logo: "",

        user_nickname:'',
        user_avatar:''
      };
    },

    updated(){
      this.up_gd()
    },

    methods: {
      up_gd(){
        if (this.$store.state.user){
          let avatar = this.$store.state.user.avatar
          this.user_avatar = avatar
          let u_nickname = this.$store.state.user.nickname
          this.user_nickname = u_nickname
        }
      },

      async get_user_GD(){
       let sd = await this.$get("~/api/user/get_list?")

        let userD = sd.result.list

        let userG = this.$store.state.user.user_group

        for (let i = 0; i < userD.length; i++) {
          const dara = userD[i];

          if (dara.user_group === userG) {
           sessionStorage.setItem('avatar',dara.avatar)
            sessionStorage.setItem('nickname',dara.nickname)
            return
          }
        }

      },


      to_admin() {
        this.$router.push("/user_center/index");
      },

      // 获取导航栏
      async get_nav_top() {
        var auth = this.$store.state.web.auth;

        if (auth.length > 0) {
          var arr = [];
          for (var i = 0; i < auth.length; i++) {
            var o = auth[i];
            if (o["position"] == "top") {
              arr.push(o);
            }
          }
          this.nav_top = arr;
        } else {
          var user_group = this.$store.state.user.user_group || $.db.get("user_group") || "游客";
          var res = await this.$get("~/api/auth/get_list", {
            user_group,
            "get": 1,
            "position": "top",
            "page": ""
          });
          if (res.result && res.result.list) {
            this.nav_top = res.result.list;
          }
        }
      },

      sign_out() {
        this.$store.commit("sign_out");
        this.$get("~/api/user/quit?", {}, (res) => {
          console.log(res);
        })
        sessionStorage.removeItem('nickname');
        sessionStorage.removeItem('avatar');
        sessionStorage.removeItem('user_id');
        location.reload();
        // location.href = location.href
      },

      submit_search() {
        this.$router.push("/search?word=" + this.search_val);
        // this.$refs.navbar_toggle.$el.click();
      },

      change() {
        var _this = this;

        _this.show = !_this.show;
        var angle = _this.angle1;
        angle = angle + 180;
        if (angle === 360) {
          _this.angle1 = 0;
        } else {
          _this.angle1 = angle;
        }
      },

      my() {
        var _this = this;
        if (_this.angle3 === 180) {
          _this.$refs.nav_target.style.display = 'none';
          _this.$refs.search.style.display = 'none';
          _this.angle3 = 0;
        }
        _this.my_show = !_this.my_show;
        var angle = _this.angle2;
        angle = angle + 180;
        if (angle === 360) {
          _this.angle2 = 0
        } else {
          _this.angle2 = angle;
        }
      },

      open_mini() {
        var _this = this;
        if (_this.my_show) {
          _this.my_show = false;
        }
        var angle = _this.angle3;
        angle = angle + 180;
        if (angle === 360) {
          _this.$refs.nav_target.style.display = 'none';
          _this.$refs.search.style.display = 'none';
          _this.angle3 = 0;
        } else {
          _this.$refs.nav_target.style.display = 'block';
          _this.$refs.search.style.display = 'flex';
          _this.angle3 = angle;
        }
      },

      // 滚动隐藏
      handleScroll() {
        const offsetTop = window.pageYOffset || document.documentElement.scrollTop;
        this.visible = offsetTop < OFFSET_HEIGHT;
      },

      keep(width) {
        var _this = this;
        var display = _this.$refs.nav_target.style.display;
        if (width >= 960 && display === 'none') {
          _this.$refs.nav_target.style.display = 'block';
          this.$refs.search.style.display = 'flex';
        }
      }

    },

    created() {
      this.get_nav_top();
      this.logo = document.logo
    },

    mounted() {
    this.get_user_GD()


      window.onresize = () => {
        return (() => {
          this.keep(document.body.clientWidth);
        })();
      };
      window.addEventListener('scroll', this.handleScroll);
      document.addEventListener('mouseup', (e) => {
        const _this = this;
        let tree = _this.$refs.more;
        let my = _this.$refs.my;
        if (tree) {
          if (!tree.contains(e.target)) {
            _this.show = false;
            _this.angle1 = 0;
          }
        }
        if (my) {
          if (!my.contains(e.target)) {
            _this.my_show = false;
            _this.angle2 = 0;
          }
        }
      });
    },

    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },

  };

</script>

<style scoped="scoped">

  .header_warp {
    background-color: var(--color_primary);
    height: 4rem;
    color: white;
    font-weight: 600;
    box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.15);
  }

  .my_header {
    display: block;
    height: 4rem;
  }

  .logo {
    font-size: 1.3rem;
    float: left;
    height: 4rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav_list {
    float: left;
  }

  .caret {
    margin-left: 0.875rem;
    display: inline-block;
    width: 0;
    height: 0;
    vertical-align: middle;
    border-top: 4px dashed;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    transition: transform 0.2s;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    transform: translateY(-60px);
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    float: left;
    list-style: none;
  }

  li a {
    color: #ddd;
    height: 4rem;
    width: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .more {
    height: 4rem;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .caret:hover,
  .more:hover {
    cursor: pointer;
    color: #909399;
  }

  .dropdown {
    position: absolute;
    top: 5rem;
    left: -1.5rem;
    height: auto;
    background-color: white;
    width: 8rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    display: flex;
    border-radius: 0.3rem;
    flex-direction: column;
    font-size: 0.8rem;
  }

  .dropdown .my_item a {
    color: #000 !important;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
  }

  .dropdown .my_item a:hover {
    border-radius: 0.3rem;
    color: #fff !important;
  }

  .dropdown .my_item div {
    color: #000 !important;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    cursor: pointer;
  }

  .dropdown .my_item div:hover {
    border-radius: 0.3rem;
    color: #fff !important;
  }

  .dropdown .my_item:hover {
    background-color: #909399;
  }

  .dropdown .item a {
    color: #000 !important;
    margin: auto;
    height: 3rem;
    width: 100%;
  }

  .dropdown .item a:hover {
    border-radius: 0.3rem;
    color: #fff !important;
    background-color: #909399;
  }

  .user {
    position: relative;
    margin-left: 2rem;
    height: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    float: right;
   /* width: 6rem;*/
    margin-right: 1rem;
  }

  .own:hover {
    color: #909399;
    cursor: pointer;
  }

  .search-box {
    width: 15rem;
    height: 4rem;
    float: right;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .search_pic {
    width: 1rem;
    height: 1rem;
  }

  .user_pr {
    display: flex;
}

.img_box {
    width: 50px;
    height: 50px;
}

img.user_img {
    width: 100%;
    object-fit: contain;
}

span.own_text {
    display: block;
    text-align: center;
    line-height: 50px;
    padding-left: 15px;
}



  .search-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    background: #909399;
    border: 0;
    opacity: 1;
    border-radius: 0 4px 4px 0;
  }

  .search-btn:hover {
    cursor: pointer;
  }

  .search-txt {
    height: 2.5rem;
    background: #FFFFFF;
    border: 1px solid #ddd;
    opacity: 1;
    border-right: none;
    border-radius: 4px 0 0 4px;
    width: 12.5rem
  }

  .mini_nav {
    display: none;
  }

  @media (max-width: 1200px) {

    .search-box {
      width: 10rem;
    }

    .search-txt {
      width: 7.5rem
    }

    .user {
      margin-left: 0;
    }
  }

  @media (max-width: 960px) {

    .nav_list {
      color: var(--color_primary);
      padding-top: 3.5rem;
      background-color: white;
      display: none;
      position: absolute;
      top: 5rem;
      right: 6rem;
      width: 12rem;
      /*height: 20rem;*/
      border-radius: 0.5rem;
      box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.15);
    }

    .nav_list ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .dropdown {
      left: -2rem;
    }

    .search-box {
      position: absolute;
      top: 5rem;
      right: 7rem;
      display: none;
    }


    .mini_nav {
      float: right;
      width: 4rem;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dropdown {
      left: -4rem;
      width: 12rem;
    }

    .user .dropdown {
      left: -3rem;
      width: 8rem;
    }

  }

</style>

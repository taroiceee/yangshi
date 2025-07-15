<template>
	<div class="my_home_page" id="my_home_page">
    <div class="my_home">
      <div class="user_info">
        <div class="user_info_left">
          <img class="user_avatar" :src="userInfo.avatar?$fullUrl(userInfo.avatar):'http://192.168.1.4:5000/upload/default_avatar.jpg'" />
          <div class="user_name">
            <div class="user_name_item name">{{userInfo.nickname}}</div>
            <div class="user_name_item">账号: {{userInfo.username}}</div>
            <div class="">邮箱: {{userInfo.email}}</div>
          </div>
        </div>
        <div class="user_info_center">
          <div class="user_num_item">
            <div class="user_num">{{myFollow.length}}</div>
            <div class="user_num_name">关注</div>
          </div>
          <div class="user_num_item">
            <div class="user_num">{{followSelf.length}}</div>
            <div class="user_num_name">粉丝</div>
          </div>
        </div>
        <div v-if="now_follower_id != $store.state.user.user_id" class="user_info_right">
          <el-button type="primary" @click="myAttention(userInfo)">{{followState?'已关注':'+ 关注'}}</el-button>
          <el-button type="primary" plain>发私信</el-button>
        </div>
      </div>

      <div class="user_content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动态" name="动态">
            <template v-for="(item) in dynamicList">
              <div v-if="item.type === 'forum'" @click="goPage(item)" class="dynamic">
                <div class="dynamic_content_title">
                  <div class="title_content">{{item.title}}</div>
                  <div class="title_time">{{$toTime(item.create_time,"yyyy-MM-dd hh:mm:ss")}}</div>
                </div>
                <div class="dynamic_content">
                  <img v-if="item.img" class="dynamic_img" :src="$fullUrl(item.img)" alt="">
                  <div class="dynamic_info">
                    <div class="dynamic_text" v-html="item.content"></div>
                    <div class="dynamic_sum">
                      <div class="dynamic_btn">
                        <el-button @click.stop="add_praise(item)" type="primary" size="small" plain>
                          <i class="el-icon-thumb" style="font-size: 14px"></i>
                          <span>点赞</span>
                        </el-button>
                        <el-button @click.stop="add_collect(item)" type="primary" size="small">
                          <i v-if="true" class="el-icon-star-on" style="font-size: 14px"></i>
                          <i v-else class="el-icon-star-off" style="font-size: 14px"></i>
                          <span>收藏</span>
                        </el-button>
                      </div>
                      <div class="dynamic_statistics">
                        <div class="dynamic_statistics_item">点击数: {{item.hits}}</div>
                        <div class="">点赞数: {{item.praise_len}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
								  <div v-if="item.type === 'customized_productsProducts'" @click="goPage(item)" class="dynamic">
													    <div class="dynamic_content_title">
			      <div class="title_content">{{item.name_of_commodity}}</div>
			      <div class="title_time">{{$toTime(item.create_time,"yyyy-MM-dd hh:mm:ss")}}</div>
			    </div>
						    <div class="dynamic_content">
																							      <img v-if="item.commodity_cover" class="dynamic_img" :src="$fullUrl(item.commodity_cover)" alt="">
						      <div class="dynamic_info">
			        <!--<div class="dynamic_text">{{ item.classification_name }}</div>-->
			        <div class="dynamic_sum">
			          <div class="dynamic_btn">
					            <el-button @click.stop="add_praise(item)" type="primary" size="small" plain v-if="$check_action('/customized_products/details','set')">
			              <i class="el-icon-thumb" style="font-size: 14px"></i>
			              <span>点赞</span>
			            </el-button>
							            <el-button @click.stop="add_collect(item)" type="primary" size="small" v-if="$check_action('/customized_products/details','set')">
			              <i v-if="true" class="el-icon-star-on" style="font-size: 14px"></i>
			              <i v-else class="el-icon-star-off" style="font-size: 14px"></i>
			              <span>收藏</span>
			            </el-button>
					          </div>
			          <div class="dynamic_statistics">
			            <div class="dynamic_statistics_item">点击数: {{item.hits}}</div>
			            <div class="">点赞数: {{item.praise_len}}</div>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
								            </template>
          </el-tab-pane>
          <el-tab-pane label="关注" name="关注">
            <div v-for="item in myFollow" :key="item.follow_id" class="attention">
              <div class="attention_user">
                <img class="attention_img" :src="item.followed_avatar?$fullUrl(item.followed_avatar):'http://192.168.1.4:5000/upload/default_avatar.jpg'" alt="" />
                <div>{{item.followed_nickname}}</div>
              </div>
              <div>
                <el-button v-if="now_follower_id == $store.state.user.user_id" type="primary" size="small" round plain @click="cancelAttention(item)">已关注</el-button>
                <el-button type="primary" size="small" round plain @click="goPage(item)">查看主页</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="粉丝" name="粉丝">
            <div v-for="item in followSelf" :key="item.follow_id" class="attention">
              <div class="attention_user">
                <img class="attention_img" :src="item.follower_avatar?$fullUrl(item.follower_avatar):'http://192.168.1.4:5000/upload/default_avatar.jpg'" alt="" />
                <div>{{item.follower_nickname}}</div>
              </div>
              <div>
                <el-button v-if="now_follower_id == $store.state.user.user_id" type="primary" size="small" round plain @click="attention(item)">{{item.isFollow?'互相关注':'+ 关注'}}</el-button>
                <el-button type="primary" size="small" round plain @click="goPage(item)">查看主页</el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
	</div>
</template>
<script>
// import mixin from "@/mixins/component.js";
import mixin from "@/mixins/page.js";

export default {
  mixins: [mixin],
	data() {
		return {
			activeName: '动态',
			userInfo: {},
			dynamicList: [],
			followList: [],
			followSelf: [],
			myFollow: [],
			oneSelf: null,
			followState: false,
			now_follower_id: 0,
      query: {
        orderby: `create_time desc`,
      }
		}
	},
  watch: {
    '$route.query': {
      handler(newQuery) {
        if(newQuery.follower_id) {
          this.now_follower_id = newQuery.follower_id;
          
          this.getUserInfo(this.now_follower_id);
          this.getDynamicList(this.now_follower_id);
        }
      },
      immediate: true,
      deep: true
    }
  },
	mounted() {
		// this.now_follower_id = this.$route.query.follower_id || UserInfo.user_id;
		// this.getUserInfo(this.now_follower_id);
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		},
		async getUserInfo(userId) {
			let res = await this.$get("~/api/user/get_obj",{user_id: userId})
			this.userInfo = res.result.obj;
			this.getFollowList();
		},
		async getFollowList() {
			let res = await this.$get('~/api/follow/get_list',this.query)
			this.followList = res.result.list;
			this.myFollow = res.result.list.filter(item => item.follower_id == this.now_follower_id);
			this.oneSelf = res.result.list.filter(item => item.follower_id == this.$store.state.user.user_id && item.followed_id == this.now_follower_id)[0];
			this.followSelf = res.result.list.filter(item => item.followed_id == this.now_follower_id).map(item => {
				// 根据myFollow遍历是否互相关注
				let isFollow = this.myFollow.some(item2 => item2.follower_id === item.followed_id && item2.followed_id === item.follower_id);
				return {
				...item,
				  isFollow: isFollow
				}
			});

			if(this.oneSelf) {
				this.followState = true;
			}else{
				this.followState = false;
			}
			console.log(this.myFollow,'我的关注');
			console.log(this.followSelf,'我的粉丝');
		},
    async getDynamicList(userId) {
      let params = Object.assign({}, this.query, {
        user_id: userId
      });
	  let forum = await this.$get('~/api/forum/get_list', params);
	  let forumList = forum.result.list.map(item => ({
	    ...item,
	    type: 'forum'
	  }));
						  let params5 = Object.assign({}, this.query, { business_user: userId });
	  let customized_productsProducts = await this.$get('~/api/customized_products/get_list', params5);
	  let customized_productsProductsList = customized_productsProducts.result.list.map(item => ({
	    ...item,
	    type: 'customized_productsProducts'
	  }));
								      this.dynamicList = [
		  ...forumList,
							   ...customized_productsProductsList,
										];
    },
    async attention(obj) {
      let param = {
        follower_id: this.$store.state.user.user_id,
        follower_avatar: this.$store.state.user.avatar,
        follower_nickname: this.$store.state.user.nickname,
        followed_id: obj.follower_id || obj.user_id,
        followed_avatar: obj.follower_avatar || obj.avatar,
        followed_nickname: obj.follower_nickname || obj.nickname,
      }
      if(obj.isFollow || this.followState) {
      	this.$confirm("不再关注该用户？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          let oneself = this.myFollow.find(item => item.followed_id === obj.follower_id && item.follower_id === obj.followed_id);
          let res = await this.$get(`~/api/follow/del?follow_id=${oneself.follow_id}`);
          if(res.result) {
            this.getUserInfo(this.now_follower_id);
            this.getDynamicList(this.now_follower_id);
            this.$message.success("取消关注");
          }
        }).catch(() => {})
      }else {
        let res = await this.$post('~/api/follow/add', param);
        if(res.result) {
          this.getUserInfo(this.now_follower_id);
          this.getDynamicList(this.now_follower_id);
          this.$message.success("关注成功");
        }
      }
    },
    cancelAttention(obj) {
    	this.$confirm("不再关注该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
      	let res = await this.$get(`~/api/follow/del?follow_id=${obj.follow_id}`);
        if(res.result) {
          this.getUserInfo(this.now_follower_id);
          this.getDynamicList(this.now_follower_id);
          this.$message.success("取消关注");
        }
      })
    },
    async myAttention(obj) {
    	let param = {
        follower_id: this.$store.state.user.user_id,
        follower_avatar: this.$store.state.user.avatar,
        follower_nickname: this.$store.state.user.nickname,
        followed_id: obj.follower_id || obj.user_id,
        followed_avatar: obj.follower_avatar || obj.avatar,
        followed_nickname: obj.follower_nickname || obj.nickname,
    	}
      if(this.followState) {
      	this.$confirm("不再关注该用户？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
        	let res = await this.$get(`~/api/follow/del?follow_id=${this.oneSelf.follow_id}`);
          if(res.result) {
            this.getUserInfo(this.now_follower_id);
            this.getDynamicList(this.now_follower_id);
            this.$message.success("取消关注");
          }
        })
      }else {
        let res = await this.$post('~/api/follow/add', param);
        if(res.result) {
          this.getUserInfo(this.now_follower_id);
          this.getDynamicList(this.now_follower_id);
          this.$message.success("关注成功");
        }
      }
    },
    goPage(obj) {
      if(this.activeName === '关注') {
        this.$router.push('/my_home_page?follower_id=' + obj.followed_id);
      }else if(this.activeName === '粉丝') {
        this.$router.push('/my_home_page?follower_id=' + obj.follower_id);
      }else if(this.activeName === '动态') {
        if(obj.type === 'forum') {
          this.$router.push('/forum/details?forum_id=' + obj.forum_id);
        }
							if(obj.type === 'customized_productsProducts') {
          this.$router.push('/customized_products/details?customized_products_id=' + obj.customized_products_id);
        }
								      }
    },
    async add_praise(obj) {
      if(obj.type === 'forum') {
        let res = await this.$get("~/api/praise/count",{
          source_table: "forum",
          source_field: "forum_id",
          source_id: obj.forum_id,
          user_id: this.$store.state.user.user_id,
        })
        if (res.result || res.result === 0) {
          console.log("sadsfasf", res.result);
          let check_praised = res.result? true : false;
          let param = {
            source_table: "forum",
            source_field: "forum_id",
            source_id: obj.forum_id,
            user_id: this.$store.state.user.user_id,
          }
          if (!check_praised) {
            let praiseRes = await this.$post("~/api/praise/add", param);
            if (praiseRes.result) {
              let praise_len = obj.praise_len += 1;
              let forumRes = await this.$post("~/api/forum/set?forum_id=" + obj.forum_id, {
                praise_len,
              })
              if (forumRes.result) {
                console.log("添加点赞数状态：", forumRes.result);
              } else if (forumRes.error) {
                console.error(forumRes.error);
              }
              this.getDynamicList(this.now_follower_id)
              this.$message.success("点赞成功");
            }else if (praiseRes.error) {
              this.$message.error(praiseRes.error.message);
              console.error(praiseRes.error);
            }
          }else {
            let res = await this.$get("~/api/praise/del",param);
            if (res.result) {
              if(obj.praise_len > 0) {
              	obj.praise_len -= 1;
              }else{
              	obj.praise_len = 0;
              }
              let praise_len = obj.praise_len;
              let forumRes = await this.$post("~/api/forum/set?forum_id=" + obj.forum_id, {
                praise_len,
              })
              if (forumRes.result) {
                console.log("取消点赞数状态：", forumRes.result);
              } else if (forumRes.error) {
                console.error(forumRes.error);
              }
              this.getDynamicList(this.now_follower_id)
              this.$message.success("取消点赞");
            }else if (res.error) {
              this.$message.error(res.error.message);
              console.error(res.error);
            }
          }
        }else if (res.error) {
          this.$message.error(res.error.message);
          console.error(res.error);
        }
      }
						  if(obj.type === 'customized_productsProducts') {
      	let res = await this.$get("~/api/praise/count",{
          source_table: "customized_products",
          source_field: "customized_products_id",
          source_id: obj.customized_products_id,
          user_id: this.$store.state.user.user_id,
        })
        if (res.result || res.result === 0) {
          console.log("sadsfasf", res.result);
          let check_praised = res.result? true : false;
          let param = {
            source_table: "customized_products",
            source_field: "customized_products_id",
            source_id: obj.customized_products_id,
            user_id: this.$store.state.user.user_id,
          }
          if (!check_praised) {
            let praiseRes = await this.$post("~/api/praise/add", param);
            if (praiseRes.result) {
              let praise_len = obj.praise_len += 1;
              let customized_productsRes = await this.$post("~/api/customized_products/set?customized_products_id=" + obj.customized_products_id, {
                praise_len,
              })
              if (customized_productsRes.result) {
                console.log("添加点赞数状态：", customized_productsRes.result);
              } else if (customized_productsRes.error) {
                console.error(customized_productsRes.error);
              }
              this.getDynamicList(this.now_follower_id)
              this.$message.success("点赞成功");
            }else if (praiseRes.error) {
              this.$message.error(praiseRes.error.message);
              console.error(praiseRes.error);
            }
          }else {
            let res = await this.$get("~/api/praise/del?",param);
            if (res.result) {
              if(obj.praise_len > 0) {
              	obj.praise_len -= 1;
              }else{
              	obj.praise_len = 0;
              }
              let praise_len = obj.praise_len;
              let customized_productsRes = await this.$post("~/api/customized_products/set?customized_products_id=" + obj.customized_products_id, {
                praise_len,
              })
              if (customized_productsRes.result) {
                console.log("取消点赞数状态：", customized_productsRes.result);
              } else if (customized_productsRes.error) {
                console.error(customized_productsRes.error);
              }
              this.getDynamicList(this.now_follower_id)
              this.$message.success("取消点赞");
            }else if (res.error) {
              this.$message.error(res.error.message);
              console.error(res.error);
            }
          }
        }else if (res.error) {
          this.$message.error(res.error.message);
          console.error(res.error);
        }
      }
								    },
    async add_collect(obj) {
      if(obj.type === 'forum') {
        let res = await this.$get("~/api/collect/count",{
          source_table: "forum",
          source_field: "forum_id",
          source_id: obj.forum_id,
          user_id: this.$store.state.user.user_id,
        })
        let check_collected = res.result;
        let { title, img, forum_id } = obj;
        let body = {
          title,
          img,
          source_table: "forum",
          source_field: "forum_id",
          source_id: forum_id,
          user_id: this.$store.state.user.user_id,
        }
        if (!check_collected) {
          await this.$post("~/api/collect/add", body);
          this.$message.success("收藏成功");
        }else {
          await this.$get("~/api/collect/del", {
            user_id: this.$store.state.user.user_id,
            source_id: forum_id,
          });
          this.$message.success("取消收藏");
        }
      }
						  if(obj.type === 'customized_productsProducts') {
      	let res = await this.$get("~/api/collect/count",{
          source_table: "customized_products",
          source_field: "customized_products_id",
          source_id: obj.customized_products_id,
          user_id: this.$store.state.user.user_id,
        })
        let check_collected = res.result;
        let { title, img, customized_products_id } = obj;
        let body = {
	  					  		          title: obj.name_of_commodity,
					  					  				          img: obj.commodity_cover,
			  					  					  					  					  					  					  					  					  					  					  					            source_table: "customized_products",
          source_field: "customized_products_id",
          source_id: customized_products_id,
          user_id: this.$store.state.user.user_id,
        }
        if (!check_collected) {
          await this.$post("~/api/collect/add", body);
          this.$message.success("收藏成功");
        }else {
          await this.$get("~/api/collect/del", {
            user_id: this.$store.state.user.user_id,
            source_id: customized_products_id,
          });
          this.$message.success("取消收藏");
        }
      }
								    }
	}
}
</script>

<style lang="less" scoped>
.my_home_page {
  margin-left: 5%;
  .my_home {
    width: 60%;
    margin: 100px auto 20px;
    .user_info {
      display: flex;
      align-items: end;
      justify-content: space-between;
      margin-bottom: 30px;
      .user_info_left {
       display: flex;
       align-items: end;
       .user_avatar {
          width: 80px !important;
          height: 80px !important;
          border-radius: 4px;
          margin-right: 20px
        }
        .user_name {
         font-size: 14px;
         color: #bababa;
         .user_name_item {
          margin-bottom: 8px;
         }
         .name {
          font-size: 18px;
          font-weight: 600;
          color: #303133;
         }
        }
      }
      .user_info_center {
       width: 20%;
       display: flex;
       align-items: center;
       justify-content: space-around;
       .user_num_item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .user_num {
          font-size: 18px;
          font-weight: 600;
          color: #303133;
          margin-bottom: 12px;
        }
       .user_num_name {
          font-size: 14px;
        }
       }
      }
    }
    .user_content {
      min-height: 600px;
      .dynamic {
        margin-bottom: 40px;
        .dynamic_content_title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 14px 0;
          .title_content {
            font-size: 16px;
            font-weight: 600;
            color: #303133;
          }
        .title_time {
            font-size: 14px;
            color: #bababa;
          }
        }
        .dynamic_content {
          display: flex;
          align-items: start;
          justify-content: start;
          .dynamic_img {
            width: 200px;
            height: 140px;
            border-radius: 4px;
            margin-right: 20px;
          }
          .dynamic_info {
            flex: 1;
            height: 140px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .dynamic_text {
              line-height: 24px;
            }
            .dynamic_sum {
              display: flex;
              align-items: center;
              justify-content: space-between;
              // .dynamic_btn {}
              .dynamic_statistics {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                color: #bababa;
                .dynamic_statistics_item {
                margin-right: 20px;
                }
              }
            }
          }
        }
      }
      .attention {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
       .attention_user {
          display: flex;
          align-items: center;
          justify-content: start;
         .attention_img {
            width: 60px;
            height: 60px;
            border-radius: 100%;
            margin-right: 20px;
          }
       }
      }
    }
    .my_home_pagination {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

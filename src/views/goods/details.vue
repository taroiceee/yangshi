<template>
  <div class="page_goods goods_det" id="goods_details">
    <div class="warp" v-if="$check_action('/goods/details', 'get')">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-10">
            <div class="pr-md-2">
              <!-- 商品详情 -->
              <div class="card_div_goods">
                <div_goods :obj="obj" :list_img="list_img"></div_goods>
              </div>
              <div class="card_bottom_goods">
                <div class="options pl-3">
                  <span
                    @click="selected_index = 1"
                    :class="{ selected: selected_index === 1 }"
                    >详情</span
                  >
                  <span
                    @click="selected_index = 2"
                    :class="{ selected: selected_index === 2 }"
                    >评论</span
                  >
                </div>
                <div v-if="selected_index === 2" class="comment_box">
                  <list_comment
                    class="w-100"
                    :list="list_comment"
                    :obj="form_comment"
                  ></list_comment>

                  <!-- 分页器 -->
                  <b-pagination-nav
                    :base-url="$route.path"
                    :number-of-pages="count_pages"
                    :link-gen="link_gen"
                    @change="change_page"
                    first-number
                    last-number
                  ></b-pagination-nav>


                  <div class="form_editor">
                    <div class="fl ml-3" v-show="form_comment.reply_to_id">
                      对 <i>{{ respondent }}</i> 回复
                    </div>
                    <div class="fr mr-3" v-show="form_comment.reply_to_id">
                      <b-button
                        variant="outline-primary"
                        size="sm"
                        @click="form_comment.reply_to_id = 0"
                        ><span>重置回复人</span></b-button
                      >
                    </div>
                    <form_editor
                      class="fn"
                      :form="form_comment"
                      :publish_flag = "publish_flag"
                      @update_comment="update_comment"
                    ></form_editor>
                  </div>
                </div>

                <div class="goods_desc_box" v-else>
                  <div class="goods_detail_item" v-for="o in customize_field_list()" :key="o">
                    <label>{{o.field_name+" : "}}</label>
                    <span v-if="o.type==='image'">
                                            <img style="height: 150px" :src="$fullUrl(o.field_value)" v-if="o.field_value" />
                                        </span>
                    <span v-else-if="o.type==='video'">
                                            <router-link :to="'/media/video?filename=' + $fullUrl(o.field_value)" v-if="o.field_value" >
                                                <span>
                                                    查看视频
                                                </span>
                                            </router-link>
                                        </span>
                    <span v-else-if="o.type==='audio'">
							                <audio v-if="o.field_value" style="text-align: left" :src="$fullUrl(o.field_value)" controls></audio>
                                        </span>
                    <span v-else-if="o.type==='file'">
							                <a :href="$fullUrl(o.field_value)" v-if="o.field_value" target="_blank" style="color: rgb(64, 158, 255);">点击下载</a>
                                        </span>
                    <span v-else-if="o.type==='date'">
							                {{$toTime(o.field_value,"yyyy-MM-dd")}}
                                        </span>
                    <span v-else-if="o.type==='time'">
							                {{$toTime(o.field_value,"hh:mm:ss")}}
                                        </span>
                    <span v-else-if="o.type==='datetime'">
							                {{$toTime(o.field_value,"yyyy-MM-dd hh:mm:ss")}}
                                        </span>
                    <span v-else-if="o.type==='uid'">
                                            {{get_user_obj(o.field_value)}}
                                        </span>
                    <span v-else>{{o.field_value}}</span>
                  </div>
                  <div class="goods_detail_editor" v-html="obj.content"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-2">
            <div class="card_aside">
              <h5>今日推荐</h5>
              <list_goods_hot :list="list_hot"></list_goods_hot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "../../mixins/page.js";
import list_goods_hot from "../../components/diy/list_goods_hot.vue";
import list_comment from "../../components/diy/list_comment.vue";
import div_goods from "../../components/diy/div_goods.vue";
import form_editor from "../../components/diy/form_editor.vue";
export default {
  mixins: [mixin],
  components: {
    list_comment,
    list_goods_hot,
    div_goods,
    form_editor,
  },
  data() {
    return {
      url_get_obj: "~/api/goods/get_obj?",
      query: {
        goods_id: 0,
      },
      list_comment: [],
      list_hot: [],
      selected_index: 2,
      form_comment: {
        source_table: "goods",
        source_field: "goods_id",
        source_id: 0,
        reply_to_id: 0,
        content:''
      },
      // 页面数
      count_pages: 1,
      // 是否设置过
      seted_count_pages: true,
      obj: {
        goods_id: 0,
        title: "",
        img: "",
        description: "",
        price_ago: 0,
        price: 0,
        integral:0,
        sales: 0,
        inventory: 0,
        type: "",
        hits: 0,
        content: '',
        create_time: "2021-02-20 20:48:07",
        update_time: "2021-03-30 17:48:07",
        img_1: "",
        img_2: "",
        img_3: "",
        img_4: "",
        img_5: "",
        source_table: "",
        source_field: "",
        source_id: 0,
        num_buy: 1,
        customize_field:"",
        user_id:0
      },
      publish_flag:false,
      user_list:0
    };
  },
  methods: {
    /**
     * 获取评论后
     * @param {Object} json 响应对象
     */
    get_obj_after(json) {
      var obj = json.result.obj;
      this.get_comment(obj);
      obj.num_buy = 1;
      this.form_comment.source_id = obj.goods_id;
      this.$get("~/api/order/get_obj?", {"goods_id":obj.goods_id,"user_id":this.$store.state.user.user_id,"state":"已付款"}, (json) => {
        if (json.result && json.result.obj) {
          this.publish_flag = true
        }
      })
    },
    /**
     * 获得热门商品
     */
    get_hot_goods() {
		let url = "~/api/goods/get_list?";
		let param = {
			page: 1,
			size: 5,
			orderby: "hits"
		};
												      this.$get(
        url,
        param,
        (res) => {
          if (res.result) {
            this.list_hot = res.result.list.slice(0,5);
          }
        }
      );
    },
    /**
     * 更新评论
     */
    update_comment() {
      this.get_comment(this.obj);
    },

    /**
     * 获取评论
     * @param { Object } obj 文章对象
     * @param { Number } page 分页数
     * @param { Number } size 评论显示条数
     */
    get_comment(obj, page = 1, size = 5) {
      this.$get(
        "~/api/comment/get_list?",
        {
          source_table: "goods",
          source_field: "goods_id",
          source_id: obj.goods_id,
          page,
          size,
          orderby: "create_time desc",
          reply_to_id: "0",
        },
        (json) => {
          if (json.result) {
            var list_comment = json.result.list;
            list_comment.map(o=>{
              o.list_reply = []
            })
            this.add_reply(list_comment).then((list) => {
              this.list_comment = list;
            });
            // 分页器
            if (this.seted_count_pages) {
              this.seted_count_pages = false;
              this.count_pages = Math.ceil(json.result.count / size);
            }
          }
        }
      );
    },
    /**
     * @param { Array } list 评论列表
     * 添加回复到评论列表
     */
    add_reply(list) {
      return new Promise((resolve) => {
        for (let idx = 0; idx < list.length; idx++) {
          const obj = list[idx];
          this.$get(
            "~/api/comment/get_list?",
            {
              source_table: "goods",
              source_field: "goods_id",
              source_id: obj.goods_id,
              orderby: "create_time desc",
              reply_to_id: obj.comment_id,
            },
            (res) => {
              if (res.result) {
                obj.list_reply = res.result.list;
              }
            }
          );
        }
        resolve(list);
      });
    },
    /**
     * 分页器
     * @param { Number } page_num 分页数
     * @return { Object } 查询对象
     */
    link_gen(page_num) {
      return {
        query: this.query,
      };
    },
    /**
     * 加载下一页
     */
    change_page(page_num) {
      this.get_comment(this.obj, page_num);
      this.form_comment.reply_to_id = 0;
    },
    // 获得商品轮播图
    customize_field_list: function() {
      if (this.obj.customize_field) {
        let list_fields = JSON.parse(this.obj.customize_field)
        return list_fields;
      }
      return []
    },
    async get_user_list(){
      let _this = this;
      _this.user_list = 0;
      let user_json = await this.$get("~/api/user/get_list", );
      if (user_json.result && user_json.result.list) {
        _this.user_list = user_json.result.list;
      }
    },
    get_user_obj(user_id) {
      let result = "";
      for (let i = 0; i < this.user_list.length; i++) {
        if (user_id == this.user_list[i].user_id) {
          result = this.user_list[i].nickname + "-" + this.user_list[i].username
          break;
        }
      }
      console.log(result)
      return result;
    }
  },
  computed: {
    /**
     * 获得图片列表
     */
    list_img() {
      var { img_1, img_2, img_3, img_4 } = this.obj;
      var list_img = [];
      if (img_1) {
        list_img.push(img_1);
      }
      if (img_2) {
        list_img.push(img_2);
      }
      if (img_3) {
        list_img.push(img_3);
      }
      if (img_4) {
        list_img.push(img_4);
      }
      return list_img;
    },
    respondent() {
      var reply_to_id = this.form_comment.reply_to_id;
      var respondent = "";
      this.list_comment.map((o) => {
        if (o.comment_id === reply_to_id) {
          respondent = o.nickname;
        }
      });
      return respondent;
    },
  },
  mounted() {
    this.get_hot_goods();
    this.get_user_list();
  },
};
</script>

<style scoped>
.card_bottom_goods {
  margin-top: 60px;
  padding: 5px;
  border: 1px solid #eee;
}
.options {
  font-size: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}
.options span {
  cursor: pointer;
  padding-right: 40px;
  font-weight: 600;
}
.options span.selected {
  color: var(--color_primary);
}
.options span:hover {
  color: var(--color_primary);
}
.form_editor {
  padding: 10px;
}
.comment_box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

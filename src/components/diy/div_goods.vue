<template>
    <div class="div_goods container">
        <div class="row gods">
            <div class="col-12 col-md-6">
                <div class="card_img pl-1 pr-1 pl-md-0 pr-md-2">
                    <div class="list_sm_img">
                        <!-- list_img -->
                        <div class="item" v-for="(o, i) in list_img" :key="i">
                            <div :class="['sm_figure',currentNum==i?'little_goodspic_act':'']" @click="choose_img(o,i)">
                                <img
                                    :src="$fullUrl(o) "
                                    style="width: 100%; max-height: 100%;"
                                       box-shadow
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <!-- 商品内容 -->
                <div class="card_goods_info">
                    <div class="titile_t">
                        <span class="goods_name">{{ obj.title }}</span>
                        <div class="description">{{ obj.description }}</div>
                    </div>
                    <div class="figure">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <!-- swiper_img2测试时看效果 正式环境数组换成list_img -->
                                <div class="swiper-slide" v-for="(o, i) in list_img" :key="i">
                                    <img :src="$fullUrl(o)"  class="main_img"
                                    v-default-img="'../../../public/img/default.png'" />
                                </div>
                            </div>
                        </div>
                    </div>
                   <div class="price_b">
                       <div class="price_block">
                           <div class="price_item">
                               <span class="price">￥{{ obj.price }}</span>
                               <span class="price_ago">￥{{ obj.price_ago }}</span>
                           </div>
                           <score_star :score="score"/>
                       </div>
                        <div class="sales">已卖{{ sales_num }}</div>
                        <div class="sales">库存{{ obj.inventory }}</div>
											<div class="sales" style="display: flex;flex-direction: column;align-items: end;">
							<scoreStatisticsChart :obj="obj" :refreshScore="refreshScore" sourcetable="goods" sourcefield="goods_id" />
							<div style="display: flex;align-items: center;">
								<span>评分:</span>
								<el-rate
									v-model="own_score_num"
									show-text
									:texts="['很差','较差','还行','推荐','力荐']"
									@change="setRating"
									:disabled="scoreReadOnly"
								/>
							</div>
						</div>
			                       <div class="bottom_handle">
                           <div class="num_buy_block">
                               <div class="subtract" @click="sub_num(obj)">
                                   <span>-</span>
                               </div>
                               <div class="num">
                                   {{ obj.num_buy }}
                               </div>
                               <div class="add" @click="add_num(obj)">
                                   <span>+</span>
                               </div>
                           </div>
                                                  <div v-if="user.user_id && (!obj.source_table||$check_cart_page('/'+obj.source_table+'/details'))"
                               class="buy"
                               style="width: 80px;font-size: 14px;margin-left: 10px"
                               @click="add_order()">
                            <span>立即购买</span>
                          </div>
                                                      <div v-if="obj.integral > 0" class="buy" style="font-size: 14px;margin-left: 10rem"
                               @click="add_integral_order">
                            <span>{{ obj.integral }}积分兑换</span>
                          </div>
                                                      <div
                              class="buy"
                              style="width: 95px;font-size: 14px;margin-left: 10rem"
                              @click="$router.push(`./coupon?userId=${obj.user_id}`)">
                            <span>领取优惠券</span>
                          </div>
                        						                           <!-- 购物车 -->
                           <div class="cart" v-if="user.user_id && (!obj.source_table||$check_cart_page('/'+obj.source_table+'/details'))" @click="add_cart()">
                               <b-icon icon="cart"/>
                           </div>

                           <!-- 收藏 -->
                           <div class="collect" v-if="user.user_id" @click="add_collect()">
                               <b-icon
                                       style="color: var(--color_primary)"
                                       v-if="check_collected"
                                       icon="heart-fill"
                               />
                               <b-icon v-else icon="heart"/>
                           </div>
                           <div class="collect" v-else @click="$router.push('/account/login')">
                               <b-icon
                                       style="color: var(--color_primary)"
                                       v-if="check_collected"
                                       icon="heart-fill"
                               />
                               <b-icon v-else icon="heart"/>
                           </div>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let mySwiper;
    import score_star from "@/components/diy/score_star.vue";
    import mixin from "@/mixins/component.js";
    import PicZoom from 'vue-piczoom'
      		import scoreStatisticsChart from "@/components/charts/score_statistics_chart";
	    export default {
        mixins: [mixin],
        props: {
            obj: {
                type: Object,
                default: function () {
                    return {};
                },
            },
            vm: {
                type: Object,
                default: function () {
                    return {
                        goods_id: "goods_id",
                        title: "title",
                        img: "img",
                        description: "description",
                        price_ago: "price_ago",
                        price: "price",
                        integral: "integral",
                        sales: "sales",
                        inventory: "inventory",
                        type: "type",
                        hits: "hits",
                        content: "content",
                        create_time: "create_time",
                        update_time: "update_time",
                        img_1: "img_1",
                        img_2: "img_2",
                        img_3: "img_3",
                        img_4: "img_4",
                        img_5: "img_5",
                        source_table:"source_table"
                    };
                },
            },
            list_img: {
                type: Array,
                default() {
                    return [];
                },
            },
        },
        components: {
            score_star, PicZoom,
								scoreStatisticsChart,
		        },
        data() {
            return {
                img_lg: "",
                currentNum:0,
                swiper_img2:[
					"https://dcdn.yuyuebus.com/front/img/buychoose.png",
					"https://dcdn.yuyuebus.com/front/img/buychoosenone.png",
					"https://dcdn.yuyuebus.com/front/img/buylocation.png",
					"https://dzgj.yuyuebus.com/static/front/dist/static/img/icon-question.png",
					"https://dcdn.yuyuebus.com/front/img/buychoose.png",
				],
                score: 4.5,
                img_show: false,
                check_collected: false,
                address_promise: {},
                vip_discount:0,
									scoreReadOnly: false,
				refreshScore: false,
				own_score_num: 0,
		                sales_num:0,
            };
        },
        methods: {
								// 提交评分
			setRating(num) {
			  const user_id = this.$store.state.user.user_id;
			  const goods_id = this.obj.goods_id;
			  const params = {
				source_table: "goods",
				source_field: "goods_id",
				score_num: num,
				source_id: goods_id,
				user_id,
			  };
			  this.$post("~/api/score/add?", params, (res) => {
				this.scoreReadOnly = true;
						this.refreshScore = true;
				this.$toast("评分成功");
			  });
			},
				// 查询个人评分
			async getOwnScore() {
			  const url = "~/api/score/get_obj";
			  const user_id = this.$store.state.user.user_id;
			  const params = {
				source_table: "goods",
				source_field: "goods_id",
				source_id: this.obj.goods_id,
				user_id: user_id,
			  };
			  const res = await this.$get(url, params);
			  this.own_score_num = res.result.obj?.score_num || 0;
			  if (this.own_score_num > 0) {
				this.scoreReadOnly = true;
			  } else {
				this.scoreReadOnly = false;
			  }
			},
		            async get_user_vip_discount(){
                var json = await this.$get("~/api/user/get_obj?user_id="+this.$store.state.user.user_id);
                if(json.result && json.result.obj){
                  this.vip_discount = json.result.obj.vip_discount;
                }
            },
            /**
             * 选择图片展示
             */
            choose_img(o,index) {
                this.img_lg = o;
                this.currentNum=index;
                mySwiper.slideTo(index+1, 1000, true);//切换到第一个slide，速度为1秒
            },
            /**
             * 控制数量
             */
            sub_num(o) {
                if (o.num_buy > 1) {
                    o.num_buy--;
                }
            },
            add_num(o) {
                o.num_buy++;
            },

            /**
             * 根据当前时间和随机数生成流水号
             */
            order_code() {
                var orderCode = "";
                for (
                    var i = 0;
                    i < 6;
                    i++ //6位随机数，用以加在时间戳后面。
                ) {
                    orderCode += Math.floor(Math.random() * 10);
                }
                orderCode = new Date().getTime() + orderCode; //时间戳，用来生成订单号。
                return orderCode;
            },

            /**
             * 添加跳转到订单详情
             */
            async add_order() {
                //库存不足直接返回
                if (this.obj.num_buy>this.obj.inventory){
                    this.$toast("库存不足");
                    return;
                }
                var {
                    title,
                    img,
                    price,
                    price_ago,
                    description,
                    goods_id,
                    type,
                    num_buy: num,
                } = this.obj;
                var user_id = this.user.user_id;
                //获取用户地址数据
                var address_promise = new Promise((resolve, reject) => {
                    this.$get(
                        "~/api/address/get_obj?",
                        {
                            user_id,
                            default: 1,
                        },
                        (res) => {
                            if (res.result) {
                                //生成订单号
                                let price_count = price * num;
                                if (this.vip_discount>0){
                                    price_count = price_count * this.vip_discount
                                }
                                console.log(res.result)
                                var order_number = this.order_code();
                                var body = {
                                    order_number,
                                    goods_id,
                                    type,
                                    num,
                                    title,
                                    img,
                                    price,
                                    price_ago:price_ago,
                                    price_count:price_count,
                                    "contact_name":res.result.obj.name,
                                    "contact_phone":res.result.obj.phone,
                                    "contact_address":res.result.obj.address,
                                    "postal_code":res.result.obj.postcode,
                                    user_id,
                                    description,
									merchant_id: this.obj.user_id,
                                };
                                this.$post("~/api/order/add?", body, (res) => {
                                    console.log(res);
                                    this.$toast("加入订单成功",'success');
                                    this.$router.push("/order/details?order_number=" + order_number);
                                });
                            } else {
                                this.$toast("地址未添加");
                                // reject({
                                //     errer: "地址未添加",
                                // });
                                return;
                            }
                        }
                    );
                });
            },
            async add_integral_order() {
                //库存不足直接返回
                let integralHave= this.$store.state.user.integral;
                if (this.obj.num_buy > this.obj.inventory) {
                  this.$toast("库存不足");
                  return;
                }
                if (integralHave < (Number(this.obj.integral)*this.obj.num_buy)) {
                  this.$toast("积分不足，兑换失败");
                  return;
                }
                var {
                  title,
                  img,
                  price,
                  price_ago,
                  description,
                  goods_id,
                  type,
                  num_buy: num,
                } = this.obj;
                var user_id = this.user.user_id;
                //获取用户地址数据
                var address_promise = new Promise((resolve, reject) => {
                  this.$get(
                      "~/api/address/get_obj?",
                      {
                        user_id,
                        default: 1,
                      },
                      (res) => {
                        if (res.result) {
                          //生成订单号
                          let price_count = price * num;
                              if (this.vip_discount > 0) {
                            price_count = price_count * this.vip_discount
                          }
                              console.log(res.result)
                          var order_number = this.order_code();
                          var body = {
                            order_number,
                            goods_id,
                            type,
                            num,
                            title,
                            img,
                            price,
                            price_ago: price_ago,
                            integral:this.obj.integral,
                            "contact_name": res.result.obj.name,
                            "contact_phone": res.result.obj.phone,
                            "contact_address": res.result.obj.address,
                            "postal_code": res.result.obj.postcode,
                            user_id,
                            description,
                            merchant_id: this.obj.user_id,
                          };
                          this.$post("~/api/order/add?", body, (res) => {
                            console.log(res);
                            this.$toast("加入订单成功",'success');
                            this.$router.push(`/order/details?order_number=${order_number}&integral=${this.obj.integral}`);
                          });
                        } else {
                          this.$toast("地址未添加");
                          return;
                        }
                      }
                  );
                });
            },
            /**
             * 添加购物车
             */
            add_cart() {
                var {
                    title,
                    img,
                    price,
                    price_ago,
                    num_buy: num,
                    description,
                    goods_id,
                    type,
                } = this.obj;
                var body = {
                    title,
                    img,
                    price,
                    price_ago,
                    num,
                    price_count: price * num,
                    description,
                    goods_id,
                    type,
                    user_id: this.$store.state.user.user_id
                };

                this.$get("~/api/cart/get_list?", {
                    goods_id: this.obj.goods_id,
                    user_id: this.$store.state.user.user_id
                }, (res) => {
                    console.log(res)
                    if (res.result.count) {
                        var {cart_id, num, price, price_count} = res.result.list[0];
                        num += 1;
                        price_count += price;
                        this.$post(
                            `~/api/cart/set?cart_id=${cart_id}`,
                            {
                                num,
                                price,
                                price_count,
                            },
                            (res) => {
                                this.$toast("已加入购物车", 'success');
                                console.log("更改值")
                            }
                        );
                    } else {
                        this.$post("~/api/cart/add?", body, (res) => {
                            this.$toast("已加入购物车", 'success');
                        });
                    }
                })
            },
            /**
             * 添加收藏
             */
            add_collect() {
                var {title, img, goods_id} = this.obj;
                var body = {
                    title,
                    img,
                    source_table: "goods",
                    source_field: "goods_id",
                    source_id: goods_id,
                    user_id: this.$store.state.user.user_id,
                };
                if (!this.check_collected) {
                    this.check_collected = true;
                    this.$post("~/api/collect/add?", body, (res) => {
                        this.$toast("收藏成功", 'success');
                    });
                } else {
                    this.check_collected = false;
                    console.log(body)
                    this.$get("~/api/collect/del?", {
                        user_id: this.$store.state.user.user_id,
                        source_id: goods_id,
                    }, (res) => {
                        this.$toast("取消收藏");
                    });
                }
            },

            check_collect() {
                var user_id = this.$store.state.user.user_id;
                var goods_id = this.obj.goods_id;
                this.$get('~/api/collect/count?', {
                    user_id,
                    source_field: "goods_id",
                    source_id: goods_id
                }, (res) => {
                    this.check_collected = res.result
                });
            },

            getScreen() {
                let clientWidth = document.documentElement.clientWidth || document.body.clientHeight;
                this.img_show = clientWidth >= 960;
            },
            async get_sales_num(){
                let _this = this;
                _this.sales_num = 0;
                let order_json = await this.$get("~/api/order/get_list?", {"goods_id": _this.obj.goods_id,"state": "已付款"});
                if (order_json.result && order_json.result.list) {
                  let list = order_json.result.list;
                  for (let i=0;i<list.length;i++){
                    _this.sales_num = _this.sales_num +list[i].num;
                  }
                }
            }
        },
        mounted() {
          setTimeout(() => {
            let that = this;
            mySwiper = new Swiper('.swiper-container', {
              loop: true,
              diraction: "horizontal",
              notNextTick: true,
              autoplay: false,
              onSlideChangeEnd: function (swiper) {
                // console.log(swiper.realIndex);
                that.currentNum = swiper.realIndex;
              },

            })

            this.check_collect();
            // addEventListener('resize', () => {
            //     this.getScreen();
            // })
            this.get_user_vip_discount();
            this.get_sales_num();
          }, 1000);
        },
      			watch: {
		    obj: {
		      deep: true,
		      handler(newVal) {
		        this.getOwnScore();
		      },
		    }
		},
	      };
</script>

<style scoped>

   .swiper-container {
        width:100%;
        height: 100%;

    }
	.little_goodspic_act{
		border:1px solid #5676fc !important;
	}
    .figure .main_img {
        width: 100% !important;
        height: 100% !important;
    }

/* 	.magnifier-box {
	    width: 100%;
	    height: 100%;
	} */

    .sales {
        margin: 0.5rem 0;
        text-align: right;
    }

    .goods_name {
        font-size: 2rem;
        font-weight: bold;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .description {
        margin-top: 1em;
        overflow: hidden;
    }

    /* 图片 */
    .figure {
        border: 1px solid var(--color_border);
        border-radius: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 25rem;
        padding: 1rem;
        box-shadow: 0 0.25rem 0.5rem 0 #ddd;
    }

    .list_sm_img {
        margin-top: 1rem;
        display: flex;
    }

    .list_sm_img .item {
        width: 25%;
        padding: 0 5px;
    }

    .sm_figure {
        height: 5rem;
        padding: 0.25rem;
        border-radius: 0.25rem;
        border: 1px solid var(--color_border);
        box-shadow: 0 0.25rem 0.5rem 0 #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 2rem;
    }

	.sm_figure img {
		width: 100% !important;
		height: 100% !important;
	}

    .sm_figure:hover {
        cursor: pointer;
        border: 0.2rem solid #909399;
    }

    /* 详情 */
    .card_goods_info {
        border: 1px solid var(--color_border);
        border-radius: 1rem;
        box-shadow: 0 0.25rem 0.5rem 0 #ddd;
        /* height: 31rem; */
        padding: 20px 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .price_block {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .card_goods_info .price {
        color: var(--color_red);
        font-weight: 600;
        font-size: 30px;
    }

    .card_goods_info .price_ago {
        margin-left: 0.5rem;
        text-decoration: line-through;
        font-size: 0.875rem;
        color: #999;
    }

    .card_goods_info .bottom_handle {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .card_goods_info .bottom_handle .buy {
        cursor: pointer;
        background-color: var(--color_primary);
        position: relative;
        bottom: 0;
        color: #fff;
        padding: 3px 10px;
        transition: ease-in-out 0.2s;
        border-radius: 50px;
    }

    .card_goods_info .bottom_handle .buy:hover {
        position: relative;
        bottom: 3px;
    }

    .card_goods_info .bottom_handle .collect {
        cursor: pointer;
        transition: ease-in-out 0.2s;
        color: #000;
        align-items: center;
        font-size: 16px;
    }

    .card_goods_info .bottom_handle .collect:hover {
        color: var(--color_primary);
    }

    .card_goods_info .bottom_handle .cart {
        cursor: pointer;
    }

    .card_goods_info .bottom_handle .cart:hover {
        color: var(--color_primary);
    }

    /* 控制数量 */
    .num_buy_block {
        display: flex;
        justify-content: space-around;
        padding: 0 10px;
        align-items: center;
        border: 1px solid #eee;
        border-radius: 50px;
        width: 100px;
        height: 30px;
    }

    .num_buy_block > div {
        height: 25px;
        width: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .subtract,
    .add {
        cursor: pointer;
        border-radius: 50%;
        color: #000;
        font-weight: 600;
        font-size: 20px;
        background-color: #f3f3f3;
    }

    .subtract span {
        position: relative;
        top: -1px;
    }

    @media (max-width: 576px) {
        .card_img, .card_goods_info {
            margin: 1rem;
        }
    }

</style>

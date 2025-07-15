<template>
  <div id="order_details" class="page_order">
    <div class="warp">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card_order">
              <!-- 订单列表 -->
              <div v-if="$check_action('/order/details', 'get')" class="order_box">
                <div class="state">
                  {{ state }}
                </div>
                <div class="contact_info">
                  <div class="line_1">
                    <b-icon class="icon_address" icon="geo-alt"></b-icon>
                    <span class="name">{{ contact_name }}</span>
                    <span class="phone"> {{ contact_phone }}</span>
                  </div>
                  <span class="line_2">{{ contact_address }}</span>
                </div>
                <div class="order_cli">
                  <div v-for="(obj, idx) in list" :key="idx" class="goods_list">
                    <div class="item_goods flex_sbc">
                      <div class="img_block">
                        <img
                            :src="$fullUrl(obj.img)"
                            mode="scaleToFill"
                            style="width: 4.5rem; height: 4.5rem"
                        />
                      </div>
                      <div class="middle_info">
                        <div class="title ellipsis_2">
                          {{ obj.title }}
                        </div>
                        <div class="priceAndNum">
                          <span class="price" v-if="integral==undefined"> ￥{{ obj.price }} </span>
                          <span class="price" v-else>{{ integral }}积分</span>
                          <span class="num"> ×{{ obj.num }} </span>
                        </div>
                      </div>
                    </div>
                    <div class="num_info"></div>
                  </div>
                    <div class="after-sale-line" v-if="state=='售后/退款'">
                        <div>售后类型:{{ type }}</div>
                        <div>售后内容:{{ content_desc}}</div>
                        <div>售后凭证:<img style='height:100px;margin-right: 10px;' v-for="(item,index) in imgs" :key="index" :src="$fullUrl(item)"/></div>
                        <div>售后状态:{{ !!after_state?after_state:'-' }}</div>
                        <div>审核回复:{{ !!after_state_reply?after_state_reply:'-' }}</div>
                    </div>
                      <div class="sum_coupon" v-if="state === '待付款' && integral==undefined">
                        <div>优惠券</div>
                    <el-select  style="margin-top: 10px;" v-model="use_coupon_id" placeholder="请选择优惠券" v-if="use_coupon_list.length > 0">
                      <el-option
                          v-for="item in use_coupon_list"
                          :key="item.coupon_id"
                          :label="item.coupon_name"
                          :value="item.coupon_id + '-' + item.id">
                      </el-option>
                    </el-select>

                    <div v-if="use_coupon_list.length <= 0">无可使用的优惠券</div>
                  </div>
                      <div v-if="vip_discount>0 && integral==undefined" class="sum_price flex_sbc">
                        <span>会员折扣</span>
                    <span style="color: var(--color_red); font-weight: 600"
                    >{{ vip_discount }}</span
                    >
                  </div>
                  <div v-if="vip_discount>0" class="sum_price flex_sbc">
                    <span>原价</span>
                    <span style="color: var(--color_red); font-weight: 600"
                    >￥{{ sum_price_ago }}</span
                    >
                  </div>
                  <div class="sum_price flex_sbc">
                    <span>需付款</span>
                    <span v-if="integral==undefined" style="color: var(--color_red); font-weight: 600">￥{{ sum_price }}</span>
                    <span v-else style="color: var(--color_red); font-weight: 600">{{ integral_total }}积分</span>
                  </div>
                  <div class="btn_block">
                    <div v-if="$check_action('/order/details', 'set')">
                      <div
                          v-if="state === '待付款'"
                          class="btn_trade"
                          @click="goto_pay()"
                      >
                        <span>去支付</span>
                      </div>
                      <!--<div-->
                      <!--v-if="state === '已签收' || state === '待发货'"-->
                      <!--class="btn_trade"-->
                      <!--@click="refund()">-->
                      <!--申请退款-->
                      <!--</div>-->
                      <!--<div-->
                      <!--v-if="state === '待退款'"-->
                      <!--class="btn_trade"-->
                      <!--@click="cancel_refund()">-->
                      <!--取消退款申请-->
                      <!--</div>-->
                    </div>
                  </div>
                  <div class="bottom_order">
                    <div class="order_num flex_sbc">
                      <span>订单编号：</span><span>{{ order_number }}</span>
                    </div>
                    <div class="time flex_sbc">
                      <span>下单时间：</span><span>{{ create_time | formatDate }}</span>
                    </div>
                    <div class="remark flex_sbc">
                      <span>订单备注：</span>
                      <textarea v-if="state === '待付款'" v-model="remark"/>
                      <span v-else>{{ remark }}</span>
                    </div>
                  </div>
                </div>
				<div class="hot_goods">
					<h5>猜你喜欢</h5>
					<list_goods_hot :list="list_recommend"></list_goods_hot>
				</div>
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
import list_goods_hot from "../../components/diy/list_goods_hot.vue";
export default {
  mixins: [mixin],
  components: {
  	list_goods_hot,
  },
  data() {
    return {
      // 登录权限
      oauth: {
        signIn: true,
        user_group: [],
      },
      url_get_list: "~/api/order/get_list",
      field: "order_number",
      query: {
        order_number: "",
      },
      contact_name: "",
      contact_phone: "",
      contact_address: "",
      order_number: "",
      create_time: "",
      state: "",
      remark: "",
      coupon_list: [],
      use_coupon_list: [],
      use_coupon_id: "",
      vip_discount: 0,
      type:'',
      content_desc:'',
      imgs:[],
      after_state_reply:'',
      after_state:'',
      integral:undefined,
      integralHave:0,
	  list_recommend: [],
    };
  },
  methods: {
	// 获取推荐商品
	async get_recommend_goods(){
		this.list_recommend = [];
		// 获取订单第一个商品的分类
		let type = this.list[0].type;
		await this.$get('~/api/goods/get_list', {
			orderby: 'hits desc'
		}, (json) => {
			let types_goods = json.result.list;
			for(var i = 0;i < types_goods.length;i ++){
				if(types_goods[i].goods_id != this.list[0].goods_id && types_goods[i].type == this.list[0].type){
					this.list_recommend.push(types_goods[i]);
					if(this.list_recommend.length == 5){
						break;
					}
				}
			}
			// 如果同类下没有可推荐商品，推荐热度最高的
			if(this.list_recommend.length < 5){
				for(var i = 0;i < types_goods.length;i ++){
					if(types_goods[i].goods_id != this.list[0].goods_id && types_goods[i].type != this.list[0].type){
						this.list_recommend.push(types_goods[i]);
						if(this.list_recommend.length == 5){
							break;
						}
					}
				}
			}
		})
	},
    /**
     * 获取订单后
     * @param {Object} json 响应对象
     */
    async get_list_after(json) {
      const result = json.result.list

          let vip_json = await this.$get("~/api/user/get_obj?user_id="+this.$store.state.user.user_id);
      if(vip_json.result && vip_json.result.obj){
        this.vip_discount = vip_json.result.obj.vip_discount;
      }
          await this.get_coupon_user_list()

      for (let i = 0; i < this.coupon_list.length; i++) {
        this.use_coupon_list.push({
          ...this.coupon_list[i],
          sum: 0
        })
        for (let j = 0; j < result.length; j++) {
          if (result[j].merchant_id === this.coupon_list[i].coupon_user_id || this.coupon_list[i].coupon_user_auth == "管理员") {
            this.use_coupon_list[i].sum += result[j].price_count
          }
        }
      }
      const now = new Date().getTime()
      for (let i = 0; i < this.use_coupon_list.length; i++) {
        const time = this.use_coupon_list[i].coupon_time.split(",")
        const start = new Date(time[0])
        const end = new Date(time[1])
        const is_effective = start <= now && now <= end
        if(this.use_coupon_list[i].sum < this.use_coupon_list[i].coupon_price || !is_effective || this.use_coupon_list[i].is_use == 1){
          this.use_coupon_list.splice(i,1)
          --i
        }
      }
      var {
        contact_name,
        contact_phone,
        contact_address,
        order_number,
        create_time,
        state,
        remark,
      } = json.result.list[0];
      this.contact_name = contact_name;
      this.contact_phone = contact_phone;
      this.contact_address = contact_address;
      this.order_number = order_number;
      this.create_time = create_time;
      this.state = state;
      this.remark = remark;
      if(state=='售后/退款'){
        let afterSaleJson = await this.$get("~/api/order_after_sale/get_obj?order_number=" + this.order_number);
        this.after_state=afterSaleJson.result.obj.after_state;
        this.after_state_reply=afterSaleJson.result.obj.after_state_reply;
        this.type=afterSaleJson.result.obj.type;
        this.content_desc=afterSaleJson.result.obj.content_desc;
        this.imgs=JSON.parse(afterSaleJson.result.obj.imgs);
      }
	  this.get_recommend_goods();
      return json;
    },
    /**
     * 退款
     */
    // refund() {
    //   this.$post(
    //     "~/api/order/set?order_number=" + this.order_number,
    //     {
    //       state: "待退款",
    //     },
    //     (res) => {
    //       this.state = "待退款";
    //     }
    //   );
    // },
    /**
     * 取消退款
     */
    // cancel_refund(){
    //     this.$post(
    //     "~/api/order/set?order_number=" + this.order_number,
    //     {
    //       state: "待发货",
    //     },
    //     (res) => {
    //       this.state = "待发货";
    //     }
    //   );
    // },
    /**
     * 支付
     */
    goto_pay() {
        let _this = this;
        if (this.integral != undefined) {
          //积分支付
          if (_this.integralHave < _this.integral_total) {
            //钱包支付
            this.$toast("积分不足，兑换失败")
            return false;
          }
          this.$post("~/api/order/set?order_number=" + _this.order_number, {
            state: "已付款",
            remark: this.remark,
            buy_type: 2
          }, (res) => {
            if (res.result) {
              console.log(res.result);
              this.$get("~/api/order/get_list?", {"order_number": _this.order_number}, (json) => {
                if (json.result && json.result.list) {
                  //修改数量
                  for (let i = 0; i < json.result.list.length; i++) {
                    _this.update_order_price_count(json.result.list[i])
                    _this.update_goods_inventory(json.result.list[i]);
                  }
                }
              })

              this.$toast("兑换成功")
              let paramsUserSet = {
                integral: _this.integralHave - _this.integral_total
              }
              this.$post(
                  "~/api/user/set?user_id=" + _this.user.user_id, paramsUserSet,
                  (res) => {
                    _this.$router.push("/order/list?state=已付款")
                  }
              );
            }
          })
        } else {
              this.$router.push(
                "/pay/detail?" +
                "order_number=" +
              this.order_number +
                "&&" +
                "sum_price=" +
              this.sum_price +
                "&&" +
                "remark=" +
              this.remark +
                "&&" +
                "coupon_id=" +
              this.use_coupon_id.split("-")[1]
                  );
        }
    },
    /**
     *  当前用户的优惠券
     */
    async get_coupon_user_list() {
      const result = await this.$get("~/api/coupon_user/get_list", {
        user_id: this.$store.state.user.user_id,
        is_use: 0
      })

      for (let i = 0; i < result.result.list.length; i++) {
        const res = await this.$get("~/api/coupon/get_obj", {
          coupon_id: result.result.list[i].coupon_id,
        })
		if(res.result != null){
			this.coupon_list.push({
			  ...res.result.obj,
			  id: result.result.list[i].id,
			  is_use: result.result.list[i].is_use
			})
		}
        
      }
    },
  },
  computed: {
    integral_total(){
        //计算总积分
        let integral_total=0
        this.list.map((o) => (integral_total= o.num * this.integral));
        return integral_total;
    },
    /**
     * 计算总价
     */
    sum_price() {
      var sum_price = 0;
      this.list.map((o) => (sum_price += parseFloat(o.price_count)));
      const coupon_id = this.use_coupon_id.split("-")[0]
      for (let i = 0; i < this.use_coupon_list.length; i++) {
        if( coupon_id == this.use_coupon_list[i].coupon_id){
          sum_price -= this.use_coupon_list[i].coupon_price1
        }
      }
      return sum_price.toFixed(2);
    },
    /**
     * 计算原价
     */
    sum_price_ago(){
      var sum_price_ago = 0;
      this.list.map((o) => (sum_price_ago += (parseFloat(o.price) * parseInt(o.num))));
      return sum_price_ago.toFixed(2);
    }
  },
  mounted(){
    if(this.$route.query.integral!=undefined){
      this.integral = Number(this.$route.query.integral);
      this.integralHave=Number(this.$store.state.user.integral);
    }
  },
  created() {
  }
};
</script>

<style scoped>
.ellipsis_2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.page_order {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.flex_sbc {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact_info {
  background-color: #fff;
  padding: 0.3rem 1rem;
  margin-bottom: 0.5rem;
}

.contact_info .line_1 {
  margin-bottom: 0.2rem;
}

.contact_info .line_2 {
  font-size: 0.9rem;
}

.contact_info .name {
  padding-right: 1rem;
  font-weight: 600;
}

.contact_info .phone {
  color: var(--color_grey);
}

.state {
  padding: 0.3rem 1rem;
  background-color: #fff;
  color: var(--color_primary);
  border-bottom: 1px solid #f8f8f8;
  font-size: 1.1rem;
}

.goods_list {
  padding: 0.2rem 0.8rem;
  background-color: #fff;
}

.goods_list .item_goods {
  align-items: stretch;
  border-bottom: 1px solid #f4f4f4;
}

.goods_list .img_block {
  padding: 0.2rem;
}

.goods_list .middle_info {
  width: calc(100% - 5.5rem);
}

.goods_list .title {
  font-size: 0.9rem;
  min-height: 1.4rem;
}

.goods_list .num_info {
  display: flex;
  justify-content: space-between;
}

.goods_list .price,
.goods_list .num {
  color: var(--color_grey);
  font-size: 0.5rem;
}

.sum_coupon {
  background-color: #ffffff;
  padding: 0.8rem 0.8rem;
  border-bottom: 1px solid #f4f4f4;
}

.sum_coupon span{
  font-size: 14px;
  margin-left: 20px;
}
.sum_price {
  height: 2.5rem;
  background-color: #ffffff;
  padding: 0 0.8rem;
  border-bottom: 1px solid #f4f4f4;
}

.btn_block {
  padding: 0.8rem 2rem;
  background-color: #fff;
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn_trade {
  text-align: center;
  padding: 0.5rem 2rem;
  border: 1px solid var(--color_grey);
  border-radius: 4rem;
  cursor: pointer;
  width: 256px;
}

.btn_trade:hover {
  opacity: 0.7;
}

.bottom_order {
  background-color: #fff;
  font-size: 0.8rem;
  color: var(--color_grey);
}

.bottom_order > div {
  padding: 0.6rem;
}

.bottom_order > div + div {
  border-top: 1px solid #f4f4f4;
}

.order_num {
  margin-bottom: 0.3rem;
}
.after-sale-line{
  padding:0.6rem;
  color:#212529;
  font-size:14px;
}
</style>

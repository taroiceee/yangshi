<template>
  <div class="page_pay" id="page_pay">
    <div class="warp">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6">
            <b-card no-body style="">
              <template #header>
                <h4 class="text-center">总支付：￥{{ query.sum_price }}</h4>
              </template>
              <b-card-body>
                <b-tabs content-class="mt-3">
                  <b-tab title="沙箱支付" :active="true">
                    <div class="row">
                      <div class="col">
                            <b-card-footer style="margin-top: 10px" class="text-center">
                          <b-button variant="outline-primary" @click="alipay" block
                          >支付
                          </b-button
                          >
                        </b-card-footer>
                          </div>
                    </div>
                  </b-tab>
                      <b-tab v-if="walletStatus==null || walletStatus==undefined" title="钱包" :active="false">
                    <div class="row">
                      <div class="col">
                        <div style="font-size:18px;width: 80%;margin: 0 auto;margin-top: 20px;">
                          <div style="width: 80%;margin: 0 auto;">
                            <div style="line-height: 40px">钱包余额</div>
                          </div>
                          <div style="width: 80%;margin: 0 auto;">
                            <div style="font-size:20px;color:#FF0036;font-weight: bolder;">￥{{balance}}</div>
                          </div>
                        </div>
                        <b-card-footer style="margin-top: 10px" class="text-center">
                          <b-button variant="outline-primary" @click="pay('wallet')" block>支付</b-button>
                        </b-card-footer>
                      </div>
                    </div>
                  </b-tab>
                  </b-tabs>
              </b-card-body>
            </b-card>
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
      query: {
        sum_price: "",
        order_number:"",
        remark:"",
        selected: "",
      },
      pay_obj:{
        payActiveName:"微信",
        account:"",
        password:"",
        id:""
      },
              coupon_price:0,
      balance:0,
      walletStatus:null,
      integral:0,
    };
  },

  methods: {
    async update_order_price_count(o) {
      if (this.coupon_price>0){
        let coupon_sum_price = parseFloat(this.query.sum_price) + parseInt(this.coupon_price);
        await this.$post("~/api/order/set?order_id=" + o.order_id,
                {
                  price_count: (o.price_count - ((o.price_count/coupon_sum_price)*this.coupon_price)).toFixed(2),
                },
                (res) => {
                  if (res.result) {
                    console.log(res);
                  } else if (res.error) {
                    this.$toast(res.error.message);
                    console.log(res.error);
                  }
                }
        );
      }
    },
    async update_goods_inventory(o){
      await this.$get("~/api/goods/get_obj?", {"goods_id":o.goods_id}, (json) => {
        if (json.result && json.result.obj) {
          let inventory = {"inventory":json.result.obj.inventory-o.num,"sales":Number(json.result.obj.sales)+Number(o.num)};
          this.$post('~/api/goods/set?goods_id='+o.goods_id, inventory, (res) => {
            if(res.result && json.result.obj.source_table && json.result.obj.source_field && json.result.obj.source_id){
              let inventory_sub = {"cart_inventory":inventory.inventory};
              this.$post('~/api/'+json.result.obj.source_table+'/set?'+json.result.obj.source_field+'='+json.result.obj.source_id, inventory_sub, (res_sub) => {
                console.log(res_sub)
              })
            }
          })
        }
      })
    },
    recharged(){
      let _this=this;
      _this.$post(
              "~/api/user/set?user_id=" + _this.$store.state.user.user_id, {
                balance:(Number(_this.walletStatus)+Number(_this.balance)).toFixed(2),
              },
              (res) => {
                _this.$toast('充值成功');
                setTimeout(function(){
                  _this.$router.go(-1)
                },2000)
              }
      );
    },
    pay(type = '') {
      let _this = this;
      if(this.walletStatus!=null){
        _this.recharged();
      }else{
        if(type=='wallet' && _this.balance<_this.query.sum_price){
          //钱包支付
          this.$toast("余额不足，支付失败")
          return false;
        }
        this.$post("~/api/order/set?order_number="+_this.query.order_number,{
          state:"已付款",
          remark:_this.query.remark,
          buy_type:type=='wallet'?3:1,
        },(res)=>{
          if(res.result){
            console.log(res.result);
            this.$get("~/api/order/get_list?", {"order_number":_this.query.order_number}, (json) => {
              if (json.result && json.result.list) {
                //修改数量
                for(let i=0;i<json.result.list.length;i++){
                  _this.update_order_price_count(json.result.list[i])
                  _this.update_goods_inventory(json.result.list[i]);
                }
              }
            })

            this.$toast("支付成功",'success')
            const coupon_id = this.$route.query.coupon_id
            if(coupon_id !== "undefined"){
              this.$post("~/api/coupon_user/set?id=" + coupon_id,{
                is_use: 1
              })
            }
			let paramsUserSet = {};
              if(type=='wallet'){
              paramsUserSet.balance=(Number(_this.balance)-Number(_this.query.sum_price)).toFixed(2);
            }
                paramsUserSet.integral = _this.integral+parseInt(_this.query.sum_price)
              this.$post(
                    "~/api/user/set?user_id=" + _this.user.user_id,paramsUserSet,
                    (res) => {
                      _this.$router.push("/order/list?state=已付款")
                    }
            );
          }
        })
      }
    },
    async init_coupon(){
      const coupon_id = this.$route.query.coupon_id
      if(coupon_id !== "undefined"){
        let json = await this.$get("~/api/coupon/get_obj?coupon_id="+coupon_id);
        if(json.result && json.result.obj){
          this.coupon_price = json.result.obj.coupon_price1
        }
      }
    },
        alipay(){
                  if(this.query.order_number != "" && this.query.order_number != null){
            this.$get("~/api/order/get_list?order_number="+this.query.order_number,{}, (json) => {
              if (json.result && json.result.list){
                if (json.result.list.length>0) {
                  let goods_name = "";
                  if (json.result.list.length === 1) {
                    goods_name = json.result.list[0].title;
                  } else {
                    goods_name = json.result.list[0].title + "等多件";
                  }
                  let return_url = window.location.href;
                  if (return_url.indexOf("?") > 0) {
                    return_url = return_url.substring(0, return_url.indexOf("?"));
                  }
                  return_url = return_url.replace("/pay/detail","/order/list")
                  this.$get("~/api/order/page_alipay?goods_name=" + goods_name + "&pay_money=" + this.query.sum_price + "&order_number=" + this.query.order_number + "&return_url=" + encodeURIComponent(return_url), {}, (json) => {
                    if (json.result) {
                      let newWin = window.open('_blank');
                      newWin.document.querySelector('body').innerHTML = json.result;
                      const div = document.createElement('div') // 创建div
                      div.innerHTML = json.result // 将返回的form 放入div
                      newWin.document.body.appendChild(div)
                      newWin.document.forms[0].submit()
                    } else if (json.error) {
                      console.error(json.error);
                    }
                  });
                }
              }
            })
          }else{
            let goods_name = "钱包充值";
            let pay_money = this.query.sum_price;
            let return_url = window.location.href;
            if (return_url.indexOf("?") > 0) {
              return_url = return_url.substring(0, return_url.indexOf("?"));
            }
            return_url = return_url.replace("/pay/detail","/user/index")
            this.$get("~/api/order/page_alipay?goods_name=" + goods_name + "&pay_money=" + pay_money + "&order_number=WALLET_"+this.$store.state.user.user_id+"&return_url=" + encodeURIComponent(return_url), {}, (json) => {
              if (json.result) {
                let newWin = window.open('_blank');
                newWin.document.querySelector('body').innerHTML = json.result;
                const div = document.createElement('div') // 创建div
                div.innerHTML = json.result // 将返回的form 放入div
                newWin.document.body.appendChild(div)
                newWin.document.forms[0].submit()
              } else if (json.error) {
                console.error(json.error);
              }
            });
          }
            }
      },
  mounted() {
    this.init_coupon();
            this.walletStatus = this.$route.query.moneyNow;
    if(this.walletStatus!=undefined){
      this.query.sum_price=this.walletStatus;
    }
    this.balance=this.$store.state.user.balance;
    this.integral=this.$store.state.user.integral;
  },
};
</script>

<style scoped>
.container {
  min-height: 800px;
}
</style>

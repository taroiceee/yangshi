<template>
	<div class="page_user user_info" id="user_info">
		<div class="warp">
			<div class="container">
				<div class="row">

					<div class="col-12 col-md-9">
						<div class="wallet-container">
							<div class="wallet-part"><span class="wallet-left-name">钱包余额</span><span
									class="wallet-detail moneyCol">￥{{ beforeBalance }}</span></div>
							<div class="wallet-part">
								<span class="wallet-left-name">充值金额</span>
								<div class="wallet-detail">
									<div class="wallet-recharged-money">
										<span :class="[chooseIdx == index ? 'act' : '']" v-for="(item, index) in priceArr"
											:key="item" @click="changePrice(index)">{{ item }}元</span>
									</div>
									<div class="wallet-write-input">
										<input @input="justicInput" v-model='priceInput' type="number" id="moneyinput" min="0"
											placeholder="请输入其他充值金额">
									</div>
									<div>
										<el-button type="primary" class="layui-btn" @click="recharged">充值</el-button>
									</div>
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
import { Message } from "element-ui";
export default {
	mixins: [mixin],
	data() {
		return {
			priceArr: [5, 10, 20, 50, 100, 200],
			chooseIdx: 99,
			beforeBalance:0,
			priceInput:'',
		};
	},

	methods: {
		justicInput(){
			if (!!this.priceInput) {
				this.chooseIdx = 99;
			}
			if(this.priceInput <= 0){
				this.priceInput = "";
			}
		},
		changePrice(index){
			this.chooseIdx = index;
			this.priceInput=''
		},
		recharged(){
			let _this=this;
			let moneyNum=_this.chooseIdx!=99?Number(_this.priceArr[_this.chooseIdx]):Number(_this.priceInput);
			this.$router.push({path:'/pay/detail',query:{moneyNow:moneyNum}})
		}

	},
	mounted(){
		let _this=this;
		this.$get('~/api/user/state', null, function(json, status) {
			if (json.result) {
				var user = json.result;
				if(user.obj){
					user = user.obj;
				}
				_this.$store.commit('user_set', user);
				_this.beforeBalance=Number(user.balance);
				if(func){
					func(user);
				}
			} else if (json.error) {
				this.$get("quit");
				_this.$store.commit('sign_out');
				if(func){
					func(user);
				}
			}
		});
	},
};
</script>

<style scoped>
.container {
	min-height: 800px;
}

.wallet-container {
	margin: 170px auto 20px;
	width: 700px;
	background-color: #fff;
	padding: 30px 20px;
	font-size: 16px;
}

.wallet-part {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 10px;
}

.wallet-part:last-child {
	align-items: flex-start;
}

.wallet-part .moneyCol {
	font-weight: bolder;
	font-size: 18px;
	color: #E13A0C;
}

.wallet-left-name {
	width: 30%;
}

.wallet-detail {
	width: 70%;
}

.wallet-recharged-money {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.wallet-recharged-money span {
	width: 60px;
	text-align: center;
	padding: 8px 0;
	background: #eee;
	margin-right: 15px;
	margin-bottom: 5px;
	border-radius: 2px;
}

.wallet-recharged-money span:hover,
.wallet-recharged-money .act {
	background: #78410E;
	color: #fff;
}

.wallet-write-input {
	margin: 10px 0;
}

.wallet-write-input input {
	font-size: 18px;
	padding: 6px 10px;

}
</style>
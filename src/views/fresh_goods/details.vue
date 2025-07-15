<template>
	<div class="diy_details page_fresh_goods" id="fresh_goods_details">

		<div class='warp_dt_box'>
		<div class='warp'>
			<div class='container'>
				<div class='row'>
					<div class='col'>
						<div class='card_fresh_goods'>
							<div_fresh_goods :obj="obj" @change_score="change_score"></div_fresh_goods>
							<scoreStatisticsChart :obj="obj" :refreshScore="refreshScore" sourcetable="fresh_goods" sourcefield="fresh_goods_id" />

						</div>
					</div>
				</div>
			</div>
		</div>

</div>
	</div>
</template>

<script>
	import div_fresh_goods from "@/components/diy/div_fresh_goods.vue";
	import scoreStatisticsChart from "@/components/charts/score_statistics_chart";
	import mixin from "@/mixins/page.js";
	export default {
		mixins:[mixin],
		components:{
			scoreStatisticsChart,
			div_fresh_goods
		},
		data(){
			return{
				url_get_obj: "~/api/fresh_goods/get_obj?",

				field: "fresh_goods_id",

				obj: {
				},

				query: {
						"commodity_number": "",
							"order_rules": "",
							"seller_user": 0,
							"store_address": "",
							"shop_name": "",
						"fresh_goods_id":0,
				},
				// 点赞
				praise: 0,
				// 点赞状态
				state_praise: false,
				refreshScore: false,
			}
		},
		methods:{
			change_score() {
				this.refreshScore = true;
			},
			async get_obj_after(json) {
				// 判断是否获取到数据
				if (json && json.result && json.result.obj) {
					console.log(json.result.obj)
															var obj = json.result.obj;
					this.obj = obj
									}
			},
					
		},

		mounted() {
		},

	}
</script>

<style>
.qecode {
  display: flex;
  align-content: center;
  width: 270px;
  background: white;
  position: absolute;
  left: 20%;
  top: 20px;
  z-index: 999;
}
.qecodeImg {
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  padding-top: 10px;
  margin: 0 auto;
}
.btn_share{
	display: inline-block;
	position: relative;
	top: 15px;
	background: rgb(240, 238, 238);
	border: 1px solid #ccc;
	height: 38px;
	margin-left: 10px;
	padding: 3px 10px;
	cursor: pointer;
	overflow: hidden;
	border-radius: 5px;
}
.btn_share_icon{
	width: 30px;
	height: 28px;
	float: left;
	margin-right: 10px;
}
.share_box{
	display: none;
	float: left;
}
.share_box img{
	width: 30px;
	height: 28px;
	margin-right: 10px;
}
.btn_share:hover .share_box{
	display: block;
}
</style>

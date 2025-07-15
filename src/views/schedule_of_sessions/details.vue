<template>
	<div class="diy_details page_schedule_of_sessions" id="schedule_of_sessions_details">

		<div class='warp_dt_box'>
		<div class='warp'>
			<div class='container'>
				<div class='row'>
					<div class='col'>
						<div class='card_schedule_of_sessions'>
							<div_schedule_of_sessions :obj="obj"></div_schedule_of_sessions>

						</div>
					</div>
				</div>
			</div>
		</div>

</div>
	</div>
</template>

<script>
	import div_schedule_of_sessions from "@/components/diy/div_schedule_of_sessions.vue";
	import mixin from "@/mixins/page.js";
	export default {
		mixins:[mixin],
		components:{
			div_schedule_of_sessions
		},
		data(){
			return{
				url_get_obj: "~/api/schedule_of_sessions/get_obj?",

				field: "schedule_of_sessions_id",

				obj: {
				},

				query: {
						"name_of_session": "",
							"schedule_of_sessions": "",
							"activity_arrangement": "",
							"activity_location": "",
						"schedule_of_sessions_id":0,
				},
				// 点赞
				praise: 0,
				// 点赞状态
				state_praise: false,
			}
		},
		methods:{
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

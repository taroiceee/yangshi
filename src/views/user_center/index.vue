<template>
	<div class="page_user my_home" id="user_address">
		<div class="warp">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-12 col-md-3">
						<div class="card_menu">
							<!-- 左侧边栏 -->
							<list_admin_menu_user></list_admin_menu_user>
						</div>
					</div>
					<div class="col-12 col-md-9">
						<div class="card_addres pl-2">
							<div class="warp">
								<div class="container-fluid">
									<el-row>
										<div>欢迎来到个人中心</div>
									</el-row>
									<el-row>
										<el-col v-if="$check_figure('/order/table')" :span="8">
											<div v-loading="line_obj_shop_money.loading" class="chart" style="min-height: 300px">
												<el-date-picker
														v-model="line_obj_shop_money.month"
														:default-time="['00:00:00', '23:59:59']"
														align="right"
														end-placeholder="结束日期"
														start-placeholder="开始日期"
														type="datetimerange"
														format="yyyy-MM-dd HH:mm:ss"
														:disabled="line_obj_shop_money.loading"
														@change="changeMonth($event, line_obj_shop_money)">
												</el-date-picker>
												<span v-if="!line_obj_shop_money.loading" style="margin-left: 20px;">总销售金额：{{line_obj_shop_money.total}}</span>
												<newLineChart :color="['#fff000']" v-if="line_obj_shop_money.values.length > 0" id="line_obj_shop_money"
															  :timeout="0" :title="'商品销售金额统计'" :vm="line_obj_shop_money" style="margin-top: 20px">
												</newLineChart>
											</div>
										</el-col>
										<el-col v-if="$check_figure('/order/table')" :span="8">
											<div v-loading="bar_obj_shop_num.loading" class="chart" style="min-height: 300px">
												<el-date-picker
														v-model="bar_obj_shop_num.month"
														:default-time="['00:00:00', '23:59:59']"
														align="right"
														end-placeholder="结束日期"
														start-placeholder="开始日期"
														type="datetimerange"
														format="yyyy-MM-dd HH:mm:ss"
														:disabled="bar_obj_shop_num.loading"
														@change="changeMonth($event, bar_obj_shop_num)">
												</el-date-picker>
												<span v-if="!bar_obj_shop_num.loading" style="margin-left: 20px;">总销售数量：{{bar_obj_shop_num.total}}</span>
												<newBarChart v-if="bar_obj_shop_num.values.length > 0" id="bar_obj_shop_num"
															 :timeout="0" :title="'商品销售数量统计'" :vm="bar_obj_shop_num" style="margin-top: 20px">
												</newBarChart>
											</div>
										</el-col>

										<el-col :span="24">
											<div class="screen-container">
												<iframe v-if="iframeSrc" ref="dynamicIframe" :src="iframeSrc" frameborder="0" :style="{ width: '100%', border: 'none', height: 'auto' }" @load="adjustIframeHeight"></iframe>
											</div>
										</el-col>
										<el-col v-if="user_group !== '管理员' && !$check_option('/subject_exam/table','teacher') && $check_figure('/subject_exam/table')" :span="8">
											<div class="card chart">
												<subjectExamCharts v-if="bar_obj_subject_exam.values.length >　0" id="line_obj_data_account_statistics"
																   :title="'用户考试科目数据统计'" :vm="bar_obj_subject_exam"
																   @changeTab="get_url_subject_exam_list">
												</subjectExamCharts>
												<div v-if="!bar_obj_subject_exam.values.length">数据分析没有符合条件的数据</div>
											</div>
										</el-col>
									</el-row>
									<el-row style="padding: 8px;">
									  <schedule />
									</el-row>
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
	import list_admin_menu_user from "@/components/diy/list_admin_menu_user.vue";
	import newBarChart from "@/components/charts/new_bar_chart";
	import newLineChart from "@/components/charts/new_line_chart";
	import subjectExamCharts from "@/components/charts/subject_exam_charts.vue";
	import schedule from "@/components/charts/schedule.vue"
	export default {
		data() {
			return {
				iframeSrc: null,
				line_obj_shop_money: {
					type: "money",
					names: ["销售金额"],
					xAxis: [],
					values: [],
					month: [],
					loading: false,
					total: 0
				},
				bar_obj_shop_num: {
					type: "num",
					names: ["销售数量"],
					xAxis: [],
					values: [],
					month: [],
					loading: false,
					total: 0
				},
				bar_obj_subject_exam: {
					names: [],
					xAxis: [],
					values: [],
					tabs: []
				},
			};
		},
		mounted() {
			this.iframeSrc = '/screen/main.html?user_id='+this.$store.state.user.user_id+"&user_group="+this.$store.state.user.user_group
		},
		methods: {
			adjustIframeHeight() {
				const iframe = this.$refs.dynamicIframe;
				try {
					const contentHeight = iframe.contentDocument.body.scrollHeight;
					iframe.style.height = contentHeight + 'px';
					// 监听内部 DOM 变化（动态内容）
					const observer = new MutationObserver(() => {
						const newHeight = iframe.contentDocument.body.scrollHeight;
						iframe.style.height = newHeight + 'px';
					});
			
					observer.observe(iframe.contentDocument.body, {
						childList: true, // 监听子元素变化
						subtree: true, // 监听所有后代元素
						attributes: true, // 监听属性变化
					});
			
					// 在组件销毁时停止监听（避免内存泄漏）
					this.$once('hook:beforeDestroy', () => {
						observer.disconnect();
					});
				} catch (e) {
					console.error("无法访问DOM，可能是跨域限制", e);
				}
			},
			async get_nickname(list,flag){
				if (flag) {
					for (let i=0;i<list.length;i++){
						await this.$get(
								"~/api/user/get_obj?user_id="+list[i],
								null,
								(json) => {
									if (json.result) {
										list[i] = json.result.obj.nickname;
									}
								});
					}
				}else {
					for (let i=0;i<list.length;i++){
						await this.$get(
								"~/api/user/get_obj?user_id="+list[i].name,
								null,
								(json) => {
									if (json.result) {
										list[i].name = json.result.obj.nickname;
									}
								});
					}
				}
			},
			// 获取指定日期的数据
			async get_order_month_some_price(date, o) {

				function getDateBetween(start, end) {
					var result = [];
					//使用传入参数的时间
					var startTime = new Date(start);
					var endTime = new Date(end);
					while (endTime - startTime >= 0) {
						let year = startTime.getFullYear();
						let month = startTime.getMonth();
						month = month < 9 ? '0' + (month + 1) : month + 1;
						let day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
						//加入数组
						result.push(year + "-" + month + "-" + day);
						//更新日期
						startTime.setDate(startTime.getDate() + 1);
					}
					return result;
				}

				const now = new Date();
				const nowYear = now.getFullYear();
				const nowMonth = now.getMonth() + 1;
				const nowDate = now.getDate();
				let days = []
				if(date){
					days = getDateBetween(date[0], date[1])
				}else{
					o.month[0] = new Date(nowYear, nowMonth - 1, 1, 0, 0, 0)
					o.month[1] = new Date(nowYear, nowMonth - 1, nowDate, 23, 59, 59)
					days = getDateBetween(o.month[0], o.month[1])
				}

				o.xAxis = []
				o.values = []
				o.loading = true
				let list = {
					result: [],
					total: 0
				}
				let field = o.type === "money" ? "price_count" : "num"
				for (let i = 0; i < days.length; i++) {
					const t = new Date(days[i])
					const time = t.getFullYear() + "-" + (t.getMonth()+1) + "-" + t.getDate()
					o.xAxis.push((t.getMonth()+1) + "-" + t.getDate())
					await this.get_order_sum_price_sub(list, time, i, field)
				}
				o.loading = false
				o.values = list.result
				o.total = list.total
			},
			// 获取某一天的销售数量
			async get_order_sum_price_sub(list, date, index, field) {
				let time = new Date(date).toStr("yyyy-MM-dd");
				var $where = ""
				let user_group = this.$store.state.user.user_group;
				let user_id = this.$store.state.user.user_id;
				if (user_group !== "管理员")
						$where = '&merchant_id=' + user_id
				const json = await this.$get(
						`~/api/order/sum?field=${field}&create_time_min=${time} 00:00:00&create_time_max=${time} 23:59:59&state=已付款` + $where,
						null,
				);
				list.result[index] = []
				if (json.result) {
					list.total += json.result
					list.result[index].push(json.result)
				} else {
					list.result[index].push(0)
				}
			},

			// 选择日期
			changeMonth(e, o) {
				this.get_order_month_some_price(e, o)
			},
			async get_url_subject_list() {
				const result = await this.$get("~/api/subject/get_list", null);
				for (let i = 0; i < result.result.list.length; i++) {
					this.bar_obj_subject_exam.tabs.push(result.result.list[i].name)
				}
				await this.get_url_subject_exam_list(this.bar_obj_subject_exam.tabs[0])
				this.bar_obj_subject_exam.names = [this.bar_obj_subject_exam.tabs[0]]
			},
			async get_url_subject_exam_list(e) {
				const json = await this.$get("~/api/subject_exam/get_list?subject_name=" + e)
				const allResult = []
				this.bar_obj_subject_exam.xAxis = []
				for (let j = 0; j < json.result.list.length; j++) {
					this.bar_obj_subject_exam.xAxis.push(json.result.list[j].name)
					const value = await this.$get("~/api/subject_user_answer/get_list", {
						user_id: this.$store.state.user.user_id,
						exam_id: json.result.list[j].exam_id,
					})
					if(value.result.list.length <= 0){
						allResult.push([])
					}else{
						for (let k = 0; k < value.result.list.length; k++) {
							allResult.push([value.result.list[k].score])
						}
					}
				}
				this.bar_obj_subject_exam.values = allResult
				this.bar_obj_subject_exam.names = [e]
			}
		},
		created() {
			this.get_order_month_some_price(null, this.line_obj_shop_money)
			this.get_order_month_some_price(null, this.bar_obj_shop_num)
			this.get_url_subject_list();
		},
		components: {
			newBarChart,
			newLineChart,
			subjectExamCharts,
			schedule,
			list_admin_menu_user
		},
	};
</script>

<style scoped>
	.container {
		min-height: 800px;
	}
</style>

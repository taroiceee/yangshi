<template>
	<div class="page_user" id="user_address">
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
							<!-- 场次安排 -->
							<div><span>场次安排</span></div>
							<table_schedule_of_sessions v-if="$check_action('/schedule_of_sessions/table','get')"></table_schedule_of_sessions>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import list_admin_menu_user from "@/components/diy/list_admin_menu_user.vue";
	import table_schedule_of_sessions from "../../components/diy/table_schedule_of_sessions.vue";
	export default {
		data() {
			return {
			};
		},
		mounted() {
		},
		methods: {
		},

		components: {
			list_admin_menu_user,
			table_schedule_of_sessions,
		},
	};
</script>

<style scoped>
	.container {
		min-height: 800px;
	}
</style>

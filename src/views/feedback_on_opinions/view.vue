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
							<!-- 意见反馈 -->
							<div><span>意见反馈</span></div>
							<view_feedback_on_opinions v-if="$check_action('/feedback_on_opinions/view','get')"></view_feedback_on_opinions>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import list_admin_menu_user from "@/components/diy/list_admin_menu_user.vue";
	import view_feedback_on_opinions from "../../components/diy/view_feedback_on_opinions.vue";
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
			view_feedback_on_opinions,
		},
	};
</script>

<style scoped>
	.container {
		min-height: 800px;
	}
</style>

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
							<!-- 我要定制 -->
							<div><span>我要定制</span></div>
							<table_i_want_to_customize_it v-if="$check_action('/i_want_to_customize_it/table','get')"></table_i_want_to_customize_it>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import list_admin_menu_user from "@/components/diy/list_admin_menu_user.vue";
	import table_i_want_to_customize_it from "../../components/diy/table_i_want_to_customize_it.vue";
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
			table_i_want_to_customize_it,
		},
	};
</script>

<style scoped>
	.container {
		min-height: 800px;
	}
</style>

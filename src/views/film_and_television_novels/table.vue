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
							<!-- 影视小说 -->
							<div><span>影视小说</span></div>
							<table_film_and_television_novels v-if="$check_action('/film_and_television_novels/table','get')"></table_film_and_television_novels>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import list_admin_menu_user from "@/components/diy/list_admin_menu_user.vue";
	import table_film_and_television_novels from "../../components/diy/table_film_and_television_novels.vue";
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
			table_film_and_television_novels,
		},
	};
</script>

<style scoped>
	.container {
		min-height: 800px;
	}
</style>

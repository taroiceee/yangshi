<template>
	<div class="page_user forum_table" id="user_address">
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
						<div class="card_addres forum  pl-2">
							<div><span>错题记录</span></div>
							<table_answer_wrong v-if="$check_action('/user_answer_wrong/table','get')"></table_answer_wrong>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import list_admin_menu_user from "@/components/diy/list_admin_menu_user.vue";
  import table_answer_wrong from "../../components/diy/subject_exam/table_answer_wrong.vue";
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
			table_answer_wrong,
		},
	};
</script>

<style scoped>
	.container {
		min-height: 800px;
	}
</style>

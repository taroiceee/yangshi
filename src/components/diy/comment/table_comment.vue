<template>
	<el-main class="bg table_wrap">
		<el-form label-position="right" :model="query" class="form p_4" label-width="120">
			<el-row class="rows row1">
				<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="昵称">
						<el-input v-model="query.nickname"></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="内容">
						<el-input v-model="query.content"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row class="rows row1">
				<el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap">
					<el-col :xs="24" :sm="12" :lg="12" class="search_btn_1">
						<el-form-item>
							<el-button type="primary" @click="search()" class="search_btn_find">查询</el-button>
							<el-button @click="reset()" class="search_btn_reset">重置</el-button>
							<el-button v-if="$check_action('/comment/table','del')" class="float-right search_btn_del" type="danger" @click="delInfo()">删除</el-button>
						</el-form-item>
				
						
					</el-col>
				</el-col>
			</el-row>
		</el-form>

		<el-table border :data="list" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" stripe>

			<!-- 多选按钮 -->
			<el-table-column fixed type="selection" tooltip-effect="dark" width="55">
			</el-table-column>
			<!-- /多选按钮 -->

			<el-table-column sortable fixed label="昵称" prop="nickname" width="200">
			</el-table-column>

			<el-table-column label="头像" prop="avatar" min-width="110">
				<template slot-scope="scope">
					<el-avatar style="width: 80px; height: 80px" :src="$fullUrl(scope.row.avatar)">
						<div slot="error" class="image-slot">
							<img src="../../../../public/img/error.png" style="width: 80px; height: 80px" />
						</div>
					</el-avatar>
				</template>
			</el-table-column>

			<el-table-column sortable label="评论人" prop="user_id" min-width="100">
				<template slot-scope="scope">
					{{list_user.getVal('nickname', {"user_id":scope.row.user_id})}}
				</template>
			</el-table-column>
			
			<el-table-column label="评论来源" prop="source_table" min-width="120">
				<template slot-scope="scope">
			       <router-link
			         :to="`/${scope.row.source_table}/details?${scope.row.source_field}=${scope.row.source_id}`"
				   >
			        <el-link type="success" ><span style="color: #409eff;">点击跳转</span></el-link>
			      </router-link>
				</template>
			</el-table-column>
			<el-table-column prop="content" :label="!this.query.reply_to_id ?'评论内容': '回复内容'" min-width="200">
			    <template slot-scope="scope">
			        <div v-html="scope.row.content"></div>
			    </template>
			</el-table-column>
			
			<el-table-column sortable prop="create_time" label="创建时间" min-width="200">
			    <template slot-scope="scope">
			        {{ $toTime(scope.row["create_time"],"yyyy-MM-dd hh:mm:ss") }}
			    </template>
			</el-table-column>

			<el-table-column sortable prop="update_time" label="更新时间" min-width="200">
			    <template slot-scope="scope">
			        {{ $toTime(scope.row["update_time"],"yyyy-MM-dd hh:mm:ss") }}
			    </template>
			</el-table-column>

			<!-- 操作 -->
			<el-table-column fixed="right" label="操作" width="250">
				<template slot-scope="scope">
					<router-link class="el-button el-button--small is-plain el-button--primary"
						:to="'./view?' + field + '=' + scope.row[field]" size="small">
            详情
					</router-link>
					<!--<router-link v-if="!scope.row['reply_to_id']" class="el-button el-button&#45;&#45;small is-plain el-button&#45;&#45;primary"
						:to="'./view?reply_to_id=' + scope.row[field]" size="small">
						回复
					</router-link>-->
					<a href="javascript:void(0)" class="el-button el-button--small is-plain el-button--primary" v-if="!scope.row['reply_to_id'] && query.source_id != 0" @click="reset();query.reply_to_id = scope.row[field];search()">
						查看被回复
					</a>
				</template>
			</el-table-column>
			<!-- /操作 -->
		</el-table>

		<!-- 分页器 -->
		<div class="mt text_center">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page"
			 :page-sizes="[7, 10, 30, 100]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper" :total="count">
			</el-pagination>
		</div>
		<!-- /分页器 -->

	</el-main>
</template>

<script>
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {

				// 表
				table:"comment",

				// 获取数据地址
				url_get_list: "~/api/comment/get_list?like=0",
				url_del: "~/api/comment/del?",

				// 字段ID
				field:"comment_id",

				// 查询
				query: {
					size: 10,
					page: 1,
					content: "",
					nickname: "",
					source_table: "",
					source_field: "",
					source_id: 0
				},

				// 数据
				list: [],

				//
				list_user: []
			}
		},
		methods: {
			get_create(){},
			async get_list_main(){
				// 获取数据地址
				this.url_get_list= "~/api/comment/get_list?like=0";
				if(this.query.source_id == 0){
					const user_id = this.$store.state.user.user_id;
					this.$set(this.query,'user_id',user_id);
				}
				const res = await this.$get(this.url_get_list, this.query);
				this.list = res.result.list;
				this.count = res.result.count;
			},
			async get_list_user(){
				var json = await this.$get("~/api/user/get_list?");
				if(json.result){
					this.list_user = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			table_class({row, column, rowIndex, columnIndex}){
				return "table_class";
			},
			reset(){
				this.query.page = 1;
				this.query.size = 10;
				this.query.nickname = "";
				this.query.content = "";
				this.get_list();
			}
		},
		created(){
			this.get_list_user();
		},
		mounted(){
		  setTimeout(() => {
			this.get_list_main()
			}, 500);
		},
	}
</script>

<style type="text/css">

</style>

<template>
	<el-main class="bg table_wrap">
		<el-form label-position="right" :model="query" class="form p_4" label-width="120">
			<el-row class="rows row1">
				<el-col :xs="24" :sm="24" :lg="8" class="el_form_search_wrap">
					<el-form-item label="标题">
						<el-input v-model="query.title"></el-input>
					</el-form-item>
				</el-col>

				<!--<el-col :xs="24" :sm="14" :lg="8" class="el_form_search_wrap">
					<el-form-item label="关键词">
						<el-input v-model="query.keywords"></el-input>
					</el-form-item>
				</el-col>-->

				<el-col :xs="24" :sm="14" :lg="8" class="el_form_search_wrap">
					<el-form-item label="分类">
						<el-select v-model="query.type">
							<el-option v-for="(o,i) in list_forum_type" :value="o.name" :key="i" :label="o.name"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row class="rows row2 ">
				<el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap">
					<el-col :xs="24" :sm="12" :lg="12" class="search_btn_1">
						
							<el-button type="primary" @click="search()" class="search_btn_find">查询</el-button>
							<el-button @click="reset()" class="search_btn_reset">重置</el-button>
							<el-button v-if="$check_action('/forum/table','del')" class="float-right search_btn_del" type="danger" @click="delInfo()">删除</el-button>
							<el-button  v-if="$check_action('/forum/table','add')" class="float-right  search_btn_add" @click="$router.push('./view?')">添加</el-button>
					</el-col>
					
						
							
						
					
				</el-col>
			</el-row>
		</el-form>
		<el-table border :data="list" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%" stripe>

			<el-table-column fixed type="selection" tooltip-effect="dark" width="50">
			</el-table-column>

			<el-table-column fixed prop="title" label="标题" sortable width="100">
				<template slot-scope="scope">
					<a :href="scope.row.url">
						{{scope.row.title}}
					</a>
				</template>
			</el-table-column>

			<el-table-column prop="img" label="封面图" min-width="110">
				<template slot-scope="scope">
					<el-image style="width: 100px; height: 100px" :src="$fullUrl(scope.row.img)" :preview-src-list="[$fullUrl(scope.row.img)]">
						<div slot="error" class="image-slot">
							<img src="../../../../public/img/error.png" style="width: 100px; height: 100px" />
						</div>
					</el-image>
				</template>
			</el-table-column>

			<!--<el-table-column prop="avatar" label="头像" min-width="110">-->
				<!--<template slot-scope="scope">-->
					<!--<el-avatar style="width: 80px; height: 80px;" :src="$fullUrl(scope.row.avatar)">-->
						<!--<img src="/img/error.png" />-->
					<!--</el-avatar>-->
				<!--</template>-->
			<!--</el-table-column>-->

			<el-table-column prop="type" label="分类" min-width="160">
			</el-table-column>

			<!--<el-table-column prop="keywords" label="关键词" min-width="160">-->
			<!--</el-table-column>-->

			<!--<el-table-column prop="description" label="描述" min-width="160">-->
			<!--</el-table-column>-->

			<el-table-column prop="tag" label="标签" min-width="160">
			</el-table-column>
			<el-table-column prop="istop" label="置顶状态" sortable min-width="200">
			  <template slot-scope="scope">
			    {{ scope.row["istop"] ? "是" : "否" }}
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
			<el-table-column fixed="right" label="操作" width="170">
				<template slot-scope="scope">
					<router-link class="el-button el-button--small is-plain el-button--primary"
						:to="'./view?' + field + '=' + scope.row[field]" size="small">
            详情
					</router-link>
					<router-link class="el-button el-button--small is-plain el-button--primary"
						:to="'../comment/table?size=10&page=1&source_table=forum&source_field=' + field + '&source_id=' + scope.row[field]" size="small">
						查看评论
					</router-link>
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
				// 获取数据地址
				url_get_list: "~/api/forum/get_list?like=0",
				url_del: "~/api/forum/del?",

				// 字段ID
				field:"forum_id",

				// 查询
				query: {
					size: 10,
					page: 1,
					title: "",
					keywords: "",
					type:"",
					user_id:0
				},

				// 数据
				list: [],

				list_forum_type: []
			}
		},
		methods: {
			/**
			 * 请求列表前
			 * @param {Object} param
			 */
			get_list_before(param) {
				let user_group = this.user.user_group;
				if (user_group !== "管理员") {
					param["user_id"] = this.user.user_id;
				}
				return param;
			},
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},
			table_class({row, column, rowIndex, columnIndex}){
				return "table_class";
			},
			/**
			 * 获取论坛分类
			 */
			async get_forum_type() {
				var json = await this.$get("~/api/forum_type/get_list?");
				if(json.result){
					this.list_forum_type = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			}
		},
		created(){
			this.get_forum_type();
		}
	}
</script>

<style type="text/css">

</style>

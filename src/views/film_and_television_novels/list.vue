<template>
	<div class="diy_list page_film_and_television_novels" id="film_and_television_novels_list">
		<div class="warp">
			<div class="container diy_list_container">
				<div class="diy_list_title">
					<div class="col">
						<span class="title">影视小说列表</span>
					</div>
				</div>
				<div class="leis_box"> 
				<div class="iudis_box">
			
				<div class="row diy_list_search">
					<div class="col">
						<!-- 搜索栏 -->
						<div class="view Search">
							<span class="diy_list_search_title">关键字搜索：</span>
																															<b-form-input size="sm" class="mr-sm-2" placeholder="专辑名称搜索" v-model="query['album_name']" />
																																																											<b-form-input size="sm" class="mr-sm-2" placeholder="作者姓名搜索" v-model="query['authors_name']" />
																																															<b-button size="sm" @click="search()" >
								<b-icon icon="search"/>
							</b-button>
						</div>
						<!-- /搜索栏 -->
					</div>
				</div>
				<div class="diy_list_select_box">
					<span class="diy_list_select_title">下拉搜索：</span>
						<div class="diy_list_dropdown_box">
						<div class="col">
							<!-- 筛选 -->
							<div class="view sift">
																		<!-- 排序 -->
							
								<b-dropdown text="排序" variant="outline-dark" left>
										<b-dropdown-item v-for="(o, i) in list_sort" :key="i" @click="set_sort(o)" >
												{{ o.name }}
										</b-dropdown-item>
								</b-dropdown>
						
							<!--/排序 -->
							</div>
							<!-- /筛选 -->
						</div>
					</div>
				
				</div>
								<div class="map_btn">
					<el-button class="search_btn_map" @click="openMap()">查看地图</el-button>
				</div>
							</div>
				<div class="row diy_list_box">
					<div class="col">
						<!-- 列表 -->
												<list_film_and_television_novels :list="list" />
												<!-- /列表 -->
					</div>
				</div>
	</div>
	<!-- 大盒子结尾 -->
				<div class="row diy_list_page_box">
					<div class="col overflow-auto flex_cc">
						<!-- 分页器 -->
<!--						<diy_pager v-model="query['page']" :size="query['size']" :count="count" v-on:toPage="toPage" v-on:toSize="toSize" ></diy_pager>-->
            <b-pagination
                v-model="query.page"
                :total-rows="count"
                :per-page="query.size"
                @change="goToPage"
            />
						<!-- /分页器 -->
					</div>
				</div>
				<music_player :music-list="player_list"></music_player>
			</div>
		</div>
	</div>
</template>

<script>
	import list_film_and_television_novels from "@/components/diy/list_film_and_television_novels.vue";
	import diy_pager from "@/components/diy/diy_pager";
	import mixin from "@/mixins/page.js";
	import music_player from "@/components/diy/music_player.vue";

	export default {
		mixins: [mixin],
		components: {
			diy_pager,
			list_film_and_television_novels,
			music_player,
		},
		data() {
			return {
				url_get_list: "~/api/film_and_television_novels/get_list?like=0",

				// 查询条件
				query: {
					keyword: "",
					page: 1,
					size: 12,
								"album_name": "", // 专辑名称
												"authors_name": "", // 作者姓名
								},
				player_list: [],
				// 排序内容
				list_sort: [{
						name: "创建时间从高到低",
						value: "create_time desc",
					},
					{
						name: "创建时间从低到高",
						value: "create_time asc",
					},
					{
						name: "更新时间从高到低",
						value: "update_time desc",
					},
					{
						name: "更新时间从低到高",
						value: "update_time asc",
					},
								],

								
			}
		},
		methods: {
      get_list_before(param) {
      },
			/**
			 * 筛选选择
			 */
			filter_set(o,key) {
			    if (o == "全部") {
			        this.query[key] = "";
			    } else {
			        this.query[key] = o;
			    }
			    this.search();
			},

			/**
			 * 排序
			 */
			set_sort(o) {
			    this.query.orderby = o.value;
			    this.search();
			},
				/**
				 * 获取列表后
				 * @param {Object} json
				 * @param {Object} func
				 */
				get_list_after(json ,func){
					let list = json.result.list;
					for (let i = 0 ; i < list.length; i++){
						let obj = {};
									obj.music_name = list[i].album_name
											obj.cover = list[i].album_cover
											obj.singer = list[i].authors_name
											obj.audio_frequency = list[i].audio_content
									this.player_list.push(obj)
					}
					if (func) {
						func(json);
					}
				},
							/**
			 * 筛选
			 */
																	/**
			 * 重置
			 */
			reset() {
							this.query.album_name = ""
											this.query.authors_name = ""
								this.search();
			},

			// 返回条数
			toSize(i){
				this.query.size = i;
				this.first();
			},

			// 返回页数
			toPage(i){
				this.query.page = i;
				this.first();
			},

      goToPage(v){
        this.query.page = v;
        this.goToNew(v)
      },

			openMap(){
				this.$router.push("/film_and_television_novels/map")
			},
		},
		computed: {
		},
		created() {
										}
	}
</script>

<style>
.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner,.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
	width: 100%;
}
.el-date-editor .el-range-separator{
	width: 11% !important;
}
.num_range {
  display: flex;
  align-items: center;
}

.num_range_span {
  font-size: 28px;
}
</style>

<template>
  <el-main class="bg table_wrap comtabel_t">
    <el-form label-position="right" :model="query" class="form p_4" label-width="120">
      <el-row class="rows row1">
        <el-col :xs="24" :sm="24" :lg="24" class="el_form_search_wrap">
          <el-form-item label="章节名称">
            <el-input v-model="query.chapter_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="rows row2">
        <el-col :xs="24" :sm="24" :lg="24" class="search_btn_wrap search_btns">
          <el-col :xs="24" :sm="10" :lg="8" class="search_btn_1 search_btn_wrap_1 btns">
            <el-button type="primary" @click="search()" class="search_btn_find">查询</el-button>
            <el-button @click="reset()" class="search_btn_reset">重置</el-button>
            <el-button style="margin-right: 74px;" @click="$router.push('./view?novel_reading_id=' + query.novel_reading_id + '&source_table=' + query.source_table + '&source_field=' + query.source_field)" class="search_btn_add">添加</el-button>
            <el-button class="search_btn_del" type="danger" @click="delInfo()">删除</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="list" @selection-change="selectionChange" @sort-change="$sortChange" style="width: 100%"
              id="dataTable">
      <el-table-column fixed type="selection" tooltip-effect="dark" width="55">
      </el-table-column>
      <el-table-column prop="chapter_name" @sort-change="$sortChange" label="章节名称" min-width="200">
      </el-table-column>
      <el-table-column prop="sort" @sort-change="$sortChange" label="排序" min-width="200">
      </el-table-column>
      <el-table-column prop="chapter_content" @sort-change="$sortChange" label="章节内容" min-width="200" :formatter="contentFormatter">
      </el-table-column>
      <el-table-column sortable prop="create_time" label="创建时间" min-width="200">
        <template slot-scope="scope">
          {{ $toTime(scope.row["create_time"], "yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>

      <el-table-column sortable prop="update_time" label="更新时间" min-width="200">
        <template slot-scope="scope">
          {{ $toTime(scope.row["update_time"], "yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="100">
        <template slot-scope="scope">
          <div class="view_a">
            <router-link class="e-button el-button--small is-plain el-button--success" style="margin: 5px !important;"
                         :to="'./view?novel_reading_id=' + scope.row['novel_reading_id'] + '&' + field + '=' + scope.row[field]"
                         size="small">
              <span>详情</span>
            </router-link>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div class="mt text_center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="query.page" :page-sizes="[7, 10, 30, 100]" :page-size="query.size"
                     layout="total, sizes, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>
    <!-- /分页器 -->
  </el-main>
</template>

<script>
import mixin from "@/mixins/page";

export default {
  mixins: [mixin],
  data(){
    return {
      field: "novel_chapters_id",
      query: {
        "size": 7,
        "page": 1,
        "chapter_name": "",
        "source_table": "",
        "source_field": "",
        "novel_reading_id": 0,
        "orderby": `sort`
      },
      url_get_list: "~/api/novel_chapters/get_list?",
      url_del: "~/api/novel_chapters/del?",
      list: []
    }
  },
  created() {

  },
  methods:{
    reset(){
      this.query.chapter_name = ""
      this.get_list()
    },
	contentFormatter(row, column, cellValue) {
		const regex = /<p>([\s\S]*?)<\/p>/g;
		const imgReg = /<img.*?(?:>|\/>)/gi;
		let match;
		let result = "";
		 
		while ((match = regex.exec(cellValue))) {
		    result += match[1];
		}
		var deArray  = result.match(imgReg);//使用正则表达式，拿到的是数组
		if (deArray != null && deArray != undefined) {
		    for (let vm of deArray) {
		        result = result.replace(vm, "") //放在循环中剔除img标签
		    }
		}
	    return result.length > 50 ? result.slice(0, 50) + '...' : result;
	}
  }
}
</script>

<style scoped>

</style>
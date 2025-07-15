<template>
  <div class="diy_list page_fresh_goods" id="fresh_goods_list">
    <div class="warp">
      <div class="container diy_list_container diy_vs">
        <div class="diy_list_title">
          <div class="col">
            <span class="title">数据对比</span>
          </div>
        </div>
        <div class="leis_box">
          <el-table style="width: 100%" :data="getValues" :show-header="false" border :cell-style="cellStyle">
            <el-table-column v-for="(item, index) in getHeaders" :key="index" :prop="item">
              <template slot-scope="scope">
                <div v-if="scope.row.img === 1 && index" class="diy_field diy_img">
                  <img :src="$fullUrl(scope.row[item])" style="width: 100%; height: 100%" />
                </div>
                <div v-else>
                  {{ scope.row[item] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      rows: [],
      columns: [
	  { title: "封面图",name: "img",img_top: 1},
	  { title: "标题",name: "title"},
	  { title: "描述",name: "description"},
	  { title: "原价",name: "price_ago"},
	  { title: "卖价",name: "price"},
	  { title: "销量",name: "sales"},
	  { title: "库存",name: "inventory"},
	  { title: "分类",name: "type"}
		  	  , {title: "商品编号", name: "commodity_number", customize: 1}
	  		  	  , {title: "下单规则", name: "order_rules", customize: 1}
	  		  		  	  , {title: "店铺地址", name: "store_address", customize: 1}
	  		  	  , {title: "店铺名称", name: "shop_name", customize: 1}
	  	      ]
    }
  },
  computed: {
    getHeaders() {
      return this.tableData.reduce((pre, cur, index) => pre.concat(`value${index}`), ['title'])
    },
    getValues() {
      return this.columns.map(item => {
        return this.tableData.reduce((pre, cur, index) => Object.assign(pre, { ['value' + index]: cur[item.name] }), { 'title': item.title, 'img': item.img_top });
      });
    }
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'background: #F5F7FA; textAlign: center'
      } else if(rowIndex === 0) {
        return 'height: 200px;'
      }
      return 'textAlign: center'
    },
    getData(data) {
      this.rows = this.columns.map((col, index) => {
        let row = { title: col.title };
        data.forEach((item, i) => {
          row['col' + i] = item[col.name];
        });
        return row;
      });
    }
  },
  created() {
    if (this.$route.params && this.$route.params.productList) {
      this.tableData = this.$route.params.productList;
	  this.tableData.map(item => {
	  	if('customize_field' in item){
	  		let customize_field = JSON.parse(item.customize_field)
	  		customize_field.map(field => {
	  			this.columns.map(col => {
	  				if(col.customize == 1 && col.title == field.field_name){
	  					item[col.name] = field.field_value
	  				}
	  			})
	  		})
	  		return item
	  	}
	  })
      this.getData(this.tableData);
    }
  }
}
</script>

<style scoped>
.diy_img {
  height: 200px;
  padding-top: 10px;
  margin-bottom: 10px;
}
.diy_vs table{
	border-collapse: collapse;
}
.diy_vs .leis_box{
	width: 100%;
}
.diy_vs .diy_img{
	height: auto;
}
</style>
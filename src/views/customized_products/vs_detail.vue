<template>
  <div class="diy_list page_customized_products" id="customized_products_list">
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
		  {title: "商品封面", name: "commodity_cover", img_top: 1}
			  	  , {title: "商品编号", name: "commodity_number"}
	  		  	  , {title: "商品名称", name: "name_of_commodity"}
	  		  	  , {title: "分类名称", name: "category_name"}
	  		  		  		  	  , {title: "定制库存", name: "custom_inventory"}
	  		  	  , {title: "产品生产日期", name: "product_production_date"}
	  		  		  	  , {title: "保质时间", name: "shelf_life_time"}
	  		  		  	  , {title: "定制类型", name: "custom_type"}
	  		  	  , {title: "定制要求", name: "custom_requirements"}
	  		  	  , {title: "定制价格", name: "customized_price"}
	  		  	  , {title: "说明备注", name: "notes"}
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
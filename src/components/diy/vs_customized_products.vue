<template>
  <div>
    <ul>
      <li v-for="o in goods" :key="o.id" class="li">
        <div v-if="o[itemList[0].name]" style="width: 100%;">
          <!-- 图片 -->
          <div class="diy_list_img_box" v-if="imgList.length">
            <div class="diy_row">
              <div class="diy_field diy_img">
                <img :src="$fullUrl(o[imgList[0].name])" style="width:100%;height:100%" />
              </div>
            </div>
            <div class="diy_product_name">{{ o[itemList[0].name] }}</div>
          </div>
          <div class="checkbox-container">
            <el-button type="text" @click="handleDel(o)"><i class="el-icon-error"></i></el-button>
          </div>
        </div>
        <div v-else class="goods-other">
          <div>您还可以继续添加</div>
        </div>
        <div class="dashed-line"></div>
      </li>
    </ul>
    <div class="footer">
      <el-button type="primary" @click="vs()">对比</el-button>
      <el-button @click="clear()">清空</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    productList: {
      type: Array,
      default: function () {
        return [];
      },
    }
  },
  data() {
    return {
	  imgList: [
	  	  	{
	  		title: "商品封面",
	  		name: "commodity_cover",
	  	},
	  	  ],
	  itemList: [
	  	  	{
	  		title: "商品编号",
	  		name: "commodity_number",
		},
	  	  	{
	  		title: "商品名称",
	  		name: "name_of_commodity",
		},
	  	  	{
	  		title: "分类名称",
	  		name: "category_name",
		},
	  	  	{
	  		title: "商品相册",
	  		name: "commodity_album",
		},
	  	  	{
	  		title: "定制库存",
	  		name: "custom_inventory",
		},
	  	  	{
	  		title: "产品生产日期",
	  		name: "product_production_date",
		},
	  	  	{
	  		title: "商家用户",
	  		name: "business_user",
		},
	  	  	{
	  		title: "保质时间",
	  		name: "shelf_life_time",
		},
	  	  	{
	  		title: "定制声明内容",
	  		name: "custom_statement_content",
		},
	  	  	{
	  		title: "定制类型",
	  		name: "custom_type",
		},
	  	  	{
	  		title: "定制要求",
	  		name: "custom_requirements",
		},
	  	  	{
	  		title: "定制价格",
	  		name: "customized_price",
		},
	  	  ],
      goods: []
    };
  },
  computed: {
    localProductList: {
      get() {
        return this.productList;
      },
      set(value) {
        this.$emit('update-product-list', value);
      }
    }
  },
  mounted() {
    this.getGoods(this.localProductList)
  },
  watch: {
    productList: {
      handler(val) {
        this.getGoods(val)
      },
      deep: true
    }
  },
  methods: {
    getGoods(list) {
      const checkArr = list.filter(el => el.checked);
      const arr = []
      for (let i = 0; i < 4; i++) {
        if (checkArr[i]) {
          arr.push({ ...checkArr[i], id: 'goods' + i });
        } else {
          arr.push({ id: 'goods' + i })
        }
      }
      this.goods = arr;
    },
    handleDel(val) {
      const newList = [...this.localProductList];
      const realIndex = newList.findIndex(item => item.customized_products_id === val.customized_products_id);
      if (realIndex !== -1) {
        newList[realIndex].checked = false; // 标记为未选中
      }
      this.getGoods(newList);
      this.localProductList = [...newList];
    },
    clear() {
      if (this.localProductList.length) {
        const newList = this.localProductList.map(item => ({ ...item, checked: false }));
        this.getGoods(newList);
        this.localProductList = [...newList];
      }
    },
    vs() {
      this.$router.push({
        name: '/customized_products_vs_detail',
        params: { productList: this.goods }
      });
    }
  }
};
</script>
<style scoped>
.li {
  height: 240px;
  margin: 10px;
  padding: 10px;
  text-align: center;
}

.diy_img {
  height: 200px;
  padding-top: 10px;
  margin-bottom: 10px;
}

.diy_product_name {
  text-align: left;
  margin-bottom: 10px;
}

.checkbox-container {
  width: 30px;
  height: 30px;
  position: absolute;
  top: -2px;
  right: -3px;
}

button>i {
  font-size: 18px !important;
}

i {
  width: 30px;
  height: 30px;
  font-size: 20px;
  color: #212121c7;
}

.goods-other {
  color: #909399;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.dashed-line {
  border-top: 1px dashed #000;
}

.footer {
  display: flex;
  justify-content: center;
}
</style>
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
	  		title: "封面图",
	  		name: "img",
	  	},
	  ],
	  itemList: [
	  	{
	  		title: "标题",
	  		name: "title",
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
      const realIndex = newList.findIndex(item => item.fresh_goods_id === val.fresh_goods_id);
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
        name: '/fresh_goods_vs_detail',
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
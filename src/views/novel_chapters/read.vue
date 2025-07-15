<template>
  <div class="novel_read page_novel_reading">
    <div class="container">
      <el-row>
        <el-col :xs="6" :sm="6" :lg="6">
          <div class="novel_chapters">
            <div class="novel_chapters_title">目录</div>
            <div v-for="(item,index) in list">
              <div @click="changeChapter(index)" class="novel_chapters_list_item" :class="{'active':currentChapterIndex === index}">
                <span>第{{ index +  1 }}章</span>
                <span class="chapter_name">{{ item.chapter_name }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="18" :sm="18" :lg="18" :style="{ backgroundColor: bgColor, color: fontColor }">
          <div class="novel_content">
            <div class="content_title">
              {{ list[currentChapterIndex].chapter_name }}
            </div>
			<div class="read_setting" style="display: flex; align-items: center">
				<div class="fontSize_set">
				  字体大小
				  <el-input size="small" style="width: 50px" v-model="fontSize" />
				</div>
				<div class="fontColor_set font_style" style="margin-right: 10px">
                字体颜色
                <el-select v-model="fontColor" placeholder="请选择" style="width: 70px">
                  <el-option v-for="item in fontColorOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
			  <div class="bgColor_set font_style" style="margin-right: 10px">
                背景颜色
                <el-select v-model="bgColor" placeholder="请选择" style="width: 70px">
                  <el-option v-for="item in bgColorOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
			  <el-button type="primary" @click=" bgColor !== 'rgb(204, 232, 207)' ? (bgColor = 'rgb(204, 232, 207)') : (bgColor = '#ffffff'); fontColor = '#000000';">护眼</el-button>
              <el-button type="primary" @click="douseGlim">{{ bgColor === "rgb(17, 17, 17)" ? "开灯" : "关灯" }}</el-button>
			</div>
            
            <pre
                class="novel_content_html"
                v-html="list[currentChapterIndex].chapter_content"
                :style="{
                  fontSize: fontSize + 'px',
				  color: fontColor,
                }"
            >
            </pre>
            <div class="chapter_button">
              <el-button :disabled="currentChapterIndex <= 0" @click="changeChapter('prev')">上一章</el-button>
              <el-button :disabled="currentChapterIndex >= list.length -1" @click="changeChapter('next')">下一章</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import mixin from "@/mixins/page";

  export default {
    mixins:[mixin],
    data(){
      return {
        field: "novel_reading_id",
        url_get_list: "~/api/novel_chapters/get_list?",
        query: {
          "source_table": "",
          "source_field": "",
          "novel_reading_id": 0,
          "orderby": 'sort asc'
        },
        list:[],
        currentChapterIndex: 0,
        fontSize: 16,
		fontColor: "#000000",
      fontColorOptions: [
        {
          value: "#000000",
          label: "默认",
        },
        {
          value: "#9370db",
          label: "暗紫",
        },
        {
          value: "#2e8b57",
          label: "藻绿",
        },
        {
          value: "#2f4f4f",
          label: "深灰",
        },
        {
          value: "#800000",
          label: "栗色",
        },
        {
          value: "#6a5acd",
          label: "青蓝",
        },
        {
          value: "#f5f5dc",
          label: "米色",
        },
        {
          value: "#f5f5f5",
          label: "雾白",
        },
      ],
      bgColor: "#ffffff",
      bgColorOptions: [
        {
          value: "#ffffff",
          label: "默认",
        },
        {
          value: "rgb(255, 255, 237)",
          label: "明黄",
        },
        {
          value: "rgb(238, 250, 238)",
          label: "淡绿",
        },
        {
          value: "rgb(204, 232, 207)",
          label: "草绿",
        },
        {
          value: "rgb(239, 239, 239)",
          label: "深灰",
        },
        {
          value: "rgb(245, 245, 220)",
          label: "米色",
        },
        {
          value: "rgb(210, 180, 140)",
          label: "茶色",
        },
        {
          value: "rgb(192, 192, 192)",
          label: "银色",
        },
        {
          value: "rgb(17, 17, 17)",
          label: "暗黑",
        },
      ],
      }
    },
    methods:{
      changeChapter(operate){
        switch (operate){
          case "prev":{
            this.currentChapterIndex--
            break;
          }
          case "next":{
            this.currentChapterIndex++
            break;
          }
          default:{
            this.currentChapterIndex = operate
          }
        }
      },
	  douseGlim() {
		  if (this.bgColor !== "rgb(17, 17, 17)") {
			this.bgColor = "rgb(17, 17, 17)";
			this.fontColor = "#f5f5dc";
		  } else {
			this.bgColor = "#ffffff";
			this.fontColor = "#000000";
		  }
	  },
    }
  }

</script>


<style scoped>
  .novel_read{
    padding-top: 168px;
  }
  .novel_chapters{
    padding: 10px;
  }
  .novel_chapters_title{
    font-size: 22px;
    font-weight: bold;
  }
  .novel_chapters_list_item{
    display: flex;
    flex-direction: row;
    margin-top: 5px;
  }
  .active{
    color: #2accfa;
  }
  .novel_chapters_list_item:hover{
    color: #2accfa;
    cursor: pointer;
  }
  .chapter_name{
    margin-left: 5px;
  }
  .novel_content{
    padding: 10px;

  }
  .novel_content_html{
    padding: 20px;
  }
  .content_title{
    font-weight: bold;
    font-size: 24px;
    text-align: center;
  }
  .fontSize_set{
    font-size: 16px;
  }
  .chapter_button{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .content_title {
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
  }
</style>
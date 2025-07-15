<template>
  <div class="novel_read page_novel_reading">
    <div class="container">
      <el-row>
        <el-col :xs="6" :sm="6" :lg="6">
          <div class="movie_episode">
            <div class="movie_episode_title">播放目录</div>
            <div v-for="(item, index) in list">
              <div
                @click="changeChapter(index)"
                class="movie_episode_list_item"
                :class="{ active: currentChapterIndex === index }"
              >
                <span>第{{ index + 1 }}集</span>
                <span class="episode_name">{{ item.episode_name }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="18" :sm="18" :lg="18">
          <div class="novel_content">
            <div class="content_title">
              {{ list[currentChapterIndex].episode_name }}
            </div>
            <div class="video-content">
              <video
                controls
                :src="$fullUrl(list[currentChapterIndex].episode_url)"
              ></video>
            </div>
            <div class="chapter_button">
              <el-button
                :disabled="currentChapterIndex <= 0"
                @click="changeChapter('prev')"
                >上一集</el-button
              >
              <el-button
                :disabled="currentChapterIndex >= list.length - 1"
                @click="changeChapter('next')"
                >下一集</el-button
              >
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
  mixins: [mixin],
  data() {
    return {
      field: "move_info_id",
      url_get_list: "~/api/movie_episode/get_list?",
      query: {
        source_table: "",
        source_field: "",
        move_info_id: 0,
        orderby: "sort asc",
      },
      list: [],
      currentChapterIndex: 0,
    };
  },
  methods: {
    changeChapter(operate) {
      switch (operate) {
        case "prev": {
          this.currentChapterIndex--;
          break;
        }
        case "next": {
          this.currentChapterIndex++;
          break;
        }
        default: {
          this.currentChapterIndex = operate;
        }
      }
    },
  },
};
</script>


<style scoped>
.novel_read {
  padding-top: 168px;
}
.movie_episode {
  padding: 10px;
}
.movie_episode_title {
  font-size: 22px;
  font-weight: bold;
}
.movie_episode_list_item {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}
.active {
  color: #2accfa;
}
.movie_episode_list_item:hover {
  color: #2accfa;
  cursor: pointer;
}
.episode_name {
  margin-left: 5px;
}
.novel_content {
  padding: 10px;
  height: 100%;
}

.content_title {
  font-weight: bold;
  font-size: 24px;
  text-align: center;
}
.chapter_button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.video-content {
  height: 52vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.video-content video {
  width: auto;
  height: auto;
  max-height: 100%;
  max-width: 100%;
}
</style>

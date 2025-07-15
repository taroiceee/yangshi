<template>
  <el-main class="bg edit_wrap">
    <el-form label-position="right" class="form p_4" label-width="120" v-model="form">
      <el-row>
        <el-col :xs="24" :sm="24" :lg="24" class="el_form_item_warp">
          <el-form-item label="集数名称">
            <el-input v-model="form.episode_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="24" class="el_form_item_warp">
          <el-form-item label="集数排序">
            <el-input v-model="form.sort"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="24" class="el_form_editor_warp">
          <el-form-item label="集数内容">
            <el-upload
              :class="[
                'upload_video_myself avatar-uploader',
                !!form.episode_url ? 'hide_video_something' : '',
              ]"
              action=""
              drag
              accept="video/mp4,video/webm"
              :http-request="uploadIcon"
              :show-file-list="false"
              :on-success="handleVideoSuccess"
              :on-progress="uploadVideoProcess"
            >
              <video
                v-if="form.episode_url != '' && videoFlag == false"
                :src="$fullUrl(form.episode_url)"
                class="add_video"
                controls="controls"
              >
                您的浏览器不支持视频播放
              </video>
              <div v-else-if="form.episode_url == '' && videoFlag == false">
                <i class="el-icon-upload"></i>
                <div class="upload_text">将视频拖到此处，或<span class="click_upload_col">点击上传</span></div>
              </div>
              <el-progress
                v-if="videoFlag == true"
                type="circle"
                :percentage="videoUploadPercent"
                style="margin-top: 30px"
              ></el-progress>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :lg="2" class="el_form_btn_warp">
          <el-form-item>
            <el-button type="primary" @click="handinVideo()">提交</el-button>
            <el-button @click="cancel()">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
import mixin from "@/mixins/page";
import el from "element-ui/src/locale/lang/el";

export default {
  mixins: [mixin],
  name: "movie_episode_view",
  data() {
    return {
      field: "movie_episode_id",
      url_add: "~/api/movie_episode/add?",
      url_set: "~/api/movie_episode/set?",
	  url_upload: "~/api/movie_episode/upload?",
      url_get_obj: "~/api/movie_episode/get_obj?",
      query:{
        movie_episode_id:0
      },
      form: {
        "movie_episode_id":0,
        "episode_name": '', // 集数名称
        "sort": '', // 排序
        "episode_url": '', // 集数内容
        "source_table": "",
        "source_field": ""
      },
	  videoUploadPercent: 0,
      videoFlag: false,
    }
  },
  created() {
    if(this.$route.query.move_info_id){
      this.form.move_info_id = this.$route.query.move_info_id
    }else {
      this.form.movie_episode_id = this.$route.query.movie_episode_id
    }
    if(this.$route.query.source_table){
      this.form.source_table = this.$route.query.source_table
    }else {
      this.form.movie_episode_id = this.$route.query.movie_episode_id
    }
    if(this.$route.query.source_field){
      this.form.source_field = this.$route.query.source_field
    }else {
      this.form.source_field = this.$route.query.source_field
    }
  },
  methods:{
    submit_check(params) {
      var msg = "";
      if (params.episode_name === "") {
        msg = "集数名称不能为空";
        return msg;
      }
      if (params.sort === "") {
        msg = "集数排序不能为空";
        return msg;
      }
      if (params.episode_url === "") {
        msg = "集数内容不能为空";
        return msg;
      }
    },
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0);
    },
    handleVideoSuccess(res, file) {
      //获取上传图片地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if (res.status == 200) {
        this.form.episode_url = res.data.uploadUrl;
      } else {
        this.$message.error("视频上传失败，请重新上传！");
      }
    },
    uploadIcon(param) {
      this.uploadFile(param.file, "episode_url");
    },
    handinVideo(){
      //上传
      let params = this.form;
      if (params.episode_name === "") {
        this.$toast('集数名称不能为空');
        return false;
      }
      if (params.sort === "") {
        this.$toast('集数排序不能为空');
        return false;
      }
      if (params.episode_url === "") {
        this.$toast('集数内容不能为空');
        return false;
      }
      // 提交事件
      let that=this;
	  if(this.form.movie_episode_id == 0 || this.form.movie_episode_id == undefined){
		  this.$post(this.url_add, this.form, (res) => {
		          console.log("提交结果：", res);
		          if (res.result) {
		            this.$toast("添加成功!", "success");
		            this.cancelPage();
		          } else if (res.error) {
		            console.error(res.error);
		            this.$toast(res.error.message, "error");
		          }
		        });
	  }else{
		  let url = this.url_set+"movie_episode_id="+this.form.movie_episode_id;
		  that.$post(url, this.form, (res) => {
		    console.log("提交结果：", res);
		    if (res.result) {
		      this.$toast("修改成功!", "success");
		      this.cancelPage();
		    } else if (res.error) {
		      console.error(res.error);
		      this.$toast(res.error.message, "error");
		    }
		  });
	  }
    },
    cancelPage() {
      let that=this;
      localStorage.setItem('move_info_id',this.query.move_info_id)
      setTimeout(function(){
        that.$router.go(-1);
      },500)
  
    },
  },
}
</script>

<style>
.video_add{
  background:#eef1d5 !important;
 
}
.upload_video_myself .el-upload .el-upload-dragger {
  width: auto !important;
  height: auto !important;
  max-width: 600px !important;
  max-height: 500px !important;
  min-width: 150px;
  min-height: 150px;
  border: 1px dashed #ccc !important;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: transparent !important; */
  /* border-radius: 0; */
}
.hide_video_something .el-upload .el-upload-dragger {
  background-color: transparent !important;
  border-radius: 0;
  border: none !important;
}
.upload_video_myself .add_video {
  width: auto !important;
  height: auto !important;
  max-width: 600px !important;
  max-height: 500px !important;
}
.upload_text,.el-icon-upload{
  color:#555555 !important;
  font-size: 12px;
  /* background:none !important; */
}
.upload_text{
  padding:0 10px;
}
.click_upload_col{
  color:#2c70f6;
}
</style>
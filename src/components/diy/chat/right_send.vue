<template>
  <div class="right_send">
    <div class="icon_box">
      <el-popover
          placement="top"
          width="300"
          v-model="visible">
        <div class="emoji_box">
          <div style="padding:2px"  v-for="item in $store.state.chat.emojiList">
            <img :src="getEmojiUrl(item.url)" :alt="item.alt" @click="joinEmoji(item.alt)"/>
          </div>
        </div>
        <el-button slot="reference" type="primary" icon="el-icon-eleme" circle size="mini"></el-button>
      </el-popover>
      <div style="overflow: hidden">
        <el-upload
            ref="uploadFile"
            class="upload-demo"
            :action="$fullUrl('~/api/user_chat_friend/upload')"
            :limit="1"
            :before-upload="beforeUploadFile"
            :on-success="uploadFileSuccess"
        >
          <el-button class="file" type="primary" icon="el-icon-folder" circle size="mini"></el-button>
        </el-upload>
      </div>
    </div>
    <div class="edit_message">
      <el-input
          resize="none"
          type="textarea"
          placeholder="请输入内容"
          v-model="textarea">
      </el-input>
    </div>
    <div class="send_button">
      <el-button size="mini" @click="sendMessage('text', textarea)">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "right_send",
  data(){
    return {
      visible: false,
      textarea:"",
      dialogVisible: false,
      isImage: false,
      filename: ""
    }
  },
  methods:{
    beforeUploadFile(file){
      if(file.type === "image/jpeg" || file.type === "image/png"){
        this.isImage = true
      }else{
        this.isImage = false
      }
      this.filename = file.name
    },
    uploadFileSuccess(res){
      if(this.isImage){
        this.sendMessage('image', res.result.url )
      }else{
        this.sendMessage('file', res.result.url + '|' + this.filename)
      }
      this.$refs.uploadFile.clearFiles()
    },
    getEmojiUrl(url){
      return require('@/assets/emoji/'+ url)
    },
    joinEmoji(alt){
      this.textarea += alt
    },
    sendMessage(type, content){
      if(this.textarea.trim() || type !== 'text'){
        const to = {}
        const message = {
          type: type,
          content: content,
          avatar: this.$store.state.user.avatar
        }

        const currentChatObj = this.$store.state.chat.currentChatObj

        if(currentChatObj.group_id){
          to.type = 'group'
          to.group_id = currentChatObj.group_id
          message.group_id = currentChatObj.group_id
        }else{
          to.type = 'single'
          to.user_id = currentChatObj.friend_user_id
        }

        message.from_user_id = this.$store.state.user.user_id
        message.from_user_nickname = this.$store.state.user.nickname

        this.send(message, to)

        //将自己发送的消息加入到聊天记录
        const recordList = this.$store.state.chat.recordList
        const objId = currentChatObj.friend_user_id || currentChatObj.group_id
        for (let i = 0; i < recordList.length; i++) {
          if(recordList[i].id === objId){
            message.me = true
            recordList[i].list.push(message)
          }
        }
        //保存到sessionStorage
        this.$store.commit('set_recordList', recordList)
        sessionStorage.setItem('recordList' + this.$store.state.user.user_id,JSON.stringify(recordList))

        this.textarea = ''
      }
    },
    send(message, to){
      const obj = {
        message: message,
        user_id: this.$store.state.user.user_id,
        username: this.$store.state.user.nickname,
        to: to
      }

      this.$store.state.chat.websocket.send(JSON.stringify(obj))
    },
  }
}
</script>


<style scoped>
  .right_send{
    width: 100%;
    height: 30%;
    background: #f5f4f4;
  }
  .icon_box{
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    padding: 10px;
  }
  .emoji_box{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .emoji_box img{
    width: 20px;
    height: 20px;
    margin: 6px;
    cursor: pointer;
  }
  .emoji_box img:hover{
    background: #cccccc;
  }
  .file{
    width: 30px;
    height: 30px;
    margin-left: 10px;
  }
  .send_button{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
  .send_button button{
    margin-right: 20px;
  }
</style>
<style>
.edit_message textarea{
  min-height: 120px!important;
  border: 0;
  background: #f5f4f4;
}
</style>
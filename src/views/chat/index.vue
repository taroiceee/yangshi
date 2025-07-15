<template>
  <div class="chat page_chat">
    <div v-if="noSupportWebSocket">您的浏览器不支持websocket</div>
    <div class="chat_box" v-else>
      <leftSlide></leftSlide>
      <div class="right_box">
        <rightHeader @addFriendSuccess="getFriendList" @createGroupSuccess="getGroupList" @delete="onDelete"></rightHeader>
        <rightMessage @createGroupSuccess="getGroupList"></rightMessage>
        <rightSend></rightSend>
      </div>
    </div>
  </div>
</template>

<script>
import leftSlide from "@/components/diy/chat/left_list.vue"
import rightHeader from "@/components/diy/chat/right_header.vue"
import rightMessage from "@/components/diy/chat/right_message.vue"
import rightSend from "@/components/diy/chat/right_send.vue"
import mixin from "@/mixins/page.js";

export default {
  name: "index",
  mixins:[mixin],
  components:{
    leftSlide,
    rightHeader,
    rightMessage,
    rightSend
  },
  data(){
    return {
      noSupportWebSocket: false,
      websocket: null
    }
  },
  created() {

    if(!("WebSocket" in window)){
      this.noSupportWebSocket = true
    }

    if(this.user.user_id){
      this.getFriendList()
      this.getGroupList()
      this.connectServer()
    }
  },
  methods:{
    connectServer(){
      let url = this.$fullUrl(`~/api/websocket/${this.$store.state.user.user_id}/${this.$store.state.user.nickname}`)
      url = url.replace('http','ws')
      this.websocket = new WebSocket(url)
      this.$store.commit('set_websocket', this.websocket)
      this.websocket.onopen = this.onWebsocketOpen
      this.websocket.onmessage = this.onWebsocketMessage
      this.websocket.onclose = this.onWebsocketClose
    },
    onWebsocketOpen(){
      console.log("IM-------连接服务器成功");
    },
    onWebsocketClose(){
      console.log("IM-------服务器已断开连接");
    },
    onWebsocketMessage(evt){
      console.log(evt)
      //接收消息
      console.log('消息对象---------------')
      const data = JSON.parse(evt.data)
      if(data.message_type === 4){
        const message = JSON.parse(data.text_message)

        this.readMessage([data.user_chat_read_id])

        this.saveChatRecord(message)
      }
      if(data.message_type === 5){
        this.getFriendList()
      }
    },
    sortConversationList(){
      let arr = this.$store.state.chat.friendList.concat(this.$store.state.chat.groupList)
      const sessionRecordList = sessionStorage.getItem('recordList'+this.$store.state.user.user_id)
      console.log(sessionRecordList)
      this.$store.commit('set_recordList',JSON.parse(sessionRecordList) || [])
      const recordList = this.$store.state.chat.recordList

      let currentChatObj = sessionStorage.getItem("currentChatObj")
      currentChatObj = JSON.parse(currentChatObj)
      if(!this.$store.state.chat.currentChatObj){
        this.$store.commit('set_currentChatObj', currentChatObj)
      }
      if(currentChatObj && currentChatObj.group_id){
        this.activeName = "group"
      }

      for (let i = 0; i < arr.length; i++) {
        const id = arr[i].friend_user_id || arr[i].group_id
        let isExist = false
        for (let j = 0; j < recordList.length; j++) {
          if(id === recordList[j].id ){
            isExist = true
          }
        }
        if(!isExist){
          recordList.push({
            id: id,
            list:[]
          })
        }
        this.$store.commit('set_recordList', recordList)
      }
      // arr.sort((a, b)=>{
      //   const aTime = new Date(a.create_time)
      //   const bTime = new Date(b.create_time)
      //   return aTime - bTime
      // })
      // console.log(arr)
      this.$store.commit('set_mergeList', arr)
    },
    getFriendList(){
      this.$get("~/api/user_chat_friend/get_friend_list?user_id=" + this.$store.state.user.user_id,).then(res=>{
        this.$store.commit("set_friendList", res.result.list)
        this.sortConversationList()
      })
    },
    getGroupList(){
      this.$get("~/api/user_chat_group/get_group_list?user_id=" +this.$store.state.user.user_id,).then(res=>{
        this.$store.commit("set_groupList", res.result.list || [])
        this.getGroupUserList()
        this.sortConversationList()
      })
    },
    onDelete(){
      this.getFriendList()
      this.getGroupList()
    },
    saveChatRecord(message) {
      const recordList = this.$store.state.chat.recordList
      const objId = message.group_id || message.from_user_id

      let hasRecordList = false
      for (let i = 0; i < recordList.length; i++) {
        if(recordList[i].id === objId){
          hasRecordList = true
          recordList[i].list.push(message)
        }
      }

      let record = {
        id: objId,
        list: [message]
      }

      if(!hasRecordList){
        recordList.push(record)
      }

      this.$store.commit('set_recordList',recordList)
      sessionStorage.setItem('recordList'+ this.$store.state.user.user_id,JSON.stringify(recordList))
    },
    readMessage(readIdList) {
      const obj = {
        to:{
          type: "read",
          read_list:readIdList
        }
      }
      this.$store.state.chat.websocket.send(JSON.stringify(obj))

    },
    getGroupUserList(){
      if(!this.currentChatObj.group_id)return;
      this.$get("~/api/user_chat_group/get_group_user_list",{
        group_id:this.currentChatObj.group_id
      }).then(res=>{
        this.$store.commit("set_groupChatUser",res.result.list)
      })
    }
  },
  watch:{
    user(){
      this.getFriendList()
      this.getGroupList()
      this.connectServer()
    },
    currentChatObj:{
      handler(){
        if(this.currentChatObj.group_id){
          this.getGroupUserList()

          this.$get('~/api/user_chat_group/get_read_list',{
            user_id: this.$store.state.user.user_id,
            group_id: this.currentChatObj.group_id
          },(res)=>{
            const list = res.result.list
            const readList = []
            for (let i = 0; i < list.length; i++) {
              const message = JSON.parse(list[i].message)
              readList.push(list[i].user_chat_read_id)
              const text = JSON.parse(message.text_message)
              this.saveChatRecord(text)
            }
            this.readMessage(readList)
          })
        }else{
          this.$get('~/api/user_chat_friend/get_read_list',{
            user_id: this.$store.state.user.user_id,
            send_user_id: this.currentChatObj.friend_user_id
          },(res)=>{
            if(!res.result)return
            const list = res.result.list
            const readList = []
            for (let i = 0; i < list.length; i++) {
              const message = JSON.parse(list[i].message)
              readList.push(list[i].user_chat_read_id)
              const text = JSON.parse(message.text_message)
              this.saveChatRecord(text)
            }
            this.readMessage(readList)
          })
        }
      }
    }
  },
  computed:{
    currentChatObj(){
      return this.$store.state.chat.currentChatObj
    },
  }
}
</script>


<style scoped>
  .page_chat{
    padding-top: 100px;
  }
  .chat_box{
    margin: 50px auto;
    width: 80%;
    max-width: 1200px;
    height: 70vh;
    display: flex;
    flex-direction: row;
    border-radius: 5px;
    overflow: hidden;
  }
  .right_box{
    width: 80%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .chat_box [class*=" el-icon-"], .chat_box [class^=el-icon-]{
  	font-size: inherit;
  }
</style>
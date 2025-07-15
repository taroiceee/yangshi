<template>
  <div class="right_message_box">
    <div ref="right_message" class="right_message">
      <div v-if="$store.state.chat.currentChatObj">
        <template>
          <chatMessage :value="item" v-for="item in messageList"></chatMessage>
        </template>
      </div>
      <div v-else class="please_select">请选择一个聊天</div>
    </div>
    <div class="group_user" v-if="$store.state.chat.currentChatObj && $store.state.chat.currentChatObj.group_id">
      <el-button type="primary" icon="el-icon-plus" @click="$refs.createGroup.open('invite')">邀请好友</el-button>
      <div v-for="user in $store.state.chat.groupChatUser" style="display: flex;align-items: center;margin-bottom: 5px;margin-top: 5px">
        <div :style="{backgroundImage:`url(${$fullUrl(user.avatar)})`}" class="avatar"></div>
        <div style="margin-left: 10px">{{ user.nickname }}</div>
      </div>
    </div>
    <createGroup v-on="$listeners" ref="createGroup"></createGroup>
  </div>
</template>

<script>
import chatMessage from "@/components/diy/chat/chat_message.vue"
import createGroup from "@/components/diy/chat/create_group.vue";
import {mapState} from "vuex";

export default {
  name: "right_message",
  components: {
    createGroup,
    chatMessage
  },
  data(){
    return {
      messageList:[]
    }
  },
  methods:{
    getList(){
      if (!this.$store.state.chat.currentChatObj) {
        return false;
      }
      const currentChatObjId = this.$store.state.chat.currentChatObj.group_id || this.$store.state.chat.currentChatObj.friend_user_id
      this.messageList = []
      for (let i = 0; i < this.recordList.length; i++) {
        if (this.recordList[i].id === currentChatObjId) {
          this.messageList = this.recordList[i].list
        }
      }
      this.$nextTick(() => {
        this.$refs.right_message.scrollTop = this.$refs.right_message.scrollHeight
      })
    }
  },
  watch: {
    recordList:{
      handler(){
        this.getList()
      },
      deep:true
    },
    currentChatObj:{
      handler(){
        this.getList()
      },
      deep:true
    }
  },
  computed: {
    recordList(){
      return this.$store.state.chat.recordList
    },
    currentChatObj() {
      return this.$store.state.chat.currentChatObj;
    }
  }
}
</script>

<style scoped>
.right_message_box{
  box-sizing: border-box;
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: start;
}
.right_message {
  height: 100%;
  background: #FFFFFF;
  padding-top: 51px;
  overflow-y: scroll;
  flex: 1;
}
.group_user {
  width: 150px;
  height: 100%;
  padding:71px 10px 10px 10px;
  box-sizing: border-box;
}
.please_select {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border: 1px solid #CCCCCC;
  border-radius: 50%;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("../../../../public/img/default.png");
}
</style>
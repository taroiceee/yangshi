<template>
  <div class="left_slide">
    <div class="avatar">
      <el-avatar :src="$store.state.user.avatar ? $fullUrl($store.state.user.avatar) : '../../../public/img/default.png'" />
      <span>{{$store.state.user.nickname}}</span>
    </div>
    <div class="left_slide_tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="好友" name="single">
          <div class="left-list">
            <ul>
              <li class="chat_list_li" :class="active(item)" v-for="item in $store.state.chat.friendList" @click="setCurrentChatObj(item)">
                <div class="single_avatar" v-if="item.nickname">
                  <el-avatar :src="$fullUrl(item.avatar)"></el-avatar>
                </div>
                <div v-else>
                  <el-avatar icon="el-icon-s-grid"></el-avatar>
                </div>
                <div class="dialog_info">
                  <div class="dialog_name">{{item.nickname || item.group_name}}</div>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="群聊" name="group">
          <li class="chat_list_li" :class="active(item)" v-for="item in $store.state.chat.groupList" @click="setCurrentChatObj(item)">
            <div class="single_avatar" v-if="item.nickname">
              <el-avatar :src="item.avatar"></el-avatar>
            </div>
            <div v-else>
              <el-avatar icon="el-icon-s-grid"></el-avatar>
            </div>
            <div class="dialog_info">
              <div class="dialog_name">{{item.nickname || item.group_name}}</div>
            </div>
          </li>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name:"chat",
    data(){
      return {
        activeName:"single"
      }
    },
    created() {
      let currentChatObj = sessionStorage.getItem('currentChatObj')
      if(currentChatObj){
        currentChatObj = JSON.parse(currentChatObj)
      }
      if(currentChatObj && currentChatObj.group_id){
        this.activeName = "group"
      }
    },
    methods:{
      setCurrentChatObj(item){
        this.$store.commit('set_currentChatObj', item)
        sessionStorage.setItem('currentChatObj', JSON.stringify(item))
      }
    },
    computed:{
      active(item){
        return (item)=>{
          if(this.$store.state.chat.currentChatObj){
            const currentId = this.$store.state.chat.currentChatObj.friend_user_id ||　this.$store.state.chat.currentChatObj.group_id
            const itemId = item.friend_user_id || item.group_id
            if(currentId === itemId){
              return 'active'
            }
          }
          return ''
        }
      }
    }
  }
</script>

<style scoped>
  .left_slide{
    width: 20%;
    height: 100%;
    background: #f5f4f4;
    display: flex;
    flex-direction: column;
  }
  .avatar{
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #cccccc;
    display: flex;
    align-items: center;
  }
  .avatar img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .avatar span{
    margin-left: 10px;
  }
  .chat_list_li{
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: row;
  }
  .chat_list_li:hover{
    background: #cccccc;
    cursor: pointer;
  }
  .single_avatar{
    width: 40px;
    height: 40px;
    overflow: hidden;
  }
  .dialog_info{
    margin-left: 10px;
  }
  .dialog_name{
    font-size: 14px;
  }
  .dialog_last_message{
    font-size: 12px;
    color: #777676;
  }
  .active{
    background: #cccccc!important;
  }
</style>
<style>
  .left_slide .el-tabs__nav-scroll{
    display: flex;
    justify-content: center;
  }
  .left_slide .el-tabs__header{
    margin-bottom: 0;
  }
</style>
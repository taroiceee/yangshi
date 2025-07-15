<template>
  <div class="right_header">
    <div>
      <template v-if="$store.state.chat.currentChatObj">
        当前聊天：{{$store.state.chat.currentChatObj.group_name || $store.state.chat.currentChatObj.nickname}}
      </template>
    </div>
    <div>
      <el-button circle class="delete_chat" icon="el-icon-delete" size="mini" type="danger" @click="deleteDialogVisible = true"></el-button>
      <el-button circle class="create_group" icon="el-icon-s-grid" size="mini" type="primary" @click="openCreateGroupDialog"></el-button>
      <el-button circle class="add_friend" icon="el-icon-plus" size="mini" type="primary" @click="openAddFriendDialog"></el-button>
    </div>
    <addFriend v-on="$listeners" ref="addFriend"></addFriend>
    <createGroup v-on="$listeners" ref="createGroup"></createGroup>
    <el-dialog
        title="提示"
        :visible.sync="deleteDialogVisible"
        width="30%">
      <span>{{ $store.state.chat.currentChatObj && $store.state.chat.currentChatObj.group_id?'确定退出该群聊吗':'确定删除该好友吗' }}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteCurrentChat">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import addFriend from "@/components/diy/chat/add_friend.vue";
import createGroup from "@/components/diy/chat/create_group.vue";

export default {
  name: "right_header",
  components: {
    addFriend,
    createGroup
  },
  data(){
    return {
      deleteDialogVisible: false
    }
  },
  methods:{
    openAddFriendDialog(){
      this.$refs.addFriend.open()
    },
    openCreateGroupDialog(){
      this.$refs.createGroup.open('add')
    },
    deleteCurrentChat(){
      const currentChatObj = this.$store.state.chat.currentChatObj
      if(currentChatObj.group_id){
        this.$get('~/api/user_chat_group/del_group',{
          user_id: this.$store.state.user.user_id,
          group_id: currentChatObj.group_id
        }).then(res=>{
          this.$message.success("退出群聊成功")
          this.$store.commit('set_currentChatObj', null)
          sessionStorage.removeItem('currentChatObj')
          this.$emit("delete")
        })
      }else{
        this.$get('~/api/user_chat_friend/del_friend',{
          friend_user_id: currentChatObj.friend_user_id,
          user_id: this.$store.state.user.user_id,
        }).then(res=>{
          this.$message.success("删除好友成功")
          this.$store.commit('set_currentChatObj', null)
          sessionStorage.removeItem('currentChatObj')
          this.$emit("delete")
        })
      }
      this.deleteDialogVisible = false
    }
  }
}
</script>

<style scoped>
.right_header {
  width: 100%;
  height: 61px;
  background: #f5f4f4;
  border-bottom: 1px solid #cccccc;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.add_friend {
  width: 30px;
  height: 30px;
}
</style>
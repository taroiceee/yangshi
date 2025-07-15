<template>
  <el-dialog
      :title="type === 'add'?'创建群聊':'邀请好友'"
      :visible="dialogVisible"
      width="30%">
    <div class="create">
      <el-input
          v-if="type === 'add'"
          v-model="group_name"
          placeholder="请输入群聊名"
          prefix-icon="el-icon-search">
      </el-input>
      <div style="margin:10px 0;">邀请成员参加群聊：</div>
      <div v-if="$store.state.chat.friendList.length > 0" class="chat_list">
        <el-checkbox-group v-model="checkList">
          <div v-for="item in friendList">
            <el-checkbox :label="item.friend_user_id">{{ item.nickname }}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <div v-else style="text-align: center">你还没有好友，先去添加几个好友吧</div>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="createGroup">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {createLogger} from "vuex";

export default {
  data() {
    return {
      dialogVisible: false,
      group_name: '',
      searchResult: null,
      checkList: [],
      type: "add",
      friendList: []
    };
  },
  methods: {
    open(type) {
      this.type = type
      this.dialogVisible = true
      this.friendList = []
      console.log(type)
      if (type === 'add') {
        this.friendList = this.$store.state.chat.friendList
      } else {
        const list = this.$store.state.chat.friendList
        const groupChatUser = this.$store.state.chat.groupChatUser
        console.log(list,groupChatUser)
        for (let i = 0; i < list.length; i++) {
          let isAdd = false
          for (let j = 0; j < groupChatUser.length; j++) {
            console.log(list[i].friend_user_id , groupChatUser[j].user_id)
            if (list[i].friend_user_id == groupChatUser[j].user_id) {
              isAdd = true
            }
          }

          if (!isAdd) {
            this.friendList.push(list[i])
          }
        }
      }
    },
    close() {
      this.dialogVisible = false
    },
    async createGroup() {
      const isAdd = this.type === 'add'
      if (!this.group_name && isAdd) {
        this.$message.error("请输入群聊名称")
        return
      }
      if (this.checkList.length <= 1 && isAdd) {
        this.$message.error("请至少选择2个成员加入群聊")
        return
      }
      const group_id = isAdd?Math.floor(new Date().getTime() / 1000):this.$store.state.chat.currentChatObj.group_id
      this.checkList.push(this.$store.state.user.user_id)
      for (let i = 0; i < this.checkList.length; i++) {
        await this.$post("~/api/user_chat_group/add_group", {
          group_name: isAdd?this.group_name:this.$store.state.chat.currentChatObj.group_name,
          user_id: this.checkList[i],
          group_id: group_id
        })
      }
      this.close();
      this.$message.success(isAdd?"创建成功":'邀请成功')
      this.$emit("createGroupSuccess")
    }
  }
};
</script>

<style scoped>
.chat_list_li {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.chat_list {
  height: 300px;
  overflow-y: scroll;
}

</style>
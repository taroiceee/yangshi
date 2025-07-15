<template>
  <el-dialog
      :visible.sync="dialogVisible"
      title="添加好友"
      width="30%"
      @close="onClose">
    <div class="search">
      <el-input
          v-model="nickname"
          placeholder="请输入对方账号"
          prefix-icon="el-icon-search">
      </el-input>
      <el-button class="search_button" icon="el-icon-search" @click="searchUser"></el-button>
    </div>
    <div v-if="isSearch">
      <div v-if="searchResult" class="search_result">
        <div class="user_info">
          <div :style="{backgroundImage:`url(${$fullUrl(searchResult.obj.avatar)})`}" class="avatar">
          </div>
          <span class="user_info_nickname">{{ searchResult.obj.nickname }}</span>
        </div>
        <el-button size="mini" type="success" @click="addFriend(searchResult.obj)">添加</el-button>
      </div>
      <div v-else style="margin-top: 10px">
        没有找到用户
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      nickname: '',
      searchResult: null,
      isSearch: false
    };
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    searchUser() {
      if (!this.nickname || this.nickname === '') {
        return;
      }

      this.isSearch = true

      this.$get('~/api/user/get_obj?', {
        username: this.nickname
      }).then(res => {
        this.searchResult = res.result
      })
    },
    addFriend(userInfo) {
      const friends = this.$store.state.chat.friendList
      // let isAdd = false
      for (let i = 0; i < friends.length; i++) {
        if(friends[i].friend_user_id === this.searchResult.obj.user_id){
          this.$message.warning("您已经添加过此好友了")
          return
        }
      }

      this.$post("~/api/user_chat_friend/add_friend", {
        user_id: this.$store.state.user.user_id,
        friend_user_id: userInfo.user_id,
        friend_user_name: userInfo.nickname,
        avatar: this.$store.state.user.avatar
      }).then(res => {
        if (res.result === 1) {
          this.$message.success("添加成功")
          this.$emit("addFriendSuccess")
          this.close()
        }
      })
    },
    onClose(){
      this.nickname = ''
      this.searchResult = null
      this.isSearch = false
    }
  }
};
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.search_button {
  margin-left: 20px;
}

.search_result {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.user_info {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.user_info_nickname {
  margin-left: 10px;
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
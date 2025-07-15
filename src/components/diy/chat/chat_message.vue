<template>
  <div class="message">
    <div v-if="!value.me" class="left_message">
      <div :style="{backgroundImage:`url(${$fullUrl(value.avatar)})`}" class="avatar"></div>
      <div class="message_box">
        <div>{{ value.from_user_nickname }}</div>
        <div class="content">
          <div v-if="value.type === 'text'" v-html="replaceEmoji(value.content)"></div>
          <img v-if="value.type === 'image'" :src="$fullUrl(value.content)">
          <div v-if="value.type === 'file'" style="display: flex;flex-direction: row;align-items: center">
            <i class="el-icon-s-cooperation file_icon"></i>
            {{value.content.split('|')[1]}}
            <el-button style="margin-left: 10px" size="mini" @click="$download($fullUrl(value.content.split('|')[0]))">接收</el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="right_message">
      <div class="message_box">
        <div class="content content_right">
          <div v-if="value.type === 'text'" v-html="replaceEmoji(value.content)"></div>
          <img v-if="value.type === 'image'" :src="$fullUrl(value.content)">
          <div v-if="value.type === 'file'" style="display: flex;flex-direction: row;align-items: center">
            <i class="el-icon-s-cooperation file_icon"></i>
            {{value.content.split('|')[1]}}
            <el-button style="margin-left: 10px" size="mini" @click="$download($fullUrl(value.content.split('|')[0]))">接收</el-button>
          </div>
        </div>
      </div>
      <div :style="{backgroundImage:`url(${$fullUrl($store.state.user.avatar)})`}" class="avatar"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chatMessage",
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {

    }
  },
  methods: {
    replaceEmoji(str) {
      const emojiList = this.$store.state.chat.emojiList
      return str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
        for (let i = 0; i < emojiList.length; i++) {
          if(emojiList[i].alt === item){
            let imgstr =
                '<img height="24px" style="vertical-align:middle;width: 24px!important" src="' +
                this.getEmojiUrl(emojiList[i].url) + '">';
            return imgstr;
          }
        }
      });
    },
    getEmojiUrl(str)
    {
      return require('@/assets/emoji/' + this.replaceEmoji(str))
    }
  }
}
</script>

<style scoped>
.message {
  width: 100%;
  padding: 10px;
}

.left_message {
  display: flex;
  flex-direction: row;
}

.right_message {
  display: flex;
  flex-direction: row;
  justify-content: end;
}

.message_box {
  margin-left: 15px;
  margin-right: 15px;
}

.content {
  background: #FF5A6A;
  padding: 5px;
  border-radius: 5px;
  color: #FFFFFF;
  margin-top: 3px;
  max-width: 400px;
  word-wrap: break-word;
  word-break: normal;
  display: inline-block;
}

.content_right{
  background: #2bb00e;
}

.content img{
  max-width: 300px;
  max-height: 300px;
}
.content span {
  color: #FFFFFF;
}
.file_icon{
  font-size: 26px;
}
.avatar {
  width: 40px;
  height: 40px;
  border: 1px solid #CCCCCC;
  border-radius: 50%;
  background-image: url("../../../../public/img/default.png");
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat
}
</style>
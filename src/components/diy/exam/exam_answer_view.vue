<template>
  <el-main class="bg edit_wrap answer_edit_wrap">
    <el-form ref="form" :model="form" status-icon label-width="70px">
      <el-row class="row_e">
        <el-col
          v-if="if_answered"
          :xs="24"
          :sm="24"
          :lg="24"
          class="el_form_item_warp"
        >
          <div
            class="title_margin"
            style="margin-bottom: 20px"
            v-if="score_state === 0"
          >
            未评分
          </div>
          <div class="title_margin" style="margin-bottom: 20px" v-else>
            已评分，得分：<span style="color: red">{{
              answer_form.score
            }}</span>
          </div>
        </el-col>
        <el-col
          v-for="(o, i) in question_list"
          :xs="24"
          :sm="24"
          :lg="24"
          class="el_form_item_warp"
        >
          <div class="title_margin" v-if="o.type === '单选题'">
            {{
              o.question_order +
              ".单选题：" +
              o.title +
              "   (" +
              o.score +
              "分)"
            }}
            <span v-if="if_answered" class="score_show"
              >--------{{ answer_scores[i] }}分</span
            >
          </div>
          <div class="title_margin" v-else-if="o.type === '多选题'">
            {{
              o.question_order +
              ".多选题：" +
              o.title +
              "   (" +
              o.score +
              "分)"
            }}
            <span v-if="if_answered" class="score_show"
              >--------{{ answer_scores[i] }}分</span
            >
          </div>
          <div class="title_margin" v-else-if="o.type === '判断题'">
            {{
              o.question_order +
              ".判断题：" +
              o.title +
              "   (" +
              o.score +
              "分)"
            }}
            <span v-if="if_answered" class="score_show"
              >--------{{ answer_scores[i] }}分</span
            >
          </div>
          <div class="title_margin" v-else-if="o.type === '填空题'">
            {{
              o.question_order +
              ".填空题：" +
              o.title +
              "   (" +
              o.score +
              "分)"
            }}
            <span v-if="if_answered" class="score_show">
              <span v-if="score_state === 0">--------未评分</span>
              <span v-else>--------{{ answer_scores[i] }}分</span>
            </span>
          </div>
          <div class="title_margin" v-else>
            {{
              o.question_order +
              ".主观题：" +
              o.title +
              "   (" +
              o.score +
              "分)"
            }}
            <span v-if="if_answered" class="score_show">
              <span v-if="score_state === 0">--------未评分</span>
              <span v-else>--------{{ answer_scores[i] }}分</span>
            </span>
          </div>
          <el-form-item v-if="o.type === '单选题'" label="">
            <el-radio
              :disabled="if_answered"
              v-for="q in get_question_list(o.question_item)"
              v-model="answers[i]"
              :label="q"
              >{{ q }}</el-radio
            >
            <div class="score_show" v-if="if_answered && reference_answers[i]">
              参考答案：{{ reference_answers[i] }}
            </div>
          </el-form-item>
          <el-form-item v-else-if="o.type === '多选题'" label="">
            <el-checkbox-group :disabled="if_answered" v-model="answers[i]">
              <el-checkbox
                v-for="q in get_question_list(o.question_item)"
                :label="q"
              ></el-checkbox>
            </el-checkbox-group>
            <div class="score_show" v-if="if_answered && reference_answers[i]">
              参考答案：{{ reference_answers[i] }}
            </div>
          </el-form-item>
          <el-form-item v-else-if="o.type === '判断题'" label="">
            <el-radio
              :disabled="if_answered"
              v-for="q in get_question_list(o.question_item)"
              v-model="answers[i]"
              :label="q"
              >{{ q }}</el-radio
            >
            <div class="score_show" v-if="if_answered && reference_answers[i]">
              参考答案：{{ reference_answers[i] }}
            </div>
          </el-form-item>
          <el-form-item v-else-if="o.type === '填空题'" label="">
            <el-input
              :disabled="if_answered"
              style="width: 500px"
              v-model="answers[i]"
            ></el-input>
            <div class="score_show" v-if="if_answered">
              参考答案：{{ reference_answers[i] }}
            </div>
          </el-form-item>
          <el-form-item v-else label="">
            <el-input
              :disabled="if_answered"
              type="textarea"
              v-model="answers[i]"
            >
            </el-input>
            <div class="score_show" v-if="if_answered">
              参考答案：{{ reference_answers[i] }}
            </div>
          </el-form-item>
        </el-col>

        <el-col v-if="if_answered" :xs="24" :sm="24" :lg="24" class="el_form_item_warp">
          <el-form-item label="评语">
            <el-input :disabled="true" type="textarea" v-model="answer_form.comment_desc"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :lg="24" class="el_form_item_warp">
          <el-form-item label="提交人">
            <el-input disabled="" v-model="submit_user_str"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-col :xs="24" :sm="24" :lg="24" class="el_form_btn_warp">
          <el-form-item>
            <el-col
              :xs="24"
              :sm="24"
              :lg="12"
              class="el_form_btn el_form_btn_1"
            >
              <el-button
                v-if="!if_answered"
                style="width: 100%; float: left"
                type="primary"
                @click="submit()"
                >提交
              </el-button>
            </el-col>
            <el-col
              :xs="24"
              :sm="24"
              :lg="12"
              class="el_form_btn el_form_btn_2"
            >
              <el-button style="width: 100%; float: right" @click="cancel()"
                >取消</el-button
              >
            </el-col>
          </el-form-item>
        </el-col>
      
    </el-form>
    <div v-if="!if_answered" class="countdown">
      距离考试结束还有：<span>{{ minutes + ":" + seconds }}</span>
    </div>
  </el-main>
</template>

<script>
import mixin from "@/mixins/page.js";

export default {
  mixins: [mixin],
  data() {
    return {
      field: "exam_id",
      url_add: "~/api/user_answer/add?",
      url_set: "~/api/user_answer/set?",
      url_get_obj: "~/api/exam/get_obj?",
      url_upload: "~/api/user_answer/upload?",
      url_get_exam_question: "~/api/exam_question/get_obj?",
      url_add_user_answer_wrong: "~/api/user_answer_wrong/add?",

      query: {
        exam_id: 0,
      },

      form: {
        exam_id: 0,
        name: "",
        duration: 0,
        score: 0,
        status: "启用",
      },
      url_get_question_list: "~/api/exam_question/get_list?",
      question_list: [],
      answers: [],
      submit_user_str: "",
      answer_form: {
        user_answer_id: 0,
        user_id: 0,
        exam_id: 0,
        score: 0,
        score_state: 0,
        answers: [],
        score_detail: [],
        objective_score: 0,
        subjective_score: 0,
        nickname: "",
        comment_desc:""
      },

      if_answered: false,
      maxtime: 0,
      minutes: 0,
      seconds: 0,
      timer: "",
      score_state: 0,
      answer_scores: [],
      reference_answers: [],
    };
  },
  methods: {
    async get_obj_after(json_back, func){
      this.form = json_back.result.obj
      let userJson = await this.$get(
        "~/api/user/get_obj?user_id=" + this.$store.state.user.user_id
      );
      if (userJson.result) {
        this.submit_user_str =
          userJson.result.obj.username + "-" + userJson.result.obj.nickname;
        this.answer_form.user_id = userJson.result.obj.user_id;
        this.answer_form.nickname = userJson.result.obj.nickname;
        this.answer_form.comment_desc = userJson.result.obj.comment_desc;
      } else if (userJson.error) {
        console.error(userJson.error);
      }
      let json = await this.$get(
        this.url_get_question_list +
          "exam_id=" +
          this.query.exam_id +
          "&orderby=question_order"
      );
      if (json.result) {
        this.question_list = json.result.list;
        for (let i = 0; i < this.question_list.length; i++) {
          if (this.question_list[i].type === "多选题") {
            this.answers[i] = [];
          } else {
            this.answers[i] = "";
          }
        }
      } else if (json.error) {
        console.error(json.error);
      }
      let answerJson = await this.$get(
        "~/api/user_answer/get_obj?user_id=" +
          this.answer_form.user_id +
          "&exam_id=" +
          this.query.exam_id
      );
      if (answerJson.result && answerJson.result.obj != null) {
        this.answer_form = answerJson.result.obj;
        this.score_state = answerJson.result.obj.score_state;
        this.answer_form.answers = JSON.parse(this.answer_form.answers);
        this.answer_form.score_detail = JSON.parse(
          this.answer_form.score_detail
        );
        for (let i = 0; i < this.answer_form.answers.length; i++) {
          this.answers[i] = this.answer_form.answers[i].answer;
          this.answer_scores[i] = this.answer_form.score_detail[i].score;
          if (
            this.question_list[i].type === "单选题" ||
            this.question_list[i].type === "判断题" ||
            this.question_list[i].type === "多选题"
          ) {
            if (this.answer_scores[i] !== this.question_list[i].score) {
              this.reference_answers[i] = this.question_list[i].answer;
            }
          } else {
            this.reference_answers[i] = this.question_list[i].answer;
          }
        }
        this.if_answered = true;
      } else if (answerJson.error) {
        console.error(answerJson.error);
      }
      if (!this.if_answered) {
        this.maxtime = this.form.duration * 60;
        this.timer = window.setInterval(() => {
          setTimeout(this.set_countdown(), 0);
        }, 1000);
      }
    },
    get_question_list(question_str) {
      let question_list = question_str.split("\r\n");
      return question_list;
    },
    //根据问题ID从json列表中取出答案对象
    get_answer_wrong_by_id(jsonList, exam_question_id) {
      let list = JSON.parse(jsonList);
      for (let i = 0; i < list.length; i++) {
        let answer = list[i];
        if (answer.exam_question_id == exam_question_id) {
          console.log(answer);
          return answer;
        }
      }
      return null;
    },
    //提交错题记录，把user_answer表中的answers字段json解析出来，转存到user_answer_wrong表中
    async post_user_answer_wrong() {
      for (let i = 0; i < this.question_list.length; i++) {
        let exam_question = this.question_list[i];

        if (exam_question.exam_question_id) {
          let json = await this.$get(
            this.url_get_exam_question +
              "exam_question_id=" +
              exam_question.exam_question_id
          );

          if (json.result) {
            let obj = this.get_answer_wrong_by_id(
              this.answer_form.answers,
              exam_question.exam_question_id
            );
            let answer_wrong_form = {
              subject_name: json.result.obj.subject_name,
              type: json.result.obj.type,
              title: json.result.obj.title,
              question_item: json.result.obj.question_item,
              answers: JSON.stringify(obj.answer),
              answer:
                json.result.obj.answer.length > 0 ? json.result.obj.answer : "",
              nickname: this.answer_form.nickname,
            };

            if (exam_question.answer != obj.answer) {
              this.$post(
                this.url_add_user_answer_wrong,
                answer_wrong_form,
                function (json, status) {
                  console.log("提交错题结果：", json);
                }
              );
            }
          }
        }
      }
    },
    submit_main() {
      let _this = this;
      _this.answer_form.exam_id = _this.query.exam_id;
	  let objective = true;
      for (let i = 0; i < _this.answers.length; i++) {
        let obj = {
          exam_question_id: _this.question_list[i].exam_question_id,
          answer: _this.answers[i],
        };
        _this.answer_form.answers[i] = obj;
        if (
          _this.question_list[i].type === "单选题" ||
          _this.question_list[i].type === "判断题"
        ) {
          if (_this.answers[i] === _this.question_list[i].answer) {
            let obj = {
              exam_question_id: _this.question_list[i].exam_question_id,
              score: _this.question_list[i].score,
            };
            _this.answer_form.score_detail[i] = obj;
            _this.answer_form.objective_score =
              parseFloat(_this.answer_form.objective_score) +
              parseFloat(_this.question_list[i].score);
          } else {
            let obj = {
              exam_question_id: _this.question_list[i].exam_question_id,
              score: 0,
            };
            _this.answer_form.score_detail[i] = obj;
          }
        } else if (_this.question_list[i].type === "多选题") {
          let flag = true;
          let question_answer_list = _this.question_list[i].answer.split("|");
          if (_this.answers[i].length !== question_answer_list.length) {
            flag = false;
          } else {
            for (let j = 0; j < question_answer_list.length; j++) {
              if (_this.answers[i].indexOf(question_answer_list[j]) === -1) {
                flag = false;
                break;
              }
            }
          }
          if (flag) {
            let obj = {
              exam_question_id: _this.question_list[i].exam_question_id,
              score: _this.question_list[i].score,
            };
            _this.answer_form.score_detail[i] = obj;
            _this.answer_form.objective_score =
              parseFloat(_this.answer_form.objective_score) +
              parseFloat(_this.question_list[i].score);
          } else {
            let obj = {
              exam_question_id: _this.question_list[i].exam_question_id,
              score: 0,
            };
            _this.answer_form.score_detail[i] = obj;
          }
        } else {
          let obj = {
            exam_question_id: _this.question_list[i].exam_question_id,
            score: 0,
          };
          _this.answer_form.score_detail[i] = obj;
		  objective = false;
        }
      }
      _this.answer_form.answers = JSON.stringify(_this.answer_form.answers);
      _this.answer_form.score_detail = JSON.stringify(
        _this.answer_form.score_detail
      );
      _this.answer_form.score =
        parseFloat(_this.answer_form.subjective_score) +
        parseFloat(_this.answer_form.objective_score);
	  _this.answer_form.score_state = objective ? 1 : 0;
      //提交错题记录
      this.post_user_answer_wrong();
      let url = _this.url_add;
      this.$post(url, _this.answer_form, function (json, status) {
        console.log("提交结果：", json);
        if (json.result) {
          _this.events("submit_after", json, null);
        } else if (json.error) {
          _this.$toast(json.error.message, "danger");
        }
      });
    },
    submit_after(json,func){
      this.$toast('提交成功！', 'success');
      this.$router.push("/exam/table");
    },
    set_countdown() {
      if (this.maxtime >= 0) {
        this.minutes = Math.floor(this.maxtime / 60);
        this.seconds = Math.floor(this.maxtime % 60);
        --this.maxtime;
      } else {
        clearInterval(this.timer);
        alert("时间到，结束!");
        this.submit();
      }
    },
  },
  created() {},
};
</script>

<style>
.title_margin {
  margin-left: 70px;
}
.countdown {
  position: absolute;
  right: 20px;
  top: 20px;
}
.countdown span {
  color: red;
}
.score_show {
  margin-left: 20px;
  color: red;
}
</style>

<template>
	<div class="diy_form">
			<b-form-group v-if="$check_register_field('add','user_membership_card_number','/registered_user/view')" id="user_membership_card_number" label="用户会员卡号" label-for="user_membership_card_number">
			<b-form-input id="user_membership_card_number" v-model="form['user_membership_card_number']" type="text" placeholder="请输入用户会员卡号" trim ></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','real_name','/registered_user/view')" id="real_name" label="真实姓名" label-for="real_name">
			<b-form-input id="real_name" v-model="form['real_name']" type="text" placeholder="请输入真实姓名" trim ></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','user_gender','/registered_user/view')" id="user_gender" label="用户性别" label-for="user_gender">
			<b-form-select id="user_gender" v-model="form['user_gender']" :options="getDropList(list_user_gender)"></b-form-select>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','user_age','/registered_user/view')" id="user_age" label="用户年龄" label-for="user_age">
			<b-form-input id="user_age" v-model="form['user_age']" type="number" placeholder="用户年龄" trim></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','height','/registered_user/view')" id="height" label="身高" label-for="height">
			<b-form-input id="height" v-model="form['height']" type="number" placeholder="身高" trim></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','user_weight','/registered_user/view')" id="user_weight" label="用户体重" label-for="user_weight">
			<b-form-input id="user_weight" v-model="form['user_weight']" type="number" placeholder="用户体重" trim></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','region','/registered_user/view')" id="region" label="所属地区" label-for="region">
			<b-form-input id="region" v-model="form['region']" type="text" placeholder="请输入所属地区" trim ></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','user_label','/registered_user/view')" id="user_label" label="用户标签" label-for="user_label">
			<el-select id="user_label" v-model="user_label_multiple_value" multiple
					   @change="select_user_label_multiple">
				<el-option v-for="o in list_user_label" :key="o['classification_name']" :label="o['classification_name']"
						   :value="o['classification_name']">
				</el-option>
			</el-select>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','user_preferences','/registered_user/view')" id="user_preferences" label="用户喜好" label-for="user_preferences">
			<b-form-select id="user_preferences" v-model="form['user_preferences']" :options="list_user_preferences" @change="select_user_preferences_field"></b-form-select>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','description_description','/registered_user/view')" id="description_description" label="描述说明" label-for="description_description">
			{{form['description_description']}}
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','certificate_number','/registered_user/view')" id="certificate_number" label="证件号" label-for="certificate_number">
			<b-form-input id="certificate_number" v-model="form['certificate_number']" type="text" placeholder="请输入证件号" trim ></b-form-input>
		</b-form-group>
				<div v-if="$check_register_field('add','portfolio','/registered_user/view')" class="diy_fg form-group">
			<div>作品集</div>
			<div class="diy_in img_multiple">
				<input type="file" @change="uploadFileMultiple($event.target.files,'portfolio')" multiple="true"/>
				<div class="img_block" v-for="(item, index) in form['portfolio']" :key="index" v-if="form['portfolio']">
					<img :src="$fullUrl(item)" />
					<span class="img_del" @click="delImg(index,'portfolio')">x</span>
				</div>
			</div>
		</div>
				<div v-if="$check_register_field('add','user_photos','/registered_user/view')" class="diy_fg form-group">
			<div>用户照片</div>
			<div class="diy_in">
				<input type="file" @change="uploadFile($event.target.files,'user_photos')" />
				<img v-if="form['user_photos']" style="width: 50px;height: 50px;" :src="$fullUrl(form['user_photos'])" />
			</div>
		</div>
				<b-form-group v-if="$check_register_field('add','user_notes','/registered_user/view')" id="user_notes" label="用户备注" label-for="user_notes">
			<b-form-textarea id="user_notes" v-model="form['user_notes']" placeholder="请输入用户备注"></b-form-textarea>
		</b-form-group>
		</div>
</template>

<script>
	import mixin from "@/mixins/component.js";

	export default {
		mixins: [mixin],
		model: {
			prop: "form",
			event: "change"
		},
		props: {
			form: {
				type: Object,
				default: () => {
					return {

					}
				}
			}
		},
		data(){
			return {
				url_upload: "~/api/registered_user/upload?",
									        list_user_gender: "男,女",
																												user_label_multiple_value:[],
		        // 用户标签选项列表
        list_user_label: [],
							        // 用户喜好选项列表
        list_user_preferences: [],
																										}
		},
		methods: {
			// 下拉数据列表转换
			getDropList(e){
				let resultArr = [];
				if(e){
					let arr = e.split(",");
					arr.forEach(item => {
						resultArr.push({
							value: item,
							text: item
						})
					});
				}
				return resultArr;
			},
																      /**
       * 获取用户标签列表
       */
      async get_list_user_label() {
        let json = await this.$get("~/api/classification_information/get_list?");
        if(json.result && json.result.list){
					this.list_user_label = json.result.list
		        }
        else if(json.error){
          console.error(json.error);
        }
      },
            		select_user_label_multiple(v){
			this.form.user_label = "";
			if (v && v.length>0){
				this.form.user_label = v.toString();
			}
		},
      			      /**
       * 获取用户喜好列表
       */
      async get_list_user_preferences() {
        let json = await this.$get("~/api/classification_information/get_list?");
        if(json.result && json.result.list){
					this.list_user_preferences = [];
			json.result.list.forEach(item => {
				this.list_user_preferences.push({
					value: item.classification_name,
					text: item.classification_name
				})
			});
	            }
        else if(json.error){
          console.error(json.error);
        }
      },
      		select_user_preferences_field(v){
			this.$get('~/api/classification_information/get_obj?classification_name='+v,{},(res)=>{
				if(res.result && res.result.obj){
																																																																																																																												this.$set(this.form,"description_description",res.result.obj.description_description);
																																																											}else{
					console.error(res.error);
				}
			})
		},
            														/**
			 * 上传图片
			 * @param {Object} file 文件对象
			 * @param {key} 保存键名
			 */
			uploadFile(file, key = "img") {
				var _this = this;
				var form = new FormData() // FormData 对象
				form.append('file', file[0]) // 文件对象
				this.$upload(this.url_upload, form, function(json) {
					if (json.result) {
						// _this.form[key] = json.result.url;
						_this.$delete(_this.form,key);
						_this.$set(_this.form,key,json.result.url);
						console.log(_this.form[key])
					} else {
						_this.$toast('上传失败！');
					}
				});
			},
			/**
			 * 上传多图
			 * @param {Object} file 文件对象
			 * @param {key} 保存键名
			 */
			uploadFileMultiple(file, key = "img") {
				var _this = this;
				var form = new FormData() // FormData 对象
				form.delete('file')
				for(var i = 0;i < file.length; i ++){
					form.append('file', file[i]) // 文件对象
					this.$upload(this.url_upload, form, function(json) {
						if (json.result) {
							if(key in _this.form){
								_this.form[key].push(json.result.url);
							}else{
								_this.$set(_this.form,key,[json.result.url]);
							}
						}else {
							_this.$toast('上传失败！');
						}
					});
					form.delete('file')
				}
			},
			/**
			 * 删除多图
			 * @param {Object} img 数组下标
			 * @param {key} 保存键名
			 */
			delImg(img, key = "img"){
				var _this = this;
				_this.form[key].splice(img, 1);
			},
		},
    created() {
															      this.get_list_user_label();
			      this.get_list_user_preferences();
												    },
	mounted(){
															}
	}
</script>

<style>
.diy_fg.form-group {
    display: flex;
    justify-content: space-between;
}
.diy_in {
    width: 85%;
}
.img_multiple {
	overflow: hidden;
}
.img_multiple .img_block {
	float: left;
	margin-right: 5px;
	margin-bottom: 5px;
	position: relative;
}
.img_multiple .img_block img {
	height: 100px;
	width: auto;
}
.img_multiple .img_del {
	position: absolute;
	top: 5px;
	right: 5px;
	width: 20px;
	height: 20px;
	background: #0000008a;
	color: #fff;
	line-height: 20px;
	text-align: center;
	border-radius: 100%;
	cursor: pointer;
}
</style>

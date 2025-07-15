<template>
	<div class="diy_form">
			<b-form-group v-if="$check_register_field('add','person_in_charge','/business_user/view')" id="person_in_charge" label="负责人" label-for="person_in_charge">
			<b-form-input id="person_in_charge" v-model="form['person_in_charge']" type="text" placeholder="请输入负责人" trim ></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','head_gender','/business_user/view')" id="head_gender" label="负责人性别" label-for="head_gender">
			<b-form-select id="head_gender" v-model="form['head_gender']" :options="getDropList(list_head_gender)"></b-form-select>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','shop_name','/business_user/view')" id="shop_name" label="店铺名称" label-for="shop_name">
			<b-form-input id="shop_name" v-model="form['shop_name']" type="text" placeholder="请输入店铺名称" trim ></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','shop_phone','/business_user/view')" id="shop_phone" label="店铺电话" label-for="shop_phone">
			<b-form-input id="shop_phone" v-model="form['shop_phone']" type="tel" placeholder="请输入店铺电话" trim></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','store_address','/business_user/view')" id="store_address" label="店铺地址" label-for="store_address">
			<b-form-input id="store_address" v-model="form['store_address']" type="text" placeholder="请输入店铺地址" trim ></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','registered_capital','/business_user/view')" id="registered_capital" label="注册资金" label-for="registered_capital">
			<b-form-input id="registered_capital" v-model="form['registered_capital']" type="number" placeholder="注册资金" trim></b-form-input>
		</b-form-group>
				<b-form-group v-if="$check_register_field('add','number_of_companies','/business_user/view')" id="number_of_companies" label="公司人数" label-for="number_of_companies">
			<b-form-input id="number_of_companies" v-model="form['number_of_companies']" type="number" placeholder="公司人数" trim></b-form-input>
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
				url_upload: "~/api/business_user/upload?",
					        list_head_gender: "男,女",
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

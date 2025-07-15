<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce">
							<el-col v-if="$check_field('get','album_name') || $check_field('add','album_name') || $check_field('set','album_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="专辑名称" prop="album_name">
												<el-input id="album_name" v-model="form['album_name']" placeholder="请输入专辑名称"
							  v-if="(form['film_and_television_novels_id'] && $check_field('set','album_name')) || (!form['film_and_television_novels_id'] && $check_field('add','album_name'))" :disabled="disabledObj['album_name_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','album_name')">
						{{form['album_name']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','album_cover') || $check_field('add','album_cover') || $check_field('set','album_cover')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="专辑封面" prop="album_cover">
								<el-upload :disabled="disabledObj['album_cover_isDisabled']" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_album_cover"
						:show-file-list="false" v-if="(form['film_and_television_novels_id'] && $check_field('set','album_cover')) || (!form['film_and_television_novels_id'] && $check_field('add','album_cover'))">
						<img id="album_cover" v-if="form['album_cover']" :src="$fullUrl(form['album_cover'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-image v-else-if="$check_field('get','album_cover')" style="width: 100px; height: 100px"
						:src="$fullUrl(form['album_cover'])" :preview-src-list="[$fullUrl(form['album_cover'])]">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','authors_name') || $check_field('add','authors_name') || $check_field('set','authors_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="作者姓名" prop="authors_name">
												<el-input id="authors_name" v-model="form['authors_name']" placeholder="请输入作者姓名"
							  v-if="(form['film_and_television_novels_id'] && $check_field('set','authors_name')) || (!form['film_and_television_novels_id'] && $check_field('add','authors_name'))" :disabled="disabledObj['authors_name_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','authors_name')">
						{{form['authors_name']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','audio_content') || $check_field('add','audio_content') || $check_field('set','audio_content')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="音频内容" prop="audio_content">
												<el-upload v-if="(form['film_and_television_novels_id'] && $check_field('set','audio_content')) || (!form['film_and_television_novels_id'] && $check_field('add','audio_content'))" class="upload-demo" :file-list="audio_content_FileList" :on-preview="openPreview" :on-remove="audio_contentRemove" drag
						action="" style="max-width: 300px;width: 100%;" :http-request="upload_audio_content" :limit="1" accept="audio/ogg,audio/mp3,audio/wav">
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将音频拖到此处，或<em>点击上传</em></div>
					</el-upload>
					<div v-else-if="$check_field('get','audio_content')">
						<el-button type="primary" @click="$download($fullUrl(form['audio_content']),form['audio_content'])">下载<i
								class="el-icon-download el-icon--right"></i></el-button>
					</div>
											</el-form-item>
			</el-col>
						
	
	
				<el-col
					v-if="$check_action('/film_and_television_novels/view', 'set') || $check_action('/film_and_television_novels/view', 'add')"
					:xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="当前位置" prop="location_address">
					<el-input style="width: 80%" id="location_address" v-model="form['location_address']"
							  :disabled="true"></el-input>
					<el-button size="mini" @click="getLongitudeLatitude()">定位</el-button>
				</el-form-item>
			</el-col>
		
				<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
			  <el-form-item label="详细地址">
			    <el-input id="mark_address" v-model="form['mark_address']" placeholder="请输入地址" clearable v-if="(form['film_and_television_novels_id}'] && $check_action('/film_and_television_novels/view', 'set')) || (!form['film_and_television_novels_id}'] && $check_action('/film_and_television_novels/view', 'add'))"></el-input>
			    <div v-else-if="$check_action('/film_and_television_novels/view', 'get')" v-html="form['mark_address']"></div>
			  </el-form-item>
			</el-col>
		
	
	
	
	
	</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/film_and_television_novels/view','set') || $check_action('/film_and_television_novels/view','add')">
					<el-button type="primary" @click="submit()">提交</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
				<el-form-item v-else>
					<el-button @click="cancel()">返回</el-button>
				</el-form-item>
			</el-col>

		</el-form>
	</el-main>
</template>

<script>
	import mixin from "@/mixins/page.js";
	import { baiduMap } from "@/utils/baidu_map.js";
        
	export default {
		mixins: [mixin],
		data() {
			return {
				field: "film_and_television_novels_id",
				url_add: "~/api/film_and_television_novels/add?",
				url_set: "~/api/film_and_television_novels/set?",
				url_get_obj: "~/api/film_and_television_novels/get_obj?",
				url_upload: "~/api/film_and_television_novels/upload?",

				query: {
					"film_and_television_novels_id": 0,
				},

				form: {
								"album_name":  '', // 专辑名称
										"album_cover":  '', // 专辑封面
										"authors_name":  '', // 作者姓名
										"audio_content":  '', // 音频内容
											"film_and_television_novels_id": 0, // ID
							"location_address": "", // 定位地址
					"location_lng": "", // 定位地址经度
					"location_lat": "", // 定位地址纬度
													"mark_address": "",	// 详细地址
					},
				disabledObj:{
								"album_name_isDisabled": false,
										"album_cover_isDisabled": false,
										"authors_name_isDisabled": false,
										"audio_content_isDisabled": false,
										},

																								audio_content_FileList: [],
					
			}
		},
		mounted() {
		  baiduMap().then((BMap) => {
		    this.initMap(BMap);
		  });
		},
		methods: {
			initMap(BMap) {
			  // 创建地图实例
			  var ac = new BMap.Autocomplete({
			    input: "mark_address",
			    location: "中国",
			  });
			  // 监听选中地址事件
			  ac.addEventListener("onconfirm", (e) => {
			    const _value = e.item.value;
			    const value =
			      _value.province +
			      _value.city +
			      _value.district +
			      _value.street +
			      _value.business;
			    this.form.mark_address = value;
			  });
			},
			// 创建地址转经纬度
			getCoordinates(address) {
			  return new Promise((resolve, reject) => {
			    var myGeo = new BMap.Geocoder();
			    myGeo.getPoint(
			      address,
			      function (point) {
			        if (point) {
			          resolve(point);
			        } else {
			          reject("无法获取坐标，请检查地址是否正确");
			        }
			      },
			      "中国"
			    );
			  });
			},
					  openPreview(file) {
	    window.open(file.url)
	  },
		
	
						/**
			 * 上传专辑封面
			 * @param {Object} param 图片参数
			 */
			upload_album_cover(param){
									this.uploadFile(param.file, "album_cover");
								},
		
	
				
	
						/**
			 * 上传音频内容
			 * @param {Object} param 音频参数
			 */
			upload_audio_content(param){
									this.uploadFile(param.file, "audio_content");
								},
					audio_contentRemove() {
			  this.audio_content_FileList = []
			  this.form.audio_content = ""
			},
	
	
		
			/**
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
																						if(this.form && form){
					Object.keys(this.form).forEach(key => {
						Object.keys(form).forEach(dbKey => {
							// if(dbKey === "charging_standard"){
							// 	this.form['charging_rules'] = form[dbKey];
							// 	this.disabledObj['charging_rules_isDisabled'] = true;
							// };
							if(key === dbKey){
								this.disabledObj[key+'_isDisabled'] = true;
								this.form[key] = form[dbKey]
							}
							if(dbKey === "source_table"){
								this.form['source_table'] = form[dbKey];
							}
							if(dbKey === "source_id"){
								this.form['source_id'] = form[dbKey];
							}
							if(dbKey === "source_user_id"){
								this.form['source_user_id'] = form[dbKey];
							}
						})
					})
				}
												$.db.del("form");
				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){

																													this.audio_content_FileList = []
				if (json.result.obj["audio_content"]) {
				    this.audio_content_FileList = [
				        {
				            url: this.$fullUrl(json.result.obj['audio_content']),
				            name: json.result.obj['audio_content'],
				        },
				    ];
				}
				

			},

																																		async submit(param, func){
				if (!param) {
					param = this.form;
				}
									if (param["mark_address"]) {
					  const point = await this.getCoordinates(param["mark_address"]);
					  param["mark_lng"] = Number(point.lng.toFixed(8));
					  param["mark_lat"] = Number(point.lat.toFixed(8));
					};
								var pm = this.events("submit_before", Object.assign({}, param)) || param;
				var msg = await this.events("submit_check", pm);
				var ret;
				if (msg) {
					this.$toast(msg, 'danger');
				} else {
																																							ret = this.events("submit_main", pm, func);
				}
				return ret;
			},
			/**
			 * 提交前验证事件
			 * @param {Object} 请求参数
			 * @return {String} 验证成功返回null, 失败返回错误提示
			 */
						submit_check(param) {
																																																						return null;
			},

			is_view(){
				// var bl = this.user_group == "管理员";
				var bl = false;

				if(!bl){
					bl = this.$check_action('/film_and_television_novels/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/film_and_television_novels/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/film_and_television_novels/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/film_and_television_novels/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/film_and_television_novels/view','get');
					console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
				}

				console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

				return bl;
			},
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "avatar");
			},
			getLongitudeLatitude() {
				let _this = this;
				_this.form.location_address = "广东省深圳市南山区科技园";
				_this.form.location_lng = "113.946782";
				_this.form.location_lat = "22.556481";
				//如果该对象存在，那么地理位置服务可用。
				if ('geolocation' in navigator) {
					/* 地理位置服务可用 */
					let options = {
						enableHighAccuracy: true, //布尔值，表示系统是否使用最高精度来表示结果，注意，这会导致较慢的响应时间或者增加电量消耗（比如对于支持gps的移动设备来说）。如果值为false ，设备会通过更快响应以及/或者使用更少的电量等方法来尽可能的节约资源。默认值fasle
						timeout: 5000, //它表明的是设备必须在多长时间（单位毫秒）内返回一个位置。默认直到获取到位置才会返回值。
						maximumAge: 0 //表明可以返回多长时间（即最长年龄，单位毫秒）内的可获取的缓存位置。如果设置为 0, 说明设备不能使用一个缓存位置，而且必须去获取一个真实的当前位置。默认0
					}
					function success(position) {
						//position.coords (只读) 返回一个定义了当前位置的Coordinates对象。
						//position.timestamp (只读) 返回一个时间戳DOMTimeStamp， 这个时间戳表示获取到的位置的时间。
						let lat = position.coords.latitude //当前位置的纬度
						let lng = position.coords.longitude //当前位置精度
						let location=lng+","+lat;
						let url = "http://restapi.amap.com/v3/geocode/regeo?key=b6eb2819a6ba4c5119591614272fe7ca&location="+location;
						_this.$axios.get(url, {
						}).then((res) => {
							if (res.status===200){
								let data = res.data;
								if (data.status==='1'){
									_this.form.location_address = data.regeocode.formatted_address;
									_this.form.location_lng = JSON.stringify(lng);
									_this.form.location_lat = JSON.stringify(lat);
								}else {
									console.log(data.info)
								}
							}
						}).catch((res) => {
							console.log(res);
						});
					}
					function error(err) {
						let errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时']
						console.log(errorType[err.code - 1])
					}
					navigator.geolocation.getCurrentPosition(success, error, options)
				} else {
					/* 地理位置服务不可用 */
					console.log('无法获取您的位置，请检查定位是否开启或刷新重试')
				}
			},

		},
		created() {
										},
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	
	.img_multiple{
		overflow: hidden;
	}
	.img_multiple .img_block{
		float: left;
		margin-right: 5px;
		margin-bottom: 5px;
		position: relative;
	}
	.img_multiple .img_block img{
		height: 100px;
		width: auto;
	}
	.img_multiple .img_del{
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

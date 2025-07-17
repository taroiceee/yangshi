<template>
	<div class="page_account login" id="account_login">
		<div class="warp login_warp">
			<div class="container">
				<div class="row row_login">

							<!-- 登录 -->
							<div class="form_login">
							<div class="form_box">
								<b-form class="forms">
									<b-form-group id="input-group-1" label="用户名:" label-for="input-1"
										:state="validation_username" invalid-feedback="账户名长度为在5-16个字符"
										valid-feedback="校验通过">
										<b-form-input id="input-1" v-model="form.username" type="text" placeholder="请输入用户名"
											trim></b-form-input>
									</b-form-group>

									<b-form-group id="input-group-2" label="密码:" label-for="input-2"
										:state="validation_password" invalid-feedback="密码长度为在5-16个字符"
										valid-feedback="校验通过">
										<b-form-input id="input-2" v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="请输入密码" trim autocomplete="off"></b-form-input>
										<b-input-group-append>
										    <b-button class="show-password" @click="showPassword = !showPassword" variant="outline-secondary" style="border: none; background-color: rgb(0, 0, 0, 0); box-shadow: none;position: absolute;top: -6px;right: 10px;padding: 0;">
										      <b-icon :icon="showPassword ? 'eye-slash' : 'eye'"></b-icon>
										    </b-button>
										</b-input-group-append>
									</b-form-group>

										<!-- 数字验证开始 -->
										<div class="geetest_box">
											<div class="geetest_box_title"><span>验证:</span></div>
											<div class="geetest_box_content">
												<Verification ref="child"></Verification>
											</div>
										</div>
										<!-- 数字验证结束 -->
										<b-form-group>
											<b-form-checkbox v-model="form.remember">记住密码</b-form-checkbox>
										</b-form-group>
										<!-- 用户协议 -->
										<b-form-group :state="validation_agreement" valid-feedback="校验通过">
											<div class="agreement-box">
												<b-form-checkbox v-model="form.agreement" :disabled="!canCheckAgreement">
													我已阅读并同意<b-link @click="showAgreementModal" style="color: blue">《用户协议》</b-link>
												</b-form-checkbox>
												<!-- <span class="text-muted ml-2" v-if="!canCheckAgreement"> ({{ countdown }}秒后可勾选) </span> -->
											</div>
										</b-form-group>

								</b-form>
								<!-- 用户协议模态框 -->
								<b-modal id="agreement-modal" title="用户协议" size="lg" ok-title="我已阅读" :ok-disabled="!canCheckAgreement" @shown="startCountdown" @hidden="resetCountdown" ok-only>
									<div class="agreement-content">
										<h4 class="text-center mb-4">用户使用协议</h4>
										<p>1. 本协议是用户与本站之间的法律协议。</p>
										<p>2. 用户在使用本系统前应仔细阅读本协议。</p>
										<p>3. 用户必须遵守国家相关法律法规。</p>
										<p>4. 不得利用本系统从事任何违法活动。</p>
										<p>5. 用户应妥善保管账号密码，不得泄露给他人。</p>
										<p>6. 本站有权在必要时修改协议内容。</p>
										<p>7. 本协议最终解释权归本站所有。</p>
										<p>8. 用户使用本系统即视为同意本协议所有条款。</p>
									</div>
									<template #modal-footer>
										<b-button variant="primary" @click="closeAgreementModal" :disabled="!canCheckAgreement" style="padding-top: 0px">
											<span v-if="!canCheckAgreement">已阅读 ({{ countdown }}秒后可勾选)</span>
											<span class="okyhxy" v-else>我已阅读</span>
										</b-button>
									</template>
								</b-modal>
									<div class="btns_bottom log_bt">
										<button class="btn_item btn" @click="submit()"><span>登录</span></button>
										<button class="forgot_nav btn" @click="$router.push('/account/forgot')">
											<span>找回密码</span>
										</button>
																			<button class="btn_register btn" @click="$router.push('/account/register')">
											没有存在账户？<span>创建一个账户吧！</span>
										</button>
																		</div>
																		   <el-divider content-position="center">其他登录方式</el-divider>
									   <div class="otherlogin">
										  <i @click="goOtherLogin('wechat')" class="otherlogin-icon wechat-icon"></i>
										  <i @click="goOtherLogin('qq')" class="otherlogin-icon qq-icon"></i>
										  <i @click="goOtherLogin('wb')" class="otherlogin-icon wb-icon"></i>
									   </div>
																	</div>
							</div>



				</div>
			</div>
		</div>
		<div v-if="openFace" class="face-login">
			<el-button @click="openAndInitCamera()">摄像头</el-button>
			<el-button @click="openAndUploadImg()">图片</el-button>
			<div v-if="openCamera" class="face-camera">
				<div>
					<canvas ref="canvasElement"></canvas>
					<video ref="videoElement" autoplay></video>
				</div>
				<el-button @click="takePhoto">拍照</el-button>
				<el-button @click="submitFace('camera')">提交</el-button>
			</div>
			<div v-if="openFaceImg" class="face-img">
				<el-upload id="photo" class="avatar-uploader" drag
						   accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="uploadImg"
						   :show-file-list="false" >
					<img v-if="form['face_image']" :src="$fullUrl(form['face_image'])" class="avatar" style="width: 100%;height: 100%;">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<el-button @click="submitFace('img')">提交</el-button>
			</div>
		</div>
	</div>
</template>

<script>
		import Verification from '@/components/common/verification.vue'
		import {rsaEncrypt} from "@/store/encrypt";
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				loading: false,
				showPassword: false, // 控制密码可见性
				canCheckAgreement: false,
				countdown: 5,
				timer: null,
				hasSeenAgreement: false,
				allow_user: [
					'管理员'
						,"注册用户"
							,"商家用户"
															],
				form: {
					username: "",
					password: "",
					face_image:"",
					remember: false,
					agreement: false,

				},
				url_upload: "~/api/user/upload?",
				openFace: false,
				openCamera:false,
				openFaceImg:false,
				cameraPhotoUrl: null,
				face_image: "",
				face_url: "",
			};
		},
		created() {
			this.loadRememberedAccount();
		},
		methods: {
			// 关闭用户协议
			countdowndialog() {
				if (this.countdown <= 0) {
					this.agreementDialogVisible = false;
					this.form.agreement = true;
				}
			},
			// 清除定时器
			clearTimer() {
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
				}
			},
			// 开始倒计时
			startCountdown() {
				this.hasSeenAgreement = true;
				this.canCheckAgreement = false;
				this.countdown = 5;

				this.clearTimer();

				this.timer = setInterval(() => {
					if (this.countdown > 0) {
						this.countdown--;
					} else {
						this.clearTimer();
						this.canCheckAgreement = true;
					}
				}, 1000);
			},
			// 重置倒计时
			resetCountdown() {
				if (!this.hasSeenAgreement) {
					this.canCheckAgreement = false;
				}
			},

			// 关闭协议模态框
			closeAgreementModal() {
				this.$bvModal.hide("agreement-modal");
				this.form.agreement = true;
			},
			// 显示用户协议
			showAgreementModal() {
				this.$bvModal.show("agreement-modal");
			},
			// Base64编码
			encode(str) {
				return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode("0x" + p1)));
			},

			// Base64解码
			decode(str) {
				return decodeURIComponent(
					atob(str)
						.split("")
						.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
						.join("")
				);
			},
			// 登录记住密码写入输入框
			loadRememberedAccount() {
				const rememberedAccount = localStorage.getItem("rememberedAccount");
				if (rememberedAccount) {
					try {
						const account = JSON.parse(rememberedAccount);
						// 检查是否过期（7天后删除）
						if (account && account.expireTime && new Date().getTime() < account.expireTime) {
							this.form = {
								...this.form,
								username: account.username,
								password: this.decode(account.password),
								remember: true,
							};
						} else {
							localStorage.removeItem("rememberedAccount");
						}
					} catch (e) {
						console.error("解析记住的账号失败:", e);
						localStorage.removeItem("rememberedAccount");
					}
				}
			},
         goOtherLogin(type) {
            if (!this.validation_username) {
               return this.$message.warning("请输入正确账号")
            } else if (!this.validation_password) {
               return this.$message.warning("请输入正确密码")
            }
			// else if (!this.validation_agreement) {
			// 	return this.$message.warning("请认真阅读用户协议");
			// }
			let new_password = this.form.password
							new_password = rsaEncrypt(this.form.password)
			            var obj = {
               type: type,
               username: this.form.username,
               password: new_password
            };
            this.$store.commit("set_otherLogin", obj);
            this.$router.push({name:'otherLogin',params:obj})
      },
	submit() {
				var _this = this;
				// var condition = this.validation_username && this.validation_password;
				// if (!condition) {
				// 	return this.$message.warning("输入不合法");
				// }
				// 极验开始

						const bool = this.$refs.child.sublim();
						if(!this.validation_username){
						return this.$message.warning("请输入正确账号")
					}else if(!this.validation_password){
						return this.$message.warning("请输入正确密码")
					}
					// 	else if (!this.validation_agreement) {
					// 	return this.$message.warning("请认真阅读用户协议");
					// }
								else if(!bool){
						return
					}
						// 极验结束
				var form = Object.assign({}, this.form);
					form.password = rsaEncrypt(form.password)
					form.is_face = "face";
				this.$post("~/api/user/login?", form, (res) => {
					if (res.result && res.result.obj) {
						if(this.allow_user.includes(res.result.obj.user_group)){
							_this.openFace = true;
						}else{
							_this.$toast("您的账号不支持在用户端登录", 'error');
						}
					} else if (res.error) {
						console.log(res.error);
					this.$message.error(res.error.message);
					}
				});
			},
			initCamera() {
				navigator.mediaDevices.getUserMedia({ video: true })
						.then(stream => {
							const videoElement = this.$refs.videoElement;
							videoElement.srcObject = stream;
							videoElement.play();
						})
						.catch(error => {
							console.error('无法访问摄像头：', error);
						});
			},
			takePhoto() {
				const videoElement = this.$refs.videoElement;
				const canvasElement = this.$refs.canvasElement;
				const context = canvasElement.getContext('2d');

				// 将视频流的画面绘制到Canvas中
				context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

				// 获取Canvas中的图像数据
				const imageData = canvasElement.toDataURL('image/png');

				// 显示拍摄的照片
				this.cameraPhotoUrl = imageData;

				let file = this.base64ToFile(this.cameraPhotoUrl,'cameraImg')
				this.uploadFile(file,"face_image")
			},
			closeVideo() {
				const srcObject = this.$refs.videoElement.srcObject ? this.$refs.videoElement.srcObject.getTracks() : this.$refs.videoElement.src.getTracks()
				srcObject.forEach(track => {
					track.stop();
					this.$refs.videoElement.src = null;
				});
			},
			uploadImg(param){
				this.uploadFile(param.file, "face_image");
			},
			openAndInitCamera(){
				this.openFaceImg = false;
				this.openCamera = true;
				this.initCamera();
			},
			openAndUploadImg(){
				this.openCamera = false;
				this.openFaceImg = true;
			},
			submitFace(type){
				if (type==='camera'){
					this.closeVideo();
				}
				//人脸识别登录
				let form = {
					username : this.form.username + '',
					face_image: this.face_url
				};
				let _this = this;
				this.$post('~/api/user/face_login?', form, (res) => {
					if (res.result && res.result.obj) {
					var obj = res.result.obj;

					$.db.set("token", obj.token);
					_this.$store.commit("user_set", obj);
					sessionStorage.setItem('user_id',obj.user_id)

					this.$get_auth(obj.user_group, () => {
						this.$router.push("/");
						location.reload();
					});
									// 登录成功处理记住密码
					this.loading = true;
					if (this.form.remember) {
						const expireTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
						localStorage.setItem(
							"rememberedAccount",
							JSON.stringify({
								username: this.form.username,
								password: this.encode(this.form.password),
								expireTime: expireTime,
							})
						);
					} else {
						localStorage.removeItem("rememberedAccount");
						this.loading = false;
					}
									this.$message.success("登录成功！");


					} else if (res.error) {
						console.log(res.error);
						this.$message.error(res.error.message);
					}
				});
			},
			//base64转flie
			base64ToFile(base64, name) {
				if (typeof base64 != 'string') {
					return;
				}
				let arr = base64.split(',')
				let type = arr[0].match(/:(.*?);/)[1]
				let fileExt = type.split('/')[1]
				let bstr = atob(arr[1])
				let n = bstr.length
				let u8arr = new Uint8Array(n)
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n)
				}
				return new File([u8arr], `${name}.` + fileExt, {
					type: type
				})
			},
		},
		computed: {
			/**
			 * 验证用户名
			 */
			validation_username() {
				var length = this.form.username.length;
				if (!length) {
					return null;
				}
				return length > 4 && length < 17;
			},
			/**
			 * 验证密码
			 */
			validation_password() {
				var length = this.form.password.length;
				if (!length) {
					return null;
				}
				return length > 4 && length < 17;
			},
			/**
			 * 验证用户协议
			 */
			validation_agreement() {
				var length = this.form.agreement;
				if (!length) {
					return null;
				}
				return (length = true);
			},
		},

		components:{
			Verification,
		}

	};
</script>

<style scoped>
	.page_account {
		min-height: 800px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	button{
		border: 1px solid #32323232;
		border-radius: 7px;
		text-align: center;
    	height: 48px;
    	line-height: 48px;
	}

	button span{
		color:#212121
	}

	.btn_item {
		cursor: pointer;
		width: 50%;

		color: #fff;
		text-align: center;
		height: 48px;
		line-height: 48px;
	}

	.flex_cc {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.form_login {
		padding: 1rem;

	}

	.more_nav {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 1rem;
		margin: auto 0;
	}



	.more_nav .btns_bottom {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}


	.forgot_nav {
		text-align: left;
		font-size: 10px;
		margin-top: 5px;
		cursor: pointer;
	}

	.btn_register{
		margin-top: 5px;
	}

	/*************************************** */
	.sign_in .form .el-input{
		width: 100%;
	}

	/***************极验************************ */
	.geetest_box{
		display: flex;
		margin-bottom: 30px;
		width: 420px;
	}
	.geetest_box_title{
		display: flex;
		width: 100px;
		font-size: 14px;
		text-align: inherit;
		margin-right: 0;
	}
	.geetest_box_title::before{
        content: '*';
    color: #F56C6C;
    margin-right: 4px;
	}
	.geetest_box_content{
	}
   .otherlogin {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
   }
	
   .otherlogin-icon {
      width: 45px;
      height: 45px;
      display: inline-block;
      margin-right: 20px;
      cursor: pointer;
      background-image: url('../../assets/images/otherlogin.png');
      background-repeat: no-repeat;
   }
	
   .otherlogin .wechat-icon {
      background-position: 0px 0px;
	
   }
	
   .otherlogin .qq-icon {
      background-position: 0px;
   }
	
   .otherlogin .wb-icon {
      background-position: 0px -95px;
      margin-right: 0;
   }
	.form_login #input-group-1::before,
	.form_login #input-group-2::before
	{
		content: '*';
		color: #ff3131;
		margin-right: 4px;
	}
	.form-group{
		position: relative;
	}
	#app .page_account .form_box .forms .form-group .input-group-append button.show-password{
		background-color: rgba(0, 0, 0, 0) !important;
		border: none !important;
		background: rgba(0, 0, 0, 0) !important;
	}
</style>
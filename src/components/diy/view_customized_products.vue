<template>
	<el-main class="bg edit_wrap">
		<iframe :srcdoc="iframeContent" id='printIframe' width="600" height="400" style="display: none;"></iframe>
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce">
							<el-col v-if="$check_field('get','commodity_number') || $check_field('add','commodity_number') || $check_field('set','commodity_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商品编号" prop="commodity_number">
												<el-input id="commodity_number" v-model="form['commodity_number']" placeholder="请输入商品编号"
							  v-if="(form['customized_products_id'] && $check_field('set','commodity_number')) || (!form['customized_products_id'] && $check_field('add','commodity_number'))" :disabled="true">
				  					</el-input>
					<div v-else-if="$check_field('get','commodity_number')">
						{{form['commodity_number']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','name_of_commodity') || $check_field('add','name_of_commodity') || $check_field('set','name_of_commodity')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商品名称" prop="name_of_commodity">
												<el-input id="name_of_commodity" v-model="form['name_of_commodity']" placeholder="请输入商品名称"
							  v-if="(form['customized_products_id'] && $check_field('set','name_of_commodity')) || (!form['customized_products_id'] && $check_field('add','name_of_commodity'))" :disabled="disabledObj['name_of_commodity_isDisabled']">
				  					</el-input>
					<div v-else-if="$check_field('get','name_of_commodity')">
						{{form['name_of_commodity']}}
				  					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','category_name') || $check_field('add','category_name') || $check_field('set','category_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="分类名称" prop="category_name">
								<el-select id="category_name" v-model="form['category_name']" filterable 						v-if="(form['customized_products_id'] && $check_field('set','category_name')) || (!form['customized_products_id'] && $check_field('add','category_name'))">
						<el-option v-for="o in list_category_name" :key="o['classification_name']" :label="o['classification_name']"
							:value="o['classification_name']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','category_name')">{{form['category_name']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','commodity_cover') || $check_field('add','commodity_cover') || $check_field('set','commodity_cover')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商品封面" prop="commodity_cover">
								<el-upload :disabled="disabledObj['commodity_cover_isDisabled']" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_commodity_cover"
						:show-file-list="false" v-if="(form['customized_products_id'] && $check_field('set','commodity_cover')) || (!form['customized_products_id'] && $check_field('add','commodity_cover'))">
						<img id="commodity_cover" v-if="form['commodity_cover']" :src="$fullUrl(form['commodity_cover'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-image v-else-if="$check_field('get','commodity_cover')" style="width: 100px; height: 100px"
						:src="$fullUrl(form['commodity_cover'])" :preview-src-list="[$fullUrl(form['commodity_cover'])]">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','commodity_album') || $check_field('add','commodity_album') || $check_field('set','commodity_album')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商品相册" prop="commodity_album">
								<el-upload :disabled="disabledObj['commodity_album_isDisabled']" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" multiple action="" :http-request="upload_commodity_album"
						:show-file-list="false" v-if="((form['customized_products_id'] && $check_field('set','commodity_album')) || (!form['customized_products_id'] && $check_field('add','commodity_album'))) && !disabledObj['commodity_album_isDisabled']">
						<i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<div class="img_multiple" v-if="(form['customized_products_id'] && $check_field('set','commodity_album')) || (!form['customized_products_id'] && $check_field('add','commodity_album'))">
						<div v-if="Array.isArray(form['commodity_album'])">
							<div class="img_block" v-for="(img,img_index) in form['commodity_album']" :key="img_index">
								<img id="commodity_album" :src="$fullUrl(img)" class="avatar"/>
								<span class="img_del" @click="delImg(img_index,'commodity_album')">x</span>
							</div>
						</div>
						<div class="img_block" v-else>
							<span>上传中...</span>
						</div>
					</div>
					<el-image v-else-if="$check_field('get','commodity_album')" style="width: 100px; height: 100px"
						:src="$fullUrl(item)" v-for="item in commodity_album_imgs" :preview-src-list="commodity_album_imgs">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','custom_inventory') || $check_field('add','custom_inventory') || $check_field('set','custom_inventory')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="定制库存" prop="custom_inventory">
								<el-input-number id="custom_inventory" v-model.number="form['custom_inventory']"
						v-if="(form['customized_products_id'] && $check_field('set','custom_inventory')) || (!form['customized_products_id'] && $check_field('add','custom_inventory'))" :disabled="disabledObj['custom_inventory_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','custom_inventory')">{{form['custom_inventory']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','product_production_date') || $check_field('add','product_production_date') || $check_field('set','product_production_date')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="产品生产日期" prop="product_production_date">
								<el-date-picker :disabled="disabledObj['product_production_date_isDisabled']" v-if="(form['customized_products_id'] && $check_field('set','product_production_date')) || (!form['customized_products_id'] && $check_field('add','product_production_date'))" id="product_production_date"
						v-model="form['product_production_date']" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
					</el-date-picker>
					<div v-else-if="$check_field('get','product_production_date')">{{form['product_production_date']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','business_user') || $check_field('add','business_user') || $check_field('set','business_user')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商家用户" prop="business_user">
																		<div v-if="user_group !== '管理员'">
							{{ get_user_session_business_user(form['business_user']) }}
							<el-select v-if="(form['customized_products_id'] && $check_field('set','business_user')) || (!form['customized_products_id'] && $check_field('add','business_user'))" id="business_user" v-model="form['business_user']" :disabled="disabledObj['business_user_isDisabled']">
								<el-option v-for="o in list_user_business_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
							<el-select v-else-if="$check_field('get','business_user')" id="business_user" v-model="form['business_user']" :disabled="true">
								<el-option v-for="o in list_user_business_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
										   :value="o['user_id']">
								</el-option>
							</el-select>
						</div>
						<el-select v-else id="business_user" v-model="form['business_user']" :disabled="disabledObj['business_user_isDisabled']">
							<el-option v-for="o in list_user_business_user" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
																</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','shelf_life_time') || $check_field('add','shelf_life_time') || $check_field('set','shelf_life_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="保质时间" prop="shelf_life_time">
								<el-date-picker :disabled="disabledObj['shelf_life_time_isDisabled']" v-if="(form['customized_products_id'] && $check_field('set','shelf_life_time')) || (!form['customized_products_id'] && $check_field('add','shelf_life_time'))" id="shelf_life_time"
						v-model="form['shelf_life_time']" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<div v-else-if="$check_field('get','shelf_life_time')">{{form['shelf_life_time']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','custom_statement_content') || $check_field('add','custom_statement_content') || $check_field('set','custom_statement_content')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="定制声明内容" prop="custom_statement_content">
												<div v-if="disabledObj['custom_statement_content_isDisabled']">
						<div v-if="$check_field('get','custom_statement_content')">
							<el-button type="primary" @click="$download($fullUrl(form['custom_statement_content']),form['custom_statement_content'])">下载<i
									class="el-icon-download el-icon--right"></i></el-button>
						</div>
					</div>
					<div v-else>
						<el-upload v-if="(form['customized_products_id'] && $check_field('set','custom_statement_content')) || (!form['customized_products_id'] && $check_field('add','custom_statement_content'))" class="upload-demo" :file-list="custom_statement_content_FileList" :on-preview="openPreview" :on-remove="custom_statement_contentRemove" drag
								   action="" style="max-width: 300px;width: 100%;" :http-request="upload_custom_statement_content" :limit="1" accept="">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						</el-upload>
						<div v-else-if="$check_field('get','custom_statement_content')">
							<el-button type="primary" @click="$download($fullUrl(form['custom_statement_content']),form['custom_statement_content'])">下载<i
									class="el-icon-download el-icon--right"></i></el-button>
						</div>
					</div>
											</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','custom_type') || $check_field('add','custom_type') || $check_field('set','custom_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="定制类型" prop="custom_type">
								<el-select id="custom_type" v-model="form['custom_type']" filterable  @change="select_custom_type_field"						v-if="(form['customized_products_id'] && $check_field('set','custom_type')) || (!form['customized_products_id'] && $check_field('add','custom_type'))">
						<el-option v-for="o in list_custom_type" :key="o['classification_name']" :label="o['classification_name']"
							:value="o['classification_name']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','custom_type')">{{form['custom_type']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','custom_requirements') || $check_field('add','custom_requirements') || $check_field('set','custom_requirements')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="定制要求" prop="custom_requirements">
								<el-select id="custom_requirements" v-model="custom_requirements_multiple_value" multiple @change="select_custom_requirements_multiple"
							   v-if="(form['customized_products_id'] && $check_field('set','custom_requirements')) || (!form['customized_products_id'] && $check_field('add','custom_requirements'))">
						<el-option v-for="o in list_custom_requirements" :key="o['classification_name']" :label="o['classification_name']"
								   :value="o['classification_name']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','custom_requirements')">{{form['custom_requirements']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','customized_price') || $check_field('add','customized_price') || $check_field('set','customized_price')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="定制价格" prop="customized_price">
								<el-input id="customized_price" v-model="form['customized_price']"
						v-if="(form['customized_products_id'] && $check_field('set','customized_price')) || (!form['customized_products_id'] && $check_field('add','customized_price'))" :disabled="true">
									</el-input>
					<div v-else-if="$check_field('get','customized_price')">
						{{form['customized_price']}}
									</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','notes') || $check_field('add','notes') || $check_field('set','notes')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="说明备注" prop="notes">
								<el-input type="textarea" id="notes" v-model="form['notes']" placeholder="请输入说明备注"
						v-if="(form['customized_products_id'] && $check_field('set','notes')) || (!form['customized_products_id'] && $check_field('add','notes'))" :disabled="disabledObj['notes_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','notes')">{{form['notes']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="$check_field('get','commodity_details') || $check_field('add','commodity_details') || $check_field('set','commodity_details')" :xs="24" :sm="24" :lg="24" class="el_form_editor_warp">
				<el-form-item label="商品详情" prop="commodity_details">
					<quill-editor v-model.number="form['commodity_details']"
						v-if="(form['customized_products_id'] && $check_field('set','commodity_details')) || (!form['customized_products_id'] && $check_field('add','commodity_details')) ">
					</quill-editor>
					<div v-else-if="$check_field('get','commodity_details')" v-html="form['commodity_details']"></div>
				</el-form-item>
			</el-col>
								<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="审核状态" prop="examine_state">
					<el-select id="examine_state" v-model="form['examine_state']"
						v-if="(form['examine_state'] && $check_examine()) || (!form['examine_state'] && $check_examine())" :disabled="true">
						<el-option key="未审核" label="未审核" value="未审核"></el-option>
						<el-option key="已通过" label="已通过" value="已通过"></el-option>
						<el-option key="未通过" label="未通过" value="未通过"></el-option>
					</el-select>
					<div v-else>{{form["examine_state"]}}</div>
				</el-form-item>
			</el-col>
		
				<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="二维码图片" prop="qrcode_img">
					<el-upload :disabled="disabledObj['qrcode_img_isDisabled']" class="avatar-uploader" drag
							   accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_qrcode"
							   :show-file-list="false">
						<img id="qrcode_img" v-if="form['qrcode_img']" :src="$fullUrl(form['qrcode_img'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="二维码标题" prop="qrcode_title">
					<el-input id="qrcode_title" v-model="form['qrcode_title']" placeholder="请输入二维码标题"
							  :disabled="disabledObj['qrcode_title_isDisabled']"></el-input>
				</el-form-item>
			</el-col>
	
				<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="计时器标题" prop="timer_title">
					<el-input id="timer_title" v-model="form['timer_title']" placeholder="请输入计时器标题"
							  v-if="$check_action('/customized_products/view','set') || $check_action('/customized_products/view','add')" :disabled="disabledObj['timer_title_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','timer_title')">{{form['timer_title']}}</div>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="计时开始时间" prop="timing_start_time">
					<el-date-picker id="timing_start_time" v-model="form['timing_start_time']" placeholder="选择计时器开始时间"
						v-if="$check_action('/customized_products/view','set') || $check_action('/customized_products/view','add')" :disabled="disabledObj['timing_start_time_isDisabled']" type="datetime" >
					</el-date-picker>
					<div v-else-if="$check_field('get','timing_start_time')">{{form['timing_start_time']}}</div>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="计时结束时间" prop="timing_end_time">
					<el-date-picker id="timing_end_time" v-model="form['timing_end_time']" placeholder="选择计时器开始时间"
						v-if="$check_action('/customized_products/view','set') || $check_action('/customized_products/view','add')" :disabled="disabledObj['timing_end_time_isDisabled']" type="datetime" >
					</el-date-picker>
					<div v-else-if="$check_field('get','timing_end_time')">{{form['timing_end_time']}}</div>
				</el-form-item>
			</el-col>
	
				<el-col
					v-if="$check_action('/customized_products/view', 'set') || $check_action('/customized_products/view', 'add')"
					:xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="当前位置" prop="location_address">
					<el-input style="width: 80%" id="location_address" v-model="form['location_address']"
							  :disabled="true"></el-input>
					<el-button size="mini" @click="getLongitudeLatitude()">定位</el-button>
				</el-form-item>
			</el-col>
		
				<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
			  <el-form-item label="详细地址">
			    <el-input id="mark_address" v-model="form['mark_address']" placeholder="请输入地址" clearable v-if="(form['customized_products_id}'] && $check_action('/customized_products/view', 'set')) || (!form['customized_products_id}'] && $check_action('/customized_products/view', 'add'))"></el-input>
			    <div v-else-if="$check_action('/customized_products/view', 'get')" v-html="form['mark_address']"></div>
			  </el-form-item>
			</el-col>
		
						<el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp" v-if="!form['source_user_id'] && 0 > 0">
			  <el-form-item label="定制限次">
				<el-input id="limit_times" v-model="form['i_want_to_customize_it_limit_times']" placeholder="定制限制次数，0为不限"
						  v-if="$check_option('/customized_products/view','can_limits')"
				></el-input>
				<div v-else-if="$check_action('/customized_products/view','get')" v-html="form['i_want_to_customize_it_limit_times']"></div>
			  </el-form-item>
			</el-col>
			
	
	      <el-col :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
        <el-form-item label="限制次数" prop="limit_times">
          <el-input id="limit_times" v-model="form['limit_times']" placeholder="限制次数"
                    v-if="(form['customized_products_id}'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id}'] && $check_action('/customized_products/view','add')) "
          ></el-input>
          <div v-else-if="$check_action('/customized_products/view','get')" v-html="form['limit_times']"></div>
        </el-form-item>
      </el-col>
	
	
	</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/customized_products/view','set') || $check_action('/customized_products/view','add')">
					<el-button type="primary" @click="submit()">提交</el-button>
					<el-button @click="cancel()">取消</el-button>
					<el-button v-if="!!query.customized_products_id"  type="primary" @click="sendprint">打印</el-button>
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
				iframeContent:'',
				field: "customized_products_id",
				url_add: "~/api/customized_products/add?",
				url_set: "~/api/customized_products/set?",
				url_get_obj: "~/api/customized_products/get_obj?",
				url_upload: "~/api/customized_products/upload?",

				query: {
					"customized_products_id": 0,
				},

				form: {
								"commodity_number": this.$get_stamp(), // 商品编号
										"name_of_commodity":  '', // 商品名称
										"category_name":  '', // 分类名称
										"commodity_cover":  '', // 商品封面
										"commodity_album": [], // 商品相册
										"custom_inventory":  0, // 定制库存
										"product_production_date":  '', // 产品生产日期
										"business_user": 0, // 商家用户
										"shelf_life_time":  '', // 保质时间
										"custom_statement_content":  '', // 定制声明内容
										"custom_type":  '', // 定制类型
										"custom_requirements":  '', // 定制要求
										"customized_price":  '', // 定制价格
										"notes":  '', // 说明备注
										"commodity_details":  '', // 商品详情
									"examine_state": "未审核",
								"customized_products_id": 0, // ID
						"qrcode_img":'', // 图片
					"qrcode_title":'', // 二维码标题
							"location_address": "", // 定位地址
					"location_lng": "", // 定位地址经度
					"location_lat": "", // 定位地址纬度
								"timer_title":'', // 计时器标题
					"timing_start_time":'', // 计时开始时间
					"timing_end_time":'', // 计时结束时间
							"limit_times": "", // 限制次数
							"limit_type":1,
											"i_want_to_customize_it_limit_times": 0, // 定制限制次数
											"mark_address": "",	// 详细地址
					},
				disabledObj:{
								"commodity_number_isDisabled": false,
										"name_of_commodity_isDisabled": false,
										"category_name_isDisabled": false,
										"commodity_cover_isDisabled": false,
										"commodity_album_isDisabled": false,
					          			"custom_inventory_isDisabled": false,
										"product_production_date_isDisabled": false,
										"business_user_isDisabled": false,
										"shelf_life_time_isDisabled": false,
										"custom_statement_content_isDisabled": false,
										"custom_type_isDisabled": false,
										"custom_requirements_isDisabled": false,
										"customized_price_isDisabled": false,
										"notes_isDisabled": false,
										"commodity_details_isDisabled": false,
									"qrcode_img_isDisabled": false,
					"qrcode_title_isDisabled": false,
							"timer_title_isDisabled": false,
					"timing_start_time_isDisabled": false,
					"timing_end_time_isDisabled": false,
							"limit_times_isDisabled": false, // 限制次数
					},

																			// 分类名称选项列表
				list_category_name: [""],
																					commodity_album_imgs: [],
																					// 用户列表
				list_user_business_user: [],
						// 用户组
				group_user_business_user: "",
																		custom_statement_content_FileList: [],
												// 定制类型选项列表
				list_custom_type: [""],
													custom_requirements_multiple_value:[],
						// 定制要求选项列表
				list_custom_requirements: [""],
																								
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
			sendprint(){
				let imgArrs = [
																																																								{ label: '商品封面', key: 'commodity_cover', value: document.getElementById('commodity_cover').src },
																																																																																																																																								];
				let formArrs = [
																							{ label: '商品编号', key: 'commodity_number', value: '' },
																								{ label: '商品名称', key: 'name_of_commodity', value: '' },
																								{ label: '分类名称', key: 'category_name', value: '' },
																																			{ label: '商品相册', key: 'commodity_album', value: '' },
																								{ label: '定制库存', key: 'custom_inventory', value: '' },
																								{ label: '产品生产日期', key: 'product_production_date', value: '' },
																								{ label: '商家用户', key: 'business_user', value: '' },
																								{ label: '保质时间', key: 'shelf_life_time', value: '' },
																								{ label: '定制声明内容', key: 'custom_statement_content', value: '' },
																								{ label: '定制类型', key: 'custom_type', value: '' },
																								{ label: '定制要求', key: 'custom_requirements', value: '' },
																								{ label: '定制价格', key: 'customized_price', value: '' },
																								{ label: '说明备注', key: 'notes', value: '' },
																								{ label: '商品详情', key: 'commodity_details', value: '' },
																							{ label: '详细地址', key: 'mark_address', value: '' },
									]
				let otherAddArrs=[
																{label:'审核状态',value:this.form['examine_state']},
															]
				this.printFrame(imgArrs,formArrs,this.obj,otherAddArrs)
			},
																  openPreview(file) {
	    window.open(file.url)
	  },
		
	
				
	
				
				/**
			 * 获取分类名称列表
			 */
			async get_list_category_name() {
				var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					this.list_category_name = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
					
						/**
			 * 上传商品封面
			 * @param {Object} param 图片参数
			 */
			upload_commodity_cover(param){
									this.uploadFile(param.file, "commodity_cover");
								},
		
	
						/**
			 * 上传商品相册
			 * @param {Object} param 图集参数
			 */
			upload_commodity_album(param){
									this.uploadFileMultiple(param.file, "commodity_album");
								},
		
	
				
	
				
	
				
	
				/**
			 * 获取商家用户用户列表
			 */
			async get_list_user_business_user() {
                var json = await this.$get("~/api/user/get_list?user_group=商家用户");
                if(json.result && json.result.list){
                    this.list_user_business_user = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
					/**
			 * 获取商家用户用户组
			 */
			async get_group_user_business_user() {
							this.form["business_user"] = this.$store.state.user.user_id;
							var json = await this.$get("~/api/user_group/get_obj?name=商家用户");
				if(json.result && json.result.obj){
					this.group_user_business_user = json.result.obj;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_session_business_user(id){
				var _this = this;
				var user_id = {"user_id":id}
				var url = "~/api/"+_this.group_user_business_user.source_table+"/get_obj?"
				this.$get(url, user_id, function(res) {
					if (res.result && res.result.obj) {
						var arr = []
						for (let key in res.result.obj) {
							arr.push(key)
						}
						var arrForm = []
									for (let key in _this.form) {
							arrForm.push(key)
						}
												_this.form["business_user"] = id
									_this.disabledObj['business_user' + '_isDisabled'] = true
						for (var i=0;i<arr.length;i++){
						  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
							for (var j = 0; j < arrForm.length; j++) {
							  if (arr[i] === arrForm[j]) {
								if (arr[i] !== "business_user") {
			                      _this.form[arrForm[j]] = res.result.obj[arr[i]]
			                      _this.disabledObj[arrForm[j] + '_isDisabled'] = true
								  break;
								} else {
								  _this.disabledObj[arrForm[j] + '_isDisabled'] = true
								}
							  }
							}
						  }
						}
					}
				});
			},
					get_user_business_user(id){
				var obj = this.list_user_business_user.getObj({"user_id":id});
				var ret = "";
				if(obj){
					if(obj.nickname){
						ret = obj.nickname;}
					else{
						ret = obj.username;
					}
				}
				return ret;
			},
				
	
						/**
			 * 上传定制声明内容
			 * @param {Object} param 文件参数
			 */
			upload_custom_statement_content(param){
									this.uploadFile(param.file, "custom_statement_content");
								},
					custom_statement_contentRemove() {
			  this.custom_statement_content_FileList = []
			  this.form.custom_statement_content = ""
			},
	
	
				
				/**
			 * 获取定制类型列表
			 */
			async get_list_custom_type() {
				var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					this.list_custom_type = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
					select_custom_type_field(v){
				this.$get('~/api/classification_information/get_obj?classification_name='+v,{},(res)=>{
					if(res.result && res.result.obj){
																																																																																																																																																																																										this.form.customized_price = res.result.obj.customized_price;
																																																				}else{
						console.error(res.error);
					}
				})
			},
					
				
				/**
			 * 获取定制要求列表
			 */
			async get_list_custom_requirements() {
				var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					this.list_custom_requirements = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
							select_custom_requirements_multiple(v){
									this.form.custom_requirements = "";
								if (v && v.length > 0) {
											this.form.custom_requirements = v.toString();
									}
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
														        if (this.form["product_production_date"] && JSON.stringify(this.form["product_production_date"]).indexOf("-")===-1){
          this.form["product_production_date"] = this.$toTime(parseInt(this.form["product_production_date"]),"yyyy-MM-dd")
        }
				        if (this.form["shelf_life_time"] && JSON.stringify(this.form["shelf_life_time"]).indexOf("-")===-1){
            this.form["shelf_life_time"] = this.$toTime(parseInt(this.form["shelf_life_time"]),"yyyy-MM-dd hh:mm:ss")
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

																																						if (json.result.obj.commodity_album){
					json.result.obj["commodity_album"] = JSON.parse(json.result.obj["commodity_album"])
					let commodity_album_arr = new Array();
					json.result.obj["commodity_album"].map((value, key) => {
						commodity_album_arr[key] = this.$fullUrl(value)
					})
					this.commodity_album_imgs = commodity_album_arr;
				}
															if(json.result.obj["product_production_date"]=="0000-00-00"){
				  json.result.obj["product_production_date"] = null;
				}
				if(parseInt(json.result.obj["product_production_date"]) > 9999){
					json.result.obj["product_production_date"] = this.$toTime(parseInt(json.result.obj["product_production_date"]),"yyyy-MM-dd")
				}
																		if(json.result.obj["shelf_life_time"]=="0000-00-00 00:00:00"){
				  json.result.obj["shelf_life_time"] = null;
				}
				if(parseInt(json.result.obj["shelf_life_time"]) > 9999){
					json.result.obj["shelf_life_time"] = this.$toTime(parseInt(json.result.obj["shelf_life_time"]),"yyyy-MM-dd hh:mm:ss")
				}
															this.custom_statement_content_FileList = []
				if (json.result.obj["custom_statement_content"]) {
				    this.custom_statement_content_FileList = [
				        {
				            url: this.$fullUrl(json.result.obj['custom_statement_content']),
				            name: json.result.obj['custom_statement_content'],
				        },
				    ];
				}
																				if (json.result.obj.custom_requirements){
					this.custom_requirements_multiple_value = json.result.obj.custom_requirements.split(",")
				}
																								
				if (json.result.obj["timing_end_time"] && JSON.stringify(json.result.obj["timing_end_time"]).indexOf("-")===-1) {
					json.result.obj["timing_end_time"] = this.$toTime(parseInt(json.result.obj["timing_end_time"]), "yyyy-MM-dd hh:mm:ss")
				}
				if (json.result.obj["timing_start_time"] && JSON.stringify(json.result.obj["timing_start_time"]).indexOf("-")===-1) {
					json.result.obj["timing_start_time"] = this.$toTime(parseInt(json.result.obj["timing_start_time"]), "yyyy-MM-dd hh:mm:ss")
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
																																								if(pm["commodity_album"]){
						pm["commodity_album"] = JSON.stringify(pm["commodity_album"]);
					}
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
																																																																													if (!param.product_production_date){
					return "产品生产日期不能为空";
				}
																												if (!param.shelf_life_time){
					return "保质时间不能为空";
				}
																																																																																		return null;
			},

			is_view(){
				// var bl = this.user_group == "管理员";
				var bl = false;

				if(!bl){
					bl = this.$check_action('/customized_products/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/customized_products/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/customized_products/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/customized_products/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/customized_products/view','get');
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
			/**
			 * 上传二维码
			 * @param {Object} param图片参数
			 */
			upload_qrcode(param){
				this.uploadFile(param.file, "qrcode_img");
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
								this.get_list_category_name();
															this.get_list_user_business_user();
					this.get_group_user_business_user();
											this.get_list_custom_type();
						this.get_list_custom_requirements();
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

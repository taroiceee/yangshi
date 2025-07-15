<template>
	<div class="diy_edit page_i_want_to_customize_it" id="i_want_to_customize_it_edit">
		<div class='warp'>
			<div class='container'>
				<div class='row diy_edit_content_box'>
						<div v-if="$check_field('set','order_number') || $check_field('add','order_number') || $check_field('get','order_number')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								订单号:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<div class="input-block" v-if="(form['order_number'] && $check_field('set','order_number')) || (!form['order_number'] && $check_field('add','order_number'))">
								<input type="text" id="form_order_number" v-model="form['order_number']" placeholder="请输入订单号" :disabled="true"/>
															</div>
							<span v-else-if="$check_field('get','order_number')">{{ form['order_number'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','commodity_number') || $check_field('add','commodity_number') || $check_field('get','commodity_number')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								商品编号:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<div class="input-block" v-if="(form['commodity_number'] && $check_field('set','commodity_number')) || (!form['commodity_number'] && $check_field('add','commodity_number'))">
								<input type="text" id="form_commodity_number" v-model="form['commodity_number']" placeholder="请输入商品编号" v-if="(form['commodity_number'] && $check_field('set','commodity_number')) || (!form['commodity_number'] && $check_field('add','commodity_number'))"  :disabled="disabledObj['commodity_number_isDisabled']"/>
															</div>
							<span v-else-if="$check_field('get','commodity_number')">{{ form['commodity_number'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','name_of_commodity') || $check_field('add','name_of_commodity') || $check_field('get','name_of_commodity')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								商品名称:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<div class="input-block" v-if="(form['name_of_commodity'] && $check_field('set','name_of_commodity')) || (!form['name_of_commodity'] && $check_field('add','name_of_commodity'))">
								<input type="text" id="form_name_of_commodity" v-model="form['name_of_commodity']" placeholder="请输入商品名称" v-if="(form['name_of_commodity'] && $check_field('set','name_of_commodity')) || (!form['name_of_commodity'] && $check_field('add','name_of_commodity'))"  :disabled="disabledObj['name_of_commodity_isDisabled']"/>
															</div>
							<span v-else-if="$check_field('get','name_of_commodity')">{{ form['name_of_commodity'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','category_name') || $check_field('add','category_name') || $check_field('get','category_name')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								分类名称:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<div class="input-block" v-if="(form['category_name'] && $check_field('set','category_name')) || (!form['category_name'] && $check_field('add','category_name'))">
								<input type="text" id="form_category_name" v-model="form['category_name']" placeholder="请输入分类名称" v-if="(form['category_name'] && $check_field('set','category_name')) || (!form['category_name'] && $check_field('add','category_name'))"  :disabled="disabledObj['category_name_isDisabled']"/>
															</div>
							<span v-else-if="$check_field('get','category_name')">{{ form['category_name'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','commodity_cover') || $check_field('add','commodity_cover') || $check_field('get','commodity_cover')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								商品封面:
							</span>
						</div>
								<!-- 图片 -->
						<input type="file" :disabled="disabledObj['commodity_cover_isDisabled']" style="display: none;" id="form_img_commodity_cover" title="commodity_cover" @change="change_file($event.target.files,'commodity_cover')"/>
						<!-- 修改权限 -->
						<div class="diy_field diy_img" v-if="form['commodity_cover'] && $check_field('set','commodity_cover')">
							<label for="form_img_commodity_cover">
								<img :src="$fullUrl(form['commodity_cover'])" />
							</label>
						</div>
						<!-- 添加权限 -->
						<div class="diy_field diy_img" v-else-if="!form['commodity_cover'] && $check_field('add','commodity_cover')">
							<label for="form_img_commodity_cover">
								<div class="btn_add_img">
									<span>+</span>
								</div>
							</label>
						</div>
						<!-- 查询权限 -->
						<div class="diy_field diy_img" v-else-if="$check_field('get','commodity_cover')">
							<img :src="$fullUrl(form['commodity_cover'])" />
						</div>
							</div>
							<div v-if="$check_field('set','production_date') || $check_field('add','production_date') || $check_field('get','production_date')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								生产日期:
							</span>
						</div>
								<!-- 日期 -->
						<div class="diy_field diy_date">
							<input type="date" :disabled="disabledObj['production_date_isDisabled']" id="form_production_date" v-model="form['production_date']" placeholder="请输入生产日期" v-if="(form['production_date'] && $check_field('set','production_date')) || (!form['production_date'] && $check_field('add','production_date'))"/>
							<span v-else-if="$check_field('get','production_date')">{{ form['production_date'] }}</span>
						</div>
							</div>
							<div v-if="$check_field('set','shelf_life_time') || $check_field('add','shelf_life_time') || $check_field('get','shelf_life_time')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								保质时间:
							</span>
						</div>
								<!-- 日长 -->
						<div class="diy_field diy_datetime">
							<input type="datetime-local" :disabled="disabledObj['shelf_life_time_isDisabled']" id="form_shelf_life_time" v-model="form['shelf_life_time']" placeholder="请输入保质时间" v-if="(form['shelf_life_time'] && $check_field('set','shelf_life_time')) || (!form['shelf_life_time'] && $check_field('add','shelf_life_time'))" />
							<span v-else-if="$check_field('get','shelf_life_time')">{{ form['shelf_life_time'] }}</span>
						</div>
							</div>
							<div v-if="$check_field('set','business_user') || $check_field('add','business_user') || $check_field('get','business_user')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								商家用户:
							</span>
						</div>
						<div class="diy_field diy_down">
							<select id="form_business_user" :disabled="disabledObj['business_user_isDisabled']" v-model="form['business_user']" v-if="(form['business_user'] && $check_field('set','business_user')) || (!form['business_user'] && $check_field('add','business_user'))" >
								<option v-for="o in list_user_business_user" :value="o['user_id']">
									{{o['nickname'] + '-' + o['username']}}
								</option>
							</select>
							<span v-else-if="$check_field('get','business_user')">{{ get_user_info("business_user", form['business_user']) }}</span>
						</div>
					</div>
							<div v-if="$check_field('set','customized_price') || $check_field('add','customized_price') || $check_field('get','customized_price')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								定制价格:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<div class="input-block" v-if="(form['customized_price'] && $check_field('set','customized_price')) || (!form['customized_price'] && $check_field('add','customized_price'))">
								<input type="text" id="form_customized_price" v-model="form['customized_price']" placeholder="请输入定制价格" v-if="(form['customized_price'] && $check_field('set','customized_price')) || (!form['customized_price'] && $check_field('add','customized_price'))"  :disabled="disabledObj['customized_price_isDisabled']"/>
															</div>
							<span v-else-if="$check_field('get','customized_price')">{{ form['customized_price'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','commodity_album') || $check_field('add','commodity_album') || $check_field('get','commodity_album')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								商品相册:
							</span>
						</div>
								<!-- 图集 -->
						<input type="file" :disabled="disabledObj['commodity_album_isDisabled']" style="display: none;" id="form_img_commodity_album" title="commodity_album" multiple="true" @change="change_file_multiple($event.target.files,'commodity_album')"/>
						<!-- 添加权限 -->
						<div class="diy_field diy_img diy_img_multiple" v-if="$check_field('add','commodity_album') || $check_field('set','commodity_album')">
							<label for="form_img_commodity_album">
								<div class="btn_add_img">
									<span>+</span>
								</div>
								<div v-for="(item, index) in form['commodity_album']" :key="index" >
									<img :src="$fullUrl(item)" />
									<span class="img_del" @click="delImg(index,'commodity_album')">x</span>
								</div>
							</label>
						</div>
						<!-- 修改权限 -->
						<div class="diy_field diy_img diy_img_multiple" v-else-if="form['commodity_album'] && $check_field('set','commodity_album')">
							<label for="form_img_commodity_album">
								<div v-for="(item, index) in form['commodity_album']" :key="index" >
									<img :src="$fullUrl(item)" />
									<span class="img_del" @click="delImg(index,'commodity_album')">x</span>
								</div>
							</label>
						</div>
						
						<!-- 查询权限 -->
						<div class="diy_field diy_img diy_img_multiple" v-else-if="$check_field('get','commodity_album')">
							<img :src="$fullUrl(item)" v-for="(item, index) in form['commodity_album']" :key="index" />
						</div>
							</div>
							<div v-if="$check_field('set','customized_commodity_quantity') || $check_field('add','customized_commodity_quantity') || $check_field('get','customized_commodity_quantity')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								定制商品数量:
							</span>
						</div>
								<!-- 数字 -->
						<div class="diy_field diy_number">
							<div class="input-block" v-if="(form['customized_commodity_quantity'] && $check_field('set','customized_commodity_quantity')) || (!form['customized_commodity_quantity'] && $check_field('add','customized_commodity_quantity'))">
								<input type="number" id="form_customized_commodity_quantity" v-model.number="form['customized_commodity_quantity']" placeholder="请输入定制商品数量" :disabled="disabledObj['customized_commodity_quantity_isDisabled']" />
															</div>
							<span v-else-if="$check_field('get','customized_commodity_quantity')">{{ form['customized_commodity_quantity'] }}</span>
						</div>
							</div>
							<div v-if="$check_field('set','total_price') || $check_field('add','total_price') || $check_field('get','total_price')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								总价格:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<div class="input-block" v-if="(form['total_price'] && $check_field('set','total_price')) || (!form['total_price'] && $check_field('add','total_price'))">
								<input type="text" id="form_total_price" v-model="form['total_price']" placeholder="请输入总价格"  @focus="set_total_price()" :disabled="disabledObj['total_price_isDisabled']"/>
															</div>
							<span v-else-if="$check_field('get','total_price')">{{ form['total_price'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','custom_user') || $check_field('add','custom_user') || $check_field('get','custom_user')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								定制用户:
							</span>
						</div>
						<div class="diy_field diy_down">
							<select id="form_custom_user" :disabled="disabledObj['custom_user_isDisabled']" v-model="form['custom_user']" v-if="(form['custom_user'] && $check_field('set','custom_user')) || (!form['custom_user'] && $check_field('add','custom_user'))" >
								<option v-for="o in list_user_custom_user" :value="o['user_id']">
									{{o['nickname'] + '-' + o['username']}}
								</option>
							</select>
							<span v-else-if="$check_field('get','custom_user')">{{ get_user_info("custom_user", form['custom_user']) }}</span>
						</div>
					</div>
							<div v-if="$check_field('set','user_name') || $check_field('add','user_name') || $check_field('get','user_name')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								用户姓名:
							</span>
						</div>
								<!-- 文本 -->
									<div class="diy_field diy_text">
							<div class="input-block" v-if="(form['user_name'] && $check_field('set','user_name')) || (!form['user_name'] && $check_field('add','user_name'))">
								<input type="text" id="form_user_name" v-model="form['user_name']" placeholder="请输入用户姓名" v-if="(form['user_name'] && $check_field('set','user_name')) || (!form['user_name'] && $check_field('add','user_name'))"  :disabled="disabledObj['user_name_isDisabled']"/>
															</div>
							<span v-else-if="$check_field('get','user_name')">{{ form['user_name'] }}</span>
						</div>
										</div>
							<div v-if="$check_field('set','delivery_date') || $check_field('add','delivery_date') || $check_field('get','delivery_date')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								交付日期:
							</span>
						</div>
								<!-- 日期 -->
						<div class="diy_field diy_date">
							<el-date-picker :disabled="disabledObj['delivery_date_isDisabled']" v-if="(form['delivery_date'] && $check_field('set','delivery_date')) || (!form['delivery_date'] && $check_field('add','delivery_date'))" id="form_delivery_date"
								v-model="form['delivery_date']" type="date" placeholder="选择日期" :picker-options="delivery_date_disableOptions" @change="delivery_dateDateChange">
							</el-date-picker>
							<span v-else-if="$check_field('get','delivery_date')">{{ form['delivery_date'] }}</span>
						</div>
							</div>
							<div v-if="$check_field('set','custom_audio') || $check_field('add','custom_audio') || $check_field('get','custom_audio')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								定制音频:
							</span>
						</div>
								<!-- 音频 -->
						<div class="diy_field diy_music">
							<input type="file" id="form_music_custom_audio" title="custom_audio" @change="change_file($event.target.files,'custom_audio')" v-if="(form['custom_audio'] && $check_field('set','custom_audio')) || (!form['custom_audio'] && $check_field('add','custom_audio'))" />
							<router-link :to="'/media/music?url=' + form['custom_audio']" v-else-if="$check_field('get','custom_audio')">聆听音频</router-link>
						</div>
							</div>
							<div v-if="$check_field('set','custom_video') || $check_field('add','custom_video') || $check_field('get','custom_video')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								定制视频:
							</span>
						</div>
								<!-- 视频 -->
						<div class="diy_field diy_video">
							<input type="file" id="form_video_custom_video" title="custom_video" @change="change_file($event.target.files,'custom_video')" v-if="(form['custom_video'] && $check_field('set','custom_video')) || (!form['custom_video'] && $check_field('add','custom_video'))" />
							<router-link :to="'/media/video?url=' + form['custom_video']" v-else-if="$check_field('get','custom_video')">查看视频</router-link>
						</div>
							</div>
							<div v-if="$check_field('set','customized_accessories') || $check_field('add','customized_accessories') || $check_field('get','customized_accessories')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								定制附件:
							</span>
						</div>
								<!-- 文件 -->
						<input type="file" style="display: none;" id="form_file_customized_accessories" title="customized_accessories" @change="change_file($event.target.files,'customized_accessories')"/>
						<!-- 修改权限 -->
						<div class="diy_field diy_img" v-if="form['customized_accessories'] && $check_field('set','customized_accessories')">
							<label for="form_file_customized_accessories">
								<!--<span>{{form['customized_accessories']}} </span>-->
								<a :href="$fullUrl(form['customized_accessories'])" target="_blank" style="color: rgb(64, 158, 255);">点击下载</a>
							</label>
						</div>
						<!-- 添加权限 -->
						<div class="diy_field diy_img" v-else-if="!form['customized_accessories'] && $check_field('add','customized_accessories')">
							<label for="form_file_customized_accessories">
								<div class="btn_add_img">
									<span>+</span>
								</div>
							</label>
						</div>
						<!-- 查询权限 -->
						<div class="diy_field diy_img" v-else-if="$check_field('get','customized_accessories')">
							<span>{{form['customized_accessories']}} </span>
						</div>
							</div>
							<div v-if="$check_field('set','custom_picture') || $check_field('add','custom_picture') || $check_field('get','custom_picture')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								定制图片:
							</span>
						</div>
								<!-- 图集 -->
						<input type="file" :disabled="disabledObj['custom_picture_isDisabled']" style="display: none;" id="form_img_custom_picture" title="custom_picture" multiple="true" @change="change_file_multiple($event.target.files,'custom_picture')"/>
						<!-- 添加权限 -->
						<div class="diy_field diy_img diy_img_multiple" v-if="$check_field('add','custom_picture') || $check_field('set','custom_picture')">
							<label for="form_img_custom_picture">
								<div class="btn_add_img">
									<span>+</span>
								</div>
								<div v-for="(item, index) in form['custom_picture']" :key="index" >
									<img :src="$fullUrl(item)" />
									<span class="img_del" @click="delImg(index,'custom_picture')">x</span>
								</div>
							</label>
						</div>
						<!-- 修改权限 -->
						<div class="diy_field diy_img diy_img_multiple" v-else-if="form['custom_picture'] && $check_field('set','custom_picture')">
							<label for="form_img_custom_picture">
								<div v-for="(item, index) in form['custom_picture']" :key="index" >
									<img :src="$fullUrl(item)" />
									<span class="img_del" @click="delImg(index,'custom_picture')">x</span>
								</div>
							</label>
						</div>
						
						<!-- 查询权限 -->
						<div class="diy_field diy_img diy_img_multiple" v-else-if="$check_field('get','custom_picture')">
							<img :src="$fullUrl(item)" v-for="(item, index) in form['custom_picture']" :key="index" />
						</div>
							</div>
							<div v-if="$check_field('set','regional_location') || $check_field('add','regional_location') || $check_field('get','regional_location')" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								地区位置:
							</span>
						</div>
								<div class="diy_field diy_region">
							<div v-if="$check_field('set', 'regional_location') || $check_field('add', 'regional_location')">
								<select v-model="selected_regional_location_Province" @change="handle_regional_location_ProvinceChange" :disabled="disabledObj['regional_location_isDisabled']">
									<option value="">请选择省份</option>
									<option v-for="province in provinces" :key="province.code" :value="province">
										{{ province.name }}
									</option>
								</select>
								<select v-model="selected_regional_location_City" @change="handle_regional_location_CityChange" :disabled="disabledObj['regional_location_isDisabled'] || !selected_regional_location_Province">
									<option value="">请选择城市</option>
									<option v-for="city in cities" :key="city.code" :value="city">
										{{ city.name }}
									</option>
								</select>
								<select v-model="selected_regional_location_District" @change="handle_regional_location_DistrictChange" :disabled="disabledObj['regional_location_isDisabled'] || !selected_regional_location_City">
									<option value="">请选择区县</option>
									<option v-for="district in districts" :key="district.code" :value="district">
										{{ district.name }}
									</option>
								</select>
							</div>
							<span v-else-if="$check_field('get', 'regional_location')">
								{{ form["regional_location"] }}
							</span>
						</div>
							</div>
	


					<div v-if="$check_examine()" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								审核状态:
							</span>
						</div>
						<div class="diy_field diy_select" v-if="$check_action('/i_want_to_customize_it/edit','examine')">
							<!--<span> {{ form['examine_state'] }} </span>-->
							<select v-model="form['examine_state']">
								<option value="未审核">
									未审核
								</option>
								<option value="已通过">
									已通过
								</option>
								<option value="未通过">
									未通过
								</option>
							</select>
						</div>
						<div class="diy_field diy_text" v-else>
							<span>
								{{ form['examine_state'] }}
							</span>
						</div>
					</div>
					<div v-if="$check_examine()" class="form-item col-12 col-md-6">
						<div class="diy_title">
							<span>
								审核回复:
							</span>
						</div>
						<div class="diy_field diy_desc" v-if="$check_action('/i_want_to_customize_it/edit','examine')">
							<textarea v-model="form['examine_reply']"></textarea>
						</div>
						<div class="diy_field diy_text" v-else>
							<span>
								{{ form['examine_reply'] }}
							</span>
						</div>
					</div>


					<!-- 座位 -->
					<div class="form-item selected_seat_box col-12 col-md-6">
						<div class="seat-wrapper">
						  <div class="illustration">
							<div class="illustration-img-wrapper unselected-seat"></div>
							<span class="illustration-text">可选</span>
							<div class="illustration-img-wrapper selected-seat"></div>
							<span class="illustration-text">已选</span>
							<div class="illustration-img-wrapper bought-seat"></div>
							<span class="illustration-text">不可选</span>
							<div class="btn-buy" @click="buySeat">选定座位</div>
						  </div>
						  <div class="inner-seat-wrapper" ref="innerSeatWrapper">
							<div v-for="row in seatRow" :key="row">
							  <!--这里的v-if很重要，如果没有则会导致报错，因为seatArray初始状态为空-->
							  <div
								v-for="col in seatCol"
								v-if="seatArray.length > 0"
								class="seat"
								:style="{ width: seatSize + 'px', height: seatSize + 'px' }"
							  >
								<div
								  class="inner-seat"
								  @click="handleChooseSeat(row - 1, col - 1)"
								  v-if="seatArray[row - 1][col - 1] !== -1"
								  :class="
									seatArray[row - 1][col - 1] === 2
									  ? 'bought-seat'
									  : seatArray[row - 1][col - 1] === 1
									  ? 'selected-seat'
									  : 'unselected-seat'
								  "
								></div>
							  </div>
							</div>
						  </div>
						</div>
					</div>
				</div>
				<div class="diy_edit_submit_box row">
					<div class="col-12">
						<div class="btn_box">
							<button class="btn_submit" @click="openPayModal()">提交</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="支付" :visible.sync="payModalVisible" width="500px">
			<el-tabs v-model="pay_obj.payActiveName" :stretch="true">
				<el-tab-pane label="微信" name="微信">
					<div style="width: 80%; margin: 0 auto">
						<div style="width: 60%; margin: 30px auto">
							<el-image style="width: 100%" :src="require('../../../public/wx.png')" :preview-src-list="[require('../../../public/wx.png')]">
								<div slot="error" class="image-slot">
									<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
								</div>
							</el-image>
						</div>
						<div style="width: 80%; margin: 0 auto">
							<div class="not-pay" @click="submit_pay('notPay')">暂不支付</div>
							<div class="confirm-pay" @click="submit_pay('pay')">确认支付</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="支付宝" name="支付宝">
					<div style="width: 80%; margin: 0 auto">
						<div style="width: 60%; margin: 30px auto">
							<el-image style="width: 100%" :src="require('../../../public/alipay.png')" :preview-src-list="[require('../../../public/alipay.png')]">
								<div slot="error" class="image-slot">
									<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
								</div>
							</el-image>
						</div>
						<div style="width: 80%; margin: 0 auto">
							<div class="not-pay" @click="submit_pay('notPay')">暂不支付</div>
							<div class="confirm-pay" @click="submit_pay('pay')">确认支付</div>
						</div>
				  </div>
				</el-tab-pane>
				<el-tab-pane label="网银" name="网银">
					<div style="width: 80%; margin: 0 auto; margin-top: 30px">
						<div style="width: 80%; margin: 0 auto">
							<div style="line-height: 40px">请输入网银账号：</div>
						</div>
						<div style="width: 80%; margin: 0 auto">
							<el-input v-model="pay_obj.account" placeholder="请输入网银账号"></el-input>
						</div>
					</div>
					<div style="width: 80%; margin: 0 auto; margin-top: 20px">
						<div style="width: 80%; margin: 0 auto">
							<div style="line-height: 40px">请输入支付密码，6位数字：</div>
						</div>
						<div style="width: 80%; margin: 0 auto">
							<el-input placeholder="请输入密码" v-model="pay_obj.password" show-password maxlength="6"></el-input>
						</div>
					</div>
					<div style="width: 80%; margin: 0 auto; margin-top: 40px">
						<div class="not-pay" @click="submit_pay('notPay')">暂不支付</div>
						<div class="confirm-pay" @click="submit_pay('pay')">确认支付</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
	</div>
</template>

<script>
	import mixin from "@/mixins/page.js";
                                        	import pcaData from '@/assets/json/pca-code.json';
  	export default {
		mixins: [mixin],
		components: {},
		data() {
			return {
				url_get_obj: "~/api/i_want_to_customize_it/get_obj?",
				url_add: "~/api/i_want_to_customize_it/add?",
				url_set: "~/api/i_want_to_customize_it/set?",
																								pcaData: pcaData,
				provinces: [],
				cities: [],
				districts: [],
				selected_regional_location_Province: '',
				selected_regional_location_City: '',
				selected_regional_location_District: '',
					payModalVisible: false,
				pay_obj: {
					payActiveName: "微信",
					account: "",
					password: "",
					id: "",
				},
				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},

				// 查询条件
				query: {
						"order_number": "",
							"commodity_number": "",
							"name_of_commodity": "",
							"category_name": "",
							"commodity_cover": "",
							"production_date": "",
							"shelf_life_time": "",
							"business_user": 0,
							"customized_price": "",
							"commodity_album": "",
							"customized_commodity_quantity": 0,
							"total_price": "",
							"custom_user": 0,
							"user_name": "",
							"delivery_date": "",
							"custom_audio": "",
							"custom_video": "",
							"customized_accessories": "",
							"custom_picture": "",
							"regional_location": "",
						"i_want_to_customize_it_id": 0,
					"seat": "", // 座位
				},

				obj: {
						"order_number": this.$get_stamp(), // 订单号
							"commodity_number":  '', // 商品编号
							"name_of_commodity":  '', // 商品名称
							"category_name":  '', // 分类名称
							"commodity_cover":  '', // 商品封面
							"production_date": new Date().getTime(),
							"shelf_life_time": new Date().getTime(),
							"business_user": 0, // 商家用户
							"customized_price":  '', // 定制价格
							"commodity_album": [],
							"customized_commodity_quantity":  0, // 定制商品数量
							"total_price":  '', // 总价格
							"custom_user": 0, // 定制用户
							"user_name":  '', // 用户姓名
							"delivery_date": new Date().getTime(),
							"custom_audio":  '', // 定制音频
							"custom_video":  '', // 定制视频
							"customized_accessories":  '', // 定制附件
							"custom_picture": [],
							"regional_location":  '', // 地区位置
						"examine_state": "未审核",
					"examine_reply": "",
					"i_want_to_customize_it_id": 0,
					"seat": "", // 座位
				},

				// 表单字段
				form: {
						"order_number": this.$get_stamp(), // 订单号
							"commodity_number":  '', // 商品编号
							"name_of_commodity":  '', // 商品名称
							"category_name":  '', // 分类名称
							"commodity_cover":  '', // 商品封面
							"production_date": new Date().getTime(),
							"shelf_life_time": new Date().getTime(),
							"business_user": 0, // 商家用户
							"customized_price":  '', // 定制价格
							"commodity_album":  '', // 商品相册
							"customized_commodity_quantity":  0, // 定制商品数量
							"total_price":  '', // 总价格
							"custom_user": 0, // 定制用户
							"user_name":  '', // 用户姓名
							"delivery_date": new Date().getTime(),
							"custom_audio":  '', // 定制音频
							"custom_video":  '', // 定制视频
							"customized_accessories":  '', // 定制附件
							"custom_picture":  '', // 定制图片
							"regional_location":  '', // 地区位置
						"examine_state": "未审核",
					"examine_reply": "",
					"i_want_to_customize_it_id": 0,
					"seat": "", // 座位
				},
				disabledObj:{
						"order_number_isDisabled": false,
							"commodity_number_isDisabled": false,
							"name_of_commodity_isDisabled": false,
							"category_name_isDisabled": false,
							"commodity_cover_isDisabled": false,
							"production_date_isDisabled": false,
							"shelf_life_time_isDisabled": false,
							"business_user_isDisabled": false,
							"customized_price_isDisabled": false,
							"commodity_album_isDisabled": false,
									"total_price_isDisabled": false,
							"custom_user_isDisabled": false,
							"user_name_isDisabled": false,
							"delivery_date_isDisabled": false,
							"custom_audio_isDisabled": false,
							"custom_video_isDisabled": false,
							"customized_accessories_isDisabled": false,
							"custom_picture_isDisabled": false,
							"regional_location_isDisabled": false,
					},

																											// 用户列表
				list_user_business_user: [],
																				// 用户列表
				list_user_custom_user: [],
												delivery_date_disableOptions: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					},
				},
																
				// ID字段
				field: "i_want_to_customize_it_id",

				//影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
				seatArray: [],
				//影院座位行数
				seatRow: 5,
				//影院座位列数
				seatCol: 8,
				//座位尺寸
				seatSize: "",
				seatArr: [],
				list_: [],
				seatList: "",
			}
		},
		methods: {
																							initializeProvinces() {
			  this.provinces = this.pcaData;
			},
			handle_regional_location_ProvinceChange() {
			  this.cities = this.selected_regional_location_Province.children || [];
			  this.selected_regional_location_City = '';
			  this.selected_regional_location_District = '';
			  this.update_regional_location_Region();
			},
			handle_regional_location_CityChange() {
			  this.districts = this.selected_regional_location_City.children || [];
			  this.selected_regional_location_District = '';
			  this.update_regional_location_Region();
			},
			handle_regional_location_DistrictChange() {
			  this.update_regional_location_Region();
			},
			update_regional_location_Region() {
			  if (this.selected_regional_location_District) {
				this.form.regional_location = this.selected_regional_location_Province.name + '/' + this.selected_regional_location_City.name + '/' + this.selected_regional_location_District.name;
			  } else if (this.selected_regional_location_City) {
				this.form.regional_location = this.selected_regional_location_Province.name + '/' + this.selected_regional_location_City.name;
			  } else if (this.selected_regional_location_Province) {
				this.form.regional_location = this.selected_regional_location_Province.name;
			  } else {
				this.form.regional_location = '';
			  }
			},
																																																																																																																														 delivery_dateDateChange(value) {
			      if (value) {
			        // 转换为只有日期的值
			        this.form.delivery_date = this.formatDateValue(value);
			      }
			    },
			    
																																															formatDateValue(value) {
		  const date = new Date(value);
		  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
		},
		async openPayModal(){
			this.payModalVisible = true
			let param = this.form;
			var pm = this.events("submit_before", Object.assign({}, param)) || param;
			var msg = await this.events("submit_check", pm);
			if (msg) {
				this.$toast(msg, 'danger');
				this.payModalVisible = false
			} else {
																																																						if(pm["commodity_album"]){
					pm["commodity_album"] = JSON.stringify(pm["commodity_album"]);
				}
																																																				if(pm["custom_picture"]){
					pm["custom_picture"] = JSON.stringify(pm["custom_picture"]);
				}
														this.$post("~/api/i_want_to_customize_it/add", pm, (res) => {
					if (res.result) {
						this.$get("~/api/i_want_to_customize_it/get_list", { pay_state: "未支付", orderby: "create_time desc" },(json) => {
							if (json.result && json.result.list) {
								this.pay_obj.id = json.result.list[0].i_want_to_customize_it_id;
								}
						});
						
					} else if (res.error) {
						console.error(res.error);
					}
				});
			}
		},
		  
		submit_pay(payTyep){
			if (payTyep == "pay") {
				let param = {
					pay_state: '已支付',
						pay_type: this.pay_obj.payActiveName,
					}
				// 更新支付状态
				this.$post("~/api/i_want_to_customize_it/set?i_want_to_customize_it_id="+this.pay_obj.id, param, (res) => {
					this.payModalVisible = false;
					history.back()
				})
			}else{
				history.back()
			}
		},
		async submit(param, func){
			if (!param) {
				param = this.form;
			}
						var pm = this.events("submit_before", Object.assign({}, param)) || param;
			var msg = await this.events("submit_check", pm);
			var ret;
			if (msg) {
				this.$toast(msg, 'danger');
			} else {
																																	if(pm["commodity_album"]){
				pm["commodity_album"] = JSON.stringify(pm["commodity_album"]);
			}
																																if(pm["custom_picture"]){
				pm["custom_picture"] = JSON.stringify(pm["custom_picture"]);
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
      																												if (!param.production_date){
			return "生产日期不能为空";
		}
								if (!param.shelf_life_time){
			return "保质时间不能为空";
		}
																																											if (!param.delivery_date){
			return "交付日期不能为空";
		}
																														        return null;
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
		
				
				
				
				
									set_total_price(){
				this.form.total_price = parseFloat(this.form.customized_price) * parseFloat(this.form.购买数量)
        let r = /^\+?[1-9][0-9]*$/; // 正整数
        if(!r.test(this.form.total_price) ){
          this.form.total_price = this.form.total_price.toFixed(2);
        }
			},
							// 自动计算精度处理
		toFixed: function(num){
			if (!isNaN(num)) {
				return ((num + '').indexOf('.') == -1) ? num : num.toFixed(2);
			}
		},
						/**
			 * 获取注册用户用户列表
			 */
			async get_list_user_custom_user() {
				var json = await this.$get("~/api/user/get_list?user_group=注册用户");
				if(json.result && json.result.list){
					this.list_user_custom_user = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
					async get_user_session_custom_user(){
				var _this = this;
				var json = await this.$get("~/api/user_group/get_obj?name=注册用户");
				if(json.result && json.result.obj){
					var source_table = json.result.obj.source_table;
					var user_id = _this.$store.state.user.user_id;
					if (user_id){
						var url = "~/api/"+source_table+"/get_obj?"
						this.$get(url, {"user_id":_this.$store.state.user.user_id}, function(res) {
							if (res.result && res.result.obj) {
								var arr = []
								for (let key in res.result.obj) {
									arr.push(key)
								}
								var arrForm = []
								for (let key in _this.form) {
									arrForm.push(key)
								}
								_this.form["custom_user"] = user_id
								_this.disabledObj['custom_user' + '_isDisabled'] = true
								for (var i=0;i<arr.length;i++){
                  if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                    for (var j = 0; j < arrForm.length; j++) {
                      if (arr[i] === arrForm[j]) {
                        if (arr[i] !== "custom_user") {
                          _this.form[arrForm[j]] = res.result.obj[arr[i]]
                          _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                          break;
                        }
                      }
                    }
                  }
								}
							}
						});
					}
				}
				else if(json.error){
					console.error(json.error);
				}
			},
	
				
				
				
				
				
				
				
		  		get_user_info(name,id){
				var obj = null;
                				  if (name == 'business_user'){
					  obj = this.list_user_business_user.getObj({"user_id":id});
				  }
            				  if (name == 'custom_user'){
					  obj = this.list_user_custom_user.getObj({"user_id":id});
				  }
                				var ret = "";
				if(obj){
				  ret = obj.nickname+"-"+obj.username;
				}
				return ret;
			},
			/**
			 * 修改文件
			 * @param { Object } files 上传文件对象
			 * @param { String } str 表单的属性名
			 */
			change_file(files, str) {
				var form = new FormData();
				form.append("file", files[0]);
				this.$post("~/api/i_want_to_customize_it/upload?", form, (res) => {
					if (res.result) {
						this.form[str] = res.result.url;
					} else if (res.error) {
						this.$toast(res.error.message);
					}
				});
			},
			
			/**
			 * 修改文件
			 * @param { Object } files 上传文件对象
			 * @param { String } str 表单的属性名
			 */
			change_file_multiple(files, str) {
				let _this = this;
				var form = new FormData();
				for (var i = 0; i < files.length; i++) {
					form.set("file", files[i]);
					_this.$post("~/api/i_want_to_customize_it/upload?", form, (res) => {
						if (res.result) {
							if (_this.form[str].length > 0) {
								_this.form[str].push(res.result.url);
							} else {
								_this.form[str] = [res.result.url];
							}
						} else if (res.error) {
							_this.$toast(res.error.message);
						}
					});
				}
			},

			/**
			 * 获取对象后获取缓存表单
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_before(param){
				var form = $.db.get("form");
				// if (form) {
        //   delete(form.examine_state)
        //   delete(form.examine_reply)
        //   this.obj = $.push(this.obj ,form);
				// 	this.form = $.push(this.form ,form);
				// }
				// var arr = []
				// for (let key in form) {
				// 	arr.push(key)
				// }
				// for (var i=0;i<arr.length;i++){
				// 	this.disabledObj[arr[i] + '_isDisabled'] = true
				// }
        if (form) {
          var arr = []
          for (let key in form) {
            arr.push(key)
          }
          var arrForm = []
          for (let key in this.form) {
            arrForm.push(key)
          }
          for (var i=0;i<arr.length;i++){
            if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
              for (var j = 0; j < arrForm.length; j++) {
                if (arrForm[j] === arr[i]) {
                  this.form[arrForm[j]] = form[arr[i]]
                  this.obj[arrForm[j]] = form[arr[i]]
                  this.disabledObj[arrForm[j] + '_isDisabled'] = true
                  break;
                }
              }
			  if(arr[i] === "source_table"){
			  	this.form['source_table'] = form[arr[i]]
			  }
			  if(arr[i] === "source_id"){
			  	this.form['source_id'] = form[arr[i]]
			  }
			  if(arr[i] === "source_user_id"){
			  	this.form['source_user_id'] = form[arr[i]]
			  }
            }
          }
        }
																	        if (this.form["production_date"] && JSON.stringify(this.form["production_date"]).indexOf("-")===-1) {
          this.form["production_date"] = this.$toTime(parseInt(this.form["production_date"]), "yyyy-MM-dd")
        }
			        if (this.form["shelf_life_time"] && JSON.stringify(this.form["shelf_life_time"]).indexOf("-")===-1) {
          this.form["shelf_life_time"] = this.$toTime(parseInt(this.form["shelf_life_time"]), "yyyy-MM-ddThh:mm")
        }
														if (this.form["commodity_album"]) {
		  this.form["commodity_album"] = JSON.parse(this.form["commodity_album"])
		}
															        if (this.form["delivery_date"] && JSON.stringify(this.form["delivery_date"]).indexOf("-")===-1) {
          this.form["delivery_date"] = this.$toTime(parseInt(this.form["delivery_date"]), "yyyy-MM-dd")
        }
																if (this.form["custom_picture"]) {
		  this.form["custom_picture"] = JSON.parse(this.form["custom_picture"])
		}
				
        $.db.del("form");
				this.get_list();
				return param;
			},

			/**
			 * 获取对象后获取缓存表单
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json ,func){
				// var form = $.db.get("form");
				// var obj = Object.assign({} ,form ,this.obj);
				// if (obj) {
        //   delete(obj.examine_state)
        //   delete(obj.examine_reply)
				// 	this.obj = $.push(this.obj ,obj);
				// }
				// if (form) {
        //   delete(form.examine_state)
        //   delete(form.examine_reply)
				// 	this.form = $.push(this.form ,form);
				// }

				if(func){
					func(json);
				}
			},

			// 选座
			//选定且购买座位
			buySeat: function () {
			  //遍历seatArray，将值为1的座位变为2
			  let oldArray = this.seatArray.slice();
			  for (let i = 0; i < this.seatRow; i++) {
				for (let j = 0; j < this.seatCol; j++) {
				  if (oldArray[i][j] === 1) {
					oldArray[i][j] = 2;
				  }
				}
			  }
			  this.seatArray = oldArray;
			  let string = "";
			  for (let x = 0; x < oldArray.length; x++) {
				let array = oldArray[x];
				for (let j = 0; j < array.length; j++) {
				  if (oldArray[x][j] === 2) {
					if (string == "") {
					  string = "" + (x * 8 + j);
					} else {
					  string = string + "," + (x * 8 + j);
					}
				  }
				}
			  }
			  // 对比判断哪些是新增的座位
			  let seat = this.obj.seat;
			  let seatB = "";
			  if (string != "" && string != null) {
				let stringList = string.split(",");
				let seatList = this.seatList;
				if (seatList.length != 0) {
				  let seatListArr = seatList.split(",");
				  for (let v = 0; v < stringList.length; v++) {
					if (
					  seatListArr.indexOf(stringList[v]) == -1 &&
					  seat.indexOf(stringList[v]) == -1
					) {
					  if (seat == "" || seat == null) {
						seat = stringList[v] + "";
						seatB = seat;
					  } else {
						if (seat.indexOf(stringList[v]) == -1) {
						  seat = seat + "," + stringList[v];
						  if (seatB == "" || seatB == null) {
							seatB = stringList[v];
						  } else {
							seatB = seatB + "," + stringList[v];
						  }
						}
					  }
					}
				  }
				} else {
				  seat = string;
				}
			  }

			  if (this.form.seat == "") {
				this.form.seat = seat;
			  } else {
				if (seatB != "") {
				  this.form.seat = this.form.seat + "," + seatB;
				}
			  }
			  this.seatList = string;

			},
			//处理座位选择逻辑
			handleChooseSeat: function (row, col) {
			  let seatValue = this.seatArray[row][col];
			  let newArray = this.seatArray;
			  //如果是已购座位，直接返回
			  if (seatValue === 2) return;
			  //如果是已选座位点击后变未选
			  if (seatValue === 1) {
				newArray[row][col] = 0;
			  } else if (seatValue === 0) {
				newArray[row][col] = 1;
			  }
			  //必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
			  this.seatArray = newArray.slice();
			},
			/**
			 * 获取所有坐座位信息
			 */
			async get_list() {
			  var json = await this.$get("~/api/i_want_to_customize_it/get_list"
			  			  );
			  if (json.result && json.result.list) {
				this.list_ = json.result.list;
			  } else if (json.error) {
				console.error(json.error);
			  }
			  console.log(json);
			  let list = json.result.list;
			  if (list != null && list.length != 0) {
				let seatArr = "";
				for (let j = 0; j < list.length; j++) {
				  let seat = list[j].seat;
				  if (seat != null && seat != "") {
					if (seatArr == "") {
					  seatArr = seat + "";
					} else {
					  seatArr = seatArr + "," + seat;
					}
				  }
				}
				this.seatList = seatArr;
			  }
			  this.initSeatArray(5, 8);
			},

			//初始座位数组
			initSeatArray: function () {
			  let seatList = this.seatList;
			  let seatArr = seatList.split(",");
			  if (seatList == "" || seatList == null) {
				seatArr = [];
			  }
			  this.seatArr = seatArr;

			  let seatArray = Array(this.seatRow)
				.fill(0)
				.map(() => Array(this.seatCol).fill(0));
			  this.seatArray = seatArray;
			  for (let j = 0; j < seatArr.length; j++) {
				let i = Math.floor(seatArr[j] / 8);
				let x = seatArr[j] % 8;
				seatArray[i][x] = 2;
			  }
			  this.seatSize = this.$refs.innerSeatWrapper
				? parseInt(
					parseInt(
					  window.getComputedStyle(this.$refs.innerSeatWrapper).width,
					  10
					) / this.seatCol,
					10
				  )
				: 0;
			},
		},
		created() {
																																		this.get_list_user_business_user();
																							this.get_user_session_custom_user();
					this.get_list_user_custom_user();
																																	this.initializeProvinces();
				},
	}
</script>

<style>
	.diy_compute{
		line-height: 40px;
	}
	.diy_field.diy_img_multiple{
		margin: 0;
	}
	.diy_field.diy_img_multiple div{
		float: left;
		position: relative;
		margin: 0 10px 10px 0;
	}
	.diy_field.diy_img_multiple img{
		height: 100px;
		width: auto;
	}
	.diy_field.diy_img_multiple span{
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

	.seat-wrapper {
	  margin-top: 20px;
	  height: 370px;
	  width: 500px;
	  border: 1px dotted #c5c5c5;
	  /* margin: 0 auto; */
	  position: relative;
	  overflow: hidden;
	}

	.inner-seat-wrapper {
	  position: absolute;
	  bottom: 0;
	  width: 100%;
	  box-sizing: border-box;
	}
	.seat {
	  float: left;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.inner-seat {
	  width: 80%;
	  height: 80%;
	  cursor: pointer;
	}


	.btn-wrapper {
	  margin: 20px auto;
	  width: 1000px;
	  height: 30px;
	  text-align: center;
	}
	.btn-buy {
	  height: 100%;
	  line-height: 35px;
	  font-size: 15px;
	  border-radius: 5px;
	  padding: 0 5px;
	  background-color: #ffa349;
	  color: #ffffff;
	  display: inline-block;
	  cursor: pointer;
	  margin: 5px;
	}

	.illustration {
	  position: absolute;
	  left: 10px;
	  top: 20px;
	  height: 35px;
	  width: 300px;
	}
	.illustration-img-wrapper {
	  width: 25px;
	  height: 25px;
	  position: relative;
	  top: 50%;
	  display: inline-block;
	  transform: translateY(-50%);
	  margin-left: 10px;
	}
	.illustration-text {
	  display: inline-block;
	  height: 100%;
	  line-height: 35px;
	  font-size: 14px;
	  position: relative;
	  top: -2px;
	}


	    .selected-seat {
		background: url("../../../public/img/selected2.png") center center no-repeat;
		background-size: 100% 100%;
		}

		.unselected-seat {
		background: url("../../../public/img/unselected2.png") center center no-repeat;
		background-size: 100% 100%;
		}

		.bought-seat {
		background: url("../../../public/img/bought2.png") center center no-repeat;
		background-size: 100% 100%;
		}

.not-pay{
	width: 100%;
	background-color: #409eff;
	color: white;
	font-size: 14px;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	margin-bottom: 10px;
}
.confirm-pay{
	width: 100%;
	background-color: #409eff;
	color: white;
	font-size: 14px;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
}
.input-block{
    display: flex;
    align-items: center;
}
.input-block .units{
    font-size: 14px;
    color: #666;
}
</style>

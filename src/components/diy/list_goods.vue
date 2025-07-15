<template>
	<div class="list_goods list list-x goods_c">
							<div class="goods" v-for="(o, i) in productList" :key="i" @click="goodsClickFn('/goods/details?' + vm.goods_id + '=' + o[vm.goods_id], o)">
															<router-link to="">
				<div class="media">
					<div class="icon h-100">
						<img :src="$fullUrl(o[vm.img])" style="width:100%;height:100%" v-default-img="'../../../public/img/default.png'" />
					</div>
				</div>
			</router-link>
			<div class="doc">
				<router-link to="">
					<div class="title">{{ o[vm.title] }}</div>
				</router-link>
				<div class="bottom">
					<div>
							<span class="price">￥{{ o[vm.price] }}</span>
							<span v-if="o[vm.integral]!=null && o[vm.integral]!= 0" class="price">/{{o[vm.integral]}}积分</span>
					</div>
					<span class="price_ago">￥{{ o[vm.price_ago] }}</span>
								<span class="score" v-if="$check_option('/fresh_goods/details', 'can_show_score')">
				<el-rate v-model="o.score" disabled :max="5" :show-score="true"></el-rate>
			</span>
																	<b-icon class="icon_cart" icon="cart"  v-if="!o[vm.source_table]||$check_cart_page('/'+o[vm.source_table]+'/list')" @click="add_cart(o)" />
				</div>
			</div>
								<div class="checkbox-container" v-if="vs">
				<el-checkbox size="small" v-model="o.checked" @click.stop.native="()=>{}" @change="handleChecked(o, $event)" border>对比</el-checkbox>
			</div>
														</div>
	</div>
</template>

<script>
	export default {
		props: {
			url: {
				type: String,
				default: "/pages/goods/details?goods_id=",
			},
			list: {
				type: Array,
				default: function() {
					return [];
				},
			},
			vm: {
				type: Object,
				default: function() {
					return {
						goods_id: "goods_id",
						img: "img",
						title: "title",
						price: "price",
						integral: "integral",
						price_ago: "price_ago",
						source_table:"source_table"
					};
				},
			},
								goods: {
				type: Array,
				default: function () {
					return [];
				},
			},
			vs: {
				type: Boolean,
				default: false
			}
														},
		data() {
			return {
				user_id: this.$store.state.user.user_id,
				productList: [],
			};
		},
		methods: {
			/**
			 * 添加购物车
			 */
			add_cart(obj) {
			    var {
			        title,
			        img,
			        price,
			        price_ago,
			        num_buy: num,
			        description,
			        goods_id,
			        type,
			    } = obj;
			    var body = {
			        title,
			        img,
			        price,
			        price_ago,
			        num,
			        price_count: price,
			        description,
			        goods_id,
			        type,
			        user_id: this.$store.state.user.user_id,
			    };
				body.num = 1;

			    this.$get("~/api/cart/get_list?", {
			        goods_id: obj.goods_id,
					user_id: this.$store.state.user.user_id
			    }, (res) => {
			        console.log(res)
			        if (res.result.count) {
			            var {cart_id, num, price, price_count} = res.result.list[0];
			            num += 1;
			            price_count += price;
			            this.$post(
			                `~/api/cart/set?cart_id=${cart_id}`,
			                {
			                    num,
			                    price,
			                    price_count,
			                },
			                (res) => {
			                    this.$toast("已加入购物车", "成功");
			                    console.log("更改值")
			                }
			            );
			        } else {
			            this.$post("~/api/cart/add?", body, (res) => {
			                this.$toast("已加入购物车", "成功");
			            });
			        }
			    })
			}
			,goodsClickFn(url, o) {
				this.$post(
				    `~/api/goods/set?goods_id=${o.goods_id}`,
				    {
				        hits: parseInt(o.hits) + 1
				    },
				    (res) => {
			            if (res.result) {
			                this.$router.push(url);
			            } else {
			                this.$toast(res.error.message, "error");
			            }
				    }
				);
			},
								handleChecked(product, isChecked) {
				if (isChecked && this.productList.filter(p => p.checked).length > 4) {
					alert('最多只能选择4个');
					this.$nextTick(() => {
						product.checked = false;
					});
					return;
				}
				this.productList = this.productList.map(el => {
					if (el.goods_id === product.goods_id) {
						return { ...el, checked: isChecked };
					} else {
						return el;
					}
				});
				this.$emit('update-product-list', this.productList);
			},
							async getScore() {
			      const arr = JSON.parse(JSON.stringify(this.list));
			      Promise.all(
			        arr.map(async (item) => {
			          const url = `~/api/score/avg`;
			          const params = {
			            field: "score_num",
			            source_table: "goods",
			            source_field: "goods_id",
			            source_id: item.goods_id,
			          };
			          const res = await this.$get(url, params);
			          const num = res.result || 0.0;
			          item.score = Number(num.toFixed(2));
			          return item;
			        })
			      )
			        .then((res) => {
							          this.productList = res || this.list;
							        })
			        .catch((err) => {
							          this.productList = this.list;
							        });
			},
														},
							watch:{
			list: {
				handler(val) {
					if (this.$props.goods.length) {
						this.productList = this.$props.goods;
					} else {
						this.productList = val.map(l => ({ ...l, checked: false }));
					}
				},
				deep: true
			},
			goods:{
				handler(val) {
					this.productList = val;
				},
				deep: true
			}
		},
							mounted() {
			    setTimeout(() => {
			      this.getScore();
			    }, 200);
			},
													};
</script>

<style scoped>
	.media {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-basis: 75%;
		min-height: 10rem;
	}

	.goods {
		display: flex;
		width: calc(25% - 1rem);
		margin: 0.5rem;
		flex-direction: column;
		justify-content: space-between;
		background-color: white;
		border-radius: 0.5rem;
	}

	.goods:hover {
		border: 0.2rem solid #909399;
		box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.15);
	}

	.goods:hover img {
		filter: blur(1px);
	}

	.price {
		font-size: 1rem;
		margin-right: 3px;
	}

	.price_ago {
		text-decoration: line-through;
		font-size: 0.5rem;
		color: #999;

	}

	.title {
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 700;
		padding: .25rem .5rem;
	}
	.bottom {
		padding: 0 .5rem .5rem 0.5rem;
	}

	.icon_cart {
		color: #FF5722;
		float: right;
	}
	
	.checkbox-container {
		z-index: 999;
		position: absolute;
		top: 10px;
		right: 10px;
	}
	.checkbox-container .el-checkbox.is-bordered.el-checkbox--small{
		background: #ffffffc7;
	}
	.checkbox-container .el-checkbox__label{
		padding-left: 0;
	}

	@media (max-width: 992px) {

		.goods {
			width: calc(33% - 1rem);
			;
		}

	}

	@media (max-width: 768px) {

		.goods {
			width: calc(50% - 1rem);
			;
		}

	}
</style>

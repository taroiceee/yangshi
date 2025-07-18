export default {
	data: function data() {
		var opens = $.db.get('opens') || [0];
		// var opens_str = ;
		// if(opens_str){
		// 	opens = opens_str;
		// }
		return {
			// 标题
			title: "",

			// 地址
			url: "",

			// 添加地址
			url_add: "",

			// 删除地址
			url_del: "",

			// 修改地址
			url_set: "",

			// 查询对象地址
			url_get_obj: "",

			// 查询列表地址
			url_get_list: "",

			// 表单提交地址
			url_submit: "",

			// 上传提交地址
			url_upload: "",

			// 导入数据地址
			url_import: "",

			// 导出数据地址
			url_export: "",

			// 获取的列表
			list: [],

			// 视图&验证模型
			vm: {},

			// 提交表单
			form: {},

			// 线上对象
			obj: {},

			// 查询参数
			query: {
				// 当前页面
				// page: 1,
				// 页面大小
				// size: 10
			},

			// 配置
			config: {
				// 默认当前页面
				page: 1,
				// 默认页面大小
				size: 10
			},

			// 加载进度
			loading: 0,

			// 显示进度
			showing: 0,

			// 提交进度
			posting: 0,

			// 选中项
			select: $.db.get('select'),

			// 查询结果匹配数统计
			count: 0,

			// 显示隐藏，true显示，false隐藏
			show: false,

			// 响应成功或失败
			bl: false,

			// 显示方式
			display: "",

			// 关键字段
			field: "",

			// 响应提示
			tip: "",

			// 默认请求方式
			mode: "list",

			// 清除列表
			clear_list: true,

			// 响应错误消息
			message: "",

			// 选中集
			selects: "",

			// 当前页, 用于跳转页面
			page_now: 1,

			// 选择项状态
			select_state: false,

			// 排序键，用于拖拽修改排序
			sort_key: "display",

			// 修改条件
			query_set: {},

			// 展开的上级id
			opens: opens,

			// 上级ID: father_id
			father_id: "father_id",

			// 选中集合
			selection: [],

			// 登录权限
			oauth: {
				"signIn": false,
				"gm": 0,
				"user_admin": []
			},

			// 登录用户
			user: {},

			// 修改提示
			tip_show: true,

			// 所在用户组
			user_group: "",

			// 首次进来不设置地址栏开关变量
			turnOff: false
		};
	},
	methods: {
		/**
		 * @description 事件管理, 用于管理函数
		 * @param {String} name 事件名
		 * @param {Object} param1 参数1
		 * @param {Object} param2 参数2
		 * @param {Object} param3 参数3
		 * @return {Object} 返回事件特定值
		 */
		events: function events(name, param1, param2, param3) {
			if (this[name]) {
				if (param3) {
					return this[name](param1, param2, param3);
				} else {
					return this[name](param1, param2);
				}
			} else {
				return null;
			}
		},

		/**
		 * 回调函数(中控)
		 * @param {String} name 函数名
		 * @param {Object} param1
		 * @param {Object} param2
		 * @param {Object} param3
		 * @return {Object} 任意值
		 */
		func: function func(name, param1, param2, param3) {
			var f = this[name];
			if (f) {
				if (param1 === undefined) {
					return f();
				} else if (param2 === undefined) {
					return f(param1);
				} else if (param3 === undefined) {
					return f(param1, param2);
				} else {
					return f(param1, param2, param3);
				}
			} else {
				return null;
			}
		},

		/**
		 * @description 添加数据
		 * @param {Object} param 要添加的数据
		 * @param {Function} func 回调函数
		 */
		add: function add(param, func) {
			if (!param) {
				param = this.obj;
			}
			var pm = this.events("add_before", Object.assign({}, param)) || param;
			var msg = this.events("add_check", pm);
			var ret;
			if (!msg) {
				ret = this.events("add_main", pm, func);
			}
			return ret;
		},

		/**
		 * @description 删除数据
		 * @param {Object} param 查询条件
		 */
		del: function del(param, func) {
			if (!param) {
				param = this.query;
			}
			var pm = this.events("del_before", Object.assign({}, param)) || param;
			var msg = this.events("del_check", pm);
			var ret;
			if (!msg) {
				ret = this.events("del_main", pm, func);
			}
			return ret;
		},

		del_show: function(o, id) {
			var _this = this;
			$.confirm('删除后将无法回复!<br/>是否确定要删除？', function() {
				// console.log('确定删除!');
				var query = {};
				query[id] = o[id];
				_this.del(query, function() {
					_this.list.del(query);
					_this.count -= 1;
				});
			}, function() {
				// console.log('取消删除!')
			})
		},

		/**
		 * @description 修改数据
		 * @param {Object} param 修改项
		 * @param {String} query 查询条件
		 * @param {Boolean} includeZero 是否包括0
		 */
		set: function set(param, query, func, includeZero) {
			if (!param) {
				param = this.obj;
			}
			if (query) {
				this.query_set = query;
			} else {
				this.query_set = Object.assign({}, this.query);
			}
			var pm = this.events("set_before", Object.assign({}, param), includeZero) || param;
			var msg = this.events("set_check", pm);
			var ret;
			if (!msg) {
				ret = this.events("set_main", pm, func);
			}
			return ret;
		},

		/**
		 * 修改前事件
		 * @param {Object} param
		 * @param {Boolean} includeZero 是否删除0值项
		 * @param {Object} 返回新的参数
		 */
		set_before: function set_before(param, includeZero) {
			var pm = $.delete(param, includeZero);
			for (var k in pm) {
				if (k.toLocaleLowerCase().indexOf('time') !== -1 && pm[k].indexOf('T') !== -1) {
					pm[k] = new Date(pm[k]).toStr('yyyy-MM-dd 00:00:00');
				}
			}
			return pm;
		},

		/**
		 * 批量修改
		 */
		batchSet: function batchSet() {
			var _this = this;
			$.confirm('批量修改数据无法挽回<br/>确定要操作吗?', function() {
				var q = Object.assign({}, _this.query, _this.query_set);
				q[_this.field] = _this.selects;
				delete q.page;
				delete q.size;
				delete q.orderby;
				_this.set(_this.form, q, function(json) {
					if (json.result) {
						_this.show = false;
						_this.get();
					}
				}, true);
			});
		},

		/**
		 * @description 查询多条数据
		 * @param {Object} query 查询条件
		 * @param {Function} func 回调函数
		 */
		get_list: function get_list(param, func) {
			if (!param) {
				param = this.query;
			}
			var pm = this.events("get_list_before", Object.assign({}, param)) || param;
			var msg = this.events("get_list_check", pm);
			var ret;
			if (!msg) {
				ret = this.events("get_list_main", pm, func);
			}
			return ret;
		},

		/**
		 * @description 查询一条数据
		 * @param {Object} query 查询条件
		 * @func {Function} 回调函数
		 */
		get_obj: function get_obj(param, func) {
			// console.log("获取对象", param)
			if (!param) {
				param = this.query;
			}
			var pm = this.events("get_obj_before", Object.assign({}, param)) || param;
			var msg = this.events("get_obj_check", pm);
			var ret;
			if (!msg) {
				ret = this.events("get_obj_main", pm, func);
			} else if (func) {
				func();
			}
			else {
				console.log(msg);
			}
			return ret;
		},

		/**
		 * 条件排序
		 * @param {Object} param
		 * @param {Object} func
		 */
		sort: function sort(param, func) {
			var pm = this.events("sort_before", Object.assign({}, param)) || param;
			var msg = this.events("sort_check", pm);
			var ret;
			if (!msg) {
				ret = this.events("sort_main", pm, func);
			}
			return ret;
		},

		/**
		 * 检测授权 获取授权，有权限后回调函数
		 * @param {Function} func 回调函数
		 */
		check_auth: function check_auth(func) {
			var _this = this;
			var token = this.user.token;
			if (!token){
				token = $.db.get("token");
			}

			if (token) {
				console.log("需要登录，并有登录凭证");
				this.$get_user((user) => {
					this.user = user;
					this.user_group = user.user_group;

					var user_group = "游客";
					if(user.user_group){
						user_group = user.user_group;
					}

					this.$get_auth(user_group);
					console.log("token" ,token ,"user_group" ,user_group);
					this.user.token = token;
					if (this.oauth.signIn) {
						if (this.user.token) {
							if(func){
								func();
							}
						} else {
							this.$router.push({
								path: "/account/login"
							})
						}
					} else {
						if(func){
							func();
						}
					}
				});
			} else if (this.oauth.signIn) {
				console.log("需要登录，并未登录");
				this.$get_auth("游客");
				if (this.user.token) {
					if(func){
						func();
					}
				} else {
					this.$router.push({
						path: "/account/login"
					})
				}
			} else {
				console.log("不需要登录");
				this.$get_auth("游客");
				if(func){
					func();
				}
			}
		},

		/**
		 * 初始化
		 * @param {Object} param 参数
		 * @param {Function} func 回调函数
		 */
		init: function init(param, func) {
			var pm = this.events("init_before", Object.assign({}, param)) || param;
			var msg = this.events("init_check", pm);
			var ret;
			if (!msg) {
				ret = this.events("init_main", pm, func);
			} else if (func) {
				func();
			}
			return ret;
		},

		/**
		 * 初始化前函数
		 */
		init_before: function init_before(query) {
			if (!query) {
				query = this.config;
			}
			return query;
		},

		/**
		 * 初始化
		 */
		init_main: function init_main(query) {
			var _this = this;
			$.push(this.query, query);
			_this.init_after(function() {
				_this.get(_this.query);
			});
		},

		/**
		 * 初始化后函数
		 */
		init_after: function init_after(func) {
			if (func) {
				func();
			}
		},

		/**
		 * 上传事件
		 * @param {Object} param 提交参数
		 * @param {Function} func 返回函数
		 */
		upload: function upload(param, func) {
			var pm = this.events("upload_before", Object.assign({}, param)) || param;
			var msg = this.events("upload_check", pm);
			var ret;
			if (msg) {
				this.$toast(msg, 'danger');
			} else {
				ret = this.events("upload_main", pm, func);
			}
			return ret;
		},

		/**
		 * @description 添加数据
		 * @param {Object} value 要添加的数据
		 */
		add_main: function add_main(value, func) {
			var url = this.url ? this.url + "method=add" : this.url_add;
			if (!url) {
				return;
			}
			var _this = this;
			this.$post(url, value, function(json) {
				_this.events("add_after", json, func);
				if (json.result) {
					_this.$toast(json.result.tip, json.result.bl ? 'success' : 'danger');
				} else if (json.error) {
					_this.$toast(json.error.message, 'danger');
				} else {
					_this.$toast('添加失败! 原因:是服务器连接失败!', "danger");
				}
			});
		},

		/**
		 * @description 删除数据
		 * @param {Object} query 查询条件
		 * @param {Function} func 删除回调函数函数
		 */
		del_main: function del_main(query, func) {
			var url = this.url ? this.url + "method=del" : this.url_del;
			if (!url) {
				return;
			}
			var _this = this;
			this.$get(url, query, function(json) {
				_this.events("del_after", json, func);
				if (json.result) {
					_this.$toast(json.result.tip, json.result.bl ? 'success' : 'danger');
				} else if (json.error) {
					_this.$toast(json.error.message, 'danger');
				} else {
					_this.$toast('删除失败! 原因:是服务器连接失败!', "danger");
				}
			});
		},

		/**
		 * 删除之后事件
		 * @param {Object} json 返回的结果
		 * @param {Object} func 回调函数
		 */
		del_after: function del_after(json, func) {
			if (func) {
				func();
			}
		},

		/**
		 * @description 修改数据
		 * @param {Object} value 要修改的数据
		 * @param {Object} value 修改项
		 */
		set_main: function set_main(value, func) {
			var url = this.url ? this.url + "method=set" : this.url_set;
			if (!url) {
				return;
			}
			var _this = this;
			if (!this.query_set || Object.keys(this.query_set).length === 0) {
				this.query_set = this.query;
			}
			this.$post(this.toUrl(this.query_set, url), value, function(json, status) {
				_this.events("set_after", json, func);
				if (json.result) {
					_this.$toast('更新成功！', 'success');
				} else if (json.error) {
					_this.$toast(json.error.message, 'danger');
				} else {
					_this.$toast("服务器连接失败！", "danger");
				}
			});
		},

		/**
		 * 修改成功时执行
		 * @param {Object} json 结果
		 * @param {Object} func 回调函数
		 */
		set_after: function set_after(json, func) {
			if (func) {
				func(json);
			}
		},

		/**
		 * @description 查询数据
		 * @param {Object} query 查询参数
		 * @param {Function} func 回调函数
		 */
		get: function get(query, func) {
			this.get_main(query, func);
		},

		/**
		 * @description 查询数据(主程序)
		 * @param {Object} query 查询参数
		 * @param {Function} func 回调函数
		 */
		get_main: function get_main(query, func) {
			var url = this.url_get_obj ? this.url_get_obj : this.url;
			if (url) {
				var _this = this;
				this.get_obj(query, function() {
					_this.get_create(query, func);
				});
			} else {
				this.get_create(query, func);
			}
		},

		/**
		 * 验证请求
		 * @param {Object} param 请求参数
		 */
		get_obj_check: function get_obj_check(param) {
			var bl = false;
			for (var k in param) {
				if (param[k]) {
					bl = true;
					break;
				};
			}
			if (bl) {
				return null;
			} else {
				return "缺少查询条件";
			}
		},

		/**
		 * @description 查询一条数据(主程序)
		 * @param {Object} query 查询条件
		 * @param {Function} func 回调函数
		 */
		get_obj_main: function get_obj_main(query, func) {
			// console.log("get_obj_main");
			var url = this.url_get_obj ? this.url_get_obj : this.url + "method=get_obj";
			if (!url) {
				return;
			}
			var _this = this;
			this.$get(this.toUrl(query, url), null, function(json, status) {
				_this.events("get_obj_after", json, func);
				var res = json.result;
				if (res) {
					var obj;
					if (res.obj) {
						obj = res.obj;
						delete res.obj;
					} else {
						var list = res.list;
						if (list && list.length > 0) {
							obj = list[0];
						} else {
							obj = res;
						}
					}
					if (obj) {
						if (!_this.obj || Object.keys(_this.obj).length === 0) {
						    _this.obj = obj;
						} else {
						    $.push(_this.obj, obj);
						}
						//
						// _this.$changeTime(_this.obj);
						if (!_this.form || Object.keys(_this.form).length === 0) {
						    _this.form = Object.assign({}, _this.obj)
							var form = $.db.get("form");
							if(Object.keys(_this.form).length > 0){
								$.push(_this.form, form);
							}
						} else {
						    $.push(_this.form, Object.assign({}, _this.obj));
							var form = $.db.get("form");
							if(Object.keys(_this.form).length > 0){
								$.push(_this.form, form);
							}
						}
					}
				} else if (json.error) {
					console.log(json.error.message);
				} else {
					// _this.$toast("服务器连接失败！", "danger");
				}
			});
		},

		/**
		 * @description 获取到对象后事件
		 * @param {Object} json 响应结果
		 */
		get_obj_after: function get_obj_after(json, func) {
			if (func) {
				func(json);
			}
		},

		/**
		 * @description 查询多条数据(主程序)
		 * @param {Object} query 查询条件
		 * @param {Function} func 回调函数
		 */
		get_list_main: function get_list_main(query, func) {
			var url = this.url_get_list ? this.url_get_list : this.url;
			if (!url) {
				return;
			}
			var _this = this;
			this.loading = 0;

			_this.turnOff && history.pushState(null, "", "?" + this.toUrl(this.query));
			this.$get(this.toUrl(query, url), null, function(json, status) {
				_this.loading = 100;
				if (_this.clear_list) {
					_this.list.clear();
				}
			setTimeout(() => {
				var res = json.result;
				if (res) {
					_this.page_now = _this.query.page;
					_this.list.addList(res.list);
					if (res.count !== undefined) {
						_this.count = res.count;
					}
					_this.turnOff = true;
					_this.events("get_list_after", json, func, url);
				} else if (json.error) {
					console.log(json.error.message);
				} else {
					_this.$toast("服务器连接失败！", "danger");
				}
				},0)
			});
		},

		/**
		 * @description 获取到列表事件
		 * @param {Object} res 响应结果
		 */
		get_list_after: function get_list_after(res, func, url) {
			if (func) {
				func(res, url);
			}
		},

		/**
		 * 搜索
		 * @param {Object} query 查询条件
		 * @param {Boolean} bl 是否重置再搜索
		 */
		search: function search(query, func) {
			if (query) {
				$.push(this.query, query);
			}
			var url = this.url_get_list ? this.url_get_list : this.url;
			if (url) {
				this.query.page = 1;
				this.count = 0;
				this.first(query, func);
			}
		},

		get_create: function get_create(query, func) {
			if (query) {
				$.push(this.query, query);
			}
			var url = this.url_get_list ? this.url_get_list : this.url;
			if (url) {
				this.count = 0;
				this.first(query, func);
			}
		},

		/**
		 * @description 查询多条数据 (首次)
		 * @param {Object} query 查询条件
		 * @param {Function} func 回调函数
		 */
		first: function first(query, func) {
			var _this = this;
			if (!this.count) {
				var qy = {};
				for(var key in this.query){
					if (Array.isArray(this.query[key])){
						qy[key + '_min'] = new Date(this.query[key][0]).toStr('yyyy-MM-dd hh:mm:ss');
						qy[key + '_max'] = new Date(this.query[key][1]).toStr('yyyy-MM-dd hh:mm:ss');
					}else{
						qy[key] = this.query[key]
					}
				}
				this.get_list(qy, func);
			} else {
				this.get_list(query, func);
			}
		},

		/**
		 * @description 查询下一页数据
		 * @param {Function} func 回调函数
		 */
		next: function next(query, func) {
			// console.log("next");
			var _this = this;
			_this.get_list(query, function(json, url) {
				if (json.result) {
					var list = json.result.list;
					if (list.length > 0) {
						var qy = Object.assign({}, query, {
							page: query.page + 1
						});
						if (qy.page <= _this.page_count) {
							_this.$get(_this.toUrl(qy, url));
						}
					}
				}
				if (func) {
					func(json);
				}
			});
		},

		/**
		 * @description 查询上一页数据
		 * @param {Function} func 回调函数
		 */
		prev: function prev(query, func) {
			// console.log("prev");
			var _this = this;
			this.get_list(query, function(json, url) {
				if (json.result) {
					var list = json.result.list;
					if (list.length > 0) {
						var qy = Object.assign({}, query, {
							page: query.page - 1
						});
						if (qy.page >= 1) {
							_this.$get(_this.toUrl(qy, url));
						}
					}
				}
				if (func) {
					func(res);
				}
			});
		},

		/**
		 * 清除数据
		 * @param {Object} query
		 */
		clear: function clear(query) {
			$.clear(query);
		},

		/**
		 * 重置
		 */
		reset: function reset() {
			$.clear(this.query);
			$.push(this.query, this.config);
			this.get_list();
		},

		/**
		 * 提交创建用户
		 * @param {String} user_group 用户组
		 * @param {String} username 用户名
		 * @param {String} password 密码
		 * @param {String} userid 用户ID名
		 */
		submitUser(user_group, userKey, userid = "user_id") {
			this.$refs["form"].validate(async (valid) => {
				if (valid) {
					var form = this.form;
					if (form[userKey]) {
						var username = form[userKey];
						var password = form[userKey].md5();
						if (this.form[userid]) {
							this.submit();
						} else {
							await this.$post("~/api/user/add?", {
								username,
								password,
								user_group
							});
							this.$get("~/api/user/get_obj?", {
									username,
									user_group
								},
								(json) => {
									if (json.result && json.result.obj) {
										this.form[userid] = json.result.obj.user_id;
										this.submit();
									}
								})
						}
					} else {
						console.error('error 关键条件缺失!!');
					}
				} else {
					console.error('error 提交失败!!');
				}
			});
		},
		/**
		 * 提交事件
		 * @param {Object} param 表单
		 * @param {Object} func 返回函数
		 */
		submit: async function submit(param, func) {
			// console.log('提交事件', param);
			if (!param) {
				param = this.form;
			}
			// 提交前事件
			var pm = this.events("submit_before", Object.assign({}, param)) || param;
			// 提交前验证事件
			var msg = await this.events("submit_check", pm);
			var ret;
			// 判断错误
			if (msg) {
				this.$toast(msg, 'danger');
			} else {
				// 提交表单
				ret = this.events("submit_main", pm, func);
			}
			// 返回结果
			return ret;
		},

		/**
		 * 提交前事件
		 * @param {Object} param 提交参数
		 */
		submit_before: function(param) {
			// console.log('提交前事件', param);
			// 循环参数
			for(var key in param){
				// 错误回调
				try{
					var value = param[key];
					// 值判断与值校验
					console.log("键 ,值 ,类型" ,key ,value ,value instanceof Date);
					if(value && value instanceof Date){
						param[key] = this.$toTime(value ,"yyyy-MM-dd hh:mm:ss");
					}
				}
				catch(err){
					console.log(key ,"转日期错误：" ,err ,"收到请无视!");
				}
			}
			return param;
		},

		/**
		 * 提交前验证事件
		 * @param {Object} 请求参数
		 * @return {String} 验证成功返回null, 失败返回错误提示
		 */
		submit_check: function submit_check(param) {
			return null;
		},

		/**
		 * 提交表单
		 */
		submit_main: function submit_main(param, func) {
			// console.log('提交主要事件', param);
			var url = this.url;
			if (url) {
				if (this.field) {
					var id = param[this.field];
					if (id) {
						var q = {
							method: 'set'
						};
						q[this.field] = id;
						url = this.toUrl(q, url);
					} else {
						url += "method=add"
					}
				} else {
					url += "method=submit"
				}
			} else if (this.url_submit) {
				url = this.url_submit;
			} else if (this.field) {
				var id = param[this.field];
				// console.log(this.field,id);
				if (id) {
					url = this.url_set;
				} else {
					url = this.url_add;
				}
			}

			// console.log('发送请求前', url);
			if (url) {
				var _this = this;
				// console.log('发送信息', url, param);
				url = this.$toUrl(this.query, url);
				this.$post(url, param, function(json, status) {
					if (json.result) {
						_this.events("submit_after", json, func);
					} else if (json.error) {
						_this.$toast(json.error.message, 'danger');
					} else {
						_this.$toast("服务器连接失败！", "danger");
					}
				});
			}
		},

		/**
		 * @description 获取到对象后事件
		 * @param {Object} json 响应结果
		 * @param {Function} func 回调函数
		 */
		submit_after: function submit_after(json, func) {
			this.$toast('提交成功！', 'success');
			if (func) {
				func(json);
			}
			this.$router.go(-1);
		},

		/**
		 * 上下翻页
		 * @param {Number} n 加减页码
		 */
		go: function go(n) {
			var page = this.query.page + n;
			this.goTo(page);
		},

		/**
		 * 跳转指定页
		 * @param {Number} page 页码
		 */
		goTo: function goTo(page) {
			if (page < 1) {
				page = 1;
			} else if (page > this.page_count) {
				page = this.page_count;
			}
			var query = this.query;
			var p = query.page;
			query.page = page;
			this.$router.push("?" + this.toUrl(query));
			if (this.page_count !== 0) {
				if (p + 1 == page) {
					this.next(query);
				} else if (p - 1 == page) {
					this.prev(query);
				} else {
					this.first(query);
				}
			} else {
				this.first(query);
			}
		},

		/**
		 * 分页新
		 * @param {Number} page 页码
		 */
		goToNew: function goTo(page) {
			if (page < 1) {
				page = 1;
			} else if (page > this.page_count) {
				console.log(this.page_count)
				page = this.page_count;
			}
			let query = this.query;
			// let p = query.page;
			query.page = page;
			let _this = this;
			_this.get_list(query, function(json, url) {
				if (json.result) {
					var list = json.result.list;
					if (list.length > 0) {
						var qy = Object.assign({}, query, {
							page: query.page
						});
						if (qy.page <= _this.page_count) {
							_this.$get(_this.toUrl(qy, url));
						}
					}
				}
				if (func) {
					func(json);
				}
			});
		},

		/**
		 * @description 转查询参数
		 * @param {Object} obj 被转换的对象
		 * @param {String} url 请求地址
		 * @return {String} url字符串
		 */
		toUrl: function toUrl(obj, url) {
			return $.toUrl(obj, url);
		},

		/**
		 * @description 上传文件
		 * @param {Function} func 回调函数
		 */
		upload_main: function upload_main(func) {
			var url = "";
			if (this.url) {
				url = this.url + "method=upload";
			} else {
				url = this.url_upload;
			}

			if (!param) {
				param = this.form;
			}
			if (msg) {
				this.$toast(msg, 'danger');
			} else {
				this.uploading = 0;
				var _this = this;
				this.$upload(url, param, function(json, status) {
					_this.uploading = 100;
					_this.events("upload_after", json, func);
				});
			}
		},

		/**
		 * @description 上传完成时
		 * @param {Object} json 响应结果
		 * @param {Function} func
		 */
		upload_after: function upload_after(json, func) {
			if (json.result) {
				this.$toast(json.result.tip, json.result.bl ? 'success' : 'danger');
			} else if (json.error) {
				this.$toast(json.error.message, 'danger');
			} else {
				this.$toast("服务器连接失败！", "danger");
			}
			if (func) {
				func();
			}
		},

		/**
		 * 结束前
		 * @param {Object} param 参数
		 */
		end_before: function end_before(param) {
			// this.reset();
		},

		/**
		 * 选择项全改
		 */
		select_all: function select_all() {
			var bl = !this.select_state;
			if (!bl) {
				this.selects = '';
			} else {
				var s = '';
				var list = this.list;
				for (var i = 0; i < list.length; i++) {
					s += '|' + list[i][this.field];
				}
				this.selects = s.replace('|', '');
			}
			this.select_state = bl;
		},

		/**
		 * 选择项改变
		 * @param {String|Number} id 选择的ID
		 */
		select_change: function select_change(id) {
			var has = false
			var arr = this.selects.split('|');
			for (var i = 0; i < arr.length; i++) {
				var o = arr[i];
				if (id == o) {
					arr.splice(i, 1);
					has = true;
					break;
				}
			}
			if (!has) {
				arr.push(id)
			}
			var s = arr.join('|');
			if (s.indexOf('|') == 0) {
				this.selects = s.substring(1)
			} else {
				this.selects = s;
			}
		},

		/**
		 * 选择项含有
		 * @param {String|Number} id 选择的ID
		 */
		select_has: function select_has(id) {
			var ids = '|' + this.selects + '|';
			return ids.indexOf('|' + id + '|') !== -1;
		},

		/**
		 * 选中
		 * @param {Number} index 项目索引
		 */
		selected: function selected(index) {
			this.select = index;
			$.db.set('select', index, 120);
		},

		/**
		 * 页面改变时
		 * @param {Object} e 事件
		 */
		page_change: function page_change(e) {
			var n = Number(e.target.value);
			if (isNaN(n)) {
				n = 1;
			}
			if (n < 1) {
				n = 1;
			} else if (n > this.page_count) {
				n = this.page_count
			}
			this.page_now = n;
		},

		/**
		 * 获取名称
		 * @param {Array} list 用来取名的列表
		 * @param {String} arr_str id集合
		 * @param {String} key 键
		 * @param {String} name 名
		 * @param {String} span 分隔符
		 */
		get_name(list, arr_str, key, name, span) {
			if (!name) {
				name = "name";
			}
			var value = "";
			if (arr_str) {
				if (typeof(arr_str) == 'string') {
					if (!span) {
						span = ',';
					}
					var arr = arr_str.split(span);
					var id = Number(arr[0]);

					for (var i = 0; i < list.length; i++) {
						var o = list[i];
						if (o[key] == id) {
							value += '|' + o[name];
						}
					}
				} else {
					var id = arr_str;
					for (var i = 0; i < list.length; i++) {
						var o = list[i];
						if (o[key] == id) {
							value = o[name];
							break
						}
					}
				}
			}
			return value.replace('|', '');
		},

		/**
		 * 取消并返回
		 */
		cancel: function cancel() {
			this.$router.go(-1);
		},
		// 打印
		printFrame:function printFrame(imgArrs,formArrs,formData,otherAddArrs){
			//@imgArrs 图片 @formArrs 表单 @formData 表单的值 @otherAddArrs 富文本之后需要展示的内容

			// 遍历表单数据的名称和值
			for (let key in formData) {
				if (formData.hasOwnProperty(key)) {
					formArrs.map(item => {
						if (item.key == key) {
							if (item.key == 'seller_customers') {
								//卖家用户单独处理
								this.list_user_seller_customers.map(customer => {
									if (customer.user_id == formData[key]) {
										item.value = customer.nickname + "-" + customer.username;
									}
								})
							} else {
								item.value = formData[key];
							}
						}
					})
				}
			}
			let printStr = `<div>`;
			imgArrs.map(item => {
				if (!!item.value) {
					printStr += `<div class='print-line'><div class='print-title'>${item.label}</div><img class='print-img' src="${item.value}" /></div>`
				};
			})
			formArrs.map(item=>{
				if(!!item.value){printStr+=`<div class='print-line'><div class='print-title'>${item.label}</div><div>${item.value}</div></div>`}
			})
			//正文单独处理
			if(!!formData.cart_content){
				printStr += `<div class='print-line'><div class='print-title'>正文</div><div>${formData.cart_content}</div></div>`
			}
			if(!!otherAddArrs && otherAddArrs.length>0){
				otherAddArrs.map(item=>{
					if(!!item.value){printStr+=`<div class='print-line'><div class='print-title'>${item.label}</div><div>${item.value}</div></div>`}
				})
			}

			printStr += `</div>`;
			const iframe = document.getElementById('printIframe');
			this.iframeContent=printStr;
			iframe.style.display = 'none';
			document.body.appendChild(iframe);

			// 等待iframe加载完成
			iframe.onload = () => {
				// 将需要打印的内容写入iframe
				const doc = iframe.contentWindow.document;
				doc.open();
				doc.write(`
			<!DOCTYPE html>
			<html>
			<head>
			<title>打印内容</title>
			<style>
			.print-line{
				margin-bottom:25px;
				}
				.print-line .print-title{
				font-weight:bolder;
				margin-bottom:10px;
				}
				.print-line .print-img,.print-line img{
				height:150px;
				}
				@media print {
				body {
					margin: 0;
					padding: 20px 10px;
					page-break-after: avoid;
				}
				@page {
					margin: 20px;
					size: auto;
				}
				}
			</style>
			</head>
			<body>
			${printStr}
			</body>
			</html>
		`);
				doc.close();

				// 打印iframe
				iframe.contentWindow.print();

				// 可选：移除iframe
				setTimeout(() => {
					// 刷新页面
					location.reload()
				}, 0);
			};

			// 设置iframe的src以触发加载
			iframe.src = 'about:blank';
		},
		
		/**
		 * 导入数据
		 * @param {Object} file 文件
		 */
		import_db: function import_db(file) {
			if (file) {
				var _this = this;
				$.confirm("是否导入 " + file.name, "导入数据", function() {
					$.http.upload(_this.url_import, file, function(json) {
						if (json.result) {
							$.confirm(json.result.tip, function() {
								_this.get();
							});
						} else if (json.error) {
							$.confirm(json.error.message);
						} else {
							_this.$toast("服务器连接失败！", "danger");
						}
					});
				});
			}
		},

		/**
		 * 导出数据
		 */
		export_db: function export_db() {
			var _this = this;
			if (this.selects) {
				var query = {};
				query[this.field] = this.selects;
				this.$get(_this.url_export, query, function(json) {
					var res = json.result;
					if (res && res.bl) {
						window.location.href = res.url;
					}
				});
			} else {
				this.$get(_this.url_export, this.query, function(json) {
					var res = json.result;
					if (res && res.bl) {
						window.location.href = res.url;
					}
				});
			}
		},

		/**
		 * 判断是否有下级
		 * @param {Number} id 字段ID
		 * @param {Object} list 数据列表
		 * @return {Number} 返回级别
		 */
		opens_has_sub: function(id, list) {
			if (!list) {
				list = this.list;
			}
			var bl = false;
			var father_id = this.father_id;
			for (var i = 0; i < list.length; i++) {
				var o = list[i];
				if (o[father_id] === id) {
					bl = true;
					break;
				}
			}
			return bl;
		},

		/**
		 * 改变展开项
		 * @param {Number} id 唯一主键
		 */
		opens_change: function opens_change(id) {
			var index = this.opens.indexOf(id);
			if (index !== -1) {
				this.opens.splice(index, 1);
			} else {
				var bl = this.opens_has_sub(id);
				if (bl) {
					this.opens.push(id);
				}
			}
			$.db.set('opens', this.opens);
		},

		/**
		 * 判断是否存在
		 * @param {Number} id 唯一主键
		 * @return {Boolean} 存在返回true, 否则返回false
		 */
		opens_has: function opens_has(id) {
			return this.opens.indexOf(id) !== -1;
		},

		/**
		 * 判断子孙级别, 最大支持5次分叉
		 * @param {Number} fid 祖辈ID
		 * @param {Object} list 数据列表
		 * @return {Number} 返回级别
		 */
		opens_lv: function opens_lv(fid, list) {
			if (!list) {
				list = this.list;
			}
			var lv = 0;
			var father_id = this.father_id;
			var id = this.field;
			var num = fid;
			for (var n = 0; n < 5; n++) {
				if (num === 0) {
					break;
				}
				for (var i = 0; i < list.length; i++) {
					var o = list[i];
					if (o[id] === num) {
						lv++;
						num = o[father_id];
						if (num === 0) {
							break;
						}
					}
				}
			}
			return lv;
		},

		/**
		 * 筛选内容
		 * @param {Object} value
		 * @param {Object} row
		 */
		filterState(value, row) {
			return row.state === value;
		},
		batchInfo() {
            var list = this.selection;
            if (list.length === 0) {
                this.$message({
                    type: 'info',
                    message: '选择对象不能为空!'
                });
                return;
            }
            this.batchAll(list)
        },

		// 删除消息
		delInfo() {
			var list = this.selection;
			if (list.length === 0) {
				this.$message({
					type: 'info',
					message: '选择对象不能为空!'
				});
				return;
			}
			this.$confirm('此操作将永久删除该文件, 是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
				await this.delAll(list);
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},

		/**
		 * 批量删除
		 * @param {Object} list 删除对象集
		 */
		async delAll(list) {
			var bl = true;
			var query = {};
			for (var i = 0; i < list.length; i++) {
				var obj = list[i];
				var field = this.field;
				// 获取删除ID
				query[field] = obj[field];
				var o = await this.$get(this.url_del, query);
				if (o.error) {
					this.$message.error('删除失败' + o.error.message);
					bl = false;
					break;
				}
			}
			if (bl) {
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
				this.get_list()
			}
		},

		/**
		 * 上传文件
		 * @param {Object} file 文件对象
		 * @param {key} 保存键名
		 */
		uploadFile(file, key = "img") {
			var _this = this;
			var form = new FormData() // FormData 对象
			form.append('file', file) // 文件对象
			this.$upload(this.url_upload, form, function(json) {
				if (json.result) {
					if (typeof(_this.face_url) != "undefined") {
						_this.face_url = json.result.url
					}
					_this.form[key] = _this.$fullUrl("~" + json.result.url);
				} else {
					_this.$toast('上传失败！');
				}
			});
		},
		
		/**
		 * 上传多文件
		 * @param {Object} file 文件对象
		 * @param {key} 保存键名
		 */
		uploadFileMultiple(file, key = "img") {
			var _this = this;
			var form = new FormData() // FormData 对象
			form.append('file', file) // 文件对象
			this.$upload(this.url_upload, form, function(json) {
			    if (json.result) {
					if(_this.form[key].length > 0){
						_this.form[key].push(json.result.url);
					}else{
						_this.form[key] = [json.result.url];
					}
			    } else {
			        _this.$toast('上传失败！');
			    }
			});
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

		/**
		 * 选择更改
		 * @param {Object} val
		 */
		selectionChange(val) {
			this.selection = val;
		},

		/**
		 * 条数变更
		 * @param {Object} size
		 */
		handleSizeChange(size) {
			this.query.size = size;
			this.get_list();
		},

		/**
		 * 页数变更
		 * @param {Object} page
		 */
		handleCurrentChange(page) {
			this.query.page = page;
			this.get_list();
		},

		/**
		 * 跳转表
		 * @param {Object} form
		 * @param {Object} url
		 */
		to_table(form,url){
			delete form["examine_state"];
			$.db.set("form",form);
			this.$router.push(url);
		},

		/**
		 *
		 * @param {Object} url
		 * @param {Object} key
		 */
		to_form(url,key){
			$.db.set("form",this.obj);
			this.$router.push(url);
		},

		/**
		 * 敏感词过滤
		 * @param {String} content
		 * @return Array
		 */
		async filterSensitiveWords(content){
			var json = await this.$get("~/api/sensitive_vocabulary/get_list?");
			var wordsList = json.result.list
			var includeWords = []
			console.log(wordsList)
			for (let i = 0; i < wordsList.length; i++) {
				if(content.indexOf(wordsList[i].sensitive_vocabulary) > -1 ){
					includeWords.push(wordsList[i].sensitive_vocabulary)
				}
			}

			return includeWords
		}
	},
	computed: {
		/**
		 * 分页数量
		 */
		page_count: function page_count() {
			return Math.ceil(this.count / this.query.size);
		}
	},
	created: function created() {
		console.log("page创建完成时");
		this.showing = 0;
		this.check_auth(() => {
			console.log("获取信息");
			this.init(this.$route.query);
		})
	},
	mounted: function mounted() {
		this.showing = 100;
	},
	beforeDestroy: function beforeDestroy() {
		this.events('end_before');
	},
	filters: {
		/**
		 * @description 日期时间转换
		 * @param {String} date 时间戳
		 */
		 formatDate(date) {
			 var date = new Date(date);
			 var YY = date.getFullYear() + '-';
			 var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			 var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
			 var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			 var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			 var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
			 return YY + MM + DD +" "+hh + mm + ss;
		}
	}
};

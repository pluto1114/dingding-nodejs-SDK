function isEmpty(v) {
	if (Array.isArray(v)) {
		var count = 0;
		v.forEach(function (item) {
			if (!isEmpty(item)) {
				count++;
			}
		})
		console.log(count, v.length)
		return count != v.length;
	} else {
		if (v == null || v == '' || v == 'null') {
			return true;
		} else {
			return false;
		}
	}

}
function storage(name, value) {
	if (arguments.length == 2) {
		localStorage[name] = JSON.stringify(value)
		return
	} else if (arguments.length == 1) {
		return JSON.parse(localStorage[name])
	} else {
		console.error("参数有误")
	}
}
function parseQueryString() {
	var url = location.toString()
	console.warn('url', url)
	var arr;
	var res = {};
	arr = url.split('?');
	arr.shift();
	var queryStr = arr.join('?');
	if (queryStr.trim().length == 0) {
		return res;
	}

	arr = queryStr.split('&');
	for (var i = 0; i < arr.length; i++) {
		var itemArr = arr[i].split('=');
		var name = itemArr.shift();
		var value = itemArr.join('=');
		if (value.indexOf('#') > -1) {
			value = value.split('#')[0]
		}
		res[name] = value;
	}
	return res;
}
function getDDUser() {
	if (window.localStorage.dduser)
		return JSON.parse(window.localStorage.dduser);
	else
		return null;
}
function setNavTitle(title) {
	dd.ready(function () {
		dd.biz.navigation.setTitle({
			title: title
		});
	})

}

function setMenu(param, callback) {
	dd.ready(function () {
		dd.biz.navigation.setMenu({
			// backgroundColor : "#ADD8E6",
			// textColor : "#6495ed",
			items: [
				{
					"id": "3",
					"iconId": "setting",
					"text": "disange",
				},
				{
					"id": "4",
					"iconId": "time",
					"text": "disige"
				}
			],
			onSuccess: function (data) {
			},
			onFail: function (err) { }
		});
	})
}
function setNavRight(param, callback) {
	console.log("setNavRight", param.text)
	dd.ready(function () {
		dd.biz.navigation.setRight({
			control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
			text: param.text,//控制显示文本，空字符串表示显示默认文本
			onSuccess: function (result) {
				callback(result);
			},
			onFail: function (err) { }
		});
	})
}
function setNavLeft(param, callback) {
	dd.ready(function () {
		dd.biz.navigation.setLeft({
			control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
			text: param.text,//控制显示文本，空字符串表示显示默认文本
			onSuccess: function (result) {
				// callback(result);
				dd.biz.navigation.close()
			},
			onFail: function (err) { }
		});
	})
}
function hideNavRight() {
	dd.ready(function () {
		dd.biz.navigation.setRight({
			// control: true,
			text: ""
		});
	})
}
function ddscan(param, callback) {
	dd.ready(function () {
		dd.biz.util.scan({
			type: "qrcode", // type 为 all、qrCode、barCode，默认是all。
			tips: param.tips,  //进入扫码页面显示的自定义文案
			onSuccess: function (data) {
				callback(data);
			},
			onFail: function (err) {
			}
		})
	})
}



//dingcce3c449b62ce9ea35c2f4657eb6378f
function requestAuthCode(corpid, callback) {
	try {
		dd.ready(function () {
			console.log('corpid', corpid)
			dd.runtime.permission.requestAuthCode({
				corpId: corpid,
				onSuccess: function (result) {
					callback(result)
				},
				onFail: function (err) {
					console.error(err)
				}

			});
		});
	} catch (e) {
		console.error(e.message)
	}
}
//调取小鱼第三方应用
function ddLaunchApp(jsconfig, app, callback) {

	console.log('ddconfig')
	dd.config({
		agentId: jsconfig.agentid,
		corpId: jsconfig.corpId,
		timeStamp: jsconfig.timeStamp,
		nonceStr: jsconfig.nonceStr,
		signature: jsconfig.signature,
		jsApiList: ['device.launcher.launchApp']
	});
	dd.ready(function () {
		console.log('app', app)
		dd.device.launcher.launchApp({
			app: app,//iOS:应用scheme;Android:应用包名
			onSuccess: function (data) {
				console.log('success')
				callback(data)
			},
			onFail: function (err) {
				console.log('fail', err)
			}
		});
	});

	dd.error(function (err) {
		alert('dd error: ' + JSON.stringify(err));
	});
}
function ddConfirm(message, callback) {
	try {
		dd.ready(function () {
			dd.device.notification.confirm({
				message: message,
				title: "提示",
				buttonLabels: ['确定', '取消'],
				// buttonLabels: buttonLabels,
				onSuccess: function (result) {
					callback(result)
				},
				onFail: function (err) { }
			});
		})
	} catch (e) {
		console.error(e.message)
	}
}
function ddAlert(message, callback) {
	dd.device.notification.alert({
		message: message,
		title: "提示",//可传空
		buttonName: "确定",
		onSuccess: function () {
			//onSuccess将在点击button之后回调
			/*回调*/
		},
		onFail: function (err) { }
	});
}
function complexPicker(jsconfig, callback) {
	console.log('ddconfig')

	dd.ready(function () {
		dd.biz.contact.complexPicker({
			title: "选择处理人",            //标题
			corpId: jsconfig.corpId,              //企业的corpId
			multiple: false,            //是否多选
			limitTips: "超出了",          //超过限定人数返回提示
			appId: jsconfig.agentid,              //微应用的Id
			permissionType: "GLOBAL",          //选人权限，目前只有GLOBAL这个参数
			responseUserOnly: true,        //返回人，或者返回人和部门
			startWithDepartmentId: 0,   // 0表示从企业最上层开始
			onSuccess: function (result) {
				/**
				{
						selectedCount:1,                              //选择人数
						users:[{"name":"","avatar":"","emplId":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），emplId（用户工号）三个字段
						departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
				}
				*/
				console.info('complexPicker', result)
				callback(result);
			},
			onFail: function (err) { }
		});
	})

	dd.error(function (err) {
		alert('dd error: ' + JSON.stringify(err));
	});

}

function pickConversation(jsconfig, callback) {
	console.log('ddconfig')
	dd.ready(function () {
		dd.biz.chat.pickConversation({
			corpId: jsconfig.corpId, //企业id
			// isConfirm:'false', //是否弹出确认窗口，默认为true
			onSuccess: function (result) {
				//onSuccess将在选择结束之后调用
				// 该cid和服务端开发文档-普通会话消息接口配合使用，而且只能使用一次，之后将失效
				/*{
					cid: 'xxxx',
					title:'xxx'
				}*/
				console.info('pickConversation', result)
				callback(result);
			},
			onFail: function () { }
		})
	})

	dd.error(function (err) {
		alert('dd error: ' + JSON.stringify(err));
	});
}
function chooseConversationByCorpId(jsconfig, callback) {
	console.log('ddconfig')
	dd.ready(function () {
		dd.biz.chat.chooseConversationByCorpId({
			corpId: jsconfig.corpId, //企业id
			isAllowCreateGroup:false,
  			filterNotOwnerGroup:false,
			onSuccess: function (result) {
				//onSuccess将在选择结束之后调用
				/*{
					chatId: 'xxxx',
					title:'xxx'
				}*/
				console.info('chooseConversationByCorpId', result)
				callback(result);
			},
			onFail: function () { }
		})
	})

	dd.error(function (err) {
		alert('dd error: ' + JSON.stringify(err));
	});
}

function ddAuthconfig(jsconfig, jsApiList) {
	console.info('jsApiList',jsApiList)
	dd.config({
		agentId: jsconfig.agentId,
		corpId: jsconfig.corpId,
		timeStamp: jsconfig.timeStamp,
		nonceStr: jsconfig.nonceStr,
		signature: jsconfig.signature,
		jsApiList: jsApiList
	});
	dd.error(function (err) {
		alert('dd error: ' + JSON.stringify(err));
	});
}
function openSingleChat(jsconfig, userid) {
	console.log('ddconfig', jsconfig, userid)

	dd.ready(function () {
		dd.biz.chat.openSingleChat({
			corpId: jsconfig.corpId, // 企业id,必须是用户所属的企业的corpid
			userId: userid, // 用户的工号
			onSuccess: function () {},
			onFail: function (e) {
				alert(JSON.stringify(e))
			}
		})
	})

	

}
function showCallMenu(jsconfig, mobile) {
	console.log('ddconfig', jsconfig,mobile)

	dd.ready(function () {
		dd.biz.telephone.showCallMenu({
			phoneNumber: mobile, // 期望拨打的电话号码
			code: '+86', // 国家代号，中国是+86
			showDingCall: false, // 是否显示钉钉电话
			onSuccess: function () { },
			onFail: function (e) {
				alert(JSON.stringify(e))
			}
		})
	})

}
function alipay(jsconfig, info, callback) {
	console.log('jsconfig')
	dd.config({
		agentId: jsconfig.agentid,
		corpId: jsconfig.corpId,
		timeStamp: jsconfig.timeStamp,
		nonceStr: jsconfig.nonceStr,
		signature: jsconfig.signature,
		jsApiList: ['biz.alipay.pay']
	});

	dd.ready(function () {
		console.log('alipay')
		dd.biz.alipay.pay({
			info: info,
			onSuccess: function (result) {
				console.log("alipay success")
				callback(result)
			},
			onFail: function (err) {
				console.log("alipay err")
				console.error(err)
			}
		})
	})

	dd.error(function (err) {
		alert('dd error: ' + JSON.stringify(err));
	});

}


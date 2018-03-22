(function(window){
	if(!window.Lg) window.Lg={};
	function Validator(){
		if(window.System && window.System.Basis) 
			window.System.Basis.call(this);
		var $this=this,
			illeaglStr='';
		this.userName=function(name){
			if(!name) return false;
			
		};
		this.password=function(pas,num){
			if(!pas) return false;
			var num=num||6;
			if(pas.length<num) return false;
			
		};
		this.code=function(){};
		this.r_password=function(pas,r_pas){
			if(!pas || !r_pas) return false;
			return pas!=r_pas;
			
		};
	}
	
	window.Lg.Validator=Validator;
})(window);






function main(elem){
	$(elem).each(function(){
		new Vlidate_reg(this,function(){});
	});
	//validator();
}

function Vlidate_reg(input,validator){
	
	this.input=input;
	this.validator=validator;
	this.notice=$(input).parents().find(".msg-cnt2")[0];
	this.warning=$(input).parents().find(".msg-cnt1")[0];
	var _this=this;
	$(input).focus(function(){
		_this.showNotice();
	});
	$(input).blur(function(){
		_this.hiddenNotice();
	});
	/**
	*===============================
	*public void showNotice();
	*显示提示信息
	*===============================
	*/
	this.showNotice=function(){
		this.notice.style.display="block";
	};
	/**
	*===============================
	*public void hiddenNotice();
	*隐藏提示信息
	*===============================
	*/
	this.hiddenNotice=function(){
		this.notice.style.display="none";
	};
	/**
	*===============================
	*public void showWarning();
	*显示错误信息
	*===============================
	*/
	this.showWarning=function(){
		this.warning.style.display="block";
	};
	/**
	*===============================
	*public void hiddenWarning();
	*隐藏错误信息
	*===============================
	*/
	this.hiddenWarning=function(){
		this.warning.style.display="none";
	};
	/**
	*===============================
	*public boolean isValid();
	*当前输入内容是否有效，有效返回true，否则返回false
	*===============================
	*/
	this.isValid=function(){
		
	};
	/**
	*===============================
	*public boolean validate();
	*进行验证，无效的话显示对应的错误信息,有效返回true，否则返回false
	*===============================
	*/
	this.validate=function(){
		
	};
}

function openWindow(src){
	window.open(src,'','wilih=400,height=400,top=0,left=0,scrollbars=1');
}
function getImgUrl(img){
	window.opener.getID('imgUrl').value=window.opener.getID('face').src=img.alt;
}
function getID(id){
	return document.getElementById(id);
}

function stopDefault(e) {  
	e = e || window.event;
			//如果提供了事件对象，则这是一个非IE浏览器   
	if(!e) return false;
	if(e.preventDefault) {  
	　　//阻止默认浏览器动作(W3C)  
	　　e.preventDefault();  
	} else{  
	　　//IE中阻止函数器默认动作的方式   
	　　e.returnValue = false;   
	}  
	return false;  
} 
/**
*public boolean validator()
*表单验证
*/
function validator(){
	var username=$('#username');
	username.click(function(){
		
	});
	username.blur(function(){
		return validator_name(this);
	});
	$('#password').blur(function(){
		return validator_password(this);
	});
	
	$('#c_password').blur(function(){
		if(this.value!=reg.password.value){
			alert('密码和密码重复不一致');
		}
	});
	return true;
}



function validator_form(){
	var form=reg;
	if(!validator_name(form.username)){
		
		return false;
	}
	if(!validator_password(form.password)) return false;
	return stopDefault();
}



/**
 * public boolean validator_name(node name)
 * 
 * 验证用户名
 * 
 */
function validator_name(node){
	if(!filter(node.value)){
		if(!validator_charlen(node.value,2,12)){
			alert('用户名不能小于2位且不能大于12位');
			node.focus();
			return false;
		}
	}else{
		node.focus();
		return true;
	}
}
/**
 * public boolean validator_name(node name)
 * 
 * 验证密码
 * 
 */
function validator_password(node){
	if(!filter(node.value)){
		if(!validator_charlen(node.value,6,12)){
			alert('密码不能小于6位且不能大于12位');
			node.focus();
			return false;
		}
	}else{
		node.focus();
		return true;
	}
}





/**
 * public boolean validator_str(String str,int min,int max)
 * 
 * 验证字符串
 * 
 */
function validator_charlen($str,//输入的字符
						   $min,//限制字符输入最少长度
						   $max//限制字符输入最多长度
						   ){
	if($str.length<$min || $str.length>$max){
		return false;
	}
	return true;
}


function filter($str){
	if(/[<>\'\"\\ ]/.test($str)){
		alert('非法字符');
		return true;
	}
	return false;
}
/**
*单击更新验证码
*/
function updateYZM(id){
	if(!id) return;
	id.src='code.php?' + new Date().getTime();
}




window.TRegister = window.TRegister || {};
TRegister.CONSTANTS = {
	ERROR_MISS_NICK_NAME: "请填写会员名",
	ERROR_MISS_PASSWORD: "请填写密码",
	ERROR_MISS_PASSWORD_CONFIRM: "请重新填写一遍密码",
	ERROR_MISS_EMAIL: "请输入电子邮箱",
	ERROR_MALFORM_NICK_NAME_TOO_SHORT: "会员名在5-25个字符内",
	ERROR_MALFORM_NICK_NAME_TOO_LONG: "会员名在5-25个字符内",
	ERROR_DUP_NICK_NAME: "该会员名已被使用。您可以:1、重新输入或选择推荐的会员名。2、使用该会员名<a href='https://login.taobao.com/member/login.jhtml' target='_blank'>登录</a>",
	ERROR_MALFORM_PASSWORD: "您的密码过于简单，请不要使用纯数字、纯字母或连续相同字符。",
	ERROR_PASSWORD_NOT_MATCH: "登录密码与再次输入密码不一致",
	ERROR_MALFORM_PASSWORD_TOO_SHORT: "密码太短，建议您的密码大于6个字符",
	ERROR_MALFORM_PASSWORD_TOO_LONG: "密码太长，建议您的密码小于16个字符",
	ERROR_MALFORM_EMAIL: "请输入正确格式的邮箱",
	ERROR_MALFORM_EMAIL_TOO_SHORT: "邮件地址太短",
	ERROR_FORBIDDEN_EMAIL: "您输入电子邮箱的邮件服务商不能正常收取淘宝的系统邮件,推荐使用&lt;a href=&#39;http://mail.cn.yahoo.com/&#39; target=&#39;_blank&#39;&gt;雅虎邮箱&lt;/a&gt;",
	ERROR_DUP_EMAIL: "该电子邮箱已注册，请换用其他电子邮箱注册或用该电子邮箱<a href='https://login.taobao.com/member/login.jhtml' target='_blank'>登录</a>",
	ERROR_MALFORM_MOBILE: "该手机号码不存在",
	ERROR_CELLPHONE_WAP_SMS : "该手机号码已使用手机快速注册，请点击短信中的激活链接激活账号。",
	ERROR_CELLPHONE_EXISTED: "该手机号码已注册，请换用其他手机号码注册或用该手机号码<a href='https://login.taobao.com/member/login.jhtml' target='_blank'>登录</a>",
	ERROR_CELLPHONE_MEMBER_FANGKE_ERROR: "该手机号码已注册为访客，请换用其他手机号码注册或用该手机号码进行访客<a href='https://login.taobao.com/member/login.jhtml?tag=1' target='_blank'>登录</a>,,在账号管理中升级为淘宝会员。",
	ERROR_UNDERLINE: "&#20250;&#21592;&#21517;&#39318;&#20301;&#21644;&#26411;&#20301;&#19981;&#33021;&#26159;&#19979;&#21010;&#32447;'_'",
	ERROR_MALFORM_NICK_NAME: "会员名不能全为数字，或包含非法字符",
	ERROR_PASSWORD_LIKE_NICK: "您的登录密码与会员名过于相似，为了您的安全建议您更换密码",
	ERROR_BANNED_WORDS: "会员名包含非法字符",
	ERROR_EMAIL_BLACKLIST: "系统调整，暂不接受此网站邮箱注册，请尝试使用其他网站邮箱。" 
};

TRegister.INITDATA={
	userNameValidateUrl: "http://member1.taobao.com/member/check_nick.do?_input_charset=utf-8",
	passwordValidateUrl: "http://member1.taobao.com/member/check_password.do",
	checkCodeUrl: "http://pin.aliyun.com/get_img?identity=member1.taobao.com&amp;sessionid=2eb67e6248a24c9708c034977fa5c20b",
	changeCodeUrl: "http://pin.aliyun.com/get_img?identity=member1.taobao.com&amp;sessionid=2eb67e6248a24c9708c034977fa5c20b",
	audioCodeUrl:"http://pin.aliyun.com/get_audio?identity=member1.taobao.com&amp;sessionid=2eb67e6248a24c9708c034977fa5c20b"
}; 
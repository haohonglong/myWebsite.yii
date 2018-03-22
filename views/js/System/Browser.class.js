

(function(window,undefined,System){
	if(!System) {
		alert('without nothing the class of System');
		return 0;
	}
	var __this__=null;
	/**
	 *
	 * @author lhh
	 * 产品介绍：
	 * 创建日期：2014-12-30
	 * 修改日期：2014-12-30
	 * 名称：private (int) getExplorer
	 * 功能：判断浏览器种类
	 * 说明：返回值对照：1:chrome;
	 * 					 2:Firefox; 
	 * 					 3:ie; 
	 * 					 4:Safari;
	 * 					 5:Opera
	 * 					 0:Other
	 * 注意：
	 * @param   (void)
	 * Example：
	 */
	var getExplorer=function() {
		var explorer = window.navigator.userAgent ;
		//ie 
		if (explorer.indexOf("MSIE") >= 0) {
			return 3;
		}
		//firefox 
		else if (explorer.indexOf("Firefox") >= 0) {
			return 2;
		}
		//Chrome
		else if(explorer.indexOf("Chrome") >= 0){
			return 1;
		}
		//Opera
		else if(explorer.indexOf("Opera") >= 0){
			return 5;
		}
		//Safari
		else if(explorer.indexOf("Safari") >= 0){
			return 4;
		}else{
			return 0;
		}
	};
	function Browser(){
		System.Basis.extends.call(this,System.Helper);
		__this__=this;
		/*------------------------------*/
		
		this.close=null;
		
		



	}


	Browser.prototype = {
		'constructor':Browser,
		'__constructor':function(){},
		'getExplorer':function(){
			return getExplorer();
		},
		'where':function(){},
		'isIE':function(){
			return !!window.ActiveXObject;
			//简短
			//return !-[1,];
			//浏览器检测
			//return /MSIE/.test(navigator.userAgent);
		},
		'isIE6':function(){
			//if(!-[1,] && !window.XMLHttpRequest){
			if(this.isIE() && !window.XMLHttpRequest){
				return true;
			}else{
				return false;
			}
		},
		'isIE7':function(){
			if(this.isIE() && !this.isIE6() && !this.isIE8()){
				return true;
			}else{
				return false;
			}
		},
		'isIE8':function(){
			if(this.isIE() && !!document.documentMode){
				return true;
			}else{
				return false;
			}
		},
		'isFirefox':function(){
			return (2===getExplorer());
		},
		'isChrome':function(){
			return (1===getExplorer());
		},
		'isSafari':function(){
			return (4===getExplorer());
		},
		'isOpera':function(){
			return (5===getExplorer());
		},
		'innerSize':function(){//获取浏览器窗口视口宽度和高度
			return{
				width  : window.innerWidth  || document.documentElement.clientWidth,
				height : window.innerHeight || document.documentElement.clientHeight
			};
		},

		'fixEvt':function(e){//解决事件兼容问题
			return System.Basis.fixEvt(e);
		},
		'fixed':function(elem){//IE实现 css fixed
			this.setFixed($(elem));
		},
		'auto_center':function(pad,elem){
			this.autoScreenCenter($(elem),pad);
		},
		'showDialog':function(url){
			if(document.all){//IE   
			   feature="dialogWidth:300px;dialogHeight:200px;status:no;help:no";  
			   this.close=window.showModalDialog(url,null,feature);  
		   }else{  
			 //modeBrowserDialog可以将modal换成dialog=yes  
			   feature ="width=300,height=200,menubar=no,toolbar=no,location=no,";  
			   feature+="scrollbars=no,status=no,modal=yes";    
			   this.close=window.open(url,null,feature);  
		   }  
		},
		'showDialog_close':function(){
			if(this.close){
			   this.close.close();
		   	}  
			
		},
		'getDPI':function() {
	        var arrDPI = new Array;
	        if (window.screen.deviceXDPI) {
	            arrDPI[0] = window.screen.deviceXDPI;
	            arrDPI[1] = window.screen.deviceYDPI;
	        }
	        else {
	            var tmpNode = document.createElement("DIV");
	            tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
	            document.body.appendChild(tmpNode);
	            arrDPI[0] = parseInt(tmpNode.offsetWidth);
	            arrDPI[1] = parseInt(tmpNode.offsetHeight);
	            tmpNode.parentNode.removeChild(tmpNode);    
	        }
	        return arrDPI;
	    },
		/**
		 *
		 * @author lhh
		 * 产品介绍：析构方法
		 * 创建日期：2015-4-2
		 * 修改日期：2015-4-2
		 * 名称：destructor
		 * 功能：在注销Basis对象时调用此方法
		 * 说明：
		 * 注意：
		 * @return  ()						:
		 * Example：
		 */
		'destructor':function(){
			
		}
	},
	System.extends(Browser,System.Helper,1);
	System['Browser']=Browser;
})(window,undefined,window[LHH_NAMESPACE_20150715_]);


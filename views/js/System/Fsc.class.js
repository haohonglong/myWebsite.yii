(function(window, undefined,System){
    if(!System) {
		alert('without nothing the class of System');
		return 0;
	}
	var __this__=null;
	function Fsc(){

		System.Basis.extends.call(this);
		__this__=this;
		/*--------------------------------------------------------------------------------------------------*/
		
		this.fso=null;
		this.file=null;
	}
	Fsc.prototype = {
		'constructor':Fsc,
		'__constructor':function(){},
		'getXMLHttpRequest':function(a) {
			if (window.XMLHttpRequest && !("file:" === window.location.protocol && "ActiveXObject" in window)){ 
				return new XMLHttpRequest;
			}
			try {
				return new ActiveXObject("Microsoft.XMLHTTP")
			} catch (a) {
				return c.error("browser doesn't support AJAX."), null
			}
		},

		'cFsc':function(){
			if(ActiveXObject){//IE
				this.fso = new ActiveXObject("Scripting.FileSystemObject"); 
			}else{
				
			}
			return this.fso;
		},

		'createTextFile':function(fso,file){
			fso = fso || this.fclose;
			this.file=fso.CreateTextFile(file, true); 
			return this.file;
		},
		'writeLine':function(file,str,n){
			file =file || this.file;
			file.WriteLine(str);
			if(n){
				file.WriteBlankLines(n); //换行
			}
		},
		'fclose':function(file){
			file = file || this.file;
			file.close();
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

	};
	System.extends(Fsc,System.Basis,1);
	System['Fsc']=Fsc;
})(window,undefined,window[LHH_NAMESPACE_20150715_]);


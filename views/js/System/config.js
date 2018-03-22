/**
 * 创建人：lhh
 * 创建日期:2015/3/20	
 * 修改日期:2015/7/15	
 * 功能：配置文件
 * 说明 : 这个文件要copy到项目里面可以修改 'LHH_CLASSPATH_20150717_'里的属性 和 'LHH_NAMESPACE_20150715_';'LHH_NAMESPACE_20150717_' 的值；
 * 	      
 * note : 
 * 		  
 *		
 * 
 */
//基础类的设置
if(!LHH_NAMESPACE_20150715_){
	var LHH_NAMESPACE_20150715_='System';
}
var LHH_CLASSPATH_20150717_={
	'path':'../js/',
	'classpath':'system/',
	'getClasspath':function(){
		return this.path+this.classpath;
	}
};
//动态引入的设置
if(!LHH_NAMESPACE_20150717_){
    var LHH_NAMESPACE_20150717_='Load';
}
document.write('<script src="'+LHH_CLASSPATH_20150717_.getClasspath()+'Basis.class.js" type="text/javascript"><\/script>');
// document.write('<script src="'+LHH_CLASSPATH_20150717_.getClasspath()+'Dom.class.js" type="text/javascript"><\/script>');
document.write('<script src="'+LHH_CLASSPATH_20150717_.getClasspath()+'loadcommon.js" type="text/javascript"><\/script>');
var path=LHH_CLASSPATH_20150717_.path;


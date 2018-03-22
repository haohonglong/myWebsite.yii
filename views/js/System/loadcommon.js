/**
 * 
 * 创建人：龙昊宏
 * 创建日期：2014.9.9     
 * 修改日期：2015.7.17
 * 名称：loadcommon (加载公共文件)
 * 功能：动态引入js、css文件
 * 命名空间接口定义: var LHH_NAMESPACE_20150717_='interfaceName';
 * 命名空间接口调用: window[LHH_NAMESPACE_20150717_]  或者 window['interfaceName']
 * 说明 : 成员都是受保护的，不对外共享，如要在外面修改或者复写，都要通过接口。
 *        命名空间接口的设计是灵活的，修改接口名不影响库文件里的内核代码及类接口。
 *        命名空间接口设计的宗旨是:只要修改一处就可搞定一切与第三方插件的冲突。
 *        与第三方插件发生冲突时解决方法:  修改变量 'LHH_NAMESPACE_20150717_' 里的值 即可。'LHH_NAMESPACE_20150717_' 是命名空间接口的密钥 作用是定义命名空间。
 *        在'config.js'这个文件里配置
 *        'LHH_NAMESPACE_20150717_' 的设定要在'config.js'里设定,不要修改这里的 'LHH_NAMESPACE_20150717_' 的值。
 *        common文件夹的路径之后要改变的话，只要同时修改'config.js'配置中path的值就可以，不需要修改每一个HTML文件！这个文件含有两种方法这两种方法执行的效果不一样，目的都是同一个目的
 *        
 *  注意：这个没有服务器的情况下做静态页用，方便与公共文件路径的转移好一次性修改路径地址。 不能传至svn上！
 *  config.js中的调用方式:以下有两种方式根据具体情况任选一个,推荐用2
 *         动态引入的设置 1
               if(!CLASSPASS){
                  var CLASSPASS='../js/system/';
               }          
               if(!LHH_NAMESPACE_20150717_){
                  var LHH_NAMESPACE_20150717_='Load';
               }
              document.write('<script src="'+CLASSPASS+'loadcommon.js" type="text/javascript"><\/script>');
              var path="..";
 *
 *           
 *           
 *         动态引入的设置 2
               var path="../../../common";
               document.write('<script src="'+path+'/js/system/loadcommon.js" type="text/javascript"><\/script>');
 *
 * 页面调用方式：
          <script type="text/javascript" src="js/config.js"></script>
          window[LHH_NAMESPACE_20150717_]['Lib'].load({
                      'path':path,
                      'js':[
                            'jquery-1.7.1',
                            'lib.class',
                            'Tools.class'],
                      'css':[
                            'jquery.bxslider'
                            ]
                       });
          

 *
 * Copyright Software 
 * 
 * 
 */
if(!LHH_NAMESPACE_20150717_){
    var LHH_NAMESPACE_20150717_='System';
}

(function(window,undefined,namespace){
    var CMyDom=function(window,undefined,System){
        if(!System) {
            alert('without nothing the class of System');
            return 0;
        }
        var __this__=null;
        var MyDom=function(){
            System.Basis.extends.call(this,System.Dom,2);
            __this__=this;
        };

        MyDom.prototype = {
            'constructor':MyDom,
            '__constructor':function(){},
            
            'empty':function(){},
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
             * @return  ()                      :
             * Example：
             */
            'destructor':function(){
                
            }
            
        };
        System.extends(MyDom,System.Dom,1);
        // System['MyDom']=MyDom;
        return new MyDom();
    };

    var MySystem={};
    var dom=null;

    var head=document.getElementsByTagName('head')[0];
    var m=document.getElementsByTagName('meta');
    var s=document.getElementsByTagName('script');
    var l=document.getElementsByTagName('link');
    
    var initDom=function(){
        if(!dom){
            dom = CMyDom(window,undefined,window[LHH_NAMESPACE_20150715_]);
        }
    };
    var Lib={
        'path'   :'',
        'js'     :[],
        'css'    :[],
        'getPath':function(){
             /**
             * 
             * 创建人：龙昊宏
             * 名称：(void) getPath
             * 功能：把{global}替换成预设公共文件夹的路径 
             * 注意：loadcommon.js 文件要放在最下面
             *  创建日期：2014.9.10     
             *  修改日期：2014.9.10
             *  Example：
             *          <script type="text/javascript" src="{global}/js/lib.class.js"></script>
             *          <link href="{global}/css/global.css" type="text/css" rel="stylesheet" />
             * 
             *
             *  
             * 
             * 
             */
            var path=this.path;
            var reg=/{global}/;
            var i=0;
            for(i=0;i<s.length;i++){
                dom.attr(s[i],'src',dom.attr(s[i],'src').replace(reg,path));
                
            }

            for(i=0;i<l.length;i++){
                dom.attr(l[i],'href',dom.attr(l[i],'href').replace(reg,path));
            }
        },
        'load':function(lib){
            /**
             * 
             * 创建人：龙昊宏
             * 名称：(void) load
             * 功能：动态创建js,css 标签引入公共文件
             *  创建日期：2014.9.9     
             *  修改日期：2014.9.9
             *  说明：文件名不需要加后缀名！！！
             *  调用方式：
             *               window.System.L.load({
             *                   'js':['jquery']
             *               });
             *           
             *
             * Copyright Software 
             * 
             * 
             */
            var path=lib.path || this.path;
            var i=0;
            if(lib.js){
                for (i=0;i<lib.js.length;i++){
                    /*
                    var src=path+lib.js[i]+'.js';
                    var script=dom.createTag('script',{'src':src,type:'text/javascript'});
                    if(0 === i){
                        dom.insertBefore(script,head.firstChild);
                    }else{
                        dom.insertAfter(s[i-1],script);
                    }
                    */
                    document.write('<script src="'+path+lib.js[i]+'.js" type="text/javascript"><\/script>');
                }
            }

            if(lib.css){
                for (i=0;i<lib.css.length;i++){
                    /*
                    var href=path+lib.css[i]+'.css';
                    var css=dom.createTag('link',{'href':href,'type':'text/css','rel':'stylesheet'});
                    if(0 === i){
                        dom.insertAfter(s[s.length-1],css);
                    }else{
                        dom.insertAfter(l[i-1],css);
                    }
                    */

                    document.write('<link href="'+path+lib.css[i]+'.css" type="text/css" rel="stylesheet" \/>');   
                }
            }

            return path;
        }

    };
    
    window[namespace]=MySystem;
    window[namespace]['Lib']=Lib;

    //如果开启下面两个方法，必须要在config.js 里引入 Dom.class.js 文件
    // initDom();
    // Lib.getPath();
})(window,undefined,LHH_NAMESPACE_20150717_);


 

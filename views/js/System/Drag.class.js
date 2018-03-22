
/**
 * 创建日期：2014-10-18
 * 修改日期：2014-12-15
 * 修改说明：添加partial属性可以指定某个区域可以拖到，不填默认拖到出入的dom
 *           添加a_valuesOfMouseDrag属性可以存储鼠标拖动的距离集合
 *           在move方法中执行f_move这个回调方法传递一个参数，是时时返回每次拖拽时上下移动的数值
 *           2014-12-15
 *           添加了not_overflow方法用来限制拖拽时不能溢出限定范围外
 *           添加了limit属性用来限定拖拽范围，如果不设默认是拖拽的区域
 * 名称：Drag
 * 功能：1.自由拖拽
 *       2.鼠标点击某个区域 垂直滑动拖拽，或者水平滑动拖拽
 * 参数：(dom_node) dom,
 *       (Object)   init
 * Example:
 *          getElementById('node'),{
 *                              //拖拽方向
 *                              (String)    'coord':'x'
 *                              //允许拖拽的区域
 *                              (dom_node)  'arear': getElementById('node')
 *                              }
 *      
 * 
 */

(function(window,undefined,System){
    if(!System) {
        alert('without nothing the class of System');
        return 0;
    }
    var __this__=null;

    var limit=b_ovf=fixEvt=a_valueOfMouseDrag=null;
    //初始化限制范围左边和上边的溢出检测变量
    var L=T=0;

    var set_postion=function(dom){
        dom.style.position='absolute';
    };
    function Drag(dom,init){//实现鼠标拖动元素
        
        if(!dom) return this;

        System.Basis.extends.call(this,System.Helper);
        __this__=this;
        
        //初始化
        this.L=this.T=this.disX=this.disY=0;
        this.dom=dom;
        this.drag_=false;
        set_postion(this.dom);
        init = init || {};
        
        //记录鼠标拖动的距离集合
        a_valuesOfMouseDrag = [];
        //事件兼容类方法
        fixEvt = System.Basis.fixEvt;
        a_valueOfMouseDrag=null;
        
        this.init(init);

        

        
    }

    Drag.prototype = {
        'constructor':Drag,
        '__constructor':function(){},
        'init':function(init){
            if(!this.isEmptyObject(init)){
                this.arear      = init.arear        || null;
                this.coord      = init.coord        || null;
                this.noText     = init.noText       || null;
                this.sport      = init.sport        || null;
                this.f_start    = init.f_start      || null;
                this.f_end      = init.f_end        || null;
                this.f_move     = init.f_move       || null;
                this.partial    = init.partial      || this.dom;
                //限定拖拽的范围
                limit       = init.limit        || this.dom;
                //限定一个范围内不让溢出,true 是溢出
                b_ovf       = init.b_ovf        || false;
            }

            this.partial.onmousedown=function(e){
                __this__.drag_=true;
                __this__.fnDown(e);
                
                if(__this__.noText){//拖动时不选择里面的文字
                    return false;
                }
                
            };
        },
        
        


        
        'fnDown':function(e){
            e = fixEvt(e);
            this.disX = e.clientX - this.dom.offsetLeft;
            this.disY = e.clientY - this.dom.offsetTop;

            //保存鼠标点击下的xy坐标
            
            //设置捕获范围
            if(this.dom.setCapture){//鼠标按下去的时候全局捕获，兼容非标准浏览器
              this.dom.setCapture();
            }else if(window.captureEvents){
              window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
            e.stopPropagation(); 
            
            document.onmousemove=function(e){
                
                if(!__this__.drag_) return false;
                __this__.move(e);
            };
            document.onmouseup=function(){
                __this__.fnUp();

            };
        },

        
        //当鼠标移动时做的操作
        'move':function(e){
            e = fixEvt(e);
            L=this.L=e.clientX-this.disX;
            T=this.T=e.clientY-this.disY;
            
            a_valueOfMouseDrag=[L,T];


            //时时返回每次按住不松开移动时x,y数值(返回的是数组)
            if(this.isF(this.f_move)){
                this.f_move.call(this,a_valueOfMouseDrag);
            }
            
            //存储记录鼠标拖动的距离集合(这个数组长度非常大，取消下面注释启用这个功能)
            if(a_valueOfMouseDrag){
                //a_valuesOfMouseDrag.push(a_valueOfMouseDrag);
            }
            switch(this.coord){
                case 'x':
                    return this.move_level(e);
                break;
                case 'y':
                    return this.move_vertical(e);
                break;
                default://自由拖拽
                    this.free();
            }

            
        },
        //拖拽不要溢出到现在范围外
        'not_overflow':function(){
            if(L < 0){
                L = 0;
            }else if(L > document.documentElement.clientWidth  - limit.offsetWidth){
                L   =    document.documentElement.clientWidth  - limit.offsetWidth;
            }

            if(T < 0){
                T = 0;
            }else if(T > document.documentElement.clientHeight - limit.offsetHeight){
                T   =    document.documentElement.clientHeight - limit.offsetHeight;
            }
            return this;
        },
        'free':function(){
            if(!b_ovf){
                this.not_overflow();
            }
            
            this.dom.style.left = L+'px';
            this.dom.style.top  = T+'px';
            return this;
        },
        'move_level':function(){
            __this__.dom.style.left = L+'px';
            return this;
            
        },
        'move_vertical':function(){
            __this__.dom.style.top = T+'px';
            return this;
        },
        'fnUp':function(){
            __this__.drag_=false;
            
            //取消捕获范围
            //鼠标抬起时，取消浏览器拖拽默认事件  ，写到外面去，会没效果*****
           if(this.dom.releaseCapture){
              this.dom.releaseCapture();
           }else if(window.captureEvents){
              window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
           }

            document.onmousemove=null;
            document.onmouseup=null;

        },
        'get_mouse_moveto_value':function(){
            if(!a_valueOfMouseDrag){

            }
        },
        //获取每次拖拽时上下移动的数值集合,返回数组类型
        'a_getValuesOfMouseDrag':function(){
            return a_valuesOfMouseDrag;
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
         * @return  ()                      :
         * Example：
         */
        'destructor':function(){}
    };
    System.extends(Drag,System.Helper,1);
    System['Drag']=Drag;
    
})(window,undefined,window[LHH_NAMESPACE_20150715_]);

/**
 * 创建日期：2014-10-18
 * 修改日期：2014-10-22
 * 名称：Drag_xy
 * 功能：鼠标点击某个区域 垂直滑动拖拽，或者水平滑动拖拽
 * 参数：(dom_node) dom,
         (Object)   init
 * Example:
            new window.System.Drag_xy(document.getElementById("first"),{
                                                       'coord':'y',
                                                       'that':F,
                                                       'window_h':window_h,
                                                       'arear':$sidebar[0],//
                                                       'sport':sport//运动对象
                                                     });
 *      
 * 
 */
(function(window,$,undefined,System){
    if(!System) {
        alert('without nothing the class of System');
        return 0;
    }
    var __this__=null;

    var fixEvt=null;

    //是否到最后了
    var whetherToLast=function(coord,that){
        switch(coord){
            case 'x':
                if(that.dom.width <= that.window_w+Math.abs(that.dom.offsetLeft)){
                    return true;
                }else{
                    return false;
                }
            break;
            case 'y':
                if(that.dom.height <= that.window_h+Math.abs(that.dom.offsetTop)){
                    return true;
                }else{
                    return false;
                }
            break;
            default:
                
        }
        
    },
    //对横纵向判读：如果头部没东西了就把区域拉到开始位置，如果末尾没东西了就拉到最后一个的位置
    backTo=function(coord,that){
        switch(coord){
            case 'x':
                if(that.dom.offsetLeft>0){
                    that.sport.Animate(that.dom,{
                                            'left':0
                                        },30);

                    
                    that.dom.style.left=0;
                }else if(whetherToLast('x',that)){
                    //如果容器的宽度小于屏幕的宽度就把left 的值为0
                    if(that.dom.width > that.window_w){
                        that.sport.Animate(that.dom,{
                                             'left':-(that.dom.width-that.window_w)
                                         },30);

                    

                        that.dom.style.left=-(that.dom.width-that.window_w)+'px';
                    }else{
                        that.dom.style.left=0;
                        return false;
                    }

                    
                     
                }
            break;
            case 'y':
                if(that.dom.offsetTop>0){
                      that.sport.Animate(that.dom,{
                                             'top':0
                                         },30);

                    that.dom.style.top=0;
                }else if(whetherToLast('y',that)){
                    var window_h=that.window_h;
                    if(that.dom.height > window_h){
                        that.sport.Animate(that.dom,{
                                             'top':-(that.dom.height-window_h)
                                         },30);

                        that.dom.style.top=-(that.dom.height-window_h)+'px';
                    }else{
                        that.dom.style.top=0;
                        return false;
                    }
                    
                }
            break;
            default:
                
        }

    };
    function Drag_xy(dom,init){//实现鼠标拖动元素
        
        if(!dom  && !init.coord) return this;
        
        System.Basis.extends.call(this,System.Drag,2,[dom,init]);
        __this__=this;
        
        fixEvt = System.Basis.fixEvt;
        if(init.that) this.X=init.that;
        if(init.window_w) this.window_w=init.window_w;
        if(init.window_h) this.window_h=init.window_h;
    }

    Drag_xy.prototype = {
        'constructor':Drag_xy,
        '__constructor':function(){},
        'fnDown':function(e){
            e = fixEvt(e);
            this.disX = e.clientX - this.dom.offsetLeft;
            this.disY = e.clientY - this.dom.offsetTop;
            //设置捕获范围
            if(this.dom.setCapture){//鼠标按下去的时候全局捕获，兼容非标准浏览器
              this.dom.setCapture();
            }else if(window.captureEvents){
              window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
            e.stopPropagation(); 
            
            document.onmousemove=function(e){
                __this__.move(e);
            };
            
            document.onmouseup=function(){
               if(__this__.dom.width){
                   backTo('x',__this__);
                }

                if(__this__.dom.height){
                    backTo('y',__this__);
                   //竖向拖的横向操作防止移除窗口时的位置出现回不去的问题
                   var X=__this__.X;
                   if(X.dom.width){
                       backTo('x',X);
                    }
                       
                }
                __this__.fnUp();
            };
        },

        //垂直拖拽要做的事
        'move_vertical':function(e){
            var X=this.X;
            X.dom.disX = e.clientX - X.dom.offsetLeft;
            document.onmousemove=function(e){
                var t=e.clientY-__this__.disY;
                __this__.dom.style.top = t+'px';
                var l=e.clientX-X.dom.disX;
                X.dom.style.left = l+'px';
                

                var mouseup=function(){
                    if(X.dom.width){
                        backTo('x',X);
                        X.dom.onmouseup=null;
                        
                        //取消捕获范围
                        //鼠标抬起时，取消浏览器拖拽默认事件  ，写到外面去，会没效果*****
                       if(X.dom.releaseCapture){
                          X.dom.releaseCapture();
                       }else if(window.captureEvents){
                          window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
                       }

                       
                    }

                   if(__this__.arear){
                        __this__.arear.onmouseup = null;
                   }

                    //取消捕获范围
                    //鼠标抬起时，取消浏览器拖拽默认事件  ，写到外面去，会没效果*****
                    if(__this__.arear && __this__.arear.releaseCapture){
                      __this__.arear.releaseCapture();
                    }else if(window.captureEvents){
                      window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
                    }

                };

                if(__this__.arear){
                    __this__.arear.onmouseup = mouseup; 
                }
                
                X.dom.onmouseup=mouseup;

            };
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
         * @return  ()                      :
         * Example：
         */
        'destructor':function(){}
    };
    System.extends(Drag_xy,System.Drag,1);
    System['Drag_xy']=Drag_xy;
    
})(window,jQuery,undefined,window[LHH_NAMESPACE_20150715_]);






	$(function() {
		$('.level1menu').click(function() {
			$(this).next().toggle();
			return false;
		});

                
                var $childmenu=$('.childmenu li');
		$childmenu.click(function() {
                    $childmenu.removeClass('cur');
                    $(this).addClass('cur');
			
		});
		/*$('.childmenu').dblclick(function() {
			this.style.backgroundPosition="left";
			return true;
		});*/
		var moveInterval = 100;
		var moveHeight = 20;
		var upInterval;
		function bottomUp(){
			var marginTop = $('.midbg').css('margin-top');
			marginTop = +marginTop.substring(0,marginTop.length - 2);
			if(marginTop < 0){
				marginTop += moveHeight;
				$('.midbg').css('margin-top',marginTop+'px');
			}else{
				clearInterval(upInterval);
			}
			refreshScorllButton();
		}

		function bottomDown(){
			var marginTop = $('.midbg').css('margin-top');
			marginTop = marginTop.substring(0,marginTop.length - 2);
			marginTop = +marginTop;
			var navHeight = $('#main_menu').height();
			var menuHeight = $('.listexpander').height();
			if(menuHeight + marginTop +30> navHeight){
				marginTop -= moveHeight;
				$('.midbg').css('margin-top',marginTop+'px');
			}else{
				clearInterval(downInterval);
			}
			refreshScorllButton();
		}

		$("#bottomUp").hover(function(){
			upInterval = window.setInterval(function(){
				bottomUp();
			}, moveInterval);	
		},function(){
			clearInterval(upInterval);
		});
			
		var downInterval;
		$("#bottomDown").hover(function(){
			downInterval = window.setInterval(function(){
				bottomDown();
			}, moveInterval);	
		},function(){
			clearInterval(downInterval);
		});
		

		/*--------------------------------------------------------------------------------------------------------
		鼠标滚轮事件注册
		--------------------------------------------------------------------------------------------------------*/
		if ($('#main_menu')[0].addEventListener) {  //for firefox
		    $('#main_menu')[0].addEventListener("DOMMouseScroll", fnMouseWheel);
		}
		$('#main_menu')[0].onmousewheel = fnMouseWheel; // for other browser
		//鼠标滚轮事件处理函数
		function fnMouseWheel(e) {
		    var evt = e || window.event;
		    var wheelDelta = evt.wheelDelta || evt.detail; //鼠标滚动值，可由此判断鼠标滚动方向
		    if (wheelDelta == -120 || wheelDelta == 3 || wheelDelta < 0)
		       bottomDown();
		    else if (wheelDelta == 120 || wheelDelta == -3 || wheelDelta > 0)
		       bottomUp();
		}
		/*-------------------------------------------------------------------------------------------------------
		鼠标滚轮事件注册 END
		--------------------------------------------------------------------------------------------------------*/

		$('#main_menu').addClass('addLeftSide');
		$('.level1menu').click(function() {
			refreshScorllButton();
			return false;
		});
		
	});
	
	function refreshScorllButton(){
		var marginTop = $('.midbg').css('margin-top');
			marginTop = marginTop.substring(0,marginTop.length - 2);
			marginTop = +marginTop;
			var menuHeight=$('#main_menu').height();
			var menuInnerHeight=$('.listexpander').height();
			if(menuHeight<menuInnerHeight||marginTop<0){
				$('#main_menu').addClass('addLeftSide');
				$('#bottomUp').show();
				$('#bottomDown').show();
			}else{
				$('#main_menu').removeClass('addLeftSide');
				$('#bottomUp').hide();
				$('#bottomDown').hide();
			}	
	}
	
//	function changeCurrentMenu(menuid){
//		$(".childmenu").each(function(i){
//			   $(this)[0].style.backgroundPosition="left";
//		});
//		$(".childmenu[menuid="+menuid+"]")[0].style.backgroundPosition="right"; 
//	}
	
	 function resizecontrol(){
		var wrapper = $('#wrapper')[0];
		var rightmain= document.getElementById("main_content");
		var mainMenu= document.getElementById("main_menu");
		var header=document.getElementById("header");
		//var bluebar=document.getElementById("bluebar");
		var mainframe=document.getElementById("mainframe");
		//rightmain.style.width=document.body.offsetWidth-leftside.offsetWidth+"px";
		var footerHeight = 43;
		rightmain.style.height = document.body.offsetHeight-header.offsetHeight-footerHeight+"px";
		mainframe.style.height = rightmain.style.height;
		wrapper.style.width = document.body.offsetWidth + "px";
		rightmain.style.width = document.body.offsetWidth - mainMenu.offsetWidth-11+"px";
		//mainframe.style.width = rightmain.style.width;
		mainMenu.style.height = rightmain.style.height;
		//alert(document.body.offsetHeight+"|"+document.body.offsetWidth);
		refreshScorllButton();
	} 
	
	
	
	
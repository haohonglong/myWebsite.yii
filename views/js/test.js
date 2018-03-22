

function run(){
	
	var c=$('.content')[0],
		n=75;
	$('body').dblclick(function(){
		if(n>0 && n-6>0){
			var box=vido.printImg(n,n=n+6);
		}
		
		for(var i=0;i<box.length;i++){
			c.appendChild(box[i]);
			
		}	
	});
}





//===============================
function pList(){
	document.write('<li></li>');
}

function print_vido(){
	var a=arguments,len=a.length;
	var text=a[len-1]||"没有文字";
	document.write('<dl>');
		for(var i=0;i<len-1;i++){
			print_dd(a[i]);
		}
		document.write('<dt>');
			document.write(text);
		document.write('</dt>');
	document.write('</dl>');
}
function print_dd(content){
	document.write("<dd>");
	document.write(content);
	document.write("</dd>");
}



//============================================
 


/**
 * public void printImg(int s,int e);
 * s:input the start value
 * e:input the end value
 * output vido and image
 * 
 */
function printImg(s,e){
	//var i=1,j=k=l=0;//end=5,
		//main=document.getElementById("content"),
		
	//for(;i<=end;i++)
		//for(j=0;j<=end;j++)
			//for(k=0;k<=end;k++)
				for(var l=s;l<e;l++){
					print_vido(
					'<embed width="550" height="436" quality="high" name="caopn" id="caopn" allowfullscreen="true" allowscriptaccess="always" src="http://www.gan91.com/media/player/emgan91.swf?video_id='+l+'&hlnk=1" type="application/x-shockwave-flash" />',
					'<img src="http://www.cao71.com/media/videos/tmb/'+l+'/default.jpg" />',
					'<a target="_blank" href="http://www.cao71.com/media/player/jwconfig.php?vkey='+l+'" >http://www.cao71.com/media/player/jwconfig.php?vkey='+l+'</a>'
					);
				}
}



var vido={
	c_embed:function(url){
		var embed=document.createElement('embed');
		embed.setAttribute("width","550");
		embed.setAttribute("height","436");
		embed.setAttribute("quality","high");
		embed.setAttribute("name","caopn");
		embed.setAttribute("id","caopn");
		embed.setAttribute("allowfullscreen","true");
		embed.setAttribute("allowscriptaccess","always");
		embed.setAttribute("src",url);
		embed.setAttribute("title",url);
		embed.setAttribute("type","application/x-shockwave-flash");
		return embed;
	},
	c_img:function(url){
		var img=document.createElement('img');
		img.setAttribute("src",url);
		img.setAttribute("title",url);
		return img;
	},
	c_a:function(url){
		var a=document.createElement('a');
		a.setAttribute("target","_blank");
		a.setAttribute("href",url);
		a.setAttribute("title",url);
		var text=document.createTextNode(url);
		a.appendChild(text);
		return a;
	},
	print_vido:function(){
		var a=arguments,len=a.length;
		var text=a[len-1]||"没有文字";
		var box=[];
		var dl=document.createElement('dl');
			for(var i=0;i<len-1;i++){
				box.push(this.print_dd(a[i]));
			}
			var dt=document.createElement('dt');
			if("没有文字"==text) text=document.createTextNode(text);
			dt.appendChild(text);
			for(i=0;i<box.length;i++){
				dl.appendChild(box[i]);
			}
			dl.appendChild(dt);
			return dl;
	},
	print_dd:function(content){
		var dd=document.createElement('dd');
		dd.appendChild(content);
		return dd;
	},
	printImg:function(s,e,n){
		var n=n||1;
		//var i=1,j=k=l=0;//end=5,
		//main=document.getElementById("content"),
		var box=[];
		//for(;i<=end;i++)
			//for(j=0;j<=end;j++)
				//for(k=0;k<=end;k++)
					if(1==n){
						for(var l=s;l<e;l++){
							box.push(this.print_vido(
							this.c_embed("http://www.gan91.com/media/player/emgan91.swf?video_id="+l+"&hlnk=1"),
							this.c_img("http://www.cao71.com/media/videos/tmb/"+l+"/default.jpg"),
							this.c_a("http://www.cao71.com/media/player/jwconfig.php?vkey="+l)
							));
						}
					}else if(-1==n){
						for(var l=s;l>e;l--){
							box.push(this.print_vido(
							this.c_embed("http://www.gan91.com/media/player/emgan91.swf?video_id="+l+"&hlnk=1"),
							this.c_img("http://www.cao71.com/media/videos/tmb/"+l+"/default.jpg"),
							this.c_a("http://www.cao71.com/media/player/jwconfig.php?vkey="+l)
							));
						}
					}else{
						
					}
					
		return box;
	},
	pass:function(){
		var i=0;
		do{
			i++;
			if(i>1) window.close(); 
			var name=prompt("请输入密码,你只有一次机会","");
		}while(name!="setup");
	}
};

				
					
vido.pass();
jQuery(document).ready(function(){
	//run();
});				
				
			
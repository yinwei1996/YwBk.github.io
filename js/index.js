//函数封装调用层
	var pid=0;//记录点击的 id
	var headerstr=0;//记录头部导航栏的数据
	var overdiv=0;
//右键菜单调用
	var list=document.querySelector(".list");
	var elements={
		list:document.querySelector(".list"),
		menu:document.querySelector(".menu"),
		repetition:document.querySelector(".repetition"),
		header:document.querySelector(".header")
	};
	(function(){//右键显示菜单
		// var list = document.querySelector(".list");
			document.addEventListener("contextmenu",function (e){
					contextMenu(arr.menu.main,elements.list)
				;//右键菜单的渲染
				contextMenuClick(e);

			});
			// document.addEventListener("mouseup",function (e){
			// 		
			// });
			document.addEventListener("mousedown",function(e){//框选
				var alldiv=elements.menu.querySelectorAll("div");
					alldiv.forEach(function(eltm){
						eltm.classList.remove("active");
					});
				var activediv=elements.menu.querySelectorAll(".active");
					if(activediv.length==0){
						var startx=e.clientX;
						var starty=e.clientY;
						var div=document.createElement("div");
						div.className="bigdiv";
						div.style.top=starty+"px";
						div.style.left=startx+"px";
						document.body.appendChild(div);
						document.addEventListener("mousemove",move);
			document.addEventListener("mouseup",end);
			function move(e){	
				e.preventDefault();
				var width=Math.abs(e.clientX-startx);
				var height=Math.abs(e.clientY-starty);
					if(e.clientX-startx<0){
					var x=startx-width;
					div.style.left=x+"px";
					}
					if(e.clientY-starty<0){
					var y=starty-height;
					div.style.top=y+"px";
					}
				div.style.width=width+"px";
				div.style.height=height+"px";
				for (var i = 0; i < alldiv.length; i++) {
					if(getColl(div,alldiv[i])){
						alldiv[i].classList.add("active");
					}else{
						alldiv[i].classList.remove("active");
					}
				}

			}
			function end(){
				mouseClick();
				if(div){
					document.body.removeChild(div);
				}
					document.removeEventListener("mousemove",move);
					document.removeEventListener("mouseup",end);
			}
					}
			})	
	})();
	windowScale();//窗口缩放
	(function(){
		repetition();

	});//重命名时出现的弹窗的一些操作
			function dbclicktype (){//对上传文件双击之后 页面的 清除默认事件 使父级 不能被操作
			var dbclick=document.getElementsByClassName("dbclickdp")[0];
			var dbclickbtn=dbclick.getElementsByTagName("a")[0];
			console.log(dbclickbtn);
			dbclickbtn.addEventListener("click",function(){
				dbclick.style.display="none";
				dbclick.innerHTML='<a href="javascript:;">X</a>';
			})
				dbclick.addEventListener("contextmenu",function (e){
					e.preventDefault();
					e.stopPropagation();
				});
				dbclick.addEventListener("click",function (e){
					// alert(1);	
					e.preventDefault();
					e.stopPropagation();
				});
				dbclick.addEventListener("mousedown",function (e){
					// alert(1);	
					e.preventDefault();
					e.stopPropagation();
				});
		};
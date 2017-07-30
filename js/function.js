//函数封装
//右键菜单的dom渲染
function contextMenu(arr,list){
			list.innerHTML="";
			arr.forEach(function(eltm){ //arr arr.menu.main list代表右键显示的菜单
				var li=document.createElement("li");
				li.innerHTML=eltm.name;
				li.type=eltm.type;
				li.addEventListener("mousedown",listLiClcik[eltm.callbackname]);
				li.addEventListener("mouseover",function(e){
					e.stopPropagation();
					if(!li.children.length){//移入时判断当前li下是否有子集 避免重复喧染 添加子集
						var allli=li.parentNode.children;
							for (var i = 0; i < allli.length; i++) {
								var ul=allli[i].querySelector("ul");
									if(ul){
										allli[i].removeChild(ul);
									};
									allli[i].className="";
							}
						this.className="hover"
						if(eltm.children){
							var ul=document.createElement("ul");
							showChildlist(ul)
							li.appendChild(ul)
							contextMenu(eltm.children,ul);
						}
					}
						
				});
					list.appendChild(li);
					}
			);
};
//点击新建文件夹  当点击新建文件夹时就 创建一个数组 将同类型的文件存入 
	var listLiClcik={
		createFloder:function (e){
		e.preventDefault();
	//点击新建一个文件夹;
	    // var menu=document.querySelector(".menu");
		var filename="新建文件夹";
		var nameStr=getName(filename);//新建文件夹命名;
		if(pid==0){
			elements.menu.innerHTML='<div class="delet"><img src="message/trash.png"><p>回收站</p></div>';
		}
		else{
			elements.menu.innerHTML='';
		};
			data.push({//将新建的文件夹添加进存储文件数组的 data 数组中
				name:nameStr,
				id:data.length+1,
				pid:pid,
				type:this.type,
				show:true,
				date:Date.now(),
			});
			view();
			console.log(data)
		},
		createText:function (e){
		e.preventDefault();
		// var menu=document.querySelector(".menu");
		var ndiv=document.createElement("div");
		var filename="新建文本";
		var nameStr=getName(filename);//新建文件夹命名;
			data.push({//将新建的文件夹添加进存储文件数组的 data 数组中
				name:nameStr,
				id:data.length+1,
				pid:pid,
				type:this.type,
				show:true,
			});
			console.log(data);
			view();
			},
		open:function(e){
			var eltm=elements.list.eltm
				if(eltm.type=="text"){
					text:
					return;
				}
				pid=eltm.id;
				viewHeader();//喧染子视图
				view();
		},
		retnamenew:function(e){
			var eltm=elements.list.eltm;
			var p=overdiv.querySelector("p");
			p.focus();
		},
		delet:function(e){
			var allactive=elements.menu.querySelectorAll(".active");
			console.log(allactive);
				allactive.forEach(function(etm){
								elements.menu.removeChild(etm);
								data.forEach(function(data){
									if(data.id==etm.eltm.id){
										data.show=false;
									}
								});
							})
		},
		uploadingFile:function(e){
			e.stopPropagation();
			var file = document.querySelector('#file');
			console.log(file,this);
			file.click();
			file.onchange=function(e){
				var type=file.files[0].type.split("/")[0];
				switch(type) {
					case "image":
						create(file.files[0],type)
						break;
					case "video":
						create(file.files[0],type)
						break;
					case "audio":
						create(file.files[0],type)
						break;
					case "text":
						create(file.files[0],type)
						break;
				}
			};
			function create(files,mold){
				var reader = new FileReader();//reader获取的是什么？？
				console.log(mold)
				reader.onload = function(e){//当reader加载完成之后
					var onloadoff=true;
					//对新添加的 进行重命名检测
					// data.forEach(function(eltm){
						for (var i = 0; i < data.length; i++) {
							if(data[i].name==files.name && data[i].type==mold){
								if(data[i].show==true){
								onloadoff=false	
								}
								
							}		
						};
						console.log(data)
						if(onloadoff){
							data.push({
								name:files.name,
								id:data.length+1,
								pid:pid,
								type:mold,
								show:true,
								src:e.target.result,	
							})
						};
					view();
				};
				if(mold=="text"){
					reader.readAsText(files);
				}else{
					reader.readAsDataURL(files);
				}
				
			}
			mouseClick();
		},
		sortByName:function(){
			data.sort(function(a,b){
	// console.log(pinyin.getFullChars(a),pinyin.getFullChars(b));
	if(pinyin.getFullChars(a.name) > pinyin.getFullChars(b.name)){
		return 1;
	} 
	return -1;
})
			view();
		},
		sortByType:function(){
			data.sort(function(a,b){
				if(a.type==b.type){
					return -1;
				}else{
					return 1;
				}
			});
			view();
		}
};
		function view(){//根据数组 喧染视图
			if(pid==0){
			elements.menu.innerHTML='<div class="delet"><img src="message/trash.png"><p>回收站</p></div>';
		}else{
			elements.menu.innerHTML='';
		}
			data.forEach(function(eltm){
			if(!eltm.show){
				return;
			}
			if(eltm.pid==pid){
			var ndiv=document.createElement("div");
			ndiv.className=eltm.type;
			ndiv.eltm=eltm;
			ndiv.innerHTML='<span></span><p contenteditable>'+eltm.name+'</p>';	
			//ndiv的一些事件 添加
			ndiv.addEventListener("mouseover",function (e){
				e.stopPropagation();
				this.classList.add("mendivhover");
				overdiv=this;
			});
			ndiv.addEventListener("mouseout",function (e){
				e.stopPropagation();
				this.classList.remove("mendivhover");
			});
			//mousedown 开始 包含 
			ndiv.addEventListener("mousedown",function (e){
				e.stopPropagation();
				e.preventDefault();
				mouseClick();
				var start={
					x:e.clientX,
					y:e.clientY
				};
				var startdiv=[];
				var allactive=elements.menu.querySelectorAll(".active");
					var copydiv=[];
					var coptab=true;
					document.addEventListener("mousemove",move);
					function move(e){
						e.stopPropagation();
						e.preventDefault();
						// console.log(e.clientX-start.x)
						if(coptab&&(e.clientX-start.x)>10){
							if(allactive.length){
								console.log(e.clientX-start.x)
						for (var i = 0; i < allactive.length; i++) {
							copydiv.push(allactive[i].cloneNode(true));
						}
						for (var i = 0; i < copydiv.length; i++) {
							copydiv[i].style.zIndex=3;
							copydiv[i].classList.remove("active");
							elements.menu.appendChild(copydiv[i]);
							startdiv.push({
								x: css(copydiv[i],"left"),
								y: css(copydiv[i],"top"),
							});
						}
					};		
						coptab=false;
						}
						for (var i = 0; i < copydiv.length; i++) {
							var mve={
							x:e.clientX-start.x+startdiv[i].x,
							y:e.clientY-start.y+startdiv[i].y,
							};
							copydiv[i].style.zIndex=5;
							copydiv[i].classList.add("active");
							css(copydiv[i],"left",mve.x);
							css(copydiv[i],"top",mve.y);
						}
					};
					document.addEventListener("mouseup",end);
					function end(e){
						ndiv.removeEventListener("mouseup",ndivup);
						document.removeEventListener("mouseup",end);
						document.removeEventListener("mousemove",move);
						if(pid==0){
							// console.log(copydiv);
						for (var i = 0; i < copydiv.length; i++) {
							elements.menu.removeChild(copydiv[i]);
						};
						// console.log(copydiv);
						//碰撞检测 删除
						var delet=document.querySelector(".delet");
						var deletscope={
							x:css(delet,"width")+css(delet,"left"),
							y:css(delet,"height")+css(delet,"top")
						};
						// console.log(e.clientX,deletscope.x,e.clientY,deletscope)
						if(e.clientX<deletscope.x && e.clientY<deletscope.y&&pid==0){
							// console.log(1)
							allactive.forEach(function(etm){
								elements.menu.removeChild(etm);
								data.forEach(function(data){
									if(data.id==etm.eltm.id){
										data.show=false;
									}
								});
							})
						};
						};
					
						//循环判断 鼠标和新建文件夹的 碰撞 若 碰撞则修改 pid
						//获取没有被选中的 文件夹 
						var alldiv=elements.menu.querySelectorAll("div");
						var noactivediv=[];//没有被选中的div
						if (pid==0) {
							for (var i = 1; i < alldiv.length; i++) {
								if(!alldiv[i].classList.contains("active")){
									noactivediv.push(alldiv[i]);
								}
							};
						}else{
							for (var i = 0; i < alldiv.length; i++) {
								if(!alldiv[i].classList.contains("active")){
									noactivediv.push(alldiv[i]);
								}
							};
						}
						

							noactivediv.forEach(function(eltm){
								if((css(eltm,"width")+css(eltm,"left"))>e.clientX&&(css(eltm,"height")+css(eltm,"top"))>e.clientY){
									var childrendiv=data.filter(function (event){
										return event.pid==eltm.eltm.id;
									});
									allactive.forEach(function (event){
										if(childrendiv.length==0){
										data.forEach(function (data){//拖入文件夹的 重名检测 检测 被拖入的文件夹中的 名字 和 被拖入文件夹的 子文件 是否有重名的。
											if(data.id==event.eltm.id){
												data.pid=eltm.eltm.id;
											}
										})
										};
										childrendiv.forEach(function (cldevent){
											if(event.eltm.name==cldevent.name){
												var str='<p>该文件夹中已有'+event.eltm.name+'文件 请重命名</p><a href="javascript:;">确定</a>';
												var div=document.createElement("div");
												div.className="repetition";
												div.innerHTML=str;
												document.body.appendChild(div);
												var repetitionbtn=document.querySelector(".repetition a");
													repetitionbtn.onmousedown=function(e){
														e.stopPropagation();
													}
													repetitionbtn.onclick=function(e){
														e.stopPropagation();
														// console.log(1)
														document.body.removeChild(div);
													}
													
											}else{
												data.forEach(function (data){//拖入文件夹的 重名检测 检测 被拖入的文件夹中的 名字 和 被拖入文件夹的 子文件 是否有重名的。
											if(data.id==event.eltm.id){
												data.pid=eltm.eltm.id;
											}
										})
											}
										})
									})
								}
							});
							// console.log(noactivediv,data,pid)
							view();
					};
					ndiv.addEventListener("mouseup",ndivup);
					function ndivup(e){
						ndiv.removeEventListener("mouseup",ndivup);
						document.removeEventListener("mousemove",move);
						document.removeEventListener("mouseup",end);
						e.preventDefault();	
						e.stopPropagation();
						if(!e.ctrlKey&&e.button==0){
							var alldiv=elements.menu.querySelectorAll("div");
							alldiv.forEach(function(eltm){
								eltm.classList.remove("active");
							})
						};
						this.classList.add("active");

					};
			});

			//mousedown 结束
			ndiv.addEventListener("contextmenu",function (e){
				e.stopPropagation();
				e.preventDefault();
				elements.list.eltm=eltm;
				contextMenu(arr.menu.file,elements.list);
				contextMenuClick(e);
			})
			ndiv.addEventListener("dblclick",function (e){//双击事件 文件夹的
				console.log(2)
				if(eltm.type=="text"){	
				var dbclick=document.querySelector(".dbclickdp");
					dbclick.innerHTML+='<div id="text" width="600" height="400" controls></div>';
				var text=dbclick.querySelector("#text");
					text.innerHTML=eltm.src;
					dbclick.style.display="block";
					dbclicktype();
					return	
				};
				if(eltm.type=="image"){
//添加图片		
				console.log(1)
				var dbclick=document.querySelector(".dbclickdp");
				var image = new Image();
					image.src=eltm.src;
					dbclick.appendChild(image);
					dbclick.style.display="block";
					dbclicktype();
					return
				};
				if(eltm.type=="video"){
//添加视频		
				var dbclick=document.querySelector(".dbclickdp");
					dbclick.innerHTML+='<video id="video" width="600" height="400" controls></video>';
				var video=dbclick.querySelector("#video");
					video.src=eltm.src;
					video.play();
					dbclick.style.display="block";
					dbclicktype();
					return
				};
				if(eltm.type=="floor"){
					console.log(1)
					pid=eltm.id;
					viewHeader();//喧染子视图
					view();
					return
				};
					if(eltm.type=="audio"){
//添加视频		
				var dbclick=document.querySelector(".dbclickdp");
					dbclick.innerHTML+='<audio id="audio" width="600" height="400" controls></audio>';
				var audio=dbclick.querySelector("#audio");
					audio.src=eltm.src;
					audio.play();
					dbclick.style.display="block";
					dbclicktype();
					return
				};				
			});
			elements.menu.appendChild(ndiv);
			var p=ndiv.querySelector("p");
				p.addEventListener("focus",function(){
					p.focus();
					this.parentNode.classList.add("active");
				});
				p.addEventListener("mousedown",function(e){
					e.stopPropagation();
				});
				p.addEventListener("blur",function(){
					retname(p,eltm);
				});
				p.ondblclick=function(e){
					e.stopPropagation();
				}
			sort();	
		}
			})
		};//喧染视图结束
	
		function viewHeader(){
			//双击喧染导航视图
			sort();
			if(pid==0){
				elements.header.innerHTML="";
				elements.header.style.display="none";
				return;
			}
			var headerarr=[
				{
					name:"/",
					id:0,
				}
			];
			headerarr=headerarr.concat(getParents(pid));
			headerarr.push(getInfo(pid));
			elements.header.innerHTML="";
			headerarr.forEach(function(eltm,index){
				var a=document.createElement("a");
					a.href="javascript:;";
					a.innerHTML='<span> > </span>'+eltm.name;
					if(index==0){
					a.innerHTML=eltm.name;
					};
				elements.header.appendChild(a);
				a.ondblclick=function(){
					if(eltm.id==pid){
						return;
					};
					pid=eltm.id;
					console.log(pid);
					view();
					viewHeader();
				}
			})
			
			
		};


		function retname(p,eltm){//对文件 失去焦点是的 重命名检测 p：失去焦点的元素
					var pname=p.innerHTML;
					if(pname==""){
							p.focus();
							console.log(1);
						return
					}
					var onfftab=true;
					for (var i = 0; i < data.length; i++) {
						if(pname==data[i].name&&eltm.type==data[i].type&&eltm.id!=data[i].id&&eltm.pid==data[i].pid){
							var div=document.createElement("div");
							div.className="repetition";
							div.innerHTML='<p>您输入的名字重复请您重新输入</p><a href="javascript:;">确定</a>';
							document.body.appendChild(div);
							var repetitionbtn=document.querySelector(".repetition a");
								repetitionbtn.onmousedown=function(e){
									e.stopPropagation();
								}
								repetitionbtn.onclick=function(e){
									e.stopPropagation();
									console.log(1)
									document.body.removeChild(div);
									p.focus();
								}
								onfftab=false;
						};
					};
					if(onfftab){
						p.parentNode.classList.remove("active");
					}
					eltm.name=pname;
					p.innerHTML=pname;
					}
//右键显示菜单事件封装
	function contextMenuClick(e){
		e.preventDefault();
		e.stopPropagation();
		//右键显示
		var list = document.querySelector(".list");
		var x = e.clientX;
		var y = e.clientY;
		list.style.display = "block";
		//边界处理
		var maxX=document.documentElement.clientWidth-css(list,"width");
		var maxY=document.documentElement.clientHeight-css(list,"height");
		if(x>maxX){
			x=maxX
		};
		if(y>maxY){
			y=maxY;
		};
		list.style.left = x+"px";
		list.style.top = y+"px";	
	};
//右击菜单的移入移除显示子目录事件
	function showChildlist(ul){
		var maxX=document.documentElement.clientWidth-2*css(list,"width");
		var maxYx=document.documentElement.clientHeight-2*css(list,"height");
		var nowLeft=css(list,"left");
		var width=css(list,"width");
		if(nowLeft>maxX){
			ul.style.left=-width+"px";
		}else{
			ul.style.left=width-2+"px";
		}
		
	};
//鼠标点击事件
	function mouseClick(){
			elements.list.innerHTML="";
			list.style.display="none";
	}
//新建文件夹命名
	function getName(name){//新建文件夹命名
		var namearr=[];
		var filename=name;
		var nub=filename.length
		var menu=document.querySelector(".menu");
		var  ndiv=menu.querySelectorAll("div");
		for(var i=0;i<ndiv.length;i++){
			var p=ndiv[i].querySelector("p");
			var str=p.innerHTML;
			if(str.length==nub&&str==name){
				namearr.push(p.innerHTML);				
			}
			if(str.substr(0,nub)==name&&!isNaN(str.substring(nub))&&str.charAt(nub)!=0){
				namearr.push(p.innerHTML);
			}
		};
		//若删除之后新建文件夹 循环对存在新建文件进行排序夹命名的数组进行判断 数组中的新建文件夹后的数字与对应的i值不对应就 输出对应的；
		namearr.sort(function(a,b){
			return a.substring(nub)-b.substring(nub);
		});
		if(namearr[0]!=name){
			return filename
		};
		for (var i = 0; i < namearr.length; i++) {
			if(namearr[0]!=name){
				return filename=name;
			};
			if(namearr[i].substring(nub)!=(i+1)&&i!=0){
				return filename=name+(i+1);
			};
		};		
		return filename=name+(namearr.length+1);
};
//排序
	function sort(){
		var alldiv=document.querySelectorAll(".menu div");
		var divWidth=css(alldiv[0],"width")+5;
		var divHeight=css(alldiv[0],"height")+5;
		//换算一瓶屏可排多个
		var width=document.documentElement.clientWidth;
		var height=document.documentElement.clientHeight;
		elements.menu.style.top=0+"px";
		if(pid!=0){
		elements.header.style.display="block";
		elements.menu.style.top=css(elements.header,"height")+"px";
		var height=document.documentElement.clientHeight-css(elements.header,"height");
		}
		var maxYnub=Math.floor(height/divHeight);
		var maxXnub=Math.floor(width/divWidth);
		for (var i = 0; i < alldiv.length; i++) {
			alldiv[i].style.left=(Math.floor(i/maxYnub))*divWidth+7+"px";
			alldiv[i].style.top=(i%maxYnub)*divHeight+"px";
		}
	};
//窗口缩放
	function windowScale(){
		window.onresize=function(){
		sort();//窗口缩放时排序
		//窗口缩放时获取菜单的left top 值 
		var nowTop=list.offsetTop;
		var nowLeft=list.offsetLeft;
		var allUll=list.querySelectorAll("ul");
		//获取当前的页面宽高；
		var nowWidth=document.documentElement.clientWidth;
		var nowHeight=document.documentElement.clientHeight;
		var nowMaxLeft=nowWidth-css(list,"width");
		var nowMaxTop=nowHeight-css(list,"height");
		if(nowLeft>nowMaxLeft){
			list.style.left=nowMaxLeft+"px";
		}
		if(nowTop>nowMaxTop){
			list.style.top=nowMaxTop+"px";
		};
	};
	};
//碰撞检测
	function getColl(el,el2){
		var rect = el.getBoundingClientRect();
		var rect2 = el2.getBoundingClientRect();
		if(rect.top > rect2.bottom
		 ||rect.bottom < rect2.top
		 ||rect.left > rect2.right
		 ||rect.right < rect2.left){
			return false
		}
		return true;
	};

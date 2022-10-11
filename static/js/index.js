var app = new Vue({
    el:"#mainBox",
    data:{
		monthData: [
		    {
		        month: "2月",
		        data: [
		            // 总人数
		            [163, 282, 288, 244, 289, 304, 310, 261, 353, 314, 391, 273, 174, 257, 252, 200, 315, 284, 305, 324, 325, 187, 348, 365, 237, 254, 281, 167],
		            // 戴口罩人数
		            [161, 241, 250, 236, 257, 289, 216, 229, 291, 253, 293, 178, 169, 172, 248, 177, 271, 191, 242, 261, 276, 164, 270, 285, 166, 253, 227, 154],
		            // 没戴口罩人数
		            [2, 41, 38, 8, 32, 15, 94, 32, 62, 61, 98, 95, 5, 85, 4, 23, 44, 93, 63, 63, 49, 23, 78, 80, 71, 1, 54, 13]
		        ]
		    },
		    {
		        month: "3月",
		        data: [
		            // 总人数
		            [294, 257, 241, 304, 345, 208, 358, 288, 289, 330, 210, 250, 205, 353, 259, 271, 214, 345, 357, 159, 276, 206, 256, 337, 286, 239, 275, 374, 242, 234, 342],
		            // 戴口罩人数
		            [250, 202, 187, 256, 271, 185, 263, 235, 219, 244, 180, 226, 164, 284, 162, 183, 150, 290, 297, 156, 178, 182, 158, 264, 279, 225, 274, 278, 236, 228, 268],
		            // 没戴口罩人数
		            [44, 55, 54, 48, 74, 23, 95, 53, 70, 86, 30, 24, 41, 69, 97, 88, 64, 55, 60, 3, 98, 24, 98, 73, 7, 14, 1, 96, 6, 6, 74]
		        ]
		    }
		],
		waitingImgBg: "../static/images/waitingBg.png",
		uploadImgBg: "../static/images/uploadBg.png",
		param: {},
		config:{
			headers :{'Content-Type': 'multipart/form-data'}
		},
		baseUrl:"http://127.0.0.1:5000/"
    },
	computed:{
		"echartsConfigOption": function(){
			return {
				color: ["black", "lightgreen", "red"],
				tooltip: {
					trigger: "axis"
				},
				legend: {
					textStyle: {
						color: "#fffafa"
					},
					left: "10%"
				},
				grid: {
					containLabel: true,
					left: "3%",
					right: "4%",
					bottom: "0%"
				},
				toolbox: {
					show: true,
					feature: {
						mark: { show: true },
						dataView: { show: true, readOnly: false },
						restore: { show: true },
						saveAsImage: {
							show: true,
							name: "口罩佩戴人数统计"
						}
					}
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "26", "28", "29", "30", "31"],
					axisTick: {
						show: false
					},
					axisLabel: {
						color: "#fffafa"
					},
					axisLine: {
						show: false
					}
				},
				yAxis: {
					type: "value",
					axisTick: {
						show: false
					},
					axisLabel: {
						color: "#fffafa"
					},
					axisLine: {
						show: false
					},
					splitLine: {
						lineStyle: {
							color: "#012f4a"
						}
					}
				},
				series: [
					{
						name: "总人数",
						smooth: true,
						type: "line",
						data: this.monthData[1].data[0]
					},
					{
						name: "佩戴口罩人数",
						smooth: true,
						type: "line",
						data: this.monthData[1].data[1]
					},
					{
						name: "未佩戴口罩人数",
						smooth: true,
						type: "line",
						data: this.monthData[1].data[2]
					}
				]
			}
		}
	},
    methods:{
		togglePage(index, nextIndex, direction){
			// 如果不在第一屏，则给 .nav 一个 "new" 的类名
			if (nextIndex != 1) {
			    if (!$(".nav").hasClass("new")) {
			        $(".nav").addClass("new");
			    }
			} else {
			    if ($(".nav").hasClass("new")) {
			        $(".nav").removeClass("new");
			    }
			}

			if (nextIndex == 4){
			    let cover = document.querySelector(".cover")
			    setTimeout(()=>{
			        cover.style.opacity = "0";
			    }, 1000)
			}

			if (nextIndex == 3){
			    // setTimeout(()=>{
			    //     mainChart.setOption(option);
			    // }, 1000)
				this.configEcharts();
			}
		},
		// 配置fullpage
		configFullpage(){
			var that = this;
			$(function () {
			    $("#mainBox").fullpage({
			        sectionsColor: ['#bfdfe9', '#b2daeb', '#d4ebf2', "#f6eff6", '#bde2ee'],
			        verticalCentered: false,
			        navigation: true,
			        resize: false,
			        navigationTooltips: [
			            "首页",
			            "项目简介",
			            "数据展示",
			            "图片展示",
			            "上传检测"
			        ],
			        menu: ".nav",   // 给导航栏里的这些li标签添加一个活动类 active
			        anchors: ["firstPage", "secondPage", "thirdPage", "fourthPage", "fifthPage"],
			        onLeave: (index, nextIndex, direction) => {
			            // toggleNav(index, nextIndex, direction);
						// console.log(this);
						that.togglePage(index, nextIndex, direction);
			        }
			    })
			})
		},
		// 配置echarts
		configEcharts(){
			// 初始化echarts对象
			var mainChart = echarts.init(document.querySelector('.line .chart'));
			
			// 一秒后出现图表
			setTimeout(()=>{
				mainChart.setOption(this.echartsConfigOption);
			}, 1000)
			
			// 使图标自适应
			window.addEventListener("resize", function () {
			    mainChart.resize();
			})
			
			// 绑定点击切换不同月份数据事件
			var aList = document.querySelectorAll("h2 a");
			for (let j = 0; j < 2; j++) {
			    // 给每个a标签绑定点击事件
			    aList[j].onclick = () => {
			        // 点击后更换数据
			        for (let i = 0; i < 3; i++) {
			            this.echartsConfigOption.series[i].data = this.monthData[j].data[i]
			        }
			        mainChart.setOption(this.echartsConfigOption);
			    }
			}
		},
		showCurrentTime(){
			// 第三屏的动态时间
			var t = null;
			t = setTimeout(time, 1000); //开始运行
			function time() {
			    clearTimeout(t); //清除定时器
			    dt = new Date();
			    var y = dt.getFullYear();
			    var mt = dt.getMonth() + 1;
			    var day = dt.getDate();
			    var h = dt.getHours(); //获取时
			    var m = dt.getMinutes(); //获取分
			    var s = dt.getSeconds(); //获取秒
			    document.querySelector(".showTime").innerHTML =
			        "当前时间：" +
			        y +
			        "年" +
			        mt +
			        "月" +
			        day +
			        "日-" +
			        h +
			        "时" +
			        m +
			        "分" +
			        s +
			        "秒";
			    t = setTimeout(time, 1000); //设定定时器，循环运行
			}
		},
		previewImg() {
			var that = this;
			var file = document.getElementById("file");     // input标签
			var img = document.querySelector(".uploadImg");
			// 给input标签绑定事件
			file.onchange = function (event) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL(this.files[0]);
				fileReader.onload = function () {
					img.src = fileReader.result;

					img.style.cursor = "cell";  // 鼠标移上去改变光标形状
					// 点击放大功能
					img.onclick = function () {
						// 创建遮盖层
						let cover = document.createElement("div");
						// 创建预览img标签的DOM对象
						let largeImg = document.createElement("img");
						// 获取第五屏DOM对象
						let fifthPage = document.getElementById("five");
						cover.appendChild(largeImg);
						fifthPage.appendChild(cover);
						// 设置遮盖层的样式
						cover.style.height = "100%";
						cover.style.width = "100%";
						cover.style.position = "absolute";
						cover.style.left = "0";
						cover.style.top = "0";
						cover.style.backgroundColor = "#D3D3D3";
						cover.parentElement.parentElement.style.zIndex = "100";
						cover.className = "animated zoomIn";
						// 设置放大图的样式
						largeImg.src = img.src;
						largeImg.style.height = "580px";
						largeImg.style.width = "950px";
						largeImg.style.border = "8px solid white";
						largeImg.style.position = "absolute";
						largeImg.style.left = "50%";
						largeImg.style.top = "50%";
						largeImg.style.transform = "translate(-50%, -50%)";
						// 点击缩小，删除遮盖层
						cover.onclick = function () {
							this.parentElement.parentElement.style.zIndex = "0";
							this.className = "animated zoomOut";
							// 动画执行完再把遮盖曾删除
							setTimeout(() => {
								this.parentElement.removeChild(this);
							}, 500);
						};
					};

					// 获取图片数据，添加到表单对象中
					file = event.target.files[0]
					console.log(file);
					that.param.append("image", file, file.name);
					console.log(that.param.get("image"));
				};
			};
		},
		uploadImg(){
			var that = this;
			// let uploadBtn = document.querySelector(".upload");
			let uploadBtn = this.$refs.uploadBtn;
			// let uploadImg = document.querySelector(".uploadImg");
			let uploadImg = this.$refs.result;
			uploadBtn.onclick = () => {
				if (uploadImg.src != that.baseUrl + "static/images/uploadBg.png") {
					// let showImg = document.querySelector(".waitingImg");
					// showImg.src = "处理后的文件路径";
					axios.post(that.baseUrl + "upload", that.param, that.config).
					then((response) => {
						// 渲染图片
						console.log("success");
						console.log(response.data);
						this.waitingImgBg = response.data;
						
						let img = that.$refs.result;
						// 添加预览放大功能
						img.style.cursor = "cell";  // 鼠标移上去改变光标形状
						// 点击放大功能
						img.onclick = function () {
							// 创建遮盖层
							let cover = document.createElement("div");
							// 创建预览img标签的DOM对象
							let largeImg = document.createElement("img");
							// 获取第五屏DOM对象
							let fifthPage = document.getElementById("five");
							cover.appendChild(largeImg);
							fifthPage.appendChild(cover);
							// 设置遮盖层的样式
							cover.style.height = "100%";
							cover.style.width = "100%";
							cover.style.position = "absolute";
							cover.style.left = "0";
							cover.style.top = "0";
							cover.style.backgroundColor = "#D3D3D3";
							cover.parentElement.parentElement.style.zIndex = "100";
							cover.className = "animated zoomIn";
							// 设置放大图的样式
							largeImg.src = img.src;
							largeImg.style.height = "580px";
							largeImg.style.width = "950px";
							largeImg.style.border = "8px solid white";
							largeImg.style.position = "absolute";
							largeImg.style.left = "50%";
							largeImg.style.top = "50%";
							largeImg.style.transform = "translate(-50%, -50%)";
							// 点击缩小，删除遮盖层
							cover.onclick = function () {
								this.parentElement.parentElement.style.zIndex = "0";
								this.className = "animated zoomOut";
								// 动画执行完再把遮盖曾删除
								setTimeout(() => {
									this.parentElement.removeChild(this);
								}, 500);
							};
						};
					},(err) => {
						console.log(err);
					})
				}
			}
		}
    },
	mounted() {
		this.param = new FormData();
		this.configFullpage();
		this.showCurrentTime();
		this.previewImg();
		this.uploadImg();
	}
});
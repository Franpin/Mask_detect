var detailImageList = new Vue({
    el:".listWrapper",
    data:{
        rootEle:{},
		imgDomList:[],
		rowImgNum:4,	// 每行图片数
		baseUrl:"http://127.0.0.1:5000/",
        list:[]
    },
	computed:{
		// 需渲染的行数
		"rows":function(){
			if(this.list.length % this.rowImgNum == 0){
				return parseInt(this.list.length / this.rowImgNum);
			}else{
				return parseInt(this.list.length / this.rowImgNum) + 1;
			}
		}
	},
    methods:{
        getImageList(){
			axios.get(this.baseUrl + "list").then(
				(res) => {
					
					this.list = res.data;
					
					// 使用nextTick获取最新的DOM元素
					this.$nextTick(() => {
						// 获取图片DOM对象列表
						this.imgDomList = this.rootEle.children;
						
						// 给每行元素绑定动画
						for(let i = 0; i < this.imgDomList.length; i++){
							this.imgDomList[i].classList.add("show");
							this.imgDomList[i].style.animationDuration = 0.4 - i * 0.05 + "s";
							this.imgDomList[i].style.animationDelay = (i * 0.3) + "s";
						}
					})
				},
				(err) => {
					console.log(err);
				}
			)
		}
    },
    mounted(){
		// 获取Vue实例根元素
		this.rootEle = this.$el;

		// 获取图片列表
		this.getImageList();
		
    }
});
// 业务逻辑

// 获取url查询字符串
var id = getQueryString('id')
// console.log( id )// '2'  '5'

// 根据商品id获取数据
var datas = {} // 保存获取的到数据
for (var i = 0; i < detail.length; i++){
    if (detail[i].id === id) {
        datas = detail[i] // 要渲染的数据
        break // 立即结束循环
    }
}
// console.log( datas )// 要渲染的数据

// 路径导航
$('.navs a')[1].innerText = datas.titleparent[0]
$('.navs span').innerText = datas.titleparent[1]
$('.navs a')[1].href = './list.html?class='+datas.class

// 商品详情
$('.goods_msg h1').innerText = datas.title
$('.goods_msg h3').innerText = '￥ '+datas.price

var tmp1 = ''
datas.description.forEach(function (item){
    tmp1 += `<li>● ${item}</li>`
})
$('.goods_msg .center').innerHTML = tmp1

// 放大镜数据渲染
$('.big_img img').src = datas.imggood[0]
$('.right img').src = datas.imggood[0]

var tmp2 = ''
datas.imggood.forEach(function (item){
    tmp2 += `<img src="${item}" alt="">`
})
$('.small_img').innerHTML = tmp2
$('.small_img').firstElementChild.className = 'active'

// 产品概览
var tmp3 = ''
datas.imgds.forEach(function (item){
    tmp3 += `<img src="${item}" alt="">`
})
$('.detail_imgs').innerHTML = tmp3


// 缓存元素
var smallImgs = $('.small_img img') // 所有的小图标
var leftBigImg = $('.big_img img') // 左边大图
var rightBigImg = $('.right img') // 右边大图
var mask = $('.mask') // 半透明的蒙板
var right = $('.goods .right') // 右边大图的容器
var left = $('.big_img')  // 左边大图的容器

// 图片切换
var index = 0 // 当前选中图标的索引
for (var i = 0; i < smallImgs.length; i++) {
    // 记录每一个图标的索引
    smallImgs[i].index = i
    smallImgs[i].onclick = function (){
        // 1.去掉当前选中图标的选中状态
        smallImgs[index].className = ''
        // 2.给当前点击的图标添加选中状态
        this.className = 'active'
        // 3.更新当前选中图标的索引
        index = this.index
        // 4.修改左右边大图的src地址
        leftBigImg.src = this.src
        rightBigImg.src = this.src
    }
}

// mouseover/mouseout
// mouseenter/mouseleave

// 放大镜
left.onmouseenter = function (){
    mask.style.display = 'block'
    right.style.display = 'block'
}
left.onmouseleave = function (){
    mask.style.display = 'none'
    right.style.display = 'none'
}
left.onmousemove = function (e){
    // e.pageX/e.pageY 鼠标在页面中的坐标
    // e.clientX/e.clientY 鼠标在可视区中（视口）的坐标
    // e.offsetX/e.offsetY 鼠标在当前元素中的坐标

    // 计算maks的left/top值
    var mask_left = e.pageX - offset(left,true).left - mask.clientWidth/2
    var mask_top = e.pageY - offset(left,true).top - mask.clientHeight/2

    // 限制mask只能在左边容器中移动
    if (mask_left < 0){// left最小值
        mask_left = 0
    }
    if (mask_left > left.clientWidth-mask.clientWidth){// left最大值
        mask_left = left.clientWidth-mask.clientWidth
    }
    if (mask_top < 0){// top最小值
        mask_top = 0
    }
    if (mask_top > left.clientHeight-mask.clientHeight){// top最大值
        mask_top = left.clientHeight-mask.clientHeight
    }

    // mask跟随鼠标移动(改变定位)
    mask.style.left = mask_left + 'px'
    mask.style.top = mask_top + 'px'

    // 右边大图移动：
    // 1.mask（正数）和右边大图（负数）移动方向相反
    // 2.运动的比例相同（同时在起点，同时到达终点）
    var scaleX = mask_left / (left.clientWidth-mask.clientWidth)
    var scaleY = mask_top / (left.clientHeight-mask.clientHeight)

    // 计算右边大图的left和top
    var right_img_left = (rightBigImg.clientWidth - right.clientWidth) * scaleX
    var right_img_top = (rightBigImg.clientHeight - right.clientHeight) * scaleY

    // 修改右边大图的定位
    rightBigImg.style.left = -right_img_left + 'px'
    rightBigImg.style.top = -right_img_top + 'px'
}

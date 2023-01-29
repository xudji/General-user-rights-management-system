// 业务逻辑
// console.log( dataIndex )// 整个页面的数据

// 渲染头部通告
// console.log( dataIndex.notice )// 头部通告的数据
var tmp1 = ''
dataIndex.notice.forEach(function (item){
    // var newLi = document.createElement('li')
    // newLi.innerText = item
    // $('.notice .list').appendChild(newLi)

    tmp1 += `<li>${item}</li>`
})
$('.notice .list').innerHTML = tmp1

// 渲染头部分类导航
var tmp2 = ''
dataIndex.navs.forEach(function (item){
    tmp2 += `<li>
                <a href="./list.html?class=${item.class}">
                    <img src="${item.icon}" alt="">
                    <h3>${item.title}</h3>
                </a>
            </li>`
})
$('.header_nav').innerHTML = tmp2

// 渲染轮播图数据
var tmp3 = ''
var tmp4 = ''
dataIndex.banner.forEach(function (item,index){
    tmp3 += `<div style="background-image:url(${item.imgurl});"></div>`
    tmp4 += `<li>${index+1}</li>`
})
$('.banner .imgs').innerHTML = tmp3
$('.banner .pages').innerHTML = tmp4

// 渲染三个新品
var tmp5 = ''
dataIndex.Mavic.new.forEach(function (item){
    tmp5 += `<div class="box">
                <a href="./detail.html?id=${item.id}">
                    <img class="goods_img1" src="${item.imgbg1}" alt="">
                    <img class="goods_img2" src="${item.imgbg2}" alt="">
                    <img class="goods_img3" src="${item.imghover}" alt="">
                    <h1>${item.title}</h1>
                    <h5>${item.cnt}</h5>
                    <p>${item.description}</p>
                    <div>￥ ${item.price}</div>
                </a>
            </div>`
})
$('.new_goods').innerHTML = tmp5

// 渲染视频商品
var datas = dataIndex.Mavic.main
var tmp6 = `<a href="./detail.html?id=${datas.id}" class="left">
                <img src="${datas.imgurl}" alt="">
                <div>
                    <h3>${datas.title}</h3>
                    <p>${datas.description}</p>
                    <span>￥ ${datas.price}</span>
                </div>
            </a>
            <video class="right" src="${datas.video}" muted autoplay loop></video>`
$('.mavic-new').innerHTML = tmp6

// 渲染商品列表
var tmp7 = ''
dataIndex.Mavic.list.forEach(function (item){
    tmp7 += `<a href="./detail.html?id=${item.id}" class="item">
                <img src="${item.imgbg}" alt="">
                <h3>${item.title}</h3>
                <p>￥ ${item.price}</p>
                <div class="hover">
                    <img src="${item.imghover}" alt="">
                    <p>${item.description}</p>
                </div>
            </a>`
})
$('.list-wrap').innerHTML = tmp7

// 头部通告轮播效果
var list = $('.notice .list')
var li1 = list.firstElementChild // 第一个li元素
var cloneLi = li1.cloneNode(true) // 克隆第一个li元素

// 将克隆的li添加到list末尾
list.appendChild(cloneLi)

var lis = list.children // 所有li的元素集合
// console.log( lis.length )// 5
var index = 0 // 记录当前显示li的索引

autoPlay()// 进入页面自动播放

// 自动播放
function autoPlay(){
    // 每隔3秒播放一条通告
    setInterval(function (){
        move() // 播放下一条
    },3000)
}

// 播放下一条
function move(){
    var liHeight = li1.clientHeight // 一个li的高度
    // console.log( liHeight )// 40

    index++
    if (index >= lis.length) {
        index = 1 // 最后一条的下一条是第二条
        list.style.top = '0px'
    }
    animate(list,'top',-index*liHeight)
}

// 返回顶部效果
window.onscroll = function (){
    // 判断页面垂直滚动条的距离
    if (document.documentElement.scrollTop >= 1000) {
        // 显示返回顶部按钮
        $('.totop').style.display = 'block'
    } else {
        // 隐藏返回顶部按钮
        $('.totop').style.display = 'none'
    }
}
$('.totop').onclick = function (){
    animate(document.documentElement,'scrollTop',0)
}


// 轮播图-透明度
// 1.所有图片定位叠在一起，层级都一样为10
// 2.要显示的图片提高层级为20，其他图片层级恢复为10
// 3.所有图片初始透明度都设置为 0/0.1
// 4.初始状态为显示第一张图片（图片提高层级，小圆圈添加选中样式）

// 缓存元素
var divs = $('.imgs div')
var prev = $('.prev')
var next = $('.next')
var lis = $('.pages li')

var timer2 = null // 计时器id
var showIndex = 0 // 当前显示图片的索引

// 设置初始状态
divs[showIndex].className = 'show'
divs[showIndex].style.opacity = 1
lis[showIndex].className = 'active'

// 进入页面开启自动播放
autoPlay2()

// 自动播放函数
function autoPlay2(){
    // 每隔3秒播放下一张图片
    timer2 = setInterval(function (){
        moveNext() // 播放下一张图片
    },3000)
}

// 播放下一张图片函数
function moveNext(){
    // 1.当前显示图片恢复初始样式（层级和透明度）
    divs[showIndex].className = ''
    lis[showIndex].className = ''
    divs[showIndex].style.opacity = 0.1

    // 2.当前显示图片的索引自增
    showIndex++
    if (showIndex >= divs.length) {
        // 最后一张图片的下一张是第一张
        showIndex = 0
    }

    // 3.显示下一张图片
    divs[showIndex].className = 'show'
    lis[showIndex].className = 'active'
    // divs[showIndex].style.opacity = 1
    animate(divs[showIndex],'opacity',1)
}

// 播放上一张图片函数
function movePrev(){
    // 1.当前显示图片恢复初始样式（层级和透明度）
    divs[showIndex].className = ''
    lis[showIndex].className = ''
    divs[showIndex].style.opacity = 0.1

    // 2.当前显示图片的索引递减
    showIndex--
    if (showIndex < 0) {
        // 第一张图片的上一张是最后一张
        showIndex = divs.length-1
    }

    // 3.显示上一张图片
    divs[showIndex].className = 'show'
    lis[showIndex].className = 'active'
    // divs[showIndex].style.opacity = 1
    animate(divs[showIndex],'opacity',1)
}

// 点击 next 下一页
next.onclick = function (){
    clearInterval(timer2) // 停止自动播放
    moveNext() // 播放下一张图片
    autoPlay2() // 开启自动播放
}

// 点击 prev 上一页
prev.onclick = function (){
    clearInterval(timer2) // 停止自动播放
    movePrev() // 播放上一张图片
    autoPlay2() // 开启自动播放
}

// 点击 li 切换显示的图片
for (var i = 0; i < lis.length; i++) {
    lis[i].index = i
    // lis[0].index = 0
    // lis[1].index = 1
    // lis[2].index = 2
    lis[i].onclick = function (){
        clearInterval(timer2) // 停止自动播放

        // 1.当前显示图片恢复初始样式（层级和透明度）
        divs[showIndex].className = ''
        lis[showIndex].className = ''
        divs[showIndex].style.opacity = 0.1

        // 2.修改当前显示图片的索引
        showIndex = this.index

        // 3.显示点击的li和图片
        divs[showIndex].className = 'show'
        lis[showIndex].className = 'active'
        // divs[showIndex].style.opacity = 1
        animate(divs[showIndex],'opacity',1)
        
        autoPlay2() // 开启自动播放
    }
}
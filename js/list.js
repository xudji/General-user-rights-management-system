// 业务逻辑

// 渲染头部分类导航
var tmp1 = ''
dataList.navs.forEach(function (item){
    tmp1 += `<li>
                <a href="./list.html?class=${item.class}">
                    <img src="${item.icon}" alt="">
                    <h3>${item.title}</h3>
                </a>
            </li>`
})
$('.header_nav').innerHTML = tmp1

// 获取查询字符串class的值
var classn = getQueryString('class')
// console.log( classn )// 'Mavic'  'Osmo'

// 分类数据
var datas = dataList[classn]
// console.log( datas )// 分类数据

$('.banner .item').style.backgroundImage = `url(${datas.banner.bgimg})`
$('.banner .item h1').innerText = `${datas.banner.title}`
$('.mavic-head h1').innerText = `${datas.title}`

$('.mavic-new').innerHTML = `<a href="./detail.html?id=${datas.main.id}" class="left">
                            <img src="${datas.main.imgurl}" alt="">
                            <div>
                                <h3>${datas.main.title}</h3>
                                <p>${datas.main.description}</p>
                                <span>￥ ${datas.main.price}</span>
                            </div>
                            </a>
                            <img class="right" src="${datas.main.poster}">`

var tmp2 = ''
datas.list.forEach(function (item){
    tmp2 += `<a href="./detail.html?id=${item.id}" class="item">
                <img src="${item.imgurl}" alt="">
                <div>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span>￥ ${item.price}</span>
                </div>
            </a>`
})
$('.list-wrap').innerHTML = tmp2
        
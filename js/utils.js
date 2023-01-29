// 函数库

// 获取元素函数
function $1(selector){
    return document.querySelector(selector)
}
function $2(selector){
    return document.querySelectorAll(selector)
}
function $(selector){
    var dom = document.querySelectorAll(selector)
    if (dom.length === 1) {
        return dom[0]
    }
    else{
        return dom
    }
}

// 获取url查询字符串
function getQueryString(key){
    var str = location.search // 获取url中的查询字符串
    str = str.substr(1)// 去掉?号
    var arr1 = str.split('&')
    var res = null
    arr1.forEach(function (item,index){
        var arr2 = item.split('=')
        if (arr2[0] == key) {
            res = arr2[1]
        }
    })
    return res
}

// 获取元素在页面中的偏移
function offset(dom,bool){
    // dom = box
    var ofl = 0
    var oft = 0
    var bdl = dom.clientLeft
    var bdt = dom.clientTop
    while(dom){// dom -> box -> parent2 -> parent1 -> body -> null
        ofl += dom.clientLeft + dom.offsetLeft
        oft += dom.clientTop + dom.offsetTop
        dom = dom.offsetParent
    }
    // dom = null
    if (bool) {
        // 返回值包含元素自身的边框
        return {left: ofl, top: oft}
    } else {
        // 返回值不包含元素自身的边框
        return {left: ofl-bdl, top: oft-bdt}
    }
}

// 运动函数
function animate(dom,attr,target,callback){
    // 获取元素attr属性当前值
    if (attr === 'opacity') {
        var current = parseInt( getComputedStyle(dom)[attr] ) *100
        target *= 100
    }
    else if (attr === 'scrollLeft' || attr === 'scrollTop'){
        var current = dom[attr]
    }
    else {
        var current = parseInt( getComputedStyle(dom)[attr] ) // '568px' -> 568
    }

    clearInterval(dom.timer)
    dom.timer = setInterval(function (){
        // 持续改变速度（66.8  60.1  51.3  39.88 ...）
        var speed = (target - current)/10

        // 对象速度进行取整（速度不能为0，最小为1或-1）
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)

        // 当前位置累加速度
        current += speed

        // 运动停止条件：剩余运动量 <= 每次的运动量
        if (Math.abs(target - current) <= Math.abs(speed)) {
            // 到达目标位置
            if (attr === 'opacity') {
                dom.style[attr] = target/100
            }
            else if (attr === 'scrollLeft' || attr === 'scrollTop'){
                dom[attr] = target
            }
            else {
                dom.style[attr] = target + 'px'
            }

            // 清除计时器
            clearInterval(dom.timer)
            console.log( '到达目标位置。。。' )

            // 执行运动完成之后的回调函数
            // callback = typeof callback === 'function' ? callback : function (){}
            // callback()
            typeof callback === 'function' && callback()
            
        } else {
            // 未到达目标位置
            if (attr === 'opacity') {
                dom.style[attr] = current/100
            }
            else if (attr === 'scrollLeft' || attr === 'scrollTop'){
                dom[attr] = current
            }
            else {
                dom.style[attr] = current + 'px'
            }
        }
    },20)
}


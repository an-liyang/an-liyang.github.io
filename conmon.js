/**
 * Created by hangyouzi123 on 2016/9/13.
 */
/**
 * 获取除自己的其他所有兄弟节点
 * @param me me为一个变量  var me=document.getElementById("me");也就是子元素id
 * @returns {Array}将兄弟节点放入数组返回
 */
function getSbling(me){
//        找到父节点
    var parent=me.parentNode;
    var sons=parent.children;
    var sonsArr=[];
//        找到出自己的兄弟节点
    for (var i = 0; i <sons .length; i++) {
        if(sons[i]!=me){
            sonsArr.push(sons[i]);
        }
    }
    return sonsArr;
}
/**
 * 类名选择器函数，兼容IE6
 * @param cls 盒子类名
 * @returns {NodeList}
 */
function getClassName(cls){
//        检查是否可以使用类名选择器
    if(typeof document.getElementsByClassName =="function") {
        return document.getElementsByClassName(cls);
    }else{
//            IE兼容   首先获取页面所有函数，并将获取的类名放进一个数组
        var arryClass=[];
        var tags=document.body.className("*");
//            判断需要调用的类名是否存在并匹配
        for (var i = 0; i < tags.length; i++)
        {//如果一个标签不知有一个类进行完善

            var tamp=tags[i].className;
         //将标签类分割
            var  items=tamp.split(" ");
            //遍历每一个分割的类名是否和给定类名相等，如果等了跳出
            for (var j = 0; j < items.length; j++) {
                if(items[j]==cls){
                    arryClass.push(tags[i]);
                    break;
                }
            }
        }
        return arryClass;
    }
}
/**
 * 获取id的函数
 * @param id为页面唯一的元素
 * @returns {Element}
 */
function getId(id){
    return document.getElementById(id);
}
/**
 * 獲取非行間樣式，兼容問題函數
 * @param box為需要獲取的盒子
 * @param arrt 為屬性，如width ，height
 * @returns {*}
 */
function getStyle(box,arrt){
    if(box.currentStyle){
        return  box.currentStyle[arrt];
    }
    else{
        return getComputedStyle(box,null)[arrt];
    }
//return box.currentStyle?box.currentStyle[arrt]:getComputedStyle(box,null)[arrt]
}
/**
 * 獲取盒子純文本內容兼容性函數
 * @param box 盒子
 * @returns {盒子純文本內容}
 */
function getText(box){
    if(box.innerText){
        return box.innerText;
    }else{
        return box.textContent;
    }
}
/**
 * 封装运动函数
 * @param tag 盒子
 * @param target 运动到什么距离
 */
function animate(tag,target){
    clearInterval(tag.timer)
    tag.timer=setInterval(function(){
        var leader=tag.offsetLeft;
        var step=10;
        if(target<leader){
            step=-step;
        }
        if(Math.abs(target-leader)>Math.abs(step)){
            leader=leader+step;
            tag.style.left=leader+"px";
        }else{
            tag.style.left=target+"px";
            clearInterval(tag.timer);
        }
    },17)
}
/**
 * 加速
 * @param tag
 * @param target
 */
function animate1(tag, target){
    clearInterval(tag.timer);
    tag.timer=setInterval(function(){
        var leader=tag.offsetLeft;
        var step = (  target- leader ) / 10;
        step=(target-leader)>0?Math.ceil(step):Math.floor(step)
        leader = leader +  step;
        tag.style.left=leader+"px";
        if(leader==target){
            clearInterval(tag.timer);
        }
    },17)
}

function animateYun(tag,obj,fn){
    clearInterval(tag.timer);
    tag.timer=setInterval(function(){
        var flag=true;
        for( var k in obj){
            //透明度
            if(k== "opacity"){
                var leader=getStyle(tag,k)*100;
                var target=obj[k]*100;
                var step = 1;
                if(target<leader){
                    step=-step;
                }
                    leader = leader +  step;
                    tag.style[k]=leader/100;
                //层级设置
            }else if(k=="zIndex"){
                tag.style.zIndex=obj[k];
            }else{
                //正常属性
                var leader=parseInt(getStyle(tag,k))||0;
                var target=obj[k];
                var step = 10;
                if(target<leader){
                    step=-step;
                }
                if(Math.abs(target-leader)>Math.abs(step)){
                    leader=leader+step;
                    tag.style[k]=leader+"px";
                }else{
                    tag.style[k]=target+"px";
                }
            }
            //确定所有属性都已经到达指定位置
            if(leader!=target){
                flag=false;
            }
        }
        if(flag){
            //需要先清除，在执行回调
            clearInterval(tag.timer);
            //回调函数多个运动执行
            fn&&fn();
            //if(typeof fn=="function"){
            //    fn();
            //}
        }
    },17)

}
/**
 * 各种属性动画
 * @param tag
 * @param arr
 * @param target
 */
function animate2(tag,arr, target){
    clearInterval(tag.timer);
    tag.timer=setInterval(function(){
        var leader=parseInt(getStyle(tag,arr))||0;
        var step = (  target- leader ) / 10;
        step=(target-leader)>0?Math.ceil(step):Math.floor(step)
        leader = leader +  step;
        tag.style[arr]=leader+"px";
        if(leader==target){
            clearInterval(tag.timer);
        }
    },17)
}
/**
 * 渐入动画全
 * @param tag
 * @param obj
 */
function animate3(tag,obj,fn) {
    clearInterval(tag.timer);
    tag.timer=setInterval(function(){
        var flag=true;
        for( var k in obj){
            //透明度
            if(k== "opacity"){
                var leader=getStyle(tag,k)*100;
                var target=obj[k]*100;
                var step = (  target- leader ) / 10;
                step=(target-leader)>0?Math.ceil(step):Math.floor(step)
                leader = leader +  step;
                tag.style[k]=leader/100;
                //层级设置
            }else if(k=="zIndex"){
                tag.style.zIndex=obj[k];
            }else{
                //正常属性
                var leader=parseInt(getStyle(tag,k))||0;
                var target=obj[k];
                var step = (  target- leader ) / 10;
                step=(target-leader)>0?Math.ceil(step):Math.floor(step)
                leader = leader +  step;
                tag.style[k]=leader+"px";
            }
            //确定所有属性都已经到达指定位置
            if(leader!=target){
                flag=false;
            }
        }
        if(flag){
            //需要先清除，在执行回调
            clearInterval(tag.timer);
            //回调函数多个运动执行
            fn&&fn();
        //if(typeof fn=="function"){
        //    fn();
        //}
        }
    },17)
}
/**
 * 获取页面可视+滚动坐标
 * @param e
 * @returns {string}
 */
function getpageY(e){
    return myScroll().sTop+ e.clientY;
}

function getpageX(){
    return myScroll().sLeft+ e.clientX;
}

/**
 * 获取页面滚动属性，top和left
 * @returns {{}} 调用 box.top 和box.left
 */
function myScroll(){
    var obj={};
          obj.sTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
          obj.sLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    return obj;
    //return {top :window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    //    left:window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0}
}


function myClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}
/**
 * Created by hangyouzi123 on 2016/9/13.
 */
/**
 * ��ȡ���Լ������������ֵܽڵ�
 * @param me meΪһ������  var me=document.getElementById("me");Ҳ������Ԫ��id
 * @returns {Array}���ֵܽڵ�������鷵��
 */
function getSbling(me){
//        �ҵ����ڵ�
    var parent=me.parentNode;
    var sons=parent.children;
    var sonsArr=[];
//        �ҵ����Լ����ֵܽڵ�
    for (var i = 0; i <sons .length; i++) {
        if(sons[i]!=me){
            sonsArr.push(sons[i]);
        }
    }
    return sonsArr;
}
/**
 * ����ѡ��������������IE6
 * @param cls ��������
 * @returns {NodeList}
 */
function getClassName(cls){
//        ����Ƿ����ʹ������ѡ����
    if(typeof document.getElementsByClassName =="function") {
        return document.getElementsByClassName(cls);
    }else{
//            IE����   ���Ȼ�ȡҳ�����к�����������ȡ�������Ž�һ������
        var arryClass=[];
        var tags=document.body.className("*");
//            �ж���Ҫ���õ������Ƿ���ڲ�ƥ��
        for (var i = 0; i < tags.length; i++)
        {//���һ����ǩ��֪��һ�����������

            var tamp=tags[i].className;
         //����ǩ��ָ�
            var  items=tamp.split(" ");
            //����ÿһ���ָ�������Ƿ�͸���������ȣ������������
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
 * ��ȡid�ĺ���
 * @param idΪҳ��Ψһ��Ԫ��
 * @returns {Element}
 */
function getId(id){
    return document.getElementById(id);
}
/**
 * �@ȡ�����g��ʽ�����݆��}����
 * @param box����Ҫ�@ȡ�ĺ���
 * @param arrt ����ԣ���width ��height
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
 * �@ȡ���Ӽ��ı����ݼ����Ժ���
 * @param box ����
 * @returns {���Ӽ��ı�����}
 */
function getText(box){
    if(box.innerText){
        return box.innerText;
    }else{
        return box.textContent;
    }
}
/**
 * ��װ�˶�����
 * @param tag ����
 * @param target �˶���ʲô����
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
 * ����
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
            //͸����
            if(k== "opacity"){
                var leader=getStyle(tag,k)*100;
                var target=obj[k]*100;
                var step = 1;
                if(target<leader){
                    step=-step;
                }
                    leader = leader +  step;
                    tag.style[k]=leader/100;
                //�㼶����
            }else if(k=="zIndex"){
                tag.style.zIndex=obj[k];
            }else{
                //��������
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
            //ȷ���������Զ��Ѿ�����ָ��λ��
            if(leader!=target){
                flag=false;
            }
        }
        if(flag){
            //��Ҫ���������ִ�лص�
            clearInterval(tag.timer);
            //�ص���������˶�ִ��
            fn&&fn();
            //if(typeof fn=="function"){
            //    fn();
            //}
        }
    },17)

}
/**
 * �������Զ���
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
 * ���붯��ȫ
 * @param tag
 * @param obj
 */
function animate3(tag,obj,fn) {
    clearInterval(tag.timer);
    tag.timer=setInterval(function(){
        var flag=true;
        for( var k in obj){
            //͸����
            if(k== "opacity"){
                var leader=getStyle(tag,k)*100;
                var target=obj[k]*100;
                var step = (  target- leader ) / 10;
                step=(target-leader)>0?Math.ceil(step):Math.floor(step)
                leader = leader +  step;
                tag.style[k]=leader/100;
                //�㼶����
            }else if(k=="zIndex"){
                tag.style.zIndex=obj[k];
            }else{
                //��������
                var leader=parseInt(getStyle(tag,k))||0;
                var target=obj[k];
                var step = (  target- leader ) / 10;
                step=(target-leader)>0?Math.ceil(step):Math.floor(step)
                leader = leader +  step;
                tag.style[k]=leader+"px";
            }
            //ȷ���������Զ��Ѿ�����ָ��λ��
            if(leader!=target){
                flag=false;
            }
        }
        if(flag){
            //��Ҫ���������ִ�лص�
            clearInterval(tag.timer);
            //�ص���������˶�ִ��
            fn&&fn();
        //if(typeof fn=="function"){
        //    fn();
        //}
        }
    },17)
}
/**
 * ��ȡҳ�����+��������
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
 * ��ȡҳ��������ԣ�top��left
 * @returns {{}} ���� box.top ��box.left
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
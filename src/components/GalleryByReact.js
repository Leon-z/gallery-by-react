require('normalize.css/normalize.css');
require('styles/main.css');
import ReactDOM from 'react-dom';
import React from 'react';
import ImageFigure from './ImageFigure';
import ControllerUnit from './ControllerUnit';

//获取图片资源
var imageDatas = require('../data/imageDatas.json');


/**
 * [getImageUrl 利用自执行函数为数据添加URL信息]
 */
imageDatas=(function getImageUrl(imageDataArr) {
    for (var i = 0, j=imageDataArr.length;i<j;i++){
        var singImageData = imageDataArr[i];
        singImageData.imageUrl= require('../images/'+imageDataArr[i].fileName);
        imageDataArr[i]=singImageData;
    }
    return imageDataArr;
})(imageDatas);
/**
 * 获取区间内的随机数
 * @param  {[num]} low   [左区间]
 * @param  {[num]} hight [右区间]
 * @return {[num]}       [随机数]
 */
function getRangeRandom(low,hight) {
    return Math.round(Math.random()*(hight-low)+low);
}

//获取绝对值在0-30之间的数
function get30DegRandom() {
   return Math.random()>0.5?0-Math.round(Math.random()*30):Math.round(Math.random()*30);
}
var GalleryByReact = React.createClass({
    Constant:{
        centerPos:{
            left:0,
            top:0
        },
        hPosRange:{ //水平方向的取值范围
            leftSecX:[0,0],
            rightSecX:[0,0],
            y:[0,0]
        },
        vPosRange:{ //垂直方向上的取值范围
            x:[0,0],
            topY:[0,0]
        }
    },
    /**
     * 翻转图片
     * @param  {[type]} index 输入当前被执行翻转的图片的index
     * @return {Function}       返回一个闭包函数，期内return 一个真正待被执行函数
     */
    inverse:function (index) {
        return function() {
            var  imgsArrangeArr = this.state.imgsArrangeArr;
            imgsArrangeArr[index].isInverse=!imgsArrangeArr[index].isInverse;
            this.setState({
                imgsArrangeArr:imgsArrangeArr
            });
        }.bind(this);
    },
    //组件加载后为每张图片计算位置范围。
    componentDidMount() {
        //读取舞台大小
        var stageDOM=ReactDOM.findDOMNode(this.refs.stage),
            stageW=stageDOM.scrollWidth,
            stageH=stageDOM.scrollHeight,
            halfStageW=Math.ceil(stageW/2),
            halfStageH=Math.ceil(stageH/2);
        //拿到imgFigure的大小
        var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgFigureW=imgFigureDOM.scrollWidth,
            imgFigureH=imgFigureDOM.scrollHeight,
            halfImgFigureW=Math.ceil(imgFigureW/2),
            halfImgFigureH=Math.ceil(imgFigureH/2);
        //计算中心图片位置点
        this.Constant.centerPos={
            left:halfStageW-halfImgFigureW,
            top:halfStageH-halfImgFigureH
        }
        //计算左右两侧区图片排布域位置点
        this.Constant.hPosRange.leftSecX[0]=-halfImgFigureW;
        this.Constant.hPosRange.leftSecX[1]=halfStageW-halfImgFigureW * 3;

        this.Constant.hPosRange.rightSecX[0]=halfStageW+halfImgFigureW;
        this.Constant.hPosRange.rightSecX[1]=stageW-halfImgFigureW;

        this.Constant.hPosRange.y[0]=-halfImgFigureH;
        this.Constant.hPosRange.y[1]=stageH-halfImgFigureH;

        //计算上侧区域图片排布位置点
        this.Constant.vPosRange.topY[0]=-halfImgFigureH;
        this.Constant.vPosRange.topY[1]=halfStageH-halfImgFigureH * 3;
        this.Constant.vPosRange.x[0]=halfStageW-imgFigureW;
        this.Constant.vPosRange.x[1]=halfStageW;

        //初始化图片聚焦第一张
        this.rearrange(0);

    },
    /**
     * 重新布局所有图片
     * @param  {[node]} centerIndex [指定居中的图片]
     */
    rearrange:function (centerIndex) {
        var imgsArrangeArr =this.state.imgsArrangeArr,
            Constant=this.Constant,
            centerPos=Constant.centerPos,
            hPosRange=Constant.hPosRange,
            vPosRange=Constant.vPosRange,
            hPosRangeLeftSecX=hPosRange.leftSecX,
            hPosRangeRightSecX=hPosRange.rightSecX,
            hPosRangeY=hPosRange.y,
            vPosRangeTopY=vPosRange.topY,
            vPosRangeX=vPosRange.x,
            //存储布局在上侧区域的状态信息
            imgsArrangeTopArr=[],
            topImgNum=Math.floor(Math.random()*2),//取0个或者1个出现在上侧空间
            topImgSpliceIndex= 0 ,
            imgsArrangeCenterArr =imgsArrangeArr.splice(centerIndex,1);

        //首先居中
        imgsArrangeCenterArr[0]={
            pos:centerPos,
            rotate:0,
            isCenter:true
        }
        //取出要布局上侧的状态信息
        topImgSpliceIndex=Math.ceil(Math.random() * (imgsArrangeArr.length-topImgNum));
        imgsArrangeTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
        

        //布局上侧图片
        imgsArrangeTopArr.forEach(function (value,index) {
            imgsArrangeTopArr[index]={
                pos:{
                    left:getRangeRandom(vPosRangeX[0],vPosRangeX[1]),
                    top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1])
                },
                rotate:get30DegRandom(),
                isCenter:false
            }
            
        })
        //布局左右两侧图片
        for(var i=0,j=imgsArrangeArr.length,k=Math.ceil(j/2);i<j;i++){

            var hPosRangeLorR=null;


            //前半部分布局左边，后半部分布局右边
            if(i<k){
                hPosRangeLorR=hPosRangeLeftSecX;
            }else {
                hPosRangeLorR=hPosRangeRightSecX;
            }

            imgsArrangeArr[i]={
                pos:{
                    left:getRangeRandom(hPosRangeLorR[0],hPosRangeLorR[1]),
                    top:getRangeRandom(hPosRangeY[0],hPosRangeY[1])
                },
                rotate:get30DegRandom(),
                isCenter:false
            }
            
        }
        //重新合并回去imgsArrangeArr
        if(imgsArrangeTopArr&&imgsArrangeTopArr[0]){
            imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr:imgsArrangeArr
        })
    },
    center:function (index) {
        return function () {
            this.rearrange(index);
        }.bind(this);
    },
    getInitialState:function () {
        return{
            imgsArrangeArr:[
                /* {
                    pos:{
                        left:'0',
                        top:'0'
                    },
                    rotate:0//图片旋转角度
                    },
                    isInverse:false//控制图片正反面,
                    isCenter:false
                } */
            ]
        }
    },
    render: function() {
        // 为每个figure添加数据
        var controllerUnits =[],
            imgFigures=[];
            imageDatas.forEach(function (value,index) {
                if(!this.state.imgsArrangeArr[index]){
                    this.state.imgsArrangeArr[index]={
                        pos:{
                            left:0,
                            top:0
                        },
                        rotate:0,
                        isInverse:false,
                        isCenter:false
                    }
                }
                imgFigures.push(<ImageFigure data={value} ref={'imgFigure'+index} key={index} arrange={this.state.imgsArrangeArr[index]} center={this.center(index)} inverse={this.inverse(index)}/>);
                controllerUnits.push(<ControllerUnit arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
            }.bind(this))
        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
});




export default GalleryByReact;
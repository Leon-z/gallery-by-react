import React from 'react';
//控制组件
var ControllerUnit = React.createClass({
    handleClick:function (e) {
        //如果点击的是选中态的按钮，则翻转，否则居中
        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }
        e.preventDefault();
        e.stopPropagation();
    },
    render: function() {
        var ControllerUnitClassName='controller-unit';
        //对应居中图片的按钮显示居中态
        if(this.props.arrange.isCenter){
            ControllerUnitClassName+=' is-center';
            //居中的同时，图片已经翻转，则按钮变成翻转态
            if(this.props.arrange.isInverse){
                ControllerUnitClassName+=' is-verse';
            }
        }
        return (
            <span className={ControllerUnitClassName} onClick={this.handleClick}></span>
        );
    }
});
export default ControllerUnit;
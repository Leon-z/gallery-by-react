import React from 'react';
// 图片figure相关类
var ImageFigure =React.createClass({
    /**
     * imgFigure的点击处理函数
     */
    handleClick:function (e) {
        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();

    },
    render: function() {

        var styleObject ={

        }
        //如果pop属性中指定了图片位置则使用
        if(this.props.arrange.pos){
            styleObject=this.props.arrange.pos;
        }
        //如果图片的旋转角度有值且不为0 ，添加旋转角度
        if(this.props.arrange.rotate){
            var compatArr=['MozTransform','WebkitTransform','msTransform','transform'];
            compatArr.forEach(function (value) {
                styleObject[value]='rotate('+this.props.arrange.rotate+'deg)';
            }.bind(this));
            
        }
        if(this.props.arrange.isCenter){
            styleObject.zIndex=11;
        }
        var imgFigureClassName = 'img-figure';
        imgFigureClassName+=this.props.arrange.isInverse? ' is-inverse': '';

        return (
            <figure className={imgFigureClassName} style={styleObject} onClick={this.handleClick}>
                <img src={this.props.data.imageUrl} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>
                            {this.props.data.desc}
                        </p>
                    </div>
                </figcaption>
            </figure>
        );
    }
});

export default ImageFigure;
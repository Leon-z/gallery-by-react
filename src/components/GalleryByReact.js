require('normalize.css/normalize.css');
require('styles/main.css');

import React from 'react';

//获取图片资源
var imageDatas = require('../data/imageDatas.json');


/**
 * [getImageUrl 利用自执行函数为数据添加URL信息]
 */
imageDatas=(function getImageUrl(imageDataArr) {
    for (var i = 0, j=imageDataArr;length,i<j;i++){
        var singImageData = imageDataArr[i];
        singImageData.imageUrl= require('../images/'+singImageData.fileName);
        imageDataArr[i]=singImageData;
    }
    return imageDataArr;
})(imageDatas);

var GalleryByReact = React.createClass({
    render: function() {
        return (
            <section className="stage">
                <section className="img-sec">
                </section>
                <nav className="controller-nav">
                </nav>
            </section>
        );
    }
})



export default GalleryByReact;
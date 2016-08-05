require('normalize.css/normalize.css');
require('styles/main.css');
import React from 'react';
// 图片figure相关类
var ImageFigure =React.createClass({
    render: function() {
        return (
            <figure className="img-figure">
                <img src={this.props.data.imageUrl} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        );
    }
});

export default ImageFigure;
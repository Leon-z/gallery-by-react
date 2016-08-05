require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

//获取图片资源
// var imageDatas = require('../data/imageDatas.json');



  var Hello = React.createClass({
    getInitialState: function () {
      return {
        opacity: 1.0
      };
    },

    componentDidMount: function () {
      this.timer = setInterval(function () {
        var opacity = this.state.opacity;
        opacity -= .05;
        if (opacity < 0.1) {
          opacity = 1.0;
        }
        this.setState({
          opacity: opacity
        });
      }.bind(this), 100);
    },

    render: function () {
      return (
        <div style={{opacity: this.state.opacity}}>
          Hello {this.props.name}
        </div>
      );
    }
  });

  export default Hello;
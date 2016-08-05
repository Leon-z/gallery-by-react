require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

var MyTitle = React.createClass({
            propTypes:{
                title: React.PropTypes.string.isRequired,
            },
            render: function() {
                return (
                    <h2>{this.props.title}</h2>
                );
            }
        });
        
export default MyTitle;
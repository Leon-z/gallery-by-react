import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import MyTitle from './components/MyTitle';
import Hello from './components/Main';

// Render the main component into the dom
var data = 123;
ReactDOM.render(<MyTitle title= {data} />, document.getElementById('example'));
ReactDOM.render( <Hello name="Leon"/>, document.getElementById('example1'));

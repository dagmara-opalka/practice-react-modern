/* eslint-disable prettier/prettier */
// ./src/components/Div.js
import React from 'react';
import TextContext from './context';


function Div() {
    const { Consumer } = TextContext;
    return <Consumer>
        { context => <div>{ context }</div> }
    </Consumer>
    ;
};

export default Div;

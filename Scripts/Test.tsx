import React from "react";
import ReactDOM from "react-dom";

class Test extends React.Component
{
  state =
    {
      count: 0
    };

  render()
  {
    return <div>Hello World</div>;
  }
}

//const domContainer = document.getElementById('base');
//ReactDOM.render(React.createElement(App), domContainer);

export default Test;



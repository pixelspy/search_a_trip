import React,{ Component } 	from 'react';


class Triangle extends Component {
  style() {
    return {
      triangle: {
        "backgroundColor": "white",
        "content": ' ',
        "display": "block",
        "transform": "rotate(45deg)",
        "width": "20px",
        "height": "20px",
        "margin": "5px 0 0 5px",
        "marginLeft": "-50px",
        "position": "absolute"

        // "top": 305px; // 1st input
        // top: 355px; // 2nd input
        // top: 425px; // 3rd input
        // top: 470px; // 4th input
      },
    }
  }

  render() {
    let { triangle } = this.style();
    let { top,
       // display
     } = this.props;
    return(
      <div
        style={{...triangle,
        // display: display ? 'block' : 'none',
        top: top ? top : '305px',
      }}>
      </div>
    );
  }
}

export default Triangle;

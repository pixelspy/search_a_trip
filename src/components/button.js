import React,{ Component } 	from 'react';

class Button extends Component {
  render() {
    let { text } = this.props;
    return(
        <button className="btn_header header_text">{text}</button>
    );
  }
}
export default Button;

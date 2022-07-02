import React from 'react';
import './SelectBox.css';

const SelectBox = (props) => {
  console.log(props.onchange);
  let crypto = <div className="loader"></div>;
  if (props.currency) {
    const currency = [];
    for (let key in props.currency) {
      currency.push({...props.currency[key], id: key});
    }
    crypto = Object.keys(props.currency).map((igkey) => {
      return (
        <div className="option">
          <input
            className="s-c top"
            type="radio"
            name={props.currency}
            onChange={(e) => props.onchange(e, currency)}
            value={igkey}
          ></input>
          <input
            className="s-c bottom"
            type="radio"
            value={igkey}
            name={props.currency}
            onChange={(e) => props.onchange(e, currency)}
          ></input>
          <i className="fab fa-codepen"></i>
          <span className="label">{igkey}</span>
          <span className="opt-val">{igkey}</span>
        </div>
      );
    });
  }

  return (
    <div>
      <div id="info">CryptoCurrency Exchange</div>
      <form id="app-cover">
        <div id="select-box">
          <input type="checkbox" id="options-view-button"></input>
          <div id="select-button" className="brd">
            <div id="selected-value">
              <span>Select a Coin</span>
            </div>
            <div id="chevrons">
              <i className="fas fa-chevron-up"></i>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
          <div id="options">
            {crypto}

            <div id="option-bg"></div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SelectBox;

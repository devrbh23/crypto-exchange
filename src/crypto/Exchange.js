import React, { useState, useEffect } from "react";
import Axios from "axios";

import "../select/SelectBox.css";
const Exchange = () => {
  const [coinName, setCoinName] = useState({
    name: "",
    select: false,
  });
  const [coinList, setCoinList] = useState([]);
  const [coin, setCoin] = useState({
    currency: null,
    err: false,
  });

  useEffect(() => {
    Axios.get(
      "http://api.coinlayer.com/list?access_key=9d9243a589a55b841045a0c96a224af2"
    )
      .then((res) => {
        console.log(res);
        return setCoin({ ...coin, currency: res.data.crypto });
      })
      .catch((err) => {
        return setCoin({ err: err });
      });
  });

  const onchange = (e, coin) => {
    const coins = coin.filter((id) => {
      return id.id === e.target.value;
    });

    setCoinList([...coinList, ...coins]);
    setCoinName({ ...coinName, name: e.target.value, select: true });
  };

  let crypto = coin.err ? (
    <p>not loaded</p>
  ) : (
    <div className="loader">loading</div>
  );

  if (coin.currency) {
    const currency = [];
    for (let key in coin.currency) {
      currency.push({ ...coin.currency[key], id: key });
    }
    crypto = Object.keys(coin.currency).map((igkey) => {
      return (
        <div className="option">
          <input
            className="s-c top"
            type="radio"
            name={coin.currency}
            onChange={(e) => onchange(e, currency)}
            value={igkey}
          ></input>
          <span className="label">{igkey}</span>
        </div>
      );
    });
  }

  const fcoin = [];
  for (let key in coinList) {
    fcoin.push({ ...coinList[key] });
  }

  const coins = fcoin.map((ckey) => {
    return Object.keys(ckey).map((c) => {
      return (
        <li key={c} className="coinDetail">
          <span style={{ textTransform: "capitalize" }}>{c}</span>:{ckey[c]}
        </li>
      );
    });
  });

  return (
    <div>
      <div className="container">
        <div className="crypto">
          <p className="header">Crypto Currency</p>
          <span>Coin</span>:
          <form id="app-cover">
            <div id="select-box">
              <input type="checkbox" id="options-view-button"></input>
              <div id="select-button">
                <div id="selected-value">
                  {coinName.name ? coinName.name : <span>Select a Coin</span>}
                </div>
              </div>
              <div id="options">
                <div className="options2"> {crypto}</div>
              </div>
              )
            </div>
          </form>
          {coinName.select === true ? (
            <div className="coine">
              <div className="coines">{coins}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Exchange;

import React, {Component} from 'react';
import Axios from 'axios';
import SelectBox from '../select/SelectBox';

class Crypto extends Component {
  state = {
    currency: null,
    loading: true,
    err: false,
    coin: [],
    name: '',
  };

  componentDidMount() {
    Axios.get(
      'http://api.coinlayer.com/list?access_key=9d9243a589a55b841045a0c96a224af2'
    )
      .then((res) => {
        return this.setState({...this.state, currency: res.data.crypto});
      })
      .catch((err) => {
        return this.setState({err: err});
      });
  }

  onchange = (e, coin) => {
    const coins = coin.filter((id) => id.id === e.target.value);
    this.setState({
      ...this.state,
      name: e.target.value,
      coin: coins,
    });
  };

  render() {
    let crypto = this.state.err ? (
      <p>not loaded</p>
    ) : (
      <div className="loader">loading</div>
    );

    if (this.state.currency) {
      const currency = [];
      for (let key in this.state.currency) {
        currency.push({...this.state.currency[key], id: key});
      }
      crypto = (
        <select
          name={this.state.currency}
          onChange={(e) => this.onchange(e, currency)}
          style={{textTransform: 'capitalize'}}
        >
          {Object.keys(this.state.currency).map((igkey) => {
            return (
              <option
                key={igkey}
                style={{textTransform: 'capitalize'}}
                value={igkey}
              >
                {igkey}
              </option>
            );
          })}
        </select>
      );
    }
    const fcoin = [];
    for (let key in this.state.coin) {
      fcoin.push({...this.state.coin[key]});
    }

    const coin = fcoin.map((ckey) => {
      return Object.keys(ckey).map((c) => {
        return (
          <li key={c}>
            <span style={{textTransform: 'capitalize'}}>{c}</span>:{ckey[c]}
          </li>
        );
      });
    });

    return (
      <div className="container">
        <div className="crypto">
          <p>Crypto Currency</p>
          {/* <div> Coin:{crypto}</div> */}
          Coin:
          <SelectBox
            currency={this.state.currency}
            onchange={this.onchange}
          ></SelectBox>
          <p style={{textTransform: 'capitalize'}}>{this.state.name}</p>
          <p>{coin}</p>
        </div>
      </div>
    );
  }
}
export default Crypto;

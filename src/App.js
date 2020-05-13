import React, { Component } from "react";
var Twocheckout = require('2checkout-node');


class App extends Component {
  state = {
    sellerId: "901414869",
    publishableKey: "4C99D780-394F-4013-A079-BEFF3BF738A2",
    ccNo: "4000000000000002",
    expMonth: "12",
    expYear: "2020",
    cvv: "123",
    token:null
  };

  onSubmit = async() => {
    var payWithCard = data => {
      console.log(data.response.token.token);
      this.setState({token:data.response.token.token})
    };

    var error = error => {
      console.log(error);
    };

    window.TCO.loadPubKey("sandbox", () => {
      window.TCO.requestToken(payWithCard, error, "tcoCCForm");
    });
   
  };
  
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  Pay=()=>{
    console.log("pay is called")
    var tco = new Twocheckout({
      sellerId: "901414869",
      privateKey: "D0EBFCAD-C0AD-4B1F-974B-A1C5FD53FFF7",
      demo: true,                                             
      sandbox: true   
    
  });
  var params = {
      "merchantOrderId": "ABC",
      "token": this.state.token,
      "currency": "USD",
      "total": "10.00",
      "billingAddr": {
          "name": "Athar",
          "addrLine1": "123 Test St",
          "city": "Columbus",
          "state": "Ohio",
          "zipCode": "43123",
          "country": "USA",
          "email": "example@2co.com",
          "phoneNumber": "5555555555"
      }
  };
 console.log(params)
  tco.checkout.authorize(params, function (error, data) {
      if (error) {
          console.log(error.message);
      } else {
          console.log(JSON.stringify(data));
      }
  });
  }
  render() {
    return (
      <form id="tcoCCForm">
        <input id="sellerId" type="hidden" value={this.state.sellerId} />
        <input
          id="publishableKey"
          type="hidden"
          value={this.state.publishableKey}
        />
        <div>
          <label>
            <span>Card Number</span>
            <input
              id="ccNo"
              name="ccNo"
              type="text"
              value={this.state.ccNo}
              autoComplete="off"
              required
              onChange={e => this.change(e)}
            />
          </label>
        </div>
        <div>
          <label>
            <span>Expiration Date (MM/YYYY)</span>
            <input
              type="text"
              size="2"
              id="expMonth"
              name="expMonth"
              value={this.state.expMonth}
              required
              onChange={e => this.change(e)}
            />
          </label>
          <span> / </span>
          <input
            type="text"
            size="4"
            id="expYear"
            name="expYear"
            value={this.state.expYear}
            required
            onChange={e => this.change(e)}
          />
        </div>
        <div>
          <label>
            <span>CVC</span>
            <input
              id="cvv"
              name="cvv"
              type="text"
              value={this.state.cvv}
              autoComplete="off"
              required
              onChange={e => this.change(e)}
            />
          </label>
        </div>
        <button type="button" onClick={() => this.onSubmit()}>
          Submit
        </button>
        <button type="button" onClick={() => this.Pay()}>
         pay
        </button>
      </form>
    );
  }
}

export default App;
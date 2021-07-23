import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./App.css";

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      name: '', email: '', phone: '', message: '', loading: false, loadmsg: ''
    }
  }

  changeHandler = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  sendMail = async (ev) => {
    ev.preventDefault();

    const name = this.state.name;
    const phone = this.state.phone;
    const email = this.state.email;
    const message = this.state.message;

    this.setState({ loading: true })

    const data = { name, phone, email, message };

    console.log(data);

    axios.post('http://mailsender26.herokuapp.com/contact/send', data)
      .then(res => {
        console.log("sent data", res);
        if (res) {
          // alert('Message sent!');
          this.setState({
            name: '', phone: '', email: '', message: '', loading: false, loadmsg: "Email sent!\nThank You."
          })
        }
        return res.data;
      }).catch(err => {
        console.log(err);
        this.setState({ loading: false })
      })
  }

  loadOrShowmsg() {
    if (this.state.loading) {
      return (
        <center>Loading.......</center>
      )
    } else {
      return (
        <center>{this.state.loadmsg}</center>
      )
    }
  }

  componentDidMount() {
  }

  render() {

    return (

      <div className="App">
        <form onSubmit={this.sendMail.bind(this)} >

          <h2>RedPositive Contact Form</h2>

          <div className="field">
            <label>Full Name</label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.changeHandler.bind(this)}
              required
            />
          </div>

          <div className="field">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.changeHandler.bind(this)}
              required />
          </div>

          <div className="field">
            <label>Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={this.state.phone}
              onChange={this.changeHandler.bind(this)}
              required
              pattern="\d{10}" />
          </div>

          <div className="field">
            <label>Your message</label>
            <textarea
              name="message"
              value={this.state.message}
              onChange={this.changeHandler.bind(this)}
              rows="7"
              required
              maxLength="200"
            />
          </div>

          <button type="submit" > Send Message </button>

        </form>
        {
          this.loadOrShowmsg()
        }
      </div>

    );
  }
}

export default App;

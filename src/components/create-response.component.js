import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateResponse extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePast = this.onChangePast.bind(this);
    this.onChangeFuture = this.onChangeFuture.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      past: 0,
      future: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('https://wti-server.herokuapp.com/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePast(e) {
    this.setState({
      past: e.target.value
    });
  }

  onChangeFuture(e) {
    this.setState({
      future: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const response = {
      username: this.state.username,
      past: this.state.past,
      future: this.state.future,
      date: this.state.date,
    };

    console.log(response);

    axios.post('https://wti-server.herokuapp.com/response/add', response)
    .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Response Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>How do you feel compared to the last time you responded? (-1, 0, 1)</label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.past}
                onChange={this.onChangePast}
                />
          </div>
          <div className="form-group">
            <label>How do you think you will feel the next time you respond? (-1, 0, 1)</label>
            <input
                type="text"
                className="form-control"
                value={this.state.future}
                onChange={this.onChangeFuture}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Response Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

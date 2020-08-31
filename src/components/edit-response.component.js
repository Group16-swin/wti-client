import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditResponse extends Component {
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
    axios.get('http://localhost:5000/response/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          past: response.data.past,
          future: response.data.future,
          date: new Date(response.data.date)
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data.map(user => user.username) });
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

    axios.post('http://localhost:5000/response/update/'+this.props.match.params.id, response)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Response Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
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
            <label>Past: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.past}
                onChange={this.onChangePast}
                />
          </div>
          <div className="form-group">
            <label>Future: </label>
            <input
                type="text"
                className="form-control"
                value={this.state.future}
                onChange={this.onChangeFuture}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Response Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

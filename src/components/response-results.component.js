import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Response = props => (
  <tr>
    <td>{props.response._id}</td>
    <td>{props.response.week.toFixed(3)}</td>
    <td>{props.response.month.toFixed(3)}</td>
    <td>{props.response.year.toFixed(3)}</td>
  </tr>
)

export default class ResponseResults extends Component {

  constructor(props) {
    super(props);
    this.state = {response: []};
  }

  componentDidMount() {
    // console.log(this.props.match.params.id);
    axios.get('https://wti-server.herokuapp.com/response/wti/rr1')
     .then(response => {
       this.setState({ response: response.data });
     })
     .catch((error) => {
        console.log(error);
     })

  }

  responseList() {
    return this.state.response.map(currentResponse => {
      return <Response response={currentResponse} key={currentResponse._id}/>;
    })
  }

  render() {
    return (
      <div>
      <div>
        <h3>Calculated WTI</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Week</th>
              <th>Month</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            { this.responseList() }
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}

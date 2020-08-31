import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Response = props => (
  <tr>
    <td>{props.response.username}</td>
    <td>{props.response.past}</td>
    <td>{props.response.future}</td>
    <td>{props.response.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.response._id}>edit</Link> | <a href="#" onClick={() => { props.deleteResponse(props.response._id) }}>delete</a>
    </td>
  </tr>
)

export default class ResponseList extends Component {

  constructor(props) {
    super(props);
    this.deleteResponse = this.deleteResponse.bind(this);
    this.state = {response: []};
}

componentDidMount() {
  axios.get('http://localhost:5000/response/')
   .then(response => {
     this.setState({ response: response.data });
   })
   .catch((error) => {
      console.log(error);
   })
}

deleteResponse(id) {
  axios.delete('http://localhost:5000/response/'+id)
    .then(res => console.log(res.data));
  this.setState({
    response: this.state.response.filter(el => el._id !== id)
  })
}

responseList() {
  return this.state.response.map(currentResponse => {
    return <Response response={currentResponse} deleteResponse={this.deleteResponse} key={currentResponse._id}/>;
  })
}

  render() {
    return (
      <div>
      <div>
        <h3>Logged Responses</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Past</th>
              <th>Future</th>
              <th>Date</th>
              <th>Actions</th>
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

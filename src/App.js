import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';

class App extends Component {

  state = {
    employees: []
  }

  componentWillMount() {

    axios.get('http://127.0.0.1:8000/api/readAllEmp/').then((response) => {
      console.log(response);
      console.log(response.data);
      this.setState({
        employees : response.data
      })
    });
  }

  render() {
    let employees = this.state.employees.map((employee) => {
      return (
        <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>
              <Button color="success" size="sm" className="mr-2">Read</Button>
              <Button color="success" size="sm" className="mr-2">Update</Button>
              <Button color="danger" size="sm">Delete</Button>
            </td>
          </tr>
      )
    });

  return (
    <div className="App container">
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees}
        </tbody>
      </Table>
    </div>
  );
}
}

export default App;

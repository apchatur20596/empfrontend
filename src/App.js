import React, { Component } from 'react';
import axios from 'axios';
import { Label, Input, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table, Button } from 'reactstrap';

class App extends Component {

  state = {
    employees: [],
    newEmpData: {
      id:'',
      name:'',
      location:'',
      phno:'',
      email:'',
      joining_date:'',
      last_date:''
    },
    newEmpModal:false
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

  toggleNewEmpModal() {
    this.setState({
      newEmpModal: !this.state.newEmpModal
    });
  }

  addEmp() {
    axios.post('http://127.0.0.1:8000/api/createEmp/',this.state.newEmpData).then((response) => {
      console.log(response.data);
      console.log(response);

      let { employees } = this.state;
      employees.push(response.data);
      this.setState({employees, newEmpModal:false, newEmpData: {
        name:'',
        location:'',
        phone_number:'',
        email_id:'',
        joining:'',
        last:''
      }});

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

      <h1> Employee App </h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewEmpModal.bind(this)}> Add Employee </Button>
      <Modal isOpen={this.state.newEmpModal} toggle={this.toggleNewEmpModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewEmpModal.bind(this)}>
          Add new employee
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" type="text" value={this.state.newEmpData.name} onChange={(e) => {

              let { newEmpData } = this.state;

              newEmpData.name = e.target.value;

              this.setState({ newEmpData });

            }}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="location">Location</Label>
            <Input id="location" type="text" value={this.state.newEmpData.location} onChange={(e) => {

            let { newEmpData } = this.state;

            newEmpData.location = e.target.value;

            this.setState({ newEmpData });

            }}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="phone_number">Phone Number</Label>
            <Input id="phone_number" type="tel" value={this.state.newEmpData.phone_number} onChange={(e) => {

            let { newEmpData } = this.state;

            newEmpData.phone_number = e.target.value;

            this.setState({ newEmpData });

            }}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="email_id">Email</Label>
            <Input id="email_id" type="email" value={this.state.newEmpData.email_id} onChange={(e) => {

            let { newEmpData } = this.state;

            newEmpData.email_id = e.target.value;

            this.setState({ newEmpData });

            }}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="joining_date">Joining Date</Label>
            <Input id="joining_date" type="date" value={this.state.newEmpData.joining_date} onChange={(e) => {

            let { newEmpData } = this.state;

            newEmpData.joining_date = e.target.value;

            this.setState({ newEmpData });

            }}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="last_date">Last Date</Label>
            <Input id="last_date" type="date" value={this.state.newEmpData.last_date} onChange={(e) => {

            let { newEmpData } = this.state;

            newEmpData.last_date = e.target.value;

            this.setState({ newEmpData });

            }}></Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addEmp.bind(this)}>Add Employee</Button>
          <Button color="secondary" onClick={this.toggleNewEmpModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      


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

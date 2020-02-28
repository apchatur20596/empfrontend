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
      phone_number:'',
      email_id:'',
      joining_date:'',
      last_date:''
    },
    editEmpData: {
      id:'',
      name:'',
      location:'',
      phone_number:'',
      email_id:'',
      joining_date:'',
      last_date:''
    },
    readEmpData: {
      id:'',
      name:'',
      location:'',
      phone_number:'',
      email_id:'',
      joining_date:'',
      last_date:''
    },
    newEmpModal:false,
    editEmpModal:false,
    readEmpModal: false,
    delid:''

  }

  componentWillMount() {
    this.refresh();
  }

  refresh() {
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

  toggleEditEmpModal() {
    this.setState({
      editEmpModal: !this.state.editEmpModal
    });
  }

  toggleReadEmpModal() {
    this.setState({
      readEmpModal: !this.state.readEmpModal
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

  updateEmp() {
    axios.post('http://127.0.0.1:8000/api/updateEmp/'+this.state.editEmpModal.id, this.state.editEmpModal).then((response) => {
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

  editEmp(id, name, location, phone_number, email_id, joining_date, last_date) {
    

    this.setState({
      editEmpData: { id, name, location, phone_number, email_id, joining_date, last_date }, editEmpModal: ! this.state.editEmpModal
    });
  }

  readEmp (id, name, location, phone_number, email_id, joining_date, last_date) {
    this.setState({
      readEmpData: { id, name, location, phone_number, email_id, joining_date, last_date }, readEmpModal: ! this.state.editEmpModal
    });
  }

deleteEmp(id) {
  axios.delete('http://127.0.0.1:8000/api/deleteEmp/'+id).then((response)=> {
    this.refresh();
  });
}

  render() {
    let employees = this.state.employees.map((employee) => {
      return (
        <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>
              <Button color="success" size="sm" className="mr-2" onClick={this.readEmp.bind(this,employee.id, employee.name, employee.location, employee.phone_number,employee.email_id,employee.joining_date, employee.last_date )}>Read</Button>
              <Button color="success" size="sm" className="mr-2" onClick={this.editEmp.bind(this,employee.id, employee.name, employee.location, employee.phone_number,employee.email_id,employee.joining_date, employee.last_date)}>Update</Button>
              <Button color="danger" size="sm" onClick={this.deleteEmp.bind(this,employee.id)}>Delete</Button>
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


      <Modal isOpen={this.state.editEmpModal} toggle={this.toggleEditEmpModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditEmpModal.bind(this)}>
          Add new employee
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" type="text" value={this.state.editEmpData.name} onChange={(e) => {

              let { editEmpData } = this.state;

              editEmpData.name = e.target.value;

              this.setState({ editEmpData });

            }}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="location">Location</Label>
            <Input id="location" type="text" value={this.state.editEmpData.location} onChange={(e) => {

            let { editEmpData } = this.state;

            editEmpData.location = e.target.value;

            this.setState({ editEmpData });

            }}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="phone_number">Phone Number</Label>
            <Input id="phone_number" type="tel" value={this.state.editEmpData.phone_number} onChange={(e) => {

            let { editEmpData } = this.state;

            editEmpData.phone_number = e.target.value;

            this.setState({ editEmpData });

            }}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="email_id">Email</Label>
            <Input id="email_id" type="email" value={this.state.editEmpData.email_id} onChange={(e) => {

            let { editEmpData } = this.state;

            editEmpData.email_id = e.target.value;

            this.setState({ editEmpData });

            }}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="joining_date">Joining Date</Label>
            <Input id="joining_date" type="date" value={this.state.editEmpData.joining_date} onChange={(e) => {

            let { editEmpData } = this.state;

            editEmpData.joining_date = e.target.value;

            this.setState({ editEmpData });

            }}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="last_date">Last Date</Label>
            <Input id="last_date" type="date" value={this.state.editEmpData.last_date} onChange={(e) => {

            let { editEmpData } = this.state;

            editEmpData.last_date = e.target.value;

            this.setState({ editEmpData });

            }}></Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateEmp.bind(this)}>Update Employee</Button>
          <Button color="secondary" onClick={this.toggleEditEmpModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={this.state.readEmpModal} toggle={this.toggleReadEmpModal.bind(this)}>
        <ModalHeader toggle={this.toggleReadEmpModal.bind(this)}>
          Employee Details
        </ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Id</td>
                <td>{this.state.readEmpData.id}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{this.state.readEmpData.name}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{this.state.readEmpData.location}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>{this.state.readEmpData.phone_number}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.readEmpData.email_id}</td>
              </tr>
              <tr>
                <td>Joining Date</td>
                <td>{this.state.readEmpData.joining_date}</td>
              </tr>
              <tr>
                <td>Last Date</td>
                <td>{this.state.readEmpData.last_date}</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleReadEmpModal.bind(this)}>Cancel</Button>
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

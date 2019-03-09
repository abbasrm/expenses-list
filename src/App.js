import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './App.css';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TableExampleSimple from "./ExpTable";
import { TextField, FlatButton, Divider } from "material-ui"



class App extends Component {
  constructor(props) {
    super(props)
    let tasks = localStorage.getItem('storedTasks');

    this.state = {
      newTitle: "",
      newAmount: "",
      myExpList: tasks ? JSON.parse(tasks) : []

    }

  };


  onChangeTitle = (e, newV) => {
    this.setState({ newTitle: newV });
  };

  onChangeAmount = (e, newV) => {
    this.setState({ newAmount: newV });
  };

  updateLocalStorage(myExpList) {
    localStorage.setItem('storedTasks', JSON.stringify(myExpList));
  }

  onAddTrans() {
    let newTransaction;
    if (this.state.newAmount != "" && this.state.newTitle != "") {
      let latestId = this.state.myExpList.length + 1;
      newTransaction = {
        id: latestId,
        title: this.state.newTitle,
        amount: this.state.newAmount
      }
      let newExp = this.state.myExpList;
      newExp.push(newTransaction);
      this.setState({ myExpList: newExp })
      this.updateLocalStorage(newExp);

    }
  };
  remove = (id) => {
    let expListToRemove = this.state.myExpList;
    expListToRemove.map((value, index) => {
      if (index === id) {
        //let x = expListToRemove.indexOf(value);
        expListToRemove.splice(id, 1);
      }
    })
    this.setState({ myExpList: expListToRemove });
    this.updateLocalStorage(expListToRemove);
  }

  getSum = () => {
    let sum = 0;
    for (let i = 0; i < this.state.myExpList.length; i++) {
      sum = Number(this.state.myExpList[i].amount) + sum;

    }
    let num = Number(sum);
    let roundedString = num.toFixed(2);
    let rounded = Number(roundedString);
    return rounded;
  }

  gerEur = () => {
    let sum = 0;
    for (let i = 0; i < this.state.myExpList.length; i++) {
      sum = Number(this.state.myExpList[i].amount) + sum;
    }
    sum = sum / 4.382;
    let num = Number(sum);
    let roundedString = num.toFixed(2);
    let rounded = Number(roundedString);
    return rounded;
  }

  round = (index) => {
    let num = Number(index);
    let roundedString = num.toFixed(2);
    let rounded = Number(roundedString);
    return rounded;
  }
  //<TextField fullWidth={true}  floatingLabelText={"Title of transaction"} onChange={this.onChangeTitle} />
  // errorText="Error: At least 5 characters allowed!"
  render() {
    return (
      <MuiThemeProvider>
        <TextField fullWidth={true} minlength="5" floatingLabelText={"Title of transaction"} onChange={this.onChangeTitle} />
        <Divider />
        <TextField fullWidth={true} floatingLabelText={"Amount in PLN"} onChange={this.onChangeAmount} />
        <Divider />
        <FlatButton className='btn' onClick={this.onAddTrans.bind(this)} primary={true} label={"Add"} />
        <div className='tbl center'>
          <TableExampleSimple className="center" myExp={this.state.myExpList} remove={this.remove} round={this.round} />
        </div>
        <Divider />
        <p><b>Sum: {this.getSum()} PLN ({this.gerEur()} EUR)</b></p>
      </MuiThemeProvider>
    );
  }
}

export default App;

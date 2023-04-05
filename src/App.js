import { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    screen: 0,
    calculation: "",
  };

  handleAC() {
    this.setState({
      screen: 0,
      calculation: "",
      total: 0,
    });
  }

  replaceLastOperator(str, value) {
    const lastChar = str.charAt(str.length - 1);
    if ((lastChar === "*" || lastChar === "+" || lastChar === "/") && (value !=="-")) {
      return str.slice(0, -1) + value;
    } else {
      return str + value;
    }
  }

  handleValueChange(value) {
    if (this.state.calculation === "" && value === "0") { return;}
    if (this.state.calculation.includes(".") && value === ".") { return;}

    let newValue = this.state.screen > 0 ? this.state.screen + value : value;  
    let newCalculation = this.state.calculation !== "" ? this.state.calculation + value : value;
    
    this.setState({
      screen: newValue,
      calculation: newCalculation, //need to concatenate each received value
    });
  }

  handleOperatorChange(value) {
    
    let newCalculation = this.state.calculation.includes("=") ? this.state.total + value : this.replaceLastOperator(this.state.calculation, value);

    this.setState({
      calculation: newCalculation,
      screen: value,
    });
  }

  handleTotalBtn() {
    let newTotal = eval(this.state.calculation);
    let newCalc = `${this.state.calculation}=${newTotal}`;

    this.setState({
      calculation: newCalc,
      screen: newTotal,
      total: newTotal,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <div id="displaysm">
            <span>{this.state.calculation}</span>
          </div>
          <div id="display">
            <span>{this.state.screen}</span>
          </div>
          <div className="operator" id="clear" onClick={() => this.handleAC()}>
            AC
          </div>
          <div className="operator" id="divide" onClick={() => this.handleOperatorChange("/")}>
            /
          </div>
          <div className="operator" id="multiply" onClick={() => this.handleOperatorChange("*")}>
            x
          </div>
          <div className="number" onClick={() => this.handleValueChange("7")} id="seven">
            7
          </div>
          <div className="number" onClick={() => this.handleValueChange("8")} id="eight">
            8
          </div>
          <div className="number" onClick={() => this.handleValueChange("9")} id="nine">
            9
          </div>
          <div className="operator" id="substract" onClick={() => this.handleOperatorChange("-")}>
            -
          </div>
          <div className="number" onClick={() => this.handleValueChange("4")} id="four">
            4
          </div>
          <div className="number" onClick={() => this.handleValueChange("5")} id="five">
            5
          </div>
          <div className="number" onClick={() => this.handleValueChange("6")} id="six">
            6
          </div>
          <div className="operator" id="add" onClick={() => this.handleOperatorChange("+")}>
            +
          </div>
          <div className="number" onClick={() => this.handleValueChange("1")} id="one">
            1
          </div>
          <div className="number" onClick={() => this.handleValueChange("2")} id="two">
            2
          </div>
          <div className="number" onClick={() => this.handleValueChange("3")} id="three">
            3
          </div>
          <div className="operator" onClick={() => this.handleTotalBtn()} id="equals">
            =
          </div>
          <div className="number" onClick={() => this.handleValueChange("0")} id="zero">
            0
          </div>
          <div className="number" onClick={() => this.handleValueChange(".")} id="decimal">
            .
          </div>
        </div>
      </div>
    );
  }
}

export default App;

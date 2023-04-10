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
    if ((lastChar === "*" || lastChar === "+" || lastChar === "/") && value !== "-") {
      return str.slice(0, -1) + value;
    } else {
      return str + value;
    }
  }

  handleValueChange(value) {
    if (this.state.calculation === "" && value === "0") {
      return;
    }

    const match = this.state.calculation.match(/(?:[\+\-\*\/]\s*)?(\d+(?:\.\d+)?)(?=\s*$)/);
    if (match) {
      const num = parseFloat(match[1]);
      const hasDecimal = num % 1 !== 0;
      console.log(num); // 23.6
      console.log(hasDecimal); // true

      if (hasDecimal && value === ".") {
        return;
      }
    }

    let newValue = this.state.screen > 0 || this.state.calculation.endsWith(".") ? this.state.screen + value : value;

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
    let newTotal = this.calculate(this.state.calculation);
    let newCalc = `${this.state.calculation}=${newTotal}`;

    this.setState({
      calculation: newCalc,
      screen: newTotal,
      total: newTotal,
    });
  }

  calculate(expression) {
    const terms = expression
      .split(/([+\-*/])/g)
      .filter(Boolean)
      .map((term) => term.trim());
    console.log("estos son los terminos", terms);
    let result = 0;
    let operator = "+";

    terms.forEach((term, index, arr) => {

      if ((term === "-") && (isNaN(arr[index-1])) && (!isNaN(arr[index+1])))  {
        terms[index+1] = "-" + arr[index+1];
        terms.splice(index,1)
       

      }

      console.log(terms);

    })
    

    terms.forEach((term, index, arr) => {
      if (["+", "-", "/", "*"].includes(term)) {
        operator = term;
      } else {
        let number = parseFloat(term);
        if (operator === "+") {
          result += number;
        } else if (operator === "-") {
            result -= number;
        } else if (operator === "/") {
          result /= number;
        } else if (operator === "*") {
          result *= number;
        }
      }
    });

    return result;
  }

  componentDidUpdate() {
    //if a decimal is entered when there's only a 0
    if (this.state.calculation === ".") {
      this.setState({
        screen: "0.",
        calculation: "0.",
      });
    }

    //if a decimal is entered when there's already another in last position
    if (this.state.calculation.endsWith("..")) {
      let newValue = this.state.calculation.slice(0, -1);
      let newScreen = this.state.screen.slice(0, -1);
      this.setState({
        screen: newScreen,
        calculation: newValue,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <div id="displaysm"> {this.state.calculation} </div>
          <div id="display"> {this.state.screen} </div>
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
          <div className="operator" id="subtract" onClick={() => this.handleOperatorChange("-")}>
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

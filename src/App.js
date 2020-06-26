import React from 'react';

class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			currentNumber: "0",
			expression: undefined,
			checkOperator: false,
			checkMinus: false
		}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(event) {
		const {currentNumber, expression, checkOperator, checkMinus} = this.state;
		const { innerText } = event.target;

		if(!Number.isNaN(Number(innerText))){
			if(currentNumber === "0"){
				this.setState({
					currentNumber: innerText,
					expression: innerText
				})
				}else{
				this.setState({
					currentNumber: currentNumber + innerText,
					expression: expression + innerText,
					checkOperator: false,
					checkMinus: false
				})
			}
		} else{
			switch(innerText){
				case "C":
					this.setState({
						currentNumber: "0",
						expression: undefined,
						checkMinus: false
					})
					break
				case ".":
					if(!currentNumber.includes(".")){
						this.setState({
							currentNumber: currentNumber + innerText,
							expression: expression + innerText,
							checkMinust: false
						})
					}
					break
				case "=":
					const result = eval(expression).toString()
					this.setState({
						currentNumber: result,
						expression: result,
						checkMinus: false
					})
					break
				default: {
					if(!checkOperator){
						this.setState({
							currentNumber: innerText,
							expression: expression + innerText,
							checkOperator: true,
							checkMinust: false
						})
					}else {
						if(innerText !== "-" && !checkMinus){
							const shortenedExpression = expression.slice(0,-1)
							this.setState({
								currentNumber: innerText,
								expression: shortenedExpression + innerText
							})
						}else if(!checkMinus) {
							this.setState({
								currentNumber: innerText,
								expression: expression + innerText,
								checkMinus: true
							})
						}else{
							const shortenedExpression = expression.slice(0,-2)
							this.setState({
								currentNumber: innerText,
								expression: shortenedExpression + innerText
							})
						}
					}
				}
			}
		}
	}
		


	render() {
		const containerStyle ={
			minHeight: "100vh",
			backgroundColor: "rgb(0, 0, 0, 0.1)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		}

		const calculatorStyle = {
			width: 400,
			border: "1px solid black",
			padding: 5,
			backgroundColor: "#efefef",
			borderRadius: 5
		}

		const inputFieldStyle = {
			backgroundColor: "rgb(0, 0, 0, 0.6)",
			borderRadius: 5,
			padding: 10
		}

		const inputStyle = {
			width: "98%",
			fontSize: 60,
			borderRadius: 5,
			textAlign: "right",
			height: 60,
			overflow: "hidden"
		}

		const buttonFieldStyle = {
			display: "grid",
			gridTemplateColumns: "1fr 1fr 1fr 1fr",
			padding: 20,
			gridGap: 15
		}

		const buttonStyle = {
			fontSize: 25,
			borderRadius: 5,
			padding: 15,
			backgroundColor: "rgb(0, 0, 0, 0.3)",
			cursor: "pointer"
		}

		const addStyleC = {
			gridColumn: "span 3",
			backgroundColor: "#2554C7"
		}

		const addStyle0 = {
			gridColumn: "span 2"
		}

		const addStyleEquals = {
			backgroundColor: "#C3FDB8"
		}

		return(
			<div style={containerStyle}>
				<div style={calculatorStyle}>
					<div  style={inputFieldStyle}>
						<div style={inputStyle}>{this.state.expression}</div>
						<div id="display" style={inputStyle}>{this.state.currentNumber}</div>
					</div>
					<div style={buttonFieldStyle}>
						<button id="clear" key="c" style={{...buttonStyle, ...addStyleC}} onClick={this.handleClick}>C</button>
						<button id="divide" key="/" style={buttonStyle} onClick={this.handleClick}>/</button>
						<button id="seven" key="7" style={buttonStyle} onClick={this.handleClick}>7</button>
						<button id="eight" key="8" style={buttonStyle} onClick={this.handleClick}>8</button>
						<button id="nine" key="9" style={buttonStyle} onClick={this.handleClick}>9</button>
						<button id="multiply" key="*" style={buttonStyle} onClick={this.handleClick}>*</button>
						<button id="four" key="4" style={buttonStyle} onClick={this.handleClick}>4</button>
						<button id="five" key="5" style={buttonStyle} onClick={this.handleClick}>5</button>
						<button id="six" key="6" style={buttonStyle} onClick={this.handleClick}>6</button>
						<button id="subtract" key="-" style={buttonStyle} onClick={this.handleClick}>-</button>
						<button id="one" key="1" style={buttonStyle} onClick={this.handleClick}>1</button>
						<button id="two" key="2" style={buttonStyle} onClick={this.handleClick}>2</button>
						<button id="three" key="3" style={buttonStyle} onClick={this.handleClick}>3</button>
						<button id="add" key="+" style={buttonStyle} onClick={this.handleClick}>+</button>
						<button id="zero" key="0" style={{...buttonStyle, ...addStyle0}} onClick={this.handleClick}>0</button>
						<button id="decimal" key="." style={buttonStyle} onClick={this.handleClick}>.</button>
						<button id="equals" key="=" style={{...buttonStyle, ...addStyleEquals}} onClick={this.handleClick}>=</button>
					</div>
				</div>
			</div>
		)
	}
}

export default App

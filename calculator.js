class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperant = ''
        this.previousOperant = ''
        this.operation = undefined
        this.finishedComputing = false;
    }

    delete() {
        this.currentOperant = this.currentOperant.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === ',' && this.currentOperant.includes(',')) return
        if(this.finishedComputing === true){
            this.currentOperant = number.toString()
            console.log("this.currentOperant: ", this.currentOperant)
            this.finishedComputing = false
        } else {
            this.currentOperant = this.currentOperant.toString() + number.toString()
            console.log("this.currentOperant: ", this.currentOperant)
        }
        
    }

    chooseOperation(operation) {
        if (this.currentOperant === '') return
        if (this.previousOperant !== '') {
            this.compute()
        }
        
        this.operation = operation
        this.previousOperant = this.currentOperant
        this.currentOperant = ''
        
    }
 
    compute() {
        let computation
        console.log(this.previousOperant)
        let prev
        if(typeof(this.previousOperant) === "string") {
            prev = parseFloat(this.previousOperant.replace(',', '.'))
        } else {
            prev = parseFloat(this.previousOperant)
        }
        
        console.log(prev)
        const current = parseFloat(this.currentOperant.replace(',', '.'))
        console.log(current)
        if(isNaN(prev) || isNaN(current)) return
        
        switch (this.operation) {
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "×":
                computation = prev * current
                break
            case "÷":
                computation = prev / current
                break
            default:
                return
        }
        
        this.finishedComputing = true;
        this.currentOperant = computation
        this.operation = undefined
        this.previousOperant = ''
        
    }

    getDisplayNumber(number) {
        let stringNumber = number.toString()
        stringNumber = stringNumber.replace('.', ',')
        const integerDigits = parseFloat(stringNumber.split(',')[0])
        const decimalDigists = stringNumber.split(',')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('ro', {maximumFractionDigits: 0 })
        }
        if(decimalDigists != null) {
            return `${integerDisplay},${decimalDigists}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperant)
    if (this.operation != null) {
    this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperant)} ${this.operation}`
        } else {
        this.previousOperandTextElement.innerText = ''
        }
    }

    changeOperation() {
        console.log("schimbat")
        console.log(this.currentOperandTextElement.innerText)
        console.log(typeof(this.currentOperandTextElement.innerText))
    if(this.currentOperandTextElement.innerText.includes('-')) {
        this.currentOperant = this.currentOperandTextElement.innerText.slice(1)
    } else {
        let symbolMinus = '-'
        this.currentOperant = symbolMinus.concat(this.currentOperant)
    }
        
        console.log(this.currentOperant)
        console.log(typeof(this.currentOperant))
    
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const changeOperationButton = document.querySelector('[data-change-operation]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) 

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

changeOperationButton.addEventListener('click', button => {
   
    calculator.changeOperation()
    calculator.updateDisplay()
})
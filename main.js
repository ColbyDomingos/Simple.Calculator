const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        const calculate = (n1, operator, n2) => {
            let result = ''
        
            if (operator === 'add'){
                result = parseFloat(n1) + parseFloat(n2)
            } else if (operator === 'subtract') {
                result = parseFloat(n1) - parseFloat(n2)
            } else if (operator === 'multiply') {
                result = parseFloat(n1) * parseFloat(n2)
            } else if (operator === 'divide') {
                result = parseFloat(n1) / parseFloat(n2)
            }

            return result
        }


        if (!action) {
            //console.log('number key!') Initial Check
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKey = 'number'
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if (firstValue && operator && previousKeyType !== 'operator'){
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue

                calculator.dataset.firstValue = calcValue
            } else {
                calculator.dataset.firstValue = displayedNum
            }
            //console.log('operator key!')
            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
        }

        if (action === 'decimal') {
            //console.log('decimal key!')
            if (!displayedNum.includes('.')){
                display.textContent = displayedNum + '.'
            } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.'
            }

            calculator.dataset.previousKeyType = 'decimal'
        }

        
        if (action === 'clear') {
            //console.log('clear key!')
            calculator.dataset.previousKeyType = 'clear'
        }   

        if (action === 'calculate') {
            //console.log('calculate key!')
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

        if (firstValue) {
            if (previousKeyType === 'calculate') {
                firstValue = displayedNum
                secondValue = calculator.dataset.modValue
            }

        display.textContent = calculate(firstValue, operator, secondValue)
        }

        calculator.dataset.modValue = secondValue
        calculator.dataset.previousKeyType = 'calculate'
        //Remove .is-depressed class from all keys
        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))
    }
   
}
})
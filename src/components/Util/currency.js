
export default {
    formatCurrency :  (num, currency, currencyRate) => {
        let newNum = num * currencyRate
        return currency +' '+ Number(newNum.toFixed(2)).toLocaleString() + ''
    }
}

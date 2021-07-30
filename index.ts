const calculatelvS = (salary: number) => salary * 5
const calculatelvA = (salary: number) => salary * 4
const calculatelvB = (salary: number) => salary * 3

const caculateBonus = (fc: Function, salary: number) => fc(salary)

console.log(caculateBonus(calculatelvS, 10000))
console.log(caculateBonus(calculatelvA, 8000))
console.log(caculateBonus(calculatelvB, 6000))

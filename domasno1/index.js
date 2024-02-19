
//### Arrays

// find
// map
// filter
// reduce
// sort

let numbers = [13, 40, 35, 64, 27, 52, 43, 12];
let findNumbers = numbers.find(num => num < 40 );
console.log(findNumbers);

let newArr = numbers.map(Math.sqrt) //kvadraten koren
console.log(newArr)

let oddNumbers = numbers.filter(num => num % 2 === 1);
console.log(oddNumbers);

let sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum);

let sortNumbers = numbers.sort((a, b) => a - b);
console.log(sortNumbers);

// Spread operator in array and in an object

let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1 = [...arr1, ...arr2];

console.log(arr1)

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const mergeObj = { ...obj1, ...obj2 };

console.log(mergeObj);

// Destructuring

const x = [1, 2, 3, 4, 5];
const [y, z] = x;

console.log(y);
console.log(z);

const obj = { a: 1, b: 2 };
//const { a, b } = obj;
const a = obj.a;
const b = obj.b

console.log(a);
console.log(b);

//Zadaci

//Направете повик до https://jsonplaceholder.typicode.com/users, потоа:

//Направете функција каде како параметар ќе го имаме името на некоја компанија, 
//треба да ги најдеме сите корисници кои се дел од таа компанија пр. findUsersByCompany("Romaguera-Jacobson")
//Најдете ги сите корисници кои живеат во одреден град, според нивното корисничко име. 
//пр. findUserCityByUsername("Bret") -> return "Gwenborough"

const fs = require("fs");
const { resolve } = require("path");

const findUsersByCompany = async(name) => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        data.forEach( ob => {
            if(ob.company.name === name){
                console.log(ob.name);
            }
        })

    } catch(error) {
        console.log(error);
    }
};

const findUserCityByUsername = async (userName) => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data= await response.json()
        data.forEach(ob => {
            if(ob.userName === userName){
                console.log(ob.address.city)
            }
        })
    } catch(error) {
        console.log(error);
    }
};

findUsersByCompany("Romaguera-Jacobson");
findUserCityByUsername("Bret")

const read = async (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf-8", (err, data) => {
            if (err) return reject(err);
            data = JSON.parse(data);
            return resolve(data);
        });
    });
};

jsonData = read("users.json");
console.log(jsonData);




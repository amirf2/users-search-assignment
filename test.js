// const str = "  amir  "
// const arr = ['amir','frieman'];
// console.log(arr.join(' '));
// //console.log(str.split(' ').filter(name => name.trim().length>0));

// const usersListByPartialName = new Map();

// for(let char of "abcdefghijklmnopqrstuvwxyz"){
//     usersListByPartialName.set(char,new Map());
// }

// name='amir friedman';

// name2='dad dadd';

// let namesArr = name.split(' ');
// let firstChar = name[0].charAt(0);
// usersListByPartialName.get(firstChar).set(name[0],'amir');
// console.log( usersListByPartialName.get(firstChar));



// namesArr = name2.split(' ');
// firstChar = name2[0].charAt(0);
// usersListByPartialName.get(firstChar).set(name2[0],'amir');
// console.log( usersListByPartialName.get(firstChar));

// user={
//     name: "amir",
//     dob: "yada",
//     country: "haha"
// } 
// user2= {
//     name: "amir"

// }

// function check(){
// const {name,dob,country} = user;
// if (1){
//     console.log("aaa")
// }

// }

// check();

//var date = new Date();

// console.log(date.getDate());
// console.log(date.getMonth()+1);
// console.log(date.getFullYear());

// var firstDayOfAge = new Date(date);
// console.log(firstDayOfAge);
// firstDayOfAge.setFullYear(date.getFullYear()-1);
// console.log(firstDayOfAge.getDate());
// console.log(firstDayOfAge.getMonth()+1);
// console.log(firstDayOfAge.getFullYear());



// console.log(date.toLocaleDateString());

// const date = new Date()
// const [year, day, month] = date.toLocaleDateString().split('-');
// console.log(year, day, month);

var age = 30;
// const date = new Date()
// //const [month, day, year] = date.toLocaleDateString().split('/')

// // date.setFullYear(year-age);
// // date.setMonth(month);
// // date.setDate(day);
// var timeGap = date.getTimezoneOffset()/60;
// // console.log(date.getHours());
// // console.log(timeGap);
// console.log(date);
// console.log(date.getDate());
// console.log(date.getMonth()+1);

// date.setHours(date.getHours()-timeGap);
// date.setFullYear(date.getFullYear()-age);
// console.log(date);
// console.log(date.getDate());
// console.log(date.getMonth()+1);


// console.log("100"< 99);
//  const date2 = new Date(date);
//  date2.setFullYear(date.getFullYear()-1);
//  date2.setDate(date.getDate()+1);
//  console.log(date2);


// const lastDate = new Date();
// console.log(lastDate.getDate());

// const timeGap = lastDate.getTimezoneOffset()/60;
// lastDate.setHours(lastDate.getHours()-timeGap);
// console.log(lastDate.getDate());

// const reqYear = lastDate.getFullYear() - age;
// lastDate.setFullYear(reqYear);
// ///console.log(lastDate);

// const firstDate = new Date(lastDate);
// firstDate.setFullYear(firstDate.getFullYear()-1);
// firstDate.setDate(firstDate.getDate()+1);
// //console.log(firstDate);
const UNORDERED_TRIE = false;

var Trie = require('trie-prefix-tree');
var trie = new Map();
trie.set("hey","hey");
trie.delete("hey");
//console.log(trie.size);
var array = ["amir","friedman"];
var arrayv2 = ["amirfriedman",...array]
//console.log(arrayv2);

var ans = undefined;

console.log([...ans.values()])
const map = require('../../dist').map;

//Basic example
let source = {
  firstName: 'first',
  lastName: 'last',
};

let dest = {
  firstName: '',
  lastName: '',
};

map(source, dest);
console.log(dest.firstName); // "first"
console.log(dest.lastName); // "last"

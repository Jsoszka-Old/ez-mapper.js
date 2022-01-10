const map = require('../../dist').map;

//Default transforms
let source = {
  first_Name: 'first',
  LastName: 'last',
};

let dest = {
  firstName: '',
  lastName: '',
};

map(source, dest);
console.log(dest.firstName); // "first"
console.log(dest.lastName); // "last"

const ezMap = require('../../dist');

ezMap.init({
  transform: (x) => {
    let y = x.replace('REMOVE_ME', '');
    y = ezMap.defaultTransformer(y);
    return y;
  },
});

//Default transforms
let source = {
  REMOVE_MEfirst_Name: 'first',
  LastNameREMOVE_ME: 'last',
};

let dest = {
  firstName: '',
  lastName: '',
};

ezMap.map(source, dest);
console.log(dest.firstName); // "first"
console.log(dest.lastName); // "last"

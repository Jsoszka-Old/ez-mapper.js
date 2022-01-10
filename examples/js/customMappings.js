const map = require('../../dist').map


//Custom Mappings Example
const source = {
    firstName : "first",
    lastName : "last"
}

 const dest = {
    firstName : "",
    lastName : "",
    fullName: ""
}

map(source, dest, {customMapper: (src, dest) => {
    dest.fullName = src.firstName + " " + src.lastName
}})

console.log(dest.fullName) //  "first last"

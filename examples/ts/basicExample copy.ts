import { map } from "../../src"

class User {
    firstName: string = ""
    lastName: string = ""
}

class UserDTO {
    firstName: string = ""
    lastName: string = ""
}


const user = new User()
user.firstName = "first"
user.lastName = "last"

const userDTO = new UserDTO();

map(user, userDTO)

console.log(userDTO)
/*
{
  firstName: 'first',
  lastName: 'last',
  address:{ city: 'richmond', state: 'va' }
}
*/


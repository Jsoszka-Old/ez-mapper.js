import { map } from "../../src"

class User {
    address: Address = new Address()
}

class Address {
    city: string = ""
    state: string = ""
}

class UserDTO {
    address: AddressDTO = new AddressDTO()
}

class AddressDTO {
    city: string = ""
    state: string = ""
}

const user = new User()
user.address.city = "richmond"
user.address.state = "va"

const userDTO = new UserDTO();

map(user, userDTO)

console.log(userDTO)
/*
{
  address:{ city: 'richmond', state: 'va' }
}
*/


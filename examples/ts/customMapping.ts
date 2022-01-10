import { map } from "../../src"

class User {
    firstName: string = ""
    lastName: string = ""
}

class UserDTO {
    firstName: string = ""
    lastName: string = ""
    fullName: string = ""
}

const user = new User()
user.firstName = "first"
user.lastName = "last"

const userDTO = new UserDTO();

map<User, UserDTO>(user, userDTO, {
    customMapper: (src, dest) => {
        dest.fullName = src.firstName + " " + src.lastName
    }
})

console.log(userDTO) // {fistName: "first", lastName: "last", fullName: "first + last"}
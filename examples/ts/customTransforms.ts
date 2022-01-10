import { map, init, defaultTransformer } from "../../src"

class User {
    firstNameXyz: string = "first"
}

class UserDTO {
    firstName: string = ""
}


const user = new User()
const userDTO = new UserDTO();

init({
    transform: (x) => {
        let y = x.replace("Xyz", "");
        return defaultTransformer(y);
    }
})

map(user, userDTO)

console.log(userDTO)
/*
{
  firstName: 'first',
}
*/


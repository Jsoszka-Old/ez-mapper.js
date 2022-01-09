class User {
    firstName: string = ""
    lastName: string = ""
    address: Address = new Address();

}

class UserDTO {
    firstName: string = ""
    lastName: string = ""
    fullName: string = ""
    address: AddressDTO = new AddressDTO()
}

class Address {
    city: string = "Richmond"
    state: string = "florida"
}

class AddressDTO {
    city: string = ""
    state: string = ""
    addressString: string = ""
}



function map(source: any, dest: any, customMapper: (src: any, dest: any) => any = (src,dest)=>{}) {
    const sourceKeys = Object.keys(source);

    sourceKeys.forEach(key => {
        if (key in dest) {
            if (source[key] instanceof Object) {
                console.log(`${key} is an object starting recursion`)
                dest[key] = map(source[key], dest[key])
            }
            else
                dest[key] = source[key]
        }
    })

    if (customMapper)
        customMapper(source, dest)

    return dest
}




const user = new User();
user.firstName = "Jon"
user.lastName = "Soszka"

const userDTO = new UserDTO();
console.log(map(user, userDTO, (src: User,dest: UserDTO) => {
    dest.fullName = src.firstName + ' ' + src.lastName
    dest.address.addressString = `${src.address.city}, ${src.address.state}`
}));
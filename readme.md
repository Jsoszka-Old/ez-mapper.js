# ez-mapper.js

A simple, zero dependency object mapper for javascript and typescript with optional configuration.

### Typescript
ez-mapper is written in typescript and has full typing support.

# Getting Started
Install ez-map using npm

```npm install ez-mapper```

or `yarn`

```yarn add ez-mapper```

## Mapping between objects

Lets say we have the following classes 

```js
class User {
    firstName: string = ""
    lastName: string = ""
}

class UserDTO {
    firstName: string = ""
    lastName: string = ""
}
```

now we have an instance of `User` we would like to map to an instance of `UserDto`, here is how we would do it

```js
import { map } from "../../src"

const user = new User()
user.firstName = "Jonathan"
user.lastName = "Soszka"

const userDto = new UserDto()
map(user,UserDto);

console.log(userDto) // {firstName: 'Jonathan', lastName: 'Soszka}
```

This is great we can perform simple mappings easily, here we built our own `User` instance but in reality it would probably already be built and you would just need to make the DTO and map it.

### Custom Mappings
What if our DTO has some extra fields like for example `fullName`. we can take care of this using a `customMapper` passed to the map method


```js
map(user, userDTO, {
    customMapper: (src, dest) => {
        dest.fullName = src.firstName + " " + src.lastName
    }
})
```
### Nested properties
ez-mapper will also copy all nested properties by value. Lets assume our `User` and `UserDto` classes now have a property `Address` which is of type `Address` and `AddressDto` respectfully
```js
class Address {
    city: string = ""
    state: string = ""
}

class AddressDto {
    city: string = ""
    state: string = ""
}
```



```js
import { map } from "../../src"

const user = new User()
user.address.city = "Richmond"
user.address.state = "VA"

const userDto = new UserDto()
map(user,UserDto);

console.log(userDto.address) // {city:"Richmond", state:"VA"}

```



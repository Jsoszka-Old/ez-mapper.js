import { map, init, defaultTransformer } from "."
describe("mapper", () => {
    it("Can map based off exact name match", () => {
        class NameConvention {
            firstName = "Jonathan"
            lastName = "Soszka"
        }
        class NameConventionDto {
            firstName = ""
            lastName = ""
        }

        const src = new NameConvention()
        const dst = new NameConventionDto();

        map(src, dst)
        expect(dst.firstName).toEqual(src.firstName)
        expect(dst.lastName).toEqual(src.lastName)

    })

    it("Can map nested objects based off exact name match", () => {
        class NameConventionNested {
            firstName = "Jonathan"
            lastName = "Soszka"
            address = new Address()
        }
        class NameConventionNestedDto {
            firstName = ""
            lastName = ""
            address = new AddressDTO()
        }

        class Address {
            city = "Richmond"
            state = "Virginia"
        }
        class AddressDTO {
            city = ""
            state = ""
        }

        const src = new NameConventionNested()
        const dst = new NameConventionNestedDto();

        map(src, dst)
        expect(dst.address.city).toEqual(src.address.city)
        expect(dst.address.state).toEqual(src.address.state)

    }),
        it('can perform custom mappings', () => {
            class CustomMapping {
                firstName = "Jonathan"
                lastName = "Soszka"
            }
            class CustomMappingDto {
                firstName = ""
                lastName = ""
                fullName = ""
            }

            const src = new CustomMapping()
            const dst = new CustomMappingDto()
            map(src, dst, {
                customMapper: (src, dst) => {
                    dst.fullName = src.firstName + " " + src.lastName
                }
            })

            expect(dst.firstName).toEqual(src.firstName)
            expect(dst.lastName).toEqual(src.lastName)
            expect(dst.fullName).toEqual(src.firstName + " " + src.lastName)

        })
    it("copies by value only", () => {
        const src = {
            firstName: "Jonathan",
            lastName: "soszka",
            nested: {
                value: "val"
            }
        }

        const dst = {
            firstName: "",
            lastName: "",
            nested: {
                value: ""
            }
        }

        map(src, dst)
        expect(dst.firstName).toEqual(src.firstName)
        expect(dst.lastName).toEqual(src.lastName)
        expect(dst.nested.value).toEqual(src.nested.value)

        dst.firstName = "Changed!"
        expect(src.firstName).not.toEqual(dst.firstName)

        dst.nested.value = "Changed!"
        expect(dst.nested.value).not.toEqual(src.nested.value)
    })
    it('can be configured to transform src properties', () => {
        class ValueCopy {
            EXfirstName = "Jonathan"
            EXlastName = "Soszka"

        }
        class ValueCopyDto {
            firstName = ""
            lastName = ""
        }
        const src = new ValueCopy()
        const dst = new ValueCopyDto();

        init({
            transform: (src) => src.replace("EX", "")
        })
        map(src, dst)
        expect(dst.firstName).toEqual(src.EXfirstName)
        expect(dst.lastName).toEqual(src.EXlastName)
    })
})


describe("defaultTransformer", () => {
    it("strips underscores", () => {
        const original = "test_string"
        const transformed = defaultTransformer(original);
        expect(original).toEqual("test_string")
        expect(transformed).toEqual("teststring")
    })
})
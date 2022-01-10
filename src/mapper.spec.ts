import { map, init } from "."
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
            map<CustomMapping, CustomMappingDto>(src, dst, (src, dst) => {
                dst.fullName = src.firstName + " " + src.lastName
            })

            expect(dst.firstName).toEqual(src.firstName)
            expect(dst.lastName).toEqual(src.lastName)
            expect(dst.fullName).toEqual(src.firstName + " " + src.lastName)

        })
    it("copies by value only", () => {
        class ValueCopy {
            firstName = "Jonathan"
            lastName = "Soszka"
        }
        class ValueCopyDto {
            firstName = ""
            lastName = ""
        }

        const src = new ValueCopy()
        const dst = new ValueCopyDto();

        map(src, dst)
        expect(dst.firstName).toEqual(src.firstName)
        expect(dst.lastName).toEqual(src.lastName)

        dst.firstName = "Changed!"
        expect(src.firstName).not.toEqual(dst.firstName)
    })
    it('can be configured to transform src properties', () => {
        class ValueCopy {
            _firstName = "Jonathan"
            lastName = "Soszka"

        }
        class ValueCopyDto {
            firstName = ""
            lastName = ""
        }
        const src = new ValueCopy()
        const dst = new ValueCopyDto();

        init((src) => {
            if (src.charAt(0) == '_')
                return src.substring(1)
            return src
        })
        map(src, dst)
        expect(dst.firstName).toEqual(src._firstName)
        expect(dst.lastName).toEqual(src.lastName)
    })
})
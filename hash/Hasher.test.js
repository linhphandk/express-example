const Hasher = require('./Hasher')
describe("Hasher",()=>{
    it("should hash the password and then compare it",async ()=>{
        let password = 'test_password'
        let hasher = new Hasher()
        
        let hashedPassword = await hasher.hash(password)

        let isSamePassword = await hasher.compare(password,hashedPassword)
        
        expect(isSamePassword).toBeTruthy()
    })
})
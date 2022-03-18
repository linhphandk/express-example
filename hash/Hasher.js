const bcrypt = require('bcrypt');
const { reject } = require('bcrypt/promises');
/**
 * Static class to handle password hashing and
 * comparing raw password and hashed
 * @class
 */
class Hasher{

    /**
     * @method
     * @param {string} password 
     * @returns hashed password or empty string on failure
     */
    async hash(password){
        if(!process.env.SALT_ROUNDS){
            console.error("salt rounds not defined")
            return ''
        }
        let hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
            
        return hash
        
    }

    /**
     * 
     * @param {string} password 
     * @param {string} hash 
     * @returns true if the passwords match or
     * false in case they dont match or error
     */
    async compare(password,hash){
        let isSamePassword = await bcrypt.compare(password, hash)
        return isSamePassword
           
    }
}

module.exports = Hasher
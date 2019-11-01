const crypto = require('crypto')
const { JWT, JWK } = require('jose')
module.exports = {
  friendlyName: 'Login',

  description: 'Login user.',

  inputs: {
    email: { type: 'string', required: true },
    password: { type: 'string', required: true }
  },

  exits: {
    badRequest: {
      description: 'Invalid data',
      responseType: 'badRequest'
    }
  },

  fn: async function(inputs, exits) {
    inputs.password = crypto
      .createHash('md5')
      .update(inputs.password)
      .digest('hex')
    let user = await User.findOne({ email: inputs.email, password: inputs.password })
    if (user) {
      const key = JWK.asKey({
        kty: 'oct',
        k: 'hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg'
      })
      let token = JWT.sign(user, key, {
        audience: 'my_app',
        expiresIn: '2 hours',
        header: {
          typ: 'JWT'
        }
      })
      return exits.success({ data: { token: token } })
    }
    return exits.badRequest(`Login fail`)
  }
}

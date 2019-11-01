const crypto = require('crypto')
module.exports = {
  friendlyName: 'Register',

  description: 'Register user.',

  inputs: {
    email: { type: 'string', required: true },
    password: { type: 'string', required: true },
    address: { type: 'string' }
  },

  exits: {
    badRequest: {
      description: 'Invalid data',
      responseType: 'badRequest'
    }
  },

  fn: async function(inputs, exits) {
    let existUser = await User.findOne({ email: inputs.email })
    if (!existUser) {
      inputs.password = crypto
        .createHash('md5')
        .update(inputs.password)
        .digest('hex')
      inputs.createdBy = 'system'
      let user = await User.create(inputs).fetch()
      return exits.success({ data: user })
    }
    return exits.badRequest(`User existed`)
  }
}

const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb://localhost/db_finance')

//ERROR MESSAGE
mongoose.Error.messages.general.required = "The atribute '{PATH}' is required."

mongoose.Error.messages.Number.max = "The informed value '{PATH}' is MORE than maximum allowed value('{MAX}')."
mongoose.Error.messages.Number.min = "The informed value '{PATH}' is LESS than minimum allowed value('{MIN}')."

mongoose.Error.messages.String.enum = "The value '{VALUE}' IS NOT a valid '{PATH}'."

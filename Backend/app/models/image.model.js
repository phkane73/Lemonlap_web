const mongoose = require('mongoose');
const { Schema } = mongoose;
const imageShema = mongoose.Schema({
    imageName:{
        type: String,
        required: true
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }
})

const Image = mongoose.model('Image',imageShema);
module.exports = Image;
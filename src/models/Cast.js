import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [5, 'Name shoud be at list 5 character long!'],
        match: [/^[a-zA-z0-9]+$/, 'Name shoud be alphanumeric, digits and whitespaces only!']
    },
    age: {
        type: Number,
        min: 1,
        max: 120,
    },
    born: {
        type: String,
        minLength: 10,
        match: /^[a-zA-z0-9]+$/,
    },
    imageUrl: {
        type: String,
        // Custum validator
        validate: {
            validator: function (v) {
                return /^https?:\/\//.test(v)
            },
            message: (props) => `${props.value} is invalid image url!`
        }
    },
});

const Cast = model('Cast', castSchema);

export default Cast;
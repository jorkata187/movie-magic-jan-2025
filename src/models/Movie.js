import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [5, 'Title shoud be at list 5 character long!'],
        maxLength: 30,
        match: /^[a-zA-z0-9]+$/
    },
    category: {
        type: String,
        required: true,
        enum: [
            'tv-show',
            'animation',
            'movie',
            'documentary',
            'short-film',
        ]
    },
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: [5, 'Genre shoud be at list 5 character long!'],
        maxLength: 30,
        match: /^[a-zA-z0-9]+$/
    },
    director: {
        type: String,
        minLength: [5, 'Director shoud be at list 5 character long!'],
        maxLength: 30,
        match: /^[a-zA-z0-9]+$/
    },
    year: {
        type: Number,
        min: 1900,
        max: 2025,
    },
    imageUrl: {
        type: String,
        match: /^https?:\/\//,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    description: {
        type: String,
        minLength: 20,
        match: /^[a-zA-z0-9]+$/
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Movie = model('Movie', movieSchema);

export default Movie;
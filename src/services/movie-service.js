import Movie from '../models/Movie.js';

export default {
    getAll(filter = {}) {
        let query = Movie.find({});

        if (filter.search) {
            // TODO: Fix partial case insensitive search
            query = query.where({title: filter.search});
        };

        if (filter.genre) {
            // TODO: Add case insensitive search
            query = query.where({genre: filter.genre});
        }

        if (filter.year) {
            query = query.where({year: Number(filter.year)});
        }

        return query;
    },
    getOne(movieId) {
        const result = Movie.findById(movieId);

        return result;
    },
    create(movieData) {
        movies.push({
            ...movieData,
            rating: Number(movieData.rating),
        });

        return newId;
    }
}
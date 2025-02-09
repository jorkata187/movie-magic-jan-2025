
import express from 'express';
import handlebars from 'express-handlebars';
import expressSession from 'express-session';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import routes from './routes.js';
import showRatingHelper from './helpers/rating-helper.js';
import { authMiddleware } from './middlewares/auth-middleware.js';
import { tempData } from './middlewares/temp-data-middleware.js';

const app = express();

// DB Configuration
try {
    const defaultUri = 'mongodb://127.0.0.1:27017/magic-movies-jan2025';
    await mongoose.connect(process.env.DATABASE_URI ?? defaultUri);

    console.log('DB Conected seccesfully');
} catch (err) {
    console.log('Can not connect to DB');
    console.error(err.message);
}

// Handlebars Configuration
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        showRating: showRatingHelper,
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// Express Configuration
app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false})); // Middleware: Learn express to parse form data
app.use(cookieParser());
app.use(expressSession({
    secret: 'ytrsfxcvbnmbn',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, httpOnly: true} 
}))
app.use(tempData);
app.use(authMiddleware);

// Setup routes
app.use(routes);

// Start server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...')
); 

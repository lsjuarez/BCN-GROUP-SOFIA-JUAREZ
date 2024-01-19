import express = require('express');
import { moviesRouter } from './routes/moviesRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/v1/movies', moviesRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
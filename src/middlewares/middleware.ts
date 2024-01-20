import { Request, Response, NextFunction } from 'express';

function validateJsonMiddleware(req: Request, res: Response, next: NextFunction): void {
    if(req.headers['content-type'] === 'application/json') {
        try {
            JSON.parse(JSON.stringify(req.body));
            next();
        } catch(err){
            res.status(400).json({err: 'Invalid JSON format.'})
        }
    } else {
        res.status(400).json({ error: 'Request must have JSON format.'})
    }
}

function validateMovieBody(req: Request, res: Response, next: NextFunction) : void {
    const {name, director, duration, year, rottenTomatoes} = req.body;
    if(
        typeof name !== 'string' ||
        typeof name === 'undefined' || 
        typeof director !== 'string' || 
        typeof director === 'undefined' || 
        typeof duration !== 'number' ||
        duration < 0 ||
        typeof year !== 'number' ||
        year < 0 ||
        typeof rottenTomatoes !== 'number' ||
        rottenTomatoes < 0
    ) {
        res.status(400).json({ error: 'Invalid movie data'});
    } else {
        next();
    }
}

export {
    validateJsonMiddleware,
    validateMovieBody
}
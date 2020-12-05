var shortid = require('shortid');
// To generate a unique ID, use shortid.generate()

const middleware = (req, res, next) => {
    const id = shortid.generate();
    const timestamp = Date.now();
    const path = req.baseUrl;
    req.trace = {
        id, timestamp, path
    };
    res.setHeader('x-request-id', id);
    next();
};

module.exports = middleware;
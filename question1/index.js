const http = require('http');
const projects = require('./data-store');

const port = 8000;

const requestListener = (req, res) => {
    const url = req.url;
    const urlDestructured = url.split('/').filter(x => x != '');
    if(urlDestructured.length > 0 && urlDestructured[0] === 'projects') {
        if (isValidId(urlDestructured)) {
            const id = urlDestructured[1];
            const data = projects.filter(x => x.id == id);
            console.log(projects, data);
            if (data.length === 0) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({'message': 'NO DATA FOUND'}));
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(data[0]));
                res.end();
            }
        } else {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({'message': 'BAD REQUEST'}));
            res.end();
        }
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({'message': 'INVALID URL'}));
        res.end();
    }
};

const server = http.createServer(requestListener)
server.listen(port, function() {
    console.log(`server start at port ${port}`);
});

const isValidId = (urlDestructured) => {
    if (urlDestructured.length <= 1) return false;
    return true;
};

module.exports = server;

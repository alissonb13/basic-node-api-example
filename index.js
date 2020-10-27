const express = require('express');

const server = express();

server.use(express.json());

server.use((request, response, next) => {
    console.log(`Method: ${request.method} - URL: ${request.url}`);

    return next();
});

function checkNameExists(request, response, next) {
    if(!request.body.name) {
        return response
                .status(400)
                .json({ error: 'Name is required!' });
    }

    return next();
}

function checkUserInArray(request, response, next) {
    const { index } = request.params;

    if(!users[index]) {
        return response
                .status(400)
                .json({ error: 'user does not exists.' });
    }

    return next();
}

// query params = ?test=1
// route params = /test/1
// request body = { "name": "alisson", "email": "alissonboucinhas13@hotmail.com" }

const users = [ 'Alisson Boucinhas' ];

server.get('/users', (request, response) => {
    return response.json(users);
});

server.get('/users/:index', checkUserInArray, (request, response) => {
    const { index } = request.params;

    return response.json(users[index]);
});

server.post('/users', checkNameExists, (request, response) => {
    const { name } = request.body;

    users.push(name);

    return response.json(users)
});

server.put('/users/:index', checkNameExists, checkUserInArray, (request, response) => {
    const { index } = request.params;
    const { name } = request.body;

    users[index] = name;

    return response.json(users[index]);
});

server.delete('/users/:index', checkUserInArray, (request, response) => {
    const { index } = request.params;

    users.splice(index, 1);

    return response.json(users);
})

server.listen(3333);
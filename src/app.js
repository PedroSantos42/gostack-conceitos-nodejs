const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    let { title } = request.body;

    const results = title
        ? repositories.filter(repo => repo.title.includes(title))
        : repositories;

    return response.status(200).json(results);
});

app.post("/repositories", (request, response) => {
    repo = {
        id: uuid(),
        ...request.body,
        likes: 0
    };

    repositories.push(repo);

    return response.status(201).send({ url, title, techs, likes } = repo);
});

app.put("/repositories/:id", (request, response) => {
    let repoAux = request.body;
    let { id } = request.params;

    let index = repositories.findIndex(repo => repo.id == id);

    if (index < 0)
        return response.status(400).json({ message: 'Repository does not exist' });

    let { likes } = repoAux

    if (likes)
        return response.status(400).json({ likes: repositories[index].likes });

    repositories[index] = {
        ...repositories[index],
        ...repoAux
    };
    return response.status(200).json({ url, title, techs } = repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
    let { id } = request.params;
    let index = repositories.findIndex(repo => repo.id == id);
    if (index >= 0) {
        repositories.splice(repositories.findIndex(repo => repo.id == id), 1);
        return response.status(204).send();
    } else {
        return response.status(400).json({ message: 'Repository does not exist' });
    }
});

app.post("/repositories/:id/like", (request, response) => {
    let { id } = request.params;
    let index = repositories.findIndex(repo => repo.id == id);

    if (index >= 0) {
        repositories[index] = {
            ...repositories[index],
            likes: repositories[index].likes + 1
        };
        return response.status(200).json({ likes: repositories[index].likes });
    } else {
        return response.status(400).json({ message: 'Repository does not exist' });
    }
});

module.exports = app;

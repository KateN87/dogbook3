import express from 'express';
import { db } from './database.js';

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
};
app.use(express.json());
app.use(logger);

app.get('/api', (req, res) => {
    res.json(db.data.userData);
});

app.get('/api/user/:id', (req, res) => {
    const dogId = Number(req.params.id);
    const findDog = db.data.userData.find((dog) => dog.id === dogId);
    if (findDog === undefined) {
        res.sendStatus(400);
    }
    console.log(findDog);
    res.status(200).send(findDog);
});

app.delete('/api/:id', (req, res) => {
    const dogId = Number(req.params.id);
    const dogToRemove = db.data.userData.find((dog) => dog.id === dogId);

    if (dogToRemove === undefined) {
        res.sendStatus(400);
    }

    if (dogToRemove) {
        db.data.userData = db.data.userData.filter((dog) => dog.id !== dogId);
    }

    db.data.userData.forEach((dog) => {
        dog.friends = dog.friends.filter(
            (friend) => friend !== dogToRemove.name
        );
    });

    db.write();
    res.status(200).send(db.data.userData);
});

app.post('/api', (req, res) => {
    const newDog = req.body;
    let id = db.data.userData.length + 1;

    console.log(req.body.name);
    newDog.id = id;
    db.data.userData.push(newDog);
    db.write();
    res.status(200).send(db.data.userData);
});

app.put('/api/:id', (req, res) => {
    const dogId = Number(req.params.id);
    const dogToEdit = db.data.userData.findIndex((dog) => dog.id === dogId);

    if (dogToEdit === -1) {
        res.sendStatus(400);
    }
    db.data.userData[dogToEdit] = req.body;
    db.write();
    res.send(db.data.userData);
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

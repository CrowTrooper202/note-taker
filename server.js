const express = require('express');
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.post('/notes', (req, res) =>
    res.sendfile(path.join(__dirname, '/public/notes.html')))

app.get('/api/notes', (req, res) => {
    res.status(200).json(`${req.method} request received to get data base`);

    console.info(`${req.method} request received to get data base`);
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a data base`);

    const { title, text, } = req.body;

    if (title && text) {
        const newTasks = {
            title,
            text,
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                let parsedTasks = JSON.parse(data);

                parsedTasks.push(newTasks);

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedTasks, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated data base!')
                );
            }
        });

        const response = {
            status: 'success',
            body: newTasks,
        };

        console.log(response);
        res.status(201).json(response);
    } 
    
    else {
        res.status(500).json('Error in posting review');
    }

    fs.writeFile(
        './public/notes.html',
        JSON.stringify(parsedTasks, null, 4),
        (writeErr) =>
            writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated data base!')
    );
});

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
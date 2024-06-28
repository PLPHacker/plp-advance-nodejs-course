const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { body, validationResult } = require('express-validator');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello PLP Coders');
});

app.post('/user',
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        res.send('User data is valid');
    }
);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something has broken');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
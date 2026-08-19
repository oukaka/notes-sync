const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const noteRouter = require('./routes/notes');
const fileRouter = require('./routes/files');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/notes', noteRouter);
app.use('/api/folders', require('./routes/folders'));
app.use('/api/files', fileRouter);

app.use('/api/auth', authRouter);

app.get('/health', (req, res) => {
    res.json(
        {
            status: 'ok',
        }
    )
}
);

module.exports = app;
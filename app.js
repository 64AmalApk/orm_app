// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/adminRouter');
const clientRouter = require('./routes/clientRouter');
const verifyToken = require('./middleware/authMiddleware');
const sequelize = require('./db/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/client', verifyToken('Client'), clientRouter)
app.use('/admin', verifyToken('Admin'), adminRouter);


async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();

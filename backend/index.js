require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');
const registerGameSockets = require('./sockets');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL?.split(',') || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({ success: true, message: 'English Learning App API çalışıyor.' });
});

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL?.split(',') || '*' } });
registerGameSockets(io);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 API http://localhost:${PORT} üzerinde çalışıyor.`);
  });
});

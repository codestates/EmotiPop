const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const usersRouter = require('./router/users.js');
const mypageRouter = require('./router/mypage.js');

dotEnv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://emotipop.com'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  })
);

app.use('/users', usersRouter);
app.use('/mypage', mypageRouter);

app.get('/', (req, res, next) => {
  res.send('Hello from API Server');
});

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

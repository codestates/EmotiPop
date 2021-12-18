const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const beansRouter = require('./router/beans.js');
const usersRouter = require('./router/users.js');
const oauthRouter = require('./router/oauth.js');
const mypageRouter = require('./router/mypage.js');
const statsRouter = require('./router/stats.js');
const calendarRouter = require('./router/calendar.js')
const popsRouter = require('./router/pop.js');

dotEnv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ['http://localhost:19003', 'http://emotipop.com'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  })
);
app.use(cookieParser());

app.use('/beans', beansRouter);
app.use('/oauth', oauthRouter);
app.use('/users', usersRouter);
app.use('/mypage', mypageRouter);
app.use('/stats', statsRouter);
app.use('/calendar', calendarRouter);
app.use('/pop', popsRouter);

app.get('/', (req, res, next) => {
  res.send('Hello from API Server');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

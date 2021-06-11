const express = require('express');
const path = require('path');
const morgan = require('morgan');
const hbs = require('hbs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
// const secretKey = require('crypto').randomBytes(64).toString('hex');
const { connect } = require('./src/db/db');
const indexRouter = require('./src/routes/indexRouter');
const userRouter = require('./src/routes/userRouter');
const playerRouter = require('./src/routes/playerRouter');
const tournamentRouter = require('./src/routes/tournamentRouter');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

connect();

app.set('cookieName', 'userCookie');
app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'src', 'views'));

const sessionParser = session({
  name: app.get('cookieName'),
  secret: '765609876987667890987667898765',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/WFOOTBALL',
  }),
  cookie: {
    httpOnly: true,
    maxAge: 100000000,
  },
});

hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));
hbs.registerHelper('checkId', (userId) => {
  if (userId) {
    return new hbs.SafeString(`<button class="editbutton">edit</button>
    <button class="deletebutton">delete</button>`);
  }
});

app.use(sessionParser);
app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.id = req.session?.user?.id;
  res.locals.username = req.session?.user?.username;
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/players', playerRouter);
app.use('/tournaments', tournamentRouter);

app.listen(PORT, () => {
  console.log('Server started on PORT', PORT);
});

const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

const sess = {
    secret: 'Something secret',
    cookie: {},
    resave: false,
    saveUninitalized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => {`App listening on port ${PORT}`});
});




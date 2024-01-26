const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection')
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => {`App listening on port ${PORT}`});
});




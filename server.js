// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('dotenv').load();
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3300;
const path = require("path");
const methodOverride = require("method-override");
// Requiring our models for syncing
// =============================================================
const db = require("./app/models");

//For BodyParser
// =============================================================
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
// =============================================================
app.use(express.static("app/public"));

//For Handlebars
// =============================================================
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/app/views/layouts',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/app/views'));

// Routes
// =============================================================

require("./app/routes/routes.js")(app);




// Syncing our sequelize models and then starting our Express app
// =============================================================

// //Sync Database
db.sequelize.sync({ force: true })
    .then(function() {
        console.log('Nice! Database looks fine');


        app.listen(PORT, function(err) {

            if (!err) {
                console.log("App listening on PORT " + PORT);
            } else {
                console.log(err)
            }

        });

    })
    .catch(function(err) {

        console.log(err, "Something went wrong with the Database Update!")

    });
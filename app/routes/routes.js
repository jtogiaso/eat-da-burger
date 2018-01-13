// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
    // ===============================================================================

    // Get all tests test creator
    app.get("/", (req, res) => {

        db.Burger.findAll({})
            .then(data => {

                res.render("home", {
                    title: 'Burger Eater',
                    script: 'home',
                    data: data
                });

            });
    });

    // Get all questions and related `answers` for a test
    app.post("/burger", (req, res) => {
        console.log(req.body);
        db.Burger.create({ burger_name: req.body.burger_name })
            .then(data => res.json(data))
    });

    // Get all questions and related `answers` for a test
    app.post("/eat", (req, res) => {
        console.log(req.body);
        db.Burger.update({ 
            devoured: true,
          } , {
            where: {
              id: req.body.id
            }
          })
          .then(data => res.json(data))
    });

};
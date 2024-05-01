// Import express.js
const express = require("express");

// Create express app
var app = express();


// Add static files location
app.use(express.static("static"));

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');

// Get the petowner model
const { PetOwner } = require("./models/petowner");

// Create a route for root - /
app.get("/", function(req, res) {
    res.render("home");
});


app.get("/appointments", function(req, res){
    var sql = 'select * from Appointments';
    db.query(sql).then(results => {
        res.render('appointments', {data:results});
    });
});

app.get("/pet_owners", function(req, res){
    var sql = 'select * from Pet_Owners';
    db.query(sql).then(results => {
        res.render('petowners', {data:results});
    });
});

app.get("/single-owner/:PoId", async function(req, res){
    var poId = req.params.PoId;
    var owner = new PetOwner(poId);
    await owner.getPetOwnerName();
    await owner.getPetOwnerGender();
    await owner.getPetOwnerAge();
    await owner.getPetOwnerLocation();
    await owner.getPetOwnerContact();
    await owner.getPetOwnerPetId();
    console.log(owner);
    res.render('single-petowner', {owner:owner})
});

app.get("/pet_nurturers", function(req, res){
    var sql = 'select * from Pet_Nurturers';
    db.query(sql).then(results => {
        res.render('petnurturers', {data:results});
    });
});

app.get("/single-nurturer/:Id", function(req, res){
    var pnId = req.params.Id;
    var pnSql = 'select * from Pet_Nurturers WHERE Id = ?';
    db.query(pnSql, [pnId]).then(results => {
        res.render('single-petnurturer',{data:results});
    });
});

app.get("/pet_info/:PetId", function(req, res){
    var petId = req.params.PetId;
    var pSql = 'select * from Pet_Info WHERE PetId = ?';
    db.query(pSql, [petId]).then(results => {
        res.render('petinfo', {data:results});
    });
});

// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from test-table';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results);
    });
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});
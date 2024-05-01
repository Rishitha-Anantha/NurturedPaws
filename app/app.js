// Import express.js
const express = require("express");

// Create express app
var app = express();

app.use(express.urlencoded({ extended: true }));

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
    await owner.getPetOwnerDescription();
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

app.post('/add-description', async function (req, res) {
    params = req.body;
    // Adding a try/catch block which will be useful later when we add to the database
    var owner = new PetOwner(params.PoId);
    try {
        // Just a console.log for now to check we are receiving the form field values
        await owner.addPetOwnerDescription(params.Description);
        res.redirect('/single-owner/', params.PoId );
     } catch (err) {
         console.error(`Error while adding note `, err.message);
     }
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});
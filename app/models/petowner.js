// Get the functions in the db.js file to use
const db = require('./../services/db');

class PetOwner {
    // Pet Owner ID
    PoId;
    // Pet Owner Name
    Name;
    // Pet Owner Gender
    Gender;
    // Pet Owner Age
    Age;
    // Pet Owner Location
    Location;
    // Pet Owner Contact
    Contact;
    // Pet Owner PetId
    PetId;

    constructor(id){
        this.PoId = id;
    }

    // Gets the Pet owner Name from the database
    async getPetOwnerName(){
        if (typeof this.Name !== 'string') {
            var sql = "SELECT * from Pet_Owners WHERE PoId = ?"
            const results = await db.query(sql, [this.PoId]);
            this.Name = results[0].Name;
        }
    }
    
    // Gets the Pet owner gender from the database
    async getPetOwnerGender(){
        if (typeof this.Gender !== 'string') {
            var sql = "SELECT * from Pet_Owners WHERE PoId = ?"
            const results = await db.query(sql, [this.PoId]);
            this.Gender = results[0].Gender;
        }
        
    }

    // Gets the Pet owner Age from the database
    async getPetOwnerAge(){
        if (typeof this.Age !== 'string') {
            var sql = "SELECT * from Pet_Owners WHERE PoId = ?"
            const results = await db.query(sql, [this.PoId]);
            this.Age = results[0].Age;
        }
       
    }

    // Gets the Pet owner location from the database
    async getPetOwnerLocation(){
        if (typeof this.Location !== 'string') {
            var sql = "SELECT * from Pet_Owners WHERE PoId = ?"
            const results = await db.query(sql, [this.PoId]);
            this.Location = results[0].Location;
        }
    }

    // Gets the Pet owner contact from the database
    async getPetOwnerContact(){
        if (typeof this.Contact !== 'string') {
            var sql = "SELECT * from Pet_Owners WHERE PoId = ?"
            const results = await db.query(sql, [this.PoId]);
            this.Contact = results[0].Contact;
        }
        
    }

    // Gets the Pet owner gender from the database
    async getPetOwnerPetId(){
        if (typeof this.PetId !== 'string') {
            var sql = "SELECT * from Pet_Owners WHERE PoId = ?"
            const results = await db.query(sql, [this.PoId]);
            this.PetId = results[0].PetId;
        }
        
    }
}


module.exports = {
    PetOwner
}
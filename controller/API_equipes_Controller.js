let express = require('express');
let app = express();
let equipes = require('../model/modelequipes');
let connection = require('../db');
let equipesList = [];

// select liste des joueurs in DB ==> envoi res vers fichier ejs pour affichage
exports.equipesList = function(req,res){
    connection.query("Select equipes.idequipes, equipes.nom_equipes, championnats.nom_championnats from equipes LEFT join championnats ON championnats.idchampionnats = equipes.idchampionnats", function (error, sqlRES) {
        if (error)  {
            res.status(400).json({'message':error});        
        }
        else {
            res.status(200);
            equipesList =  sqlRES;
            res.json({equipes:equipesList});
        }
    });
}

// ajouter une équipe à la db
exports.equipesAdd = function(req, res) {
    let nom_equipes =  req.body.nom_equipes;
    let idchampionnats = req.body.idchampionnats;
    
    let Equipes = new equipes(nom_equipes, idchampionnats);
    console.log(Equipes);
    connection.query("INSERT INTO equipes SET ?", Equipes, function (error, sqlRES) {
         if(error) {
            res.status(400).json({'message':error});
        }
        else{
            res.status(201).json({'message':'Nouvelle équipe ajoutée'});
        }
    });
}

//modifier une équipe
exports.equipesModif = function(req, res) {
    let idequipes = req.body.idequipes;
    let nom_equipes =  req.body.nom_equipes;
    let idchampionnats = req.body.idchampionnats;
    
    let Equipes = new equipes(nom_equipes, idchampionnats);
    console.log(Equipes);
    connection.query("UPDATE equipes SET ? WHERE id = ?", [Equipes, idequipes], function (error, sqlRES) {
        if(error) {
        res.status(400).json({'message':error});
        }
        else{
            res.status(202).json({'message':'Équipe modifiée'});
        }
    });
}


//supprimer une équipe
exports.equipesSupp = function(req, res){
    let idequipes = req.params.id;
    let supp = "DELETE FROM `equipes` WHERE (`equipes`.`idequipes` = ?)";
    connection.query(supp, idequipes, (error, sqlRES) => {
        if (error) {
            res.status(400).json({'message':error});
        }else{
            console.log("Équipe supprimée de la DB");
            res.json({'message':'Équipe supprimée'});
        }
    });
};
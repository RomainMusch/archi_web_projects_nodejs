let express = require('express');
let app = express();
let joueurs = require('../model/modeljoueurs');
let connection = require('../db');
let joueursList = [];

// select liste des joueurs in DB ==> envoi res vers fichier ejs pour affichage
exports.joueursList = function(req,res){
    connection.query("Select joueurs.idjoueurs, joueurs.nom_joueurs, joueurs.age_joueurs, joueurs.poste_joueurs, equipes.nom_equipes from joueurs LEFT join equipes ON equipes.idequipes = joueurs.idequipes", function (error, sqlRES) {
        if (error)  {
            res.status(400).json({'message':error});        
        }else {
            res.status(200);
            joueursList =  sqlRES;
            res.json({joueurs:joueursList});
        }
    });
}

// ajouter un joueur à la db
exports.joueursAdd = function(req, res) {
    let nom_joueurs =  req.body.nom_joueurs;
    let age_joueurs = req.body.age_joueurs;
    let poste_joueurs = req.body.poste_joueurs;
    let idequipes = req.body.idequipes;
    
    let Joueurs = new joueurs(nom_joueurs, age_joueurs, poste_joueurs, idequipes);
    console.log(Joueurs);
    connection.query("INSERT INTO joueurs SET ?", Joueurs, function (error, sqlRES) {
        if(error) {
            res.status(400).json({'message':error});
        }else{
            res.status(201).json({'message':'Nouveau joueur ajouté à la db'});
        }
    });
}

// modifier un joueur de la db
exports.joueursModif = function(req, res) {
    let idjoueurs = req.body.idjoueurs;
    let nom_joueurs =  req.body.nom_joueurs;
    let age_joueurs = req.body.age_joueurs;
    let poste_joueurs = req.body.poste_joueurs;
    let idequipes = req.body.idequipes;
    
    let Joueurs = new joueurs(nom_joueurs, age_joueurs, poste_joueurs, idequipes);
    console.log(Joueurs);
    connection.query("UPDATE joueurs SET ? WHERE idjoueurs = ?", [Joueurs, idjoueurs], function (error, sqlRES) {
        if(error) {
        res.status(400).json({'message':error});
        }else{
            res.status(202).json({'message':'Joueur mis à jour'});
        }
    });
}


//supprimer un joueur
exports.joueursSupp = function(req, res){
    let idjoueurs = req.params.id;
    let supp = "DELETE FROM joueurs WHERE (`joueurs`.`idjoueurs` = ?)";
    connection.query(supp, idjoueurs, (error, sqlRES) => {
        if (error) {
            res.status(400).json({'message':error});
        }else{
            console.log("Joueur supprimé de la DB");
            res.json({'messages':'Joueur supprimé'});
        }
    });
};
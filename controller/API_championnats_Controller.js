let express = require('express');
let app = express();
let championnats = require('../model/modelchampionnats');
let connection = require('../db');
championnatsList = [];

// select liste des joueurs in DB ==> envoi res vers fichier ejs pour affichage
exports.championnatsList = function(req,res){
    connection.query("Select championnats.idchampionnats, championnats.nom_championnats, championnats.pays_championnats from championnats", function (error, sqlRES) {
        if (error)  {
            res.status(400).json({'message':error});        
        }
        else {
            res.status(200);
            championnatsList =  sqlRES;
            res.json({championnats:championnatsList});
        }
    });
}

// ajouter un championnat à la db
exports.championnatsAdd = function(req, res) {
    let nom_championnats =  req.body.nom_championnats;
    let pays_championnats = req.body.pays_championnats;
    
    let Championnats = new championnats(nom_championnats, pays_championnats);
    console.log(Championnats);
    connection.query("INSERT INTO championnats SET ?", Championnats, function (error, sqlRES) {
        if(error) {
            res.status(400).json({'message':error});
        }
        else{
            res.status(201).json({'message':'Nouveau championnat ajouté'});
        }
    });
}

// modifier un championnat
exports.championnatsModif = function(req, res) {
    let idchampionnats = req.body.idchampionnats;
    let nom_championnats =  req.body.nom_championnats;
    let pays_championnats = req.body.pays_championnats;

    let Championnats = new championnats (nom_championnats, pays_championnats);
    console.log(Championnats);
    connection.query("UPDATE championnats SET ? WHERE id = ?", [Championnats, idchampionnats], function (error, sqlRES) {
        if(error) {
            res.status(400).json({'message':error});
        }
        else{
            res.status(202).json({'message':'Championnat modifié'});
        }
    });
}


//supprimer un championnat
exports.championnatsSupp = function(req, res){
    let idchampionnats = req.params.id;
    let supp = "DELETE FROM `championnats` WHERE (`championnats`.`idchampionnats` = ?)";
    connection.query(supp, idchampionnats, (error, sqlRES) => {
        if (error) {
            res.status(400).json({'message':error});
        }else{
            console.log("championnat supprimé de la DB");
            res.json({'message':'Championnat supprimé'});
        }
    });
};
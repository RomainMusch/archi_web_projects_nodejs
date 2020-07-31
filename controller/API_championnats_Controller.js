let express = require('express');
let app = express();
let championnats = require('../model/modelchampionnats');
let connection = require('../db');
championnatsList = [];

// select liste des joueurs in DB ==> envoi res vers fichier ejs pour affichage
exports.championnatsList = function(req,res){
    connection.query("Select championnats.idchampionnats, championnats.nom_championnats, championnats.pays_championnats from championnats", function (error, sqlRES) {
        if (error)  {
            res.status(400).json(error);        
        }
        else {
            res.status(200);
            championnatsList =  sqlRES;
            res.json('championnats.ejs', {championnats:championnatsList});
        }
    });
}

// ajouter ou modifier un championnat in db
exports.championnatsAdd = function(req, res) {
    let idchampionnats = req.body.idchampionnats;
    let nom_championnats =  req.body.nom_championnats;
    let pays_championnats = req.body.pays_championnats;
    
    if ( idchampionnats == "")
    {
        let Championnats = new championnats(nom_championnats, pays_championnats);
        console.log(Championnats);
        connection.query("INSERT INTO championnats SET ?", Championnats, function (error, sqlRES) {
            if(error) {
                res.status(400).json(error);
            }
            else{
                res.status(201).redirect('/championnats');
            }
        });
    }
    else if( idchampionnats >=0 )
    {
        let Championnats = new championnats (nom_championnats, pays_championnats);
        console.log(Championnats);
        connection.query("UPDATE championnats SET ? WHERE id = ?", [Championnats, idchampionnats], function (error, sqlRES) {
            if(error) {
                res.status(400).json(error);
            }
            else{
                res.status(202).redirect('/championnats');
            }
        });
    }
}


// form ajouter championnats

exports.championnatsForm = function(req, res) {
    connection.query("Select * from championnats", function (error, sqlRES){
        if (error) {
            res.status(400).json(error);
        }
        else{
            res.status(200);
            res.json('ajouter_championnats.ejs', {championnats:{idchampionnats:"", nom_championnats:"", pays_championnats:""}, championnats:sqlRES});
        }
    })
}

//form modifier un championnat
exports.championnatsModif = function (req, res) {
    let idchampionnats = req.params.id;
    connection.query("Select * from championnats WHERE championnats.idchampionnats = ?", idchampionnats,function (error, sqlRES){
        if (error)  {
            res.status(400).json(error);
        }else{
            res.status(200);   
            res.json('ajouter_championnats.ejs',{championnats:sqlRES[0]})         
        }
    });
    console.log(req.body); 
}

//supprimer un championnat
exports.championnatsSupp = function(req, res){
    let supp = "DELETE FROM `championnats` WHERE (`championnats`.`idchampionnats` = ?)";
    connection.query(supp, [req.params.idchampionnats], (error, sqlRES) => {
        if (error) {
            res.status(400).json(error);
        }else{
            console.log("championnat supprimé de la DB");
            res.redirect('/championnats');
        }
    });
};
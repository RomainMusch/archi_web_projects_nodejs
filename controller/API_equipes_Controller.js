let express = require('express');
let app = express();
let equipes = require('../model/modelequipes');
let connection = require('../db');
let equipesList = [];

// select liste des joueurs in DB ==> envoi res vers fichier ejs pour affichage
exports.equipesList = function(req,res){
    connection.query("Select equipes.idequipes, equipes.nom_equipes, championnats.nom_championnats from equipes LEFT join championnats ON championnats.idchampionnats = equipes.idchampionnats", function (error, sqlRES) {
        if (error)  {
            res.status(400).json(error);        
        }
        else {
            res.status(200);
            equipesList =  sqlRES;
            res.json('equipes.ejs', {equipes:equipesList});
        }
    });
}

// ajouter ou modifier une équipe in db
exports.equipesAdd = function(req, res) {
    let idequipes = req.body.idequipes;
    let nom_equipes =  req.body.nom_equipes;
    let idchampionnats = req.body.idchampionnats;
    
    if ( idequipes == "")
    {
        let Equipes = new equipes(nom_equipes, idchampionnats);
        console.log(Equipes);
        connection.query("INSERT INTO equipes SET ?", Equipes, function (error, sqlRES) {
            if(error) {
                res.status(400).json(error);
            }
            else{
                res.status(201).redirect('/equipes');
            }
        });
    }
    else if( idequipes >=0 )
    {
        let Equipes = new equipes(nom_equipes, idchampionnats);
        console.log(Equipes);
        connection.query("UPDATE equipes SET ? WHERE id = ?", [Equipes, idequipes], function (error, sqlRES) {
            if(error) {
            res.status(400).json(error);
            }
            else{
                res.status(202).redirect('/equipes');
            }
        });
    }
}


// form ajouter equipes

exports.equipesForm = function(req, res) {
    connection.query("Select * from championnats", function (error, sqlRES){
        if (error) {
            res.status(400).json(error);
        }
        else{
            res.status(200);
            res.json('ajouter_equipes.ejs', {equipes:{idequipes:"", nom_equipes:"", idchampionnats:""}, championnats:sqlRES});
        }
    })
}

//form modifier une équipe
exports.equipesModif = function (req, res) {
    let idequipes = req.params.id;
    connection.query("Select * from equipes WHERE equipes.idequipes = ?", idequipes,function (error, sqlRES){
        if (error)  {
            res.status(400).json(error);
        }else{
            connection.query("SELECT idchampionnats, nom_championnats FROM championnats ", function (error, sqlRESa){
                if (error){
                    res.status(400).json(error);
                }else{
                    res.status(200);   
                    res.json('ajouter_equipes.ejs',{equipes:sqlRES[0], championnats:sqlRESa})         
                }
            })
        }
    });
    console.log(req.body); 
}

//supprimer une équipe
exports.equipesSupp = function(req, res){
    let supp = "DELETE FROM `equipes` WHERE (`equipes`.`idequipes` = ?)";
    connection.query(supp, [req.params.idequipes], (error, sqlRES) => {
        if (error) {
            res.status(400).json(error);
        }else{
            console.log("Équipe supprimée de la DB");
            res.redirect('/equipes');
        }
    });
};
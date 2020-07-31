let express = require('express');
let app = express();
let joueurs = require('../model/modeljoueurs');
let connection = require('../db');
let joueursList = [];

// select liste des joueurs in DB ==> envoi res vers fichier ejs pour affichage
exports.joueursList = function(req,res){
    connection.query("Select joueurs.idjoueurs, joueurs.nom_joueurs, joueurs.age_joueurs, joueurs.poste_joueurs, equipes.nom_equipes from joueurs LEFT join equipes ON equipes.idequipes = joueurs.idequipes", function (error, sqlRES) {
        if (error)  {
            res.status(400).json(error);        
        }else {
            res.status(200);
            joueursList =  sqlRES;
            res.render('joueurs.ejs', {joueurs:joueursList});
        }
    });
}

// ajouter ou modifier un joueur in db
exports.joueursAdd = function(req, res) {
    let idjoueurs = req.body.idjoueurs;
    let nom_joueurs =  req.body.nom_joueurs;
    let age_joueurs = req.body.age_joueurs;
    let poste_joueurs = req.body.poste_joueurs;
    let idequipes = req.body.idequipes;
    
    if ( idjoueurs == "")
    {
        let Joueurs = new joueurs(nom_joueurs, age_joueurs, poste_joueurs, idequipes);
        console.log(Joueurs);
        connection.query("INSERT INTO joueurs SET ?", Joueurs, function (error, sqlRES) {
            if(error) {
                res.status(400).json(error);
            }else{
                res.status(201).redirect('/joueurs');
            }
        });
    }else if( idjoueurs >=0 )
    {
        let Joueurs = new joueurs(nom_joueurs, age_joueurs, poste_joueurs, idequipes);
        console.log(Joueurs);
        connection.query("UPDATE joueurs SET ? WHERE idjoueurs = ?", [Joueurs, idjoueurs], function (error, sqlRES) {
            if(error) {
            res.status(400).json(error);
            }else{
                res.status(202).redirect('/joueurs');
            }
        });
    }
}


// form ajouter joueurs

exports.joueursForm = function(req, res) {
    connection.query("Select * from equipes", function (error, sqlRES){
        if (error) {
            res.status(400).json(error);
        }else{
            res.status(200);
            res.render('ajouter_joueurs.ejs', {joueurs:{idjoueurs:"", nom_joueurs:"", age_joueurs:"", poste_joueurs:"", idequipes:""}, equipes:sqlRES});
        }
    })
}

//form modifier un joueur
exports.joueursModif = function (req, res) {
    let idjoueurs = req.params.id;
    connection.query("Select * from joueurs WHERE joueurs.idjoueurs = ?", idjoueurs,function (error, sqlRES){
        if (error)  {
            res.status(400).json(error);
        }else{
            connection.query("SELECT idequipes, nom_equipes FROM equipes ", function (error, sqlRESa){
                if (error){
                    res.status(400).json(error);
                }else{
                    res.status(200);   
                    res.render('ajouter_joueurs.ejs',{joueurs:sqlRES[0], equipes:sqlRESa})         
                }
            })
        }
    });
    console.log(req.body); 
}

//supprimer un joueur
exports.joueursSupp = function(req, res){
    let supp = "DELETE FROM `joueurs` WHERE (`joueurs`.`idjoueurs` = ?)";
    connection.query(supp, [req.params.idjoueurs], (error, sqlRES) => {
        if (error) {
            res.status(400).json(error);
        }else{
            console.log("Joueur supprimé de la DB");
            res.redirect('/joueurs');
        }
    });
};
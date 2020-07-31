// routage 
let express = require('express');
let app = express();
const router = express.Router();

// controller 
var joueurs_Controller = require('./controller/joueurs_Controller');
var API_joueurs_Controller = require('./controller/API_joueurs_Controller');

var equipes_Controller = require('./controller/equipes_Controller');
var API_equipes_Controller = require('./controller/API_equipes_Controller');

var championnats_Controller = require('./controller/championnats_Controller');
var API_championnats_Controller = require('./controller/API_championnats_Controller');

//routes
router.get('/', (req, res) => res.render('homepage.ejs'));

    // joueurs routes
router.get('/joueurs', (joueurs_Controller.joueursList));
router.get('/ajouter_joueurs', (joueurs_Controller.joueursForm));
router.post('/joueursAdd', (joueurs_Controller.joueursAdd));
router.get('/joueurs_modif/:id',(joueurs_Controller.joueursModif));
router.get('/joueurs_supp/:id', (joueurs_Controller.joueursSupp));
    //joueurs routes API
router.get('/joueurs', (API_joueurs_Controller.joueursList));
router.get('/ajouter_joueurs', (API_joueurs_Controller.joueursForm));
router.post('/joueursAdd', (API_joueurs_Controller.joueursAdd));
router.get('/joueurs_modif/:id',(API_joueurs_Controller.joueursModif));
router.get('/joueurs_supp/:id', (API_joueurs_Controller.joueursSupp));


    //équipes routes
router.get('/equipes', (equipes_Controller.equipesList));
router.get('/ajouter_equipes', (equipes_Controller.equipesForm));
router.post('/equipesAdd', (equipes_Controller.equipesAdd));
router.get('/equipes_modif/:id',(equipes_Controller.equipesModif));
router.get('/equipes_supp/:id', (equipes_Controller.equipesSupp));
    //équipes routes API
router.get('/equipes', (API_equipes_Controller.equipesList));
router.get('/ajouter_equipes', (API_equipes_Controller.equipesForm));
router.post('/equipesAdd', (API_equipes_Controller.equipesAdd));
router.get('/equipes_modif/:id',(API_equipes_Controller.equipesModif));
router.get('/equipes_supp/:id', (API_equipes_Controller.equipesSupp));


    //championnats routes
router.get('/championnats', (championnats_Controller.championnatsList));
router.get('/ajouter_championnats', (championnats_Controller.championnatsForm));
router.post('/championnatsAdd', (championnats_Controller.championnatsAdd));
router.get('/championnats_modif/:id',(championnats_Controller.championnatsModif));
router.get('/championnats_supp/:id', (championnats_Controller.championnatsSupp));
    //championnats routes
router.get('/championnats', (API_championnats_Controller.championnatsList));
router.get('/ajouter_championnats', (API_championnats_Controller.championnatsForm));
router.post('/championnatsAdd', (API_championnats_Controller.championnatsAdd));
router.get('/championnats_modif/:id',(API_championnats_Controller.championnatsModif));
router.get('/championnats_supp/:id', (API_championnats_Controller.championnatsSupp));

module.exports = router;
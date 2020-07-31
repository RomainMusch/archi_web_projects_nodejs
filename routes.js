// routage 
let express = require('express');
let app = express();
const router = express.Router();

// controller 
var joueurs_Controller = require('./controller/joueurs_Controller');
var joueursControllerApi = require('./controller/API_joueurs_Controller');

var equipes_Controller = require('./controller/equipes_Controller');
//var equipesControllerApi = require('./controllers/API_equipes_Controller');

var championnats_Controller = require('./controller/championnats_Controller');
//var championnatsControllerApi = require('./controllers/API_championnats_Controller');

//routes
router.get('/', (req, res) => res.render('homepage.ejs'));

    // joueurs routes
router.get('/joueurs', (joueurs_Controller.joueursList));
router.get('/ajouter_joueurs', (joueurs_Controller.joueursForm));
router.post('/joueursAdd', (joueurs_Controller.joueursAdd));
router.get('/joueurs_modif/:id',(joueurs_Controller.joueursModif));
router.get('/joueurs_supp/:id', (joueurs_Controller.joueursSupp));
    //joueurs routes API
//router.get('/api/joueurs', joueursControllerApi.joueursList);
//router.get('/api/joueurs/:id', joueursControllerApi.joueursListSolo);
//router.post('/api/joueurs', joueursControllerApi.joueursAdd);


    //équipes routes
router.get('/equipes', (equipes_Controller.equipesList));
router.get('/ajouter_equipes', (equipes_Controller.equipesForm));
router.post('/equipesAdd', (equipes_Controller.equipesAdd));
router.get('/equipes_modif/:id',(equipes_Controller.equipesModif));
router.get('/equipes_supp/:id', (equipes_Controller.equipesSupp));


    //championnats routes
router.get('/championnats', (championnats_Controller.championnatsList));
router.get('/ajouter_championnats', (championnats_Controller.championnatsForm));
router.post('/championnatsAdd', (championnats_Controller.championnatsAdd));
router.get('/championnats_modif/:id',(championnats_Controller.championnatsModif));
router.get('/championnats_supp/:id', (championnats_Controller.championnatsSupp));


module.exports = router;
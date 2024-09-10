require('dotenv').config({path: '.env'});
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erreur interruption,operation annulée!');
});
app.use(bodyParser.json({ strict: true }));


app.use(express.json());



/*  ----------------------------------------debut des endpoints----------------------------------------------  */ 

/*-----------------------------------------------ACCUEIL-------------------------------------------------------*/

app.get('/accueil', (req, res) => {
    res.status(200).json({ message: "Bienvenu sur mon API de gestion des personnages Harry Potter" });
});

/*------------------------------------------*/ 
const Personnages={    
personnages: [
    {
      "id":1,
      "role": "Harry Potter"
    },
    {
      "id":2,
      "role": "Hermione Granger"
    },
    {
      "id":3,
      "role": "Ron Weasley"
    },
    {
      "id":4,
      "role": "Albus Dumbledore"
    },
    {
      "id":5,
      "role": "Drago Malfoy"
    },
    {
      "id":6,
      "role": "Severus Snape"
    },
    {
      "id":7,
      "role": "Minerva McGonagall"
    },
    {
      "id":8,
      "role": "Rubeus Hagrid"
    },
    {
      "id":9,
      "role": "Sirius Black"
    },
    {
      "id":10,
      "role": "Dolores Umbridge"
    }
  ]
};



/* ------------------------------------------------ GET -------------------------------------- */

// Afficher tout les personnages 

app.get('/api/personnages', (req, res) => {
    res.status(200).send(Personnages)
});
      

  
// Afficher un personnage par son ID    

app.get('/api/personnages/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const personnages = Personnages.personnages.find(personnage => personnage.id === id);
    
    if (personnages) {
      res.json({ PERSONNAGE : personnages.role });
    } else {
      res.status(404).json({ message: "personnage non trouvé" });
    }
  });



/* ------------------------------------------------ POST -------------------------------------- */
 

 // Ajout  d'un utilisateur. 

 app.post('/api/personnages/',(req,res)=>{

 // insertion via le body

const {id,role}=req.body;

Personnages.personnages.push({id,role});
res.status(201).json({id,role});



//alternative insertion "en dur" du personnage dans le tableau.


// objet a entrer "en dur".
/*
 const bellatrix={
    id: parseInt(11),
    role:"bellatrix"
};

Personnages.personnages.push(bellatrix);
res.status(201).json(bellatrix);
*/

});



/* ------------------------------------------------ PUT -------------------------------------- */

// Modifier un utilisateur

app.put('/api/personnages/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  // Recherche du personnage dans le tableau des objets
  const PersonnageIndex = Personnages.personnages.findIndex(personnage => personnage.id === id);
  
  if (PersonnageIndex === -1) {
    return res.status(404).json({ message: "Personnage non trouvé" });
  }

  // Parser la request body
  const { role } = req.body;

  // mise a jour du personnage
  Personnages.personnages[PersonnageIndex].role = role;

  // envoyer le personnage dans le tableau 
  res.status(200).json(Personnages.personnages[PersonnageIndex]);
});








/* ------------------------------------------------ DELETE -------------------------------------- */


  // Effacer un utilisateur 
app.delete('/api/personnages/:id', (req, res) => {
  const  id = parseInt(req.params.id);


  // Recherche du personnage dans le tableau des objets
  const PersonnageIndex = Personnages.personnages.findIndex((personnage) => personnage.id === id);
  
  if (PersonnageIndex === -1) {
    return res.status(404).json({ message: "Personnage non trouvé" });
  }

  Personnages.personnages.splice(PersonnageIndex, 1);
  res.status(204).send(` personnage : ${id} effacé `);

});



/*--------------------------------------------------------------------------------------------------------------*/









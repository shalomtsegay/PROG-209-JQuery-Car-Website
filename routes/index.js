var express = require('express');
var router = express.Router();

let serverCarArray = [];

let carObject = function (cTitle, cYear, cBrand, cColor, cCost, cURL) {
    this.ID = Math.random().toString(16).slice(5)
    this.Title = cTitle;  // Name of car
    this.Year = cYear;   // Year of release
    this.Brand = cBrand;  // Car brand
    this.Color = cColor;  // Car color
    this.Cost = cCost;  // approx cost in USD
    this.URL = cURL;
}

serverCarArray.push(new carObject("Lamborghini Urus", "2023", "Lamborghini", "Yellow", "200,000$","\images\\Lamborghini_Urus.jpg"));
serverCarArray.push(new carObject("Audi RS Q8", "2023", "Audi", "Black", "126,995$", "images\\Audi_RS_Q8.jpg"));
serverCarArray.push(new carObject("BMW X5 M", "2020", "BMW", "Blue", "106,095$", "\images\\BMW_X5_M.jpg"));
serverCarArray.push(new carObject("Porsche Cayenne Turbo", "2022", "Posrche", "White", "131,250$", "\images\\Cayenne_Turbo.jpg"));
serverCarArray.push(new carObject("Porsche 718 Boxster", "2023", "Porsche", "Green", "66,950$", "\images\Porsche_718_Boxster.jpg"));
serverCarArray.push(new carObject("Lamborghini Sián", "2021", "Lamborghini", "Dark Gold", "3,000,000", "\images\Lamborghini_Sian.jpg"));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getAllCars', function(req, res, next) {
res.status(200).json(serverCarArray);
});


router.post('/AddCar', function(req, res) {
  const newCar = req.body;
  serverCarArray.push(newCar);
  res.status(200).json(newCar);
  });


  router.delete('/DeleteCar/ :ID', (req, res) => {
    const delID = req.params.ID;
    let found = false;
    let pointer = GetArrayPointer(delID);  
    if(pointer == -1){
      console.log("not found");
      return res.status(500).json({
        status: "error - no such ID"
      });
    }
    else {
      serverCarArray.splice(pointer, 1);
      res.send('Movie with ID: ' + delID + ' deleted!');
    }
  });

  
  function GetArrayPointer(localID) {
    for (let i = 0; i < serverCarArray.length; i++) {
        if (localID === serverCarArray[i].ID) {
            return i;
        }
    }
}

module.exports = router;

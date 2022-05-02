var express = require('express');
var mysql = require('mysql2');
var app = express();
var customer_id = -1;

//DATABASE CONFIGURATION
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Su09ga03!!",
  database: "rental_car"
});

//GLOBAL PARAMETERS
var gbl = {
	customer: 0,
	search: '',
	dropoff: undefined,
	pickup: undefined,
	dropofftime: undefined,
	pickuptime: undefined,
	cartype: undefined,
	price: undefined,
	status: undefined
}

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static("public"));

///***************LOGIN , REGISTRATION AND SEARCH PAGE by Arpit***********************

//Entry Point
app.get('/', function(req, res) {
    res.render('pages/login');
  });
  
  //Handle Searching Entry Point
  app.get('/search', function (req, res) {
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  
  //Handle Logout
  app.post('/logout', function(req, res) {
      res.render('pages/login');
    });
  
  
  //Handle Login
  app.post('/login', function (req, res) {
      var name = req.body.uname
      var pass = req.body.psw
      gbl = {
          customer: 0,
          search: '',
          dropoff: undefined,
          pickup: undefined,
          dropofftime: undefined,
          pickuptime: undefined,
          cartype: undefined,
          price: undefined,
          status: undefined
      }
      login( name, pass ).then( result => { 
             if ( result ) { 
                  searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
             } 
             else {
                   res.redirect('back') 
             } 
      } )
  });
  
  //Handle Registration
  app.post('/register', function (req, res) {
       
      res.render('pages/register');
  });
  
  
  //Handle Saving Registration
  app.post('/save', function (req, res) {
  
      var first = req.body.First    
      var last = req.body.Last    
      var address = req.body.Address    
      var city = req.body.City    
      var state = req.body.State    
      var zip = req.body.Zip   
      var license = req.body.License   
      var email = req.body.Email   
      var user = req.body.User    
      var pass = req.body.Password    
      var phone = req.body.Phone    
      var insurance = req.body.Insurance_yes_no    
      
      try{
          
          register(first,last,address,city,state,zip,license,email,user,pass,phone,insurance).then( result => { res.render('pages/login') } )
      
      }catch(e) {
              res.render('pages/login');
  
      }
  });
  
  //Handle Canceling Registration
  app.post('/cancel', function (req, res) {
      
      res.render('pages/login');
  });
  
  //Handle Searching
  app.post('/search', function (req, res) {
      copyParameters(req)
      //console.log(gbl.pickuptime + " : "+  gbl.dropofftime)
      //console.log( new Date() )
      //console.log( new Date('2022-04-26 21:06:30') )
      //console.log(new Date(gbl.pickuptime.replace('T', ' ')) + " : " + ( new Date(gbl.dropofftime) ) )
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  
  //Handle Reserving Cars
  app.post('/Reserve1', function(req, res) {
      reserveCar(1,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve2', function(req, res) {
      reserveCar(2,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve3', function(req, res) {
      reserveCar(3,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve4', function(req, res) {
      reserveCar(4,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve5', function(req, res) {
      reserveCar(5,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve6', function(req, res) {
      reserveCar(6,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve7', function(req, res) {
      reserveCar(7,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve8', function(req, res) {
      reserveCar(8,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve9', function(req, res) {
      reserveCar(9,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve10', function(req, res) {
      reserveCar(10,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve11', function(req, res) {
      reserveCar(11,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve12', function(req, res) {
      reserveCar(12,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve13', function(req, res) {
      reserveCar(13,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve14', function(req, res) {
      reserveCar(14,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve15', function(req, res) {
      reserveCar(15,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve16', function(req, res) {
      reserveCar(16,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve17', function(req, res) {
      reserveCar(17,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve18', function(req, res) {
      reserveCar(18,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve19', function(req, res) {
      reserveCar(19,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  app.post('/Reserve20', function(req, res) {
      reserveCar(20,req)
      searchData().then( result => { if ( result ) res.render('pages/search', result ); else res.redirect('back'); } )
  });
  
      //**************************Login and Search controller functions**************************
  
  function copyParameters(req) {
      gbl.search = req.body.search
     gbl.dropoff = req.body.dropoff
     gbl.pickup = req.body.pickup
     gbl.dropofftime = req.body.dropofftime
     gbl.pickuptime = req.body.pickuptime
     gbl.cartype = req.body.cartype
     gbl.price = req.body.price
     gbl.status = undefined
  }
  
  function copyParametersFromReserve(req) {
     gbl.dropoff = req.body.dropoff_
     gbl.pickup = req.body.pickup_
     gbl.dropofftime = req.body.dropofftime_
     gbl.pickuptime = req.body.pickuptime_
  }
  
  async function login( username, pass ) {
     
     let found = false
     try {
         const user = await loginUser( username, pass )
         found = user != [] && user[0][0].Customer_login_username == username
         customer_id = user[0][0].Customer_id
         var value = await getCustomerId( username )
         gbl.customer = value[0].Customer_id
     //console.log(value)
     }catch(e) {
         found = false
     }
     if ( found ) {
          return true
     }
     return false
  }
  
  async function register(first,last,address,city,state,zip,license,email,user,pass,phone,insurance) {
     var ins = 0
     if ( insurance == 'yes') {
         ins = 1
     }
     const add = registerUser(first,last,address,city,state,zip,license,email,user,pass,phone,ins)
  
     
  }
  
  async function reserveCar(car_index, req) {
     copyParametersFromReserve(req)
     //console.log(req.body)
     if (!validateReserve() ) {
         return;
     }
     var cars = await searchResults( );
     var car_id = cars[car_index - 1].Car_id;
     try {
          var cost = cars[ car_index - 1].Rental_price_per_hour*( (new Date(gbl.dropofftime)).getTime()-(new Date(gbl.pickuptime)).getTime())/3600000.0;
          await reserveThisCar(gbl.customer,car_id, (new Date(gbl.pickuptime)), (new Date(gbl.dropofftime)), gbl.pickup, gbl.dropoff, cost );
          gbl.status = "Success: Car was reserved!"
     }catch(err) {
         gbl.status = "Error: Unable to reserve car: " + err
     }
  }
  function validateReserve() {
     if ( gbl.pickup == undefined || gbl.pickup < 1 ) {
           gbl.status = "Error: Please select Pickup Location";
           return false;
     }
     else if ( gbl.dropoff == undefined || gbl.dropoff < 1 ) {
           gbl.status = "Error: Please select Dropoff Location";
           return false;
     }
     else if ( gbl.pickuptime == undefined || gbl.pickuptime == '' ) {
           gbl.status = "Error: Please select Pickup Time";
           return false;
     }
     else if ( gbl.dropofftime == undefined || gbl.dropofftime == '') {
           gbl.status = "Error: Please select Dropoff Time";
           return false;
     }
     else if ( gbl.dropofftime <= gbl.pickuptime ) {
           gbl.status = "Error: Please select Dropoff time later than Pickup time";
           return false;
     }
  
     return true;
  }
  async function searchData() {
     var dropoffs = await searchLocations()
     var pickups  = await searchLocations();
     var cars = await searchCarTypes()
     var prices = searchPrices()
     var results = await searchResults()
     return {gbl: gbl,results: results, dropoffs: dropoffs, pickups: pickups, cars: cars, prices: prices};
  }
  
  //DB Tables
  //car_types = {Car_type_id, Car_type} 
  //Cars = {Car_id, Car_type_id, Make, Model, Make_year, Color, Rental_price_per_hour, Available_for_rent }
  //Locations = {Location_id, Location_description, Location_Zip}
  //repos = {desc = Cars.make+model+year, Cars.color, Cars.price }
  //Searching = Cars.available->Car.Car_type_id
  
  async function searchCarTypes() {
     var types = [{Car_type_id:0, Car_type: 'Select car type'}]
     var cars = await getAllCarTypes()
     cars.forEach(function(car) {
         types.push(car)
     });
     return types
  }
  
  function searchPrices() {
         var prices = [{id:0, name: 'Select price per hour'}, {id:1, name: '5-10$/hr'},{id:2, name: '10-15$/hr'},{id:3, name: '+15$/hr'}]
         return prices;
  }
  
  async function searchResults() {
     var results = await searchCars(new Date(gbl.pickuptime), gbl.pickup)
     var results1 = []
     results.forEach(function(result) {
         if ( gbl.cartype == undefined || gbl.cartype == 0 || gbl.cartype == result.Car_type_id) {
               results1.push(result)
         }
     })
     var results2 = []
     results1.forEach(function(result) {
         if ( gbl.price == undefined || gbl.price == 0 || (gbl.price == 1 && result.Rental_price_per_hour < 10) || 
             ( gbl.price == 2 && result.Rental_price_per_hour >= 10 && result.Rental_price_per_hour < 15) || 
             ( gbl.price == 3 && result.Rental_price_per_hour >= 15) ) {
               results2.push(result)
         }
     })
     var results3 = []
     results2.forEach(function(result) {
         if ( gbl.pickup == result.Current_location_id) {
               results3.push(result)
         }
     })
     return results3
  }
  
  async function searchCars(pickupdatetime, pickuplocation) {
     var cars1 = await getAllCars();
     var more = await getMoreCars(pickupdatetime, pickuplocation);
     var cars = []
     //console.log('More')
     //console.log(more)
     cars1.forEach(function(car) {
         cars.push(car);
     });
     /*
     more.forEach(function(car) {
         car.Current_location_id = pickuplocation;
         cars.push(car);
     });
     */
     return cars;
  }
  
  async function searchLocations() {
     var locations = await getAllLocations()
     found = []
     locations.forEach(function(location) {
         if ( location.Location_Zip == gbl.search ) {
             found.push(location)
         }
     });
     return found
  }
  
      //*****************Login and Search DB Access*************************
  
  getAllCarTypes = () => {
     return new Promise((resolve, reject)=>{
         con.query("SELECT * FROM car_types",  (error, elements)=>{
             if(error){
                 return reject(error);
             }
             return resolve(elements);
         });
     });
  
  };
  
  getAllCars = () => {
     return new Promise((resolve, reject)=>{
         con.query("SELECT * FROM cars WHERE Available_for_rent = 1",  (error, elements)=>{
             if(error){
                 return reject(error);
             }
             return resolve(elements);
         });
     });
  
  };
  
  getMoreCars = (pickupdatetime, pickuplocation) => {
     return new Promise((resolve, reject)=>{
         con.query("SELECT * FROM cars C WHERE Available_for_rent = 0 AND C.Car_id IN ( SELECT DISTINCT Car_id from reservations R where R.DropoffDateTime < ? AND R.Dropoff_Location_id = ? )", [pickupdatetime, pickuplocation], (error, elements)=>{
             if(error){
                 return reject(error);
             }
             return resolve(elements);
         });
     });
  
  };
  
  getAllReservations = () => {
     return new Promise((resolve, reject)=>{
         con.query("SELECT * FROM reservations",  (error, elements)=>{
             if(error){
                 return reject(error);
             }
             return resolve(elements);
         });
     });
  
  };
  
  getAllCustomers = () => {
     return new Promise((resolve, reject)=>{
         con.query("SELECT * FROM customers",  (error, elements)=>{
             if(error){
                 return reject(error);
             }
             return resolve(elements);
         });
     });
  
  };
  
  
  getAllLocations = () => {
     return new Promise((resolve, reject)=>{
         con.query("SELECT * FROM locations",  (error, elements)=>{
             if(error){
                 return reject(error);
             }
             return resolve(elements);
         });
     });
  
  };
  loginUser = (username, pass) =>{
     return new Promise((resolve, reject)=>{
         con.query("CALL login_user(?,?)",[ username, pass],  (error, elements)=>{
             if(error){
                 return reject(error);
             }
             return resolve(elements);
         });
     });
  };
  
  getCustomerId = (username) =>{
     return new Promise((resolve, reject)=>{
         con.query("SELECT Customer_id from customers where Customer_login_username = ?",[ username ],  (error, elements)=>{
             if(error){
                 return reject(error);
             }
             return resolve(elements);
         });
     });
  };
  
  reserveThisCarOld = (car_id) =>{
     return new Promise((resolve, reject)=>{
         con.query("UPDATE cars set Available_for_rent = 0 where Car_id = ?",[ car_id ],  (error, elements)=>{
             if(error){
                 return reject(error);
             }
             return resolve(elements);
         });
     });
  };
  
  registerUser = (first,last,address,city,state,zip,address2,email,user,pass,phone,insurance) =>{
     return new Promise((resolve, reject)=>{
         con.query ("CALL register(?,?,?,?,?,?,?,?,?,?,?,?)",[first,last,address,address2,city,state,zip,email,user,pass,phone,insurance],(error, elements)=>{
             if(error){
                 return reject(error);
             }
             return resolve(elements);
         });
     });
  }
     
  registerUserOLD = (first,last,address,city,state,zip,license,email,user,pass,phone,insurance) =>{
     return new Promise((resolve, reject)=>{
         con.query("INSERT INTO customers (Customer_First_Name,Customer_last_name,Customer_Address1, Customer_Address2, Customer_City,Customer_State,Customer_zip,Customer_Driver_License,Customer_email,Customer_login_username,Customer_login_password,Customer_Phone_Number,Insurance_yes_no) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?) ",[ first, last,address,'',city,state,zip,license,email,user,pass,phone,insurance],  (error, elements)=>{
             if(error){
                 return reject(error);
             }
             return resolve(elements);
         });
     });
  };
  
  reserveThisCar = (customer,car,pickup,dropoff,pickup_location,dropoff_location,cost) =>{
     //console.log([ customer,car,pickup,dropoff,pickup_location,dropoff_location,cost]);
     return new Promise((resolve, reject)=>{
         con.query("CALL reserve_car(?,?,?,?,?,?,?) ",
         [ customer,car,pickup,dropoff,pickup_location,dropoff_location,cost],  (error, elements)=>{
             if(error){
                 return reject(error);
             }
             return resolve(elements);
         });
     });
  };



///*************** BILLING PAGE by Ishika ******************************************
app.get('/billing', function (req, res) {
    ////console.log("About to get");
    const reservations = getBilling().then( reservations =>
                                      { //console.log(reservations);
                                        res.render('pages/billing', { reservations : reservations[0] }); } );
    //getBilling();
});

app.post('/filterByDate', function (req, res) {
    //console.log(req.body);
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    const reservations = getFilteredBilling(startDate, endDate).then( reservations =>
                                          { //console.log(reservations);
                                            res.render('pages/billing', { reservations : reservations[0] }); } );
});
    //*************** Billing controller functions and DB access ******************************************

billing = () =>{
    return new Promise((resolve, reject)=>{
        con.query("CALL get_billing(?);",[ customer_id ],  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

filteredBilling = (startDate, endDate) =>{
    return new Promise((resolve, reject)=>{
        con.query("CALL get_billing_filtered(?,?,?);",[ customer_id , startDate , endDate ],  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

async function getBilling() {
    const reservations = await billing();

    //console.log(reservations);

    return reservations;
}

async function getFilteredBilling(startDate, endDate) {
    var reservations;
    if (startDate == '' || endDate == '') {
        reservations = await billing();
    } else {
        reservations = await filteredBilling(startDate, endDate);
    }

    ////console.log(reservations);

    return reservations;
}



/* -------------------------- UPCOMING TRIPS PAGE by Maeve ------------------------------------- */
app.get('/upcoming', async function(req, res) {
    var upcoming = await fetchUpcomingTrips()
    if( (upcoming == null || upcoming.length == 0) && (customer_id == -1)) {
        upcoming = "not logged in";
    } else if(upcoming == null || upcoming.length == 0) {
        upcoming = "no upcoming";
    }
    //console.log(upcoming);
    res.render('pages/upcoming', {trips: upcoming});
});

app.post('/delete_trip',  async function(req, res){
    try {
        var success = await deleteTrip(req.body.reservation_id);
    } catch (e) {
        console.log(e)
    }
    res.redirect("/upcoming");
});

app.post('/edit_trip_form', async function(req, res){
    var trip = {
        reservation_id: req.body.reservation_id,
        car: req.body.car_details,
        color: req.body.car_color,
        car_type: req.body.car_type,
        per_hour: req.body.per_hour,
        pickup_location: req.body.pickup_location,
        pickup_date: req.body.pickup_date,
        dropoff_location: req.body.dropoff_location,
        dropoff_location_id: req.body.dropoff_location_id,
        dropoff_date: req.body.dropoff_date,
        cost: req.body.cost
    }
    var locations = await fetchLocations(trip.dropoff_location_id)
    res.render('pages/edit_trip', {trip: trip, currdate: new Date().toISOString().split("T")[0], locations: locations})
});

app.post('/edit_trip', async function(req, res){
    var update = await editReservation(req.body.reservation_id, 
            req.body.pickup_date.replace("T", " "), 
            req.body.dropoff_location_id,
            req.body.dropoff_date.replace("T", " "),
            req.body.cost)
    res.redirect('/upcoming');
});

app.post('/edit_cancel', function (req, res) {
    //var name = req.body.firstName + ' ' + req.body.lastName;
    res.redirect('/upcoming');
});


upcomingTrips = (user_id) => {
    return new Promise((resolve, reject)=>{
        var currDateTime = new Date().toISOString().slice(0, 19).replace("T", " "); //get current date time and convert to SQL format
        con.query("CALL fetch_upcoming(?,?)", [user_id, currDateTime], (error, elements)=>{
            if(error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

deleteTrip = (reservation_id) => {
    return new Promise((resolve, reject)=>{
        con.query("CALL delete_trip(?)", [reservation_id], (error, elements)=>{
            if(error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

allLocations = (curr_location) => {
    return new Promise((resolve, reject)=>{
        con.query("CALL fetch_locations(?)", [curr_location], (error, elements)=>{
            if(error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

updateTrip = (reservation_id, new_pickup_date, new_dropoff_location_id, new_dropoff_date, new_cost) => {
    return new Promise((resolve, reject)=>{
        con.query("CALL edit_reservation(?,?,?,?,?)", [reservation_id, new_pickup_date, new_dropoff_location_id, new_dropoff_date, new_cost], (error, elements)=>{
            if(error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
}


async function fetchUpcomingTrips(){
    try {
        var upcoming = await upcomingTrips(gbl.customer)
    } catch(e){
        //console.log(e)
        return null;
    }
    return upcoming[0];

}

async function fetchLocations(curr_location){
    try {
        var locations = await allLocations(curr_location)
    } catch(e){
        //console.log(e)
        return null;
    }
    return locations[0];

}

async function editReservation(reservation_id, new_pickup_date, new_dropoff_location_id, new_dropoff_date, new_cost){
    try {
        var update = updateTrip(reservation_id, new_pickup_date, new_dropoff_location_id, new_dropoff_date, new_cost)
    } catch(e){
        return false;
    }
    return true;

}


/* Server connection */

app.listen(5000);
console.log('Server is listening on port 5000');

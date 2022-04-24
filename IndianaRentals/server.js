var express = require('express');
var mysql = require('mysql2');
var app = express();
var customer_id = -1;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Su09ga03!!",
  database: "rental_car"
});

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static("public"));

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/login');
});

app.post('/login', function (req, res) {
	var name = req.body.uname
	var pass = req.body.psw
    login( name, pass ).then( result => {
	       if ( result ) {
		        res.render('pages/main')
		   }
		   else {
			     res.redirect('back')
		   }
    } )
});

app.post('/register', function (req, res) {
    //var name = req.body.firstName + ' ' + req.body.lastName;

    res.render('pages/register');
});

app.post('/save', function (req, res) {

    var first = req.body.First
    var last = req.body.Last
    var address = req.body.Address
    var city = req.body.City
    var state = req.body.State
    var zip = req.body.Zip
    var address2 = req.body.Address2
    var email = req.body.Email
    var user = req.body.User
    var pass = req.body.Password
    var phone = req.body.Phone
    var insurance = req.body.Insurance_yes_no

	try{

		register(first,last,address,city,state,zip,address2,email,user,pass,phone,insurance).then( result =>
 { res.render('pages/login') } )

	}catch(e) {
		    res.render('pages/index');

	}
});
app.post('/cancel', function (req, res) {
    //var name = req.body.firstName + ' ' + req.body.lastName;

    res.render('pages/login');
});

//For billing page
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

/* -------------------------- UPCOMING TRIP PAGE ------------------------------------- */
app.get('/upcoming', async function(req, res) {
    var upcoming = await fetchUpcomingTrips()
    if(upcoming.length == 0 && customer_id == -1) {
        upcoming = "not logged in";
    } else if(upcoming.length == 0) {
        upcoming = "no upcoming";
    }
    res.render('pages/upcoming', {trips: upcoming});
});

app.post('/delete_trip',  async function(req, res){
    try {
        var success = await deleteTrip(req.body.reservation_id);
    } catch (e) {
        //console.log(e)
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

registerUser = (first,last,address,city,state,zip,address2,email,user,pass,phone,insurance) =>{
    return new Promise((resolve, reject)=>{
	con.query ("CALL register(?,?,?,?,?,?,?,?,?,?,?,?)",
 [first,last,address,address2,city,state,zip,email,user,pass,phone,insurance],(error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

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


/* END OF UPCOMING TRIP PAGE */
/*
        con.query("INSERT INTO customers (Customer_First_Name,Customer_last_name,Customer_Address1, Customer_Address2, Customer_City,Customer_State,
Customer_zip,Customer_Driver_License,Customer_email,Customer_login_username,Customer_login_password,Customer_Phone_Number,Insurance_yes_no)
VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?) ",[ first, last,address,'',city,state,zip,license,email,user,pass,phone,insurance]
*/


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

async function login( username, pass ) {

	let found = false
	try {
		const user = await loginUser( username, pass )
		customer_id = user[0][0].Customer_id
		found = user != [] && user[0][0].Customer_login_username == username
        customer_id = user[0][0].Customer_id
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

async function getBilling() {
    const reservations = await billing();

    //console.log(reservations);

    return reservations;
}

async function getFilteredBilling(startDate, endDate) {
    var reservations;
    if (startDate == '' && endDate == '') {
        reservations = await billing();
    } else {
        reservations = await filteredBilling(startDate, endDate);
    }

    ////console.log(reservations);

    return reservations;
}

async function fetchUpcomingTrips(){
    try {
        var upcoming = await upcomingTrips(customer_id)
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
        //console.log(reservation_id);
        //console.log(new_pickup_date)
        //console.log(new_dropoff_date);
        //console.log(new_dropoff_location_id);
        var update = updateTrip(reservation_id, new_pickup_date, new_dropoff_location_id, new_dropoff_date, new_cost)
    } catch(e){
        //console.log(e)
        return false;
    }
    return true;

}


app.listen(5000);
console.log('Server is listening on port 5000');

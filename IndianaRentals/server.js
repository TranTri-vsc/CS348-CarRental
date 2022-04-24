var express = require('express');
var mysql = require('mysql2');
var app = express();
var customer_id = -1;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "#Sjh20021",
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
    //console.log("About to get");
    const reservations = getBilling().then( reservations =>
                                      { console.log(reservations);
                                        res.render('pages/billing', { reservations : reservations[0] }); } );
    //getBilling();
});

app.post('/filterByDate', function (req, res) {
    console.log(req.body);
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    const reservations = getFilteredBilling(startDate, endDate).then( reservations =>
                                          { console.log(reservations);
                                            res.render('pages/billing', { reservations : reservations[0] }); } );
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
/*
        con.query("INSERT INTO customers (Customer_First_Name,Customer_last_name,Customer_Address1, Customer_Address2, Customer_City,Customer_State,
Customer_zip,Customer_Driver_License,Customer_email,Customer_login_username,Customer_login_password,Customer_Phone_Number,Insurance_yes_no)
VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?) ",[ first, last,address,'',city,state,zip,license,email,user,pass,phone,insurance]
*/
};

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
		console.log(user)
		//console.log(customer_id)
		found = user != [] && user[0][0].Customer_login_username == username
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

    console.log(reservations);

    return reservations;
}

async function getFilteredBilling(startDate, endDate) {
    var reservations;
    if (startDate == '' && endDate == '') {
        reservations = await billing();
    } else {
        reservations = await filteredBilling(startDate, endDate);
    }

    //console.log(reservations);

    return reservations;
}

app.listen(5000);
console.log('Server is listening on port 5000');

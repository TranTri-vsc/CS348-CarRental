var express = require('express');
var mysql = require('mysql2');
var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Krishna12!",
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
    var license = req.body.License   
    var email = req.body.Email   
    var user = req.body.User    
    var pass = req.body.Password    
    var phone = req.body.Phone    
    var insurance = req.body.Insurance_yes_no    
	
	try{
		
		register(first,last,address,city,state,zip,license,email,user,pass,phone,insurance).then( result => { res.render('pages/login') } )
	
	}catch(e) {
		    res.render('pages/index');

	}
});
app.post('/cancel', function (req, res) {
    //var name = req.body.firstName + ' ' + req.body.lastName;
    
    res.render('pages/login');
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

registerUser = (first,last,address,city,state,zip,license,email,user,pass,phone,insurance) =>{
    return new Promise((resolve, reject)=>{
        con.query("INSERT INTO customers (Customer_First_Name,Customer_last_name,Customer_Address1, Customer_Address2, Customer_City,Customer_State,Customer_zip,Customer_Driver_License,Customer_email,Customer_login_username,Customer_login_password,Customer_Phone_Number,Insurance_yes_no) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?) ",[ first, last,address,'',city,state,zip,license,email,user,pass,phone,insurance],  (error, elements)=>{
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

app.listen(5000);
console.log('Server is listening on port 5000');

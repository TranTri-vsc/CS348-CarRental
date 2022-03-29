Create database rentalcar;


Create table car_types(
Car_type_id int primary key not null auto_increment,
Car_type varchar(200) not null,
index(car_type)

);

  
Create table locations(
      Location_id  int primary key not null auto_increment ,
      location_description varchar(500) ,
      Location_Address varchar(500) not null,
      Location_City varchar(200) not null,
      Location_State varchar(30) not null,
      Location_Zip   varchar(5) not null,
      index(location_zip)
      );
      
Create table Cars (
Car_id int not null Primary key Auto_increment,
Car_type_id int not null,
Make varchar(200),
Model varchar(200),
Make_Year int,
Color varchar(50),
VIN varchar(200) not null,
Current_location_id int ,
Available_for_rent tinyint not null,
Rental_price_per_hour decimal(19,4) not null,
FOREIGN KEY (car_type_id) REFERENCES car_types(car_type_id),
FOREIGN KEY (current_location_id) REFERENCES locations(location_id),

index(rental_price_per_hour)
);

Create table customer_address(
Customer_address_id int  Primary key not null auto_increment,
Customer_Address1    varchar(500) not null,
Customer_Address2   varchar(200),
Customer_City       varchar(200) not null,
Customer_State      varchar(20) not null,  
Customer_zip        varchar(10) not null
);
      
Create table customers(
Customer_id int  Primary key not null auto_increment,
Customer_First_name varchar(200) not null,
Customer_last_name  varchar(200) not null,
Customer_email           varchar(200) not null,
Customer_login_username   varchar(200) not null,
Customer_login_password   varchar(200) not null ,
Customer_Phone_Number     varchar(30),
Insurance_yes_no          tinyint,
customer_address_id int not null,
FOREIGN KEY (customer_address_id) REFERENCES customer_address(customer_address_id),
index(customer_login_username)
);


Create table Reservations(
	 Reservation_id int not null Primary key auto_increment,
     Customer_id int not null,
     Car_id    int not null,
     PickUpdatetime datetime,
     DropoffDatetime datetime,
     Pickup_location_id int,
     Dropoff_Location_id int,
     Rental_Cost  decimal(19,4),
     FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
	 FOREIGN KEY (car_id) REFERENCES cars(car_id),
	 FOREIGN KEY (pickup_location_id) REFERENCES locations(location_id),
	 FOREIGN KEY (dropoff_location_id) REFERENCES locations(location_id)
);





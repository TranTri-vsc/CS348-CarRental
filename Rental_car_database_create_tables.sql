/*Create database Rental_Car;*/

Create table Cars (
Car_id int not null Primary key Auto_increment,
Car_type_id int,
Num_Seats int,
Make varchar(200),
Model varchar(200),
Make_Year int,
Color varchar(50),
VIN varchar(200) not null,
Description varchar(1000),
Current_location_id int,
Available_for_rent tinyint,
Rental_price_per_hour decimal(19,4),
FOREIGN KEY (car_type_id)
        REFERENCES car_types(car_type_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        
      FOREIGN KEY (current_location_id)
        REFERENCES locations(location_id)
        ON UPDATE CASCADE

);

Create table car_types(
Car_type_id int primary key not null auto_increment,
Car_type varchar(200)
);

Create table locations(
      Location_id  int primary key not null auto_increment ,
      Location_description varchar(500),
      Location_Address1 varchar(500),
      Location_address2 varchar(200),
      Location_City varchar(200),
      Location_State varchar(30),
      Location_Zip   varchar(20)
      );
      
Create table customers(
Customer_id int  Primary key not null auto_increment,
Customer_First_name varchar(200),
Customer_last_name  varchar(200),
Customer_Address1    varchar(500),
Customer_Address2   varchar(200),
Customer_City       varchar(200),
Customer_State      varchar(20),  
Customer_zip        varchar(10),
Customer_Driver_License  varchar(200),
Customer_email           varchar(200),
Customer_login_username   varchar(200),
Customer_login_password   varchar(200),
Customer_Phone_Number     varchar(30),
Insurance_yes_no          tinyint
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
     
     FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        
      FOREIGN KEY (car_id)
        REFERENCES cars(car_id)
        ON UPDATE CASCADE,
        
     FOREIGN KEY (pickup_location_id)
        REFERENCES locations(location_id)
        ON UPDATE CASCADE   ,
        
      FOREIGN KEY (dropoff_location_id)
        REFERENCES locations(location_id)
        ON UPDATE CASCADE       
     
     
);




Insert into car_types (car_type) values('Sedan');
Insert into car_types (car_type) values('SUV');
Insert into car_types (car_type) values('Minivan');

Insert into cars (Car_type_id ,Num_Seats,Make,Model,Make_Year,Color,VIN,Description,Current_location_id,Available_for_rent,Rental_price_per_hour)
values (1,5,'Toyota','Camry',2020,'Black','1456723','Black_sedan with GPS',1,1,8);


Insert into cars (Car_type_id ,Num_Seats,Make,Model,Make_Year,Color,VIN,Description,Current_location_id,Available_for_rent,Rental_price_per_hour)
values (1,5,'Toyota','Civic',2019,'White','113456','White_sedan with GPS',2,1,7);

Insert into cars (Car_type_id ,Num_Seats,Make,Model,Make_Year,Color,VIN,Description,Current_location_id,Available_for_rent,Rental_price_per_hour)
values (2,7,'Honda','Pilot',2019,'Black','1453323','Black_spacious_SUV with GPS',3,1,10);

Insert into cars (Car_type_id ,Num_Seats,Make,Model,Make_Year,Color,VIN,Description,Current_location_id,Available_for_rent,Rental_price_per_hour)
values (3,7,'Honda','Odyssey',2018,'Grey','2458823','Grey_minivan with GPS',4,0,7);


Insert into locations(location_description,Location_Address1,Location_address2,Location_City,Location_State,Location_Zip)
values('Purdue Memorial Union','101 Grant St',null,'West Lafayette','IN','47906');

Insert into locations(location_description,Location_Address1,Location_address2,Location_City,Location_State,Location_Zip)
values('Walmart','2801 Northwestern Ave',null,'West Lafayette','IN','47906');

Insert into locations(location_description,Location_Address1,Location_address2,Location_City,Location_State,Location_Zip)
values('First Street Towers','1250 1st Street',null,'West Lafayette','IN','47906');

Insert into locations(location_description,Location_Address1,Location_address2,Location_City,Location_State,Location_Zip)
values('Hampton Inn','160 Tapawingo Dr','Front Parking lot','West Lafayette','IN','47906');


Insert into Customers (Customer_First_name,Customer_last_name,Customer_Address1,Customer_Address2,Customer_City,Customer_State,Customer_zip,Customer_Driver_License,Customer_email,Customer_login_username,Customer_login_password
,Customer_Phone_Number,Insurance_yes_no)
values('Arpit','Dhawan','225 Northwestern Ave','Apt-405','West lafayette','IN','47906','12345','arpitdhawan4@gmail.com','adhawan','K123456!','2154606586',1);

Insert into Customers (Customer_First_name,Customer_last_name,Customer_Address1,Customer_Address2,Customer_City,Customer_State,Customer_zip,Customer_Driver_License,Customer_email,Customer_login_username,Customer_login_password
,Customer_Phone_Number,Insurance_yes_no)
values('Smitha','Patel','120 Wood St','Apt-105','West lafayette','IN','47906','458967','smithapatel@gmail.com','spatel','M1289676!','4152607586',1);

Insert into Customers (Customer_First_name,Customer_last_name,Customer_Address1,Customer_Address2,Customer_City,Customer_State,Customer_zip,Customer_Driver_License,Customer_email,Customer_login_username,Customer_login_password
,Customer_Phone_Number,Insurance_yes_no)
values('John','Smith','245 Chauncey Ave','Apt-608','West lafayette','IN','47906','22375','jsmith@gmail.com','jsmith123','Mrt456!','7201156586',1);;

Insert into reservations (Customer_id,Car_id,PickUpdatetime,DropoffDatetime,Pickup_location_id,Dropoff_Location_id,Rental_Cost)
values(1,1,now(),(NOW() + INTERVAL 2 HOUR),1,3,16);

Insert into reservations (Customer_id,Car_id,PickUpdatetime,DropoffDatetime,Pickup_location_id,Dropoff_Location_id,Rental_Cost)
values(2,2,now(),(NOW() + INTERVAL 3 HOUR),2,3,21);












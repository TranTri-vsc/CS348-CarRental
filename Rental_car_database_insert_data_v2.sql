
Insert into car_types (car_type) values('Sedan');
Insert into car_types (car_type) values('SUV');
Insert into car_types (car_type) values('Minivan');

Insert into locations(location_description,Location_Address,Location_City,Location_State,Location_Zip)
values('Purdue Memorial Union','101 Grant St','West Lafayette','IN','47906');

Insert into locations(location_description, Location_Address,Location_City,Location_State,Location_Zip)
values('Walmart','2801 Northwestern Ave','West Lafayette','IN','47906');

Insert into locations(location_description,Location_Address,Location_City,Location_State,Location_Zip)
values('First Street Towers','1250 1st Street','West Lafayette','IN','47906');

Insert into locations(location_description,Location_Address,Location_City,Location_State,Location_Zip)
values('Hampton Inn','160 Tapawingo Dr','West Lafayette','IN','47906');



Insert into cars (Car_type_id ,Make,Model,Make_Year,Color,VIN,Current_location_id,Available_for_rent,Rental_price_per_hour)
values (1,'Toyota','Camry',2020,'Black','1456723',1,1,8);


Insert into cars (Car_type_id ,Make,Model,Make_Year,Color,VIN,Current_location_id,Available_for_rent,Rental_price_per_hour)
values (1,'Toyota','Civic',2019,'White','113456',2,1,7);

Insert into cars (Car_type_id ,Make,Model,Make_Year,Color,VIN,Current_location_id,Available_for_rent,Rental_price_per_hour)
values (2,'Honda','Pilot',2019,'Black','1453323',3,1,10);

Insert into cars (Car_type_id ,Make,Model,Make_Year,Color,VIN,Current_location_id,Available_for_rent,Rental_price_per_hour)
values (3,'Honda','Odyssey',2018,'Grey','2458823',null,0,7);

Insert into cars (Car_type_id ,Make,Model,Make_Year,Color,VIN,Current_location_id,Available_for_rent,Rental_price_per_hour)
values (1,'Honda','Odyssey',2020,'Blue','24777823',null,0,7);



Insert into customer_address (Customer_Address1,Customer_Address2,Customer_City,Customer_State,Customer_zip)

values('225 Northwestern Ave','Apt-405','West lafayette','IN','47906');

Insert into Customer_address (Customer_Address1,Customer_Address2,Customer_City,Customer_State,Customer_zip)
values('120 Wood St','Apt-105','West lafayette','IN','47906');

Insert into Customer_address (Customer_Address1,Customer_Address2,Customer_City,Customer_State,Customer_zip)
values('245 Chauncey Ave','Apt-608','West lafayette','IN','47906');

Insert into Customers (Customer_First_name,Customer_last_name,Customer_email,Customer_login_username,Customer_login_password
,Customer_Phone_Number,Insurance_yes_no,customer_address_id)
values('Arpit','Dhawan','arpitdhawan4@gmail.com','adhawan','K123456!','2154606586',1,1);

Insert into Customers (Customer_First_name,Customer_last_name,Customer_email,Customer_login_username,Customer_login_password
,Customer_Phone_Number,Insurance_yes_no,customer_address_id)

values('Smitha','Patel','smithapatel@gmail.com','spatel','M1289676!','4152607586',1,2);

Insert into Customers (Customer_First_name,Customer_last_name,Customer_email,Customer_login_username,Customer_login_password
,Customer_Phone_Number,Insurance_yes_no,customer_address_id)
values('John','Smith','jsmith@gmail.com','jsmith123','Mrt456!','7201156586',1,3);

Insert into reservations (Customer_id,Car_id,PickUpdatetime,DropoffDatetime,Pickup_location_id,Dropoff_Location_id,Rental_Cost)
values(1,1,now(),(NOW() + INTERVAL 2 HOUR),1,3,16);

Insert into reservations (Customer_id,Car_id,PickUpdatetime,DropoffDatetime,Pickup_location_id,Dropoff_Location_id,Rental_Cost)
values(2,2,now(),(NOW() + INTERVAL 3 HOUR),2,3,21);












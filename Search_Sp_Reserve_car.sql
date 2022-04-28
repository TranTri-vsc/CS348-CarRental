CREATE DEFINER=`root`@`localhost` PROCEDURE `reserve_car`(IN customerid int, IN carid int, IN pickupdatetime datetime, IN dropoffdatetime datetime, IN pickuplocationid int, IN dropofflocationid int, IN rentalcost  decimal(19,4))
BEGIN
/*SET AUTOCOMMIT = 0;*/
SET TRANSACTION ISOLATION LEVEL Read committed;
START TRANSACTION;

SELECT Car_id from cars WHERE Car_id = carid AND Available_for_rent = 1;

UPDATE cars SET Available_for_rent = 0 , current_location_id=null where Car_id = carid;

INSERT INTO reservations (Customer_id,Car_id,PickUpdatetime, Dropoffdatetime, Pickup_location_id,Dropoff_Location_id,Rental_Cost) VALUES(customerid,carid,pickupdatetime,dropoffdatetime,pickuplocationid,dropofflocationid,hour(timediff(dropoffdatetime,pickupdatetime))*rentalcost);
COMMIT;
END
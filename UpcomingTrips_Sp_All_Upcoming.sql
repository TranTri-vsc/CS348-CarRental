CREATE DEFINER=`root`@`localhost` PROCEDURE `fetch_upcoming`( IN user_id int, IN curr_date datetime)
BEGIN
    SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
	START TRANSACTION;
	SELECT Reservation_id, Make, Model, Make_Year, Color, FORMAT(Rental_price_per_hour, 2) as Rental_price_per_hour, Car_type,
    DATE_FORMAT(PickUpdatetime, '%Y-%m-%dT%H:%i') as PickUpdatetime, DATE_FORMAT(PickUpdatetime, "%M %d, %Y - %l:%i %p") as pickupDateFormatted, p.location_description as pickup_location, concat_ws(' ', p.Location_Address, p.Location_City, p.Location_State, p.Location_Zip) as pickupAddress, 
     DATE_FORMAT(DropoffDatetime, '%Y-%m-%dT%H:%i') as DropoffDatetime, DATE_FORMAT(DropoffDatetime, "%M %d, %Y - %l:%i %p") as dropoffDateFormatted, d.location_description as dropoff_location, concat_ws(' ', d.Location_Address, d.Location_City, d.Location_State, d.Location_Zip) as dropoffAddress,
    FORMAT(Rental_Cost, 2) as Rental_Cost, Dropoff_Location_id
    FROM reservations r JOIN cars c ON r.Car_id=c.Car_id 
    JOIN car_types ct ON c.Car_type_id=ct.Car_type_id
    JOIN locations p ON Pickup_location_id=p.Location_id 
    JOIN locations d ON Dropoff_Location_id=d.Location_id
    WHERE r.Customer_id=user_id AND PickUpdatetime >= DATE(curr_date);
    COMMIT;
END
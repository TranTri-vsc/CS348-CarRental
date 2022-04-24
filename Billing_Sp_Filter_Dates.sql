DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_billing_filtered`( IN Customer_id int, IN startDate DATE, IN endDate DATE )
BEGIN
DECLARE pickup DATE;
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SELECT r.Reservation_id as res_id, pickup.location_description AS pickup_loc, 
	r.PickUpdatetime AS pickup_dt, dropoff.location_description AS dropoff_loc, 
    r.DropoffDatetime AS dropoff_dt, r.Rental_Cost as cost
FROM reservations r
JOIN locations pickup on r.Pickup_location_id = pickup.Location_id
JOIN locations dropoff on r.Dropoff_Location_id = dropoff.Location_id
WHERE r.Customer_id = Customer_id 
AND DATE(r.DropoffDateTime) BETWEEN startDate AND endDate
AND DATE(r.PickUpdatetime) BETWEEN startDate AND endDate;
END //
DELIMITER ;

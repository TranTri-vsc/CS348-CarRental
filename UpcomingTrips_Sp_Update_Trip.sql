CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_reservation`(IN reservation_id INT, 
	IN new_pickup_date datetime, 
    IN new_dropoff_location_id INT,
    IN new_dropoff_date datetime,
    IN new_cost DECIMAL(15,2))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	START TRANSACTION;
			UPDATE reservations
			SET PickUpdatetime = new_pickup_date,
			DropoffDatetime = new_dropoff_date,
			Dropoff_Location_id = new_dropoff_location_id,
			Rental_Cost = new_cost
			WHERE reservations.Reservation_id=reservation_id;
	COMMIT;
        
END

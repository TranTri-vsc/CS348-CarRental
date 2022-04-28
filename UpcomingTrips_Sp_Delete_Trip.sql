CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_trip`( IN reservation_id INT)
BEGIN
	declare curr_car_id INT;
    declare pickup_id INT;
	SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    START transaction;
    SELECT Car_id, Pickup_location_id INTO @curr_car_id, @pickup_id FROM reservations WHERE reservations.Reservation_id = reservation_id;
    UPDATE cars SET Available_for_rent = 1 , Current_location_id=@pickup_id where cars.Car_id = @curr_car_id;
	DELETE FROM reservations WHERE reservations.Reservation_id = reservation_id;
    COMMIT;
END
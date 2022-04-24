CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_trip`( IN reservation_id INT)
BEGIN
	DELETE FROM reservations WHERE reservations.Reservation_id = reservation_id;
END
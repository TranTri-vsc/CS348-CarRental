CREATE DEFINER=`root`@`localhost` PROCEDURE `fetch_locations`(IN curr_location INT)
BEGIN
	SELECT Location_id, location_description, concat_ws(' ', Location_Address, Location_City, Location_State, Location_Zip) as full_address 
    FROM locations
    WHERE Location_id <> curr_location;
END
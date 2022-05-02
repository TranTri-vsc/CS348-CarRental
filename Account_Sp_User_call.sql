CREATE DEFINER=`root`@`localhost` PROCEDURE `user_call`( IN user_id int)
BEGIN
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SELECT U.Customer_First_name, U.Customer_last_name, U.Customer_email, U.Customer_login_username,
		U.Customer_login_password, U.Customer_Phone_Number, A.Customer_Address1, A.Customer_Address2,
		A.Customer_City, A.Customer_State, A.Customer_zip
	FROM customers U INNER JOIN customer_address A 
	ON U.Customer_id = A.Customer_address_id
	WHERE U.Customer_id = user_id;
END
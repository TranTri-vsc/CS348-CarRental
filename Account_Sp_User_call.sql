CREATE DEFINER=`root`@`%` PROCEDURE `user_call`( IN user_id int)
BEGIN
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
	SELECT U.Customer_First_name as first_name, U.Customer_last_name as last_name, U.Customer_email as email, U.Customer_login_username as login_name,
		U.Customer_login_password as pass, U.Customer_Phone_Number as phone_num, A.Customer_Address1 as addr1, A.Customer_Address2 as addr2,
        A.Customer_City as city, A.Customer_State as state,  A.Customer_zip as zip
	FROM customers U INNER JOIN customer_address A 
	ON U.Customer_id = A.Customer_address_id
	WHERE U.Customer_id = user_id;
END

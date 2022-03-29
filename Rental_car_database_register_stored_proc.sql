DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `register`(
Customer_First_Name VARCHAR(200)
,Customer_last_name VARCHAR(200),Customer_Address1 VARCHAR(200), Customer_Address2 VARCHAR(200),
 Customer_City VARCHAR(200),Customer_State VARCHAR(200),
Customer_zip VARCHAR(200),Customer_email VARCHAR(150),
Customer_login_username VARCHAR(200),Customer_login_password VARCHAR(200),
Customer_Phone_Number VARCHAR(20),Insurance_yes_no TINYINT
)
BEGIN
	DECLARE address_id INT;
INSERT INTO `rentalcar`.`customer_address`
(`Customer_Address1`,
`Customer_Address2`,
`Customer_City`,
`Customer_State`,
`Customer_zip`)
VALUES
(Customer_Address1,
Customer_Address2,
Customer_City,
Customer_State,
Customer_zip
);
SELECT last_insert_id() INTO address_id;
INSERT INTO `rentalcar`.`customers`
(
`Customer_First_name`,
`Customer_last_name`,
`Customer_email`,
`Customer_login_username`,
`Customer_login_password`,
`Customer_Phone_Number`,
`Insurance_yes_no`,
`customer_address_id`)
VALUES
(
Customer_First_name,
Customer_last_name,
Customer_email,
Customer_login_username,
Customer_login_password,
Customer_Phone_Number,
Insurance_yes_no,address_id);

END$$
DELIMITER ;

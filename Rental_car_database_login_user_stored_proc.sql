DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `login_user`( IN user varchar(200), IN pass varchar(200) )
BEGIN
     SELECT Customer_login_username FROM customers WHERE user = Customer_login_username AND pass = Customer_login_password;
END$$
DELIMITER ;
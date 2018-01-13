USE `burger_db`;

INSERT INTO `burgers` (`burger_name` , `devoured` , `createdAt` , `updatedAt`)
VALUES('Plain Burger', false , current_timestamp() , current_timestamp()),
		('Cheese Burger', false , current_timestamp() , current_timestamp()),
		('Bacon Burger', false , current_timestamp() , current_timestamp()),
		('Veggie Burger', false , current_timestamp() , current_timestamp()),
		('In N\' Out Burger', false , current_timestamp() , current_timestamp());
        
SELECT * FROM `burgers`;
-- Create the `user` table to store user information
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) UNIQUE NOT NULL,
  `email` VARCHAR(100) UNIQUE DEFAULT NULL
);

-- Create the `home` table to store home details
CREATE TABLE IF NOT EXISTS `home` (
  `home_id` INT AUTO_INCREMENT PRIMARY KEY,
  `street_address` VARCHAR(255) UNIQUE NOT NULL,
  `state` VARCHAR(50) DEFAULT NULL,
  `zip` VARCHAR(10) DEFAULT NULL,
  `sqft` FLOAT DEFAULT NULL,
  `beds` INT DEFAULT NULL,
  `baths` INT DEFAULT NULL,
  `list_price` FLOAT DEFAULT NULL
);

-- Create the `user_home_relation` table to link users and homes
CREATE TABLE IF NOT EXISTS `user_home_relation` (
  `user_id` INT NOT NULL,
  `home_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `home_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`home_id`) REFERENCES `home`(`home_id`) ON DELETE CASCADE
);

-- Insert distinct users from `user_home` into the `user` table
INSERT INTO `user` (username, email)
SELECT DISTINCT uh.`username`, uh.`email`
FROM `user_home` uh;

-- Insert distinct homes from `user_home` into the `home` table
INSERT INTO `home` (
  `street_address`, 
  `state`, 
  `zip`, 
  `sqft`, 
  `beds`, 
  `baths`, 
  `list_price`
)
SELECT DISTINCT uh.`street_address`, uh.`state`, uh.`zip`, uh.`sqft`, uh.`beds`, uh.`baths`, uh.`list_price`
FROM `user_home` uh;

-- Insert user-home relationships into `user_home_relation`
INSERT INTO `user_home_relation` (`user_id`, `home_id`)
SELECT u.`user_id`, h.`home_id`
FROM `user_home` uh
INNER JOIN `user` u ON uh.`username` = u.`username`
INNER JOIN `home` h ON uh.`street_address` = h.`street_address`;

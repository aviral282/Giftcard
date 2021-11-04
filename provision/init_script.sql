create database giftcardapi;
use giftcardapi;

CREATE TABLE `giftcardapi`.`testt` (
  `id` INT NOT NULL,
  `value` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`));


INSERT INTO `giftcardapi`.`testtable` (`value`, `id`) VALUES ('John', '1');
INSERT INTO `giftcardapi`.`testtable` (`value`, `id`) VALUES ('Lenon', '2');
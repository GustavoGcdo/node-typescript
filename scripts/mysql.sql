-- SCRIPTS

-- Altera a senha do root para mysql
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mysql'

-- Remove o Schema
DROP SCHEMA `petshop`;

-- Cria o Schema
CREATE SCHEMA `petshop`;

-- Usa o Schema
USE `petshop`;

-- Produtos
CREATE TABLE `petshop`.`product` (
  `id` INT NOT NULL,
  `title` VARCHAR(80) NOT NULL,
  `description` TEXT(4000) NOT NULL,
  `price` DECIMAL NOT NULL DEFAULT 0,
  `quantityOnHand` DECIMAL NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`));
  
-- Pedidos
CREATE TABLE `petshop`.`order` (
  `id` INT NOT NULL,
  `date` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`));
  
-- Itens do Pedidos
CREATE TABLE `petshop`.`orderitem` (
  `id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `productid` INT NOT NULL,
  `orderid` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT FK_OrderItemProduct FOREIGN KEY (productid) REFERENCES product(id),
  CONSTRAINT FK_OrderItemOrder FOREIGN KEY (orderid) REFERENCES `order`(id));
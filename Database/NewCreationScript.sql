-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema misionboard
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema misionboard
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `misionboard` DEFAULT CHARACTER SET utf8mb3 ;
USE `misionboard` ;

-- -----------------------------------------------------
-- Table `misionboard`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`user` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Contra` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(250) NOT NULL,
  `Imagen` LONGBLOB NULL DEFAULT NULL,
  `ImageData` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `Nombre_UNIQUE` (`Nombre` ASC) ,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`campaña`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`campaña` (
  `idCampaña` INT NOT NULL AUTO_INCREMENT,
  `Titulo` VARCHAR(100) NOT NULL,
  `Descripcion` VARCHAR(3000) NOT NULL,
  `MaxPlayers` INT NOT NULL,
  `CurrentPlayers` INT NOT NULL,
  `Estrellas` INT NULL DEFAULT NULL,
  `Link` VARCHAR(200) NULL DEFAULT NULL,
  `Fecha` DATE NOT NULL,
  `Horario` TIME NOT NULL,
  `Imagen` LONGBLOB NULL DEFAULT NULL,
  `Host` INT NOT NULL,
  PRIMARY KEY (`idCampaña`),
  UNIQUE INDEX `idCampaña_UNIQUE` (`idCampaña` ASC) ,
  INDEX `Host_idx` (`Host` ASC) ,
  CONSTRAINT `Host`
    FOREIGN KEY (`Host`)
    REFERENCES `misionboard`.`user` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`Trasfondo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`Trasfondo` (
  `idTrasfondo` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTrasfondo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `misionboard`.`raza`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`raza` (
  `idRaza` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idRaza`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`clase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`clase` (
  `idClase` INT NOT NULL,
  `Nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idClase`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`imagen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`imagen` (
  `idImagen` INT NOT NULL AUTO_INCREMENT,
  `Tipo` VARCHAR(45) NOT NULL,
  `Imagen` BLOB NOT NULL,
  PRIMARY KEY (`idImagen`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`ficha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`ficha` (
  `idFicha` INT NOT NULL AUTO_INCREMENT,
  `Owner` INT NOT NULL,
  `Nombre` VARCHAR(45) NULL DEFAULT NULL,
  `Descripcion` VARCHAR(500) NULL DEFAULT NULL,
  `Historia` VARCHAR(500) NULL DEFAULT NULL,
  `Trasfondo_idTrasfondo` INT NULL DEFAULT NULL,
  `raza_idRaza` INT NULL DEFAULT NULL,
  `clase_idClase` INT NULL DEFAULT NULL,
  `imagen_idImagen` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idFicha`),
  INDEX `IdUser_idx` (`Owner` ASC),
  INDEX `fk_ficha_Trasfondo1_idx` (`Trasfondo_idTrasfondo` ASC),
  INDEX `fk_ficha_raza1_idx` (`raza_idRaza` ASC),
  INDEX `fk_ficha_clase1_idx` (`clase_idClase` ASC),
  INDEX `fk_ficha_imagen1_idx` (`imagen_idImagen` ASC),
  CONSTRAINT `IdUser`
    FOREIGN KEY (`Owner`)
    REFERENCES `misionboard`.`user` (`idUser`),
  CONSTRAINT `fk_ficha_Trasfondo1`
    FOREIGN KEY (`Trasfondo_idTrasfondo`)
    REFERENCES `misionboard`.`Trasfondo` (`idTrasfondo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ficha_raza1`
    FOREIGN KEY (`raza_idRaza`)
    REFERENCES `misionboard`.`raza` (`idRaza`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ficha_clase1`
    FOREIGN KEY (`clase_idClase`)
    REFERENCES `misionboard`.`clase` (`idClase`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ficha_imagen1`
    FOREIGN KEY (`imagen_idImagen`)
    REFERENCES `misionboard`.`imagen` (`idImagen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`campañauserficha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`campañauserficha` (
  `idCampañaUserFicha` INT NOT NULL AUTO_INCREMENT,
  `Campaña_idCampaña` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  `Ficha_idFicha` INT NOT NULL,
  PRIMARY KEY (`idCampañaUserFicha`),
  INDEX `fk_CampañaUserFicha_Campaña1_idx` (`Campaña_idCampaña` ASC) ,
  INDEX `fk_CampañaUserFicha_User1_idx` (`User_idUser` ASC) ,
  INDEX `fk_CampañaUserFicha_Ficha1_idx` (`Ficha_idFicha` ASC) ,
  CONSTRAINT `fk_CampañaUserFicha_Campaña1`
    FOREIGN KEY (`Campaña_idCampaña`)
    REFERENCES `misionboard`.`campaña` (`idCampaña`),
  CONSTRAINT `fk_CampañaUserFicha_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `misionboard`.`ficha` (`idFicha`),
  CONSTRAINT `fk_CampañaUserFicha_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `misionboard`.`user` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`review` (
  `idReview` INT NOT NULL AUTO_INCREMENT,
  `Comentario` VARCHAR(3000) NULL DEFAULT NULL,
  `Calificacion` INT NULL DEFAULT NULL,
  `ReviwerId` INT NOT NULL,
  `Campaña_idCampaña` INT NOT NULL,
  `ReviewedId` INT NOT NULL,
  PRIMARY KEY (`idReview`),
  INDEX `fk_Review_User_idx` (`ReviwerId` ASC) ,
  INDEX `fk_Review_Campaña1_idx` (`Campaña_idCampaña` ASC) ,
  INDEX `fk_Review_User1_idx` (`ReviewedId` ASC) ,
  CONSTRAINT `fk_Review_Campaña1`
    FOREIGN KEY (`Campaña_idCampaña`)
    REFERENCES `misionboard`.`campaña` (`idCampaña`),
  CONSTRAINT `fk_Review_User`
    FOREIGN KEY (`ReviwerId`)
    REFERENCES `misionboard`.`user` (`idUser`),
  CONSTRAINT `fk_Review_User1`
    FOREIGN KEY (`ReviewedId`)
    REFERENCES `misionboard`.`user` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

USE `misionboard` ;

-- -----------------------------------------------------
-- Placeholder table for view `misionboard`.`campaignuserinfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`campaignuserinfo` (`campaign_title` INT, `user_name` INT, `user_email` INT, `character_life` INT, `character_defense` INT, `character_speed` INT, `class_name` INT, `race_name` INT, `background_name` INT, `host_name` INT, `host_email` INT);

-- -----------------------------------------------------
-- Placeholder table for view `misionboard`.`otheruserreviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`otheruserreviews` (`idReview` INT, `Comentario` INT, `Calificacion` INT, `ReviwerId` INT, `ReviewerNombre` INT, `ReviewerEmail` INT, `Campaña_idCampaña` INT, `ReviewedId` INT, `ReviewedNombre` INT, `ReviewedEmail` INT);

-- -----------------------------------------------------
-- Placeholder table for view `misionboard`.`userreviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`userreviews` (`idReview` INT, `Comentario` INT, `Calificacion` INT, `ReviwerId` INT, `ReviewerNombre` INT, `ReviewerEmail` INT, `Campaña_idCampaña` INT, `ReviewedId` INT, `ReviewedNombre` INT, `ReviewedEmail` INT);

-- -----------------------------------------------------
-- View `misionboard`.`campaignuserinfo`
-- -----------------------------------------------------

-- -----------------------------------------------------
-- View `misionboard`.`otheruserreviews`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `misionboard`.`otheruserreviews`;
USE `misionboard`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `misionboard`.`otheruserreviews` AS select `r`.`idReview` AS `idReview`,`r`.`Comentario` AS `Comentario`,`r`.`Calificacion` AS `Calificacion`,`r`.`ReviwerId` AS `ReviwerId`,`u1`.`Nombre` AS `ReviewerNombre`,`u1`.`Email` AS `ReviewerEmail`,`r`.`Campaña_idCampaña` AS `Campaña_idCampaña`,`r`.`ReviewedId` AS `ReviewedId`,`u2`.`Nombre` AS `ReviewedNombre`,`u2`.`Email` AS `ReviewedEmail` from ((`misionboard`.`review` `r` join `misionboard`.`user` `u1` on((`r`.`ReviwerId` = `u1`.`idUser`))) join `misionboard`.`user` `u2` on((`r`.`ReviewedId` = `u2`.`idUser`)));

-- -----------------------------------------------------
-- View `misionboard`.`userreviews`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `misionboard`.`userreviews`;
USE `misionboard`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `misionboard`.`userreviews` AS select `r`.`idReview` AS `idReview`,`r`.`Comentario` AS `Comentario`,`r`.`Calificacion` AS `Calificacion`,`r`.`ReviwerId` AS `ReviwerId`,`u1`.`Nombre` AS `ReviewerNombre`,`u1`.`Email` AS `ReviewerEmail`,`r`.`Campaña_idCampaña` AS `Campaña_idCampaña`,`r`.`ReviewedId` AS `ReviewedId`,`u2`.`Nombre` AS `ReviewedNombre`,`u2`.`Email` AS `ReviewedEmail` from ((`misionboard`.`review` `r` join `misionboard`.`user` `u1` on((`r`.`ReviwerId` = `u1`.`idUser`))) join `misionboard`.`user` `u2` on((`r`.`ReviewedId` = `u2`.`idUser`)));




-- Inserts for raza
INSERT INTO `raza` (`Nombre`) VALUES ('Human');
INSERT INTO `raza` (`Nombre`) VALUES ('Elf');
INSERT INTO `raza` (`Nombre`) VALUES ('Dwarf');

-- Inserts for clase
INSERT INTO `clase` (`idClase`, `Nombre`) VALUES (1, 'Wizard');
INSERT INTO `clase` (`idClase`, `Nombre`) VALUES (2, 'Fighter');
INSERT INTO `clase` (`idClase`, `Nombre`) VALUES (3, 'Rogue');

-- Inserts for trasfondo
INSERT INTO `Trasfondo` (`Nombre`) VALUES ('Noble');
INSERT INTO `Trasfondo` (`Nombre`) VALUES ('Soldier');
INSERT INTO `Trasfondo` (`Nombre`) VALUES ('Outlander');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

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
  UNIQUE INDEX `Nombre_UNIQUE` (`Nombre` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
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
  UNIQUE INDEX `idCampaña_UNIQUE` (`idCampaña` ASC) VISIBLE,
  INDEX `Host_idx` (`Host` ASC) VISIBLE,
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
  `Nombre` VARCHAR(45) NOT NULL,
  `Descripcion` VARCHAR(500) NOT NULL,
  `Historia` VARCHAR(500) NOT NULL,
  `Trasfondo_idTrasfondo` INT NOT NULL,
  `raza_idRaza` INT NOT NULL,
  `clase_idClase` INT NOT NULL,
  `imagen_idImagen` INT NOT NULL,
  PRIMARY KEY (`idFicha`),
  INDEX `IdUser_idx` (`Owner` ASC) VISIBLE,
  INDEX `fk_ficha_Trasfondo1_idx` (`Trasfondo_idTrasfondo` ASC) VISIBLE,
  INDEX `fk_ficha_raza1_idx` (`raza_idRaza` ASC) VISIBLE,
  INDEX `fk_ficha_clase1_idx` (`clase_idClase` ASC) VISIBLE,
  INDEX `fk_ficha_imagen1_idx` (`imagen_idImagen` ASC) VISIBLE,
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
  INDEX `fk_CampañaUserFicha_Campaña1_idx` (`Campaña_idCampaña` ASC) VISIBLE,
  INDEX `fk_CampañaUserFicha_User1_idx` (`User_idUser` ASC) VISIBLE,
  INDEX `fk_CampañaUserFicha_Ficha1_idx` (`Ficha_idFicha` ASC) VISIBLE,
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
  INDEX `fk_Review_User_idx` (`ReviwerId` ASC) VISIBLE,
  INDEX `fk_Review_Campaña1_idx` (`Campaña_idCampaña` ASC) VISIBLE,
  INDEX `fk_Review_User1_idx` (`ReviewedId` ASC) VISIBLE,
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
DROP TABLE IF EXISTS `misionboard`.`campaignuserinfo`;
USE `misionboard`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `misionboard`.`campaignuserinfo` AS select `misionboard`.`campaña`.`Titulo` AS `campaign_title`,`misionboard`.`user`.`Nombre` AS `user_name`,`misionboard`.`user`.`Email` AS `user_email`,`misionboard`.`ficha`.`Vida` AS `character_life`,`misionboard`.`ficha`.`Defensa` AS `character_defense`,`misionboard`.`ficha`.`Velocidad` AS `character_speed`,`misionboard`.`clase`.`Nombre` AS `class_name`,`misionboard`.`raza`.`Nombre` AS `race_name`,`misionboard`.`trasfondo`.`Nombre` AS `background_name`,`host_user`.`Nombre` AS `host_name`,`host_user`.`Email` AS `host_email` from ((((((((`misionboard`.`campaña` join `misionboard`.`campañauserficha` on((`misionboard`.`campaña`.`idCampaña` = `misionboard`.`campañauserficha`.`Campaña_idCampaña`))) join `misionboard`.`user` on((`misionboard`.`campañauserficha`.`User_idUser` = `misionboard`.`user`.`idUser`))) join `misionboard`.`ficha` on((`misionboard`.`campañauserficha`.`Ficha_idFicha` = `misionboard`.`ficha`.`idFicha`))) join `misionboard`.`seleccion` on((`misionboard`.`ficha`.`idFicha` = `misionboard`.`seleccion`.`Ficha_idFicha`))) join `misionboard`.`clase` on((`misionboard`.`seleccion`.`Clase_idClase` = `misionboard`.`clase`.`idClase`))) join `misionboard`.`raza` on((`misionboard`.`seleccion`.`Raza_idRaza` = `misionboard`.`raza`.`idRaza`))) join `misionboard`.`trasfondo` on((`misionboard`.`seleccion`.`Trasfondo_idTrasfondo` = `misionboard`.`trasfondo`.`idTrasfondo`))) join `misionboard`.`user` `host_user` on((`misionboard`.`campaña`.`Host` = `host_user`.`idUser`)));

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

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

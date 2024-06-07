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
-- Table `misionboard`.`campaignuserinfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`campaignuserinfo` (
  `campaign_title` INT NULL DEFAULT NULL,
  `user_name` INT NULL DEFAULT NULL,
  `user_email` INT NULL DEFAULT NULL,
  `character_life` INT NULL DEFAULT NULL,
  `character_defense` INT NULL DEFAULT NULL,
  `character_speed` INT NULL DEFAULT NULL,
  `class_name` INT NULL DEFAULT NULL,
  `race_name` INT NULL DEFAULT NULL,
  `background_name` INT NULL DEFAULT NULL,
  `host_name` INT NULL DEFAULT NULL,
  `host_email` INT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


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
AUTO_INCREMENT = 12
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
  `Tipo` VARCHAR(45) NOT NULL DEFAULT 'Imagen/PNG',
  `Imagen` LONGBLOB NULL DEFAULT NULL,
  PRIMARY KEY (`idImagen`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`raza`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`raza` (
  `idRaza` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idRaza`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`trasfondo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`trasfondo` (
  `idTrasfondo` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTrasfondo`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
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
  INDEX `IdUser_idx` (`Owner` ASC) ,
  INDEX `fk_ficha_Trasfondo1_idx` (`Trasfondo_idTrasfondo` ASC) ,
  INDEX `fk_ficha_raza1_idx` (`raza_idRaza` ASC) ,
  INDEX `fk_ficha_clase1_idx` (`clase_idClase` ASC) ,
  INDEX `fk_ficha_imagen1_idx` (`imagen_idImagen` ASC) ,
  CONSTRAINT `fk_ficha_clase1`
    FOREIGN KEY (`clase_idClase`)
    REFERENCES `misionboard`.`clase` (`idClase`),
  CONSTRAINT `fk_ficha_imagen1`
    FOREIGN KEY (`imagen_idImagen`)
    REFERENCES `misionboard`.`imagen` (`idImagen`),
  CONSTRAINT `fk_ficha_raza1`
    FOREIGN KEY (`raza_idRaza`)
    REFERENCES `misionboard`.`raza` (`idRaza`),
  CONSTRAINT `fk_ficha_Trasfondo1`
    FOREIGN KEY (`Trasfondo_idTrasfondo`)
    REFERENCES `misionboard`.`trasfondo` (`idTrasfondo`),
  CONSTRAINT `IdUser`
    FOREIGN KEY (`Owner`)
    REFERENCES `misionboard`.`user` (`idUser`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
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
-- Placeholder table for view `misionboard`.`ficha_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`ficha_info` (`idFicha` INT, `Owner` INT, `OwnerName` INT, `Nombre` INT, `Descripcion` INT, `Historia` INT, `Trasfondo` INT, `Raza` INT, `Clase` INT, `Imagen` INT, `Tipo` INT);

-- -----------------------------------------------------
-- Placeholder table for view `misionboard`.`otheruserreviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`otheruserreviews` (`idReview` INT, `Comentario` INT, `Calificacion` INT, `ReviwerId` INT, `ReviewerNombre` INT, `ReviewerEmail` INT, `Campaña_idCampaña` INT, `ReviewedId` INT, `ReviewedNombre` INT, `ReviewedEmail` INT);

-- -----------------------------------------------------
-- Placeholder table for view `misionboard`.`userreviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`userreviews` (`idReview` INT, `Comentario` INT, `Calificacion` INT, `ReviwerId` INT, `ReviewerNombre` INT, `ReviewerEmail` INT, `Campaña_idCampaña` INT, `ReviewedId` INT, `ReviewedNombre` INT, `ReviewedEmail` INT);

-- -----------------------------------------------------
-- View `misionboard`.`ficha_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `misionboard`.`ficha_info`;
USE `misionboard`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `misionboard`.`ficha_info` AS select `f`.`idFicha` AS `idFicha`,`f`.`Owner` AS `Owner`,`u`.`Nombre` AS `OwnerName`,`f`.`Nombre` AS `Nombre`,`f`.`Descripcion` AS `Descripcion`,`f`.`Historia` AS `Historia`,`t`.`Nombre` AS `Trasfondo`,`r`.`Nombre` AS `Raza`,`c`.`Nombre` AS `Clase`,`i`.`Imagen` AS `Imagen`,`i`.`Tipo` AS `Tipo` from (((((`misionboard`.`ficha` `f` left join `misionboard`.`user` `u` on((`f`.`Owner` = `u`.`idUser`))) left join `misionboard`.`trasfondo` `t` on((`f`.`Trasfondo_idTrasfondo` = `t`.`idTrasfondo`))) left join `misionboard`.`raza` `r` on((`f`.`raza_idRaza` = `r`.`idRaza`))) left join `misionboard`.`clase` `c` on((`f`.`clase_idClase` = `c`.`idClase`))) left join `misionboard`.`imagen` `i` on((`f`.`imagen_idImagen` = `i`.`idImagen`)));

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

CREATE OR REPLACE VIEW `misionboard`.`ficha_info` AS
SELECT 
    f.`idFicha`,
    f.`Owner`,
    u.`Nombre` AS `OwnerName`,
    f.`Nombre`,
    f.`Descripcion`,
    f.`Historia`,
    t.`Nombre` AS `Trasfondo`,
    r.`Nombre` AS `Raza`,
    c.`Nombre` AS `Clase`,
    i.`Imagen` AS `Imagen`,
    i.`Tipo` AS `Tipo`
FROM 
    `misionboard`.`ficha` f
    LEFT JOIN `misionboard`.`user` u ON f.`Owner` = u.`idUser`
    LEFT JOIN `misionboard`.`Trasfondo` t ON f.`Trasfondo_idTrasfondo` = t.`idTrasfondo`
    LEFT JOIN `misionboard`.`raza` r ON f.`raza_idRaza` = r.`idRaza`
    LEFT JOIN `misionboard`.`clase` c ON f.`clase_idClase` = c.`idClase`
    LEFT JOIN `misionboard`.`imagen` i ON f.`imagen_idImagen` = i.`idImagen`;


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

DELIMITER $$
USE `misionboard`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BusquedaCampañas`(
In B_Titulo Varchar(100),
 B_Estrellas int,
 B_MaxPlayers int,
 B_Fecha date,
 B_Horario time
)
BEGIN
Select C.idCampaña,C.Titulo,C.Descripcion,C.MaxPlayers,C.CurrentPlayers,C.Estrellas,C.Link,C.Fecha,C.Horario,C.Imagen,U.Nombre,U.Imagen as ImagenUsuario From campaña AS C
Inner Join user As U on C.Host = U.idUser
Where C.Titulo Like if(B_Titulo = "","%%",Concat('%',B_Titulo,'%'))
And (B_Estrellas is null or C.Estrellas = B_Estrellas)
And (B_MaxPlayers is null or C.MaxPlayers = B_MaxPlayers)
And (B_Fecha is null or C.Fecha between B_Fecha and '9999-12-20')
And (B_Horario is null or C.Horario between B_Horario and '22:59:00');


END$$

DELIMITER ;

CREATE TABLE IF NOT EXISTS `misionboard`.`campañaunirse` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Id_Campaña` INT NULL DEFAULT NULL,
  `Id_Usuario` INT NULL DEFAULT NULL,
  `Id_unido` TINYINT(1) NULL DEFAULT false,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



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
-- Table `misionboard`.`dados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`dados` (
  `idDados` INT NOT NULL AUTO_INCREMENT,
  `NumeroCaras` INT NOT NULL,
  PRIMARY KEY (`idDados`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`stat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`stat` (
  `idStat` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Codigo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idStat`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`tipodaño`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`tipodaño` (
  `idTipoDaño` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTipoDaño`))
ENGINE = InnoDB
AUTO_INCREMENT = 27
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`ataque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`ataque` (
  `idAtaque` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `AimMod` INT NULL DEFAULT NULL,
  `DmgMod` INT NULL DEFAULT NULL,
  `Porficiencia` TINYINT NULL DEFAULT NULL,
  `NDados` INT NOT NULL,
  `Dados_idDados` INT NOT NULL,
  `TipoDaño_idTipoDaño` INT NOT NULL,
  `Stat_idStat` INT NOT NULL,
  PRIMARY KEY (`idAtaque`),
  INDEX `fk_Ataque_Dados1_idx` (`Dados_idDados` ASC) VISIBLE,
  INDEX `fk_Ataque_TipoDaño1_idx` (`TipoDaño_idTipoDaño` ASC) VISIBLE,
  INDEX `fk_Ataque_Stat1_idx` (`Stat_idStat` ASC) VISIBLE,
  CONSTRAINT `fk_Ataque_Dados1`
    FOREIGN KEY (`Dados_idDados`)
    REFERENCES `misionboard`.`dados` (`idDados`),
  CONSTRAINT `fk_Ataque_Stat1`
    FOREIGN KEY (`Stat_idStat`)
    REFERENCES `misionboard`.`stat` (`idStat`),
  CONSTRAINT `fk_Ataque_TipoDaño1`
    FOREIGN KEY (`TipoDaño_idTipoDaño`)
    REFERENCES `misionboard`.`tipodaño` (`idTipoDaño`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
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
  UNIQUE INDEX `Nombre_UNIQUE` (`Nombre` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`ficha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`ficha` (
  `idFicha` INT NOT NULL AUTO_INCREMENT,
  `Vida` INT NOT NULL DEFAULT '0',
  `VidaMac` INT NOT NULL DEFAULT '0',
  `VidaTemp` INT NOT NULL DEFAULT '0',
  `Defensa` INT NOT NULL DEFAULT '10',
  `Velocidad` INT NOT NULL DEFAULT '30',
  `Nivel` INT NOT NULL DEFAULT '1',
  `Owner` INT NOT NULL,
  `Nombre` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idFicha`),
  INDEX `IdUser_idx` (`Owner` ASC) VISIBLE,
  CONSTRAINT `IdUser`
    FOREIGN KEY (`Owner`)
    REFERENCES `misionboard`.`user` (`idUser`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`ataqueficha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`ataqueficha` (
  `idAtaqueFicha` INT NOT NULL AUTO_INCREMENT,
  `Ficha_idFicha` INT NOT NULL,
  `Ataque_idAtaque` INT NOT NULL,
  PRIMARY KEY (`idAtaqueFicha`),
  INDEX `fk_AtaqueFicha_Ficha1_idx` (`Ficha_idFicha` ASC) VISIBLE,
  INDEX `fk_AtaqueFicha_Ataque1_idx` (`Ataque_idAtaque` ASC) VISIBLE,
  CONSTRAINT `fk_AtaqueFicha_Ataque1`
    FOREIGN KEY (`Ataque_idAtaque`)
    REFERENCES `misionboard`.`ataque` (`idAtaque`),
  CONSTRAINT `fk_AtaqueFicha_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `misionboard`.`ficha` (`idFicha`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`campaignusersinfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`campaignusersinfo` (
  `idCampañaUserFicha` INT NULL DEFAULT NULL,
  `Host` INT NULL DEFAULT NULL,
  `idUser` INT NULL DEFAULT NULL,
  `Nombre` INT NULL DEFAULT NULL,
  `Email` INT NULL DEFAULT NULL,
  `Imagen` INT NULL DEFAULT NULL)
ENGINE = InnoDB
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
-- Table `misionboard`.`clase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`clase` (
  `idClase` INT NOT NULL,
  `Nombre` VARCHAR(50) NOT NULL,
  `Descripcion` VARCHAR(3000) NOT NULL,
  `Vida` INT NOT NULL,
  PRIMARY KEY (`idClase`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`feat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`feat` (
  `idFeat` INT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Descripcion` VARCHAR(3000) NOT NULL,
  PRIMARY KEY (`idFeat`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`featclase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`featclase` (
  `idFeatClase` INT NOT NULL,
  `Nivel` INT NOT NULL,
  `Clase_idClase` INT NOT NULL,
  `Feat_idFeat` INT NOT NULL,
  PRIMARY KEY (`idFeatClase`),
  INDEX `fk_FeatClase_Clase1_idx` (`Clase_idClase` ASC) VISIBLE,
  INDEX `fk_FeatClase_Feat1_idx` (`Feat_idFeat` ASC) VISIBLE,
  CONSTRAINT `fk_FeatClase_Clase1`
    FOREIGN KEY (`Clase_idClase`)
    REFERENCES `misionboard`.`clase` (`idClase`),
  CONSTRAINT `fk_FeatClase_Feat1`
    FOREIGN KEY (`Feat_idFeat`)
    REFERENCES `misionboard`.`feat` (`idFeat`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`raza`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`raza` (
  `idRaza` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  `Descripcion` VARCHAR(3000) NOT NULL,
  PRIMARY KEY (`idRaza`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`trasfondo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`trasfondo` (
  `idTrasfondo` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  `Descripcion` VARCHAR(3000) NOT NULL,
  PRIMARY KEY (`idTrasfondo`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`seleccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`seleccion` (
  `Clase_idClase` INT NOT NULL,
  `Raza_idRaza` INT NOT NULL,
  `Trasfondo_idTrasfondo` INT NOT NULL,
  `Ficha_idFicha` INT NOT NULL,
  `IdSeleccion` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`IdSeleccion`),
  INDEX `fk_Seleccion_Clase1_idx` (`Clase_idClase` ASC) VISIBLE,
  INDEX `fk_Seleccion_Raza1_idx` (`Raza_idRaza` ASC) VISIBLE,
  INDEX `fk_Seleccion_Trasfondo1_idx` (`Trasfondo_idTrasfondo` ASC) VISIBLE,
  INDEX `fk_Seleccion_Ficha1_idx` (`Ficha_idFicha` ASC) VISIBLE,
  CONSTRAINT `fk_Seleccion_Clase1`
    FOREIGN KEY (`Clase_idClase`)
    REFERENCES `misionboard`.`clase` (`idClase`),
  CONSTRAINT `fk_Seleccion_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `misionboard`.`ficha` (`idFicha`),
  CONSTRAINT `fk_Seleccion_Raza1`
    FOREIGN KEY (`Raza_idRaza`)
    REFERENCES `misionboard`.`raza` (`idRaza`),
  CONSTRAINT `fk_Seleccion_Trasfondo1`
    FOREIGN KEY (`Trasfondo_idTrasfondo`)
    REFERENCES `misionboard`.`trasfondo` (`idTrasfondo`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`featselect`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`featselect` (
  `idFeatSelect` INT NOT NULL,
  `Nivel` INT NOT NULL,
  `Feat_idFeat` INT NOT NULL,
  `Seleccion_IdSeleccion` INT NOT NULL,
  PRIMARY KEY (`idFeatSelect`),
  INDEX `fk_FeatSelect_Feat1_idx` (`Feat_idFeat` ASC) VISIBLE,
  INDEX `fk_FeatSelect_Seleccion1_idx` (`Seleccion_IdSeleccion` ASC) VISIBLE,
  CONSTRAINT `fk_FeatSelect_Feat1`
    FOREIGN KEY (`Feat_idFeat`)
    REFERENCES `misionboard`.`feat` (`idFeat`),
  CONSTRAINT `fk_FeatSelect_Seleccion1`
    FOREIGN KEY (`Seleccion_IdSeleccion`)
    REFERENCES `misionboard`.`seleccion` (`IdSeleccion`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`fichastats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`fichastats` (
  `idFichaStats` INT NOT NULL AUTO_INCREMENT,
  `Numero` INT NOT NULL,
  `Ficha_idFicha` INT NOT NULL,
  `Stat_idStat` INT NOT NULL,
  PRIMARY KEY (`idFichaStats`),
  INDEX `fk_FichaStats_Ficha1_idx` (`Ficha_idFicha` ASC) VISIBLE,
  INDEX `fk_FichaStats_Stat1_idx` (`Stat_idStat` ASC) VISIBLE,
  CONSTRAINT `fk_FichaStats_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `misionboard`.`ficha` (`idFicha`),
  CONSTRAINT `fk_FichaStats_Stat1`
    FOREIGN KEY (`Stat_idStat`)
    REFERENCES `misionboard`.`stat` (`idStat`))
ENGINE = InnoDB
AUTO_INCREMENT = 39
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`hechizo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`hechizo` (
  `idHechizo` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Nivel` INT NOT NULL,
  `Descripcion` VARCHAR(3000) NOT NULL,
  `Stat_idStat` INT NOT NULL,
  `Ataque_idAtaque` INT NOT NULL,
  PRIMARY KEY (`idHechizo`),
  INDEX `fk_Hechizo_Stat1_idx` (`Stat_idStat` ASC) VISIBLE,
  INDEX `fk_Hechizo_Ataque1_idx` (`Ataque_idAtaque` ASC) VISIBLE,
  CONSTRAINT `fk_Hechizo_Ataque1`
    FOREIGN KEY (`Ataque_idAtaque`)
    REFERENCES `misionboard`.`ataque` (`idAtaque`),
  CONSTRAINT `fk_Hechizo_Stat1`
    FOREIGN KEY (`Stat_idStat`)
    REFERENCES `misionboard`.`stat` (`idStat`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`hechizoficha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`hechizoficha` (
  `idHechizoFicha` INT NOT NULL AUTO_INCREMENT,
  `Hechizo_idHechizo` INT NOT NULL,
  `Ficha_idFicha` INT NOT NULL,
  PRIMARY KEY (`idHechizoFicha`),
  INDEX `fk_HechizoFicha_Hechizo1_idx` (`Hechizo_idHechizo` ASC) VISIBLE,
  INDEX `fk_HechizoFicha_Ficha1_idx` (`Ficha_idFicha` ASC) VISIBLE,
  CONSTRAINT `fk_HechizoFicha_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `misionboard`.`ficha` (`idFicha`),
  CONSTRAINT `fk_HechizoFicha_Hechizo1`
    FOREIGN KEY (`Hechizo_idHechizo`)
    REFERENCES `misionboard`.`hechizo` (`idHechizo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`imagen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`imagen` (
  `idImagen` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Imagen` BLOB NOT NULL,
  `Ficha_idFicha` INT NOT NULL,
  PRIMARY KEY (`idImagen`),
  INDEX `fk_Imagen_Ficha1_idx` (`Ficha_idFicha` ASC) VISIBLE,
  CONSTRAINT `fk_Imagen_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `misionboard`.`ficha` (`idFicha`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`objeto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`objeto` (
  `idObjeto` INT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Descripcion` VARCHAR(3000) NOT NULL,
  `Ataque_idAtaque` INT NOT NULL,
  PRIMARY KEY (`idObjeto`),
  INDEX `fk_Objeto_Ataque1_idx` (`Ataque_idAtaque` ASC) VISIBLE,
  CONSTRAINT `fk_Objeto_Ataque1`
    FOREIGN KEY (`Ataque_idAtaque`)
    REFERENCES `misionboard`.`ataque` (`idAtaque`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`inventario` (
  `idInventario` INT NOT NULL AUTO_INCREMENT,
  `Cantidad` INT NOT NULL,
  `Ficha_idFicha` INT NOT NULL,
  `Objeto_idObjeto` INT NOT NULL,
  PRIMARY KEY (`idInventario`),
  INDEX `fk_Inventario_Ficha1_idx` (`Ficha_idFicha` ASC) VISIBLE,
  INDEX `fk_Inventario_Objeto1_idx` (`Objeto_idObjeto` ASC) VISIBLE,
  CONSTRAINT `fk_Inventario_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `misionboard`.`ficha` (`idFicha`),
  CONSTRAINT `fk_Inventario_Objeto1`
    FOREIGN KEY (`Objeto_idObjeto`)
    REFERENCES `misionboard`.`objeto` (`idObjeto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`proficiencias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`proficiencias` (
  `idProficiencias` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Stat_idStat` INT NOT NULL,
  `Salvacion` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`idProficiencias`),
  INDEX `fk_Proficiencias_Stat1_idx` (`Stat_idStat` ASC) VISIBLE,
  CONSTRAINT `fk_Proficiencias_Stat1`
    FOREIGN KEY (`Stat_idStat`)
    REFERENCES `misionboard`.`stat` (`idStat`))
ENGINE = InnoDB
AUTO_INCREMENT = 45
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `misionboard`.`proficienciaficha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`proficienciaficha` (
  `idProficienciaFicha` INT NOT NULL AUTO_INCREMENT,
  `Maestro` TINYINT NOT NULL,
  `Proficiencias_idProficiencias` INT NOT NULL,
  `Ficha_idFicha` INT NOT NULL,
  PRIMARY KEY (`idProficienciaFicha`),
  INDEX `fk_ProficienciaFicha_Proficiencias1_idx` (`Proficiencias_idProficiencias` ASC) VISIBLE,
  INDEX `fk_ProficienciaFicha_Ficha1_idx` (`Ficha_idFicha` ASC) VISIBLE,
  CONSTRAINT `fk_ProficienciaFicha_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `misionboard`.`ficha` (`idFicha`),
  CONSTRAINT `fk_ProficienciaFicha_Proficiencias1`
    FOREIGN KEY (`Proficiencias_idProficiencias`)
    REFERENCES `misionboard`.`proficiencias` (`idProficiencias`))
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


-- -----------------------------------------------------
-- Table `misionboard`.`subclase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`subclase` (
  `idSubclase` INT NOT NULL,
  `Nivel` INT NOT NULL,
  `Clase_idClase` INT NOT NULL,
  `Clase_idClase1` INT NOT NULL,
  PRIMARY KEY (`idSubclase`),
  INDEX `fk_Subclase_Clase1_idx` (`Clase_idClase` ASC) VISIBLE,
  INDEX `fk_Subclase_Clase2_idx` (`Clase_idClase1` ASC) VISIBLE,
  CONSTRAINT `fk_Subclase_Clase1`
    FOREIGN KEY (`Clase_idClase`)
    REFERENCES `misionboard`.`clase` (`idClase`),
  CONSTRAINT `fk_Subclase_Clase2`
    FOREIGN KEY (`Clase_idClase1`)
    REFERENCES `misionboard`.`clase` (`idClase`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

USE `misionboard` ;

-- -----------------------------------------------------
-- Placeholder table for view `misionboard`.`attackdetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `misionboard`.`attackdetails` (`idAtaque` INT, `AttackName` INT, `AimMod` INT, `DmgMod` INT, `Porficiencia` INT, `NDados` INT, `DiceType` INT, `DamageType` INT, `StatName` INT);

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
-- View `misionboard`.`attackdetails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `misionboard`.`attackdetails`;
USE `misionboard`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `misionboard`.`attackdetails` AS select `a`.`idAtaque` AS `idAtaque`,`a`.`Nombre` AS `AttackName`,`a`.`AimMod` AS `AimMod`,`a`.`DmgMod` AS `DmgMod`,`a`.`Porficiencia` AS `Porficiencia`,`a`.`NDados` AS `NDados`,`d`.`NumeroCaras` AS `DiceType`,`td`.`Nombre` AS `DamageType`,`s`.`Nombre` AS `StatName` from (((`misionboard`.`ataque` `a` join `misionboard`.`dados` `d` on((`a`.`Dados_idDados` = `d`.`idDados`))) join `misionboard`.`tipodaño` `td` on((`a`.`TipoDaño_idTipoDaño` = `td`.`idTipoDaño`))) join `misionboard`.`stat` `s` on((`a`.`Stat_idStat` = `s`.`idStat`)));

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


INSERT INTO Stat (Nombre, Codigo) VALUES ('Strength', 'STR');
INSERT INTO Stat (Nombre, Codigo) VALUES ('Dexterity', 'DEX');
INSERT INTO Stat (Nombre, Codigo) VALUES ('Constitution', 'CON');
INSERT INTO Stat (Nombre, Codigo) VALUES ('Intelligence', 'INT');
INSERT INTO Stat (Nombre, Codigo) VALUES ('Wisdom', 'WIS');
INSERT INTO Stat (Nombre, Codigo) VALUES ('Charisma', 'CHA');



INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Acrobatics', 2); -- Dexterity
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Animal Handling', 5); -- Wisdom
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Arcana', 4); -- Intelligence
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Athletics', 1); -- Strength
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Deception', 6); -- Charisma
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('History', 4); -- Intelligence
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Insight', 5); -- Wisdom
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Intimidation', 6); -- Charisma
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Investigation', 4); -- Intelligence
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Medicine', 5); -- Wisdom
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Nature', 4); -- Intelligence
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Perception', 5); -- Wisdom
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Performance', 6); -- Charisma
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Persuasion', 6); -- Charisma
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Religion', 4); -- Intelligence
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Sleight of Hand', 2); -- Dexterity
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Stealth', 2); -- Dexterity
INSERT INTO Proficiencias (Nombre, Stat_idStat) VALUES ('Survival', 5); -- Wisdom


-- Damage Types
INSERT INTO TipoDaño (Nombre) VALUES
('Acid'),
('Bludgeoning'),
('Cold'),
('Fire'),
('Force'),
('Lightning'),
('Necrotic'),
('Piercing'),
('Poison'),
('Psychic'),
('Radiant'),
('Slashing'),
('Thunder');

-- Dice
INSERT INTO Dados (NumeroCaras) VALUES
(4),
(6),
(8),
(10),
(12),
(20);

-- clases
insert into Clase (idClase,Nombre, descripcion,Vida) values
(1,"Pelador","Un capaz guerrero maestro de todo tipo de arma con la habilidad de empujarse fuera de los limites de lo posible",6),
(2,"Mago","Un genio de lo arcano, un mago es aquel que estudia la tela de la magia y logra cosas imposibles con ella",4);
-- raza
insert into raza (Nombre,Descripcion) values("Humano","<p><strong>Aumento de puntuación de habilidad.</strong> Dos puntuaciones de habilidad distintas de tu elección aumentan en 1.</p>
<p><strong>Proficiencias.</strong> Obtienes proficiencia en una habilidad de tu elección.</p>
<p><strong>Feat.</strong> Obtienes un Feat de tu elección.</p>
<p><strong>Edad.</strong> Los humanos alcanzan la adultez a finales de la adolescencia y viven menos de un siglo.</p>
<p><strong>Alineamiento.</strong> Los humanos tienden a no tener un alineamiento particular. Lo mejor y lo peor se encuentran entre ellos.</p>
<p><strong>Tamaño.</strong> Los humanos varían ampliamente en altura y constitución, desde apenas 5 pies hasta más de 6 pies de altura. Independientemente de tu posición en ese rango, tu tamaño es Mediano.</p>
<p><strong>Velocidad.</strong> Tu velocidad base de movimiento es de 30 pies.</p>
<p><strong>Idiomas.</strong> Puedes hablar, leer y escribir Común y un idioma adicional de tu elección. </p>
")
,("Elfo","<strong>Aumento de puntuación de habilidad:</strong> Tu puntuación de Destreza aumenta en 2. <strong>Edad:</strong>  100 años y pueden vivir hasta los 750 años. <strong>Alineamiento:</strong>tienden hacia los aspectos más suaves del caos. <strong>Tamaño:</strong> Van desde menos de 5 hasta más de 6 pies de altura, tamaño Mediano. <strong>Velocidad:</strong> Su velocidad base de movimiento es de 30 pies. <strong>Visión en la oscuridad:</strong> Pueden ver en penumbra en un radio de 60 pies como si fuera luz brillante, y en oscuridad como si fuera penumbra, sin poder discernir colores en la oscuridad, <strong>Linaje feérico:</strong> Tienen ventaja en las tiradas de salvación contra estar encantados, y la magia no puede hacerlos dormir. <strong>Trance:</strong> No duermen, en su lugar meditan profundamente, descansando solo 4 horas. <strong>Sentidos agudos:</strong> Tienen competencia en la habilidad de Percepción. <strong>Idiomas:</strong> Pueden hablar, leer y escribir Común y Élfico.
");

insert into trasfondo(Nombre,Descripcion) values ("Atleta","<p><strong>proficiencias:</strong> Acrobacias, Atletismo</p>
<p><strong>Idiomas:</strong> Uno de tu elección</p>
<p><strong>Proficiencia en herramientas:</strong> Vehículos (Terrestres)</p>
<p><strong>Equipo:</strong> Un disco de bronce o una bola de cuero, un amuleto de la suerte o un trofeo pasado, un conjunto de ropa de viajero y una bolsa que contiene 10 piezas de oro</p>"),("Heroe del pueblo"," <p><strong>Competencias de habilidad:</strong> Trato con animales, Supervivencia</p>
<p><strong>Competencias con herramientas:</strong> Un tipo de herramientas de artesano, vehículos (terrestres)</p>
<p><strong>Idiomas:</strong> Ninguno</p>
<p><strong>Equipo:</strong> Un juego de herramientas de artesano (uno de tu elección), una pala, una olla de hierro, un conjunto de ropa común y una bolsa que contiene 10 piezas de oro</p>
");
insert into ataque(nombre,aimmod,dmgmod,porficiencia,NDados,Dados_IdDados,TipoDaño_IdTipoDaño,Stat_idStat)values("Espada Larga",0,0,true,1,1,2,1),("Magia",0,0,true,3,2,3,4);
insert into hechizo(Nombre,Nivel,Descripcion,Stat_idStat,Ataque_idAtaque)values("Torcion Testicular!!!",2,"EL LEGENDARIO ATAQUE PROHIBIDO causa Xcantidad de daño",1,3);
insert into objeto (idObjeto,Nombre,Descripcion,Ataque_idAtaque)values(1,"Espada larga","Un arma de 1 mano",1);



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

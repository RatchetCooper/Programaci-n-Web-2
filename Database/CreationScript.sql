-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema MisionBoard
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema MisionBoard
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `MisionBoard` DEFAULT CHARACTER SET utf8 ;
USE `MisionBoard` ;

-- -----------------------------------------------------
-- Table `MisionBoard`.`Campaña`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Campaña` (
  `idCampaña` INT NOT NULL AUTO_INCREMENT,
  `Titulo` VARCHAR(100) NOT NULL,
  `Descripcion` VARCHAR(250) NOT NULL,
  `MaxPlayers` INT NOT NULL,
  `CurrentPlayers` INT NOT NULL,
  `Estrellas` INT NULL,
  `Link` VARCHAR(45) NULL,
  `Fecha` DATE NOT NULL,
  `Horario` TIME NOT NULL,
  `Imagen` LONGBLOB NULL,
  PRIMARY KEY (`idCampaña`),
  UNIQUE INDEX `idCampaña_UNIQUE` (`idCampaña` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Contra` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(250) NOT NULL,
  `Imagen` LONGBLOB NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `Nombre_UNIQUE` (`Nombre` ASC) ,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Review` (
  `idReview` INT NOT NULL AUTO_INCREMENT,
  `Comentario` VARCHAR(250) NULL,
  `Calificacion` INT NULL,
  `ReviwerId` INT NOT NULL,
  `Campaña_idCampaña` INT NOT NULL,
  `ReviewedId` INT NOT NULL,
  PRIMARY KEY (`idReview`),
  INDEX `fk_Review_User_idx` (`ReviwerId` ASC) ,
  INDEX `fk_Review_Campaña1_idx` (`Campaña_idCampaña` ASC) ,
  INDEX `fk_Review_User1_idx` (`ReviewedId` ASC) ,
  CONSTRAINT `fk_Review_User`
    FOREIGN KEY (`ReviwerId`)
    REFERENCES `MisionBoard`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Review_Campaña1`
    FOREIGN KEY (`Campaña_idCampaña`)
    REFERENCES `MisionBoard`.`Campaña` (`idCampaña`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Review_User1`
    FOREIGN KEY (`ReviewedId`)
    REFERENCES `MisionBoard`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Ficha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Ficha` (
  `idFicha` INT NOT NULL AUTO_INCREMENT,
  `Vida` INT NOT NULL,
  `VidaMac` INT NOT NULL,
  `VidaTemp` INT NOT NULL,
  `Defensa` INT NOT NULL,
  `Velocidad` INT NOT NULL,
  `Nivel` INT NOT NULL,
  PRIMARY KEY (`idFicha`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`CampañaUserFicha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`CampañaUserFicha` (
  `idCampañaUserFicha` INT NOT NULL AUTO_INCREMENT,
  `Host` TINYINT NULL,
  `Campaña_idCampaña` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  `Ficha_idFicha` INT NOT NULL,
  PRIMARY KEY (`idCampañaUserFicha`),
  INDEX `fk_CampañaUserFicha_Campaña1_idx` (`Campaña_idCampaña` ASC) ,
  INDEX `fk_CampañaUserFicha_User1_idx` (`User_idUser` ASC) ,
  INDEX `fk_CampañaUserFicha_Ficha1_idx` (`Ficha_idFicha` ASC) ,
  CONSTRAINT `fk_CampañaUserFicha_Campaña1`
    FOREIGN KEY (`Campaña_idCampaña`)
    REFERENCES `MisionBoard`.`Campaña` (`idCampaña`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CampañaUserFicha_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `MisionBoard`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CampañaUserFicha_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `MisionBoard`.`Ficha` (`idFicha`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Clase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Clase` (
  `idClase` INT NOT NULL,
  `Nombre` VARCHAR(50) NOT NULL,
  `Descripcion` VARCHAR(250) NOT NULL,
  `Vida` INT NOT NULL,
  PRIMARY KEY (`idClase`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Raza`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Raza` (
  `idRaza` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  `Descripcion` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idRaza`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Trasfondo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Trasfondo` (
  `idTrasfondo` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NOT NULL,
  `Descripcion` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`idTrasfondo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Seleccion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Seleccion` (
  `Clase_idClase` INT NOT NULL,
  `Raza_idRaza` INT NOT NULL,
  `Trasfondo_idTrasfondo` INT NOT NULL,
  `Ficha_idFicha` INT NOT NULL,
  `IdSeleccion` INT NOT NULL AUTO_INCREMENT,
  INDEX `fk_Seleccion_Clase1_idx` (`Clase_idClase` ASC) ,
  INDEX `fk_Seleccion_Raza1_idx` (`Raza_idRaza` ASC) ,
  INDEX `fk_Seleccion_Trasfondo1_idx` (`Trasfondo_idTrasfondo` ASC) ,
  INDEX `fk_Seleccion_Ficha1_idx` (`Ficha_idFicha` ASC) ,
  PRIMARY KEY (`IdSeleccion`),
  CONSTRAINT `fk_Seleccion_Clase1`
    FOREIGN KEY (`Clase_idClase`)
    REFERENCES `MisionBoard`.`Clase` (`idClase`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Seleccion_Raza1`
    FOREIGN KEY (`Raza_idRaza`)
    REFERENCES `MisionBoard`.`Raza` (`idRaza`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Seleccion_Trasfondo1`
    FOREIGN KEY (`Trasfondo_idTrasfondo`)
    REFERENCES `MisionBoard`.`Trasfondo` (`idTrasfondo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Seleccion_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `MisionBoard`.`Ficha` (`idFicha`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Feat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Feat` (
  `idFeat` INT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Descripcion` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`idFeat`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`FeatSelect`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`FeatSelect` (
  `idFeatSelect` INT NOT NULL,
  `Nivel` INT NOT NULL,
  `Feat_idFeat` INT NOT NULL,
  `Seleccion_IdSeleccion` INT NOT NULL,
  PRIMARY KEY (`idFeatSelect`),
  INDEX `fk_FeatSelect_Feat1_idx` (`Feat_idFeat` ASC) ,
  INDEX `fk_FeatSelect_Seleccion1_idx` (`Seleccion_IdSeleccion` ASC) ,
  CONSTRAINT `fk_FeatSelect_Feat1`
    FOREIGN KEY (`Feat_idFeat`)
    REFERENCES `MisionBoard`.`Feat` (`idFeat`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_FeatSelect_Seleccion1`
    FOREIGN KEY (`Seleccion_IdSeleccion`)
    REFERENCES `MisionBoard`.`Seleccion` (`IdSeleccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`FeatClase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`FeatClase` (
  `idFeatClase` INT NOT NULL,
  `Nivel` INT NOT NULL,
  `Clase_idClase` INT NOT NULL,
  `Feat_idFeat` INT NOT NULL,
  PRIMARY KEY (`idFeatClase`),
  INDEX `fk_FeatClase_Clase1_idx` (`Clase_idClase` ASC) ,
  INDEX `fk_FeatClase_Feat1_idx` (`Feat_idFeat` ASC) ,
  CONSTRAINT `fk_FeatClase_Clase1`
    FOREIGN KEY (`Clase_idClase`)
    REFERENCES `MisionBoard`.`Clase` (`idClase`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_FeatClase_Feat1`
    FOREIGN KEY (`Feat_idFeat`)
    REFERENCES `MisionBoard`.`Feat` (`idFeat`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Subclase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Subclase` (
  `idSubclase` INT NOT NULL,
  `Nivel` INT NOT NULL,
  `Clase_idClase` INT NOT NULL,
  `Clase_idClase1` INT NOT NULL,
  PRIMARY KEY (`idSubclase`),
  INDEX `fk_Subclase_Clase1_idx` (`Clase_idClase` ASC) ,
  INDEX `fk_Subclase_Clase2_idx` (`Clase_idClase1` ASC) ,
  CONSTRAINT `fk_Subclase_Clase1`
    FOREIGN KEY (`Clase_idClase`)
    REFERENCES `MisionBoard`.`Clase` (`idClase`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Subclase_Clase2`
    FOREIGN KEY (`Clase_idClase1`)
    REFERENCES `MisionBoard`.`Clase` (`idClase`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Imagen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Imagen` (
  `idImagen` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Imagen` BLOB NOT NULL,
  `Ficha_idFicha` INT NOT NULL,
  PRIMARY KEY (`idImagen`),
  INDEX `fk_Imagen_Ficha1_idx` (`Ficha_idFicha` ASC) ,
  CONSTRAINT `fk_Imagen_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `MisionBoard`.`Ficha` (`idFicha`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Stat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Stat` (
  `idStat` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Codigo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idStat`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Proficiencias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Proficiencias` (
  `idProficiencias` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Stat_idStat` INT NOT NULL,
  PRIMARY KEY (`idProficiencias`),
  INDEX `fk_Proficiencias_Stat1_idx` (`Stat_idStat` ASC) ,
  CONSTRAINT `fk_Proficiencias_Stat1`
    FOREIGN KEY (`Stat_idStat`)
    REFERENCES `MisionBoard`.`Stat` (`idStat`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`ProficienciaFicha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`ProficienciaFicha` (
  `idProficienciaFicha` INT NOT NULL AUTO_INCREMENT,
  `Maestro` TINYINT NOT NULL,
  `Proficiencias_idProficiencias` INT NOT NULL,
  `Ficha_idFicha` INT NOT NULL,
  PRIMARY KEY (`idProficienciaFicha`),
  INDEX `fk_ProficienciaFicha_Proficiencias1_idx` (`Proficiencias_idProficiencias` ASC) ,
  INDEX `fk_ProficienciaFicha_Ficha1_idx` (`Ficha_idFicha` ASC) ,
  CONSTRAINT `fk_ProficienciaFicha_Proficiencias1`
    FOREIGN KEY (`Proficiencias_idProficiencias`)
    REFERENCES `MisionBoard`.`Proficiencias` (`idProficiencias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProficienciaFicha_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `MisionBoard`.`Ficha` (`idFicha`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`FichaStats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`FichaStats` (
  `idFichaStats` INT NOT NULL AUTO_INCREMENT,
  `Numero` INT NOT NULL,
  `Ficha_idFicha` INT NOT NULL,
  `Stat_idStat` INT NOT NULL,
  PRIMARY KEY (`idFichaStats`),
  INDEX `fk_FichaStats_Ficha1_idx` (`Ficha_idFicha` ASC) ,
  INDEX `fk_FichaStats_Stat1_idx` (`Stat_idStat` ASC) ,
  CONSTRAINT `fk_FichaStats_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `MisionBoard`.`Ficha` (`idFicha`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_FichaStats_Stat1`
    FOREIGN KEY (`Stat_idStat`)
    REFERENCES `MisionBoard`.`Stat` (`idStat`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Dados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Dados` (
  `idDados` INT NOT NULL AUTO_INCREMENT,
  `NumeroCaras` INT NOT NULL,
  PRIMARY KEY (`idDados`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`TipoDaño`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`TipoDaño` (
  `idTipoDaño` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTipoDaño`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Ataque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Ataque` (
  `idAtaque` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `AimMod` INT NULL,
  `DmgMod` INT NULL,
  `Porficiencia` TINYINT NULL,
  `NDados` INT NOT NULL,
  `Dados_idDados` INT NOT NULL,
  `TipoDaño_idTipoDaño` INT NOT NULL,
  `Stat_idStat` INT NOT NULL,
  PRIMARY KEY (`idAtaque`),
  INDEX `fk_Ataque_Dados1_idx` (`Dados_idDados` ASC) ,
  INDEX `fk_Ataque_TipoDaño1_idx` (`TipoDaño_idTipoDaño` ASC) ,
  INDEX `fk_Ataque_Stat1_idx` (`Stat_idStat` ASC) ,
  CONSTRAINT `fk_Ataque_Dados1`
    FOREIGN KEY (`Dados_idDados`)
    REFERENCES `MisionBoard`.`Dados` (`idDados`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ataque_TipoDaño1`
    FOREIGN KEY (`TipoDaño_idTipoDaño`)
    REFERENCES `MisionBoard`.`TipoDaño` (`idTipoDaño`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ataque_Stat1`
    FOREIGN KEY (`Stat_idStat`)
    REFERENCES `MisionBoard`.`Stat` (`idStat`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Hechizo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Hechizo` (
  `idHechizo` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Nivel` INT NOT NULL,
  `Descripcion` VARCHAR(500) NOT NULL,
  `Stat_idStat` INT NOT NULL,
  `Ataque_idAtaque` INT NOT NULL,
  PRIMARY KEY (`idHechizo`),
  INDEX `fk_Hechizo_Stat1_idx` (`Stat_idStat` ASC) ,
  INDEX `fk_Hechizo_Ataque1_idx` (`Ataque_idAtaque` ASC) ,
  CONSTRAINT `fk_Hechizo_Stat1`
    FOREIGN KEY (`Stat_idStat`)
    REFERENCES `MisionBoard`.`Stat` (`idStat`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Hechizo_Ataque1`
    FOREIGN KEY (`Ataque_idAtaque`)
    REFERENCES `MisionBoard`.`Ataque` (`idAtaque`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`HechizoFicha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`HechizoFicha` (
  `idHechizoFicha` INT NOT NULL AUTO_INCREMENT,
  `Hechizo_idHechizo` INT NOT NULL,
  `Ficha_idFicha` INT NOT NULL,
  PRIMARY KEY (`idHechizoFicha`),
  INDEX `fk_HechizoFicha_Hechizo1_idx` (`Hechizo_idHechizo` ASC) ,
  INDEX `fk_HechizoFicha_Ficha1_idx` (`Ficha_idFicha` ASC) ,
  CONSTRAINT `fk_HechizoFicha_Hechizo1`
    FOREIGN KEY (`Hechizo_idHechizo`)
    REFERENCES `MisionBoard`.`Hechizo` (`idHechizo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HechizoFicha_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `MisionBoard`.`Ficha` (`idFicha`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`AtaqueFicha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`AtaqueFicha` (
  `idAtaqueFicha` INT NOT NULL AUTO_INCREMENT,
  `Ficha_idFicha` INT NOT NULL,
  `Ataque_idAtaque` INT NOT NULL,
  PRIMARY KEY (`idAtaqueFicha`),
  INDEX `fk_AtaqueFicha_Ficha1_idx` (`Ficha_idFicha` ASC) ,
  INDEX `fk_AtaqueFicha_Ataque1_idx` (`Ataque_idAtaque` ASC) ,
  CONSTRAINT `fk_AtaqueFicha_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `MisionBoard`.`Ficha` (`idFicha`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_AtaqueFicha_Ataque1`
    FOREIGN KEY (`Ataque_idAtaque`)
    REFERENCES `MisionBoard`.`Ataque` (`idAtaque`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Objeto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Objeto` (
  `idObjeto` INT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Descripcion` VARCHAR(250) NOT NULL,
  `Ataque_idAtaque` INT NOT NULL,
  PRIMARY KEY (`idObjeto`),
  INDEX `fk_Objeto_Ataque1_idx` (`Ataque_idAtaque` ASC) ,
  CONSTRAINT `fk_Objeto_Ataque1`
    FOREIGN KEY (`Ataque_idAtaque`)
    REFERENCES `MisionBoard`.`Ataque` (`idAtaque`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MisionBoard`.`Inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`Inventario` (
  `idInventario` INT NOT NULL AUTO_INCREMENT,
  `Cantidad` INT NOT NULL,
  `Ficha_idFicha` INT NOT NULL,
  `Objeto_idObjeto` INT NOT NULL,
  PRIMARY KEY (`idInventario`),
  INDEX `fk_Inventario_Ficha1_idx` (`Ficha_idFicha` ASC) ,
  INDEX `fk_Inventario_Objeto1_idx` (`Objeto_idObjeto` ASC) ,
  CONSTRAINT `fk_Inventario_Ficha1`
    FOREIGN KEY (`Ficha_idFicha`)
    REFERENCES `MisionBoard`.`Ficha` (`idFicha`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Inventario_Objeto1`
    FOREIGN KEY (`Objeto_idObjeto`)
    REFERENCES `MisionBoard`.`Objeto` (`idObjeto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `MisionBoard` ;

-- -----------------------------------------------------
-- Placeholder table for view `MisionBoard`.`CampaignUsersInfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`CampaignUsersInfo` (`idCampañaUserFicha` INT, `Host` INT, `idUser` INT, `Nombre` INT, `Email` INT, `Imagen` INT);

-- -----------------------------------------------------
-- Placeholder table for view `MisionBoard`.`OtherUserReviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`OtherUserReviews` (`idReview` INT, `Comentario` INT, `Calificacion` INT, `ReviwerId` INT, `ReviewerNombre` INT, `ReviewerEmail` INT, `Campaña_idCampaña` INT, `ReviewedId` INT, `ReviewedNombre` INT, `ReviewedEmail` INT);

-- -----------------------------------------------------
-- Placeholder table for view `MisionBoard`.`UserReviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`UserReviews` (`idReview` INT, `Comentario` INT, `Calificacion` INT, `ReviwerId` INT, `ReviewerNombre` INT, `ReviewerEmail` INT, `Campaña_idCampaña` INT, `ReviewedId` INT, `ReviewedNombre` INT, `ReviewedEmail` INT);

-- -----------------------------------------------------
-- Placeholder table for view `MisionBoard`.`AttackDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MisionBoard`.`AttackDetails` (`idAtaque` INT, `AttackName` INT, `AimMod` INT, `DmgMod` INT, `Porficiencia` INT, `NDados` INT, `DiceType` INT, `DamageType` INT, `StatName` INT);

-- -----------------------------------------------------
-- View `MisionBoard`.`CampaignUsersInfo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MisionBoard`.`CampaignUsersInfo`;
USE `MisionBoard`;
CREATE  OR REPLACE VIEW CampaignUsersInfo AS
SELECT
    CU.idCampañaUserFicha,
    CU.Host,
    U.idUser,
    U.Nombre,
    U.Email,
    U.Imagen
FROM
    CampañaUserFicha CU
    JOIN User U ON CU.User_idUser = U.idUser;

-- -----------------------------------------------------
-- View `MisionBoard`.`OtherUserReviews`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MisionBoard`.`OtherUserReviews`;
USE `MisionBoard`;
CREATE  OR REPLACE VIEW OtherUserReviews AS
SELECT
    R.idReview,
    R.Comentario,
    R.Calificacion,
    R.ReviwerId,
    U1.Nombre AS ReviewerNombre,
    U1.Email AS ReviewerEmail,
    R.Campaña_idCampaña,
    R.ReviewedId,
    U2.Nombre AS ReviewedNombre,
    
    U2.Email AS ReviewedEmail
FROM
    Review R
    JOIN User U1 ON R.ReviwerId = U1.idUser
    JOIN User U2 ON R.ReviewedId = U2.idUser;

-- -----------------------------------------------------
-- View `MisionBoard`.`UserReviews`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MisionBoard`.`UserReviews`;
USE `MisionBoard`;
CREATE  OR REPLACE VIEW UserReviews AS
SELECT
    R.idReview,
    R.Comentario,
    R.Calificacion,
    R.ReviwerId,
    U1.Nombre AS ReviewerNombre,
    U1.Email AS ReviewerEmail,
    R.Campaña_idCampaña,
    R.ReviewedId,
    U2.Nombre AS ReviewedNombre,
    U2.Email AS ReviewedEmail
FROM
    Review R
    JOIN User U1 ON R.ReviwerId = U1.idUser
    JOIN User U2 ON R.ReviewedId = U2.idUser;

-- -----------------------------------------------------
-- View `MisionBoard`.`AttackDetails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `MisionBoard`.`AttackDetails`;
USE `MisionBoard`;
CREATE  OR REPLACE VIEW AttackDetails AS
SELECT
    A.idAtaque,
    A.Nombre AS AttackName,
    A.AimMod,
    A.DmgMod,
    A.Porficiencia,
    A.NDados,
    D.NumeroCaras AS DiceType,
    TD.Nombre AS DamageType,
    S.Nombre AS StatName
FROM
    Ataque A
    JOIN Dados D ON A.Dados_idDados = D.idDados
    JOIN TipoDaño TD ON A.TipoDaño_idTipoDaño = TD.idTipoDaño
    JOIN Stat S ON A.Stat_idStat = S.idStat;

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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

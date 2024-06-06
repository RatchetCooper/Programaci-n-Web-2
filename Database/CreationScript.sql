-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: misionboard
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ataque`
--

DROP TABLE IF EXISTS `ataque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ataque` (
  `idAtaque` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `AimMod` int DEFAULT NULL,
  `DmgMod` int DEFAULT NULL,
  `Porficiencia` tinyint DEFAULT NULL,
  `NDados` int NOT NULL,
  `Dados_idDados` int NOT NULL,
  `TipoDaño_idTipoDaño` int NOT NULL,
  `Stat_idStat` int NOT NULL,
  PRIMARY KEY (`idAtaque`),
  KEY `fk_Ataque_Dados1_idx` (`Dados_idDados`),
  KEY `fk_Ataque_TipoDaño1_idx` (`TipoDaño_idTipoDaño`),
  KEY `fk_Ataque_Stat1_idx` (`Stat_idStat`),
  CONSTRAINT `fk_Ataque_Dados1` FOREIGN KEY (`Dados_idDados`) REFERENCES `dados` (`idDados`),
  CONSTRAINT `fk_Ataque_Stat1` FOREIGN KEY (`Stat_idStat`) REFERENCES `stat` (`idStat`),
  CONSTRAINT `fk_Ataque_TipoDaño1` FOREIGN KEY (`TipoDaño_idTipoDaño`) REFERENCES `tipodaño` (`idTipoDaño`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ataqueficha`
--

DROP TABLE IF EXISTS `ataqueficha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ataqueficha` (
  `idAtaqueFicha` int NOT NULL AUTO_INCREMENT,
  `Ficha_idFicha` int NOT NULL,
  `Ataque_idAtaque` int NOT NULL,
  PRIMARY KEY (`idAtaqueFicha`),
  KEY `fk_AtaqueFicha_Ficha1_idx` (`Ficha_idFicha`),
  KEY `fk_AtaqueFicha_Ataque1_idx` (`Ataque_idAtaque`),
  CONSTRAINT `fk_AtaqueFicha_Ataque1` FOREIGN KEY (`Ataque_idAtaque`) REFERENCES `ataque` (`idAtaque`),
  CONSTRAINT `fk_AtaqueFicha_Ficha1` FOREIGN KEY (`Ficha_idFicha`) REFERENCES `ficha` (`idFicha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `attackdetails`
--

DROP TABLE IF EXISTS `attackdetails`;
/*!50001 DROP VIEW IF EXISTS `attackdetails`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `attackdetails` AS SELECT 
 1 AS `idAtaque`,
 1 AS `AttackName`,
 1 AS `AimMod`,
 1 AS `DmgMod`,
 1 AS `Porficiencia`,
 1 AS `NDados`,
 1 AS `DiceType`,
 1 AS `DamageType`,
 1 AS `StatName`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `campaignuserinfo`
--

DROP TABLE IF EXISTS `campaignuserinfo`;
/*!50001 DROP VIEW IF EXISTS `campaignuserinfo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `campaignuserinfo` AS SELECT 
 1 AS `campaign_title`,
 1 AS `user_name`,
 1 AS `user_email`,
 1 AS `character_life`,
 1 AS `character_defense`,
 1 AS `character_speed`,
 1 AS `class_name`,
 1 AS `race_name`,
 1 AS `background_name`,
 1 AS `host_name`,
 1 AS `host_email`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `campaignusersinfo`
--

DROP TABLE IF EXISTS `campaignusersinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaignusersinfo` (
  `idCampañaUserFicha` int DEFAULT NULL,
  `Host` int DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  `Nombre` int DEFAULT NULL,
  `Email` int DEFAULT NULL,
  `Imagen` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `campaña`
--

DROP TABLE IF EXISTS `campaña`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaña` (
  `idCampaña` int NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(100) NOT NULL,
  `Descripcion` varchar(3000) NOT NULL,
  `MaxPlayers` int NOT NULL,
  `CurrentPlayers` int NOT NULL,
  `Estrellas` int DEFAULT NULL,
  `Link` varchar(200) DEFAULT NULL,
  `Fecha` date NOT NULL,
  `Horario` time NOT NULL,
  `Imagen` longblob,
  `Host` int NOT NULL,
  PRIMARY KEY (`idCampaña`),
  UNIQUE KEY `idCampaña_UNIQUE` (`idCampaña`),
  KEY `Host_idx` (`Host`),
  CONSTRAINT `Host` FOREIGN KEY (`Host`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `campañaunirse`
--

DROP TABLE IF EXISTS `campañaunirse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campañaunirse` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Id_Campaña` int DEFAULT NULL,
  `Id_Usuario` int DEFAULT NULL,
  `Id_unido` tinyint(1) DEFAULT (false),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `campañauserficha`
--

DROP TABLE IF EXISTS `campañauserficha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campañauserficha` (
  `idCampañaUserFicha` int NOT NULL AUTO_INCREMENT,
  `Campaña_idCampaña` int NOT NULL,
  `User_idUser` int NOT NULL,
  `Ficha_idFicha` int NOT NULL,
  PRIMARY KEY (`idCampañaUserFicha`),
  KEY `fk_CampañaUserFicha_Campaña1_idx` (`Campaña_idCampaña`),
  KEY `fk_CampañaUserFicha_User1_idx` (`User_idUser`),
  KEY `fk_CampañaUserFicha_Ficha1_idx` (`Ficha_idFicha`),
  CONSTRAINT `fk_CampañaUserFicha_Campaña1` FOREIGN KEY (`Campaña_idCampaña`) REFERENCES `campaña` (`idCampaña`),
  CONSTRAINT `fk_CampañaUserFicha_Ficha1` FOREIGN KEY (`Ficha_idFicha`) REFERENCES `ficha` (`idFicha`),
  CONSTRAINT `fk_CampañaUserFicha_User1` FOREIGN KEY (`User_idUser`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clase`
--

DROP TABLE IF EXISTS `clase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clase` (
  `idClase` int NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` varchar(3000) NOT NULL,
  `Vida` int NOT NULL,
  PRIMARY KEY (`idClase`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dados`
--

DROP TABLE IF EXISTS `dados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dados` (
  `idDados` int NOT NULL AUTO_INCREMENT,
  `NumeroCaras` int NOT NULL,
  PRIMARY KEY (`idDados`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feat`
--

DROP TABLE IF EXISTS `feat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feat` (
  `idFeat` int NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Descripcion` varchar(3000) NOT NULL,
  PRIMARY KEY (`idFeat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `featclase`
--

DROP TABLE IF EXISTS `featclase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `featclase` (
  `idFeatClase` int NOT NULL,
  `Nivel` int NOT NULL,
  `Clase_idClase` int NOT NULL,
  `Feat_idFeat` int NOT NULL,
  PRIMARY KEY (`idFeatClase`),
  KEY `fk_FeatClase_Clase1_idx` (`Clase_idClase`),
  KEY `fk_FeatClase_Feat1_idx` (`Feat_idFeat`),
  CONSTRAINT `fk_FeatClase_Clase1` FOREIGN KEY (`Clase_idClase`) REFERENCES `clase` (`idClase`),
  CONSTRAINT `fk_FeatClase_Feat1` FOREIGN KEY (`Feat_idFeat`) REFERENCES `feat` (`idFeat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `featselect`
--

DROP TABLE IF EXISTS `featselect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `featselect` (
  `idFeatSelect` int NOT NULL,
  `Nivel` int NOT NULL,
  `Feat_idFeat` int NOT NULL,
  `Seleccion_IdSeleccion` int NOT NULL,
  PRIMARY KEY (`idFeatSelect`),
  KEY `fk_FeatSelect_Feat1_idx` (`Feat_idFeat`),
  KEY `fk_FeatSelect_Seleccion1_idx` (`Seleccion_IdSeleccion`),
  CONSTRAINT `fk_FeatSelect_Feat1` FOREIGN KEY (`Feat_idFeat`) REFERENCES `feat` (`idFeat`),
  CONSTRAINT `fk_FeatSelect_Seleccion1` FOREIGN KEY (`Seleccion_IdSeleccion`) REFERENCES `seleccion` (`IdSeleccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ficha`
--

DROP TABLE IF EXISTS `ficha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ficha` (
  `idFicha` int NOT NULL AUTO_INCREMENT,
  `Vida` int NOT NULL DEFAULT '0',
  `VidaMac` int NOT NULL DEFAULT '0',
  `VidaTemp` int NOT NULL DEFAULT '0',
  `Defensa` int NOT NULL DEFAULT '10',
  `Velocidad` int NOT NULL DEFAULT '30',
  `Nivel` int NOT NULL DEFAULT '1',
  `Owner` int NOT NULL,
  `Nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idFicha`),
  KEY `IdUser_idx` (`Owner`),
  CONSTRAINT `IdUser` FOREIGN KEY (`Owner`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fichastats`
--

DROP TABLE IF EXISTS `fichastats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fichastats` (
  `idFichaStats` int NOT NULL AUTO_INCREMENT,
  `Numero` int NOT NULL,
  `Ficha_idFicha` int NOT NULL,
  `Stat_idStat` int NOT NULL,
  PRIMARY KEY (`idFichaStats`),
  KEY `fk_FichaStats_Ficha1_idx` (`Ficha_idFicha`),
  KEY `fk_FichaStats_Stat1_idx` (`Stat_idStat`),
  CONSTRAINT `fk_FichaStats_Ficha1` FOREIGN KEY (`Ficha_idFicha`) REFERENCES `ficha` (`idFicha`),
  CONSTRAINT `fk_FichaStats_Stat1` FOREIGN KEY (`Stat_idStat`) REFERENCES `stat` (`idStat`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hechizo`
--

DROP TABLE IF EXISTS `hechizo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hechizo` (
  `idHechizo` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Nivel` int NOT NULL,
  `Descripcion` varchar(3000) NOT NULL,
  `Stat_idStat` int NOT NULL,
  `Ataque_idAtaque` int NOT NULL,
  PRIMARY KEY (`idHechizo`),
  KEY `fk_Hechizo_Stat1_idx` (`Stat_idStat`),
  KEY `fk_Hechizo_Ataque1_idx` (`Ataque_idAtaque`),
  CONSTRAINT `fk_Hechizo_Ataque1` FOREIGN KEY (`Ataque_idAtaque`) REFERENCES `ataque` (`idAtaque`),
  CONSTRAINT `fk_Hechizo_Stat1` FOREIGN KEY (`Stat_idStat`) REFERENCES `stat` (`idStat`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hechizoficha`
--

DROP TABLE IF EXISTS `hechizoficha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hechizoficha` (
  `idHechizoFicha` int NOT NULL AUTO_INCREMENT,
  `Hechizo_idHechizo` int NOT NULL,
  `Ficha_idFicha` int NOT NULL,
  PRIMARY KEY (`idHechizoFicha`),
  KEY `fk_HechizoFicha_Hechizo1_idx` (`Hechizo_idHechizo`),
  KEY `fk_HechizoFicha_Ficha1_idx` (`Ficha_idFicha`),
  CONSTRAINT `fk_HechizoFicha_Ficha1` FOREIGN KEY (`Ficha_idFicha`) REFERENCES `ficha` (`idFicha`),
  CONSTRAINT `fk_HechizoFicha_Hechizo1` FOREIGN KEY (`Hechizo_idHechizo`) REFERENCES `hechizo` (`idHechizo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `imagen`
--

DROP TABLE IF EXISTS `imagen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagen` (
  `idImagen` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Imagen` blob NOT NULL,
  `Ficha_idFicha` int NOT NULL,
  PRIMARY KEY (`idImagen`),
  KEY `fk_Imagen_Ficha1_idx` (`Ficha_idFicha`),
  CONSTRAINT `fk_Imagen_Ficha1` FOREIGN KEY (`Ficha_idFicha`) REFERENCES `ficha` (`idFicha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario` (
  `idInventario` int NOT NULL AUTO_INCREMENT,
  `Cantidad` int NOT NULL,
  `Ficha_idFicha` int NOT NULL,
  `Objeto_idObjeto` int NOT NULL,
  PRIMARY KEY (`idInventario`),
  KEY `fk_Inventario_Ficha1_idx` (`Ficha_idFicha`),
  KEY `fk_Inventario_Objeto1_idx` (`Objeto_idObjeto`),
  CONSTRAINT `fk_Inventario_Ficha1` FOREIGN KEY (`Ficha_idFicha`) REFERENCES `ficha` (`idFicha`),
  CONSTRAINT `fk_Inventario_Objeto1` FOREIGN KEY (`Objeto_idObjeto`) REFERENCES `objeto` (`idObjeto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `objeto`
--

DROP TABLE IF EXISTS `objeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objeto` (
  `idObjeto` int NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Descripcion` varchar(3000) NOT NULL,
  `Ataque_idAtaque` int NOT NULL,
  PRIMARY KEY (`idObjeto`),
  KEY `fk_Objeto_Ataque1_idx` (`Ataque_idAtaque`),
  CONSTRAINT `fk_Objeto_Ataque1` FOREIGN KEY (`Ataque_idAtaque`) REFERENCES `ataque` (`idAtaque`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `otheruserreviews`
--

DROP TABLE IF EXISTS `otheruserreviews`;
/*!50001 DROP VIEW IF EXISTS `otheruserreviews`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `otheruserreviews` AS SELECT 
 1 AS `idReview`,
 1 AS `Comentario`,
 1 AS `Calificacion`,
 1 AS `ReviwerId`,
 1 AS `ReviewerNombre`,
 1 AS `ReviewerEmail`,
 1 AS `Campaña_idCampaña`,
 1 AS `ReviewedId`,
 1 AS `ReviewedNombre`,
 1 AS `ReviewedEmail`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `proficienciaficha`
--

DROP TABLE IF EXISTS `proficienciaficha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proficienciaficha` (
  `idProficienciaFicha` int NOT NULL AUTO_INCREMENT,
  `Maestro` tinyint NOT NULL,
  `Proficiencias_idProficiencias` int NOT NULL,
  `Ficha_idFicha` int NOT NULL,
  PRIMARY KEY (`idProficienciaFicha`),
  KEY `fk_ProficienciaFicha_Proficiencias1_idx` (`Proficiencias_idProficiencias`),
  KEY `fk_ProficienciaFicha_Ficha1_idx` (`Ficha_idFicha`),
  CONSTRAINT `fk_ProficienciaFicha_Ficha1` FOREIGN KEY (`Ficha_idFicha`) REFERENCES `ficha` (`idFicha`),
  CONSTRAINT `fk_ProficienciaFicha_Proficiencias1` FOREIGN KEY (`Proficiencias_idProficiencias`) REFERENCES `proficiencias` (`idProficiencias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proficiencias`
--

DROP TABLE IF EXISTS `proficiencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proficiencias` (
  `idProficiencias` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Stat_idStat` int NOT NULL,
  `Salvacion` tinyint DEFAULT NULL,
  PRIMARY KEY (`idProficiencias`),
  KEY `fk_Proficiencias_Stat1_idx` (`Stat_idStat`),
  CONSTRAINT `fk_Proficiencias_Stat1` FOREIGN KEY (`Stat_idStat`) REFERENCES `stat` (`idStat`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `raza`
--

DROP TABLE IF EXISTS `raza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `raza` (
  `idRaza` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` varchar(3000) NOT NULL,
  PRIMARY KEY (`idRaza`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `idReview` int NOT NULL AUTO_INCREMENT,
  `Comentario` varchar(3000) DEFAULT NULL,
  `Calificacion` int DEFAULT NULL,
  `ReviwerId` int NOT NULL,
  `Campaña_idCampaña` int NOT NULL,
  `ReviewedId` int NOT NULL,
  PRIMARY KEY (`idReview`),
  KEY `fk_Review_User_idx` (`ReviwerId`),
  KEY `fk_Review_Campaña1_idx` (`Campaña_idCampaña`),
  KEY `fk_Review_User1_idx` (`ReviewedId`),
  CONSTRAINT `fk_Review_Campaña1` FOREIGN KEY (`Campaña_idCampaña`) REFERENCES `campaña` (`idCampaña`),
  CONSTRAINT `fk_Review_User` FOREIGN KEY (`ReviwerId`) REFERENCES `user` (`idUser`),
  CONSTRAINT `fk_Review_User1` FOREIGN KEY (`ReviewedId`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `seleccion`
--

DROP TABLE IF EXISTS `seleccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seleccion` (
  `Clase_idClase` int NOT NULL,
  `Raza_idRaza` int NOT NULL,
  `Trasfondo_idTrasfondo` int NOT NULL,
  `Ficha_idFicha` int NOT NULL,
  `IdSeleccion` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`IdSeleccion`),
  KEY `fk_Seleccion_Clase1_idx` (`Clase_idClase`),
  KEY `fk_Seleccion_Raza1_idx` (`Raza_idRaza`),
  KEY `fk_Seleccion_Trasfondo1_idx` (`Trasfondo_idTrasfondo`),
  KEY `fk_Seleccion_Ficha1_idx` (`Ficha_idFicha`),
  CONSTRAINT `fk_Seleccion_Clase1` FOREIGN KEY (`Clase_idClase`) REFERENCES `clase` (`idClase`),
  CONSTRAINT `fk_Seleccion_Ficha1` FOREIGN KEY (`Ficha_idFicha`) REFERENCES `ficha` (`idFicha`),
  CONSTRAINT `fk_Seleccion_Raza1` FOREIGN KEY (`Raza_idRaza`) REFERENCES `raza` (`idRaza`),
  CONSTRAINT `fk_Seleccion_Trasfondo1` FOREIGN KEY (`Trasfondo_idTrasfondo`) REFERENCES `trasfondo` (`idTrasfondo`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stat`
--

DROP TABLE IF EXISTS `stat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stat` (
  `idStat` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Codigo` varchar(45) NOT NULL,
  PRIMARY KEY (`idStat`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subclase`
--

DROP TABLE IF EXISTS `subclase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subclase` (
  `idSubclase` int NOT NULL,
  `Nivel` int NOT NULL,
  `Clase_idClase` int NOT NULL,
  `Clase_idClase1` int NOT NULL,
  PRIMARY KEY (`idSubclase`),
  KEY `fk_Subclase_Clase1_idx` (`Clase_idClase`),
  KEY `fk_Subclase_Clase2_idx` (`Clase_idClase1`),
  CONSTRAINT `fk_Subclase_Clase1` FOREIGN KEY (`Clase_idClase`) REFERENCES `clase` (`idClase`),
  CONSTRAINT `fk_Subclase_Clase2` FOREIGN KEY (`Clase_idClase1`) REFERENCES `clase` (`idClase`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tipodaño`
--

DROP TABLE IF EXISTS `tipodaño`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipodaño` (
  `idTipoDaño` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idTipoDaño`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trasfondo`
--

DROP TABLE IF EXISTS `trasfondo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trasfondo` (
  `idTrasfondo` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Descripcion` varchar(3000) NOT NULL,
  PRIMARY KEY (`idTrasfondo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Contra` varchar(45) NOT NULL,
  `Email` varchar(250) NOT NULL,
  `Imagen` longblob,
  `ImageData` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `Nombre_UNIQUE` (`Nombre`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `userreviews`
--

DROP TABLE IF EXISTS `userreviews`;
/*!50001 DROP VIEW IF EXISTS `userreviews`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `userreviews` AS SELECT 
 1 AS `idReview`,
 1 AS `Comentario`,
 1 AS `Calificacion`,
 1 AS `ReviwerId`,
 1 AS `ReviewerNombre`,
 1 AS `ReviewerEmail`,
 1 AS `Campaña_idCampaña`,
 1 AS `ReviewedId`,
 1 AS `ReviewedNombre`,
 1 AS `ReviewedEmail`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'misionboard'
--
/*!50003 DROP PROCEDURE IF EXISTS `SP_BusquedaCampañas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `attackdetails`
--

/*!50001 DROP VIEW IF EXISTS `attackdetails`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `attackdetails` AS select `a`.`idAtaque` AS `idAtaque`,`a`.`Nombre` AS `AttackName`,`a`.`AimMod` AS `AimMod`,`a`.`DmgMod` AS `DmgMod`,`a`.`Porficiencia` AS `Porficiencia`,`a`.`NDados` AS `NDados`,`d`.`NumeroCaras` AS `DiceType`,`td`.`Nombre` AS `DamageType`,`s`.`Nombre` AS `StatName` from (((`ataque` `a` join `dados` `d` on((`a`.`Dados_idDados` = `d`.`idDados`))) join `tipodaño` `td` on((`a`.`TipoDaño_idTipoDaño` = `td`.`idTipoDaño`))) join `stat` `s` on((`a`.`Stat_idStat` = `s`.`idStat`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `campaignuserinfo`
--

/*!50001 DROP VIEW IF EXISTS `campaignuserinfo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `campaignuserinfo` AS select `campaña`.`Titulo` AS `campaign_title`,`user`.`Nombre` AS `user_name`,`user`.`Email` AS `user_email`,`ficha`.`Vida` AS `character_life`,`ficha`.`Defensa` AS `character_defense`,`ficha`.`Velocidad` AS `character_speed`,`clase`.`Nombre` AS `class_name`,`raza`.`Nombre` AS `race_name`,`trasfondo`.`Nombre` AS `background_name`,`host_user`.`Nombre` AS `host_name`,`host_user`.`Email` AS `host_email` from ((((((((`campaña` join `campañauserficha` on((`campaña`.`idCampaña` = `campañauserficha`.`Campaña_idCampaña`))) join `user` on((`campañauserficha`.`User_idUser` = `user`.`idUser`))) join `ficha` on((`campañauserficha`.`Ficha_idFicha` = `ficha`.`idFicha`))) join `seleccion` on((`ficha`.`idFicha` = `seleccion`.`Ficha_idFicha`))) join `clase` on((`seleccion`.`Clase_idClase` = `clase`.`idClase`))) join `raza` on((`seleccion`.`Raza_idRaza` = `raza`.`idRaza`))) join `trasfondo` on((`seleccion`.`Trasfondo_idTrasfondo` = `trasfondo`.`idTrasfondo`))) join `user` `host_user` on((`campaña`.`Host` = `host_user`.`idUser`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `otheruserreviews`
--

/*!50001 DROP VIEW IF EXISTS `otheruserreviews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `otheruserreviews` AS select `r`.`idReview` AS `idReview`,`r`.`Comentario` AS `Comentario`,`r`.`Calificacion` AS `Calificacion`,`r`.`ReviwerId` AS `ReviwerId`,`u1`.`Nombre` AS `ReviewerNombre`,`u1`.`Email` AS `ReviewerEmail`,`r`.`Campaña_idCampaña` AS `Campaña_idCampaña`,`r`.`ReviewedId` AS `ReviewedId`,`u2`.`Nombre` AS `ReviewedNombre`,`u2`.`Email` AS `ReviewedEmail` from ((`review` `r` join `user` `u1` on((`r`.`ReviwerId` = `u1`.`idUser`))) join `user` `u2` on((`r`.`ReviewedId` = `u2`.`idUser`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `userreviews`
--

/*!50001 DROP VIEW IF EXISTS `userreviews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `userreviews` AS select `r`.`idReview` AS `idReview`,`r`.`Comentario` AS `Comentario`,`r`.`Calificacion` AS `Calificacion`,`r`.`ReviwerId` AS `ReviwerId`,`u1`.`Nombre` AS `ReviewerNombre`,`u1`.`Email` AS `ReviewerEmail`,`r`.`Campaña_idCampaña` AS `Campaña_idCampaña`,`r`.`ReviewedId` AS `ReviewedId`,`u2`.`Nombre` AS `ReviewedNombre`,`u2`.`Email` AS `ReviewedEmail` from ((`review` `r` join `user` `u1` on((`r`.`ReviwerId` = `u1`.`idUser`))) join `user` `u2` on((`r`.`ReviewedId` = `u2`.`idUser`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-06  6:55:15

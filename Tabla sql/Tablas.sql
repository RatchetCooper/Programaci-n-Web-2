
Create database ProframacionWeb2

use ProframacionWeb2

Create Table Usuario
(
ID Int not null primary key,
Contraseña varchar(100),
Rating_Usuario Int

)

--tabla para la reseñas de los usuarios

create table Reseña
(
ID Int Not Null Primary Key,
Clasificacion Int,

ID_Critico Int,
ID_Usuario Int

constraint FK_Reseña_ID_Critico foreign key (ID_Critico) references Usuario(ID),
constraint FK_Reseña_ID_Usuario foreign key (ID_Usuario) references Usuario(ID)
)



Create table Tiradas_Salvacion
(
ID Int not null Primary Key,
Fuerza int,
Destrez int,
Constitucion int,
Inteligencia int,
Sabiduria int,
Carisma int,

ID_Personaje int
)

Create Table Habilidades
(
ID Int not null Primary Key,
Acrobacias Int,
Atletismo Int,
C_Arcano Int,
Historia Int,
Interpretación Int,
Intimidación Int,
Investigación Int,
Juego_Manos Int,
Medicina Int,
Naturaleza Int,
Percepción Int,
Perspicacia Int,
Persuasión Int,
Religión Int,
Sigilo Int,
Supervivencia Int,
T_Animales Int,

ID_Personaje Int
)

create table Estadisticas
(
ID Int Not Null Primary Key,
Fuerza Int,
Destreza int,
Constitucion int,
Inteligencia int,
Sabiduria int,
Carisma Int,
 
ID_Personaje int
)



-- tablas para hechizos objetos y demas de un personaje
Create table Hechizos
(
ID Int Not Null Primary Key,
Nombre varchar (50),
Descripcion varchar(255),
Nivel Int
)

Create Table Trasfondos
(
ID Int Not Null Primary Key,
Nombre Varchar(50),
Descripcion varchar(255)
)

Create Table Objetos
(
ID Int Not NULL Primary Key,
Nombre varchar(50),
Descripcion varchar(255)
)

--crear tabla de personaje y despues se asigna las demas de estadisticas etc
create table Personaje
(
ID Int not null primary key,
Nombre VarChar(50),
Clase Varchar(50),
Nivel Int,	
Trasfondo varchar(50), 	
Raza varchar(50),
Aligamiento	varchar(50),
Clase_Armadura int,
Iniciativa int,	
Velocidad int,
Puntos_Golpe int,	
Sabiduria int,

ID_Usuario int,
ID_TSalvacion int,
ID_Habilidades int,
ID_Estadisticas int,
ID_Trasfondo int,
-- declarar FK	
Constraint FK_Personaje_Usuario Foreign Key (ID_Usuario) References Usuario (ID),
Constraint FK_Personaje_TSalvacion Foreign key (ID_TSalvacion) references Tiradas_Salvacion (ID),
Constraint FK_Personaje_Habilidades  foreign key (ID_Habilidades) references Habilidades (ID),
constraint FK_Personaje_Estadisticas foreign key (ID_Estadisticas) references Estadisticas (ID),
Constraint FK_Personaje_Trasfondo foreign key (ID_Trasfondo) references Trasfondos (ID)
)

alter table Estadisticas Add constraint FK_Estadisticas_Personaje foreign key (ID_Personaje) references Personaje (ID)
Alter table Habilidades Add constraint FK_Habilidades_Personaje Foreign key (ID_Personaje) references Personaje (ID)
Alter table Tiradas_Salvacion Add constraint FK_TiradaSalvacion_Personaje Foreign key (ID_Personaje)  references Personaje (ID)
-- tabla de partidas

create table Partidas
(
ID Int not null Primary Key,
Nombre varchar(100),

ID_Usuario Int,
constraint FK_Partidas_Usuario foreign key (ID_Usuario) references Usuario (ID)
)
-- tablas de objetos, hechizos de personajes

create table Hechizos_Personaje
(
ID int not null primary key,
ID_Personaje int,
ID_Hechizo int,

constraint FK_HP_Personaje foreign key(ID_Personaje) references Personaje (ID),
constraint FK_HP_Hechizo foreign key (ID_Hechizo) references Hechizos (ID)
)

create table Objetos_Personaje
(
ID int not null primary key,
ID_Personaje int,
ID_Objeto int,

constraint FK_OP_Personaje foreign key(ID_Personaje) references Personaje (ID),
constraint FK_OP_Hechizo foreign key (ID_Objeto) references Objetos (ID)
)
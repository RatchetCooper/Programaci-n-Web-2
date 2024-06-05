CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_BusquedaCampañas`(
In B_Titulo Varchar(100),
 B_Estrellas int,
 B_MaxPlayers int,
 B_Fecha date,
 B_Horario time
)
BEGIN
Select idCampaña,Titulo,Descripcion,MaxPlayers,CurrentPlayers,Estrellas,Link,Fecha,Horario,Imagen From campaña
Where Titulo Like if(B_Titulo = "","%%",Concat('%',B_Titulo,'%'))
And (B_Estrellas is null or Estrellas = B_Estrellas)
And (B_MaxPlayers is null or MaxPlayers = B_MaxPlayers)
And (B_Fecha is null or Fecha between B_Fecha and '9999-12-20')
And (B_Horario is null or Horario between B_Horario and '22:59:00');

END
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


END
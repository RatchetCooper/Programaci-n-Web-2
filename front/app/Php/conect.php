<?php

	class DB{
		private $host;
		private $db;
		private $user;
		private $password;


		public function __construct()
		{
			$this->host = 'localhost:3306';
			$this->db = 'MisionBoard';
			$this->user = 'root';
			$this->password = 'Maag201200.';

		}

		function connect(){

			try{
				$conn = "mysql:host=".$this->host.";dbname=".$this->db;
				$options = [
					PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
					PDO::ATTR_EMULATE_PREPARES => false
				];
				$pdo = new PDO($conn, $this->user, $this->password);

				return $pdo;

			}catch(PDOException $e){
				print_r('Error de conexion: ' . $e->getMessage());
			}
		}
	}

?>

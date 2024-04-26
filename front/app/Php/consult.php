<?php

include_once 'config.php';

class Consult extends DB
{
    private $pdo;

    public function __construct()
    {
        parent::__construct(); // Call the parent constructor
    }

    public function connect()
    {
        if ($this->pdo === null) {
            $this->pdo = parent::connect();
        }
        return $this->pdo;
    }


    function RegisterUser($username, $email, $password2, $mediaType, $mediaData) {
        try {
            // Start a transaction
            $this->connect()->beginTransaction();
    
            // Insert user data
            $stmtUser = $this->connect()->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
            $stmtUser->execute([$username, $email, $password2]);
            $userId = $this->connect()->lastInsertId();
    
            // Insert media
            $stmtMedia = $this->connect()->prepare("INSERT INTO media (type, data) VALUES (?, ?)");
            $stmtMedia->execute([$mediaType, $mediaData]);
            $mediaId = $this->connect()->lastInsertId();
    
            // Relate media to user
            $stmtMediaUser = $this->connect()->prepare("INSERT INTO media_users (user_id, media_id) VALUES (?, ?)");
            $stmtMediaUser->execute([$userId, $mediaId]);
    
            // Commit the transaction
            $this->connect()->commit();
    
            // Fetch and return user data
            $stmtFetchUser = $this->connect()->prepare("SELECT * FROM users WHERE id = ?");
            $stmtFetchUser->execute([$userId]);
            $userData = $stmtFetchUser->fetch(PDO::FETCH_ASSOC);
    
            return $userData;
        } catch (PDOException $e) {
            // An error occurred, rollback the transaction
            $this->connect()->rollBack();
            echo "Error executing query: " . $e->getMessage() . "<br>";
            echo "Query: " . $stmtUser->queryString; // Display the query that caused the exception
        }
    }
    
    
    public function loginUser($usernameOrEmail, $password2)
{
    try {
        $stmt = $this->connect()->prepare("SELECT * FROM allinfouser WHERE (username = :usernameOrEmail OR email = :usernameOrEmail) AND password = :password");
        $stmt->bindParam(':usernameOrEmail', $usernameOrEmail, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password2, PDO::PARAM_STR);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Set session variables
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['created_at'] = $user['user_created_at'];
            $_SESSION['media_id'] = $user['media_id'];
            $_SESSION['media_type'] = $user['media_type'];
            $_SESSION['media_data'] = $user['media_data'];
            
            return $user; // Return user data
        }
    } catch (PDOException $e) {
        // Handle the exception (e.g., database error)
    }

    return null; // Login failed
}

public function getUserChats($userId)
{
    try {
        $stmt = $this->connect()->prepare("SELECT ucv.*
        FROM `user_chats_view` ucv
        JOIN (
            SELECT m.`chat_id`, MAX(m.`created_at`) AS `max_created_at`
            FROM `messages` m
            WHERE m.`user_id` = ?
            GROUP BY m.`chat_id`
        ) latest_messages ON ucv.`chat_id` = latest_messages.`chat_id`
        JOIN `messages` m ON ucv.`chat_id` = m.`chat_id` AND ucv.`last_message_timestamp` = m.`created_at`
        ORDER BY ucv.`last_message_timestamp` DESC;
        
    
    ");
        $stmt->execute([$userId]);
        $chats = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $_SESSION['Chats'] =$chats ;
     
        return $chats;
    } catch (PDOException $e) {
        // Handle the exception (e.g., database error)
    }

    return null; // No chats found
}




public function ChatsMessage($ChatId)
{
    try {
        $stmt = $this->connect()->prepare("SELECT * FROM messagemediaview
    WHERE 
        chat_id = ? ORDER BY message_created_at
    
    ");
        $stmt->execute([$ChatId]);
        $chats = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $chats;
    } catch (PDOException $e) {
        // Handle the exception (e.g., database error)
    }

    return null; // No chats found
}

public function FindUserByNameIdEmail($usernameOrEmail)
{
    try {
        $stmt = $this->connect()->prepare("SELECT * FROM allinfouser WHERE (username LIKE '%:usernameOrEmail%' OR user_id LIKE '%:usernameOrEmail%' OR email LIKE '%:usernameOrEmail%' )");
        $stmt->bindParam(':usernameOrEmail', $usernameOrEmail, PDO::PARAM_STR);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $users;
    } catch (PDOException $e) {
        // Handle the exception (e.g., database error)
    }

    return null; // No users found
}

public function insertMessage($chatId, $userId, $message) {
    try {
        // Insert message into the database
        $stmt = $this->connect()->prepare("INSERT INTO messages (chat_id, user_id, message) VALUES (?, ?, ?)");
        $stmt->execute([$chatId, $userId, $message]);
        
        return true; // Return true if insertion is successful
    } catch (PDOException $e) {
        // Handle the exception (e.g., database error)
        return false; // Return false if insertion fails
    }
}

}

?>

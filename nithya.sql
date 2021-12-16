-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.29-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for nithyo
CREATE DATABASE IF NOT EXISTS `nithyo` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `nithyo`;

-- Dumping structure for table nithyo.audit_logs
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `audit_table_name` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `audit_table_id` bigint(20) DEFAULT NULL,
  `audit_action` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `action_date_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table nithyo.audit_logs: ~3 rows (approximately)
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
REPLACE INTO `audit_logs` (`id`, `audit_table_name`, `audit_table_id`, `audit_action`, `description`, `action_date_time`) VALUES
	(1, 'users', 5, 'user created successfully', 'user created successfully', '2021-12-16 12:11:06'),
	(2, 'feedback', 5, 'feedback created successfully', 'feedback created successfully', '2021-12-16 12:13:13'),
	(3, 'feedback', 4, 'user feedback get successfully', 'user feedback get successfully', '2021-12-16 12:21:09'),
	(4, 'feedback', 4, 'user feedback get successfully', 'user feedback get successfully', '2021-12-16 12:54:12');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;

-- Dumping structure for table nithyo.feedback
CREATE TABLE IF NOT EXISTS `feedback` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `feedback` json DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table nithyo.feedback: ~5 rows (approximately)
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
REPLACE INTO `feedback` (`id`, `feedback`) VALUES
	(1, '{"name": "sam", "email": "sam@gmail.com", "userid": "4", "subject": "Feedback Testing", "feedback": "Testing ", "created_at": "2021-12-16 11:39:49"}'),
	(2, '{"name": "balaji", "email": "balaji@gmail.com", "userid": "1", "subject": "Feedback Testing", "feedback": "Testing ", "created_at": "2021-12-16 11:40:16"}'),
	(3, '{"name": "sarath", "email": "sarath@gmail.com", "userid": "1", "subject": "Feedback Testing", "feedback": "Testing ", "created_at": "2021-12-16 11:41:01"}'),
	(4, '{"name": "sarath", "email": "sarath@gmail.com", "userid": "1", "subject": "Feedback Testing", "feedback": "Testing new", "created_at": "2021-12-16 12:11:28"}'),
	(5, '{"name": "sarath", "email": "sarath@gmail.com", "userid": "1", "subject": "Feedback Testing", "feedback": "Testing new", "created_at": "2021-12-16 12:13:13"}');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;

-- Dumping structure for table nithyo.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_details` json DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table nithyo.users: ~5 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`id`, `user_details`) VALUES
	(1, '{"name": "balaji", "email": "balaji@gmail.com", "address": "chennai", "password": "$2a$10$XrCelPkC3EWbaOmwXlgf9.vd3rfdSft1Fz8lWHtu6XTpVjrBBQWly", "created_at": "2021-12-16 11:33:50", "phone_number": "8220116556"}'),
	(2, '{"name": "sarath", "email": "sarath@gmail.com", "address": "chennai", "password": "$2a$10$yjfYOXuAdBRXsZPruG/XIe6iBxNJD9ja3WLb6di.Vpc9ZPwGsUK26", "created_at": "2021-12-16 11:36:41", "phone_number": "8220116556"}'),
	(3, '{"name": "sam", "email": "sam@gmail.com", "address": "chennai", "password": "$2a$10$CPrTevb4.CbJAdJUCokzmeaSYUFzNeMhU0.90Ih8MbFTIubHES0V2", "created_at": "2021-12-16 11:38:35", "phone_number": "8220116556"}'),
	(4, '{"name": "balaji", "email": "sam@gmail.com", "address": "chennai", "password": "$2a$10$Kn9WKbrqWU3bKiKMYnN8DOerDiA2EIK/zx5WgQOHAcuWHOTqbrEWe", "created_at": "2021-12-16 12:09:43", "phone_number": "8220116556"}'),
	(5, '{"name": "balaji", "email": "sam@gmail.com", "address": "chennai", "password": "$2a$10$E81OqpvYjxapRM6260Pf..VNHhH2Gb8jZR3gMTXs6panbK4JFe3gW", "created_at": "2021-12-16 12:11:06", "phone_number": "8220116556"}');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

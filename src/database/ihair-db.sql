Drop database ihair_db;
CREATE DATABASE ihair_db;
USE ihair_db;


CREATE TABLE normalUser(
	id INT PRIMARY KEY AUTO_INCREMENT ,
	`name` VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL, 
	passwordHashed VARCHAR(100) NOT NULL,
	CEP VARCHAR(20) NOT NULL,
	isVerified BOOLEAN NOT NULL DEFAULT FALSE,
	emailToken VARCHAR(50) NULL,
	createdAt VARCHAR(100) NOT NULL
);

CREATE TABLE salonOwner (
	id INT PRIMARY KEY AUTO_INCREMENT,
	completeName VARCHAR(100) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	email VARCHAR(100) NOT NULL,
	passwordHashed VARCHAR(100) NOT NULL,
	profileImgUrl VARCHAR(100) NOT NULL,
	certificateImgUrl VARCHAR(100) NULL,
    hasSalon BOOLEAN DEFAULT FALSE NOT NULL,
	isVerified BOOLEAN NOT NULL DEFAULT FALSE,
	emailToken VARCHAR(50) NULL,
	createdAt VARCHAR(100) NOT NULL
);

CREATE TABLE salon(
	id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    contactPhone VARCHAR(15) NULL,
    bannerImgUrl VARCHAR(100) NOT NULL,
    isVerified BOOLEAN NOT NULL DEFAULT FALSE,
	salonOwnerID INT NOT NULL,
	CEP VARCHAR(10) NOT NULL,
	addressNumber VARCHAR(10) NOT NULL,
	CNPJ VARCHAR(20) NOT NULL,
	salonDescription VARCHAR(200) NOT NULL,
	denunciations SMALLINT DEFAULT 0,
	createdAt DATETIME(3) NOT NULL,
	FOREIGN KEY (salonOwnerID) REFERENCES salonOwner(id)
);

CREATE TABLE openingHours (
	id INT PRIMARY KEY AUTO_INCREMENT,
	indexDaysWeek INT NOT NULL,
	period VARCHAR(13) NOT NULL,
	salonID INT NOT NULL,
	FOREIGN KEY (salonID) REFERENCES salon(id)
);

CREATE TABLE salonImgs(
	id INT PRIMARY KEY AUTO_INCREMENT,
	url VARCHAR(100) NOT NULL,
	salonID INT NOT NULL,
	FOREIGN KEY (salonID) REFERENCES salon(id)
);

CREATE TABLE salonService(
	id INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL,
	`description` VARCHAR(150) NULL,
	price DOUBLE(5, 2) NOT NULL,
	avgTime INT NOT NULL,
	salonID INT NOT NULL,
	FOREIGN KEY (salonID) references salon(id)
);

CREATE TABLE clientSchedule(
	id INT PRIMARY KEY AUTO_INCREMENT,
	scheduleDate DATETIME(3) NOT NULL,
    `status` ENUM('EM ABERTO','FECHADO','CANCELADO','FALTOU') DEFAULT "EM ABERTO" NOT NULL,
	createdAt DATETIME(3) NOT NULL,
	normalUserID INT NOT NULL,
	salonServiceID INT NOT NULL,
	salonID INT NOT NULL,
	FOREIGN KEY (normalUserID) REFERENCES normalUser(id),
	FOREIGN KEY (salonServiceID) REFERENCES salonService(id),
	FOREIGN KEY (salonID) REFERENCES salon(id)
);

CREATE TABLE rating(
	id INT PRIMARY KEY AUTO_INCREMENT,
    `general` DOUBLE(2, 1) NOT NULL,
    `reception` DOUBLE(2, 1) NULL,
    `isCleaning` BOOLEAN NULL,
    `salonGadgets` DOUBLE(2, 1) NULL,
    `serviceQuality` DOUBLE(2, 1) NULL,
    `comment` VARCHAR(200) NULL,
    `chanceDisclose` DOUBLE(2, 1) NULL,
    normalUserID INT NOT NULL,
    salonID INT NOT NULL,
    FOREIGN KEY (normalUserID) REFERENCES normalUser(id),
	FOREIGN KEY (salonID) REFERENCES salon(id)
);


CREATE TABLE denunciation(
	id INT PRIMARY KEY AUTO_INCREMENT,
	`type` VARCHAR(50) NOT NULL,
	salonID INT NOT NULL,
	FOREIGN KEY (salonID) REFERENCES salon(id)
);
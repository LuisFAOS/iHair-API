Drop database ihair_db;
CREATE DATABASE ihair_db;
USE ihair_db;


CREATE TABLE normal_user(
	id VARCHAR(50) PRIMARY KEY,
	`name` VARCHAR(50) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL, 
	password_hashed VARCHAR(100) NOT NULL,
	CEP VARCHAR(20) NOT NULL,
	is_verified BOOLEAN NOT NULL DEFAULT FALSE,
	email_token VARCHAR(50) NULL,
	created_at DATETIME(3) NOT NULL
);

CREATE TABLE salon_owner (
	id VARCHAR(50) PRIMARY KEY,
	complete_name VARCHAR(100) UNIQUE NOT NULL,
	phone VARCHAR(20) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password_hashed VARCHAR(100) NOT NULL,
	profile_img_URL VARCHAR(100) NOT NULL,
	certificate_file_URL VARCHAR(100) NULL,
    has_salon BOOLEAN DEFAULT FALSE NOT NULL,
	is_verified BOOLEAN NOT NULL DEFAULT FALSE,
	email_token VARCHAR(50) NULL,
	created_at DATETIME(3) NOT NULL,
    _denunciation_id VARCHAR(50) NULL DEFAULT NULL,
    FOREIGN KEY (_denunciation_id) REFERENCES denunciation(id)
);

CREATE TABLE denunciation (
	id VARCHAR(50) PRIMARY KEY,
    reason VARCHAR(150) NULL
);

CREATE TABLE salon(
	id VARCHAR(50) PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    contact_phone VARCHAR(15) NULL,
    banner_URL VARCHAR(100) NOT NULL,
	CEP VARCHAR(10) NOT NULL,
	address_number VARCHAR(10) NOT NULL,
	CNPJ VARCHAR(20) NOT NULL,
	salon_description VARCHAR(200) NOT NULL,
	type_service ENUM('Cabeleireiro(a)', 'Barbeiro', 'Manicure', 'Geral') DEFAULT "Cabeleireiro(a)" NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
	_salon_owner_id VARCHAR(50) NOT NULL,
	_denunciation_id VARCHAR(50) NULL,
	createdAt DATETIME(3) NOT NULL,
	FOREIGN KEY (_salon_owner_id) REFERENCES salon_owner(id),
	FOREIGN KEY (_denunciation_id) REFERENCES denunciation(id)
);

/*
alter table salonOwner add denunciationID INT NULL; 
alter table salonOwner add constraint fk_salonOwner_denun Foreign key (denunciationID) references denunciation(id);
*/

CREATE TABLE business_hours (
	id VARCHAR(50) PRIMARY KEY,
	week_day_index INT NOT NULL,
	day_periods VARCHAR(25) NOT NULL,
	_salon_id VARCHAR(50) NOT NULL,
	FOREIGN KEY (_salon_id) REFERENCES salon(id)
);

CREATE TABLE salon_imgs(
	id VARCHAR(50) PRIMARY KEY,
	`URL` VARCHAR(100) NOT NULL,
	_salon_id VARCHAR(50) NOT NULL,
	FOREIGN KEY (_salon_id) REFERENCES salon(id)
);

CREATE TABLE salon_service(
	id VARCHAR(50) PRIMARY KEY,
	`name` VARCHAR(50) NOT NULL,
	`description` VARCHAR(150) NULL,
	price DOUBLE(5, 2) NOT NULL,
	img_model_URL VARCHAR(100) NULL,
	avg_time INT NOT NULL,
	_salon_id VARCHAR(50) NOT NULL,
	FOREIGN KEY (_salon_id) references salon(id)
);

CREATE TABLE client_schedule(
	id VARCHAR(50) PRIMARY KEY,
	`date` DATETIME(3) NOT NULL,
    `status` ENUM('EM ABERTO','FECHADO','CANCELADO','FALTOU', 'CONFIRMADO') DEFAULT "EM ABERTO" NOT NULL,
	created_at DATETIME(3) NOT NULL,
);

CREATE TABLE salon_link_schedule(
	id VARCHAR(50) PRIMARY KEY,
	_salon_service_id VARCHAR(50) NOT NULL,
	_salon_id VARCHAR(50) NOT NULL,
	_client_schedule_id VARCHAR(50),
	FOREIGN KEY (_client_schedule_id) REFERENCES client_schedule(id),
	FOREIGN KEY (_salon_id) REFERENCES salon(id),
	FOREIGN KEY (_salon_service_id) REFERENCES salon_service(id),
);

CREATE TABLE normal_user_link_schedule(
	id VARCHAR(50) PRIMARY KEY,
	_normal_user_id VARCHAR(50) NOT NULL,
	_client_schedule_id VARCHAR(50),
	FOREIGN KEY (_client_schedule_id) REFERENCES client_schedule(id),
	FOREIGN KEY (_normal_user_id) REFERENCES normal_user(id),
);

CREATE TABLE salon_rating(
	id VARCHAR(50) PRIMARY KEY,
    `general` DOUBLE(2, 1) NOT NULL,
    `reception` DOUBLE(2, 1) NULL,
    `is_salon_clean` BOOLEAN NULL,
    `salon_gadgets` DOUBLE(2, 1) NULL,
    `service_quality` DOUBLE(2, 1) NULL,
    `comment` VARCHAR(200) NULL,
    `chance_disclose` TINYINT(2) NULL,
	created_at DATETIME(3) NOT NULL,
    _normal_user_id VARCHAR(50) NOT NULL,
    _salon_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (_normal_user_id) REFERENCES normal_user(id),
	FOREIGN KEY (_salon_id) REFERENCES salon(id)
);

update salon set isVerified=true;

select * from salonOwner;
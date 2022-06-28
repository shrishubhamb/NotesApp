CREATE TABLE user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    email VARCHAR(60) UNIQUE,
    password VARCHAR(100),
    otp INT,
    otpTime BIGINT
);

CREATE TABLE notes(
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    title VARCHAR(60),
    content VARCHAR(1000),
    createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
### Schema

CREATE DATABASE burgers;
USE burgers;

CREATE TABLE burgers
(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  munched BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);

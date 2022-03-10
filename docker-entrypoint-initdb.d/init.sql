create database ExpressExample;
use ExpressExample;
create table User(
    id int auto_increment UNIQUE,
    username varchar(255) UNIQUE,
    password varchar(255),
    primary key (id)
);
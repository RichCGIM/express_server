create database expressdb;
use expressdb;

create table student (
	id int primary key AUTO_INCREMENT,
    name nvarchar(255) not null,
    sex enum('f', 'm')
);

insert into student (name, sex) values ('Jon', 'm');
insert into student (name, sex) values ('Mary', 'f');

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootroot';
FLUSH PRIVILEGES;

select * from student;
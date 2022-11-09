/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 10.4.24-MariaDB : Database - proyecto_inventario
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`proyecto_inventario` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `proyecto_inventario`;

/*Table structure for table `inventario` */

DROP TABLE IF EXISTS `inventario`;

CREATE TABLE `inventario` (
  `id_inventario` int(11) NOT NULL AUTO_INCREMENT,
  `N_referencia` varchar(45) NOT NULL,
  `Cantidad_equipos` int(11) NOT NULL,
  `Productos_id_producto` int(11) NOT NULL,
  PRIMARY KEY (`id_inventario`),
  KEY `fk_Inventario_Productos1_idx` (`Productos_id_producto`),
  CONSTRAINT `fk_Inventario_Productos1` FOREIGN KEY (`Productos_id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `inventario` */

insert  into `inventario`(`id_inventario`,`N_referencia`,`Cantidad_equipos`,`Productos_id_producto`) values 
(1,'0001',30,1),
(2,'0002',20,2);

/*Table structure for table `login` */

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(300) NOT NULL,
  `username` varchar(300) NOT NULL,
  `password` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `login` */

insert  into `login`(`id`,`user`,`username`,`password`) values 
(1,'admin','admin','12345');

/*Table structure for table `marcas_equipos` */

DROP TABLE IF EXISTS `marcas_equipos`;

CREATE TABLE `marcas_equipos` (
  `id_marcas` int(11) NOT NULL AUTO_INCREMENT,
  `Marcas` varchar(45) NOT NULL,
  PRIMARY KEY (`id_marcas`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `marcas_equipos` */

insert  into `marcas_equipos`(`id_marcas`,`Marcas`) values 
(1,'asus'),
(2,'acer');

/*Table structure for table `productos` */

DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion_equipo` varchar(45) NOT NULL,
  `Precio_equipos` double NOT NULL,
  `Marcas_equipos_id_marcas` int(11) NOT NULL,
  PRIMARY KEY (`id_producto`,`Marcas_equipos_id_marcas`),
  KEY `fk_Productos_Marcas_equipos1_idx` (`Marcas_equipos_id_marcas`),
  CONSTRAINT `fk_Productos_Marcas_equipos1` FOREIGN KEY (`Marcas_equipos_id_marcas`) REFERENCES `marcas_equipos` (`id_marcas`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `productos` */

insert  into `productos`(`id_producto`,`Descripcion_equipo`,`Precio_equipos`,`Marcas_equipos_id_marcas`) values 
(1,'Pc de 15\"',2000000,2),
(2,'Pc de 16\"',2500000,1);

/*Table structure for table `todo` */

DROP TABLE IF EXISTS `todo`;

CREATE TABLE `todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `referencia` varchar(300) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `marca` varchar(300) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `precio` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `todo` */

insert  into `todo`(`id`,`referencia`,`cantidad`,`marca`,`descripcion`,`precio`) values 
(1,'001',30,'hp','Pc de 17\"',3000000),
(2,'002',120,'asus','Pc de 15\"',2100000);

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar` varchar(300) NOT NULL,
  `nombre` varchar(300) NOT NULL,
  `planeta` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `usuarios` */

insert  into `usuarios`(`id`,`avatar`,`nombre`,`planeta`) values 
(1,'https://i.imgur.com/gh3fPj5.png','sam','h1'),
(2,'https://i.imgur.com/hvhZNd3.jpg','sam2','h2');

/*Table structure for table `ventas` */

DROP TABLE IF EXISTS `ventas`;

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(300) NOT NULL,
  `referencia` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `ventas` */

insert  into `ventas`(`id`,`usuario`,`referencia`,`cantidad`,`fecha`) values 
(1,'cristian',1,2,'2022-08-11'),
(2,'camilo',2,4,'2022-08-11');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

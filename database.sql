DROP DATABASE IF EXISTS finanzas;
CREATE DATABASE IF NOT EXISTS finanzas;
USE finanzas;
CREATE TABLE iconos (
	id_icono int NOT NULL AUTO_INCREMENT,
	nom_icono varchar(20) NOT NULL,
	codigo_icono varchar(20) NOT NULL,
	PRIMARY KEY(id_icono)
);
CREATE TABLE categorias_ingresos (
	id_categoria_ingresos int NOT NULL AUTO_INCREMENT,
	nom_categoria_ingresos varchar(20) NOT NULL,
	id_icono int NOT NULL,
	PRIMARY KEY(id_categoria_ingresos),
	FOREIGN KEY (id_icono) REFERENCES iconos(id_icono)
);
CREATE TABLE categorias_gastos (
	id_categoria_gastos int NOT NULL AUTO_INCREMENT,
	nom_categoria_gastos varchar(20) NOT NULL,
	id_icono int NOT NULL,
	PRIMARY KEY(id_categoria_gastos),
	FOREIGN KEY (id_icono) REFERENCES iconos(id_icono)
);
CREATE TABLE usuarios (
	doc_usuario int NOT NULL,
	nom_usuario varchar(20) NOT NULL,
	apel_usuario varchar(20) NOT NULL,
	clave_usuario int NOT NULL,
	PRIMARY KEY(doc_usuario)
);
CREATE TABLE ingresos_usuario (
	id_ingreso int NOT NULL AUTO_INCREMENT,
	doc_usuario int NOT NULL,
	id_categoria_ingresos int NOT NULL,
	motivo_ingreso varchar(100) NOT NULL,
	fecha_ingreso date default NULL,
	monto_ingreso int NOT NULL,
	PRIMARY KEY (id_ingreso),
	FOREIGN KEY (doc_usuario) REFERENCES usuarios(doc_usuario),
	FOREIGN KEY (id_categoria_ingresos) REFERENCES categorias_ingresos(id_categoria_ingresos)
);
CREATE TABLE gastos_usuario (
	id_gasto int NOT NULL AUTO_INCREMENT,
	doc_usuario int NOT NULL,
	id_categoria_gastos int NOT NULL,
	motivo_gasto varchar(100) NOT NULL,
	fecha_gasto date default NULL,
	monto_gasto int NOT NULL,
	PRIMARY KEY (id_gasto),
	FOREIGN KEY (doc_usuario) REFERENCES usuarios(doc_usuario),
	FOREIGN KEY (id_categoria_gastos) REFERENCES categorias_gastos(id_categoria_gastos)
);
INSERT INTO iconos VALUES 
(null, 'Hamburguesa', '123'), 
(null, 'Cuaderno', '234'), 
(null, 'Maleta', '345'), 
(null, 'Guitarra', '456');

INSERT INTO categorias_ingresos VALUES
(null, 'Salario laboral', 1),
(null, 'Inversiones', 3),
(null, 'Empresa propia', 4),
(null, 'Dinero encontrado en la calle', 2);

INSERT INTO categorias_gastos VALUES
(null, 'Alimentacion', 1),
(null, 'Viajes', 3),
(null, 'Musica', 4),
(null, 'Educacion', 2);

INSERT INTO usuarios VALUES
(123, 'Julian', 'Calderon', 123),
(234, 'Yesica', 'Martin', 234);

INSERT INTO ingresos_usuario VALUES
(null, 123, 3, 'Gasto', '2018-01-12', 992906),
(null, 234, 4, 'Ingreso', '2018-05-16', 634964),
(null, 123, 2, 'Gasto', '2018-02-22', 163745),
(null, 234, 4, 'Ingreso', '2018-05-04', 970374),
(null, 123, 1, 'Gasto', '2018-02-06', 728758),
(null, 234, 4, 'Ingreso', '2018-01-16', 723910),
(null, 123, 3, 'Gasto', '2018-02-15', 767323),
(null, 234, 2, 'Ingreso', '2018-08-17', 448471),
(null, 123, 2, 'Gasto', '2018-06-05', 898430),
(null, 234, 3, 'Ingreso', '2018-04-26', 107481),
(null, 123, 2, 'Gasto', '2018-08-21', 330766),
(null, 234, 3, 'Ingreso', '2018-06-04', 646694),
(null, 123, 4, 'Gasto', '2018-02-01', 237981),
(null, 234, 1, 'Ingreso', '2018-08-23', 789474),
(null, 123, 2, 'Gasto', '2018-04-05', 766074),
(null, 234, 1, 'Ingreso', '2018-01-26', 175110),
(null, 123, 4, 'Gasto', '2018-06-02', 353944),
(null, 234, 4, 'Ingreso', '2018-02-26', 271884),
(null, 123, 2, 'Gasto', '2018-08-18', 733912),
(null, 234, 4, 'Ingreso', '2018-09-22', 996571),
(null, 123, 4, 'Gasto', '2018-03-12', 465234),
(null, 234, 3, 'Ingreso', '2018-02-25', 365065),
(null, 123, 4, 'Gasto', '2018-10-13', 271509),
(null, 234, 1, 'Ingreso', '2018-08-02', 777976),
(null, 123, 1, 'Gasto', '2018-08-18', 340355),
(null, 234, 3, 'Ingreso', '2018-04-08', 913914),
(null, 123, 3, 'Gasto', '2018-06-07', 931604),
(null, 234, 4, 'Ingreso', '2018-11-22', 345002),
(null, 123, 4, 'Gasto', '2018-01-18', 463396),
(null, 234, 1, 'Ingreso', '2018-11-13', 774139),
(null, 123, 2, 'Gasto', '2018-11-17', 574644),
(null, 234, 2, 'Ingreso', '2018-11-12', 567845),
(null, 123, 4, 'Gasto', '2018-10-15', 72087),
(null, 234, 2, 'Ingreso', '2018-11-08', 720380),
(null, 123, 4, 'Gasto', '2018-06-23', 629922),
(null, 234, 1, 'Ingreso', '2018-10-03', 561253),
(null, 123, 1, 'Gasto', '2018-04-07', 375019),
(null, 234, 1, 'Ingreso', '2018-07-27', 703175),
(null, 123, 3, 'Gasto', '2018-11-08', 288379),
(null, 234, 3, 'Ingreso', '2018-04-22', 954071),
(null, 123, 2, 'Gasto', '2018-03-21', 474890),
(null, 234, 2, 'Ingreso', '2018-05-22', 20087),
(null, 123, 4, 'Gasto', '2018-04-09', 290284),
(null, 234, 2, 'Ingreso', '2018-04-22', 847968),
(null, 123, 4, 'Gasto', '2018-01-15', 421245),
(null, 234, 2, 'Ingreso', '2018-01-12', 157737),
(null, 123, 1, 'Gasto', '2018-04-13', 967659),
(null, 234, 4, 'Ingreso', '2018-02-08', 126543),
(null, 123, 1, 'Gasto', '2018-07-22', 542664),
(null, 234, 3, 'Ingreso', '2018-02-07', 256939),
(null, 123, 4, 'Gasto', '2018-05-16', 808710),
(null, 234, 3, 'Ingreso', '2018-06-07', 117335),
(null, 123, 2, 'Gasto', '2018-02-12', 46627),
(null, 234, 1, 'Ingreso', '2018-02-13', 842303),
(null, 123, 4, 'Gasto', '2018-04-16', 433252),
(null, 234, 2, 'Ingreso', '2018-03-15', 258422),
(null, 123, 4, 'Gasto', '2018-02-20', 190646),
(null, 234, 2, 'Ingreso', '2018-08-08', 876900),
(null, 123, 2, 'Gasto', '2018-01-23', 395944),
(null, 234, 1, 'Ingreso', '2018-07-20', 643334),
(null, 123, 3, 'Gasto', '2018-11-17', 574180),
(null, 234, 1, 'Ingreso', '2018-07-10', 190961),
(null, 123, 1, 'Gasto', '2018-08-07', 202033),
(null, 234, 1, 'Ingreso', '2018-05-23', 144045),
(null, 123, 3, 'Gasto', '2018-09-04', 436615),
(null, 234, 4, 'Ingreso', '2018-01-18', 385874),
(null, 123, 3, 'Gasto', '2018-06-21', 848488),
(null, 234, 2, 'Ingreso', '2018-04-13', 254039),
(null, 123, 4, 'Gasto', '2018-07-21', 58395),
(null, 234, 2, 'Ingreso', '2018-06-16', 607054),
(null, 123, 4, 'Gasto', '2018-02-08', 738923),
(null, 234, 1, 'Ingreso', '2018-11-19', 700140),
(null, 123, 3, 'Gasto', '2018-02-25', 678554),
(null, 234, 3, 'Ingreso', '2018-07-08', 548990),
(null, 123, 4, 'Gasto', '2018-08-20', 207482),
(null, 234, 4, 'Ingreso', '2018-09-22', 423457),
(null, 123, 2, 'Gasto', '2018-08-06', 969431),
(null, 234, 4, 'Ingreso', '2018-07-03', 912567),
(null, 123, 4, 'Gasto', '2018-02-13', 91238),
(null, 234, 3, 'Ingreso', '2018-03-02', 331945),
(null, 123, 4, 'Gasto', '2018-07-16', 695132),
(null, 234, 3, 'Ingreso', '2018-07-04', 278836),
(null, 123, 2, 'Gasto', '2018-02-16', 747209),
(null, 234, 4, 'Ingreso', '2018-11-10', 42097),
(null, 123, 1, 'Gasto', '2018-03-10', 959971),
(null, 234, 4, 'Ingreso', '2018-11-04', 745231),
(null, 123, 3, 'Gasto', '2018-03-12', 848963),
(null, 234, 4, 'Ingreso', '2018-01-04', 374550),
(null, 123, 4, 'Gasto', '2018-08-05', 550613),
(null, 234, 3, 'Ingreso', '2018-09-26', 559754),
(null, 123, 3, 'Gasto', '2018-09-18', 415125),
(null, 234, 2, 'Ingreso', '2018-06-25', 549486),
(null, 123, 2, 'Gasto', '2018-02-07', 403773),
(null, 234, 2, 'Ingreso', '2018-05-07', 809065),
(null, 123, 3, 'Gasto', '2018-06-12', 722426),
(null, 234, 4, 'Ingreso', '2018-06-09', 197802),
(null, 123, 3, 'Gasto', '2018-05-24', 49029),
(null, 234, 2, 'Ingreso', '2018-08-03', 364036),
(null, 123, 2, 'Gasto', '2018-03-26', 834737),
(null, 234, 4, 'Ingreso', '2018-03-08', 582942),
(null, 123, 1, 'Gasto', '2018-02-02', 26174),
(null, 234, 4, 'Ingreso', '2018-10-09', 712763),
(null, 123, 4, 'Gasto', '2018-02-04', 931164),
(null, 234, 3, 'Ingreso', '2018-09-02', 758315),
(null, 123, 2, 'Gasto', '2018-01-17', 183518),
(null, 234, 4, 'Ingreso', '2018-03-26', 661965),
(null, 123, 4, 'Gasto', '2018-04-24', 974776),
(null, 234, 4, 'Ingreso', '2018-07-14', 724637),
(null, 123, 4, 'Gasto', '2018-07-06', 362218),
(null, 234, 3, 'Ingreso', '2018-10-06', 290982),
(null, 123, 1, 'Gasto', '2018-01-12', 854619),
(null, 234, 2, 'Ingreso', '2018-07-27', 728994),
(null, 123, 1, 'Gasto', '2018-02-26', 83236),
(null, 234, 1, 'Ingreso', '2018-01-25', 756708),
(null, 123, 2, 'Gasto', '2018-05-04', 304696),
(null, 234, 1, 'Ingreso', '2018-02-14', 385258),
(null, 123, 3, 'Gasto', '2018-11-25', 929829),
(null, 234, 1, 'Ingreso', '2018-09-09', 272448),
(null, 123, 1, 'Gasto', '2018-02-26', 796730),
(null, 234, 4, 'Ingreso', '2018-10-08', 526411),
(null, 123, 4, 'Gasto', '2018-06-23', 898122),
(null, 234, 4, 'Ingreso', '2018-07-18', 709707),
(null, 123, 4, 'Gasto', '2018-01-14', 11039),
(null, 234, 4, 'Ingreso', '2018-04-09', 510205),
(null, 123, 3, 'Gasto', '2018-03-08', 519522),
(null, 234, 1, 'Ingreso', '2018-03-27', 336138),
(null, 123, 1, 'Gasto', '2018-10-18', 415790),
(null, 234, 1, 'Ingreso', '2018-04-10', 477475),
(null, 123, 4, 'Gasto', '2018-02-27', 916114),
(null, 234, 4, 'Ingreso', '2018-09-04', 649482),
(null, 123, 4, 'Gasto', '2018-08-12', 635910),
(null, 234, 3, 'Ingreso', '2018-11-14', 876604),
(null, 123, 2, 'Gasto', '2018-09-03', 633903),
(null, 234, 2, 'Ingreso', '2018-08-24', 93427),
(null, 123, 1, 'Gasto', '2018-10-20', 847619),
(null, 234, 3, 'Ingreso', '2018-08-10', 628779),
(null, 123, 2, 'Gasto', '2018-03-13', 367608),
(null, 234, 1, 'Ingreso', '2018-05-04', 871636),
(null, 123, 1, 'Gasto', '2018-06-21', 282215),
(null, 234, 3, 'Ingreso', '2018-10-07', 380875),
(null, 123, 2, 'Gasto', '2018-05-10', 386137),
(null, 234, 4, 'Ingreso', '2018-11-12', 682355),
(null, 123, 1, 'Gasto', '2018-07-17', 345312),
(null, 234, 4, 'Ingreso', '2018-10-02', 483979),
(null, 123, 1, 'Gasto', '2018-06-17', 965561),
(null, 234, 4, 'Ingreso', '2018-04-01', 588288),
(null, 123, 1, 'Gasto', '2018-10-10', 335288),
(null, 234, 3, 'Ingreso', '2018-01-17', 821963),
(null, 123, 2, 'Gasto', '2018-08-09', 397961),
(null, 234, 1, 'Ingreso', '2018-07-12', 388658),
(null, 123, 1, 'Gasto', '2018-11-15', 646550),
(null, 234, 4, 'Ingreso', '2018-03-26', 883178),
(null, 123, 2, 'Gasto', '2018-08-09', 426556),
(null, 234, 4, 'Ingreso', '2018-04-22', 983097),
(null, 123, 3, 'Gasto', '2018-01-04', 840491),
(null, 234, 4, 'Ingreso', '2018-06-25', 71836),
(null, 123, 1, 'Gasto', '2018-04-06', 378411),
(null, 234, 4, 'Ingreso', '2018-04-06', 609761),
(null, 123, 1, 'Gasto', '2018-07-04', 637713),
(null, 234, 4, 'Ingreso', '2018-09-15', 444631),
(null, 123, 1, 'Gasto', '2018-03-01', 25697),
(null, 234, 2, 'Ingreso', '2018-06-08', 885497),
(null, 123, 1, 'Gasto', '2018-01-23', 292001),
(null, 234, 2, 'Ingreso', '2018-11-23', 216538),
(null, 123, 2, 'Gasto', '2018-02-15', 605230),
(null, 234, 2, 'Ingreso', '2018-11-21', 774461),
(null, 123, 2, 'Gasto', '2018-01-07', 134019),
(null, 234, 3, 'Ingreso', '2018-04-21', 547914),
(null, 123, 3, 'Gasto', '2018-08-27', 224820),
(null, 234, 3, 'Ingreso', '2018-10-25', 915737),
(null, 123, 4, 'Gasto', '2018-07-23', 339362),
(null, 234, 3, 'Ingreso', '2018-09-09', 416389),
(null, 123, 1, 'Gasto', '2018-05-17', 330850),
(null, 234, 4, 'Ingreso', '2018-06-10', 56169),
(null, 123, 2, 'Gasto', '2018-02-15', 550717),
(null, 234, 1, 'Ingreso', '2018-08-16', 98873),
(null, 123, 2, 'Gasto', '2018-07-20', 202215),
(null, 234, 3, 'Ingreso', '2018-09-13', 365803),
(null, 123, 3, 'Gasto', '2018-11-10', 50723),
(null, 234, 1, 'Ingreso', '2018-01-04', 845504),
(null, 123, 1, 'Gasto', '2018-08-14', 361141),
(null, 234, 3, 'Ingreso', '2018-04-17', 117884),
(null, 123, 3, 'Gasto', '2018-11-24', 591767),
(null, 234, 1, 'Ingreso', '2018-10-03', 216511),
(null, 123, 4, 'Gasto', '2018-11-06', 678143),
(null, 234, 3, 'Ingreso', '2018-09-23', 648665),
(null, 123, 1, 'Gasto', '2018-02-27', 76336),
(null, 234, 4, 'Ingreso', '2018-06-02', 471846),
(null, 123, 1, 'Gasto', '2018-01-26', 964249),
(null, 234, 1, 'Ingreso', '2018-09-18', 728891),
(null, 123, 2, 'Gasto', '2018-03-01', 633582),
(null, 234, 4, 'Ingreso', '2018-06-23', 564917),
(null, 123, 3, 'Gasto', '2018-11-18', 219679),
(null, 234, 2, 'Ingreso', '2018-01-13', 599150),
(null, 123, 2, 'Gasto', '2018-08-23', 18681),
(null, 234, 3, 'Ingreso', '2018-02-23', 149804),
(null, 123, 3, 'Gasto', '2018-11-13', 134250),
(null, 234, 4, 'Ingreso', '2018-10-05', 646057),
(null, 123, 2, 'Gasto', '2018-04-09', 330718),
(null, 234, 3, 'Ingreso', '2018-02-17', 776576);

INSERT INTO gastos_usuario VALUES
(null, 123, 4, 'Gasto', '2018-05-20', 387071),
(null, 234, 3, 'Gasto', '2018-10-02', 302139),
(null, 123, 4, 'Gasto', '2018-04-15', 224193),
(null, 234, 4, 'Gasto', '2018-04-22', 712437),
(null, 123, 1, 'Gasto', '2018-08-08', 668152),
(null, 234, 4, 'Gasto', '2018-03-16', 260338),
(null, 123, 1, 'Gasto', '2018-03-24', 561885),
(null, 234, 2, 'Gasto', '2018-04-22', 489909),
(null, 123, 3, 'Gasto', '2018-02-08', 180855),
(null, 234, 1, 'Gasto', '2018-06-04', 432616),
(null, 123, 4, 'Gasto', '2018-09-27', 947914),
(null, 234, 1, 'Gasto', '2018-02-19', 15481),
(null, 123, 2, 'Gasto', '2018-05-27', 684127),
(null, 234, 1, 'Gasto', '2018-08-08', 244233),
(null, 123, 1, 'Gasto', '2018-01-20', 475981),
(null, 234, 2, 'Gasto', '2018-03-09', 69536),
(null, 123, 3, 'Gasto', '2018-11-07', 383005),
(null, 234, 2, 'Gasto', '2018-10-04', 250604),
(null, 123, 3, 'Gasto', '2018-02-21', 161249),
(null, 234, 1, 'Gasto', '2018-09-03', 370774),
(null, 123, 4, 'Gasto', '2018-02-21', 419280),
(null, 234, 4, 'Gasto', '2018-06-20', 208573),
(null, 123, 4, 'Gasto', '2018-04-24', 780262),
(null, 234, 2, 'Gasto', '2018-11-03', 306414),
(null, 123, 3, 'Gasto', '2018-02-02', 548622),
(null, 234, 4, 'Gasto', '2018-08-26', 325045),
(null, 123, 3, 'Gasto', '2018-04-01', 302335),
(null, 234, 3, 'Gasto', '2018-10-23', 141773),
(null, 123, 1, 'Gasto', '2018-01-14', 240415),
(null, 234, 3, 'Gasto', '2018-05-05', 709424),
(null, 123, 3, 'Gasto', '2018-11-09', 778481),
(null, 234, 4, 'Gasto', '2018-07-05', 859017),
(null, 123, 2, 'Gasto', '2018-10-13', 152889),
(null, 234, 4, 'Gasto', '2018-11-04', 970594),
(null, 123, 2, 'Gasto', '2018-11-11', 589347),
(null, 234, 3, 'Gasto', '2018-05-08', 116005),
(null, 123, 4, 'Gasto', '2018-08-27', 350342),
(null, 234, 4, 'Gasto', '2018-04-04', 437875),
(null, 123, 4, 'Gasto', '2018-05-01', 998202),
(null, 234, 1, 'Gasto', '2018-10-05', 643861),
(null, 123, 3, 'Gasto', '2018-07-23', 439958),
(null, 234, 1, 'Gasto', '2018-01-10', 525517),
(null, 123, 4, 'Gasto', '2018-02-09', 179065),
(null, 234, 2, 'Gasto', '2018-04-10', 685677),
(null, 123, 1, 'Gasto', '2018-09-15', 253214),
(null, 234, 1, 'Gasto', '2018-05-11', 950767),
(null, 123, 2, 'Gasto', '2018-09-07', 739289),
(null, 234, 3, 'Gasto', '2018-04-02', 713346),
(null, 123, 4, 'Gasto', '2018-09-22', 84386),
(null, 234, 1, 'Gasto', '2018-11-08', 173042),
(null, 123, 2, 'Gasto', '2018-03-05', 612469),
(null, 234, 1, 'Gasto', '2018-05-26', 811737),
(null, 123, 2, 'Gasto', '2018-11-25', 311385),
(null, 234, 4, 'Gasto', '2018-03-13', 917375),
(null, 123, 4, 'Gasto', '2018-08-12', 44573),
(null, 234, 4, 'Gasto', '2018-09-13', 266777),
(null, 123, 3, 'Gasto', '2018-11-13', 528327),
(null, 234, 1, 'Gasto', '2018-08-12', 277984),
(null, 123, 4, 'Gasto', '2018-09-03', 43381),
(null, 234, 2, 'Gasto', '2018-07-09', 188261),
(null, 123, 1, 'Gasto', '2018-02-07', 386481),
(null, 234, 3, 'Gasto', '2018-01-25', 736654),
(null, 123, 1, 'Gasto', '2018-10-18', 64405),
(null, 234, 1, 'Gasto', '2018-11-17', 682736),
(null, 123, 2, 'Gasto', '2018-02-18', 643083),
(null, 234, 4, 'Gasto', '2018-01-23', 667695),
(null, 123, 2, 'Gasto', '2018-09-01', 990028),
(null, 234, 2, 'Gasto', '2018-11-10', 114619),
(null, 123, 2, 'Gasto', '2018-05-19', 628555),
(null, 234, 4, 'Gasto', '2018-03-13', 369770),
(null, 123, 4, 'Gasto', '2018-09-26', 511182),
(null, 234, 2, 'Gasto', '2018-07-19', 102278),
(null, 123, 4, 'Gasto', '2018-06-23', 564558),
(null, 234, 1, 'Gasto', '2018-08-06', 273103),
(null, 123, 2, 'Gasto', '2018-03-21', 975428),
(null, 234, 2, 'Gasto', '2018-01-07', 183378),
(null, 123, 3, 'Gasto', '2018-06-18', 517304),
(null, 234, 2, 'Gasto', '2018-07-20', 145302),
(null, 123, 2, 'Gasto', '2018-04-19', 836248),
(null, 234, 4, 'Gasto', '2018-04-08', 273214),
(null, 123, 1, 'Gasto', '2018-05-16', 415454),
(null, 234, 1, 'Gasto', '2018-03-02', 765538),
(null, 123, 1, 'Gasto', '2018-09-23', 694685),
(null, 234, 3, 'Gasto', '2018-03-07', 929100),
(null, 123, 2, 'Gasto', '2018-01-04', 44266),
(null, 234, 1, 'Gasto', '2018-10-18', 460705),
(null, 123, 1, 'Gasto', '2018-06-10', 944545),
(null, 234, 3, 'Gasto', '2018-08-26', 58155),
(null, 123, 3, 'Gasto', '2018-04-06', 190336),
(null, 234, 3, 'Gasto', '2018-09-08', 586185),
(null, 123, 1, 'Gasto', '2018-06-27', 731806),
(null, 234, 3, 'Gasto', '2018-01-21', 11028),
(null, 123, 2, 'Gasto', '2018-11-24', 946304),
(null, 234, 4, 'Gasto', '2018-07-20', 101103),
(null, 123, 1, 'Gasto', '2018-11-21', 194031),
(null, 234, 3, 'Gasto', '2018-08-10', 266966),
(null, 123, 1, 'Gasto', '2018-11-24', 173112),
(null, 234, 3, 'Gasto', '2018-10-05', 502521),
(null, 123, 3, 'Gasto', '2018-09-11', 658561),
(null, 234, 2, 'Gasto', '2018-11-15', 885011),
(null, 123, 2, 'Gasto', '2018-09-13', 730593),
(null, 234, 4, 'Gasto', '2018-08-09', 884170),
(null, 123, 4, 'Gasto', '2018-09-07', 246659),
(null, 234, 3, 'Gasto', '2018-02-14', 129247),
(null, 123, 3, 'Gasto', '2018-04-20', 809204),
(null, 234, 2, 'Gasto', '2018-09-03', 515859),
(null, 123, 2, 'Gasto', '2018-10-17', 371026),
(null, 234, 3, 'Gasto', '2018-10-18', 70008),
(null, 123, 2, 'Gasto', '2018-02-09', 224365),
(null, 234, 4, 'Gasto', '2018-07-09', 775598),
(null, 123, 4, 'Gasto', '2018-11-24', 10629),
(null, 234, 2, 'Gasto', '2018-07-23', 662252),
(null, 123, 3, 'Gasto', '2018-06-05', 640933),
(null, 234, 4, 'Gasto', '2018-08-11', 378384),
(null, 123, 4, 'Gasto', '2018-04-04', 433373),
(null, 234, 4, 'Gasto', '2018-08-11', 887249),
(null, 123, 2, 'Gasto', '2018-10-13', 760298),
(null, 234, 3, 'Gasto', '2018-03-07', 568662),
(null, 123, 3, 'Gasto', '2018-02-23', 465171),
(null, 234, 4, 'Gasto', '2018-04-21', 989935),
(null, 123, 1, 'Gasto', '2018-06-09', 382210),
(null, 234, 4, 'Gasto', '2018-04-13', 34503),
(null, 123, 2, 'Gasto', '2018-01-27', 871360),
(null, 234, 3, 'Gasto', '2018-10-10', 563263),
(null, 123, 2, 'Gasto', '2018-06-06', 960870),
(null, 234, 2, 'Gasto', '2018-06-06', 810230),
(null, 123, 2, 'Gasto', '2018-07-02', 275002),
(null, 234, 3, 'Gasto', '2018-06-26', 767353),
(null, 123, 2, 'Gasto', '2018-05-23', 972966),
(null, 234, 2, 'Gasto', '2018-01-21', 316356),
(null, 123, 4, 'Gasto', '2018-11-18', 860853),
(null, 234, 1, 'Gasto', '2018-07-10', 659200),
(null, 123, 4, 'Gasto', '2018-01-27', 972759),
(null, 234, 3, 'Gasto', '2018-03-25', 47358),
(null, 123, 4, 'Gasto', '2018-04-22', 584101),
(null, 234, 3, 'Gasto', '2018-09-07', 895372),
(null, 123, 3, 'Gasto', '2018-10-03', 60761),
(null, 234, 3, 'Gasto', '2018-10-27', 966819),
(null, 123, 1, 'Gasto', '2018-07-22', 586696),
(null, 234, 2, 'Gasto', '2018-09-05', 967846),
(null, 123, 2, 'Gasto', '2018-10-12', 135957),
(null, 234, 2, 'Gasto', '2018-10-27', 521495),
(null, 123, 2, 'Gasto', '2018-09-11', 574303),
(null, 234, 3, 'Gasto', '2018-07-22', 791930),
(null, 123, 3, 'Gasto', '2018-01-13', 212648),
(null, 234, 4, 'Gasto', '2018-06-26', 448508),
(null, 123, 3, 'Gasto', '2018-08-01', 129308),
(null, 234, 3, 'Gasto', '2018-05-13', 930196),
(null, 123, 2, 'Gasto', '2018-03-13', 17892),
(null, 234, 4, 'Gasto', '2018-03-12', 555333),
(null, 123, 1, 'Gasto', '2018-11-04', 155731),
(null, 234, 3, 'Gasto', '2018-06-27', 809244),
(null, 123, 1, 'Gasto', '2018-07-12', 598918),
(null, 234, 3, 'Gasto', '2018-01-04', 534083),
(null, 123, 3, 'Gasto', '2018-09-06', 578038),
(null, 234, 2, 'Gasto', '2018-04-07', 792189),
(null, 123, 2, 'Gasto', '2018-05-08', 555491),
(null, 234, 3, 'Gasto', '2018-11-01', 14610),
(null, 123, 4, 'Gasto', '2018-02-26', 100049),
(null, 234, 3, 'Gasto', '2018-07-24', 730279),
(null, 123, 3, 'Gasto', '2018-07-13', 745107),
(null, 234, 2, 'Gasto', '2018-01-03', 540141),
(null, 123, 4, 'Gasto', '2018-10-03', 280714),
(null, 234, 3, 'Gasto', '2018-07-08', 422060),
(null, 123, 4, 'Gasto', '2018-01-21', 714689),
(null, 234, 2, 'Gasto', '2018-09-19', 533879),
(null, 123, 1, 'Gasto', '2018-08-11', 696897),
(null, 234, 1, 'Gasto', '2018-05-14', 356114),
(null, 123, 2, 'Gasto', '2018-04-27', 728284),
(null, 234, 1, 'Gasto', '2018-11-17', 642429),
(null, 123, 4, 'Gasto', '2018-10-02', 54550),
(null, 234, 1, 'Gasto', '2018-04-09', 681846),
(null, 123, 2, 'Gasto', '2018-07-06', 401631),
(null, 234, 2, 'Gasto', '2018-06-09', 634981),
(null, 123, 3, 'Gasto', '2018-04-05', 202883),
(null, 234, 2, 'Gasto', '2018-02-25', 476202),
(null, 123, 3, 'Gasto', '2018-01-05', 726585),
(null, 234, 3, 'Gasto', '2018-10-27', 342609),
(null, 123, 4, 'Gasto', '2018-08-16', 185838),
(null, 234, 4, 'Gasto', '2018-06-25', 258138),
(null, 123, 1, 'Gasto', '2018-04-06', 434588),
(null, 234, 2, 'Gasto', '2018-07-04', 863659),
(null, 123, 3, 'Gasto', '2018-05-23', 107997),
(null, 234, 4, 'Gasto', '2018-11-18', 931258),
(null, 123, 3, 'Gasto', '2018-10-05', 715189),
(null, 234, 3, 'Gasto', '2018-06-12', 740672),
(null, 123, 1, 'Gasto', '2018-03-17', 58309),
(null, 234, 3, 'Gasto', '2018-01-01', 88921),
(null, 123, 1, 'Gasto', '2018-06-19', 957416),
(null, 234, 2, 'Gasto', '2018-04-20', 116725),
(null, 123, 1, 'Gasto', '2018-10-01', 418723),
(null, 234, 1, 'Gasto', '2018-01-25', 792188),
(null, 123, 2, 'Gasto', '2018-04-08', 24347),
(null, 234, 1, 'Gasto', '2018-03-26', 849085),
(null, 123, 1, 'Gasto', '2018-04-15', 501548),
(null, 234, 2, 'Gasto', '2018-07-03', 444531),
(null, 123, 2, 'Gasto', '2018-02-23', 55072),
(null, 234, 2, 'Gasto', '2018-05-11', 554658),
(null, 123, 3, 'Gasto', '2018-11-04', 668635),
(null, 234, 2, 'Gasto', '2018-06-24', 757146);

CREATE PROCEDURE graficoIngresos(
	IN fechaini DATE,
	IN fechafin DATE,
	IN doc VARCHAR(11)
)
SELECT CI.nom_categoria_ingresos categoria, SUM(IU.monto_ingreso) monto
FROM ingresos_usuario IU 
INNER JOIN usuarios U ON U.doc_usuario = IU.doc_usuario 
INNER JOIN categorias_ingresos CI ON CI.id_categoria_ingresos = IU.id_categoria_ingresos
WHERE IU.doc_usuario = 123 AND (IU.fecha_ingreso >= fechaini AND IU.fecha_ingreso <= fechafin)
GROUP BY IU.id_categoria_ingresos;

CREATE PROCEDURE graficoGastos(
	IN fechaini DATE,
	IN fechafin DATE,
	IN doc VARCHAR(11)
)
SELECT CG.nom_categoria_gastos categoria, SUM(GU.monto_gasto) monto
FROM gastos_usuario GU 
INNER JOIN usuarios U ON U.doc_usuario = GU.doc_usuario 
INNER JOIN categorias_gastos CG ON CG.id_categoria_gastos = GU.id_categoria_gastos
WHERE GU.doc_usuario = doc AND (GU.fecha_gasto >= fechaini AND GU.fecha_gasto <= fechafin)
GROUP BY GU.id_categoria_gastos;

CREATE PROCEDURE filtroGeneral(
	IN doc VARCHAR(11)
)
SELECT GU.gasto, IU.ingreso
FROM
(
    SELECT U.doc_usuario, SUM(GU.monto_gasto) gasto
    FROM gastos_usuario GU 
    INNER JOIN usuarios U ON U.doc_usuario = GU.doc_usuario 
    WHERE  GU.doc_usuario = doc
) GU INNER JOIN
(
	SELECT U.doc_usuario, SUM(IU.monto_ingreso) ingreso
    FROM ingresos_usuario IU 
    INNER JOIN usuarios U ON U.doc_usuario = IU.doc_usuario 
    WHERE  IU.doc_usuario = doc 
) IU ON GU.doc_usuario  = IU.doc_usuario;
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
(234, 'Yesica', 'Martin', 234),
(345, 'Jhonathan', 'Troncoso', 345),
(456, 'Pablo', 'Neruda', 456);

INSERT INTO ingresos_usuario VALUES
(null, 123, 1, 'Traduccion de un texto', '2018-11-16', 100000),
(null, 456, 4, 'Libro', '2018-11-16', 2000000),
(null, 123, 3, 'Violin', '2018-11-16', 100000),
(null, 345, 2, 'Salario', '2018-11-16', 1500000);

INSERT INTO gastos_usuario VALUES
(null, 345, 2, 'Las Bermudas', '2018-11-11', 400000),
(null, 123, 1, 'Mercado', '2018-11-11', 100000),
(null, 456, 4, 'Curso de retorica', '2018-11-11', 2000000),
(null, 123, 3, 'Violin', '2018-11-11', 100000),
(null, 234, 3, 'Recargo', '2018-10-29', 120000),
(null, 234, 4, 'Matriula', '2018-10-31', 500000),
(null, 234, 3, 'Recargo', '2018-10-30', 500000),
(null, 234, 4, 'Certificado', '2018-10-29', 12000),
(null, 234, 4, 'Pepeleria', '2018-11-01', 80000),
(null, 234, 2, 'Pasajes', '2018-11-01', 140000),
(null, 234, 2, 'Boletas', '2018-11-13', 70000),
(null, 234, 1, 'Ropa', '2018-11-09', 130000);

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
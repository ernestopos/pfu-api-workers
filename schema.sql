/*
DROP TABLE if EXISTS donations;
CREATE TABLE IF NOT EXISTS donations(customer_email VARCHAR(100) PRIMARY KEY,reference VARCHAR(50),customer_name VARCHAR(100), amount_in_cents INT, currency VARCHAR(10), date TIMESTAMP,status VARCHAR(20), clientid INT);
DROP TABLE if EXISTS DONACION;
CREATE TABLE IF NOT EXISTS DONACION (ID INTEGER PRIMARY KEY AUTOINCREMENT,AMOUNT_IN_CENTS INT,CURRENCY VARCHAR(100),DATE TIMESTAMP,STATUS VARCHAR(10),CLIENTID INT,FOREIGN KEY (CLIENTID) REFERENCES CLIENTE(ID));
DROP TABLE if EXISTS CLIENTE;
CREATE TABLE IF NOT EXISTS CLIENTE(ID INTEGER PRIMARY KEY AUTOINCREMENT,NOMBRE VARCHAR(250),NUMERODOC VARCHAR(100) UNIQUE,TIPODOC VARCHAR(100),CORREO VARCHAR(250));
*/
DROP TABLE IF EXISTS DETALL_FACTURA;
DROP TABLE IF EXISTS FACTURA;
DROP TABLE IF EXISTS PRODUCTO;
DROP TABLE IF EXISTS ARTICULO;
DROP TABLE IF EXISTS PARAMETRO;

CREATE TABLE IF NOT EXISTS PARAMETRO (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  NOMBRE VARCHAR(100),
  DESCRIPCION VARCHAR(100),
  VALOR VARCHAR(100),
  AGRUPADOR VARCHAR(100),
  ESTADO INT
);

CREATE TABLE IF NOT EXISTS ARTICULO (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  NOMBRE VARCHAR(100),
  CODIGO VARCHAR(100),
  DESCRIPCION VARCHAR(300),  
  FIGURE_CLASS VARCHAR(250),
  IMG_SRC VARCHAR(250),
  IMG_ALT VARCHAR(250),
  IMG_CLASS VARCHAR(250),
  IMG_ON_CLICK VARCHAR(250),
  DATA_CODIGO VARCHAR(250),
  DATA_NOMBRE VARCHAR(250),
  DATA_DESCRIPCION VARCHAR(300),
  FIGCAPTION VARCHAR(300),
  ESTADO INT  
);

CREATE TABLE IF NOT EXISTS PRODUCTO (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  ID_ARTICULO INT,
  ID_PARAMETRO INT,
  DATA_PRECIO INT,
  ESTADO INT,
  FOREIGN KEY (ID_ARTICULO) REFERENCES ARTICULO(ID),
  FOREIGN KEY (ID_PARAMETRO) REFERENCES PARAMETRO(ID)
);

CREATE TABLE IF NOT EXISTS FACTURA (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  CODIGO VARCHAR(200) UNIQUE,
  ID_CLIENTE INT,  
  VALOR_FACT INT,
  MONEDA VARCHAR(100),
  FECHA_VENTA TIMESTAMP,
  ESTADO VARCHAR(10),  
  PAGADO INT,
  ARTICULO_ENVIADO VARCHAR(100),
  FOREIGN KEY (ID_CLIENTE) REFERENCES CLIENTE(ID)
);

CREATE TABLE IF NOT EXISTS DETALL_FACTURA (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  ID_FACTURA INT,
  ID_PRODUCTO INT,
  CANTIDAD INT,
  VALOR_UNITARIO INT,
  VALOR_TOTAL INT,  
  FOREIGN KEY (ID_FACTURA) REFERENCES FACTURA(ID),
  FOREIGN KEY (ID_PRODUCTO) REFERENCES PRODUCTO(ID)
);

INSERT INTO ARTICULO (NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) VALUES ('Camisa Tipo Polo Rosada', 'POL001', 'Camisa tipo polo en tono rosado suave, confeccionada en fibra de algodón premium. Su textura ligera y transpirable brinda comodidad total. Ideal para climas cálidos, con un ajuste moderno y detalles que resaltan tu estilo con frescura y elegancia.', 'wp-block-image size-large', 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/camisas_6-683x1024.png', 'Camisa tipo polo PFep', 'wp-image-263 camisa-preview', 'handleClick(this)', 'POL001', 'Camisa tipo polo en tono rosado suave, confeccionada en fibra de algodón premium. Su textura ligera y transpirable brinda comodidad total. Ideal para climas cálidos, con un ajuste moderno y detalles que resaltan tu estilo con frescura y elegancia.', 'Camisa tipo polo en tono rosado suave, confeccionada en fibra de algodón premium. Su textura ligera y transpirable brinda comodidad total. Ideal para climas cálidos, con un ajuste moderno y detalles que resaltan tu estilo con frescura y elegancia.', 'Camisa tipo polo en tono rosado suave, confeccionada en fibra de algodón premium. Su textura ligera y transpirable brinda comodidad total. Ideal para climas cálidos, con un ajuste moderno y detalles que resaltan tu estilo con frescura y elegancia', 1);
INSERT INTO ARTICULO (NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) VALUES ('Camisas Tipo Polo en Azul Oscuro, Gris y Beige, Perfectas para Voluntarios', 'POL002', 'Diseñadas para quienes marcan la diferencia. Estas camisas tipo polo en tonos sobrios (azul oscuro, gris y beige) combinan comodidad, frescura y resistencia. Su tela de algodón suave es ideal para jornadas activas, brindando estilo y libertad de movimiento.', 'wp-block-image size-large', 'https://www.peerkals.com/wp/wp-content/uploads/2025/07/camisas_4.png', 'Camisa tipo polo blanca PFep', 'wp-image-232 camisa-preview', 'handleClick(this)', 'POL002', 'Diseñadas para quienes marcan la diferencia. Estas camisas tipo polo en tonos sobrios (azul oscuro, gris y beige) combinan comodidad, frescura y resistencia. Su tela de algodón suave es ideal para jornadas activas, brindando estilo y libertad de movimiento.', 'Camisa blanca con logo PFep bordado', 'Diseñadas para quienes marcan la diferencia. Estas camisas tipo polo en tonos sobrios (azul oscuro, gris y beige) combinan comodidad, frescura y resistencia. Su tela de algodón suave es ideal para jornadas activas, brindando estilo y libertad de movimiento.', 1);
INSERT INTO ARTICULO (NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) VALUES ('Camisa tipo polo Beige Causal', 'POL003', 'Elegancia relajada para cualquier ocasión. Esta polo beige, confeccionada en algodón suave, ofrece una textura ligera y transpirable. Su tono neutro y diseño casual la convierten en una prenda versátil, perfecta para lucir cómodo y con estilo', 'wp-block-image size-large', 'https://www.peerkals.com/wp/wp-content/uploads/2025/07/camisas_1.png', 'Camisa tipo polo azul PFep', 'wp-image-230 camisa-preview', 'handleClick(this)', 'POL003', 'Camisa tipo polo azul PFep', 'Elegancia relajada para cualquier ocasión. Esta polo beige, confeccionada en algodón suave, ofrece una textura ligera y transpirable. Su tono neutro y diseño casual la convierten en una prenda versátil, perfecta para lucir cómodo y con estilo', 'Elegancia relajada para cualquier ocasión. Esta polo beige, confeccionada en algodón suave, ofrece una textura ligera y transpirable. Su tono neutro y diseño casual la convierten en una prenda versátil, perfecta para lucir cómodo y con estilo', 1);
INSERT INTO ARTICULO (NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) VALUES ('Camisa tipo polo Beige Deportiva', 'POL004', 'Diseñada para la acción y el confort. Esta polo beige deportiva está hecha con tela de alta transpirabilidad y tacto suave. Su corte moderno y fibras flexibles brindan libertad de movimiento, ideal para jornadas activas sin perder estilo.', 'wp-block-image size-large', 'https://www.peerkals.com/wp/wp-content/uploads/2025/07/camisas_2.png', 'Camisa tipo polo gris PFep', 'wp-image-231 camisa-preview', 'handleClick(this)', 'POL004', 'Camisa tipo polo gris PFep', 'Diseñada para la acción y el confort. Esta polo beige deportiva está hecha con tela de alta transpirabilidad y tacto suave. Su corte moderno y fibras flexibles brindan libertad de movimiento, ideal para jornadas activas sin perder estilo.', 'Diseñada para la acción y el confort. Esta polo beige deportiva está hecha con tela de alta transpirabilidad y tacto suave. Su corte moderno y fibras flexibles brindan libertad de movimiento, ideal para jornadas activas sin perder estilo.', 1);
INSERT INTO ARTICULO (NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) VALUES ('Suéter Unisex para Agentes de Cambio', 'POL005', 'Confeccionado para líderes con propósito. Este suéter unisex combina suavidad, abrigo y estilo. Su tejido cálido y resistente abraza cada desafío con elegancia, ideal para hombres y mujeres que transforman el mundo con cada paso', 'wp-block-image size-large', 'https://www.peerkals.com/wp/wp-content/uploads/2025/07/camisas_3.jpg', 'Camisa polo mujer PFep', 'wp-image-247 camisa-preview', 'handleClick(this)', 'POL005', 'Camisa polo mujer PFep', 'Confeccionado para líderes con propósito. Este suéter unisex combina suavidad, abrigo y estilo. Su tejido cálido y resistente abraza cada desafío con elegancia, ideal para hombres y mujeres que transforman el mundo con cada paso', 'Confeccionado para líderes con propósito. Este suéter unisex combina suavidad, abrigo y estilo. Su tejido cálido y resistente abraza cada desafío con elegancia, ideal para hombres y mujeres que transforman el mundo con cada paso', 1);
INSERT INTO ARTICULO (NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) VALUES ('Camisas Tipo Polos Elegante para Toda Ocasión', 'POL006', 'Diseñadas para quienes combinan estilo y distinción. Estas camisas elegantes se ajustan con comodidad a eventos formales o casuales. Tela suave, colores sobrios y un acabado impecable que resalta tu presencia en cualquier momento del día.', 'wp-block-image size-large', 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/camisas_5-1024x683.png', 'Camisa polo gris mujer PFep', 'wp-image-261 camisa-preview', 'handleClick(this)', 'POL006', 'Camisa polo gris mujer PFep', 'Diseñadas para quienes combinan estilo y distinción. Estas camisas elegantes se ajustan con comodidad a eventos formales o casuales. Tela suave, colores sobrios y un acabado impecable que resalta tu presencia en cualquier momento del día.', 'Diseñadas para quienes combinan estilo y distinción. Estas camisas elegantes se ajustan con comodidad a eventos formales o casuales. Tela suave, colores sobrios y un acabado impecable que resalta tu presencia en cualquier momento del día.', 1);
INSERT INTO ARTICULO (NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) VALUES ('Camisa Tipo Polo Beige con Café, Inspirada en el Café Colombiano', 'POL007', 'Camisa manga larga con logo PFep', 'wp-block-image size-large', 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/camisas_7.jpg', 'Camisa polo manga larga PFep', 'wp-image-231 camisa-preview', 'handleClick(this)', 'POL007', 'Camisa polo manga larga PFep', 'Elegancia y tradición en una sola prenda. Su tono beige evoca los suaves matices del café colombiano, mientras que su tela fresca y de alta calidad garantiza comodidad todo el día. Ideal para quienes llevan con orgullo el sabor y espíritu de nuestra tierra.', 'Elegancia y tradición en una sola prenda. Su tono beige evoca los suaves matices del café colombiano, mientras que su tela fresca y de alta calidad garantiza comodidad todo el día. Ideal para quienes llevan con orgullo el sabor y espíritu de nuestra tierra.', 1);
INSERT INTO ARTICULO (NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) VALUES ('Camisa Tipo Polo Café Aroma de Tierra', 'POL008', 'Inspirada en los paisajes cafeteros de Colombia, esta camisa tipo polo en tono café combina estilo y tradición. Su fibra suave brinda frescura y comodidad, ideal para jornadas activas o momentos casuales con el sello auténtico de nuestra cultura cafetera', 'wp-block-image size-large', 'https://www.peerkals.com/wp/wp-content/uploads/2025/07/camisavol-683x1024.jpeg', 'Camisa polo negra PFep', 'wp-image-248 camisa-preview', 'handleClick(this)', 'POL008', 'Camisa polo negra PFep', 'Inspirada en los paisajes cafeteros de Colombia, esta camisa tipo polo en tono café combina estilo y tradición. Su fibra suave brinda frescura y comodidad, ideal para jornadas activas o momentos casuales con el sello auténtico de nuestra cultura cafetera', 'Inspirada en los paisajes cafeteros de Colombia, esta camisa tipo polo en tono café combina estilo y tradición. Su fibra suave brinda frescura y comodidad, ideal para jornadas activas o momentos casuales con el sello auténtico de nuestra cultura cafetera', 1);

INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) VALUES ('Talla', 'Talla de la prenda', 'S', 'TALLA', 1);
INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) VALUES ('Talla', 'Talla de la prenda', 'M', 'TALLA', 1);
INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) VALUES ('Talla', 'Talla de la prenda', 'L', 'TALLA', 1);
INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) VALUES ('Talla', 'Talla de la prenda', 'XL', 'TALLA', 1);

INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1, 1, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1, 2, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1, 3, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1, 4, 49900, 1);

INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 1, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 2, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 3, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 4, 49900, 1);

INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 1, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 2, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 3, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 4, 49900, 1);

INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (4, 1, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (4, 2, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (4, 3, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (4, 4, 49900, 1);

INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (5, 1, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (5, 2, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (5, 3, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (5, 4, 49900, 1);

INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (6, 1, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (6, 2, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (6, 3, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (6, 4, 49900, 1);

INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (7, 1, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (7, 2, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (7, 3, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (7, 4, 49900, 1);

INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (8, 1, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (8, 2, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (8, 3, 49900, 1);
INSERT INTO PRODUCTO (ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (8, 4, 49900, 1);

DROP TABLE if EXISTS DONACION;
DROP TABLE IF EXISTS DETALL_FACTURA;
DROP TABLE IF EXISTS FACTURA;
DROP TABLE if EXISTS CLIENTE;
DROP TABLE IF EXISTS PRODUCTO;
DROP TABLE IF EXISTS CATEGORIA;
DROP TABLE IF EXISTS ARTICULO;
DROP TABLE IF EXISTS PARAMETRO;
DROP TABLE if EXISTS donations;

CREATE TABLE IF NOT EXISTS DONACION (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  AMOUNT_IN_CENTS INT,
  CURRENCY VARCHAR(100),
  DATE TIMESTAMP,STATUS VARCHAR(10),
  CLIENTID INT,
  FOREIGN KEY (CLIENTID) REFERENCES CLIENTE(ID));

CREATE TABLE IF NOT EXISTS CLIENTE(
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  NOMBRE VARCHAR(250),
  NUMERODOC VARCHAR(100) UNIQUE,
  TELEFONO VARCHAR(100), 
  TIPODOC VARCHAR(100),
  CORREO VARCHAR(250));


CREATE TABLE IF NOT EXISTS PARAMETRO (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  NOMBRE VARCHAR(100),
  DESCRIPCION VARCHAR(100),
  VALOR VARCHAR(100),
  AGRUPADOR VARCHAR(100),
  ESTADO INT
);

CREATE TABLE IF NOT EXISTS CATEGORIA (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  NOMBRE VARCHAR(100),
  CODIGO VARCHAR(100),
  DESCRIPCION VARCHAR(300),  
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
  ID_CATEGORIA INT,
  ID_ARTICULO INT,  
  ID_PARAMETRO INT,
  DATA_PRECIO INT,
  ESTADO INT,
  FOREIGN KEY (ID_CATEGORIA) REFERENCES CATEGORIA(ID),
  FOREIGN KEY (ID_ARTICULO) REFERENCES ARTICULO(ID),
  FOREIGN KEY (ID_PARAMETRO) REFERENCES PARAMETRO(ID)
);

CREATE TABLE IF NOT EXISTS FACTURA (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  ID_TRANSATION VARCHAR(200),
  CODIGO VARCHAR(200) UNIQUE,
  ID_CLIENTE INT,  
  VALOR_FACT INT,
  MONEDA VARCHAR(100),
  FECHA_VENTA TIMESTAMP,
  ESTADO VARCHAR(10),  
  PAGADO INT,
  DEPARTAMENTO VARCHAR(100),
  CIUDAD VARCHAR(200),
  DIRECCION VARCHAR(300),
  ARTICULO_ENVIADO,
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

INSERT INTO CATEGORIA (NOMBRE,CODIGO,DESCRIPCION,ESTADO) VALUES ('Camisas Tipo Polo Unisex', 'ATP001', 'Camisas Tipo Polo Unisex', 1);
INSERT INTO CATEGORIA (NOMBRE,CODIGO,DESCRIPCION,ESTADO) VALUES ('Ropa de niños', 'ROPN001', 'Ropa de niños', 1);
INSERT INTO CATEGORIA (NOMBRE,CODIGO,DESCRIPCION,ESTADO) VALUES ('Pijamas', 'PILL001', 'Pijamas', 1);
INSERT INTO CATEGORIA (NOMBRE,CODIGO,DESCRIPCION,ESTADO) VALUES ('Ropa de Hogar', 'ROPH001', 'Ropa de Hogar', 1);
INSERT INTO CATEGORIA (NOMBRE,CODIGO,DESCRIPCION,ESTADO) VALUES ('Accesorios', 'ACCE001', 'Accesorios', 1);

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

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,1, 1, 60000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,1, 2, 62000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,1, 3, 64000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,1, 4, 66000, 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,2, 1, 60000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,2, 2, 62000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,2, 3, 64000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,2, 4, 66000, 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,3, 1, 60000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,3, 2, 62000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,3, 3, 64000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,3, 4, 66000, 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,4, 1, 60000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,4, 2, 62000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,4, 3, 64000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,4, 4, 66000, 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,5, 1, 50000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,5, 2, 52000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,5, 3, 54000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,5, 4, 56000, 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,6, 1, 60000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,6, 2, 62000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,6, 3, 64000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,6, 4, 66000, 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,7, 1, 60000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,7, 2, 62000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,7, 3, 64000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,7, 4, 66000, 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,8, 1, 60000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,8, 2, 62000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,8, 3, 64000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (1,8, 4, 66000, 1);

INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Conjuntos de niño: Camisa beige + bermuda azul marino con logo bordado',
 'LRN001',
 'Camisa en tono beige suave y bermuda azul marino. Confeccionado en telas frescas y cómodas para dar libertad de movimiento, ideal para el día a día o salidas familiares. El logo bordado aporta un toque de estilo único',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/conjunto_nino_1.png',
 'Conjuntos de niño: Camisa beige + bermuda azul marino con logo bordado',
 'wp-image-263 camisa-preview',
 'handleClick(this)',
 'LRN001',
 'Conjuntos de niño: Camisa beige + bermuda azul marino con logo bordado',
 'Camisa beige y bermuda azul con logo bordado',
 'Conjunto fresco y cómodo con logo distintivo',
 0);

 INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Conjuntos de niño: Camisa rosada + bermuda beige con logo en la camisa y la bermuda',
 'LRN002',
 'Camisa rosada combinada con bermuda beige. Un look alegre y moderno que resalta la energía de los pequeños. Incluye el logo bordado tanto en la camisa como en la bermuda, garantizando un diseño exclusivo',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/conjunto_nino_3.png',
 'Conjuntos de niño: Camisa rosada + bermuda beige con logo en la camisa y la bermuda',
 'wp-image-232 camisa-preview',
 'handleClick(this)',
 'LRN002',
 'Conjunto rosado y beige con logo bordado',
 'Camisa rosada y bermuda beige con detalles únicos',
 'Conjunto alegre y exclusivo para niños',
 0);

 INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Conjuntos de niño: Camisa blanca + bermuda negra con logo en ambas prendas',
 'LRN003',
 'Camisa blanca de corte limpio y bermuda negra elegante. Un conjunto versátil y atemporal que se adapta a cualquier ocasión, desde un paseo casual hasta una reunión especial. El logo bordado refuerza la identidad y la calidad de la prenda',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/conjunto_nino_2.png',
 'Conjuntos de niño: Camisa blanca + bermuda negra con logo en ambas prendas',
 'wp-image-230 camisa-preview',
 'handleClick(this)',
 'LRN003',
 'Conjunto blanco y negro con logo bordado',
 'Elegancia casual y versátil para cualquier ocasión',
 'Conjunto clásico con sello distintivo',
 0);

 INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Conjuntos de niñas: Princesa Urbana - Blusa blanca + faldita rosada con logo bordado en ambas prendas',
 'LRN004',
 'Blusa blanca combinada con faldita rosada. Un diseño tierno y fresco, pensado para brindar comodidad mientras mantiene un estilo encantador. El logo bordado en ambas piezas le da un sello distintivo y especial',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/conjunto_nina_1.png',
 'Conjuntos de niñas: Princesa Urbana - Blusa blanca + faldita rosada con logo bordado en ambas prendas',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'LRN004',
 'Conjunto Princesa Urbana con logo bordado',
 'Blusa blanca y faldita rosada con estilo encantador',
 'Diseño fresco, cómodo y exclusivo',
 0);

INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) VALUES ('Talla', '4 - 5 años', 'XS', 'TALLA', 1);
INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) VALUES ('Talla', '6 - 7 años', 'S', 'TALLA', 1);
INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) VALUES ('Talla', '8 - 10 años', 'M', 'TALLA', 1);
INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) VALUES ('Talla', '12 - 14 años', 'L', 'TALLA', 1);
INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) VALUES ('Talla', '16 años aproximadamente', 'XL', 'TALLA', 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 9, 5, 120000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 9, 6, 120000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 9, 7, 120000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 9, 8, 130000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 9, 9, 130000, 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 10, 5, 120000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 10, 6, 120000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 10, 7, 120000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 10, 8, 130000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 10, 9, 130000, 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 11, 5, 120000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 11, 6, 120000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 11, 7, 120000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 11, 8, 130000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 11, 9, 130000, 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 12, 5, 120000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 12, 6, 120000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 12, 7, 120000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 12, 8, 130000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (2, 12, 9, 130000, 1);

INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Pijamas para niños: Pijama Cósmica Azul Cielo',
 'PILLN005',
 'Hermosa pijama en tonos azul cielo con estampado sutil de cohetes y lunas desvanecidos. Incluye el logo oficial, brindando un diseño único que combina comodidad y aventura espacial para los más pequeños',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/pijamas_nino_1.png',
 'Hermosa pijama en tonos azul cielo con estampado sutil de cohetes y lunas desvanecidos. Incluye el logo oficial, brindando un diseño único que combina comodidad y aventura espacial para los más pequeños',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'PILLN005',
 'Pijamas para niños: Pijama Cósmica Azul Cielo',
 'Pijamas para niños: Pijama Cósmica Azul Cielo',
 'Pijamas para niños: Pijama Cósmica Azul Cielo',
 0);

 INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Pijamas para niñas: Conjunto Rosado',
 'PILLN006',
 'Dulce pijama tipo batica en color rosado, con detalles suaves y delicados. Perfecta para brindar confort y ternura en las noches de descanso',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/pijamas_nina_1.png',
 'Dulce pijama tipo batica en color rosado, con detalles suaves y delicados. Perfecta para brindar confort y ternura en las noches de descanso',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'PILLN006',
 'Pijamas para niñas: Conjunto Rosado',
 'Pijamas para niñas: Conjunto Rosado',
 'Pijamas para niñas: Conjunto Rosado',
 0);

 INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Pijamas para bebes: Conjunto Rosado',
 'PILLN007',
 'Dulce pijama tipo batica en color rosado, con detalles suaves y delicados. Perfecta para brindar confort y ternura en las noches de descanso',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/pijamas_bebe_nena.png',
 'Dulce pijama tipo batica en color rosado, con detalles suaves y delicados. Perfecta para brindar confort y ternura en las noches de descanso',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'PILLN007',
 'Pijamas para bebes: Conjunto Rosado',
 'Pijamas para bebes: Conjunto Rosado',
 'Pijamas para bebes: Conjunto Rosado',
 0);

  INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Pijamas para Mujer: Pijama Rosada Esencial',
 'PILLN008',
 'Elegante conjunto de dos piezas en tono rosado, con el logo oficial estampado delicadamente. Diseñada para ofrecer confort y estilo, perfecta para noches relajadas y llenas de encanto',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/pijamas_adultos.png',
 'Elegante conjunto de dos piezas en tono rosado, con el logo oficial estampado delicadamente. Diseñada para ofrecer confort y estilo, perfecta para noches relajadas y llenas de encanto',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'PILLN008',
 'Pijamas para Mujer: Pijama Rosada Esencial',
 'Pijamas para Mujer: Pijama Rosada Esencial',
 'Pijamas para Mujer: Pijama Rosada Esencial',
 0);

INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Pijama Rosada Estilo Princesa Infantil',
 'PILLN009',
 'Una pijama de dos piezas diseñada especialmente para niñas, con un delicado tono rosado y un estilo elegante que recuerda a una pequeña princesa. Su tela suave y cómoda brinda frescura y libertad de movimiento, ideal para noches tranquilas y dulces sueños',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/pijama_nina2.png',
 'Una pijama de dos piezas diseñada especialmente para niñas, con un delicado tono rosado y un estilo elegante que recuerda a una pequeña princesa. Su tela suave y cómoda brinda frescura y libertad de movimiento, ideal para noches tranquilas y dulces sueños',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'PILLN009',
 'Pijama Rosada Estilo Princesa Infantil',
 'Pijama Rosada Estilo Princesa Infantil',
 'Pijama Rosada Estilo Princesa Infantil',
 0);
 

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 13, 5, 65000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 13, 6, 65000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 13, 7, 65000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 13, 8, 70000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 13, 9, 70000, 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 14, 5, 65000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 14, 6, 65000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 14, 7, 65000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 14, 8, 70000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 14, 9, 70000, 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 15, 5, 55000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 15, 6, 55000, 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 16, 5, 130000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 16, 6, 130000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 16, 7, 130000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 16, 8, 135000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 16, 9, 135000, 1);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 17, 5, 65000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 17, 6, 65000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 17, 7, 65000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 17, 8, 70000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (3, 17, 9, 70000, 1);

INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) VALUES ('Equipo Comercial', 'correo enviado al comercial', 'ernestopos@gmail.com', 'EMAIL_FACT', 1);
INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) VALUES ('Equipo Compras', 'correo enviado a adriana', 'adrianasofiaorozco86@gmail.com', 'EMAIL_FACT', 1);

INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Sábanas : Royal Elephant Collection',
 'ROPHN001',
 'Sábanas hoteleras tipo king en algodón premium, elegantes y sofisticadas, con el sello distintivo del elefante dorado en patrón fino. Una pieza que combina lujo, confort y exclusividad, diseñada para quienes buscan un descanso con estilo',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/ropa_hogar2.png',
 'Sábanas hoteleras tipo king en algodón premium, elegantes y sofisticadas, con el sello distintivo del elefante dorado en patrón fino. Una pieza que combina lujo, confort y exclusividad, diseñada para quienes buscan un descanso con estilo',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'ROPHN001',
 'Sábanas : Royal Elephant Collection',
 'Sábanas : Royal Elephant Collection',
 'Sábanas : Royal Elephant Collection',
 0);

INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Sábanas : Royal Elephant Casual',
 'ROPHN002',
 'Sábanas hoteleras tipo king en algodón premium, elegantes y causal, con el sello distintivo del elefante repetido en patrón fino. Una pieza que combina lujo, confort y exclusividad, diseñada para quienes buscan un descanso con estilo',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/ropa_hogar1.png',
 'Sábanas hoteleras tipo king en algodón premium, elegantes y causal, con el sello distintivo del elefante repetido en patrón fino. Una pieza que combina lujo, confort y exclusividad, diseñada para quienes buscan un descanso con estilo',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'ROPHN002',
 'Sábanas : Royal Elephant Casual',
 'Sábanas : Royal Elephant Casual',
 'Sábanas : Royal Elephant Casual',
 0);
 
INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) VALUES ('KING', 'Dimensiones estándar (Colombia / Latam) Ancho: 2 m - Largo: 200 c, Diseñada para dos personas que desean máximo espacio y comodidad', 'KING', 'ROPAHOGAR', 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (4, 18, 12, 200000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (4, 19, 12, 200000, 1);

INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) VALUES ('GORRA', 'Gorras Surtidas', 'GORRA', 'GORRA', 1);

INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Gorra Rosada PFU',
 'GORR001',
 'Un accesorio lleno de estilo y frescura. Su tono rosado resalta la elegancia juvenil, perfecto para quienes quieren proyectar energía y actitud positiva',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/gorra_2.png',
 'Un accesorio lleno de estilo y frescura. Su tono rosado resalta la elegancia juvenil, perfecto para quienes quieren proyectar energía y actitud positiva',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'GORR001',
 'Gorra Rosada PFU',
 'Gorra Rosada PFU',
 'Gorra Rosada PFU',
 1);

 INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Gorra Blanca PFU',
 'GORR002',
 'Minimalismo y clase en una sola pieza. Su color blanco puro combina con todo, transmitiendo limpieza, frescura y versatilidad en cualquier ocasión',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/gorra_1.png',
 'Minimalismo y clase en una sola pieza. Su color blanco puro combina con todo, transmitiendo limpieza, frescura y versatilidad en cualquier ocasión',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'ROPHN002',
 'Gorra Blanca PFU',
 'Gorra Blanca PFU',
 'Gorra Blanca PFU',
 1);

  INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Gorra Negra PFU',
 'GORR003',
 'Sobriedad y carácter. La gorra negra PFU es ideal para un look fuerte y atemporal, un básico indispensable que refleja seguridad y estilo urbano',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/gorra_3.png',
 'Sobriedad y carácter. La gorra negra PFU es ideal para un look fuerte y atemporal, un básico indispensable que refleja seguridad y estilo urbano',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'GORR003',
 'Gorra Negra PFU',
 'Gorra Negra PFU',
 'Gorra Negra PFU',
 1);

 INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (5, 20, 13, 50000, 1);
 INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (5, 21, 13, 50000, 1);
 INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (5, 22, 13, 50000, 1);

INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Pulsera Negra Solidaria PFU',
 'PULS001',
 'Manilla estilo banda de caucho, en un elegante tono rosado, con el icónico elefante de PFU como símbolo de unión y propósito',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/manilla_1.png',
 'Manilla estilo banda de caucho, en un elegante tono rosado, con el icónico elefante de PFU como símbolo de unión y propósito',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'PULS001',
 'Pulsera Negra Solidaria PFU',
 'Pulsera Negra Solidaria PFU',
 'Pulsera Negra Solidaria PFU',
 1);

 INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Pulsera Rosada Solidaria PFU',
 'PULS002',
 'Manilla estilo banda de caucho, en un elegante tono rosado, con el icónico elefante de PFU como símbolo de unión y propósito',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/manilla_2.png',
 'Manilla estilo banda de caucho, en un elegante tono rosado, con el icónico elefante de PFU como símbolo de unión y propósito',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'PULS002',
 'Pulsera Rosada Solidaria PFU',
 'Pulsera Rosada Solidaria PFU',
 'Pulsera Rosada Solidaria PFU',
 1);

 INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Pulsera Blanca Solidaria PFU',
 'PULS003',
 'Manilla estilo banda de caucho, en un elegante tono rosado, con el icónico elefante de PFU como símbolo de unión y propósito',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/manilla_3.png',
 'Manilla estilo banda de caucho, en un elegante tono rosado, con el icónico elefante de PFU como símbolo de unión y propósito',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'PULS003',
 'Pulsera Blanca Solidaria PFU',
 'Pulsera Blanca Solidaria PFU',
 'Pulsera Blanca Solidaria PFU',
 1);

 INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) 
 VALUES ('PULSERA', 'Pulseras Surtidas', 'PULSERA', 'PULSERA', 1);

 INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (5, 23, 14, 15000, 1);
 INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (5, 24, 14, 15000, 1);
 INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (5, 25, 14, 15000, 1);

INSERT INTO PARAMETRO (NOMBRE, DESCRIPCION, VALOR, AGRUPADOR, ESTADO) 
VALUES ('MOCHILA', 'Mochilas Surtidas', 'MOCHILA', 'MOCHILA', 1);

INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Mochila Ébano Blanco con líneas Doradas',
 'MOCH001',
 'Mochila artesanal estilo Wayuu en tono negro profundo, realzada con líneas y logo en dorado que aportan elegancia y modernidad',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/mochila_1.png',
 'Mochila artesanal estilo Wayuu en tono negro profundo, realzada con líneas y logo en dorado que aportan elegancia y modernidad',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'MOCH001',
 'Mochila Ébano Blanco con líneas Doradas',
 'Mochila Ébano Blanco con líneas Doradas',
 'Mochila Ébano Blanco con líneas Doradas',
 0);

 INSERT INTO ARTICULO 
(NOMBRE, CODIGO, DESCRIPCION, FIGURE_CLASS, IMG_SRC, IMG_ALT, IMG_CLASS, IMG_ON_CLICK, DATA_CODIGO, DATA_NOMBRE, DATA_DESCRIPCION, FIGCAPTION, ESTADO) 
VALUES 
('Mochila Ébano Negra con líneas Doradas',
 'MOCH002',
 'Mochila artesanal estilo Wayuu en tono negro profundo, realzada con líneas y logo en dorado que aportan elegancia y modernidad',
 'wp-block-image size-large',
 'https://www.peerkals.com/wp/wp-content/uploads/2025/08/mochila_2.png',
 'Mochila artesanal estilo Wayuu en tono negro profundo, realzada con líneas y logo en dorado que aportan elegancia y modernidad',
 'wp-image-231 camisa-preview',
 'handleClick(this)',
 'MOCH002',
 'Mochila Ébano Negra con líneas Doradas',
 'Mochila Ébano Negra con líneas Doradas',
 'Mochila Ébano Negra con líneas Doradas',
 0);

INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (5, 26, 15, 145000, 1);
INSERT INTO PRODUCTO (ID_CATEGORIA, ID_ARTICULO, ID_PARAMETRO, DATA_PRECIO, ESTADO) VALUES (5, 27, 15, 145000, 1);
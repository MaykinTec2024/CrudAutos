create database concesionaria
go

use concesionaria
go


CREATE TABLE Auto (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Marca NVARCHAR(100) NOT NULL,
    Modelo NVARCHAR(100) NOT NULL,
    Tipo NVARCHAR(50) NOT NULL,
    CantidadAsientos INT NOT NULL
);

INSERT INTO Auto (Marca, Modelo, Tipo, CantidadAsientos) VALUES 
('Toyota', 'Corolla', 'Sedán', 5),
('Honda', 'CR-V', 'SUV', 5),
('Ford', 'Mustang', 'Deportivo', 4),
('Chevrolet', 'Silverado', 'Camioneta', 3),
('Nissan', 'Altima', 'Sedán', 5);
go

SELECT * FROM Auto
go


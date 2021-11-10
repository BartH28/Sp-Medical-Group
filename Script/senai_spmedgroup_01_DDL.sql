CREATE DATABASE SP_MEDICAL_GROUP_H
GO

USE SP_MEDICAL_GROUP_H
GO



CREATE TABLE TIPO_DE_USUARIO(
idTipoUsuario SMALLINT PRIMARY KEY IDENTITY,
nomeTipo VARCHAR(20) NOT NULL,
);
GO

CREATE TABLE SITUACAO(
idSituacao SMALLINT PRIMARY KEY IDENTITY,
Descri��o VARCHAR(20) NOT NULL,
);
GO

CREATE TABLE ESPECIALIDADE(
idEspecialidade SMALLINT PRIMARY KEY IDENTITY,
NomeEscpecialidade VARCHAR(80) NOT NULL,
);
GO


/*DROP TABLE TIPO_USUARIO
GO
CREATE TABLE TIPO_USUARIO(
idTipoUsuario SMALLINT PRIMARY KEY IDENTITY,
nomeTipo VARCHAR(80) NOT NULL
);
GO
*/


CREATE TABLE ENDERECO(
idEndereco SMALLINT PRIMARY KEY IDENTITY,
RuaAvenida VARCHAR(80) NOT NULL,
Numero VARCHAR(5) NOT NULL,
Bairro VARCHAR(40),
Cidade VARCHAR(50) NOT NULL,
siglaEstado VARCHAR(2) NOT NULL,
CEP VARCHAR(9) 
);
GO


CREATE TABLE USUARIO(
idUsuario SMALLINT PRIMARY KEY IDENTITY,
idTipoUsuario SMALLINT DEFAULT(1) FOREIGN KEY REFERENCES TIPO_DE_USUARIO(idTipoUsuario),
idEndereco SMALLINT FOREIGN KEY REFERENCES ENDERECO(idEndereco),
Nome VARCHAR(50) NOT NULL,
Email VARCHAR(256) NOT NULL,
Senha VARCHAR(10) NOT NULL CHECK( len(senha) >= 8),
DataNascimento DATE NOT NULL,
Telefone VARCHAR(20),
Rg VARCHAR(12) NOT NULL,
CPF VARCHAR(12) NOT NULL,
);
GO

DROP TABLE USUARIO
GO


CREATE TABLE CLINICA(
idClinica SMALLINT PRIMARY KEY IDENTITY,
idEndereco SMALLINT FOREIGN KEY REFERENCES ENDERECO(idEndereco),
nomeFantasia VARCHAR(100) NOT NULL,
razaoSocial VARCHAR(100) NOT NULL,
CNPJ VARCHAR(19) NOT NULL
);
GO

CREATE TABLE MEDICO(
idMedico SMALLINT PRIMARY KEY IDENTITY,
idClinica SMALLINT FOREIGN KEY REFERENCES CLINICA(idClinica),
idEspecialidade SMALLINT FOREIGN KEY REFERENCES ESPECIALIDADE(idEspecialidade),
Nome VARCHAR(50) NOT NULL,
Email VARCHAR(256) NOT NULL,
Senha VARCHAR(10) NOT NULL CHECK( len(senha) >= 8),
CRM VARCHAR(10) NOT NULL
);
GO

DROP TABLE CONSULTA

CREATE TABLE CONSULTA(
idConsulta SMALLINT PRIMARY KEY IDENTITY,
idSituacao SMALLINT DEFAULT(3) FOREIGN KEY REFERENCES SITUACAO(idSituacao),
idUsuario SMALLINT FOREIGN KEY REFERENCES Usuario(idUsuario),
idMedico SMALLINT FOREIGN KEY REFERENCES Medico(idMedico),
DataConsulta SMALLDATETIME NOT NULL,
Descricao VARCHAR(500),
);
GO
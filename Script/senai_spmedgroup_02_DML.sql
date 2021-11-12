USE SP_MEDICAL_GROUP_H
GO

INSERT INTO ENDERECO(RuaAvenida,Numero,Bairro,Cidade,siglaEstado,CEP)
VALUES ('Rua Estado de Israel','240',NULL,'São Paulo', 'SP','04022-000'),
('Av. Paulista','1578','Bela Vista','São Paulo', 'SP','01310-200'),
('Av. Ibirapuera','2927','Indianopolis','São Paulo', 'SP','04029-200'),
('R. Vitória','120','Vila SãoJorge','Barueri', 'SP','06402-030'),
('R. Ver. Geraldo de Camargo','66','Santa Luiza','Ribeirão Pires', 'SP','09405-380'),
('Alameda dos Arapanés','945','Indianopolis','São Paulo', 'SP','04524-001'),
('R Sao Antonio','232','Vila Universal','Barueri', 'SP','06407-140'),
('Av. Barão Limeira','532','Santa Cecilia','São Paulo', 'SP','')
GO


INSERT INTO CLINICA(nomeFantasia,razaoSocial,idEndereco,CNPJ)
VALUES ('Clinica Possarle','SP Medical Group', 8,'86.400.902/0001-30')
GO

SELECT * FROM MEDICO

INSERT INTO SITUACAO(Descrição)
VALUES ('Realizado'), ('Cancelado'),('Agendado')
GO
INSERT INTO TIPO_DE_USUARIO(nomeTipo)
VALUES ('Administrador'),('Comum'),('Medico')
GO



INSERT INTO ESPECIALIDADE(NomeEscpecialidade)
VALUES ('Acupultura') ,('Anestesiologia'),('Angiologia'),('Cardiologia'),('Cirurgia Cardiovascular'),('Cirurgia da Mão'),('Cirurgia do Aparelho Digestivo'),('Cirurgia Geral'),('Cirurgia Pediatrica'),('Cirurgia Plástica'),('Cirurgia Torácica'),('Cirurgia Vascula'),('Dermatologia'),('Radioterapia'),('Urologia'),('Pediatria'),('Psiquiatria')
GO

INSERT INTO MEDICO(idClinica,idEspecialidade,idUsuario,Nome,CRM)
VALUES (1,2,8,'Ricardo Lemos','54356-SP'),(1,17,9,'Roberto Possarle','53452-SP'),(1,16,10,'Helena Strada','65463-SP')
GO

INSERT INTO USUARIO(idTipoUsuario,idEndereco,Nome,Email,Senha,DataNascimento,Telefone, Rg,CPF)
VALUES (2, 1,'Ligia', 'ligia@gmail.com','12345678', '1983/10/13','11 3456-7654','43522543-5','94839859000'),
(2, 2,'Alexandre', 'alexandre@gmail.com','12345678', '2001/07/23','11 98765-6543','32654345-7','73556944057'),
(2,3, 'Fernando','fernando@gmail.com','12345678','1978/10/10','11 97208-4453','54636525-3','16839338002'),
(2,4, 'Henrique','henrique@gmail.com','12345678','1985/10/13','11 3456-6543','54366362-5','14332654765'),
(2,5, 'João','joao@hotmail.com','12345678','1975/08/27','11 7656-6377','53254444-1','91305348010'),
(2,6, 'Bruno','bruno@gmail.com','12345678','1972/03/21','11 95436-8769','54566266-7','79799299004'),
(2,7, 'Mariana','mariana@outlook.com','12345678','2018/03/05',NULL,'54566266-8','13771913039'),
(3,5, 'Ricardo Lemos','ricardo.lemos@spmedicalgroup.com.br','12345678','1985/03/05','11 95436-8769','54566267-8','13771913040'),
(3,2, 'Roberto Possarle','roberto.possarle@spmedicalgroup.com.br','12345678','1979/03/05','11 95436-8769','54566268-8','13771913041'),
(3,5, 'Helena Strada','helena.souza@spmedicalgroup.com.br','12345678','1990/03/05','11 95436-8769','54566269-8','13771913042'),
(1,1, 'adm','adm@spmedicalgroup.com.br','12345678','1996/06/06','11 95436-8769','54566203-8','13771944042')
GO



INSERT INTO CONSULTA(idSituacao,idUsuario,idMedico,DataConsulta,Descricao)
VALUES (1,7,4,'20-01-2020 15:00:00','Remedio diagnosticado'),
(2,2,3,'01-06-2020 10:00:00','Cancelado'),
(1,3,3,'07-02-2020 11:00:00','Ultima Sessão Terapeutica'),
(1,2,3,'06-02-2018 10:00:00','Diagnostico feito'),
(2,4,2,'07-02-2019 11:00:00','Cancelado'),
(3,7,4,'03-08-2020 15:00:00','Para consulta'),
(3,4,2,'03-09-2020 11:00:00','Para consulta')
GO

truncate TABLE CONSULTA
USE SP_MEDICAL_GROUP_H
SELECT * FROM CLINICA
SELECT * FROM CONSULTA
SELECT * FROM ENDERECO
SELECT * FROM ESPECIALIDADE

SELECT * FROM SITUACAO
SELECT * FROM TIPO_DE_USUARIO
SELECT * FROM USUARIO
SELECT * FROM MEDICO


SELECT USUARIO.Nome as 'Nome Usuario', MEDICO.Nome as 'Nome Medico', convert(varchar, DataConsulta, 113) AS Data, SITUACAO.Descri��o FROM CONSULTA
INNER JOIN USUARIO
ON USUARIO.idUsuario = CONSULTA.idUsuario
INNER JOIN MEDICO
ON MEDICO.idMedico = CONSULTA.idMedico
INNER JOIN SITUACAO
ON SITUACAO.idSituacao = CONSULTA.idSituacao
GO

select convert(varchar, DataConsulta, 113) AS Data FROM CONSULTA
select convert(varchar, DataConsulta, 0) AS Data FROM CONSULTA



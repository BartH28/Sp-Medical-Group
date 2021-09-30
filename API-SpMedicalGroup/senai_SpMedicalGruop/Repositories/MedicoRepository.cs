using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using senai_SpMedicalGruop.Contexts;
using senai_SpMedicalGruop.Domains;
using senai_SpMedicalGruop.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Repositories
{
    public class MedicoRepository : IMedicoRepository
    {
        readonly SpMGContext ctx = new();
        public void Atualizar(int idMedico, Medico MedicoAtualizado)
        {
            Medico MedicoBuscado = ctx.Medicos.Find(Convert.ToInt16(idMedico));

            if (MedicoAtualizado.Nome != null)
            {
                MedicoBuscado.Nome = MedicoAtualizado.Nome;
                //MedicoBuscado.Email = MedicoAtualizado.Email;
                //MedicoBuscado.Senha = MedicoAtualizado.Senha;

                ctx.Medicos.Update(MedicoBuscado);

                ctx.SaveChanges();
            }
        }

        public Medico BuscarPorId(int idMedico)
        {
            return ctx.Medicos.Select(m => new Medico()
            {
                IdMedico = m.IdMedico,
                Nome = m.Nome,
                Email = m.Email,
                IdEspecialidade = m.IdEspecialidade,

                IdEspecialidadeNavigation = new Especialidade()
                {
                    NomeEscpecialidade = m.IdEspecialidadeNavigation.NomeEscpecialidade
                },

                IdClinicaNavigation = new Clinica()
                {
                    NomeFantasia = m.IdClinicaNavigation.NomeFantasia
                }

            }).FirstOrDefault(e => e.IdMedico == idMedico);
        }

        public void Cadastrar(Medico novoMedico)
        {
            ctx.Medicos.Add(novoMedico);

            ctx.SaveChanges();
        }

        public string ConsultarPerfilDir(int id_Medico)
        {
            string nome_arquivo = id_Medico.ToString() + ".png";

            string caminho = Path.Combine("perfil", nome_arquivo);

            if (File.Exists(caminho))
            {
                byte[] bytes_arquivo = File.ReadAllBytes(caminho);

                return Convert.ToBase64String(bytes_arquivo);
            }

            return null;
        }

        public void Deletar(int idMedico)
        {
            ctx.Medicos.Remove(BuscarPorId(idMedico));

            ctx.SaveChanges();
        }

        public List<Medico> Listar()
        {
            return ctx.Medicos.Select(m => new Medico()
            {
                IdMedico = m.IdMedico,
                Nome = m.Nome,
                Email = m.Email,
                IdEspecialidade = m.IdEspecialidade,

                IdEspecialidadeNavigation = new Especialidade()
                {
                    NomeEscpecialidade = m.IdEspecialidadeNavigation.NomeEscpecialidade
                },

                IdClinicaNavigation = new Clinica()
                {
                    NomeFantasia = m.IdClinicaNavigation.NomeFantasia
                }

            }).ToList();
        }
        

        public Medico Login(string email, string senha)
        {
            return ctx.Medicos.FirstOrDefault(m => m.Email == email && m.Senha == senha);
        }

        public void SalvarPerfilDir(IFormFile foto, int id_Medico)
        {
            string nome_arquivo = id_Medico.ToString() + ".png";

            using var stream = new FileStream(Path.Combine("PerfilMed", nome_arquivo), FileMode.Create);

            foto.CopyTo(stream);
        }
    }
}

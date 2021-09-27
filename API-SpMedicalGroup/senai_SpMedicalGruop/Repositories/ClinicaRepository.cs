using senai_SpMedicalGruop.Contexts;
using senai_SpMedicalGruop.Domains;
using senai_SpMedicalGruop.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {
        readonly SpMGContext ctx = new();
        public void Atualizar(int idClinica, Clinica ClinicaAtualizado)
        {
            Clinica ClinicaBuscado = ctx.Clinicas.Find(idClinica);

            if (ClinicaAtualizado.IdEndereco != null && ClinicaAtualizado.NomeFantasia != null)
            {
                ClinicaBuscado.IdEndereco = ClinicaAtualizado.IdEndereco;
                ClinicaBuscado.NomeFantasia = ClinicaAtualizado.NomeFantasia;
                ClinicaBuscado.RazaoSocial = ClinicaAtualizado.RazaoSocial;
                ClinicaBuscado.Cnpj = ClinicaAtualizado.Cnpj;

                ctx.Clinicas.Update(ClinicaBuscado);

                ctx.SaveChanges();
            }

        }

        public Clinica BuscarPorId(int idClinica)
        {
            return ctx.Clinicas.FirstOrDefault(e => e.IdClinica == idClinica);
        }

        public void Cadastrar(Clinica novoClinica)
        {
            ctx.Clinicas.Add(novoClinica);

            ctx.SaveChanges();
        }

        public void Deletar(int idClinica)
        {
            ctx.Clinicas.Remove(BuscarPorId(idClinica));

            ctx.SaveChanges();
        }

        public List<Clinica> Listar()
        {
            return ctx.Clinicas.ToList();
        }
    }
}

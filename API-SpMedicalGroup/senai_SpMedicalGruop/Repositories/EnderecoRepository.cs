using senai_SpMedicalGruop.Contexts;
using senai_SpMedicalGruop.Domains;
using senai_SpMedicalGruop.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Repositories
{
    public class EnderecoRepository : IEnderecoRepository
    {
        readonly SpMGContext ctx = new();
        public void Atualizar(int idEndereco, Endereco EnderecoAtualizado)
        {
            Endereco EnderecoBuscado = ctx.Enderecos.Find(idEndereco);

            if (EnderecoAtualizado.RuaAvenida != null && EnderecoAtualizado.Numero != null && EnderecoAtualizado.Cep != null)
            {
                EnderecoBuscado.RuaAvenida = EnderecoAtualizado.RuaAvenida;
                EnderecoBuscado.Numero = EnderecoAtualizado.Numero;
                EnderecoBuscado.Cep = EnderecoAtualizado.Cep;

                ctx.Enderecos.Update(EnderecoBuscado);

                ctx.SaveChanges();
            }

        }

        public Endereco BuscarPorId(int idEndereco)
        {
            return ctx.Enderecos.FirstOrDefault(e => e.IdEndereco == idEndereco);
        }

        public void Cadastrar(Endereco novoEndereco)
        {
            ctx.Enderecos.Add(novoEndereco);

            ctx.SaveChanges();
        }

        public void Deletar(int idEndereco)
        {
            ctx.Enderecos.Remove(BuscarPorId(idEndereco));

            ctx.SaveChanges();
        }

        public List<Endereco> Listar()
        {
            return ctx.Enderecos.ToList();
        }
    }
}

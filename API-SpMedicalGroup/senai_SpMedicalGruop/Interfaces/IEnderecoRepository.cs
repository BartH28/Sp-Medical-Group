using senai_SpMedicalGruop.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Interfaces
{
    interface IEnderecoRepository
    {
        List<Endereco> Listar();
        Endereco BuscarPorId(int idEndereco);
        void Cadastrar(Endereco idEndereco);
        void Atualizar(int idEndereco, Endereco EnderecoAtualizado);
        void Deletar(int idEndereco);
    }
}

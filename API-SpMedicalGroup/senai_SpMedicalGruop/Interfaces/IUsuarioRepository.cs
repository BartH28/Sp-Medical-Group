using Microsoft.AspNetCore.Http;
using senai_SpMedicalGruop.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Interfaces
{
    interface IUsuarioRepository
    {
        //METODO DE PARA FAZER LOGIN
        Usuario Login(string email, string senha);

        //CRUD
        List<Usuario> Listar();
        Usuario BuscarPorId(int idUsuario);
        void Cadastrar(Usuario novoUsuario);
        void Atualizar(int idUsuario, Usuario UsuarioAtualizado);
        void Deletar(int idUsuario);
        



        //METODOS FOTO DE PERFIL        
        void SalvarPerfilDir(IFormFile foto, int id_usuario);
        string ConsultarPerfilDir(int id_usuario);
    }
}

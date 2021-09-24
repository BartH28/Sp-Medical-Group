using Microsoft.AspNetCore.Http;
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
    public class UsuarioRepository : IUsuarioRepository
    {
        readonly SpMGContext ctx = new();
        public void Atualizar(int idUsuario, Usuario UsuarioAtualizado)
        {
            Usuario UsuarioBuscado = ctx.Usuarios.Find(idUsuario);

            if (UsuarioAtualizado.Nome != null)
            {
                UsuarioBuscado.Nome = UsuarioAtualizado.Nome;
                UsuarioBuscado.Email = UsuarioAtualizado.Email;
                UsuarioBuscado.Senha = UsuarioAtualizado.Senha;

                ctx.Usuarios.Update(UsuarioBuscado);

                ctx.SaveChanges();
            }
        }

        public Usuario BuscarPorId(int idUsuario)
        {
            return ctx.Usuarios.FirstOrDefault(e => e.IdUsuario == idUsuario);
        }

        public void Cadastrar(Usuario novoUsuario)
        {
            ctx.Usuarios.Add(novoUsuario);

            ctx.SaveChanges();
        }

        public string ConsultarPerfilDir(int id_usuario)
        {
            string nome_arquivo = id_usuario.ToString() + ".png";

            string caminho = Path.Combine("perfil", nome_arquivo);

            if (File.Exists(caminho))
            {
                byte[] bytes_arquivo = File.ReadAllBytes(caminho);

                return Convert.ToBase64String(bytes_arquivo);
            }

            return null;
        }

        public void Deletar(int idUsuario)
        {
            ctx.Usuarios.Remove(BuscarPorId(idUsuario));

            ctx.SaveChanges();
        }

        public List<Usuario> Listar()
        {
            return ctx.Usuarios.ToList();
        }

        public Usuario Login(string email, string senha)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == senha);
        }

        public void SalvarPerfilDir(IFormFile foto, int id_usuario)
        {
            string nome_arquivo = id_usuario.ToString() + ".png";

            using var stream = new FileStream(Path.Combine("perfil", nome_arquivo), FileMode.Create);

            foto.CopyTo(stream);
        }
    }
}

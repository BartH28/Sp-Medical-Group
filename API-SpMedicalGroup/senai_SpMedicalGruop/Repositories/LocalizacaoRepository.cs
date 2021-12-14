using MongoDB.Driver;
using senai_SpMedicalGruop.Domains;
using senai_SpMedicalGruop.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedicalGruop.Repositories
{
    public class LocalizacaoRepository : ILocalizacaoReposiroty
    {

        private readonly IMongoCollection<Localizacao> _localizacoes;

        public LocalizacaoRepository()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("SpMedical");
            _localizacoes = database.GetCollection<Localizacao>("Localizacao");
        }

        public void Cadastrar(Localizacao novaLocalizacao)
        {
            _localizacoes.InsertOne(novaLocalizacao);
        }

        public List<Localizacao> ListarTodos()
        {
           return  _localizacoes.Find(localizacao => true).ToList();
        }
    }
}

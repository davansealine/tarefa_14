/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
           }) 
     });


     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.body.usuarios[2].nome).to.equal('Aline Davanse')
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')

          })

     })


it('Deve cadastrar um usuário com sucesso', () => {
     let usuarios = `Aline Teste ${Math.floor(Math.random() * 100000000)}`,
      emails = `aline${Math.floor(Math.random() * 100000000)}@teste.com`
     cy.request({
          method: 'POST',
          url: 'usuarios',
          body: {
               "nome": usuarios,
               "email": emails,
               "password": "teste",
               "administrador": "true"
          }
     }).then((response) => {
          expect(response.status).to.equal(201)
          expect(response.body.message).to.equal('Cadastro realizado com sucesso')
     })

})


it('Deve validar um usuário com email inválido', () => {
     cy.cadastrarUsuario('Aline Davanse 35', 'alinetestesee@test.com', "teste")
          .then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal('Este email já está sendo usado')
          })

})


it('Deve editar um usuário previamente cadastrado', () => {
     let usuarios = `Aline Teste ${Math.floor(Math.random() * 100000000)}`,
     emails = `aline${Math.floor(Math.random() * 100000000)}@teste.com`
     cy.cadastrarUsuario(usuarios, emails, "teste")
          .then(response => {
               let id = response.body._id

               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body: {
                         "nome": usuarios,
                         "email": emails,
                         "password": "123",
                         "administrador": "true"
                    }
               }).then(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
               })

          })
});

it('Deve deletar um usuário previamente cadastrado', () => {
     let usuarios = `Aline Teste ${Math.floor(Math.random() * 100000000)}`
     cy.cadastrarUsuario(usuarios, 'alinetestesee90@test.com', "teste")
          .then(response => {
               let id = response.body._id
               cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`,
               }).then(response => {
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
                    expect(response.status).to.equal(200)
               })
          })
      });
     
     });

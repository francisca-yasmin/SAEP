from django.contrib import admin
from .models import Usuario, Produtos, Movimentacao

#registra todas as tabelas e os campos que foram criadas no models
admin.site.register(Usuario) #registrar no banco a tabela usuario
admin.site.register(Produtos) #regitra os produtos
admin.site.register(Movimentacao) #registra movimentacao que o produto vai ter


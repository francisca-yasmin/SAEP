from django.db import models
from django.contrib.auth.models import AbstractUser

#tabela de usuario
class Usuario(AbstractUser):
    nome = models.CharField(max_length=100)
    login = models.DateField(max_length=20, blank=True, null=True)
    senha = models.CharField(max_length=20)

    #campos obrigatorios para preencher
    REQUIRED_FIELDS = ['nome']

    def __str__(self):
        return self.nome

#tabela de produto
class Produtos(models.Model):
    id_produto = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=150)
    atual_produto = models.IntegerField()
    descricao = models.CharField(max_length=255)
    min_estoque = models.IntegerField()

    def __str__(self):
        return self.nome
    
# tabela de movimentação

class Movimentacao(models.Model):
    id_movimentacao = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario,on_delete=models.CASCADE)
    id_produto = models.ForeignKey(Produtos,on_delete=models.CASCADE)

    tipo_movimentacao = models.CharField(
        max_length=10,
        choices=[
            ("entrada", "Entrada"),
            ("saida", "Saída")
        ]
    )

    quantidade = models.IntegerField()
    data_movimentacao = models.DateTimeField()

    def __str__(self):
        return f"{self.tipo_movimentacao} - {self.quantidade}"


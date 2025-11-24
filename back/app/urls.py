from django.urls import path
from .views import (
    UsuarioListCreate, UsuarioRetrieveUpdateDestroy,
    ProdutosListCreate, ProdutosRetrieveUpdateDestroy,
    MovimentacaoRetrieveUpdateDestroy
)

urlpatterns = [
    # Usuários
    path('usuarios/', UsuarioListCreate.as_view(), name='usuarios-list-create'),
    path('usuarios/<int:pk>/', UsuarioRetrieveUpdateDestroy.as_view(), name='usuarios-detail'),

    # Produtos
    path('produtos/', ProdutosListCreate.as_view(), name='produtos-list-create'),
    path('produtos/<int:pk>/', ProdutosRetrieveUpdateDestroy.as_view(), name='produtos-detail'),

    # Movimentações
    path('movimentacoes/<int:pk>/', MovimentacaoRetrieveUpdateDestroy.as_view(), name='movimentacoes-detail'),
]

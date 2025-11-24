from django.urls import path
from .views import (
    UsuarioListCreate, UsuarioRetrieveUpdateDestroy,
    ProdutosListCreate, ProdutosRetrieveUpdateDestroy,
    MovimentacaoListCreate, LoginView
)

urlpatterns = [
    #login
    path('login/', LoginView.as_view()),

    # Usuários
    path('usuarios/', UsuarioListCreate.as_view()),
    path('usuarios/<int:pk>/', UsuarioRetrieveUpdateDestroy.as_view()),

    # Produtos
    path('produtos/', ProdutosListCreate.as_view()),
    path('produtos/<int:pk>/', ProdutosRetrieveUpdateDestroy.as_view()),

    # Movimentações
    path('movimentacoes/<int:pk>/', MovimentacaoListCreate.as_view()),
]

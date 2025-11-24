from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Usuario, Produtos, Movimentacao
from .serializers import UsuarioSerializer, ProdutosSerializer, MovimentacaoSerializer, LoginSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

# CRUD -> Usuario 
class UsuarioListCreate(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({
            'mensagem': 'Usuário atualizado com sucesso!',
            'dados': response.data
        }, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({
            'mensagem': 'Usuário deletado com sucesso!'
        }, status=status.HTTP_204_NO_CONTENT)


# LISTAR e CRIAR produtos
class ProdutosListCreate(ListCreateAPIView):
    queryset = Produtos.objects.all()
    serializer_class = ProdutosSerializer
    permission_classes = [IsAuthenticated]


# CONSULTAR, ATUALIZAR e EXCLUIR produto
class ProdutosRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Produtos.objects.all()
    serializer_class = ProdutosSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Produto excluído com sucesso."},
                        status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({
            'mensagem': 'Produto atualizado com sucesso!',
            'dados': response.data
        }, status=status.HTTP_200_OK)


# listar os dados de movimentação
class MovimentacaoListCreate(ListCreateAPIView):
    queryset = Movimentacao.objects.all()
    serializer_class = MovimentacaoSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

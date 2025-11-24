from rest_framework import serializers
from .models import Usuario, Produtos, Movimentacao
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class ProdutosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produtos
        fields = '__all__'
        
class MovimentacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movimentacao
        fields = '__all__'
    
#login para autenticar o usuário
class LoginSerializer(TokenObtainPairSerializer):
    login = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        # converte "login" → "username" 
        attrs['username'] = attrs.get('login')

        data = super().validate(attrs)

        data['user'] = {
            'id': self.user.id,
            'login': self.user.login,
            'nome': self.user.nome,
        }

        return data

    

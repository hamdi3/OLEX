from rest_framework import serializers
from .models import Website_User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Website_User
        fields = ('id', 'first_name', 'last_name', 'email', 'address', 'username', 'password', 'seller')

    def create(self, validated_data):
        user = Website_User.objects.create_user(**validated_data)
        return user
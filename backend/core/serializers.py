from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ('username','password','full_name')

    def create(self, validated):
        user = User(username=validated['username'], full_name=validated.get('full_name',''))
        user.set_password(validated['password'])
        user.save()
        return user

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Website_User
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.decorators import api_view


class UserRegistrationView(generics.CreateAPIView):
    queryset = Website_User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        """
        Handle user registration.

        This view allows a new user to register with the system.

        Parameters:
        - first_name
        - last_name
        - email
        - username
        - password

        Returns:
        - 201 Created: User registered successfully.
        - 400 Bad Request: Invalid input data.
        """
        try:
            response = super().post(request, *args, **kwargs)
            return Response(f"User {response.data['username']} created successfully", status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(TokenObtainPairView, generics.CreateAPIView):
    queryset = Website_User.objects.all()

    def post(self, request, *args, **kwargs):
        """
        Handle user login and generate access and refresh tokens.

        This view allows a registered user to log in to the system.

        Parameters:
        - username
        - password

        Returns:
        - 200 OK: User logged in successfully with access and refresh tokens.
        - 401 Unauthorized: Invalid credentials.
        """
        token_response = super().post(request, *args, **kwargs)
        try:
            data = request.data
            user = Website_User.objects.filter(
                username=data['username']).first()
            print("test")
            data = {
                "access_token": str(token_response.data['access']),
                "refresh_token": str(token_response.data['refresh']),
                "user_access": {
                    "user_id": user.id,
                    "joined_date": user.date_joined,
                    "seller": user.seller
                }
            }

            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)


class CustomTokenRefreshView(TokenRefreshView):
    """
    Custom TokenRefreshView to include additional user information in the response.

    This view extends the TokenRefreshView from the SimpleJWT library
    and customizes it to include additional user information in the response.
    """

    def post(self, request, *args, **kwargs):
        """
        Handle token refresh request.

        This method overrides the post method of the parent class to include
        additional user information in the response.

        Parameters:
            - request: The incoming HTTP request.
            - args: Additional positional arguments.
            - kwargs: Additional keyword arguments.

        Returns:
            - Response: The HTTP response with the refreshed access token and additional user information.
        """
        try:
            response = super().post(request, *args, **kwargs)

            response.data['access_token'] = response.data['access']
            return response

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
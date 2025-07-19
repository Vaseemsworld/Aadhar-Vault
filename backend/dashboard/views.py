from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def stats(request):
    return Response({
        "total_assign": 281,
        "total_complete": 115,
        "total_pending": 36,
        "total_reject": 130,
        "username": request.user.full_name or request.user.username,
    })

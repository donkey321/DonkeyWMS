from django.shortcuts import render
from rest_framework import views
from .models import GoodsCategory
from .serializers import GoodsCategorySerializer
from django.http import JsonResponse
# Create your views here.

# class GoodsCategoryList(View):
#     def get(self, request):
#         gcs = GoodsCategory.objects.all()
#         print(gcs)
#         ser_obj = GoodsCategorySerializer(instance=gcs, many=True)
#         print(ser_obj)
#         return JsonResponse(ser_obj.data, status=200)

class GoodsCategoryView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTTokenUserAuthentication]

    def get(self, request, *args, **kwargs):
        return Response({'txt': "Get information successfully!"})
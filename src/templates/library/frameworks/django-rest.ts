import { Template } from "../../types.js";

export const djangoRestTemplate: Template = {
  id: "django-rest-framework",
  name: "Django REST Framework",
  description: "Django REST Framework best practices for building APIs",
  category: "framework",
  tags: ["python", "django", "rest", "api", "backend"],
  author: "awesome-cursorrules community",
  sourceUrl: "https://github.com/PatrickJS/awesome-cursorrules",
  content: {
    mainRules: `# Django REST Framework Project

## Tech Stack
- Python 3.10+
- Django 4+
- Django REST Framework
- PostgreSQL

## Code Philosophy
- MVT architecture
- Class-based views
- Serializers for validation
- ViewSets for CRUD
`,
    codeStyleRules: `# Django REST Code Style

## Serializer Pattern
\`\`\`python
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        read_only_fields = ['id']
\`\`\`

## ViewSet Pattern
\`\`\`python
from rest_framework import viewsets

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
\`\`\`

## Custom Actions
\`\`\`python
@action(detail=True, methods=['post'])
def set_password(self, request, pk=None):
    user = self.get_object()
    serializer = PasswordSerializer(data=request.data)
    if serializer.is_valid():
        user.set_password(serializer.data['password'])
        user.save()
        return Response({'status': 'password set'})
    return Response(serializer.errors, status=400)
\`\`\`
`,
  },
};

export default djangoRestTemplate;


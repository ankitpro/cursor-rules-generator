import { Template } from "../../types.js";

export const fastapiAsyncTemplate: Template = {
  id: "fastapi-async",
  name: "Python FastAPI",
  description: "Modern async Python API development with FastAPI and type hints",
  category: "framework",
  tags: ["python", "fastapi", "async", "api", "backend"],
  author: "awesome-cursorrules community",
  sourceUrl: "https://github.com/PatrickJS/awesome-cursorrules",
  content: {
    mainRules: `# FastAPI Python Project

## Tech Stack
- Python 3.10+
- FastAPI for async APIs
- Pydantic for validation
- SQLAlchemy for ORM

## Code Philosophy
- Async/await for I/O operations
- Type hints everywhere
- Dependency injection
- Automatic API documentation
`,
    
    codeStyleRules: `# FastAPI Code Style

## API Endpoint Pattern
\`\`\`python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel

app = FastAPI()

class UserCreate(BaseModel):
    name: str
    email: str

@app.post("/users", response_model=User)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """Create a new user."""
    db_user = User(**user.dict())
    db.add(db_user)
    await db.commit()
    return db_user
\`\`\`

## Type Hints
- Always use type hints for function parameters and return types
- Use Pydantic models for request/response validation
- Use Optional for nullable fields

## Async Patterns
\`\`\`python
async def get_user(user_id: int) -> User:
    async with httpx.AsyncClient() as client:
        response = await client.get(f"/users/{user_id}")
        return User(**response.json())
\`\`\`

## Dependency Injection
\`\`\`python
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    user = await get_user_by_token(token, db)
    if not user:
        raise HTTPException(status_code=401)
    return user
\`\`\`

## Error Handling
\`\`\`python
@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError):
    return JSONResponse(
        status_code=400,
        content={"detail": str(exc)}
    )
\`\`\`

## Naming Conventions
- Functions: snake_case
- Classes: PascalCase
- Constants: UPPER_SNAKE_CASE
- API routes: kebab-case (/api/user-profile)
`,
    
    testingRules: `# FastAPI Testing

\`\`\`python
from fastapi.testclient import TestClient
import pytest

def test_create_user():
    with TestClient(app) as client:
        response = client.post(
            "/users",
            json={"name": "Test", "email": "test@example.com"}
        )
        assert response.status_code == 200
        assert response.json()["name"] == "Test"

@pytest.mark.asyncio
async def test_async_endpoint():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/users/1")
        assert response.status_code == 200
\`\`\`
`,
  },
};

export default fastapiAsyncTemplate;


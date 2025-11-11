import { Template } from "../../types.js";

export const pythonBestPracticesTemplate: Template = {
  id: "python-best-practices",
  name: "Python Best Practices",
  description: "Python development following PEP 8, type hints, and modern patterns",
  category: "language",
  tags: ["python", "pep8", "type-hints", "best-practices"],
  author: "awesome-cursorrules community",
  sourceUrl: "https://github.com/PatrickJS/awesome-cursorrules",
  content: {
    mainRules: `# Python Best Practices

## Code Philosophy
- PEP 8 compliance
- Type hints for all functions
- Comprehensive docstrings
- Pythonic patterns

## Standards
- Python 3.10+
- Type checking with mypy
- Linting with ruff/pylint
- Formatting with black
`,
    codeStyleRules: `# Python Code Style

## Function Patterns
\`\`\`python
from typing import Optional, List, Dict

def process_users(
    users: List[Dict[str, str]],
    filter_active: bool = True,
    limit: Optional[int] = None
) -> List[Dict[str, str]]:
    """
    Process and filter user list.
    
    Args:
        users: List of user dictionaries
        filter_active: Whether to filter for active users only
        limit: Maximum number of users to return
    
    Returns:
        Filtered list of users
    
    Raises:
        ValueError: If users list is empty
    """
    if not users:
        raise ValueError("Users list cannot be empty")
    
    result = [u for u in users if not filter_active or u.get('active')]
    return result[:limit] if limit else result
\`\`\`

## Class Patterns
\`\`\`python
from dataclasses import dataclass
from typing import ClassVar

@dataclass
class User:
    name: str
    email: str
    age: int
    active: bool = True
    
    MAX_AGE: ClassVar[int] = 150
    
    def __post_init__(self) -> None:
        if self.age > self.MAX_AGE:
            raise ValueError(f"Age cannot exceed {self.MAX_AGE}")
    
    @property
    def display_name(self) -> str:
        return f"{self.name} ({self.email})"
\`\`\`

## Error Handling
\`\`\`python
class ValidationError(Exception):
    """Raised when validation fails."""
    pass

def validate_email(email: str) -> None:
    if '@' not in email:
        raise ValidationError(f"Invalid email: {email}")
\`\`\`

## Context Managers
\`\`\`python
from contextlib import contextmanager
from typing import Generator

@contextmanager
def database_connection(url: str) -> Generator[Connection, None, None]:
    conn = connect(url)
    try:
        yield conn
    finally:
        conn.close()
\`\`\`
`,
  },
};

export default pythonBestPracticesTemplate;


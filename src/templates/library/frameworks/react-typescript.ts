import { Template } from "../../types.js";

export const reactTypescriptTemplate: Template = {
  id: "react-typescript-tailwind",
  name: "React + TypeScript + Tailwind CSS",
  description: "Modern React development with TypeScript strict mode and Tailwind CSS best practices",
  category: "framework",
  tags: ["react", "typescript", "tailwind", "frontend", "spa"],
  author: "awesome-cursorrules community",
  sourceUrl: "https://github.com/PatrickJS/awesome-cursorrules",
  content: {
    mainRules: `# React + TypeScript + Tailwind CSS Project

## Tech Stack
- React 18+ with TypeScript
- Tailwind CSS for styling
- Modern ES6+ patterns

## Code Philosophy
- Component composition over inheritance
- TypeScript strict mode enabled
- Functional components with hooks
- Prop drilling minimization
`,
    
    codeStyleRules: `# React + TypeScript Code Style

## Component Structure

### File Organization
\`\`\`
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── ...
├── hooks/
├── utils/
└── types/
\`\`\`

### Component Pattern
\`\`\`typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  children
}) => {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

## TypeScript Patterns

### Strict Typing
- Always define prop interfaces
- Use \`React.FC<Props>\` or explicit return types
- Avoid \`any\` type
- Use \`unknown\` for uncertain types

### Event Handlers
\`\`\`typescript
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // Handle click
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};
\`\`\`

## Tailwind CSS Best Practices

### Class Organization
1. Layout (flex, grid, position)
2. Spacing (margin, padding)
3. Sizing (width, height)
4. Typography
5. Colors
6. Effects

### Example
\`\`\`tsx
<div className="flex items-center gap-4 p-4 w-full text-lg text-gray-900 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
  {/* Content */}
</div>
\`\`\`

### Custom Classes
Use @apply sparingly, prefer composition:
\`\`\`typescript
const buttonStyles = {
  base: "px-4 py-2 rounded font-medium transition-colors",
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300"
};
\`\`\`

## Hooks Best Practices

### Custom Hooks
\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
\`\`\`

### Hook Rules
- Always prefix with "use"
- Keep hooks at top level
- Dependencies array must be complete
- Use ESLint plugin for hooks

## State Management

### Local State
Use \`useState\` for component-local state

### Shared State
- Props drilling for 2-3 levels
- Context API for theme, auth
- Consider Zustand/Jotai for complex state

## Performance

### Memoization
\`\`\`typescript
const MemoizedComponent = React.memo(MyComponent);

const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
\`\`\`

### Code Splitting
\`\`\`typescript
const LazyComponent = lazy(() => import('./LazyComponent'));

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
\`\`\`

## Naming Conventions

- Components: PascalCase (Button.tsx)
- Hooks: camelCase with "use" prefix (useAuth.ts)
- Utils: camelCase (formatDate.ts)
- Types: PascalCase (UserProfile.ts)
- Props interfaces: PascalCase with "Props" suffix
`,
    
    testingRules: `# React Testing

## Testing Strategy

### Component Tests
\`\`\`typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
\`\`\`

### Hook Tests
\`\`\`typescript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
\`\`\`

## Testing Principles

- Test behavior, not implementation
- Use data-testid sparingly
- Prefer accessible queries (getByRole, getByLabelText)
- Mock external dependencies
- Keep tests isolated
`,
    
    securityRules: `# React Security

## Input Sanitization
- Never use dangerouslySetInnerHTML unless absolutely necessary
- Sanitize user input with DOMPurify
- Validate props with TypeScript

## XSS Prevention
- React escapes JSX content by default
- Be careful with dangerouslySetInnerHTML
- Validate URLs before using in hrefs

## Dependency Security
- Run \`npm audit\` regularly
- Keep dependencies updated
- Use dependabot for automated updates
`,
  },
};

export default reactTypescriptTemplate;


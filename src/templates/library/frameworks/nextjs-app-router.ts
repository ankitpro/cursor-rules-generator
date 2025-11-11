import { Template } from "../../types.js";

export const nextjsAppRouterTemplate: Template = {
  id: "nextjs-app-router",
  name: "Next.js 14+ App Router",
  description: "Next.js with App Router, Server Components, and modern patterns",
  category: "framework",
  tags: ["nextjs", "react", "typescript", "ssr", "app-router"],
  author: "awesome-cursorrules community",
  sourceUrl: "https://github.com/PatrickJS/awesome-cursorrules",
  content: {
    mainRules: `# Next.js 14+ App Router Project

## Tech Stack
- Next.js 14+ with App Router
- React Server Components
- TypeScript
- Server Actions

## Code Philosophy
- Server-first by default
- Client components only when needed
- Leverage streaming and suspense
- Type-safe data fetching
`,
    
    codeStyleRules: `# Next.js App Router Code Style

## Directory Structure
\`\`\`
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── layout.tsx
├── (dashboard)/
│   ├── page.tsx
│   └── layout.tsx
├── api/
│   └── route.ts
├── layout.tsx
└── page.tsx
\`\`\`

## Server Components (Default)
\`\`\`typescript
// app/page.tsx
import { getUsers } from '@/lib/db';

export default async function HomePage() {
  const users = await getUsers();
  
  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
\`\`\`

## Client Components
\`\`\`typescript
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

## Server Actions
\`\`\`typescript
'use server';

import { revalidatePath } from 'next/cache';

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  
  await db.user.create({ data: { name } });
  
  revalidatePath('/users');
  return { success: true };
}
\`\`\`

## Data Fetching

### Parallel Fetching
\`\`\`typescript
async function getPageData() {
  const [users, posts] = await Promise.all([
    fetchUsers(),
    fetchPosts()
  ]);
  
  return { users, posts };
}
\`\`\`

### Sequential Fetching
\`\`\`typescript
async function getPageData() {
  const user = await fetchUser();
  const posts = await fetchPostsByUser(user.id); // Depends on user
  
  return { user, posts };
}
\`\`\`

## Loading States
\`\`\`typescript
// app/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
\`\`\`

## Error Handling
\`\`\`typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
\`\`\`

## Metadata
\`\`\`typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'Page description',
    images: ['/og-image.png'],
  },
};
\`\`\`

## Route Handlers
\`\`\`typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await createUser(body);
  return NextResponse.json(user);
}
\`\`\`

## Best Practices

1. **Use Server Components by default**
2. **Client Components only for:**
   - Event handlers
   - Browser APIs
   - State/Effects
   - Custom hooks

3. **Colocate data fetching** with components
4. **Use Suspense boundaries** for loading states
5. **Leverage streaming** for better UX
6. **Cache strategically** with revalidation
`,
    
    architectureRules: `# Next.js Architecture

## Component Organization

\`\`\`
src/
├── app/                    # App Router pages
│   ├── (marketing)/       # Route groups
│   ├── (app)/
│   └── api/
├── components/
│   ├── ui/                # Reusable UI components
│   ├── forms/             # Form components
│   └── layouts/           # Layout components
├── lib/                   # Utilities
│   ├── db.ts              # Database client
│   ├── auth.ts            # Auth utilities
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript types
\`\`\`

## Rendering Strategies

- **Static Generation**: Default for all pages
- **Dynamic Rendering**: When using dynamic functions
- **Streaming**: For instant page load
- **ISR**: For periodic updates

## Caching

\`\`\`typescript
// Revalidate every hour
export const revalidate = 3600;

// Force dynamic
export const dynamic = 'force-dynamic';

// Opt out of caching
fetch('...', { cache: 'no-store' });

// Revalidate on-demand
revalidatePath('/posts');
revalidateTag('posts');
\`\`\`
`,
  },
};

export default nextjsAppRouterTemplate;


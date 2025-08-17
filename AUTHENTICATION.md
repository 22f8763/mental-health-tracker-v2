# Authentication Setup

This project uses NextAuth.js with Prisma for authentication. It supports:
- Email/Password (via credentials)
- Google OAuth
- GitHub OAuth

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mental_health?schema=public"

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret
```

## Authentication Flow

1. User signs in using one of the available providers
2. NextAuth creates/updates the user in the database using Prisma
3. A session is created and stored in an HTTP-only cookie
4. The session is used to authenticate API routes and server components

## Protected Routes

Use the `getServerSession` function to protect server-side routes:

```typescript
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return { redirect: { destination: "/login" } };
  }
  
  return <div>Protected Content</div>;
}
```

## Client-Side Authentication

Use the `useSession` hook to access the session in client components:

```typescript
'use client';

import { useSession } from "next-auth/react";

export default function ClientComponent() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    return <div>Please sign in</div>;
  }
  
  return <div>Welcome {session.user.name}!</div>;
}
```

## Customizing the User Model

To add custom fields to the User model, update the Prisma schema and extend the NextAuth types in `types/next-auth.d.ts`.

## Middleware

The application uses Next.js middleware to protect routes. Public routes are defined in `middleware.ts`.

## Session Management

- Sessions are stateless JWT tokens stored in HTTP-only cookies
- The session is automatically refreshed when it expires
- Users are automatically redirected to the login page when their session expires

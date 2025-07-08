import { NextResponse } from 'next/server'; 
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if maintenance mode is enabled via environment variable
    const maintenanceMode = process.env.MAINTENANCE_MODE === 'true';

    // Allow access to the maintenance page itself
    if (request.nextUrl.pathname.startsWith('/maintenance')) {
        return NextResponse.next();
    }

    // Redirect all requests to maintenance page if enabled
    if (maintenanceMode) {
        return NextResponse.rewrite(new URL('/maintenance', request.url));
    }

    // Otherwise, proceed normally
    return NextResponse.next();
}

// Apply middleware to all routes except API, static files, and images
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
export { default } from 'next-auth/middleware';

// Protect routes
export const config = {
    matcher: [
        '/products/new',
        '/products/edit/:id+',
        '/orders',
        '/orders/:id+'
    ]
}
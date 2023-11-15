import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import type { Metadata } from 'next';
import NavBar from './NavBar';
import { Container, Theme } from '@radix-ui/themes';
import AuthProvider from './auth/Provider';
import { Toaster } from 'react-hot-toast';
import AppThemeProvider from './theme/AppThemeProvider';

export const metadata: Metadata = {
  title: 'Tech Shop',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en" className="dark">
      <body>
        <AuthProvider>
          <AppThemeProvider>
            <Theme accentColor="indigo">
              <NavBar />
              <main className='px-5 py-20 h-[500px] mt-4 md:mt-12'>
                <Container className='pb-5'>
                  {children}
                  <Toaster position="bottom-right" reverseOrder={true} 
                    toastOptions={{
                      success: { style: { color: 'green' } },
                      error: { style: { color: 'red' } },
                    }}
                  />
                </Container>
              </main>
            </Theme>   
          </AppThemeProvider>    
        </AuthProvider>
      </body>
    </html>
  )
}

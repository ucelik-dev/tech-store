'use client'

import { ThemeProvider, useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function AppThemeProvider({children}: {children: React.ReactNode}) {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => { setMounted(true) }, []);

    if(!mounted) { return <>{children}</> }
    
    return <ThemeProvider
    disableTransitionOnChange
    attribute="class"
    value={{ light: "light", dark: "dark" }}
    defaultTheme="system"
  >{children}</ThemeProvider>
}

'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes';
import { MdModeNight, MdLightMode } from 'react-icons/md'

const AppThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => { setMounted(true) }, []);

    if(!mounted) { return null }

    return (
        <div>
            {theme === 'dark' && <button onClick={() => setTheme("light")} className='border rounded-full p-1 bg-white text-black'><MdLightMode/></button>}
            {(theme === 'light' || theme === 'system') && <button onClick={() => setTheme("dark")} className='border rounded-full p-1 bg-black text-white'><MdModeNight/></button>}
        </div>
    )
}

export default AppThemeSwitcher;
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { IoMoonOutline } from 'react-icons/io5';
import { BiSun } from 'react-icons/bi';
import useLocalStorage from '../utils/useLocalStorage';

const themeType = {
  dark: 'dark',
  light: 'light',
}

const Header = () => {
  const [theme, setTheme] = useLocalStorage('theme', themeType.light)

  const toggleThemeMode = () => setTheme(prevValue => {
    return prevValue === themeType.light ? themeType.dark : themeType.light
  })

  useEffect(() => {
    if (theme === themeType.dark) {
      document.documentElement.classList.add('dark');
    } else if (theme === themeType.light) {
      document.documentElement.classList.remove('dark');
    }
  }, [theme])

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [])

  const themeName = theme === themeType.dark ? 'dark mode' : 'light mode'

  return (
    <header className="w-full h-20 bg-white px-6 drop-shadow-md dark:bg-darkBlue transition-colors">
      {/*  */}
      <div className='w-full h-full flex items-center justify-between md:max-w-7xl md:mx-auto'>
        <Link to="/" className="text-veryDarkBlueLMT font-extrabold text-base dark:text-white transition-colors">Where in the world?</Link>
        <div className="flex items-center justify-center gap-3">
          <button onClick={toggleThemeMode} className='text-veryDarkBlueLMT font-bold h-5 w-5 active:scale-95 transition-all dark:text-white'>
            {theme === themeType.dark
              ? <BiSun className='w-full h-full animate-spin-slow' />
              : <IoMoonOutline className='w-full h-full'
              />
            }
          </button>
          <h3 className='font-normal text-veryDarkBlueLMT capitalize dark:text-white transition-colors'>{themeName}</h3>
        </div>
      </div>
    </header>
  )
}

export default Header
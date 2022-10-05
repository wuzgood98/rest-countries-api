import React, { useState } from 'react';
import { IoMdSearch, IoIosArrowDown } from 'react-icons/io';
import axios from 'axios';

const Filter = ({ handleChange, region, setRegion, searchTerm, setCountries }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const regionSet = ['Filter by Region', 'Africa', 'Americas', 'Antarctic', 'Asia', 'Europe', 'Oceania']

  const handleClick = () => setMenuOpen(prevState => !prevState)

  const handleSubmit = (e) => e.preventDefault();

  const setNewRegion = (region) => {
    setMenuOpen(false);
    setRegion(region);
    if (region === 'Filter by Region') {
      axios.get('https://restcountries.com/v3.1/all')
        .then((result) => setCountries(result.data))
        .catch((error) => console.log(error))
    } else {
      fetchCountriesByRegion(region)
    }
  }

  const fetchCountriesByRegion = async (region) => {
    try {
      const result = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
      setCountries(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full flex flex-col gap-10 sm:flex-row sm:justify-between md:max-w-7xl md:mx-auto">
      <form onSubmit={handleSubmit} className='relative w-full h-14 bg-white flex items-center gap-4 px-5 drop-shadow-md rounded-md sm:w-[400px] dark:bg-darkBlue transition-colors'>
        <IoMdSearch className='h-6 w-6 text-darkGray dark:text-white transition-colors' />
        <input
          onChange={handleChange}
          value={searchTerm}
          autoComplete='off'
          type="text"
          name="search"
          id="search"
          placeholder='Search for a country...'
          className='h-full w-full flex-1 text-darkGray font-light placeholder-darkGray bg-white rounded-md focus-within:outline-none focus:outline-none indent-px caret-darkGray dark:placeholder-white dark:caret-white dark:bg-darkBlue dark:text-white transition-colors'
        />
      </form>

      <div className="relative w-52">
        <button onClick={handleClick} className="w-full px-6 py-4 text-base font-light rounded-md bg-white drop-shadow-md flex items-center justify-between dark:bg-darkBlue transition-colors dark:text-white">
          <span className="text-base">{region || 'Filter by Region'}</span>
          <span className="text-darkGray text-base w-5 h-5 grid place-content-center dark:text-white transition-colors">
            <IoIosArrowDown className={`${menuOpen && '-rotate-180 text-veryDarkBlueLMT dark:text-offWhite'} transition-all duration-500`} />
          </span>
        </button>

        <ul className={`z-10 absolute mt-2  w-full h-max rounded-md bg-white drop-shadow-md origin-top transition-transform ${menuOpen ? 'scale-y-100' : 'scale-y-0'} dark:bg-darkBlue`}>
          {regionSet && regionSet.map((item, i) => (
            <li
              onClick={() => setNewRegion(item)}
              key={item}
              className="cursor-pointer select-none px-6 py-2 hover:bg-gray-200 transition-colors first:rounded-t-md last:rounded-b-md dark:text-white dark:hover:bg-white/5"
            >
              {item}
            </li>
          ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Filter
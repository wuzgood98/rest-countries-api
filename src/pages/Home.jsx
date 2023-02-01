import React, { useEffect, useState } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import Countries from '../components/Countries';
import Filter from '../components/Filter';
import axios from 'axios';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [scrollY, setScrollY] = useState(0)
  const [isHeaderInView, setIsHeaderInView] = useState(true)


  const fetchAllCountries = async () => {
    setLoading(true)
    try {
      const result = await axios.get('https://restcountries.com/v3.1/all')
      setCountries(result.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    filterBySearchTerm(searchTerm)
  }

  const filterBySearchTerm = (searchTerm) => {
    if (!searchTerm) return;

    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().trim().includes(searchTerm.trim().toLowerCase())
    )
    setFilteredCountries(filteredCountries)
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollY(window.scrollY)
    })

    if (scrollY > 80) {
      setIsHeaderInView(false)
    } else {
      setIsHeaderInView(true)
    }
  }, [scrollY])

  useEffect(() => {
    let unsubscribed = false
    
    if(!unsubscribed) {
      fetchAllCountries()
    }
    
    return () => {
      unsubscribed = true
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <main className='w-full h-full px-6 py-6'>
      <Filter
        handleChange={handleChange}
        setRegion={setRegion}
        region={region}
        searchTerm={searchTerm}
        setCountries={setCountries}
      />

      {searchTerm ?
        (<Countries countries={filteredCountries} />) :
        (<Countries loading={loading} countries={countries} />)
      }

      <button onClick={scrollToTop} className={`fixed bottom-2 right-2 grid place-content-center bg-offWhite text-darkBlue h-12 w-12 rounded-full drop-shadow-2xl hover:scale-105 active:scale-95 transition-all dark:bg-gray-600 dark:text-white group ${isHeaderInView ? '-z-10 opacity-0' : 'z-10 opacity-100'}`}>
        <AiOutlineArrowUp />
      </button>
    </main>
  )
}

export default Home
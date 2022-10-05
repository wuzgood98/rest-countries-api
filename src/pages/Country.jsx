import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import axios from 'axios';

import Loading from '../components/Loading';

const Country = () => {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState([]);
  const [countries, setCountries] = useState([]);



  const { name } = useParams();

  const formattedPopulation = country?.population ? country.population.toLocaleString('en-US') : undefined;

  const lastItem = country?.name?.nativeName && Object.values(country?.name?.nativeName).length > 1 ? Object.values(country?.name?.nativeName).length - 1 : 0

  const nativeNames = country?.name?.nativeName
    ? Object.values(country?.name?.nativeName)[lastItem].common
    : undefined;

  const currencies = country.currencies
    ? Object.values(country.currencies)[0].name
    : undefined;

  const languages = country.languages
    ? Object.values(country.languages).map((language) => ' ' + language).join(',')
    : undefined;

  const getBorderCountries = () => {
    if (country.borders) {
      return country.borders.map((border) => border)
    }
    return undefined
  }

  const fetchCountryByName = async (name) => {
    setLoading(true)
    try {
      const result = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
      setCountry(result.data[0])
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const fetchAllCountries = async () => {
    try {
      const result = await axios.get('https://restcountries.com/v3.1/all')
      setCountries(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const border = getBorderCountries();
  const borderCountries = countries && countries.filter((country) => border && border.includes(country.cca3))

  useEffect(() => {
    fetchAllCountries()
  }, [])

  useEffect(() => {
    const countryName = name.split('-').join(' ');
    fetchCountryByName(countryName);
  }, [name])

  return (
    <section className='w-full h-full px-7 py-4'>
      <div className="w-full h-full md:max-w-7xl md:mx-auto">
        <Link to='/' className='w-max px-6 py-2 bg-white mt-6 drop-shadow-md flex items-center justify-center gap-2 group dark:bg-darkBlue dark:text-white'>
          <span>
            <BsArrowLeft
              className='group-hover:-translate-x-1 translate-x-0 transition-transform'
              style={{ strokeWidth: 1 }}
            />
          </span>
          <span>Back</span>
        </Link>

        {
          loading
            ? <Loading />
            : (
              <div className="flex flex-col gap-12 w-full mt-16 mb-12 lg:flex-row md:gap-20">
                <img src={country?.flags?.png} alt={`flag of ${country?.name?.common}`} className="w-full h-auto drop-shadow-md md:w-[600px] lg:w-1/2" />

                <div className="flex flex-col gap-8 w-full md:w-[650px] lg:w-1/2 lg:self-center">
                  <h1 className="text-veryDarkBlueLMT font-extra-bold text-4xl dark:text-white">{country?.name?.common}</h1>
                  <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
                    <div className='flex flex-col gap-3'>
                      <p className="text-base sm:text-lg font-semibold text-veryDarkBlueLMT dark:text-white">Native name: <span className="font-light text-base sm:text-lg dark:text-white/70">{nativeNames}</span></p>
                      <p className="text-base sm:text-lg font-semibold text-veryDarkBlueLMT dark:text-white">Population: <span className="font-light text-base sm:text-lg dark:text-white/70">{formattedPopulation}</span></p>
                      <p className="text-base sm:text-lg font-semibold text-veryDarkBlueLMT dark:text-white">Region: <span className="font-light text-base sm:text-lg dark:text-white/70">{country?.region}</span></p>
                      <p className="text-base sm:text-lg font-semibold text-veryDarkBlueLMT dark:text-white">Sub Region: <span className="font-light text-base sm:text-lg dark:text-white/70">{country?.subregion}</span></p>
                      <p className="text-base sm:text-lg font-semibold text-veryDarkBlueLMT dark:text-white">Capital: <span className="font-light text-base sm:text-lg dark:text-white/70">{country?.capital}</span></p>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <p className="text-base sm:text-lg font-semibold text-veryDarkBlueLMT dark:text-white">Top Level Domain: <span className="font-light text-base sm:text-lg dark:text-white/70">{country?.tld}</span></p>
                      <p className="text-base sm:text-lg font-semibold text-veryDarkBlueLMT dark:text-white">Currencies: <span className="font-light text-base sm:text-lg dark:text-white/70">{currencies}</span></p>
                      <p className="text-base sm:text-lg font-semibold text-veryDarkBlueLMT dark:text-white">Languages: <span className="font-light text-base sm:text-lg dark:text-white/70">{languages}</span></p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-3 md:flex-row'>
                    <h1 className="text-lg font-semibold text-veryDarkBlueLMT dark:text-white">Border Countries: </h1>
                    <div className="flex items-center flex-wrap gap-2">
                      {borderCountries && borderCountries.map((country, i) => {
                        const countryName = country?.name.common.toLowerCase().split('').join('-')
                        return (
                          <Link
                            key={i}
                            to={`/country-details/${countryName}`}
                            state={country}
                            className="w-max px-6 py-1 bg-white drop-shadow-md flex items-center justify-center gap-2 group dark:bg-darkBlue dark:text-white"
                          >
                            {country?.name.common}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
        }
      </div>
    </section>
  )
}

export default Country
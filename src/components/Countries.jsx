import React from 'react';
import Loading from './Loading';

import CountryCard from './CountryCard';

const Countries = ({ countries, loading }) => {
  return (
    <div className='flex flex-wrap w-full h-full px-4 gap-16 mt-5 py-5 sm:px-0 md:max-w-7xl md:mx-auto overflow-hidden'>
      {
        loading
          ? <Loading />
          : countries && countries.map((country, i) => {
            const { name: { common }, region, capital, area, population, flags: { png: flag } } = country
            const formattedPopulation = population.toLocaleString('en-US')

            return (
              <CountryCard
                key={area + population}
                name={common}
                region={region}
                capital={capital}
                countryId={area}
                flag={flag}
                population={formattedPopulation}
              />
            )
          })
      }
    </div>
  )
}

export default Countries
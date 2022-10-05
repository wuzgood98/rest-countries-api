import { Link } from "react-router-dom";

const CountryCard = ({ population, region, capital, name, flag }) => {
  const countryName = name.toLowerCase().split(' ').join('-')
  return (
    <Link to={`/country-details/${countryName}`} className="w-[271px] flex-grow h-max cursor-pointer drop-shadow-md translate-y-0 hover:drop-shadow-xl hover:-translate-y-1 transition-all">
      <div className='relative overflow-hidden w-full h-[150px] rounded-t-md'>
        <img src={flag || 'https://flagcdn.com/w320/to.png'} alt={`flag of ${name}`} className='w-full h-full rounded-t-md' />
      </div>
      <div className="px-4 pt-6 pb-8 bg-white flex flex-col gap-4 w-full rounded-b-md dark:bg-darkBlue">
        <h4 className='text-base text-veryDarkBlueLMT font-extrabold truncate dark:text-white'>{name || 'Tonga'}</h4>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-veryDarkBlueLMT dark:text-white">Population: <span className="text-sm font-normal">{population || '105,697'}</span></p>
          <p className="text-sm font-bold text-veryDarkBlueLMT dark:text-white">Region: <span className="text-sm font-normal">{region || 'Oceania'}</span></p>
          <p className="text-sm font-bold text-veryDarkBlueLMT dark:text-white">Capital: <span className="text-sm font-normal">{capital || "Nuku'alofa"}</span></p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
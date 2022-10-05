import React, {useState, useEffect} from "react";

const useLocalStorage = (key, initialValue) => {
  const [theme, setTheme] = useState(() => {
    const persistedValue = localStorage.getItem(key)
    return persistedValue !== null ? persistedValue : initialValue
  });

  useEffect(() => {
    localStorage.setItem(key, theme)
  }, [key, theme])

  return [theme, setTheme]
}

export default useLocalStorage;
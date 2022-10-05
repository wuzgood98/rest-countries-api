import React from 'react'

const Loading = () => {
  return (
    <div className="spinner w-[15.7px] h-[15.7px] fixed top-0 left-0 right-0 bottom-0 mx-auto my-auto">
      <div className="rounded-full h-full absolute w-full animate-spinnerOne bg-[#111517e5] dark:bg-[#ffffffe5]"></div>
      <div className="rounded-full h-full absolute w-full animate-spinnerOne bg-[#111517cc] dark:bg-[#ffffffcc]"></div>
      <div className="rounded-full h-full absolute w-full animate-spinnerOne bg-[#111517b2] dark:bg-[#ffffffb2]"></div>
      <div className="rounded-full h-full absolute w-full animate-spinnerOne bg-[#11151799] dark:bg-[#ffffff99]"></div>
      <div className="rounded-full h-full absolute w-full animate-spinnerOne bg-[#1115177f] dark:bg-[#ffffff7f]"></div>
    </div>
  )
}

export default Loading
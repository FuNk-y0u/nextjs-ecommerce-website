import React from 'react'

export default function NavBarLogo(props) {
  return (
    <h1 className="font-semibold text-gray-700 hidden md:flex">{props.name}</h1>
  )
}

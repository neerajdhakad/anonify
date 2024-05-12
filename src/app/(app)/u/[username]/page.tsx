'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {

  const params = useParams()
  const username= params.username
  return (
    <div>{username} Messages</div>
  )
}

export default Page
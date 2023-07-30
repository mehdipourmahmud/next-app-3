"use client"
import { useRouter } from 'next/navigation';
import CreateNewProject from '../../components/CreateNewProject.'
import React,{useState,useEffect} from 'react'

const page = () => {

  
 
  return (
    <div>
      <h1>Create a new Project</h1>
      <CreateNewProject />
    </div>
  )
}

export default page
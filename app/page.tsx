"use client"
import React, { useEffect, useState } from 'react';
import Cards from '@/components/Cards';
import Categories from '@/components/Categories';
import { fetchAllProjects } from '@/libs/actions';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [category, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await fetchAllProjects(category);
        setProjects(projectsData.projectSearch.edges);
        console.log(projectsData.projectSearch.edges, 'res');
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchData();
  }, [category]);
  return (
    <div>
      <Categories setSelectedCategory={setSelectedCategory} />
      {/* Pass the fetched projects data to the Cards component */}
      <div className='p-5'>
        {projects.length > 0 ? <Cards projects={projects} /> : <p>No projects found.</p>}
      </div>
    </div>
  );
};

export default Home;

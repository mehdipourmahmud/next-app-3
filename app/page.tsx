"use client"
import React, { useEffect, useState } from 'react';
import Cards from '@/components/Cards';
import Categories from '@/components/Categories';
import { fetchAllProjects, fetchallprojectswithoutcategory } from '@/libs/actions';
import MyWorks from '@/components/MyWorks';
import { useSession } from "next-auth/react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [category, setSelectedCategory] = useState('');
  const { data: session, status } = useSession();

  useEffect(() => {
    // Define an async function to fetch projects and use await inside it
    const fetchData = async () => {
      try {
        if (category === '' || category==='All') {
          // Fetch all projects without a specific category
          const projectsDataWithoutCategory = await fetchallprojectswithoutcategory();
          setProjects(projectsDataWithoutCategory.projectCollection.edges);
        } else {
          // Fetch projects based on the selected category
          const projectsData = await fetchAllProjects(category);
          setProjects(projectsData.projectSearch.edges);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    // Call the async function
    fetchData();
  }, [category]); // Include category in the dependency array to re-run the effect when category changes

  return (
    <div>
      <Categories setSelectedCategory={setSelectedCategory} />
      {/* Pass the fetched projects data to the Cards component */}
      <div className='p-5'>
        {/* Show the skeleton loading effect while projects data is being fetched */}
        {projects.length > 0 ? (
          <Cards projects={projects} />
        ) : (
          <SkeletonTheme baseColor="#eee" highlightColor="#444">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <div key={index}>
                  <Skeleton height={300} />
                </div>
              ))}
            </div>
          </SkeletonTheme>
        )}
      </div>
      {session &&
        <MyWorks/>
      }
    </div>
  );
};

export default Home;

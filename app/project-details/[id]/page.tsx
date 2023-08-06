"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import { getProjectByid } from '@/libs/actions';
import loading from '../../../public/loading.gif';



const ProjectDetailsPage = () => {
  const pathname = usePathname();
  const id = pathname.replace(/^\/project-details\//, ''); // Remove the leading slash from the id

  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectData = await getProjectByid(id);
        console.log(projectData.project)
        setProject(projectData.project);
        
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProjectData();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>; // Add a loading state while fetching the data
  }

  return (
    <div className="container mx-auto px-4 mt-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded-md">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="relative">
            {project.image ? (
              <>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-42 object-cover mb-4"
                />
                <span className="absolute top-2 right-2 bg-blue-600 text-white py-1 px-2 rounded">
                  {project.category}
                </span>
              </>
            ) : (
              <img
                src={loading}
                alt="Loading"
                className="w-full h-42 object-cover mb-4"
              />
            )}
          </div>
          <div className="flex justify-between">
            <a href={project.liveSiteURL} className="text-blue-600">
              Live Site
            </a>
            <a href={project.githubURL} className="text-blue-600">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
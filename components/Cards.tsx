import React from 'react';
import loading from '../public/loading.gif';



const Cards = ({ projects }) => {
  console.log(projects, 'pro');
  return (
    <div className="container mx-auto px-4 mt-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {projects.map((project, index) => (
          // Access the project data using edge.node
          <div key={index} className="bg-white p-4 shadow rounded-md">
            <h3 className="text-xl font-semibold mb-2">{project.node.title}</h3>
            <p className="text-gray-600 mb-4">{project.node.description}</p>
            <div className="relative">
  {project.node.image ? (
    <>
      <img src={project.node.image} alt={project.node.title} className="w-full h-42 object-cover mb-4" />
      <span className="absolute top-2 right-2 bg-blue-600 text-white py-1 px-2 rounded">
        {project.node.category}
      </span>
    </>
  ) : (
    <img src={loading} alt="Loading" className='w-full h-42 object-cover mb-4'/>
  )}
</div>

            <div className="flex justify-between">
              <a href={project.node.liveSiteURL} className="text-blue-600">
                Live Site
              </a>
              <a href={project.node.githubURL} className="text-blue-600">
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;

import { getuserprojects } from '@/libs/actions';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { useEffect, useState } from "react";

const MyWorks = () => {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const projectsData = await getuserprojects(session?.user?.id);
        setProjects(projectsData.user.projects.edges); // Set the fetched projects in the state
      } catch (error) {
        console.error('Error fetching user projects:', error);
      }
    };

    if (session?.user?.id) {
      fetchUserProjects();
    }
  }, [session]);

  return (
    <div className='bg-purple-100 p-10 mt-5'>
      <h1 className='py-5 font-extrabold text-xl'>My Works</h1>
      {projects.length === 0 && <p>No projects found.</p>}
      {projects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {projects.map((project) => (
            <div key={project.node.id} className="bg-white p-4 shadow rounded-md">
              <h3 className="text-xl font-semibold mb-2">{project.node.title}</h3>
              <p className="text-gray-600 mb-4">{project.node.description}</p>
              <Link   href={`/project-details/${project.node.id}`}>  <img
                src={project.node.image}
                alt={project.node.title}
                className="w-full h-42 object-cover mb-4"
              />
              </Link>
 
            
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
      )}
    </div>
  );
}

export default MyWorks;

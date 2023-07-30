import { GraphQLClient } from "graphql-request";
const API_Endpoint = "https://next-app-3-main-mehdipourmahmud.grafbase.app/graphql";
const serverUrl =  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
const API_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODk5OTAxODAsImlzcyI6ImdyYWZiYXNlIiwiYXVkIjoiMDFINVhNN0I2SkJBUlNRUDRXWUhDUjQ3MDciLCJqdGkiOiIwMUg1WE03QlY2M0Q3WktZS0FDWDVOMENQQiIsImVudiI6InByb2R1Y3Rpb24iLCJwdXJwb3NlIjoicHJvamVjdC1hcGkta2V5In0.7QxOXxR8NwWOM3k3oKfcez0HnPBT7Yau_NBP4769y0E'



type User =  {
  id: string;
  name: string;
  email: string;
  description: string | null;
  avatarUrl: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
}


type Project ={
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    id: string;
  };
}

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};



export const createNewProject = async (projectData: Project, token: string) => {
  const mutation = `
    mutation ProjectCreate($input: ProjectCreateInput!) {
      projectCreate(input: $input) {
        project {
          title
          description
          image
          liveSiteURL
          githubURL
          category
          createdBy {
            email
          }
        }
      }
    }
  `;

  const variables = {
    input: {
      title: projectData.title,
      description: projectData.description,
      image: projectData.image,
      liveSiteURL: projectData.liveSiteUrl,
      githubURL: projectData.githubUrl,
      category: projectData.category,
      createdBy: {
        link: projectData.createdBy.email,
      },
    },
  };

  try {
    const apiUrl = API_Endpoint;

    if (!apiUrl) {
      throw new Error("API endpoint is not defined.");
    }

    const client = new GraphQLClient(apiUrl);
    // client.setHeader("Authorization", `Bearer ${token}`);
    client.setHeader("x-api-key",API_KEY);

    

    const data = await client.request(mutation, variables);
    if (data.errors) {
      console.error("Error creating project:", data.errors);
      alert("Error creating project. Please try again.");
    } else {
      console.log("Project created successfully:", data.projectCreate);
      alert("Project created successfully!");
      // Clear the form after successful creation
    }
  } catch (error) {
    console.error("Error creating project:", error);
    alert("Error creating project. Please try again.");
  }
};

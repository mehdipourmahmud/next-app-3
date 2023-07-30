import { GraphQLClient } from "graphql-request";

const API_Endpoint = "https://next-app-3-main-mehdipourmahmud.grafbase.app/graphql";
const serverUrl =  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

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
        email: projectData.createdBy.email,
      },
    },
  };

  try {
    const apiUrl = API_Endpoint;

    if (!apiUrl) {
      throw new Error("API endpoint is not defined.");
    }

    const client = new GraphQLClient(apiUrl);
    console.log(client,'cc')
    client.setHeader("Authorization", `Bearer ${token}`);
    

    const data = await client.request(mutation, variables);
    console.log(data, "dd");

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

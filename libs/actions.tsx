import { GraphQLClient } from "graphql-request";
type User = {
  email: String;
}

type Project = {
  title: String;
  description: String;
  image: String;
  liveSiteURL: String;
  githubURL: String;
  category: String;
  createdBy: User;
}
const API_Endpoint = 'https://next-app-3-main-mehdipourmahmud.grafbase.app/graphql';
//@ts-ignore
export const createNewProject = async (projectData:Project, email:string) => {
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
      liveSiteURL: projectData.liveSiteURL,
      githubURL: projectData.githubURL,
      category: projectData.category,
      createdBy: {
        email
      },
    },
  };

  try {
    const apiUrl = API_Endpoint;

    if (!apiUrl) {
      throw new Error("API endpoint is not defined.");
    }

    const client = new GraphQLClient(apiUrl);

    const data = await client.request(mutation, variables);
    console.log(data, 'dd');

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

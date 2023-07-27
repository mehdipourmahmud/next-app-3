require('dotenv').config();
const API_Endpoint='https://next-app-3-main-mehdipourmahmud.grafbase.app/graphql';

export const createNewProject = async (projectData,name,email) => {
  console.log(projectData,'data')
  const mutation = `
  mutation CreateProject($input: ProjectCreateInput!) {
    projectCreate(input: $input) {
      project {
        title
        description
        image
        liveSiteURL
        githudURL
        category
        categoryBy {
					email
					name
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
      githubURL: projectData.githudURL, // Change 'githudURL' to 'githubURL'
      category: projectData.category,
      createdBy: {
        name
        email,
      },
    },
  };
  try {
    const apiUrl = API_Endpoint;
    console.log(apiUrl,'url')
    console.log(process.env)

    if (!apiUrl) {
      throw new Error("API endpoint is not defined.");
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("Error creating project:", data.errors);
      alert("Error creating project. Please try again.");
    } else {
      console.log("Project created successfully:", data.data.projectCreate);
      alert("Project created successfully!");
      // Clear the form after successful creation
    }
  } catch (error) {
    console.error("Error creating project:", error);
    alert("Error creating project. Please try again.");
  }
};

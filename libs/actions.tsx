require('dotenv').config();
const API_Endpoint='https://next-app-3-main-mehdipourmahmud.grafbase.app/graphql';

<<<<<<< HEAD

export const createNewProject = async (projectData, email) => {
  console.log(typeof email,'type')
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
=======
export const createNewProject = async (projectData,email) => {
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
        createdBy{
          email
>>>>>>> 2734742b14a148b1457d1b01ae4e1d427be79935
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
<<<<<<< HEAD
      createdBy: {
        email: email, // Set the "createdBy" field using the provided email
      },
=======
      createdBy:{
        email:email
      }

>>>>>>> 2734742b14a148b1457d1b01ae4e1d427be79935
    },
  };
  try {
    const apiUrl = API_Endpoint;


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

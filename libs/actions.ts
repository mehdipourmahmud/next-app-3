import { GraphQLClient } from "graphql-request";
import{createProjectMutation,createUserMutation, getUserQuery,getProjectByIdQuery, getAllProjects, getAllProjectswithoutcategory, getprojectofuseer} from '../graphql/index'
import {User,ProjectInterface} from '../common.types';
const API_URL = "https://next-app-3-main-mehdipourmahmud-mo12cjnp.grafbase.app/graphql";
const API_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTA5NzU4MTUsImlzcyI6ImdyYWZiYXNlIiwiYXVkIjoiMDFINlYwNkdYNlI0MTVSSDFFRkRONVRXUzUiLCJqdGkiOiIwMUg2VjA2SEMxUURXNUpNOEs4RzFURk0yQSIsImVudiI6InByb2R1Y3Rpb24iLCJwdXJwb3NlIjoicHJvamVjdC1hcGkta2V5In0.mAqR_-jO0oxOsc-h_HZA-qlqEwAoYLT7YTEv0SnNUk4'
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
const apiUrl = process.env.NEXT_PUBLIC_GRAFBASE_API_URL  || 'http://127.0.0.1:4000/graphql';

const client = new GraphQLClient(apiUrl);


export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};


const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};

export const createNewProject = async (form: ProjectInterface, id: string, token: string) => {
  try {
    client.setHeader("Authorization", `Bearer ${token}`);
    const variables = {
      input: { 
        ...form,  
        createdBy: { 
          link: id 
        }      }
    };


    return await makeGraphQLRequest(createProjectMutation, variables);
  } catch (error) {
    alert("Error creating project. Please try again.");
    throw error;
  }
};



export const createUser = (name: string, email: string, image: string) => {
  client.setHeader("x-api-key", API_KEY);

  const variables = {
    input: {
      name: name,
      email: email,
      avatarURL: image
    },
  };
  
  return makeGraphQLRequest(createUserMutation, variables);
};


export const getUser = (email: string) => {
  client.setHeader("x-api-key", API_KEY);
  return makeGraphQLRequest(getUserQuery, { email });
};


export const getProjectDetails = (id: string) => {
  client.setHeader("x-api-key", API_KEY);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};


export const fetchAllProjects = async (category) => {
  client.setHeader("x-api-key", API_KEY);

  try {
    const variables = category ? { category } : {}; // Add category to variables only if it's not null
    console.log(variables,'val')
    return await makeGraphQLRequest(getAllProjects, variables);
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const fetchallprojectswithoutcategory = () => {
  client.setHeader("x-api-key", API_KEY);
  return makeGraphQLRequest(getAllProjectswithoutcategory, {  });
};


export const getProjectByid = (id:string) => {
  client.setHeader("x-api-key", API_KEY);
  return makeGraphQLRequest(getProjectByIdQuery, {id });
};



export const getuserprojects = (id:string) => {
  console.log(id,'ld')
  client.setHeader("x-api-key", API_KEY);
  return makeGraphQLRequest(getprojectofuseer, {id });
};
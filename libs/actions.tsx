import { GraphQLClient } from "graphql-request";

const API_URL = "https://next-app-3-main-mehdipourmahmud.grafbase.app/graphql";
const API_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODk5OTAxODAsImlzcyI6ImdyYWZiYXNlIiwiYXVkIjoiMDFINVhNN0I2SkJBUlNRUDRXWUhDUjQ3MDciLCJqdGkiOiIwMUg1WE03QlY2M0Q3WktZS0FDWDVOMENQQiIsImVudiI6InByb2R1Y3Rpb24iLCJwdXJwb3NlIjoicHJvamVjdC1hcGkta2V5In0.7QxOXxR8NwWOM3k3oKfcez0HnPBT7Yau_NBP4769y0E'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
const apiUrl = process.env.NEXT_PUBLIC_GRAFBASE_API_URL  || 'http://127.0.0.1:4000/graphql';
console.log(process.env.NEXT_PUBLIC_GRAFBASE_API_URL )
type User = {
  id: string;
  name: string;
  email: string;
  description: string | null;
  avatarUrl: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
};


type Project = {
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
};

const client = new GraphQLClient(apiUrl);


export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};

const createProjectMutation = `
  mutation CreateProject($input: ProjectCreateInput!) {
    projectCreate(input: $input) {
      project {
        id
        title
        description
        createdBy {
          email
        }
      }
    }
  }
`;

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};


export const createNewProject = async (projectData: Project,token:string) => {
  try {
    client.setHeader("Authorization", `Bearer ${token}`);
    const variables = {
      input: {
        ...projectData,
        createdBy: {
          link: projectData.createdBy.email,
        },
      },
    };
    return await makeGraphQLRequest(createProjectMutation, variables);
  } catch (error) {
    alert("Error creating project. Please try again.");
    throw error;
  }
};

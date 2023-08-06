export const createProjectMutation = `
	mutation CreateProject($input: ProjectCreateInput!) {
		projectCreate(input: $input) {
			project {
				id
				title
				description
        image
        liveSiteURL
        githubURL
        category
				createdBy {  
          name
          email
        } 
					
			}
		}
	}
`;

      
export const createUserMutation = `
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
			user {
				id
				name
				email
				avatarURL
			}
		}
	}
`;


export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
      id
      name
      email
    }
  }
`;



export const getAllProjects =`
query ProjectSearch($category: String!) {
  projectSearch(
    first: 10
    filter: { category: { eq: $category } }
  ) {
    edges {
      node {
        title
        description
        image
        liveSiteURL
        githubURL
        category
      }
    }
  }
}
`
export const getAllProjectswithoutcategory =`
query ProjectCollection {
  projectCollection(last: 10) {
    edges {
      node {
        title
        description
        image
        liveSiteURL
        githubURL
        category
        id
      }
    }
  }
}
`


export const getProjectByIdQuery = `
query Project($id: ID!){
    project(by: { id: $id }) {
            title
            description
            image
            liveSiteURL
            githubURL
            category
            id
          }
      
  }
`;
export const getprojectofuseer = `
query GetUserProjects($id: ID!) {
  user(by: { id: $id }) {
    id
    name
    projects(first: 10) { 
      edges {
        node {
          id
          title
          description
          image
          liveSiteURL
          githubURL
          category
        }
      }
    }
  }
}



  
`
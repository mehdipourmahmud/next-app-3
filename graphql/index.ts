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


export const getProjectByIdQuery = `
  query User($id: String!) {
    user(by: { email: $id }) {
      projects(last: 10) {
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
      name
      email
      avatarURL
    }
  }
`;

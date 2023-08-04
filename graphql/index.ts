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
          id
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

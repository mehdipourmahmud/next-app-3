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
        linkInUrl
				createdBy {
					email
					name
				}
			}
		}
	}
`;

      
export const createUserMutation = `
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
			user {
				name
				email
				avatarURL
			}
		}
	}
`;

// graphql.ts

export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
      id
      name
      email
    }
  }
`;

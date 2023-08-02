export interface User{
  id: string;
  name: string;
  email: string;
  description: string | null;
  avatarURL: string;
  githubURL: string | null;
  linkInUrl: string | null;
}
export interface Project{
    title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubURL: string;
  category: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarURL: string;
    id: string;
  };
}


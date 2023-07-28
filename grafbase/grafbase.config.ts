import { g, auth, config } from "@grafbase/sdk";

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

const user = g.model("User", {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarURL: g.url(),
  description: g.string(),
  githubURL: g.url().optional(),
  linkInUrl: g.url().optional(),
  projects: g.relation(()=>project).list().optional()
  
});

const project = g.model("Project", {
  title: g.string(),
  description: g.string(),
  image: g.url(),
  liveSiteURL: g.url().optional(),
  githubURL: g.url().optional(), 
  category: g.string().search(), 
  createdBy: g.relation(() => user).optional(),

});

export { user, project }; 


export default config({
  schema: g,
});

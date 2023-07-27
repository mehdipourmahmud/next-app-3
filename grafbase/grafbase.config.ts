import { g, auth, config } from "@grafbase/sdk";

// @ts-ignore

const User = g.model("User", {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarURL: g.url(),
  description: g.string(),
  githubURL: g.url().optional(),
  linkInUrl: g.url().optional(),
  projects: g.relation(()=>Project).list().optional()
  
});
// @ts-ignore

const Project = g.model("Project", {
  title: g.string(),
  description: g.string(),
  image: g.url(),
  liveSiteURL: g.url().optional(),
  githubURL: g.url().optional(), 
  category: g.string().search(), 
  createdBy: g.relation(() => User),

});

export { User, Project }; 


export default config({
  schema: g,
});

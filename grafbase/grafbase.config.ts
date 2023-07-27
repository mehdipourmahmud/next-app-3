import { g, auth, config } from "@grafbase/sdk";

// @ts-ignore

const user = g.model("User", {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.email().unique(),
  avatarURL: g.url(),
  description: g.string(),
  githubURL: g.url().optional(),
  linkInUrl: g.url().optional(),
  projects: g.relation(()=>Project).list().optional()
  
});
// @ts-ignore

const project = g.model("Project", {
  title: g.string(),
  description: g.string(),
  image: g.url(),
  liveSiteURL: g.url().optional(),
  githubURL: g.url().optional(), 
  category: g.string().search(), 
  createdBy: g.relation(() => User),

});

export { user, project }; 


export default config({
  schema: g,
});

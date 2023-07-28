import { g, auth, config } from "@grafbase/sdk";

const user = g.model("User", {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarURL: g.url(),
  description: g.string(),
  githubURL: g.url().optional(),
  linkInUrl: g.url().optional(),
  projects: g.relation(() => project).list().optional()
});

const project = g.model("Project", {
  title: g.string(),
  description: g.string(),
  image: g.url(),
  liveSiteURL: g.url().optional(),
  githubURL: g.url().optional(),
  category: g.string().search(),
  createdBy: g.relation(() => user),
});

export { user, project }; 

export default config({
  schema: g,
});

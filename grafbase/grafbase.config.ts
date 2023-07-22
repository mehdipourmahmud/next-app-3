import { g, auth, config } from "@grafbase/sdk";

// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
// Integrate Auth
// https://grafbase.com/docs/auth
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database

const User = g.model("User", {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarURL: g.url(),
  description: g.string(),
  githudURL: g.url().optional(),
  linkInUrl: g.url().optional(),
  projects: g.relation(()=>Project).list().optional()
});

const Project = g.model("Project", {
  title: g.string(),
  description: g.string(),
  image: g.url(),
  liveSiteURL: g.url(),
  githudURL: g.url(),
  category: g.string().search(),
  categoryBy: g.relation(() => User),
});

export default config({
  schema: g,
});

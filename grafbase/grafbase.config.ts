import { g, auth, config } from "@grafbase/sdk";

const user = g.model("User", {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarURL: g.url(),
  description: g.string(),
  githubURL: g.url().optional(),
  linkInUrl: g.url().optional(),
  projects: g.relation(() => project).list().optional().auth((rules) => {
  rules.public().read()
}).auth((rules) => {
  rules.public().read()
})
});

const project = g.model("Project", {
  title: g.string(),
  description: g.string(),
  image: g.url(),
  liveSiteURL: g.url().optional(),
  githubURL: g.url().optional(),
  category: g.string().search(),
  createdBy: g.relation(() => user),
}).auth((rules) => {
  rules.public().read()
  rules.private().create().delete().update()
});

export { user, project }; 

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret:  g.env('NEXTAUTH_SECRET')
})

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private()
  },
})


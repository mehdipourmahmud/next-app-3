import { g, auth, config } from "@grafbase/sdk";
//@ts-ignore

const User = g.model('User', {
  id: g.id(),
  name: g.string().length({ min: 2, max: 100 }),
  email: g.string().unique(),
  avatarURL: g.url(),
  projects: g.relation(() => Project).list().optional(),
}).auth((rules) => {
  rules.public().read()
})


//@ts-ignore

const Project = g.model("Project", {
  title: g.string(),
  description: g.string(),
  image: g.url(),
  liveSiteURL: g.url().optional(),
  githubURL: g.url().optional(),
  category: g.string().search(),
  createdBy: g.relation(() => User),
}).auth((rules) => {
  rules.public().read()
  rules.private().create().delete().update()
});

export { User, Project }; 

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


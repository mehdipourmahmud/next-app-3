import CreateNewProject from '../../components/CreateNewProject.';
import { getCurrentUser } from '@/libs/session';
import { redirect } from "next/navigation";

  const Page = async () => {

  const session = await getCurrentUser();
console.log(session,'seep')
  if (!session?.user) 
  redirect("/")

 

  return (
    <div>
      <h1>Create a new Project</h1>
      <CreateNewProject session={session} />
    </div>
  );
};

export default Page;


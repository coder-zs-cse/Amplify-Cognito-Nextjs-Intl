import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/options/auth';
import { redirect } from 'next/navigation';
async function blog() {
  const session = await getServerSession(authOptions);
  console.log("0l",session);

  if(!session){
    redirect('/login')
  }
  return (
    <div> 
    blog 
    {session?.user.name}
    </div>
  )
}

export default blog
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/options/auth';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
async function blog({params}) {
  // const t = useTranslations('IndexPage');
  const locale = params.locale; 
  const session = await getServerSession(authOptions);
  console.log("0l",session);

  if(!session){
    redirect(`/${locale}/login`)
  }
  return (
    <div> 
    
    Hi {session?.user.name}!
    </div>
  )
}

export default blog
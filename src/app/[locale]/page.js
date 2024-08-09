'use client'
import { useTranslations } from "next-intl";
// import { redirect} from "next/navigation";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const router = useRouter()
  return (
    <div>
      <h1>{t("title")}</h1>
      <button onClick={()=>router.push('/en/home')}>Go to Dashboard</button>
    </div>
  );
}

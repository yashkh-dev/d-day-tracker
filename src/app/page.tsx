import { getExams } from "@/lib/db";
import { HomeContent } from "@/components/HomeContent";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const exams = await getExams();

  return (
    <HomeContent exams={exams} />
  );
}

import { YamasaIntro } from "@/components/yamasa/yamasa-intro";
import { YamasaTechnologies } from "@/components/yamasa/yamasa-technologies";

export default function YamasaPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="w90 space-y-10 py-10 md:space-y-14 md:py-14">
        <YamasaIntro />
        <YamasaTechnologies />
      </div>
    </main>
  );
}

import { PageSection } from "@/components/ui/page-section";
import { SectionHeader } from "@/components/ui/section-header";

type ProsePageProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

export function ProsePage({ eyebrow, title, children }: ProsePageProps) {
  return (
    <PageSection className="py-14 sm:py-20">
      <SectionHeader eyebrow={eyebrow} title={title} className="mb-10" />
      <div className="prose-travellium max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </div>
    </PageSection>
  );
}

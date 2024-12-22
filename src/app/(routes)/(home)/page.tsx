import { Header } from "@/components/layouts/header";
import { FeaturesSection } from "@/components/features/features-section";
import { SocialProof } from "@/components/social/social-proof";
import { CTASection } from "@/components/cta/cta-section";
import { Footer } from "@/components/layouts/footer";
import { EditorPreview } from "@/components/editor-preview/editor-preview";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <EditorPreview />
      </main>
      <FeaturesSection />
      <SocialProof />
      <CTASection />
      <Footer />
    </div>
  );
}

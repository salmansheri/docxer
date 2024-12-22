import Navbar from "@/app/(routes)/templates/components/navbar";
import TemplateGallery from "@/app/(routes)/templates/components/template-gallery";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 fixed top-0 left-0 right-0 z-10 h-16 bg-zinc-50/10 backdrop-blur-lg backdrop-saturate-150">
        <Navbar />
      </header>
      <div className="mt-16">
        <TemplateGallery />
      </div>
    </div>
  );
}

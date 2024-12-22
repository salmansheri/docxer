interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group bg-neutral-900 p-6 rounded-lg border border-neutral-700 hover:border-[#db2777] transition-all duration-300 hover:shadow-xl relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#db2777] via-[#d946ef] to-[#a21caf] opacity-0 group-hover:opacity-5 rounded-lg transition-opacity" />
      <div className="relative">
        <div className="text-transparent bg-gradient-to-r from-[#db2777] to-[#d946ef] bg-clip-text mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-neutral-400">{description}</p>
      </div>
    </div>
  );
}

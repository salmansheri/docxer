export function SocialProof() {
  const companies = ["Microsoft", "Google", "Amazon", "Meta"];

  return (
    <section className="py-16 container mx-auto px-4 bg-neutral-900">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Trusted by innovative teams
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
        {companies.map((company) => (
          <div key={company} className="text-xl font-semibold text-neutral-400">
            {company}
          </div>
        ))}
      </div>
    </section>
  );
}

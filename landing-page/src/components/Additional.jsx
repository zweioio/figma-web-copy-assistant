import React from 'react';

const TestimonialCard = ({ quote, name, role, avatar }) => {
  return (
    <div className="flex flex-col p-8 bg-transparent border-0 hover:bg-gray-50/50 rounded-xl transition-colors">
      <p className="text-xl md:text-2xl text-gray-900 mb-8 font-serif leading-relaxed">
        "{quote}"
      </p>
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
           {/* Avatar Placeholder */}
           {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300"></div>}
        </div>
        <div>
          <div className="text-base font-bold text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
    </div>
  );
};

const Additional = () => {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "UI Designer @ TechCorp",
      quote: "Codex has completely transformed my workflow. I used to spend hours redrawing screenshots, now it takes seconds. The layer accuracy is incredible."
    },
    {
      name: "Sarah Miller",
      role: "Frontend Dev @ StartUp",
      quote: "The ability to grab a component from a live site and drop it into Figma for my designer to tweak is a game changer. It bridges the gap perfectly."
    },
    {
      name: "David Kim",
      role: "Product Manager",
      quote: "I use Codex for competitive analysis. Being able to pull competitor designs into Figma and dissect them helps us iterate faster on our own ideas."
    },
    {
      name: "Emily Wang",
      role: "Freelance Designer",
      quote: "It's not just a screenshot tool; it's a design extraction tool. The auto-layout support saves me so much cleanup time."
    }
  ];

  return (
    <section id="testimonials" className="py-32 bg-white relative">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
            What builders are saying
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center relative z-10">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[20vw] bg-gradient-to-r from-blue-100/40 via-purple-100/40 to-pink-100/40 blur-[80px] rounded-full -z-10"></div>
           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
             立即试用 Codex
           </h2>
           <p className="text-lg text-gray-600 mb-10 font-light">
             加入数万名设计师和开发者的行列，体验高效的设计还原。
           </p>
           <button className="px-10 py-3 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
             Get Codex
           </button>
        </div>
      </div>
    </section>
  );
};

export default Additional;
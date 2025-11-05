'use client';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-black text-white relative overflow-hidden">
      {/* Subtle artistic background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Artistic decorative elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-white/20"></div>
        
        <h2 className="text-5xl md:text-6xl font-light mb-8 tracking-tight relative">
          Let's Work Together
          {/* Decorative underline */}
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-white/30"></span>
        </h2>
        <p className="text-xl text-zinc-300 mb-12 max-w-2xl mx-auto">
          Interested in collaborating on a project? I'd love to hear from you.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <a
            href="mailto:kyle.greaney02@gmail.com"
            className="px-8 py-4 border border-white/30 text-white hover:bg-white/20 transition-all duration-300 rounded-full backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105"
          >
            Email Me
          </a>
          <a
            href="tel:9182828820"
            className="px-8 py-4 border border-white/30 text-white hover:bg-white/20 transition-all duration-300 rounded-full backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105"
          >
            (918) 282-8820
          </a>
          <a
            href="https://instagram.com/notkylegreaney"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-white/30 text-white hover:bg-white/20 transition-all duration-300 rounded-full backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105"
          >
            Instagram
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-zinc-400 text-sm">
            © {new Date().getFullYear()} Kyle Greaney. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}


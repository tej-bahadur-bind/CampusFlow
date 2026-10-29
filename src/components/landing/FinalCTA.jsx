import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import campusStudentsImg from '../../assets/campus-students.webp';

export default function FinalCTA() {
  const handleScrollToPreview = (e) => {
    e.preventDefault();
    const elem = document.querySelector('#preview');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 md:py-24 overflow-hidden my-12 mx-4 sm:mx-6 lg:mx-8 rounded-3xl border border-blue-500/20 shadow-xl bg-blue-900">
      
      {/* Background Campus Photo */}
      <img
        src={campusStudentsImg}
        alt="College students gathering on campus"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark Blue Overlay for Accessibility & High Contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/90 to-indigo-950/95 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Bring your campus into one connected system.
        </h2>
        <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Streamline administration, empower faculty, and give students clear insights into their academic journey with CampusFlow.
        </p>
        <div className="pt-2 flex justify-center">
          <Button
            href="#preview"
            onClick={handleScrollToPreview}
            variant="outline"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            className="bg-white text-blue-700 border-transparent hover:bg-blue-50 shadow-md font-semibold"
          >
            Explore CampusFlow
          </Button>
        </div>
      </div>

    </section>
  );
}
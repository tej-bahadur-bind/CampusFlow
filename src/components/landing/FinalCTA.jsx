import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function FinalCTA() {
  const handleScrollToPreview = (e) => {
    e.preventDefault();
    const elem = document.querySelector('#preview');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
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
            className="bg-white text-blue-700 border-transparent hover:bg-blue-50 shadow-md"
          >
            Explore CampusFlow
          </Button>
        </div>
      </div>
    </section>
  );
}

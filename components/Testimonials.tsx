import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useLayoutEffect, useRef } from 'react';
import { useContent } from '@/context/ContentContext';
import { Quote, Star } from 'lucide-react';
import gsap from 'gsap';

// ... (keep existing imports)

export const Testimonials: React.FC = () => {
  const comp = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { testimonials } = useContent();

  useLayoutEffect(() => {
    // ... (keep existing GSAP logic, but maybe disable stagger for slider mode?)
    // Actually, GSAP might conflict with Swiper's DOM manipulation.
    // Let's keep GSAP for the container reveal, but maybe skip the card stagger if using Swiper.

    let ctx = gsap.context(() => {
      // 1. Parallax Background
      if (window.innerWidth > 768) {
        gsap.to(bgRef.current, {
          scrollTrigger: {
            trigger: comp.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: 50,
          ease: "none"
        });
      }

      // 2. Header Reveal
      gsap.from(".testimonial-header", {
        scrollTrigger: {
          trigger: comp.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // 3. Cards Stagger (Only if NOT using Swiper, or target a different class)
      if (testimonials.length <= 3) {
        gsap.from(".review-card", {
          scrollTrigger: {
            trigger: ".reviews-grid",
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          clearProps: "all"
        });
      } else {
        // Animate the swiper container instead
        gsap.from(".swiper-container-wrapper", {
          scrollTrigger: {
            trigger: ".swiper-container-wrapper",
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      }

      // 4. Rating Badge Reveal
      gsap.from(".rating-badge", {
        scrollTrigger: {
          trigger: comp.current, // Changed trigger to component to be safe
          start: "bottom 95%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.2
      });

    }, comp);
    return () => ctx.revert();
  }, [testimonials.length]); // Re-run if length changes

  // Helper to get initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper to get random color for initials background
  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-rose-100 text-rose-600",
      "bg-blue-100 text-blue-600",
      "bg-emerald-100 text-emerald-600",
      "bg-amber-100 text-amber-600",
      "bg-purple-100 text-purple-600",
      "bg-cyan-100 text-cyan-600"
    ];
    return colors[index % colors.length];
  };

  const renderCard = (review: any, index: number) => (
    <div
      key={review.id || index}
      className="review-card group relative bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-3xl md:rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full"
    >
      {/* Decorative Quote Icon */}
      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <Quote size={48} className="text-nz-accent fill-current md:w-16 md:h-16" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4 md:mb-6 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400 md:w-[18px] md:h-[18px]" />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8 flex-grow relative z-10 font-medium">
        "{review.content}"
      </p>

      {/* Author Info */}
      <div className="mt-auto flex items-center gap-3 md:gap-4 pt-5 md:pt-6 border-t border-slate-100/50">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.name}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shrink-0 border border-slate-100"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
              e.currentTarget.nextElementSibling?.classList.add('flex');
            }}
          />
        ) : null}

        {/* Fallback Initials Avatar */}
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full items-center justify-center font-bold text-base md:text-lg shrink-0 ${getAvatarColor(index)} ${review.avatar ? 'hidden' : 'flex'}`}>
          {getInitials(review.name)}
        </div>

        <div>
          <h4 className="font-bold text-slate-900 text-sm md:text-base leading-tight">{review.name}</h4>
          {review.role && (
            <p className="text-xs md:text-sm text-slate-400 font-medium">{review.role}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div id="testimonials" ref={comp} className="relative overflow-hidden py-16 md:py-24 bg-slate-50">
      {/* ... (keep background) */}
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white"></div>
        <div className="absolute inset-0 opacity-[0.3]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #cbd5e1 1px, transparent 0)', backgroundSize: '32px 32px' }}>
        </div>
        <div className="absolute top-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-sky-100/50 rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2 -translate-x-1/4 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-purple-100/50 rounded-full blur-[80px] md:blur-[100px] translate-y-1/3 translate-x-1/4 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

        {/* Header */}
        <div className="testimonial-header text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-white border border-slate-200 text-nz-accent font-semibold tracking-wider uppercase text-[10px] md:text-xs mb-3 shadow-sm">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-slate-600 text-base md:text-xl max-w-2xl mx-auto">
            We take pride in our work, but don't just take our word for it.
          </p>
        </div>

        {/* Content Logic */}
        {testimonials.length > 3 ? (
          <div className="swiper-container-wrapper">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12"
            >
              {testimonials.map((review, index) => (
                <SwiperSlide key={review.id || index} className="h-auto">
                  {renderCard(review, index)}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="reviews-grid grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((review, index) => renderCard(review, index))
            ) : (
              <div className="col-span-full text-center py-10 text-slate-500">
                No testimonials found.
              </div>
            )}
          </div>
        )}

        {/* Google Rating Badge */}
        <div className="rating-badge mt-10 md:mt-16 text-center">
          {/* ... (keep existing badge code) */}
          <a href="#" className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white px-6 py-4 md:px-8 rounded-2xl md:rounded-full shadow-lg shadow-slate-200/50 border border-slate-100 hover:scale-105 hover:shadow-xl transition-all duration-300 group max-w-xs sm:max-w-none mx-auto">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-5 md:h-6" />

            <div className="hidden sm:block h-6 w-[1px] bg-slate-200"></div>

            <div className="flex flex-col items-center sm:items-start">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-600 mt-0.5 group-hover:text-nz-accent transition-colors">4.9/5 Rating based on 150+ reviews</span>
            </div>
          </a>
        </div>

      </div>
    </div>
  );
};
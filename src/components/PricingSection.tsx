import { useEffect, useRef, useState } from "react";
import { PRICING_PLANS } from "../data";
import type { PricingPlan } from "../types";

// Check Icon
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8.5L6.5 12L13 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Pricing Card Component
function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <article
      ref={cardRef}
      className={`relative rounded-3xl border bg-[var(--color-bg-card)] overflow-hidden transition-all duration-500 flex flex-col ${
        plan.popular
          ? "border-2 border-[var(--color-primary)] shadow-[var(--shadow-glow)] z-10"
          : "border-[var(--color-border)] hover:border-[var(--color-primary)]"
      } hover:shadow-xl ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white text-center py-2 text-sm font-bold">
          Most Popular
        </div>
      )}

      <div
        className={`p-8 flex flex-col flex-grow ${plan.popular ? "pt-14" : ""}`}
      >
        {/* Plan name & description */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-black text-[var(--color-text-primary)]">
            {plan.name}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2">
            {plan.description}
          </p>
        </div>

        {/* Price */}
        <div className="text-center mb-8">
          {plan.price === "custom" ? (
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-black text-gradient">Custom</span>
            </div>
          ) : (
            <>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-lg text-[var(--color-text-muted)]">
                  ₹
                </span>
                <span className="text-5xl font-black text-gradient">
                  {plan.price.toLocaleString("en-IN")}
                </span>
              </div>
              {plan.priceUSD && (
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  ~${plan.priceUSD} USD
                </p>
              )}
            </>
          )}
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            {plan.price === "custom"
              ? "Tailored to your needs"
              : "Starting price"}
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-grow">
          {plan.features.map((feature, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-primary-muted)] text-[var(--color-primary)] flex items-center justify-center mt-0.5">
                <CheckIcon />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA Button - always at bottom */}
        <button
          onClick={scrollToContact}
          className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 mt-auto ${
            plan.popular ? "btn-primary" : "btn-secondary"
          }`}
        >
          {plan.ctaText}
        </button>
      </div>

      {/* Decorative corner */}
      {plan.popular && (
        <div
          className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-[var(--color-primary)] opacity-5"
          aria-hidden="true"
        />
      )}
    </article>
  );
}

export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 bg-[var(--color-bg-primary)] relative overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 hero-gradient opacity-50"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="section-label mb-3">Pricing</p>
          <h2 id="pricing-heading" className="section-title">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="section-description mx-auto mt-4">
            Choose the perfect package for your project. All plans include our
            commitment to quality.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PRICING_PLANS.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Additional info */}
        <div
          className={`mt-16 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center">
            <p className="text-[var(--color-text-secondary)] mb-6">
              Need something different? We offer custom solutions for unique
              requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-[var(--color-text-muted)]">
              <div className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>Flexible payment options</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>100% satisfaction guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Teaser */}
        <div
          className={`mt-16 max-w-2xl mx-auto transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 text-center">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
              Have questions about pricing?
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-6">
              We're happy to discuss your project requirements and provide a
              detailed quote.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-primary"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Get a Free Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

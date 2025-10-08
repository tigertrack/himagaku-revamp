"use client"

import Link from "next/link";
import { useState } from "react";
// import heroImage from "@/assets/hero-kanji.jpg";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: "Home", section: "hero" },
    { label: "About", section: "about" },
  ];

  const features = [
    {
      icon: "📚",
      title: "Comprehensive Learning",
      description: "Cover all JLPT levels from N5 to N1 with thousands of kanji characters and their readings."
    },
    {
      icon: "🎯",
      title: "Interactive Quizzes",
      description: "Test your knowledge with timed quizzes and receive instant feedback on your progress."
    },
    {
      icon: "📈",
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed statistics and achievement tracking."
    },
    {
      icon: "🧠",
      title: "Smart Learning",
      description: "Adaptive learning system that focuses on your weak areas for efficient improvement."
    },
    {
      icon: "🌟",
      title: "Gamified Experience",
      description: "Earn points, unlock achievements, and stay motivated with our engaging learning system."
    },
    {
      icon: "📱",
      title: "Mobile Optimized",
      description: "Learn anywhere, anytime with our responsive design that works on all devices."
    }
  ];

  return (
    <div className="min-h-screen bg-kanji-dark">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-kanji-dark/90 backdrop-blur-sm border-b border-kanji-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => handleNavigate("hero")}
                className="text-2xl font-bold text-kanji-text hover:text-kanji-teal transition-colors duration-300"
              >
                Hima
                <span className="text-kanji-teal ml-0">Gaku</span>
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleNavigate(item.section)}
                  className="text-kanji-text hover:text-kanji-teal transition-colors duration-300 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-kanji-text hover:text-kanji-teal p-2"
              >
                {isMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-kanji-border mt-4 pt-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.section}
                    onClick={() => handleNavigate(item.section)}
                    className="text-kanji-text hover:text-kanji-teal transition-colors duration-300 font-medium text-left"
                  >
                  {item.label}
                </button>
              ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-kanji-text mb-6 leading-tight">
              Master
              <span className="text-kanji-teal block md:inline md:ml-4">Kanji</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-kanji-text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
              Learn Japanese characters through interactive quizzes and structured lessons. 
              From N5 to N1, master them all.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12 text-kanji-text-muted">
              <div className="flex items-center">
                <span className="text-kanji-teal mr-2">✓</span>
                JLPT N1-N5 Levels
              </div>
              <div className="flex items-center">
                <span className="text-kanji-teal mr-2">✓</span>
                Interactive Quizzes
              </div>
              <div className="flex items-center">
                <span className="text-kanji-teal mr-2">✓</span>
                Progress Tracking
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={'/register'} className="bg-kanji-teal text-kanji-dark text-lg px-8 py-3 rounded-lg font-medium hover:bg-kanji-teal/90 transition-colors">
                Start Learning
              </Link>
              <Link href={'/login'} className="bg-transparent border-2 border-kanji-teal text-kanji-teal text-lg px-8 py-3 rounded-lg font-medium hover:bg-kanji-teal/10 transition-colors">
                Login
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 md:grid-cols-5 gap-4 max-w-md mx-auto">
              {["学", "習", "漢", "字", "勉"].map((kanji, index) => (
                <div
                  key={kanji}
                  className="bg-kanji-surface border border-kanji-border rounded-lg p-4 text-3xl md:text-4xl text-kanji-text text-center hover:border-kanji-teal transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: "fadeInUp 0.8s ease-out forwards",
                  }}
                >
                  {kanji}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-kanji-teal rounded-full flex justify-center">
            <div className="w-1 h-3 bg-kanji-teal rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-kanji-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-kanji-text mb-6">
              Why Choose Our
              <span className="text-kanji-teal ml-4">Kanji App?</span>
            </h2>
            <p className="text-xl text-kanji-text-muted max-w-3xl mx-auto leading-relaxed">
              Our comprehensive learning platform is designed to make kanji mastery achievable for everyone. 
              From beginners to advanced learners, we provide the tools you need to succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-kanji-dark border border-kanji-border rounded-lg p-6 hover:border-kanji-teal transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-kanji-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-kanji-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-kanji-dark rounded-2xl p-8 md:p-12 border border-kanji-border">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-kanji-teal mb-2">2000+</div>
                <div className="text-kanji-text-muted">Kanji Characters</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-kanji-teal mb-2">5</div>
                <div className="text-kanji-text-muted">JLPT Levels</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-kanji-teal mb-2">26K+</div>
                <div className="text-kanji-text-muted">Vocabulary</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-kanji-text mb-6">
              Ready to Start Your Kanji Journey?
            </h3>
            <p className="text-kanji-text-muted mb-8 max-w-2xl mx-auto">
              Join thousands of learners who have already improved their Japanese skills with our platform.
            </p>
            <Link href={'/register'} className="bg-kanji-teal text-kanji-dark text-lg px-8 py-3 rounded-lg font-medium hover:bg-kanji-teal/90 transition-colors">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
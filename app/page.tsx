"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Users, Calendar, MapPin, Camera, Utensils, Music, Star, CheckCircle, ArrowRight, Building2, Handshake, Zap, TrendingUp, Clock } from 'lucide-react';

// Countdown Timer Component
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set launch date to 6 August 2025
    const launchDate = new Date('2025-08-06T00:00:00');

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8">
      <div className="inline-flex items-center px-4 py-2 rounded-full mb-4" style={{
        backgroundColor: '#C4AAD915',
        border: '1px solid #C4AAD930'
      }}>
        <Clock className="w-4 h-4 mr-2" style={{color: '#C4AAD9'}} />
        <span className="text-sm font-medium" style={{color: '#C4AAD9'}}>Launch Countdown</span>
      </div>
      
      <div className="flex justify-center space-x-4 mb-6">
        {[
          { value: timeLeft.days, label: 'Days' },
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Minutes' },
          { value: timeLeft.seconds, label: 'Seconds' }
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold text-white mb-2"
              style={{
                background: 'linear-gradient(135deg, #C4AAD9 0%, #9CAE89 50%, #E8B4B4 100%)'
              }}
            >
              {item.value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-600 font-medium">{item.label}</div>
          </div>
        ))}
      </div>
      
      <p className="text-lg text-gray-600 text-center">
        Until Mahfil goes live! 🚀
      </p>
    </div>
  );
};

export default function Home() {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [userType, setUserType] = useState<'vendor' | 'couple'>('vendor');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          phoneNumber,
          businessName: userType === 'vendor' ? businessName : undefined,
          userType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setIsSubmitted(true);
      setEmail('');
      setPhoneNumber('');
      setBusinessName('');
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-green-50 to-pink-50" style={{
      background: 'linear-gradient(135deg, #f8f4ff 0%, #f7faf5 50%, #fffbfb 100%)'
    }}>
      {/* Header */}
      <header className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo400x400.png" 
              alt="Mahfil Logo" 
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-2xl font-bold text-gray-800">
              Mahfil
            </h1>
            <div className="hidden sm:flex items-center ml-3">
              <span className="bg-gradient-to-r from-purple-400 to-green-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                LAUNCHING SOON
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#vendors" className="text-gray-700 hover:text-purple-600 transition-colors">For Vendors</a>
            <a href="#couples" className="text-gray-700 hover:text-purple-600 transition-colors">For Couples</a>
            <a href="#waitlist" className="text-gray-700 hover:text-purple-600 transition-colors">Join the Waitlist</a>
          </div>
        </div>
      </header>

      {/* Hero Section - Early Startup Energy */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{
              backgroundColor: '#C4AAD915',
              border: '1px solid #C4AAD930'
            }}>
              <Zap className="w-4 h-4 mr-2" style={{color: '#C4AAD9'}} />
              <span className="text-sm font-medium" style={{color: '#C4AAD9'}}> AI-Powered Event Platform • Smart Matching </span>
            </div>
            
            <CountdownTimer />
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The Future of{' '}
              <span style={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #9CAE89 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Cultural
              </span>{' '}
              <span style={{
                background: 'linear-gradient(135deg, #9CAE89 0%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Events
              </span>
              <br />
              <span className="text-4xl md:text-5xl">Powered by AI</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              We're building the world's first AI-powered platform for cultural events. 
              Connect with vendors who understand your traditions, plan your dream event, and grow your business with intelligent technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                type="button"
                className="text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #C4AAD9 0%, #9CAE89 50%, #E8B4B4 100%)'
                }}
                onClick={() => {
                  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="relative z-10">Join the Platform</span>
                <ArrowRight className="w-5 h-5 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
              </button>
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-purple-200 border-2 border-white animate-pulse"></div>
                  <div className="w-8 h-8 rounded-full bg-green-200 border-2 border-white animate-pulse delay-300"></div>
                  <div className="w-8 h-8 rounded-full bg-pink-200 border-2 border-white animate-pulse delay-600"></div>
                </div>
                <span className="text-sm font-medium">50+ Event Vendors Already Joined • AI-Powered Matching</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Futuristic decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-20 animate-pulse -z-10" style={{backgroundColor: '#C4AAD9'}}></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-20 animate-pulse delay-1000 -z-10" style={{backgroundColor: '#9CAE89'}}></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 rounded-full opacity-15 animate-pulse delay-500 -z-10" style={{backgroundColor: '#E8B4B4'}}></div>
        
        {/* Tech grid pattern */}
        <div className="absolute inset-0 opacity-5 -z-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(196, 170, 217, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(196, 170, 217, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </section>

      {/* Why Now Section - Startup Vision */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{backgroundColor: '#f8f4ff'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{
              backgroundColor: '#C4AAD915',
              border: '1px solid #C4AAD930'
            }}>
              <Zap className="w-4 h-4 mr-2" style={{color: '#C4AAD9'}} />
              <span className="text-sm font-medium" style={{color: '#C4AAD9'}}> $50B+ Market • AI-Powered Solutions</span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">The Vision We're Building</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The cultural events market is worth $50+ billion globally, but finding vendors who understand your traditions is still a challenge. 
              We're building the first AI-powered platform designed for cultural events.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Cultural Event AI",
                description: "AI understands event traditions, rituals, and cultural requirements to match perfect vendors",
                color: "#C4AAD9"
              },
              {
                icon: Users,
                title: "Smart Vendor Matching",
                description: "Our AI matches couples with vendors who understand their cultural background and traditions",
                color: "#9CAE89"
              },
              {
                icon: Handshake,
                title: "Cultural Expertise",
                description: "Vendors who specialize in cultural events - from traditional ceremonies to modern celebrations",
                color: "#E8B4B4"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl border hover:shadow-lg group transition-all"
                style={{
                  backgroundColor: `${item.color}15`,
                  borderColor: `${item.color}30`
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{backgroundColor: item.color}}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Benefits Section */}
      <section id="vendors" className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{
              backgroundColor: '#C4AAD915',
              border: '1px solid #C4AAD930'
            }}>
              <Zap className="w-4 h-4 mr-2" style={{color: '#C4AAD9'}} />
              <span className="text-sm font-medium" style={{color: '#C4AAD9'}}> For Vendors • AI-Powered Growth</span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Calling Event Vendors</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the first 100 vendors and get exclusive access to our AI-powered platform. 
              Grow your business with smart matching and cultural expertise recognition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Cultural Expertise Recognition",
                description: "AI recognizes your cultural expertise and matches you with clients who value traditions",
                color: "#C4AAD9"
              },
              {
                icon: TrendingUp,
                title: "Market Intelligence",
                description: "Get insights into event trends, traditions, and regional preferences",
                color: "#9CAE89"
              },
              {
                icon: Handshake,
                title: "Cultural Matching Algorithm",
                description: "Our AI matches you with couples who value your cultural understanding and expertise",
                color: "#E8B4B4"
              },
              {
                icon: Users,
                title: "Community Access",
                description: "Connect with clients actively planning their events in your area",
                color: "#C4AAD9"
              },
              {
                icon: Star,
                title: "Smart Pricing",
                description: "AI helps you price services appropriately for event budgets and expectations",
                color: "#9CAE89"
              },
              {
                icon: Building2,
                title: "Founding Member Status",
                description: "Be among the first vendors on our AI-powered platform",
                color: "#E8B4B4"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl border hover:shadow-lg group transition-all"
                style={{
                  backgroundColor: `${feature.color}15`,
                  borderColor: `${feature.color}30`
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{backgroundColor: feature.color}}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{
        backgroundColor: '#f8f4ff'
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{
              backgroundColor: '#C4AAD915',
              border: '1px solid #C4AAD930'
            }}>
              <Zap className="w-4 h-4 mr-2" style={{color: '#C4AAD9'}} />
              <span className="text-sm font-medium" style={{color: '#C4AAD9'}}> Event Specialists • AI-Powered Matching</span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Event Vendors We're Seeking</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our network of event specialists and leverage AI-powered matching for cultural expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: "Event Venues", icon: MapPin, color: "#C4AAD9", locations: "Banquet Halls & Gardens" },
              { category: "Cultural Catering", icon: Utensils, color: "#9CAE89", locations: "Traditional & Regional Cuisines" },
              { category: "Cultural Photography", icon: Camera, color: "#E8B4B4", locations: "Traditional & Modern" },
              { category: "Cultural Music", icon: Music, color: "#C4AAD9", locations: "Live & DJ Services" },
              { category: "Cultural Decorators", icon: Star, color: "#9CAE89", locations: "Traditional & Modern" },
              { category: "Traditional Artists", icon: Heart, color: "#E8B4B4", locations: "Cultural Designs" },
              { category: "Cultural Planners", icon: Calendar, color: "#C4AAD9", locations: "Full Cultural Planning" },
              { category: "Cultural Transportation", icon: MapPin, color: "#9CAE89", locations: "Luxury Car Services" }
            ].map((item, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl text-center border hover:shadow-md transition-all"
                style={{
                  backgroundColor: `${item.color}10`,
                  borderColor: `${item.color}20`
                }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{backgroundColor: item.color}}
                >
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.category}</h4>
                <p className="text-xs text-gray-500">{item.locations}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Couples Section */}
      <section id="couples" className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{
              backgroundColor: '#C4AAD915',
              border: '1px solid #C4AAD930'
            }}>
              <Zap className="w-4 h-4 mr-2" style={{color: '#C4AAD9'}} />
              <span className="text-sm font-medium" style={{color: '#C4AAD9'}}> Event Planning • AI-Powered Matching</span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Planning Your Event?</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of event planning with our AI-powered platform. Find vendors who 
              understand your traditions and create your dream event.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Smart Event Planning",
                description: "AI understands cultural traditions and matches you with culturally-aware vendors",
                color: "#C4AAD9"
              },
              {
                icon: TrendingUp,
                title: "Budget Optimization",
                description: "AI helps you plan within event budgets and traditional expectations",
                color: "#9CAE89"
              },
              {
                icon: Calendar,
                title: "Event Coordination",
                description: "AI coordinates all your events - from traditional rituals to modern celebrations",
                color: "#E8B4B4"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-2xl border hover:shadow-lg group transition-all"
                style={{
                  backgroundColor: `${feature.color}15`,
                  borderColor: `${feature.color}30`
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{backgroundColor: feature.color}}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Early Stage Momentum */}
      <section className="px-4 sm:px-6 lg:px-8 py-20" style={{
        background: 'linear-gradient(135deg, #C4AAD9 0%, #9CAE89 50%, #E8B4B4 100%)'
      }}>
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-4">Building the Future of Events</h3>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join the founding community of the world's first AI-powered events platform
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { stat: "50+", label: "Event Vendors" },
              { stat: "25+", label: "US Cities" },
              { stat: "$50B+", label: "Market Size" },
              { stat: "Free", label: "Sign Up & Listing" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{item.stat}</div>
                <div className="text-white/80">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section - Enhanced Startup Experience */}
      <section id="waitlist" className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{
              backgroundColor: '#C4AAD915',
              border: '1px solid #C4AAD930'
            }}>
              <Zap className="w-4 h-4 mr-2" style={{color: '#C4AAD9'}} />
              <span className="text-sm font-medium" style={{color: '#C4AAD9'}}>🚀 Limited Time: Founding Member Access</span>
            </div>
            
            <h3 className="text-5xl font-bold text-gray-900 mb-6">Join the Event Revolution</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join the first 100 founding members and help us build the world's first AI-powered events platform. 
              This is your chance to shape the future of event planning.
            </p>
            
            {/* Cultural Stats */}
           
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Enhanced Form */}
            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Join the Founding Community</h4>
                <p className="text-gray-600 mb-6">
                  Get exclusive early access, zero fees, and the chance to co-create the platform with our team.
                </p>
              </div>
              
              {isSubmitted ? (
                <div className="border rounded-2xl p-8" style={{
                  backgroundColor: '#9CAE8915',
                  borderColor: '#9CAE8930'
                }}>
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{color: '#9CAE89'}} />
                  <h4 className="text-2xl font-semibold mb-4 text-center" style={{color: '#9CAE89'}}>Welcome to the Revolution! 🎉</h4>
                  <p className="text-center mb-4" style={{color: '#9CAE89'}}>
                    You're now a founding member for {userType === 'vendor' ? 'vendors' : 'couples'}. 
                    {userType === 'vendor' && businessName && ` Welcome, ${businessName}!`}
                    Check your email for exclusive updates and early access details.
                  </p>
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full" style={{backgroundColor: '#9CAE8930'}}>
                      <Star className="w-4 h-4" style={{color: '#9CAE89'}} />
                      <span className="text-sm font-medium" style={{color: '#9CAE89'}}>Founding Member Status Activated</span>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Message */}
                  {error && (
                    <div className="border rounded-xl p-4" style={{
                      backgroundColor: '#FEF2F2',
                      borderColor: '#FECACA'
                    }}>
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  {/* User Type Selection */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">I am a:</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setUserType('vendor')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          userType === 'vendor' 
                            ? 'border-purple-400 shadow-lg' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{
                          background: userType === 'vendor' 
                            ? 'linear-gradient(135deg, #C4AAD915 0%, #9CAE8915 50%, #E8B4B415 100%)'
                            : 'transparent'
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <Building2 className={`w-6 h-6 ${userType === 'vendor' ? 'text-purple-600' : 'text-gray-400'}`} />
                          <div className="text-left">
                            <div className={`font-semibold ${userType === 'vendor' ? 'text-purple-600' : 'text-gray-700'}`}>Cultural Event Vendor</div>
                            <div className="text-xs text-gray-500">Event Venues, Caterers, Photographers</div>
                          </div>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUserType('couple')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          userType === 'couple' 
                            ? 'border-purple-400 shadow-lg' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{
                          background: userType === 'couple' 
                            ? 'linear-gradient(135deg, #C4AAD915 0%, #9CAE8915 50%, #E8B4B415 100%)'
                            : 'transparent'
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <Heart className={`w-6 h-6 ${userType === 'couple' ? 'text-purple-600' : 'text-gray-400'}`} />
                          <div className="text-left">
                            <div className={`font-semibold ${userType === 'couple' ? 'text-purple-600' : 'text-gray-700'}`}>Planning an Event</div>
                            <div className="text-xs text-gray-500">Cultural Event Organizers & Families</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {userType === 'vendor' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                        <input
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Your Business Name"
                          className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none text-lg transition-all"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none text-lg transition-all"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none text-lg transition-all"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    style={{
                      background: 'linear-gradient(135deg, #C4AAD9 0%, #9CAE89 50%, #E8B4B4 100%)'
                    }}
                  >
                    <span className="relative z-10">{isLoading ? 'Joining...' : 'Sign Up'}</span>
                    {!isLoading && <ArrowRight className="w-5 h-5 relative z-10" />}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By joining, you'll receive exclusive updates and early access to Mahfil.
                  </p>
                </form>
              )}
            </div>
            
            {/* Right Side - Benefits */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Founding Member Benefits</h4>
              
              {(userType === 'vendor' ? [
                { 
                  icon: Zap, 
                  title: "AI Business Growth Engine", 
                  description: "AI-powered insights help you identify new market opportunities and expand your business reach",
                  color: "#C4AAD9"
                },
                { 
                  icon: TrendingUp, 
                  title: "Market AI & Analytics", 
                  description: "Get real-time market insights, competitor analysis, and pricing optimization recommendations",
                  color: "#9CAE89"
                },
                { 
                  icon: Handshake, 
                  title: "Smart Customer Matching", 
                  description: "Our AI matches you with high-value customers based on your expertise, availability, and pricing",
                  color: "#E8B4B4"
                },
                { 
                  icon: Users, 
                  title: "Automated Lead Generation", 
                  description: "AI continuously finds and qualifies leads, so you focus on delivering exceptional service",
                  color: "#C4AAD9"
                },
                { 
                  icon: Star, 
                  title: "Founding Vendor Status", 
                  description: "Exclusive founding member badge and early access to premium AI features",
                  color: "#9CAE89"
                },
                { 
                  icon: Building2, 
                  title: "Revenue Optimization", 
                  description: "AI-driven pricing strategies and demand forecasting to maximize your earnings",
                  color: "#E8B4B4"
                }
              ] : [
                { 
                  icon: Zap, 
                  title: "AI-Powered Event Planning", 
                  description: "Intelligent planning tools that suggest the perfect vendors, venues, and services for your event",
                  color: "#C4AAD9"
                },
                { 
                  icon: TrendingUp, 
                  title: "Smart Budget Optimization", 
                  description: "AI analyzes your requirements and finds the best value options within your budget",
                  color: "#9CAE89"
                },
                { 
                  icon: Calendar, 
                  title: "Automated Coordination", 
                  description: "AI handles scheduling, communication, and coordination between all your vendors",
                  color: "#E8B4B4"
                },
                { 
                  icon: Users, 
                  title: "Vendor Quality Assurance", 
                  description: "AI-powered vetting ensures you only work with top-rated, verified professionals",
                  color: "#C4AAD9"
                },
                { 
                  icon: Star, 
                  title: "Founding Member Benefits", 
                  description: "Exclusive early access to premium AI features and priority customer support",
                  color: "#9CAE89"
                },
                { 
                  icon: Heart, 
                  title: "Personalized Experience", 
                  description: "AI learns your preferences to deliver increasingly personalized recommendations",
                  color: "#E8B4B4"
                }
              ]).map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl" style={{
                  backgroundColor: `${benefit.color}10`,
                  border: `1px solid ${benefit.color}20`
                }}>
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{backgroundColor: benefit.color}}
                  >
                    <benefit.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">{benefit.title}</h5>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="mt-8 p-6 rounded-xl" style={{
                background: 'linear-gradient(135deg, #C4AAD915 0%, #9CAE8915 50%, #E8B4B415 100%)',
                border: '1px solid #C4AAD930'
              }}>
                <div className="flex items-center space-x-3 mb-3">
                  <Clock className="w-5 h-5" style={{color: '#C4AAD9'}} />
                  <span className="font-semibold text-gray-900">Limited Time Offer</span>
                </div>
                <p className="text-sm text-gray-600">
                  Founding member benefits are only available to the first 100 members. 
                  Join now to secure your exclusive access and zero-fee period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <img 
                src="/logo400x400.png" 
                alt="Mahfil Logo" 
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-2xl font-bold text-white">Mahfil</h1>
              <span className="text-purple-400 text-sm">🇺🇸 Made in the USA</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">Building the future of events with AI</p>
              <p className="text-gray-500 text-sm">© 2025 Mahfil. All rights reserved. • AI-Powered Events Platform</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
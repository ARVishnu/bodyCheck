import React, { useEffect, useState } from 'react';
import { ArrowRight, AlertTriangle, CheckCircle, TrendingUp, Bell } from 'lucide-react';

const BeforeAfter = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('before-after-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (sectionHeight + windowHeight)));
          setScrollProgress(progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const beforeScenarios = [
    {
      icon: AlertTriangle,
      title: 'Unnoticed calcium buildup',
      description: 'Critical cardiovascular risks go undetected in routine scans',
      impact: 'Missed prevention opportunities'
    },
    {
      icon: AlertTriangle,
      title: 'Missed opportunities for lifestyle change',
      description: 'Patients unaware of actionable health metrics',
      impact: 'Progressive health decline'
    },
    {
      icon: AlertTriangle,
      title: 'Delayed clinical intervention',
      description: 'Manual analysis creates bottlenecks in patient care',
      impact: 'Treatment delays'
    }
  ];

  const afterScenarios = [
    {
      icon: CheckCircle,
      title: 'Actionable Agatston score with PCP notification',
      description: 'Automatic risk stratification with provider alerts',
      impact: 'Immediate clinical action'
    },
    {
      icon: TrendingUp,
      title: 'Tracked body composition with muscle loss insights',
      description: 'Comprehensive metabolic health monitoring',
      impact: 'Personalized interventions'
    },
    {
      icon: Bell,
      title: 'Proactive care coordination',
      description: 'Seamless integration with existing healthcare workflows',
      impact: 'Enhanced patient outcomes'
    }
  ];

  return (
    <section 
      id="before-after-section"
      className="py-32 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          ${scrollProgress < 0.5 
            ? `hsl(0, 0%, ${Math.max(20, 40 - scrollProgress * 40)}%)` 
            : `hsl(${Math.min(180, (scrollProgress - 0.5) * 360)}, 70%, ${Math.min(50, (scrollProgress - 0.5) * 100)}%)`
          } 0%, 
          ${scrollProgress < 0.5 
            ? `hsl(0, 0%, ${Math.max(10, 30 - scrollProgress * 40)}%)` 
            : `hsl(${Math.min(220, (scrollProgress - 0.5) * 440)}, 80%, ${Math.min(40, (scrollProgress - 0.5) * 80)}%)`
          } 100%)`
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: scrollProgress < 0.5 
              ? 'rgba(107, 114, 128, 0.1)' 
              : 'rgba(20, 184, 166, 0.2)',
            transform: `scale(${0.5 + scrollProgress * 0.5}) rotate(${scrollProgress * 180}deg)`
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: scrollProgress < 0.5 
              ? 'rgba(75, 85, 99, 0.1)' 
              : 'rgba(59, 130, 246, 0.2)',
            transform: `scale(${0.5 + scrollProgress * 0.5}) rotate(${-scrollProgress * 180}deg)`
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000 ${
            scrollProgress < 0.5 ? 'text-gray-300' : 'text-white'
          }`}>
            From Silence to Action
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full transition-all duration-1000"
            style={{
              background: scrollProgress < 0.5 
                ? 'rgba(156, 163, 175, 0.5)' 
                : 'linear-gradient(90deg, rgb(20, 184, 166), rgb(59, 130, 246))'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Before BodyCheck */}
            <div className={`space-y-8 transition-all duration-1000 ${
              scrollProgress < 0.5 ? 'opacity-100 transform translate-x-0' : 'opacity-50 transform -translate-x-8'
            }`}>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-red-400 mb-4">Before BodyCheck</h3>
                <p className="text-gray-300 text-lg">Healthcare gaps leaving patients at risk</p>
              </div>

              <div className="space-y-6">
                {beforeScenarios.map((scenario, index) => {
                  const Icon = scenario.icon;
                  return (
                    <div 
                      key={index}
                      className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-red-500/20 hover:border-red-400/40 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-500/20 rounded-xl">
                          <Icon className="w-6 h-6 text-red-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-200 mb-2">{scenario.title}</h4>
                          <p className="text-gray-400 mb-3">{scenario.description}</p>
                          <div className="text-sm text-red-400 font-medium">{scenario.impact}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Transformation Arrow */}
            <div className="flex justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 z-20">
              <div className={`transition-all duration-1000 ${
                scrollProgress > 0.3 ? 'opacity-100 scale-100' : 'opacity-50 scale-75'
              }`}>
                <div className="bg-white rounded-full p-6 shadow-2xl">
                  <ArrowRight className="w-12 h-12 text-teal-600" />
                </div>
              </div>
            </div>

            {/* After BodyCheck */}
            <div className={`space-y-8 transition-all duration-1000 ${
              scrollProgress > 0.5 ? 'opacity-100 transform translate-x-0' : 'opacity-50 transform translate-x-8'
            }`}>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-teal-400 mb-4">After BodyCheck</h3>
                <p className="text-gray-100 text-lg">Proactive care with AI-powered insights</p>
              </div>

              <div className="space-y-6">
                {afterScenarios.map((scenario, index) => {
                  const Icon = scenario.icon;
                  return (
                    <div 
                      key={index}
                      className="bg-slate-800/30 backdrop-blur rounded-2xl p-6 border border-teal-500/30 hover:border-teal-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-xl">
                          <Icon className="w-6 h-6 text-teal-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-2">{scenario.title}</h4>
                          <p className="text-gray-300 mb-3">{scenario.description}</p>
                          <div className="text-sm text-teal-400 font-medium">{scenario.impact}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur rounded-full px-8 py-4">
              <div className="text-sm text-gray-300">Transformation Progress</div>
              <div className="w-32 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-400 to-blue-500 transition-all duration-300 rounded-full"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
              <div className="text-sm font-bold text-white">{Math.round(scrollProgress * 100)}%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
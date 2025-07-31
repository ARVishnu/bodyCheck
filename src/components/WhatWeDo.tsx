import React, { useState } from 'react';
import { Heart, User, BarChart3, TrendingUp, Info, Activity, BarChart2, Users } from 'lucide-react';

const WhatWeDo = () => {
  const [activeTab, setActiveTab] = useState<'cardiovascular' | 'body'>('cardiovascular');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const cardiovascularAnalysis = [
    {
      id: 'agatston',
      title: 'Agatston Score',
      description: 'Calcified plaque burden in coronary arteries',
      value: '125',
      range: '0-400',
      status: 'moderate',
      details: 'Indicates moderate calcium buildup requiring monitoring'
    },
    {
      id: 'pericardial',
      title: 'Pericardial Fat',
      description: 'Fat tissue surrounding the heart',
      value: '95ml',
      range: '<100ml',
      status: 'normal',
      details: 'Within healthy range for cardiovascular protection'
    },
    {
      id: 'epicardial',
      title: 'Epicardial Fat',
      description: 'Fat directly on heart surface',
      value: '78ml',
      range: '<125ml',
      status: 'normal',
      details: 'Normal levels reduce inflammatory risk'
    }
  ];

  const bodyComposition = [
    {
      id: 'muscle',
      title: 'Muscle Mass',
      description: 'Skeletal muscle volume',
      value: '42.3kg',
      range: '35-50kg',
      status: 'good',
      details: 'Healthy muscle mass for metabolic function'
    },
    {
      id: 'vat',
      title: 'Visceral Fat',
      description: 'Internal abdominal fat',
      value: '156cm²',
      range: '<150cm²',
      status: 'elevated',
      details: 'Slightly elevated, lifestyle changes recommended'
    },
    {
      id: 'sat',
      title: 'Subcutaneous Fat',
      description: 'Fat under the skin',
      value: '245cm²',
      range: 'Variable',
      status: 'normal',
      details: 'Within expected range for body type'
    }
  ];


  const currentData = activeTab === 'cardiovascular' ? cardiovascularAnalysis : bodyComposition;

  return (
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
        What We Do
      </h2>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto">
        AI-powered precision analysis extracting critical health insights from your existing CT scans
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          icon: <Heart className="w-6 h-6 text-teal-600" />,
          title: "Cardiovascular Structure Measurement",
          description:
            "Cardiomegaly, coronary artery, mitral valve, aortic valve leaflet, aortic annulus, and aorta calcium scoring, cardiac segmentation",
        },
        {
          icon: <Activity className="w-6 h-6 text-teal-600" />,
          title: "Body Composition Analysis",
          description:
            "Bone attenuation, visceral and subcutaneous fat quantification, and sarcopenia",
        },
        {
          icon: <BarChart2 className="w-6 h-6 text-teal-600" />,
          title: "Quantitative CT Analysis",
          description:
            "Analyze CT scans of the chest or abdomen with or without IV contrast",
        },
        {
          icon: <Users className="w-6 h-6 text-teal-600" />,
          title: "Care Coordination",
          description:
            "Enable preventive and value-based care models to optimize patient outcomes",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-teal-300 group cursor-pointer transform hover:-translate-y-2"
        >
          <div className="p-3 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl w-fit mb-4 group-hover:from-teal-200 group-hover:to-blue-200 transition-colors">
            {item.icon}
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {item.title}
          </h3>
          <p className="text-slate-600 text-sm">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default WhatWeDo;
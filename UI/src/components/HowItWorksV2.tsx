import React, { useState } from 'react';
import { Upload, Cpu, FileText, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const HowItWorksV2 = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      icon: Upload,
      title: 'Upload CT Scan',
      description: 'Secure DICOM upload with automated quality checks',
      details: 'HIPAA-compliant cloud processing with end-to-end encryption. Supports all major CT formats and automatically validates image quality.',
      duration: '30 seconds'
    },
    {
      id: 2,
      icon: Cpu,
      title: 'AI Analysis',
      description: 'Advanced algorithms process your scan',
      details: 'Deep learning models trained on thousands of validated cases perform automated segmentation and quantitative analysis.',
      duration: '5 minutes'
    },
    {
      id: 3,
      icon: FileText,
      title: 'Generate Report',
      description: 'Comprehensive clinical summary created',
      details: 'Structured report with quantitative measurements, risk stratification, and clinical recommendations ready for review.',
      duration: '1 minute'
    }
  ];

  return (
    <section className="py-24 ">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Effortless from start to finish. Transform existing CT scans into actionable insights in minutes.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Process Steps */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setActiveStep(step.id)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-16 left-full transform translate-x-4 z-10">
                      <ArrowRight className="w-4 h-4 text-[#00B8A9] absolute -right-2 -top-2" />
                    </div>
                  )}

                  <div className={`bg-white/80 backdrop-blur rounded-2xl p-8 border transition-all duration-500 ${
                    activeStep === step.id 
                      ? 'border-[#00B8A9] shadow-2xl shadow-[#00B8A9]/20 transform -translate-y-4' 
                      : 'border-[#D9E2EC] hover:border-[#00B8A9]/60'
                  }`}>
                    {/* Step Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        activeStep === step.id 
                          ? 'bg-gradient-to-br from-[#00B8A9] to-[#002F6C]' 
                          : 'bg-[#E6F7F6]'
                      }`}>
                        <Icon className={`w-6 h-6 ${activeStep === step.id ? 'text-white' : 'text-[#00B8A9]'}`} />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[#6B7A90]">Step {step.id}</div>
                        <div className="flex items-center gap-2 text-sm text-[#00B8A9]">
                          <Clock className="w-4 h-4" />
                          {step.duration}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-[#002F6C] mb-4">{step.title}</h3>
                    <p className="text-[#3B4A6B] mb-6">{step.description}</p>

                    {/* Expanded Details */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      activeStep === step.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="bg-[#F5F7FA] rounded-lg p-4 border border-[#D9E2EC]">
                        <p className="text-sm text-[#6B7A90]">{step.details}</p>
                      </div>
                    </div>

                    {/* Visual Indicator */}
                    {/* <div className="mt-6">
                      <div className="w-full bg-[#E6F7F6] rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            activeStep === step.id 
                              ? 'bg-gradient-to-r from-[#00B8A9] to-[#002F6C] w-full' 
                              : 'bg-[#B2DFDB] w-1/4'
                          }`}
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Process Visualization */}
          <div className=" backdrop-blur rounded-2xl p-8 border border-[#D9E2EC]">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-jacarta mb-4">Complete Workflow</h3>
              <p className="text-[#6B7A90]">End-to-end process from CT scan to clinical action</p>
            </div>

            <div className="grid md:grid-cols-5 gap-4 items-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E6F7F6] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-8 h-8 text-[#00B8A9]" />
                </div>
                <div className="text-sm text-[#00B8A9] font-medium">DICOM Upload</div>
              </div>

              <ArrowRight className="w-6 h-6 text-[#B2DFDB] mx-auto hidden md:block" />

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00B8A9] to-[#002F6C] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm text-[#002F6C] font-medium">AI Processing</div>
              </div>

              <ArrowRight className="w-6 h-6 text-[#B2DFDB] mx-auto hidden md:block" />

              <div className="text-center">
                <div className="w-16 h-16 bg-[#002F6C] rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm text-[#002F6C] font-medium">Clinical Report</div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="bg-gradient-to-r from-[#00B8A9] to-[#002F6C] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-[#00B8A9]/25 transition-all duration-300 transform hover:scale-105">
                Learn More on Patient Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksV2;
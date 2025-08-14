import { ArrowRight, Brain, FileText, Upload, Users } from "lucide-react";

const HowItWorks = () => {
  return (
    <div>
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-jacarta mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and accurate AI analysis
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                icon: <Upload className="w-8 h-8" />,
                title: "Upload CT Scan",
                description:
                  "Securely upload DICOM files through our HIPAA-compliant platform",
              },
              {
                step: "2",
                icon: <Brain className="w-8 h-8" />,
                title: "AI Analysis",
                description:
                  "Advanced AI processes heart and body composition simultaneously",
              },
              {
                step: "3",
                icon: <FileText className="w-8 h-8" />,
                title: "Report Generation",
                description:
                  "Comprehensive PDF reports with 3D models and clinical insights",
              },
              {
                step: "4",
                icon: <Users className="w-8 h-8" />,
                title: "Doctor Review",
                description:
                  "Healthcare professionals review and track patient progress",
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div
                  className="bg-white rounded-xl p-6 shadow-sm border border-[#D9E2EC]"
                  style={{ height: "100%" }}
                >
                  <div className="bg-[#002F6C] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <div className="text-[#00B8A9] mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-jacarta mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-7 transform -translate-y-1/2 text-[#D9E2EC] w-6 h-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

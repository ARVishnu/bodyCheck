import { Play, Heart, Activity } from "lucide-react";
import { useState } from "react";
import video1 from "../Videos/case141_original.mp4";
import video2 from "../Videos/case141_seg.mp4";
import video3 from "../Videos/case141_segBody.mp4";



const LiveReport = () => {
  const [activeReport, setActiveReport] = useState<"cardiac" | "body">(
    "cardiac"
  );
  const calciumScores = [
    {
      name: "CAC",
      region: "Coronary Arteries Calcium",
      agatstonScore: 366.684048,
      band: 3,
    },
    {
      name: "AAC",
      region: "Abdominal Aortic Calcium",
      agatstonScore: 222.041725,
      band: 3,
    },
    {
      name: "TAC",
      region: "Thoracic Aortic Calcium",
      agatstonScore: 2410.938858,
      band: 4,
    },
    {
      name: "AAC",
      region: "Aortic Annulus Calcium",
      agatstonScore: 1036.311459,
      band: 4,
    },
    {
      name: "MAC",
      region: "Mitral Annulus Calcium",
      agatstonScore: 287.883751,
      band: 3,
    },
    {
      name: "AVLC",
      region: "Aortic Valve Leaflets Calcium",
      agatstonScore: 558.256325,
      band: 4,
    },
  ];
  const abdominalData = [
    { label: "Liver Attenuation", unit: "[HU]", value: 12.02 },
    { label: "Bone Density at L1", unit: "[HU]", value: 227.81 },
    { label: "Abdominal Muscle Area at L3", unit: "[cm²]", value: 185.55 },
    { label: "Abdominal Muscle Quality at L3", unit: "[HU]", value: 33.53 },
    { label: "Abdominal Muscle Fat Area at L3", unit: "[cm²]", value: 203.55 },
    {
      label: "Abdominal Muscle Fat Density at L3",
      unit: "[HU]",
      value: -89.34,
    },
    {
      label: "Abdominal Subcutaneous Fat Area at L3",
      unit: "[cm²]",
      value: 238.77,
    },
    {
      label: "Abdominal Subcutaneous Fat Density at L3",
      unit: "[HU]",
      value: -93.31,
    },
    { label: "Abdominal Circumference at L3", unit: "[cm]", value: 125.58 },
  ];

  return (
    <div>   
      <section className="py-16 bg-[#F5F7FA]">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-jacarta mb-4">
              Live Report & Dashboard Preview
            </h2>
            <p className="text-xl text-gray-600">
              See our AI analysis in action
            </p>
          </div>

          {/* Report Type Toggle */}
          <div className="flex justify-center">
            <div className="bg-white rounded-lg p-1 flex border border-turquoise">
              <button
                onClick={() => setActiveReport("cardiac")}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  activeReport === "cardiac"
                    ? "bg-[#002F6C] text-white shadow-lg"
                    : "text-jacarta hover:bg-white/50"
                }`}
              >
                <Heart className="w-5 h-5 inline mr-2" />
                Cardiac Report
              </button>
              <button
                onClick={() => setActiveReport("body")}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  activeReport === "body"
                    ? "bg-[#002F6C] text-white shadow-lg"
                    : "text-jacarta hover:bg-white/50"
                }`}
              >
                <Activity className="w-5 h-5 inline mr-2" />
                Body Composition Report
              </button>
            </div>
          </div>

          <div className="container mx-auto mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {activeReport === "cardiac" ? (
                <>
                  {/* Cardiac Report Preview */}

                  {[
                    {
                      title: "Raw CT Scan",
                      description:
                        "Original cardiac CT slice showing coronary arteries",
                      video: video1,
                    },
                    {
                      title: "AI Detection",
                      description:
                        "Automated Coronary Arteries and Aortic calcium identification and segmentation",
                      video: video2,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-6 text-center"
                    >
                      <div
                        className="bg-white rounded-lg mb-4 flex items-center justify-center"
                        style={{ height: "28rem" }}
                      >
                        {item.video ? (
                          <video
                            src={item.video}
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <Play className="w-16 h-16 text-gray-400" />
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                  <div className="text-center">
                    <div
                      className="bg-white rounded-lg p-4 shadow-md flex flex-col border-t-8 border-bright-turquoise dark:border-bay-of-many relative overflow-hidden"
                      style={{ height: "100%" }}
                    >
                      {/* Decorative Gradient Bar */}
                      <h3 className="text-lg font-extrabold text-jacarta  mb-4 text-left ">
                        Agatston Score Breakdown by Artery
                      </h3>
                      <div className="flex-grow overflow-y-auto">
                        <table className="w-full text-left text-sm rounded-lg overflow-hidden">
                          <thead>
                            <tr className="text-xs uppercase bg-blue-50 text-jacarta">
                              <th className="py-2 px-2 font-bold"></th>
                              <th className="py-2 px-2 font-bold">Full Name</th>
                              <th className="py-2 px-2 font-bold text-right">
                                Score
                              </th>
                              <th className="py-2 px-2 font-bold text-right">
                                Band
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {calciumScores.map((item, idx) => (
                              <tr
                                key={idx}
                                className="border-b border-gray-200"
                              >
                                <td className="py-2 px-2 font-bold text-jacarta flex items-center gap-2 ">
                                  {item.name}
                                </td>
                                <td className="py-2 px-2 text-gray-600 ">
                                  {item.region}
                                </td>
                                <td className="py-2 px-2 text-right font-semibold text-gray-800 ">
                                  {item.agatstonScore.toFixed(2)}
                                </td>
                                <td className="py-2 px-2 text-right ">
                                  <span className="inline-block min-w-[3.5rem] text-xs font-semibold bg-bright-turquoise/10 dark:bg-bright-turquoise/20  rounded-full px-2 py-0.5">
                                    {item.band}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Body Composition Report Preview */}
                  <div className="text-center">
                    <div
                      className="bg-white rounded-lg p-4 shadow-md flex flex-col border-t-8 border-bright-turquoise dark:border-bay-of-many relative overflow-hidden"
                      style={{ height: "100%" }}
                    >
                      {/* Decorative Gradient Bar */}
                      <h3 className="text-lg font-extrabold text-jacarta  mb-4 text-left ">
                        Body Composition Analysis
                      </h3>
                      <div className="flex-grow overflow-y-auto">
                        <table className="w-full text-left text-sm rounded-lg overflow-hidden">
                          <thead>
                            <tr className="text-xs uppercase bg-blue-50 text-jacarta">
                              <th className="py-2 px-2 font-bold">
                                Clinical Parameter
                              </th>
                              <th className="py-2 px-2 font-bold text-right">
                                Unit
                              </th>
                              <th className="py-2 px-2 font-bold text-right">
                                Score
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {abdominalData.map((item, idx) => (
                              <tr
                                key={idx}
                                className="border-b border-gray-200"
                              >
                                <td className="py-2 px-2 text-gray-600 ">
                                  {item.label}
                                </td>
                                <td className="py-2 px-2 text-right font-semibold text-gray-800 ">
                                  {item.unit}
                                </td>
                                <td className="py-2 px-2 text-right ">
                                  <span className="inline-block min-w-[3.5rem] text-xs font-semibold bg-bright-turquoise/10 dark:bg-bright-turquoise/20  rounded-full px-2 py-0.5">
                                    {item.value}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {[
                    {
                      title: "Original CT Slice",
                      description:
                        "Axial CT image at L3 used as the anatomical reference for body composition assessment.",
                      video: video1,
                    },
                    {
                      title: "AI-Segmented Output",
                      description:
                        "Automated segmentation of muscle and fat compartments for accurate metabolic pro",
                      video: video3,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-6 text-center"
                    >
                      <div
                        className="bg-white rounded-lg mb-4 flex items-center justify-center"
                        style={{ height: "28rem" }}
                      >
                        {item.video ? (
                          <video
                            src={item.video}
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <Play className="w-16 h-16 text-gray-400" />
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiveReport;

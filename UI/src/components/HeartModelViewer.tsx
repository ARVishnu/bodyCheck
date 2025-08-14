import React, { useState } from 'react';
import { RotateCcw, Eye, EyeOff, Info } from 'lucide-react';

interface HeartModelViewerProps {
  patientData?: {
    agatstonScore: number;
    ladScore: number;
    rcaScore: number;
    lcxScore: number;
    lmScore: number;
  };
}

export function HeartModelViewer({ patientData }: HeartModelViewerProps) {
  const [highlightedArtery, setHighlightedArtery] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1);

  const arteries = [
    { id: 'LAD', name: 'Left Anterior Descending', color: '#ef4444', score: patientData?.ladScore || 124 },
    { id: 'RCA', name: 'Right Coronary Artery', color: '#f97316', score: patientData?.rcaScore || 78 },
    { id: 'LCX', name: 'Left Circumflex', color: '#eab308', score: patientData?.lcxScore || 32 },
    { id: 'LM', name: 'Left Main', color: '#22c55e', score: patientData?.lmScore || 11 }
  ];

  const handleReset = () => {
    setHighlightedArtery(null);
    setRotationSpeed(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-cloud-burst p-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-cloud-burst">3D Heart Model</h3>
          <p className="text-sm text-jacarta">Interactive visualization with calcium deposits</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowLabels(!showLabels)}
            className="flex items-center px-3 py-2 text-sm border border-calypso rounded-md hover:bg-bright-turquoise transition-colors"
          >
            {showLabels ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
            {showLabels ? 'Hide Labels' : 'Show Labels'}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center px-3 py-2 text-sm border border-calypso rounded-md hover:bg-bright-turquoise transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset View
          </button>
        </div>
      </div>

      {/* 3D Viewer Container */}
      <div className="relative bg-gradient-to-br from-dodger-blue to-bright-turquoise rounded-lg h-96 mb-6 overflow-hidden">
        {/* Mock 3D Heart - In production, this would be a WebGL/Three.js component */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Heart Shape */}
            <div 
              className={`w-32 h-32 bg-red-100 rounded-full relative transition-all duration-500 transform ${
                rotationSpeed > 1 ? 'animate-spin' : 'animate-pulse'
              }`}
              style={{ 
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                transform: `scale(${highlightedArtery ? 1.1 : 1})`,
              }}
            >
              {/* Coronary Arteries */}
              {arteries.map((artery, index) => (
                <div
                  key={artery.id}
                  className={`absolute w-3 h-12 rounded-full cursor-pointer transition-all duration-300 ${
                    highlightedArtery === artery.id ? 'ring-4 ring-blue-400' : ''
                  }`}
                  style={{
                    backgroundColor: artery.color,
                    top: `${20 + index * 15}%`,
                    left: `${30 + (index % 2) * 40}%`,
                    opacity: highlightedArtery && highlightedArtery !== artery.id ? 0.3 : 1,
                    transform: `rotate(${index * 45}deg)`,
                  }}
                  onClick={() => setHighlightedArtery(
                    highlightedArtery === artery.id ? null : artery.id
                  )}
                  title={`${artery.name} - Score: ${artery.score}`}
                />
              ))}

              {/* Calcium Deposits */}
              {patientData && (
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                        opacity: Math.random() * 0.7 + 0.3,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Labels */}
            {showLabels && (
              <div className="absolute inset-0 pointer-events-none">
                {arteries.map((artery, index) => (
                  <div
                    key={`label-${artery.id}`}
                    className={`absolute text-xs font-medium px-2 py-1 rounded shadow-lg transition-all duration-300 ${
                      highlightedArtery === artery.id 
                        ? 'bg-blue-600 text-white scale-110' 
                        : 'bg-white text-gray-700'
                    }`}
                    style={{
                      top: `${10 + index * 20}%`,
                      right: `${-10 + (index % 2) * 20}%`,
                    }}
                  >
                    {artery.id}: {artery.score}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Controls Overlay */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs text-gray-600">
          <div className="space-y-1">
            <div>🖱️ Click arteries to highlight</div>
            <div>🔄 Drag to rotate (simulated)</div>
            <div>📏 Scroll to zoom (simulated)</div>
          </div>
        </div>
      </div>

      {/* Artery Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {arteries.map((artery) => (
          <button
            key={artery.id}
            onClick={() => setHighlightedArtery(
              highlightedArtery === artery.id ? null : artery.id
            )}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
              highlightedArtery === artery.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: artery.color }}
              />
              <div className="text-left">
                <div className="font-medium text-gray-900">{artery.id}</div>
                <div className="text-xs text-gray-500">{artery.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm">{artery.score}</div>
              <div className="text-xs text-gray-500">Agatston</div>
            </div>
          </button>
        ))}
      </div>

      {/* Clinical Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Educational Visualization</p>
            <p>
              This 3D model is a simplified representation for educational purposes. 
              Consult the detailed report and clinical interpretation for diagnostic accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
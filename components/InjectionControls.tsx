import React from 'react';
import { Settings2, Wand2 } from 'lucide-react';
import { InjectionConfig, InjectionStyle } from '../types';

interface InjectionControlsProps {
  config: InjectionConfig;
  setConfig: React.Dispatch<React.SetStateAction<InjectionConfig>>;
  onGenerate: () => void;
  isGenerating: boolean;
  generatedPreview: string | null;
  isEnabled: boolean;
}

const STYLES: { id: InjectionStyle; label: string }[] = [
  { id: 'persuasive', label: 'Persuasive Marketing' },
  { id: 'social_proof', label: 'Social Proof / Reviews' },
  { id: 'value_reframing', label: 'Value Reframing' },
  { id: 'authority_adjacent', label: 'Authority Recommendation' },
  { id: 'comparative', label: 'Comparative Attacks' },
  { id: 'urgency', label: 'Urgency / Scarcity' },
];

const InjectionControls: React.FC<InjectionControlsProps> = ({ 
  config, 
  setConfig, 
  onGenerate, 
  isGenerating, 
  generatedPreview,
  isEnabled
}) => {
  
  const toggleStyle = (style: InjectionStyle) => {
    setConfig(prev => {
      const exists = prev.styles.includes(style);
      return {
        ...prev,
        styles: exists 
          ? prev.styles.filter(s => s !== style)
          : [...prev.styles, style]
      };
    });
  };

  if (!isEnabled) {
      return (
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 text-slate-500 text-sm text-center">
              Switch to "Adversarial Environment" to enable injection controls.
          </div>
      );
  }

  return (
    <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-4">
      <div className="flex items-center gap-2 text-slate-200 border-b border-slate-800 pb-2">
        <Settings2 className="w-4 h-4" />
        <h3 className="font-bold text-sm uppercase">Researcher Controls (Injection)</h3>
      </div>

      {/* Styles */}
      <div>
        <label className="text-xs font-bold text-slate-500 mb-2 block">Injection Style</label>
        <div className="grid grid-cols-2 gap-2">
          {STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => toggleStyle(style.id)}
              className={`text-xs p-2 rounded border text-left transition-colors ${
                config.styles.includes(style.id)
                  ? 'bg-blue-900/40 border-blue-500/50 text-blue-200'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Intensity */}
      <div>
        <div className="flex justify-between mb-1">
            <label className="text-xs font-bold text-slate-500">Intensity</label>
            <span className="text-xs text-slate-300 capitalize">{config.intensity}</span>
        </div>
        <input 
            type="range" 
            min="0" max="2" 
            step="1"
            value={config.intensity === 'low' ? 0 : config.intensity === 'medium' ? 1 : 2}
            onChange={(e) => {
                const val = parseInt(e.target.value);
                const levels: InjectionConfig['intensity'][] = ['low', 'medium', 'high'];
                setConfig(prev => ({ ...prev, intensity: levels[val] }));
            }}
            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-600 mt-1">
            <span>Low</span><span>High</span>
        </div>
      </div>

      {/* Guidance */}
      <div>
        <label className="text-xs font-bold text-slate-500 mb-2 block">Optional Guidance (Not seen by Agent)</label>
        <textarea
            value={config.guidance}
            onChange={(e) => setConfig(prev => ({ ...prev, guidance: e.target.value }))}
            placeholder="E.g., Focus on durability over price..."
            className="w-full h-20 bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Generator Action */}
      <button 
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full py-2 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/30 text-purple-300 text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
      >
        {isGenerating ? <span className="animate-spin">⏳</span> : <Wand2 className="w-3 h-3" />}
        {generatedPreview ? "Regenerate Adversarial Description" : "Generate Adversarial Description"}
      </button>

      {generatedPreview && (
          <div className="mt-2 p-2 bg-red-900/10 border border-red-900/20 rounded">
              <span className="text-[10px] text-red-400 font-bold block mb-1">CURRENT INJECTION PREVIEW</span>
              <p className="text-[10px] text-slate-400 line-clamp-3 italic">"{generatedPreview}"</p>
          </div>
      )}
    </div>
  );
};

export default InjectionControls;

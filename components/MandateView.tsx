import React from 'react';
import { ShieldCheck, Lock, Clock, ListChecks } from 'lucide-react';
import { IntentMandate } from '../types';

interface MandateViewProps {
  mandate: IntentMandate;
  userIntent: string;
}

const MandateView: React.FC<MandateViewProps> = ({ mandate, userIntent }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-3 text-emerald-400">
        <ShieldCheck className="w-5 h-5" />
        <h2 className="font-semibold text-lg">AP2 Authorization Layer (The Guardrail)</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">User Natural Language Intent</label>
          <div className="p-3 bg-slate-900/50 rounded border-l-2 border-blue-500 mt-1 text-slate-200 italic">
            "{userIntent}"
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
             <Lock className="w-3 h-3 text-slate-500" />
             <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">Immutable Mandate</label>
          </div>
         
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="bg-slate-900 p-2 rounded text-sm text-slate-300">
              <span className="text-slate-500 block text-xs">Max Price</span>
              {mandate.currency} {mandate.maxPrice.toFixed(2)}
            </div>
            <div className="bg-slate-900 p-2 rounded text-sm text-slate-300">
               <span className="text-slate-500 block text-xs">Category</span>
               {mandate.category}
            </div>
             <div className="bg-slate-900 p-2 rounded text-sm text-slate-300">
               <span className="text-slate-500 block text-xs flex items-center gap-1"><Clock className="w-3 h-3"/> Expiry</span>
               {new Date(mandate.expiryTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
             <div className="bg-slate-900 p-2 rounded text-sm text-slate-300">
               <span className="text-slate-500 block text-xs flex items-center gap-1"><ListChecks className="w-3 h-3"/> Required</span>
               {mandate.requiredFeatures.length > 0 ? mandate.requiredFeatures[0] : 'None'}
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            * The agent cannot modify these rules. Any purchase violating these will be blocked by the system kernel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MandateView;
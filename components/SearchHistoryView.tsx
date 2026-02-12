import React, { useRef, useEffect } from 'react';
import { Search, Package } from 'lucide-react';
import { SearchRecord } from '../types';

interface SearchHistoryViewProps {
  history: SearchRecord[];
}

const SearchHistoryView: React.FC<SearchHistoryViewProps> = ({ history }) => {
   const scrollRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [history]);

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden font-mono text-sm">
      <div className="bg-slate-900 p-3 border-b border-slate-800 flex items-center gap-2">
        <Search className="w-4 h-4 text-blue-400" />
        <span className="font-semibold text-slate-300">Agent Search History</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {history.length === 0 && (
            <div className="text-slate-600 italic text-center mt-10">No searches performed yet.</div>
        )}
        {history.map((record, idx) => (
          <div key={record.id} className="animate-in slide-in-from-bottom-2 fade-in duration-300 border border-slate-800 bg-slate-900/50 rounded-lg overflow-hidden">
            <div className="bg-slate-900 p-2 flex justify-between items-center border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Query #{idx + 1}</span>
                    <span className="text-blue-300 font-bold">"{record.query}"</span>
                </div>
                <span className="text-[10px] text-slate-600">{record.timestamp.toLocaleTimeString()}</span>
            </div>
            <div className="p-2 space-y-1">
                {record.results.length === 0 ? (
                    <div className="text-xs text-slate-500 italic">No results found.</div>
                ) : (
                    record.results.map(product => (
                        <div key={product.id} className="flex items-center justify-between text-xs text-slate-400 p-1 hover:bg-slate-800/50 rounded transition-colors">
                            <div className="flex items-center gap-2">
                                <Package className="w-3 h-3 text-slate-600" />
                                <span>{product.name}</span>
                            </div>
                            <span>${product.price.toFixed(2)}</span>
                        </div>
                    ))
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistoryView;
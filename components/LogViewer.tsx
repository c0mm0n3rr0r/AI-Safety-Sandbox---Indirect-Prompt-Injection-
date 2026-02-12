import React, { useEffect, useRef } from 'react';
import { Terminal, Cpu, CheckCircle, XCircle } from 'lucide-react';
import { LogEntry } from '../types';

interface LogViewerProps {
  logs: LogEntry[];
}

const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden font-mono text-sm">
      <div className="bg-slate-900 p-3 border-b border-slate-800 flex items-center gap-2">
        <Terminal className="w-4 h-4 text-purple-400" />
        <span className="font-semibold text-slate-300">Agent Reasoning Log</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {logs.length === 0 && (
            <div className="text-slate-600 italic text-center mt-10">Waiting for agent to start...</div>
        )}
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 animate-fade-in">
            <div className="mt-1 shrink-0">
               {log.actor === 'Agent' && <Cpu className="w-4 h-4 text-blue-400" />}
               {log.actor === 'System' && <div className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">S</div>}
               {log.actor === 'Tool' && <div className="w-4 h-4 rounded-full bg-orange-900/50 flex items-center justify-center text-[10px] font-bold text-orange-400">T</div>}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase ${
                        log.actor === 'Agent' ? 'text-blue-400' : 
                        log.actor === 'Tool' ? 'text-orange-400' : 'text-slate-500'
                    }`}>
                        {log.actor}
                    </span>
                    <span className="text-[10px] text-slate-600">{log.timestamp.toLocaleTimeString()}</span>
                </div>
                <div className={`p-2 rounded ${
                    log.type === 'error' ? 'bg-red-900/20 text-red-300 border border-red-900/30' :
                    log.type === 'success' ? 'bg-green-900/20 text-green-300 border border-green-900/30' :
                    log.type === 'action' ? 'bg-slate-800 text-slate-200' :
                    'text-slate-400'
                }`}>
                    {log.message}
                    {log.details && (
                        <div className="mt-2 p-2 bg-black/30 rounded text-xs font-mono text-slate-500 whitespace-pre-wrap border border-white/5">
                            {log.details}
                        </div>
                    )}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogViewer;


import React, { useState } from 'react';
import { ShoppingBag, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  isAdversarialMode: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, isAdversarialMode }) => {
  const [showStealthData, setShowStealthData] = useState(false);

  const sanitizeDescription = (desc: string) => {
    if (showStealthData) return desc;
    // Remove everything between the stealth delimiters
    return desc.replace(/\[STEALTH_DATA_START\][\s\S]*?\[STEALTH_DATA_END\]/g, '').trim();
  };

  return (
    <div className="bg-white text-slate-900 rounded-lg p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-slate-700" />
            <h2 className="font-bold text-lg">Mock Shop</h2>
        </div>
        <div className="flex items-center gap-2">
            {isAdversarialMode && (
                <button 
                  onClick={() => setShowStealthData(!showStealthData)}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                    showStealthData ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                  title={showStealthData ? "Hide Hidden Payloads" : "Show Hidden Payloads"}
                >
                  {showStealthData ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {showStealthData ? "DEBUG VIEW" : "USER VIEW"}
                </button>
            )}
            {isAdversarialMode ? (
                 <span className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded flex items-center gap-1 border border-red-200 uppercase">
                    <AlertTriangle className="w-3 h-3" />
                    Poisoned
                 </span>
            ) : (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded border border-green-200 uppercase">
                    Clean
                 </span>
            )}
        </div>
      </div>
      
      <div className="space-y-4">
        {products.map((product) => {
          const sanitizedDesc = sanitizeDescription(product.description);
          return (
            <div key={product.id} className={`p-4 border rounded-lg hover:shadow-sm transition-all ${product.isAdversarial ? 'border-red-100 bg-red-50/30' : 'border-slate-100 bg-slate-50/30'}`}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-base text-slate-800">{product.name}</h3>
                <span className="font-mono font-bold text-emerald-700">${product.price.toFixed(2)}</span>
              </div>
              <div className="text-[10px] text-slate-400 mb-2 font-mono uppercase tracking-wide">SKU: {product.id}</div>
              
              <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {sanitizedDesc || <span className="italic text-slate-400 text-xs">No visible description available.</span>}
                
                {showStealthData && product.description.includes('[STEALTH_DATA_START]') && (
                   <div className="mt-2 p-2 bg-amber-50 border border-dashed border-amber-200 rounded text-xs text-amber-800 font-mono">
                      <div className="text-[10px] font-bold text-amber-600 mb-1">DETACHED ADVERSARIAL PAYLOAD:</div>
                      {product.description.match(/\[STEALTH_DATA_START\]([\s\S]*?)\[STEALTH_DATA_END\]/)?.[1] || ""}
                   </div>
                )}
              </div>

              {product.isAdversarial && !showStealthData && (
                  <div className="mt-2 text-[10px] text-slate-300 italic">
                      Verified Listing
                  </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;

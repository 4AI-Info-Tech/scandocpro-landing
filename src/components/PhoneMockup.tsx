import { Scan, Zap, Sparkles } from 'lucide-react';

export function PhoneMockup() {
  return (
    <div className="relative">
      {/* Phone Frame - No notch design */}
      <div className="w-72 sm:w-80 bg-gray-900 dark:bg-black rounded-[2.5rem] p-3 shadow-2xl ring-1 ring-gray-800">
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden relative">
          {/* Screen Content */}
          <div className="aspect-[9/19] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 relative">
            {/* Status Bar Area */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-black/5 dark:bg-white/5 z-10" />
            
            {/* Camera UI */}
            <div className="absolute inset-0 flex items-center justify-center pt-8">
              <div className="w-64 h-80 border-2 border-accent-400 rounded-lg relative animate-pulse-slow">
                {/* Corner Markers */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-accent-500" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-accent-500" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-accent-500" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-accent-500" />
                
                {/* Document Preview */}
                <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded shadow-sm flex flex-col p-3">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-1" />
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-4" />
                  <div className="flex-1 bg-gray-50 dark:bg-gray-900/50 rounded border border-dashed border-gray-300 dark:border-gray-600" />
                </div>
              </div>
            </div>
            
            {/* UI Elements */}
            <div className="absolute top-10 left-4 right-4 flex justify-between items-center">
              <div className="w-8 h-8 bg-black/20 dark:bg-white/10 rounded-full flex items-center justify-center">
                <Scan className="w-4 h-4 text-white" />
              </div>
              <div className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-black/50 px-2 py-1 rounded-full">
                Auto
              </div>
              <div className="w-8 h-8 bg-black/20 dark:bg-white/10 rounded-full" />
            </div>
            
            {/* Shutter Button */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <div className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-700 shadow-lg bg-white/20 backdrop-blur flex items-center justify-center">
                <div className="w-12 h-12 bg-white dark:bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 animate-bounce" style={{ animationDuration: '3s' }}>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mr-3">
            <Sparkles className="w-5 h-5 text-accent-600 dark:text-accent-400" />
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Edge Detection</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">Active</div>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 animate-bounce" style={{ animationDuration: '4s' }}>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-3">
            <Zap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">AI Enhancement</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">Applied</div>
          </div>
        </div>
      </div>
    </div>
  );
}

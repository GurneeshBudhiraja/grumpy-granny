import { useClickSound } from './hooks/useClickSound';
import { useKeyboardSound } from './hooks/useKeyboardSound';

export const App = () => {
  // Add global click sound effect
  useClickSound();

  // Add global keyboard sound effect
  useKeyboardSound();

  return (
    <div className="h-screen w-full relative overflow-hidden flex justify-center items-center bg-black">
      {/* overlay filter */}
      <div
        className="absolute inset-0 z-50 opacity-20"
        style={{ backgroundImage: 'url(/overlay-filter.png)' }}
      />
      
      {/* Wall Background Container */}
      <div className="relative">
        {/* Wall Background - Full Viewport Coverage */}
        <div
          className="bg-conic bg-center bg-no-repeat aspect-[5/3] min-h-[90vh] max-w-4xl"
          style={{ backgroundImage: 'url(/wall-background.png)' }}
        >
          {/* Table at bottom of wall */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-16 bg-gradient-to-b from-amber-900 to-amber-800 rounded-t-lg shadow-2xl">
            {/* Table surface with wood grain effect */}
            <div className="w-full h-full bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-t-lg border-t-2 border-amber-600">
              {/* Table edge highlight */}
              <div className="w-full h-1 bg-amber-600 rounded-t-lg"></div>
            </div>
            {/* Table legs */}
            <div className="absolute -bottom-8 left-4 w-3 h-8 bg-amber-900 rounded-b"></div>
            <div className="absolute -bottom-8 right-4 w-3 h-8 bg-amber-900 rounded-b"></div>
          </div>
        </div>

        {/* Old Style Monitor - Positioned on table */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
          {/* Monitor Base */}
          <div className="w-80 h-64 bg-gradient-to-b from-gray-300 to-gray-500 rounded-lg shadow-2xl border-4 border-gray-400">
            {/* Monitor Bezel */}
            <div className="w-full h-full p-4 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg">
              {/* Screen Area with CRT curve effect */}
              <div className="w-full h-full bg-black rounded-lg shadow-inner border-2 border-gray-600 relative overflow-hidden">
                {/* CRT Screen curvature effect */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-20 rounded-lg"></div>
                
                {/* Scanlines effect */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-b from-transparent via-green-500 to-transparent bg-repeat-y" 
                       style={{ backgroundSize: '100% 4px' }}></div>
                </div>

                {/* Terminal Content */}
                <div className="relative z-10 p-4 font-mono text-green-400 text-sm leading-relaxed">
                  <div className="mb-2">
                    <span className="text-green-300">C:\WINDOWS&gt;</span>
                    <span className="ml-1 animate-pulse">_</span>
                  </div>
                  <div className="mb-1 text-green-500">Microsoft Windows [Version 4.10.1998]</div>
                  <div className="mb-1 text-green-500">(C) Copyright Microsoft Corp 1981-1998.</div>
                  <div className="mb-3"></div>
                  <div className="mb-1">C:\WINDOWS&gt;dir</div>
                  <div className="mb-1 text-green-300">Volume in drive C has no label.</div>
                  <div className="mb-1 text-green-300">Directory of C:\WINDOWS</div>
                  <div className="mb-3"></div>
                  <div className="mb-1">SYSTEM       &lt;DIR&gt;        01-01-98  12:00a</div>
                  <div className="mb-1">TEMP         &lt;DIR&gt;        01-01-98  12:00a</div>
                  <div className="mb-1">GRANNY.EXE   2,048,576   01-01-98  12:00a</div>
                  <div className="mb-3"></div>
                  <div className="mb-1">C:\WINDOWS&gt;granny.exe</div>
                  <div className="text-red-400 animate-pulse">Loading Grumpy Granny...</div>
                </div>

                {/* Screen glow effect */}
                <div className="absolute inset-0 bg-green-400 opacity-5 rounded-lg animate-pulse"></div>
              </div>
            </div>
            
            {/* Monitor stand */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b-lg"></div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
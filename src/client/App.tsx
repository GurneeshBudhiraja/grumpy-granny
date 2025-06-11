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
          className="bg-conic bg-center bg-no-repeat aspect-[5/3] min-h-[90vh] max-w-6xl"
          style={{ backgroundImage: 'url(/wall-background.png)' }}
        >
          {/* Table at bottom of wall - wider to support larger monitor */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5/6 h-20 bg-gradient-to-b from-amber-900 to-amber-800 rounded-t-lg shadow-2xl">
            {/* Table surface with wood grain effect */}
            <div className="w-full h-full bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-t-lg border-t-2 border-amber-600">
              {/* Table edge highlight */}
              <div className="w-full h-1 bg-amber-600 rounded-t-lg"></div>
              {/* Wood grain lines */}
              <div className="absolute top-2 left-0 w-full h-px bg-amber-600 opacity-30"></div>
              <div className="absolute top-4 left-0 w-full h-px bg-amber-600 opacity-20"></div>
            </div>
            {/* Table legs - more of them for wider table */}
            <div className="absolute -bottom-10 left-8 w-4 h-10 bg-amber-900 rounded-b shadow-lg"></div>
            <div className="absolute -bottom-10 left-1/4 w-4 h-10 bg-amber-900 rounded-b shadow-lg"></div>
            <div className="absolute -bottom-10 right-1/4 w-4 h-10 bg-amber-900 rounded-b shadow-lg"></div>
            <div className="absolute -bottom-10 right-8 w-4 h-10 bg-amber-900 rounded-b shadow-lg"></div>
          </div>
        </div>

        {/* Vintage CRT Monitor - Much Wider and Taller */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          {/* Monitor Housing - Vintage beige/cream color */}
          <div className="w-[600px] h-[400px] bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl shadow-2xl border-4 border-amber-200 relative">
            {/* Vintage monitor texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 rounded-2xl opacity-80"></div>
            
            {/* Monitor Brand Label */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-amber-800 text-amber-100 px-4 py-1 rounded text-xs font-bold tracking-wider">
              COMPAQ
            </div>

            {/* Monitor Bezel - Thick vintage style */}
            <div className="absolute top-12 left-6 right-6 bottom-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-inner border-2 border-gray-700">
              {/* Inner bezel */}
              <div className="w-full h-full p-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg">
                {/* CRT Screen with deep curve */}
                <div className="w-full h-full bg-black rounded-lg shadow-inner border-2 border-gray-900 relative overflow-hidden"
                     style={{ 
                       borderRadius: '12px',
                       boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8), inset 0 0 100px rgba(0,0,0,0.4)'
                     }}>
                  
                  {/* CRT Screen curvature and reflection effects */}
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-30 rounded-lg"></div>
                  <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white to-transparent opacity-5 rounded-t-lg"></div>
                  <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-white to-transparent opacity-3 rounded-l-lg"></div>
                  
                  {/* Scanlines effect - more pronounced */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <div className="w-full h-full bg-repeat-y" 
                         style={{ 
                           backgroundImage: 'linear-gradient(transparent 50%, rgba(0,255,0,0.1) 50%)',
                           backgroundSize: '100% 3px'
                         }}></div>
                  </div>

                  {/* Terminal Content - Larger and more detailed */}
                  <div className="relative z-10 p-8 font-mono text-green-400 text-base leading-relaxed h-full overflow-hidden">
                    <div className="mb-3">
                      <span className="text-green-300 text-lg">C:\WINDOWS></span>
                      <span className="ml-2 animate-pulse text-green-300">█</span>
                    </div>
                    <div className="mb-2 text-green-500">Microsoft Windows [Version 4.10.1998]</div>
                    <div className="mb-2 text-green-500">(C) Copyright Microsoft Corp 1981-1998.</div>
                    <div className="mb-4"></div>
                    <div className="mb-2">C:\WINDOWS>dir</div>
                    <div className="mb-2 text-green-300">Volume in drive C has no label.</div>
                    <div className="mb-2 text-green-300">Directory of C:\WINDOWS</div>
                    <div className="mb-4"></div>
                    <div className="mb-2">SYSTEM       &lt;DIR&gt;        01-01-98  12:00a</div>
                    <div className="mb-2">TEMP         &lt;DIR&gt;        01-01-98  12:00a</div>
                    <div className="mb-2">FONTS        &lt;DIR&gt;        01-01-98  12:00a</div>
                    <div className="mb-2">GRANNY.EXE   2,048,576   01-01-98  12:00a</div>
                    <div className="mb-2">CONFIG.SYS   1,024       01-01-98  12:00a</div>
                    <div className="mb-4"></div>
                    <div className="mb-2">C:\WINDOWS>granny.exe</div>
                    <div className="text-red-400 animate-pulse mb-2">Loading Grumpy Granny...</div>
                    <div className="text-yellow-400 animate-pulse">████████████░░░░ 75%</div>
                  </div>

                  {/* Screen glow effect - more realistic */}
                  <div className="absolute inset-0 bg-green-400 opacity-8 rounded-lg animate-pulse"></div>
                  
                  {/* CRT flicker effect */}
                  <div className="absolute inset-0 bg-green-300 opacity-2 rounded-lg animate-ping"></div>
                </div>
              </div>
            </div>
            
            {/* Control buttons and vents */}
            <div className="absolute bottom-4 right-8 flex space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full shadow-inner"></div>
              <div className="w-3 h-3 bg-green-600 rounded-full shadow-inner animate-pulse"></div>
            </div>
            
            {/* Ventilation grilles */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-16 h-1 bg-amber-300 rounded opacity-60"></div>
              ))}
            </div>
            
            {/* Monitor stand - more robust for larger monitor */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-xl shadow-lg border-2 border-amber-300"></div>
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-amber-200 rounded-full shadow-lg border border-amber-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
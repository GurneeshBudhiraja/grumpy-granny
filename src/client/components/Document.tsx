import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DocumentProps {
  isOnShelf?: boolean;
  isExpanded?: boolean;
  onClose?: () => void;
  content?: string;
}

const Document: React.FC<DocumentProps> = ({ 
  isOnShelf = false, 
  isExpanded = false, 
  onClose,
  content = `Dear Diary,

That fool Melvin left me again! After 47 years of putting up with his snoring and terrible jokes, he has the audacity to say I'm "too grumpy"!

Well, good riddance! I've got my knitting, my cats, and my collection of vintage complaints. Who needs him anyway?

Note to self: Change all the passwords. That man knows too much about my secret cookie stash locations.

P.S. - If anyone finds this diary, remember: Melvin is the ex's name, and I'll always be grumpier than yesterday!

- Bertha "The Grump" Grumpington`
}) => {
  
  if (isOnShelf) {
    // Small document on shelf
    return (
      <div className="relative">
        {/* Document on Shelf */}
        <div 
          className="w-10 h-12 bg-yellow-100 rounded-sm shadow-md transform -rotate-2"
          style={{
            background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          }}
        >
          {/* Document Lines */}
          <div className="p-1 pt-2">
            <div className="w-full h-px bg-blue-800 opacity-60 mb-1"></div>
            <div className="w-full h-px bg-blue-800 opacity-60 mb-1"></div>
            <div className="w-3/4 h-px bg-blue-800 opacity-60 mb-1"></div>
            <div className="w-full h-px bg-blue-800 opacity-60 mb-1"></div>
            <div className="w-2/3 h-px bg-blue-800 opacity-60"></div>
          </div>
          
          {/* Paper texture */}
          <div className="absolute inset-0 opacity-20 rounded-sm"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, #d4af37 1px, transparent 1px), radial-gradient(circle at 80% 20%, #d4af37 1px, transparent 1px)'
            }}
          ></div>
        </div>
        
        {/* Shadow */}
        <div className="absolute top-12 left-1 w-8 h-2 bg-black opacity-15 rounded-full blur-sm transform -rotate-2"></div>
      </div>
    );
  }

  if (isExpanded) {
    // Full screen document
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-yellow-50 rounded-lg shadow-2xl max-w-md mx-4 border-2 border-yellow-300"
            initial={{ scale: 0.5, y: -100, rotate: -5 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.5, y: 100, rotate: 5 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
              backgroundImage: `
                linear-gradient(90deg, #fbbf24 1px, transparent 1px),
                linear-gradient(#fbbf24 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px, 20px 20px',
              backgroundPosition: '0 0, 0 0'
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors z-10"
            >
              ×
            </button>
            
            {/* Document Header */}
            <div className="text-center p-4 border-b border-yellow-400">
              <h3 className="font-windows font-bold text-lg text-blue-900 underline">PERSONAL DIARY</h3>
              <p className="font-windows text-sm italic text-blue-800">Property of Bertha G.</p>
              <div className="text-xs text-gray-600 mt-1">Est. 1951 - Still Grumpy</div>
            </div>
            
            {/* Document Content */}
            <div className="p-6 text-blue-900">
              <div className="font-windows text-sm leading-relaxed space-y-3">
                {content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className={
                    paragraph.startsWith('Dear Diary') ? 'font-bold' :
                    paragraph.startsWith('- Bertha') ? 'text-right italic font-bold' :
                    paragraph.startsWith('P.S.') ? 'text-xs bg-yellow-200 p-2 rounded border border-yellow-400' :
                    ''
                  }>
                    {paragraph.includes('Melvin') ? (
                      <>
                        {paragraph.split('Melvin').map((part, i) => (
                          <React.Fragment key={i}>
                            {part}
                            {i < paragraph.split('Melvin').length - 1 && (
                              <span className="font-bold text-red-600 bg-red-100 px-1 rounded">Melvin</span>
                            )}
                          </React.Fragment>
                        ))}
                      </>
                    ) : paragraph}
                  </p>
                ))}
              </div>
              
              {/* Signature */}
              <div className="mt-6 pt-4 border-t border-yellow-400">
                <div className="text-right">
                  <div className="inline-block transform -rotate-2">
                    <div className="text-blue-900 font-windows italic text-lg" style={{ fontFamily: 'cursive' }}>
                      Bertha G. 💢
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Paper aging effects */}
            <div className="absolute inset-0 pointer-events-none rounded-lg opacity-10"
              style={{
                background: 'radial-gradient(circle at 10% 20%, #8b5cf6 1px, transparent 1px), radial-gradient(circle at 80% 80%, #8b5cf6 1px, transparent 1px), radial-gradient(circle at 40% 40%, #8b5cf6 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}
            ></div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return null;
};

export default Document;
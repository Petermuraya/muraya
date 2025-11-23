import React, { useEffect, useState } from 'react';

interface FastPageLoaderProps {
  isLoading: boolean;
  progress?: number;
}

const FastPageLoader: React.FC<FastPageLoaderProps> = ({ isLoading, progress = 0 }) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setDisplayProgress(100);
      const timer = setTimeout(() => setDisplayProgress(0), 500);
      return () => clearTimeout(timer);
    }

    setDisplayProgress(Math.min(progress, 90));

    // Simulate progress increments when actual progress isn't available
    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 20;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isLoading, progress]);

  if (!isLoading && displayProgress === 0) return null;

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
          }
        }

        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            #3b82f6 0%,
            #8b5cf6 50%,
            #ec4899 100%
          );
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          z-index: 9999;
          animation: slideDown 0.3s ease-out;
        }

        .loading-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(13, 17, 23, 0.95);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9998;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(59, 130, 246, 0.2);
          border-top-color: #3b82f6;
          border-right-color: #8b5cf6;
          border-bottom-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .spinner-dots {
          display: flex;
          gap: 8px;
          margin-top: 20px;
          justify-content: center;
        }

        .spinner-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3b82f6;
          animation: bounce 1.4s infinite;
        }

        .spinner-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .spinner-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-10px);
          }
        }

        .loading-text {
          position: absolute;
          bottom: 30px;
          color: #9ca3af;
          font-size: 14px;
          text-align: center;
        }
      `}</style>

      {/* Progress Bar */}
      <div
        className="progress-bar"
        style={{
          width: `${displayProgress}%`,
          opacity: isLoading ? 1 : 0,
          transition: isLoading ? 'width 0.3s ease-out' : 'opacity 0.3s ease-out',
        }}
      />

      {/* Full Screen Loader */}
      {isLoading && displayProgress < 20 && (
        <div className="loading-backdrop">
          <div className="text-center">
            <div className="spinner"></div>
            <div className="spinner-dots">
              <div className="spinner-dot"></div>
              <div className="spinner-dot"></div>
              <div className="spinner-dot"></div>
            </div>
            <div className="loading-text">Loading at lightning speed...</div>
          </div>
        </div>
      )}
    </>
  );
};

export default FastPageLoader;

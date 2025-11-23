import React, { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, isLoading = false }) => {
  const [shouldShow, setShouldShow] = useState(!isLoading);

  useEffect(() => {
    setShouldShow(!isLoading);
  }, [isLoading]);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .page-enter {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        .page-exit {
          animation: fadeOut 0.3s ease-in forwards;
        }

        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 20%,
            rgba(255, 255, 255, 0) 40%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .content-enter {
          animation: slideInRight 0.6s ease-out;
        }

        .scale-enter {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>

      <div className={shouldShow ? 'page-enter' : 'page-exit'}>
        {children}
      </div>
    </>
  );
};

export default PageTransition;

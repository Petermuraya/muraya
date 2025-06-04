
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  name: string;
  path: string;
}

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: Record<string, string> = {
    '': 'Home',
    'about': 'About',
    'projects': 'Projects',
    'blog': 'Blog',
    'contact': 'Contact',
    'admin': 'Admin'
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' }
  ];

  let currentPath = '';
  pathnames.forEach((name) => {
    currentPath += `/${name}`;
    breadcrumbs.push({
      name: breadcrumbNameMap[name] || name,
      path: currentPath
    });
  });

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
            
            {index === 0 ? (
              <Link
                to={crumb.path}
                className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Home"
              >
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </Link>
            ) : index === breadcrumbs.length - 1 ? (
              <span 
                className="text-gray-900 dark:text-white font-medium"
                aria-current="page"
              >
                {crumb.name}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

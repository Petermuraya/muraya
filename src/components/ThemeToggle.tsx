
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative w-10 h-10 rounded-full transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20",
        "border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600",
        "shadow-sm hover:shadow-md",
        className
      )}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={cn(
            "absolute inset-0 transition-all duration-300 rotate-0 scale-100",
            theme === 'dark' && "-rotate-90 scale-0"
          )} 
        />
        <Moon 
          className={cn(
            "absolute inset-0 transition-all duration-300 rotate-90 scale-0",
            theme === 'dark' && "rotate-0 scale-100"
          )} 
        />
      </div>
    </Button>
  );
};

export default ThemeToggle;

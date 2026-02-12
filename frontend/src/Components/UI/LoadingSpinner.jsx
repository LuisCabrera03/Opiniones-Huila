import React from 'react';
import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';
import { cn } from "../../lib/utils";

const LoadingSpinner = ({
  size = 40,
  color = 'primary',
  centered = false,
  overlay = false,
  message = '',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    20: 'w-5 h-5',
    24: 'w-6 h-6',
    32: 'w-8 h-8',
    40: 'w-10 h-10',
    48: 'w-12 h-12',
    64: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    muted: 'text-muted-foreground',
    destructive: 'text-destructive'
  };

  const content = (
    <div className="flex flex-col items-center gap-3">
      <Loader2
        className={cn(
          "animate-spin",
          sizeClasses[size] || `w-[${size}px] h-[${size}px]`,
          colorClasses[color] || 'text-primary'
        )}
        {...props}
      />
      {message && (
        <p className="text-sm text-muted-foreground font-medium text-center">
          {message}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
        "flex items-center justify-center",
        className
      )}>
        <div className="bg-background p-8 rounded-lg shadow-lg border">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center justify-center",
      centered && "min-h-[200px]",
      className
    )}>
      {content}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.oneOf(['primary', 'secondary', 'muted', 'destructive']),
  centered: PropTypes.bool,
  overlay: PropTypes.bool,
  message: PropTypes.string,
  className: PropTypes.string
};

export default LoadingSpinner;
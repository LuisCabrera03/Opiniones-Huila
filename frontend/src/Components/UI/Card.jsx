import * as React from "react"
import PropTypes from 'prop-types';
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({
  className,
  elevation = 1,
  hoverable = false,
  padding = 'md',
  onClick,
  ...props
}, ref) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  const elevationClasses = {
    0: 'shadow-none border',
    1: 'shadow-sm',
    2: 'shadow-md',
    3: 'shadow-lg',
    4: 'shadow-xl'
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-card text-card-foreground",
        elevationClasses[elevation],
        paddingClasses[padding],
        hoverable && "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
        onClick && "cursor-pointer transition-all duration-200 hover:scale-[1.02]",
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

Card.propTypes = {
  className: PropTypes.string,
  elevation: PropTypes.oneOf([0, 1, 2, 3, 4]),
  hoverable: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  onClick: PropTypes.func
};

CardHeader.propTypes = {
  className: PropTypes.string
};

CardTitle.propTypes = {
  className: PropTypes.string
};

CardDescription.propTypes = {
  className: PropTypes.string
};

CardContent.propTypes = {
  className: PropTypes.string
};

CardFooter.propTypes = {
  className: PropTypes.string
};

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
export default Card;
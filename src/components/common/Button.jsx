import React from 'react';
import { cn } from '../../utils/cn';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primaryHover focus:ring-brand-primary shadow-glow-primary/40 shadow-sm',
    secondary: 'bg-brand-card hover:bg-brand-cardHover text-brand-text border border-brand-borderLight focus:ring-brand-primary',
    accent: 'bg-brand-accent text-slate-900 font-semibold hover:bg-brand-accentHover focus:ring-brand-accent shadow-glow-accent/40 shadow-sm',
    outline: 'bg-transparent border border-brand-border hover:border-brand-primary/60 text-brand-text hover:bg-brand-primary/10 focus:ring-brand-primary',
    ghost: 'bg-transparent text-brand-muted hover:text-brand-text hover:bg-brand-card/70 focus:ring-brand-primary',
    danger: 'bg-brand-danger/90 hover:bg-brand-danger text-white focus:ring-brand-danger',
    success: 'bg-brand-success hover:bg-emerald-600 text-slate-950 font-semibold focus:ring-brand-success'
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5'
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}

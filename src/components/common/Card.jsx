import React from 'react';
import { cn } from '../../utils/cn';

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  glow = false,
  ...props
}) {
  return (
    <div
      className={cn(
        'bg-brand-card border border-brand-border rounded-xl p-5 shadow-card transition-all duration-200',
        hoverEffect && 'hover:border-brand-borderLight hover:bg-brand-cardHover hover:-translate-y-0.5',
        glow && 'hover:shadow-glow-primary/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, badge, action, className = '' }) {
  return (
    <div className={cn('flex items-start justify-between mb-4 pb-3 border-b border-brand-border/60', className)}>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg text-brand-text tracking-tight">{title}</h3>
          {badge && <span>{badge}</span>}
        </div>
        {subtitle && <p className="text-xs text-brand-muted mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

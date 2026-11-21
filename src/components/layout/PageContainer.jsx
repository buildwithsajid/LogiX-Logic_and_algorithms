import React from 'react';
import { cn } from '../../utils/cn';

export default function PageContainer({
  title,
  subtitle,
  badge,
  actions,
  children,
  className = ''
}) {
  return (
    <div className={cn('flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6', className)}>
      {/* Page Header */}
      {(title || subtitle || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {title}
              </h1>
              {badge && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-brand-primary/20 text-brand-accent border border-brand-primary/30">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="mt-1 text-sm text-brand-muted max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex items-center gap-2.5 shrink-0">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}

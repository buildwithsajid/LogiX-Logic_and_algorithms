import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Shuffle, Sliders, Settings2 } from 'lucide-react';
import Button from './Button';
import { cn } from '../../utils/cn';

export default function ControlPanel({
  isPlaying = false,
  onPlay,
  onPause,
  onStepForward,
  onStepBack,
  onReset,
  onRandomize,
  onCustomInput,
  currentStep = 0,
  totalSteps = 0,
  speed = 1,
  onSpeedChange,
  disabled = false,
  statusMessage = '',
  className = ''
}) {
  const speeds = [0.5, 1, 1.5, 2, 4];

  return (
    <div className={cn('bg-brand-card/90 border border-brand-border rounded-xl p-4 shadow-card', className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Playback action group */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onReset}
            disabled={disabled}
            title="Reset to initial state"
          >
            <RotateCcw className="w-4 h-4 text-brand-muted hover:text-white" />
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onStepBack}
            disabled={disabled || isPlaying || currentStep <= 0}
            title="Step backward"
          >
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button
            variant={isPlaying ? 'accent' : 'primary'}
            size="md"
            onClick={isPlaying ? onPause : onPlay}
            disabled={disabled}
            className="px-5 font-semibold"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-1.5 fill-current" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1.5 fill-current" /> Play
              </>
            )}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onStepForward}
            disabled={disabled || isPlaying || (totalSteps > 0 && currentStep >= totalSteps - 1)}
            title="Step forward"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Step counter / progress */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono bg-brand-bg px-3 py-1.5 rounded-md border border-brand-border text-brand-muted">
            Step <span className="text-brand-text font-semibold">{totalSteps > 0 ? currentStep + 1 : 0}</span> / {totalSteps}
          </div>

          {/* Speed selector */}
          <div className="flex items-center gap-1 bg-brand-bg p-1 rounded-lg border border-brand-border text-xs">
            <span className="text-brand-muted text-[11px] px-1.5">Speed:</span>
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => onSpeedChange && onSpeedChange(s)}
                className={cn(
                  'px-2 py-0.5 rounded text-xs transition-colors font-mono',
                  speed === s
                    ? 'bg-brand-primary text-white font-semibold'
                    : 'text-brand-muted hover:text-white'
                )}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Data Manipulation group */}
        <div className="flex items-center gap-2">
          {onRandomize && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onRandomize}
              disabled={isPlaying || disabled}
              icon={Shuffle}
            >
              Random
            </Button>
          )}

          {onCustomInput && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCustomInput}
              disabled={isPlaying || disabled}
              icon={Sliders}
            >
              Custom Data
            </Button>
          )}
        </div>
      </div>

      {/* Live explanation bar */}
      {statusMessage && (
        <div className="mt-3 pt-3 border-t border-brand-border/60 flex items-center gap-2 text-xs text-brand-muted">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse shrink-0" />
          <span className="text-brand-text font-medium">{statusMessage}</span>
        </div>
      )}
    </div>
  );
}

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const SelectContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

function Select({
  value,
  onValueChange,
  children,
  open,
  onOpenChange,
  ...props
}: React.ComponentProps<'div'> & {
  value?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <div {...props} className={cn('relative inline-block w-full', props.className)}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

function SelectGroup({ children, ...props }: React.ComponentProps<'optgroup'>) {
  return <optgroup {...props}>{children}</optgroup>;
}

function SelectValue({ ...props }: React.ComponentProps<'span'>) {
  // Native select handles value display, so this is effectively unused visually
  return <span {...props} style={{ display: 'none' }} />;
}

function SelectTrigger({ className, children, ...props }: React.ComponentProps<'button'>) {
  // We hide the custom trigger because the native select in SelectContent provides the UI
  return (
    <div className={cn('hidden', className)} aria-hidden="true">
      {children}
    </div>
  );
}

function SelectContent({
  className,
  children,
  position,
  ...props
}: React.ComponentProps<'select'> & { position?: string }) {
  const { value, onValueChange } = React.useContext(SelectContext);
  return (
    <select
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className={cn(
        'border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-sm focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        // Add basic dark mode support if needed (bg-background/bg-muted)
        'bg-muted text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('px-2 py-1.5 text-sm font-semibold', className)} {...props} />;
}

function SelectItem({ className, children, ...props }: React.ComponentProps<'option'>) {
  return (
    <option className={cn(className)} {...props}>
      {children}
    </option>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<'hr'>) {
  return <hr className={cn('bg-muted -mx-1 my-1 h-px', className)} {...props} />;
}

function SelectScrollUpButton(_props: React.ComponentProps<'div'>) {
  return null;
}

function SelectScrollDownButton(_props: React.ComponentProps<'div'>) {
  return null;
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};

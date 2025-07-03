'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type Style = Omit<NonNullable<TextareaProps['style']>, 'maxHeight' | 'minHeight'> & {
    height?: number;
};
export type TextareaHeightChangeMeta = {
    rowHeight: number;
};
export interface TextareaAutosizeProps extends Omit<TextareaProps, 'style'> {
    maxRows?: number;
    minRows?: number;
    onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;
    cacheMeasurements?: boolean;
    style?: Style;
}

export const textareaStyle = cn(
    'flex min-h-[80px] w-full rounded-md border border-ring focus-visible:border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
);

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(({ className, disabled, ...props }, ref) => {
    const { pending } = useFormStatus();

    return (
        <TextareaAutosize
            data-slot="textarea"
            className={cn(textareaStyle, className)}
            ref={ref}
            {...props}
            disabled={disabled || pending}
        />
    );
});
Textarea.displayName = 'Textarea';

export { Textarea };

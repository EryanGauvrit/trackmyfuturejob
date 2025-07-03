'use client';

import { Card } from '@/components/ui/card';
import { Textarea, textareaStyle } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { ChangeEvent, JSX, useEffect, useState } from 'react';
import MdxLayout from './layout/MarkdownLayout';

type MarkdownFormFieldProps = {
    name: string;
    placeholder?: string;
    required?: boolean;
    defaultValue?: string | null;
    rows?: number;
    className?: string;
};

const MarkdownFormField = ({ name, placeholder, required, defaultValue, className, rows }: MarkdownFormFieldProps): JSX.Element => {
    const [markdownText, setMarkdownText] = useState<string>(defaultValue || '');
    const [isPreview, setIsPreview] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setMarkdownText(e.target.value);
    };

    useEffect(() => {
        if (defaultValue) {
            setMarkdownText(defaultValue);
        }
    }, [defaultValue]);

    return (
        <div className={clsx(`w-full`, isPreview && 'flex flex-col md:grid grid-cols-2 gap-4', className)}>
            <div className="col-span-2 flex justify-center">
                <Toggle onPressedChange={setIsPreview} pressed={isPreview} variant={'outline'}>
                    {isPreview ? <Eye size={20} /> : <EyeOff size={20} />}
                </Toggle>
            </div>
            <div>
                <h2 className="text-xl font-bold ">Édition</h2>
                <div className={clsx('flex flex-col gap-4 w-full', isPreview ? 'mt-0 max-w-2xl' : 'mt-2')}>
                    <Textarea
                        className={clsx(textareaStyle, 'max-h-[30vh] md:max-h-[60vh]')}
                        value={markdownText}
                        onChange={handleChange}
                        placeholder={placeholder ?? 'Écris ici ton Markdown...'}
                        name={name}
                        required={required}
                        minRows={rows ?? 50}
                    />
                </div>
            </div>
            {isPreview && (
                <div>
                    <h2 className="text-xl font-bold ">Prévisualisation</h2>

                    <Card className="p-4 max-h-[30vh] min-h-[280px] md:max-h-[60vh] h-full overflow-auto">
                        <MdxLayout src={markdownText} isClient />
                    </Card>
                </div>
            )}
            <p className="underline text-accent text-sm">
                <Link href={'https://www.markdownguide.org/basic-syntax/'} target="_blank" rel="noreferrer">
                    Markdown supporté{' '}
                </Link>{' '}
            </p>
        </div>
    );
};

export default MarkdownFormField;

'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ButtonSizes, ButtonVariants } from '@/types/variants';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import ButtonSubmit from './ButtonSubmit';

type DialogFormProps<T> = {
    title: string;
    description: string;
    textSubmit: React.ReactNode;
    textOpen: React.ReactNode;
    children: React.ReactNode;
    variant?: ButtonVariants;
    size?: ButtonSizes;
    actionFn: (formData: FormData) => Promise<T>;
    className?: string;
    opacityTrigger?: number;
    classNameTrigger?: string;
    onMounted?: () => void;
    textSuccess?: string;
    classNameForm?: string;
    tooltip?: string;
    isSettingsMode?: boolean;
    redirect?: string;
};

const DialogForm = <T,>({
    children,
    title,
    description,
    textOpen,
    textSubmit,
    variant,
    size,
    actionFn,
    className,
    opacityTrigger,
    classNameTrigger,
    onMounted,
    textSuccess,
    tooltip,
    classNameForm,
}: DialogFormProps<T>) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        if (onMounted && isMounted.current) {
            onMounted();
        }

        return () => {
            isMounted.current = false;
        };
    }, [onMounted]);

    return (
        <Dialog open={isOpen}>
            <DialogTrigger
                asChild
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                }}
            >
                <Button
                    variant={variant}
                    size={size}
                    style={{ opacity: opacityTrigger + '%' }}
                    className={cn(classNameTrigger)}
                    tooltip={tooltip}
                >
                    {textOpen}
                    {size === 'icon' && <span className="sr-only">Ouvrir le formulaire</span>}
                </Button>
            </DialogTrigger>
            <DialogContent className={cn(`max-w-4xl max-h-[95vh] overflow-auto`, className)} defaultCancelButton={false}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                    <DialogClose
                        onClick={() => setIsOpen(false)}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </DialogHeader>
                <form
                    action={(formData) => {
                        actionFn(formData)
                            .then((res: any) => {
                                if (res && res.error) {
                                    throw new Error(res.error);
                                }
                                toast.success(textSuccess || 'Opération réussie !');
                                setIsOpen(false);
                                router.refresh();
                            })
                            .catch((err) => {
                                toast.error(err.message);
                            });
                    }}
                    className={cn('flex flex-col gap-4 pt-2 pb-6 h-full max-h-[85vh]', classNameForm)}
                >
                    <div className="h-full max-h-max overflow-auto p-2 rounded-md w-full">{children}</div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <ButtonSubmit type="submit">{textSubmit}</ButtonSubmit>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DialogForm;

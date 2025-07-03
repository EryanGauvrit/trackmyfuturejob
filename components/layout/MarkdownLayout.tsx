import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Markdown from 'react-markdown';
import Loader from '../Loader';
import { Skeleton } from '../ui/skeleton';

const MDXRemote = dynamic(() => import('next-mdx-remote/rsc').then((mod) => mod.MDXRemote), {
    ssr: true,
    loading: () => (
        <Skeleton className="relative min-h-[200px]">
            <Loader inComponent />
        </Skeleton>
    ),
});

export default function MdxLayout({ src, className, isClient }: { src: string; className?: string; isClient?: boolean }) {
    // Create any shared layout or styles here
    return (
        <div
            className={clsx(
                '[&_h1]:mt-4 [&_h1]:font-semibold [&_h1]:text-3xl [&_h2]:mt-4 [&_h2]:font-semibold [&_h2]:text-2xl [&_h3]:mt-4 [&_h3]:font-semibold [&_h3]:text-xl [&_h4]:mt-4 [&_h4]:font-semibold [&_h4]:text-lg [&_h5]:mt-4 [&_h5]:font-semibold [&_h5]:text-xl [&_h6]:mt-4 [&_h6]:font-semibold [&_h6]:text-base [&_p]:mt-4 [&_p]:text-sm [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5',
                '[&_a]:text-primary [&_a]:hover:underline [&_a]:transition-colors',
                '[&_hr]:my-4 [&_hr]:border-t [&_hr]:border-muted',
                className,
            )}
        >
            {isClient ? <Markdown>{src}</Markdown> : <MDXRemote source={src} />}
        </div>
    );
}

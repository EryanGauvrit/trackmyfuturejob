import TemplateStandardPage from '@/components/templates/TemplateStandardPage';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
    return (
        <TemplateStandardPage>
            <section className="flex flex-col-reverse md:flex-row justify-center gap-4 mb-8 w-full">
                <Skeleton className="w-full h-96 md:w-1/2" />
                <Skeleton className="w-full h-96 md:w-1/2" />
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                <Skeleton className="h-[500px] w-full" />
                <Skeleton className="h-[500px] w-full" />
                <Skeleton className="h-[500px] w-full" />
            </section>
        </TemplateStandardPage>
    );
};

export default Loading;

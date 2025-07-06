import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
    return (
        <>
            <form className="max-w-7xl flex flex-wrap justify-center gap-x-40 my-8 m-auto">
                <div className="flex flex-col gap-4 p-4 ">
                    <div className="text-xl text-center">
                        <h2 id="personnal-informations" className="uppercase font-bold">
                            Informations personnelles
                        </h2>
                    </div>
                    <Card className="flex flex-col justify-center p-3 xs:p-10 gap-4 border-card bg-transparent border-2">
                        <div className="grid xs:grid-cols-2 gap-3 place-items-center">
                            <Label className="w-full" htmlFor="firstName">
                                Nom d'utilisateur
                            </Label>
                            <Skeleton className="w-full h-10" />
                        </div>
                        <div className="grid xs:grid-cols-2 gap-3 place-items-center">
                            <Label className="w-full" htmlFor="email">
                                Email
                            </Label>
                            <Skeleton className="w-full h-10" />
                        </div>
                        <Skeleton className="ml-auto w-32 h-10" />
                    </Card>
                </div>
            </form>
            <Card className="my-4 p-6 max-w-md mx-auto bg-transparent border-destructive flex flex-col justify-center gap-2">
                <p>
                    <span className="font-bold">Attention :</span> Cette action est irréversible.
                </p>
                <Skeleton className="w-full h-10" />
            </Card>
        </>
    );
};

export default Loading;

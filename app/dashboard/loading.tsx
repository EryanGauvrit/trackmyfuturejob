import Loader from '@/components/Loader';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Zap } from 'lucide-react';

const Loading = () => {
    return (
        <div className="w-full grid grid-cols-1 h-full text-card-foreground">
            <div className={'px-5 flex flex-1 gap-10 items-center bg-background sticky z-15 left-0 top-0 py-2 h-fit'}>
                <h2 className="text-2xl flex gap-2 items-center">
                    <Zap />
                    Suivi de mes candidatures <Loader inComponent classNameIcon="w-6 h-10" />
                </h2>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Skeleton className="h-10 w-52" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-10 w-52" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-10 w-52" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-10 w-52" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-10 w-52" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-10 w-52" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-10 w-52" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-10 w-full mx-auto" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default Loading;

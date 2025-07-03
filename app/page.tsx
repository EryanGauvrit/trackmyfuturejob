import TemplateStandardPage from '@/components/layout/TemplateStandardPage';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/auth-server';
import Link from 'next/link';

const Home = async () => {
    const session = await getSession();

    return (
        <TemplateStandardPage>
            {session && session.user && (
                <h2 className="text-2xl font-bold text-center">
                    Salut {session.user.name} ! 👋
                    <Button asChild>
                        <Link href={'/dashboard'}>Accéder au tableau de bord</Link>
                    </Button>
                </h2>
            )}
        </TemplateStandardPage>
    );
};

export default Home;

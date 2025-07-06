import TemplateStandardPage from '@/components/templates/TemplateStandardPage';
import { UserCog } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <TemplateStandardPage className="px-4">
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2">
                <UserCog size={26} />
                Mon compte
            </h1>
            <p>Bienvenue sur votre espace personnel, vous pouvez ici consulter et modifier vos informations personnelles.</p>
            {children}
        </TemplateStandardPage>
    );
};

export default Layout;

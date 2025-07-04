import TemplateStandardPage from '@/components/layout/TemplateStandardPage';
import { Config } from '@/config';
import { cookies } from 'next/headers';
import AddApplicationForm from './AddApplicationForm';

const Page = async () => {
    const cookieHeader = (await cookies()).toString();
    const applications = await fetch(Config.BETTER_AUTH_URL + '/api/application', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookieHeader,
        },
    });
    // console.log(applications);
    return (
        <TemplateStandardPage>
            <AddApplicationForm />
            <pre>{JSON.stringify(await applications.json(), null, 2)}</pre>
        </TemplateStandardPage>
    );
};

export default Page;

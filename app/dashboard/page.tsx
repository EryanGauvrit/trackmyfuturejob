import TemplateStandardPage from '@/components/templates/TemplateStandardPage';
import { Config } from '@/config';
import { StandardResponse } from '@/lib/wrapResponse';
import { IApplication } from '@/types/application';
import { cookies } from 'next/headers';
import AddApplicationForm from './AddApplicationForm';
import ApplicationTable from './table/ApplicationTable';

const Page = async () => {
    const cookieHeader = (await cookies()).toString();
    const res = await fetch(Config.BETTER_AUTH_URL + '/api/application', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Cookie: cookieHeader,
        },
    });
    const applications = (await res.json()).data as StandardResponse<IApplication[]>;
    return (
        <TemplateStandardPage>
            <AddApplicationForm />
            {/* <pre>{JSON.stringify(applications.data, null, 2)}</pre> */}
            <ApplicationTable applications={applications.data || []} />
        </TemplateStandardPage>
    );
};

export default Page;

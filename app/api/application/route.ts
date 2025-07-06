import { getApplications } from '@/services/applicationService';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const res = await getApplications();

    return NextResponse.json({ data: res });
}

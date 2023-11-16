'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const RouteProtectionAuthorized = ({ children }: any) => {
    const router = useRouter();
    const {data:session} = useSession();

    React.useEffect(() => {
        if (!session?.user.isAdmin) {
            router.push('/products');
        }
    }, [session, router]);

    return <>{children}</>;
};

export default RouteProtectionAuthorized;
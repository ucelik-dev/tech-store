'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const RouteProtectionUnauthorized = ({ children }: any) => {
    const router = useRouter();
    const {data:session} = useSession();

    React.useEffect(() => {
        if (!session) {
            router.push('/products');
        }
    }, []);

    return <>{children}</>;
};

export default RouteProtectionUnauthorized;
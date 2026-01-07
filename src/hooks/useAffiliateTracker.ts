import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useAffiliateTracker = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const affiliateCode = searchParams.get('r');
        if (affiliateCode) {
            localStorage.setItem('affiliate_code', affiliateCode);
            // Optionally clean up the URL to keep it pretty
            // window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [searchParams]);
};

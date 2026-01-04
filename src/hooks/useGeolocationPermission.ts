import { useState, useEffect, useCallback } from "react";

export function useGeolocationPermission() {
    const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null);
    const [location, setLocation] = useState<GeolocationPosition | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (navigator.permissions) {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
                setPermissionStatus(result.state);

                result.onchange = () => {
                    setPermissionStatus(result.state);
                };
            });
        } else {
            setPermissionStatus('prompt');
        }
    }, []);

    const getLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setError("Geolocalização não é suportada pelo seu navegador.");
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation(position);
                setError(null);
                setLoading(false);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }, []);

    return { permissionStatus, location, error, loading, getLocation };
}
import { useState, useEffect } from "react";

export function useGeolocationPermission() {
    const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null);

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

    return permissionStatus;
}
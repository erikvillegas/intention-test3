const SERVICE_WORKER_FILE_PATH = "./notification-sw.js";

export function notificationUnsupported(): boolean {
    let unsupported = false;
    if (
        !("serviceWorker" in navigator) ||
        !("PushManager" in window) ||
        !("showNotification" in ServiceWorkerRegistration.prototype)
    ) {
        unsupported = true;
    }
    return unsupported;
}

export function checkPermissionStateAndAct(onSubscribe: (subs: PushSubscription | null) => void): void {
    const state: NotificationPermission = Notification.permission;
    switch (state) {
        case "denied":
            break;
        case "granted":
            registerAndSubscribe(onSubscribe);
            break;
        case "default":
            break;
    }
}

export async function registerAndSubscribe(onSubscribe: (subs: PushSubscription | null) => void): Promise<void> {
    try {
        await navigator.serviceWorker.register(SERVICE_WORKER_FILE_PATH);
        //subscribe to notification
        navigator.serviceWorker.ready
            .then((registration: ServiceWorkerRegistration) => {
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: "BI7gXKy0oG_RZBdrFR--AH-2XfUQhhayayLFDvlx-P7CndhekSuisYYSCDiisidGz2FXL_-v47H-bwoAFBQRH5k",
                });
            })
            .then((subscription: PushSubscription) => {
                console.info("Created subscription Object: ", subscription.toJSON());
                onSubscribe(subscription);
            })
            .catch((e) => {
                console.error("Failed to subscribe cause of: ", e);
            });
    } catch (e) {
        console.error("Failed to register service-worker: ", e);
    }
}

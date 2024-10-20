import webpush, { PushSubscription } from "web-push";

webpush.setVapidDetails(
    "mailto: <erikvillegas1@gmail.com>",
    "BI7gXKy0oG_RZBdrFR--AH-2XfUQhhayayLFDvlx-P7CndhekSuisYYSCDiisidGz2FXL_-v47H-bwoAFBQRH5k",
    "MTd78uR1Qs2c5FXBd1uHX7AKRdM-pBp6wrFmFE9Whu4"
);

export const sendNotification = async (subscription: PushSubscription, title: string, message: string) => {
    const pushPayload: any = {
        title: title,
        body: message,
        //image: "/logo.png", if you want to add an image
        icon: "/user.png",
        url: "/",
        badge: "/logo.svg",
    };

    webpush
        .sendNotification(subscription, JSON.stringify(pushPayload))
        .then(() => {
            console.log("Notification sent");
        })
        .catch((error) => {
            console.error("Error sending notification", error);
        });
};

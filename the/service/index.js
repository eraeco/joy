var worker;
var reInstalled = false;

const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(
                './worker.js'
            );
            if (registration.installing) {
                console.log('Service worker installing');
                reInstalled = true;
                activeWorker(registration.installing, registration);
            } else if (registration.waiting) {
                console.log('Service worker installed');
            } else if (registration.active) {
                console.log('Service worker active');
                activeWorker(registration.active, registration);
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};

function activeWorker(worker, registration) {
    if (worker && !reInstalled)
        registration.unregister().then(registerServiceWorker)
    else
        setTimeout(function () {
            registration.unregister()
        }, 5000)

}

registerServiceWorker();
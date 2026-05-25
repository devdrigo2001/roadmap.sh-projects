
const banner = document.getElementById('cookieBanner');
const acceptBtn = document.getElementById('acceptCookies');
const declineBtn = document.getElementById('declineCookies');
const consentKey = 'cookieConsentStatus';

function updateBanner() {
    const consent = localStorage.getItem(consentKey);
    if (!consent) {
        banner.classList.add('visible');
    }
}

function setConsent(status) {
    localStorage.setItem(consentKey, status);
    banner.classList.remove('visible');
}

acceptBtn.addEventListener('click', () => setConsent('accepted'));
declineBtn.addEventListener('click', () => setConsent('declined'));

updateBanner();

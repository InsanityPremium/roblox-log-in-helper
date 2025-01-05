// ==UserScript==
// @name         Roblox bulk log-in helper
// @version      1
// @description  hi
// @match        https://www.roblox.com/login*
// @match        https://www.roblox.com/Login*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=roblox.com
// ==/UserScript==

(async function() {
    'use strict';
    const url = window.document.location.href;

    if (!url.includes('securityNotification')) {
        // Log-in
        const usernameElem = await document.querySelector('#login-username');
        const passwordElem = await document.querySelector('#login-password');
        const loginElem = await document.querySelector('#login-button');

        if (usernameElem && passwordElem) {

            const redefineValue = (elem, newValue) => {
                Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')
                    .set.call(elem, newValue);
                elem.dispatchEvent(new Event('input', { bubbles: true }));
            };


            while (true) {
                if (usernameElem.value.includes(':')) {
                    const [ username, password ] = usernameElem.value.split(':');

                    await redefineValue(usernameElem, username);
                    await redefineValue(passwordElem, password);

                    loginElem.click();
                    break;
                }

                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        // Fail check
        const polite = document.querySelector("#login-form .login-form > .password-form-group > div");
        if (!polite) return console.error("Element not found. Exiting.");

        while (true) {
            try {
                const message = polite.querySelector("p");
                if (message && message.textContent === 'Incorrect username or password.') {
                    window.document.location.href = 'https://www.roblox.com/login';
                    break;
                }
            } catch (e) {}

            await new Promise(resolve => setTimeout(resolve, 100));
        }
    } else window.document.location.href = 'https://www.roblox.com/login';
})();
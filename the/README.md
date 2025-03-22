## *The* ~~Secure~~ Render

 > Warning: As of end of 2023 Google Chrome broke W3C origin policy that SecureRender depended on to keep data private. As such, only THE Rendering engine will be developed, it will still be housed in a security context but limited to per-app rather than per-user.


Watch the [Launch Party](https://archive.org/details/distributed-ai-internet-archive?start=3890) to learn high level concepts or check [@SecureRender](https://twitter.com/SecureRender) for some cool demos.

 > As a result of the security limitations, this project may be renamed back to `JOY` or just `THE` Renderer.

### Code from Phone

Code from Phone is a TOY 'game' that runs inside *The* Renderer. All *The* Renderer development will be focused on getting Code from Phone and TOY to an alpha. Then docs will be updated on how to build your own games.

### Install

This code works as both a JS library or as a browser extension.

1. Clone or download this repo, unzip if needed.

2. Go to this folder and run `python -m SimpleHTTPServer 8764` _or_ to "chrome://extensions/" in your URL bar (similar in Firefox/others) & toggle developer mode on and then `load unpacked` *this* folder.

3. Load `http://localhost:8764/examples/toy.html` to test, play with editing this file!

 > Note: if you use `vite`, just `npm install .` inside this folder and then run `npm run dev`.

### Documentation

We hold pair programming hacking hours about weekly, for now while in alpha you will need to join these calls or tweet at us to get help. Please add to the examples folder to help documentation improve with tutorials.
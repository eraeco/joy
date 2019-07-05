 # What is JOY?

JOY is a JavaScript framework for building user interfaces and progressive applications.

<p><a href="https://youtu.be/68FSKeNT-3U"><img width="100%" src="https://gun.eco/see/joy.gif" title="Click to Watch Intro Video"/></a></p>

 > Note: Currently, JOY is meant for [Netlify](https://netlify.com/) users who want to add dynamic data to their static sites. See [#JAMstack](https://jamstack.org/) for more information.

 # Getting Started

You can use JOY along side React, Vue, vanilla JS, or others. It can be adopted in full, or in part, depending upon your organization's needs.

First, create an `index.html` file and add JOY to it:

```html
<script src="https://cdn.jsdelivr.net/npm/joydb/joy.min.js"></script>

<div name="app">
  <h1>{{ message }}</h1>
  <input name="message" placeholder="type a message here"/>
</div>
```

JOY will bind the template, such as `{{ message }}`, to data on `app.message` based on the HTML `name` attribute hierarchy.

There you have it, your first joyDB app! Everything is **reactive** and **persistent** across reload and different devices. Try typing into the `input` field, and your app will update with only the differences re-rendered.

 # Namespace

By default, top level namespaces are global and public, meaning anyone can edit data on them.

If you want your app to **only be editable by you**, you need to create an authenticated namespace.

On a JOY enabled app, open up the browser console (right-click on page -> inspect -> console) and type:

 > Note: There is **NO** password reset ability, so back it up somewhere safe.

```javascript
JOY.auth('username', 'passphrase', true);
```

(replace `username` and `passphrase` with something unique to you!)

Or to login to your namespace: (*logins are buggy, you may have to try a several times for it to work - I had to repeat this command 5 times over several seconds before it would work, it kept on incorrectly saying "Wrong user or password"!*)

```javascript
JOY.auth('username', 'passphrase');
```

 > Note: **NEVER** add these lines in your source code, or it will expose your credentials!

It should then print a message saying something like:

`Your namespace is publicly available at ~RUgiQmS-L1uzSfy2xyTBF_C8pILPc4Dpky6UVQ5rrqo.JArEwhz1K-IWzt9Lf0LEb1-kfw82sfv_SY2eFbZUeD0`

Copy and paste everything starting with and including the `~` and paste it into the top-level `<div name="app">` name attribute, replacing `app`. It will look something like this:

```html
<div name="~RUgiQmS-L1uzSfy2xyTBF_C8pILPc4Dpky6UVQ5rrqo.JArEwhz1K-IWzt9Lf0LEb1-kfw82sfv_SY2eFbZUeD0">
```

Now your app, and all data underneath it, can only be edited by you when you are logged in.

 # Schema

You will be able to declare your app's data types inline, with your HTML template, and it will automatically enforce and validate input.

This feature is not yet available.

 # Loops

This feature is in alpha.

 # Conditionals

This feature is not yet available.

 # Peers

Getting a warning?

 > Warning: No peer provided, defaulting to DEMO peer. Do not run in production, or your data will be regularly wiped, reset, or deleted.

You can run your own free peer with these [1-click deploy](https://github.com/amark/gun#deploy) instructions.

Then add your peer(s) to JOY like so:

```html
<body peers="http://localhost:8765/gun, https://gunjs.herokuapp.com/gun">
```

 # Netlify

You'll soon be able to create your JOY app with Netfliy's `addons` command. Check back soon for the launch!

 # Community

Need help getting started?

Want to contribute?

Have questions?

Want to vote on feature requests?

Then check out our [community chat](https://gitter.im/amark/gun)!

 # License

MIT
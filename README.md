# Linode OAuth2 Support Demonstration App.

Example app to demonstrating issues with OAuth2 + Linode. It appears Linode requires certain headers to be set else Linode returns a 403 status with an error. The error looks like:

```
InternalOAuthError: Failed to obtain access token
    at OAuth2Strategy._createOAuthError (/Users/user/Projects/linode-oauth-express/node_modules/passport-oauth2/lib/strategy.js:423:17)
    at /Users/user/Projects/linode-oauth-express/node_modules/passport-oauth2/lib/strategy.js:177:45
    at /Users/user/Projects/linode-oauth-express/node_modules/oauth/lib/oauth2.js:191:18
    at passBackControl (/Users/user/Projects/linode-oauth-express/node_modules/oauth/lib/oauth2.js:132:9)
    at IncomingMessage.<anonymous> (/Users/user/Projects/linode-oauth-express/node_modules/oauth/lib/oauth2.js:157:7)
    at IncomingMessage.emit (node:events:525:35)
    at endReadableNT (node:internal/streams/readable:1358:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21) {
  oauthError: {
    statusCode: 403,
    data: '<HTML><HEAD>\n' +
      '<TITLE>Access Denied</TITLE>\n' +
      '</HEAD><BODY>\n' +
      '<H1>Access Denied</H1>\n' +
      ' \n' +
      `You don't have permission to access "http&#58;&#47;&#47;login&#46;linode&#46;com&#47;oauth&#47;token" on this server.<P>\n` +
      'Reference&#32;&#35;18&#46;d0351db8&#46;1689617249&#46;f02ea1\n' +
      '</BODY>\n' +
      '</HTML>\n'
  }
}
```

## Starting
1. Install dependencies:

```
npm install
```

2. Run app by using the `npm start` command and setting CLIENT_ID and CLIENT_SECRET env vars:

```
CLIENT_ID={client-id-here} CLIENT_SECRET={client-secret-here} npm start
```
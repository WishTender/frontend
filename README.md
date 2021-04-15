This is the frontend for WishTender. WishTender is a wishlist app catered to content creators to allow them to get gifts safely from fans.

## `npm run proxytoremote`

To start, run `npm run proxytoremote`. It will connect localhost to the remote backend at api.wishtender.com.

## `npm run startlocal` && `npm run startlocalnotproxy`

If you have the a local backend running on port 4000 you can run `npm run startlocal` instead. It will use a proxy. But if you want to not use a proxy, which is more true to the production environment, run `npm run startlocalnotproxy`.

## `npm start`

`npm start` is for production. It will not connect localhost to the remote backend at api.wishtender.com properly. It may work locally if you set your [host file](https://setapp.com/how-to/edit-mac-hosts-file). By editing the hosts file you can set a subdomain (something like local.wishtender.com) to your localhost server and you won't have issues.

This react app pretty much wont load if you aren't connected a local or remote backend.

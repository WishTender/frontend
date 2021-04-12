This is the frontend for WishTender. WishTender is a wishlist app catered to content creators to allow them to get gifts safely from fans.

## `npm start` vs `npm run startlocal` vs `npm run startlocalnotproxy`
If you run `npm start` it will connect to the remote backend at api.wishtender.com.

If you have the a local backend running on port 4000 you can run `npm run startlocal` instead. It will use a proxy. But if you want to not use a proxy, which is more true to the production environment, which run `npm run startlocalnotproxy`.

This react app pretty much wont load if you aren't connected a local or remote backend.

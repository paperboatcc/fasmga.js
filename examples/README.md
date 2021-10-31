# Examples

You can use this scripts to get started with fasmga.js.

Make sure to have an api token of fasm.ga,
if you don't have one join the [discord](https://fasm.ga/discord) and ask one.

For now you can't get one from the site, we are working to fix that!

# Errors

In this examples you can get an error like this:
```
                if (response.status === 400) return { response: undefined, error: new Error(`400 status code - ${JSON.stringify(json)}`) };
                                                                                  ^

Error: 400 status code - {"bad_request":"Token you provided is invalid"}
```
If you get one of this error, it's why the token (the string into "fasmClient") is not valid. You can ask one into the [discord](https://fasm.ga/discord)

If you get an error like this:
```
                if (response.status === 400) return { response: undefined, error: new Error(`400 status code - ${JSON.stringify(json)}`) };
                                                                                  ^

Error: 400 status code - {"error":"Value \"id\" is invalid"}
```
This mean the id you provide to delete or edit an url is invalid, use example `getUrls.js` to retrive all your url

# Note

Please note fasmga.js is a es-module, so use export/import to export and import package/files, so if you use exports/require you must use import() to use the package, like here:
```js
const fasmga = import("fasmga.js");
```
If you want some example with commonjs see `commonjs` folder

**WARNING!** If you want to use es-module (this affect all files into your project) put into your package.json
```json
"type": "module"
```

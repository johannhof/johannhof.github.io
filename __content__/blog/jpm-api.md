extends: post.liquid

title:   jpm as a Node module
date:    11 Feb 2016 15:26:00 +0100
route:   blog
---

Despite my personal involvement in [jpm](https://github.com/mozilla-jetpack/jpm) we've used [cfx](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/cfx) at [ZenMate](https://zenmate.com) for building
our Addon-SDK based Firefox extensions until it finally [became obsolete](https://blog.mozilla.org/addons/2015/10/14/breaking-changes-let-const-firefox-nightly-44/).
With cfx-based Addons now being more or less automatically rejected from [addons.mozilla.org](https://addons.mozilla.org), we made the transition to jpm.

This was long overdue, since jpm is better supported and installable from npm. As a bonus, we can finally `require('jpm')` in
our build tools instead of using `child_process.spawn` to run a cfx command.

We found that the internal jpm API is largely unknown and almost undocumented, so I thought this would be interesting to share.

## Requiring

Almost all commands that you can run in jpm (init, run, xpi, test, post, sign) have a corresponding module in `jpm/lib`. That module exposes a function as its `module.exports`, which does exactly what the CLI command would do. So, to use `jpm run`, you can do

    var run = require('jpm/lib/run');

## Running

Here's a summary of the functions signatures:

    init()
    run(manifest, options)
    test(manifest, options)
    xpi(manifest, options)
    post(manifest, options)
    sign(options, config)

`manifest` simply means the `package.json` of your addon as a JavaScript object.

`options` is an object where keys correspond to the CLI flags that are used by the different commands.
Note that keys in options are camelCased, while command-line flags use dashes. So `addon-dir` becomes `addonDir`.

`xpi` and `post` take an additional option that is not specifiable on the command line: `xpiPath`. It determines the folder where the XPI should be saved. `run` and `test` will use a temporary location instead.

`sign` takes `options` as its first parameter. The second parameter `config` takes can be used to override some internal mechanism, e.g. how the XPI should be created. You should check out the [source code](https://github.com/mozilla-jetpack/jpm/blob/master/lib/sign.js) for more info.

> Warning: jpm sign will automatically submit addons to AMO, if you try to sign a listed addon it will [automatically be put up for review](https://github.com/mozilla-jetpack/jpm/issues/467)

## Full Example

    var fs = require('fs');
    var xpi = require('jpm/lib/xpi');
    
    // get manifest contents 
    var manifest = JSON.parse(fs.readFileSync('/path/to/your/addon/package.json', 'utf8'));
    
    // like command line options
    var options = {
      addonDir: '/path/to/your/addon',
      xpiPath: '/path/to/your/output/dir'
    };
    
    // create XPI
    xpi(manifest, options).then(function(xpiPath) {
      console.log("XPI saved at", xpiPath);
    }).catch(function(error) {
      console.error(error);
    });


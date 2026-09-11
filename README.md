# grunt-inject-js v1.0.1

[![npm version](https://img.shields.io/npm/v/grunt-inject-js.svg)](https://www.npmjs.com/package/grunt-inject-js)

> Grunt task that allows for multiple js files to be injected into a file. Inspired by [grunt-inject](https://github.com/ChrisWren/grunt-inject)

## Getting Started

If you haven't used [Grunt](https://gruntjs.com/) before, be sure to check out the [Getting Started](https://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](https://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-inject-js --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-inject-js');
```

## The injectjs task

### Overview
_Run this task with the `grunt injectjs` command._

Task targets, files and options may be specified according to the Grunt [Configuring tasks](https://gruntjs.com/configuring-tasks) guide.

The task is to allow for the injection of multiple javascript scripts into a document at defined places in the document. The use case arose when having to inject different third party
analytics code at different locations.


```js
grunt.initConfig({
   injectjs: {
       dev:
        {
          files:{
            'test/output/index.html': 'test/fixtures/index.html'
          },
          scriptsrc: 'test/fixtures/*.js'
        }
      }
});
```

### Required properties

#### files
Type: [`Grunt file configuration`](https://gruntjs.com/configuring-tasks#files)

The `src` HTML files must have the following comment(s) which are replaced by the injected JavaScript:

```html
<!-- inject:[jsfile] -->
```

where ```[jsfile]``` is the JavaScript file name to be injected. The file extension .js should be omitted.

The follow configuration would inject three files into the html document at the specified locations:
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Grunt Inject JS Test file</title>
    <!-- inject:google -->
    <!-- inject:woopra -->
</head>
<body>
<h1>Test File</h1>
<p>
    Content of test file
</p>
<!-- inject:pardot -->
</body>
</html>
```

### Optional properties

#### scriptsrc
Type: `String` || `Array` || [file glob](https://gruntjs.com/configuring-tasks#globbing-patterns)

The path of the script(s) to be injected into the page.

It is recommended to have a directory that includes all the JavaScript files to be injected.
A warning is raised if the directory contains non-JavaScript files.

This property is ignored if `clear` is set to true.

#### clear
Type: `Boolean`

If this property is set to `true` then the `scriptsrc` is ignored and all tags following the pattern

`<!-- inject:[name] -->` are removed from the file (letters, numbers, underscores, hyphens, and dots are supported).

This property was added as in some environments no Javascript files need to be injected and all inject placeholders removed from the file(s).

## Release History

    * 2026-09-11   v1.0.1  
<p>Add package entry point and publish only the task files.</p>

    * 2026-09-09   v1.0.0  
<p>Update Grunt dependencies, replace JSHint/nodeunit with ESLint and Node's test runner, and refresh MIT license packaging.</p>

    * 2016-07-14   v0.1.10  
<p>Update Readme text.</p>

    * 2016-07-14   v0.1.9  
<p>Update Grunt peer dependencies and Grunt versions</p>

    * 2015-01-16   v0.1.8   Beta Version
<p>Update Readme text.</p>

    * 2015-01-16   v0.1.7   Beta Version
<p>Add clear option to task and update tests and Readme text.</p>

    * 2015-01-14   v0.1.6   Beta Version
<p>Use grunt standardised verbose messaging.</p>

    * 2015-01-13   v0.1.5   Beta Version
<p>Final updates for Readme text.</p>

    * 2015-01-13   v0.1.4   Beta Version
<p>Update Readme text and changed notifications.</p>

    * 2015-01-13   v0.1.3   Beta Version
<p>Code refactor and improved user notifications.</p>

    * 2015-01-13   v0.1.2   Beta Version
<p>Improved error handling when no files exist.</p>

    * 2015-01-12   v0.1.1   Beta Version
<p>Renamed task name from inject_js to injectjs and associated code changes.</p>

    * 2015-01-12   v0.1.0   Beta Version
<p>Initial release.</p>

## License

Copyright (c) 2015 Mark Phillips

Licensed under the [MIT License](LICENSE).
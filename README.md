# grunt-inject-js v1.0.2

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

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

Copyright (c) 2015 Mark Phillips

Licensed under the [MIT License](LICENSE).
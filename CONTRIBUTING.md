# Contributing to jDoc

1. [Getting Involved](#getting-involved)
2. [Questions and Discussion](#questions-and-discussion)
3. [How To Report Bugs](#how-to-report-bugs)

Note: This is the code development repository for *jDoc Core* only. Before opening an issue or making a pull request, be sure you're in the right place.
* jDoc plugin issues should be reported to the author of the plugin.


## Getting Involved

For more information on how to contribute to this project, please send us private message, describe your request, including a short guide with tips, tricks, and ideas about jDoc.

When opening a pull request, you'll be asked to sign our Contributor License Agreement.


## Questions and Discussion

### Looking for help?

We watches [jDoc GitHub Discussions](https://github.com/bssyco/jDoc/discussions). If you have longer posts or questions that can't be answered in places such as Stack Overflow, please feel free to post them there. If you think you've found a bug, please [file it in the bug tracker](#how-to-report-bugs).

## How to Report Bugs

### Make sure it is a jDoc bug

Ask for help first on a discussion forum like [Stack Overflow](https://stackoverflow.com/). You will get much quicker support, and you will help avoid tying up us with invalid bug reports.

### Try the latest version of jDoc

Bugs in old versions of jDoc may have already been fixed. In order to avoid reporting known issues, make sure you are always testing against the latest build. We cannot fix bugs in older released files, if a bug has been fixed in a subsequent version of jDoc the site should upgrade.


### Build a Local Copy of jDoc

Create a fork of the jDoc repo on GitHub at https://github.com/bssyco/jDoc

Clone your jDoc fork to work locally.

### Test Suite Tips...

During the process of writing your patch, you will run the test suite MANY times.

#### Loading changes on the test page

Rather than rebuilding jDoc with `npm run build` every time you make a change, you can use the included watch task to rebuild distribution files whenever a file is saved.

#### Running the test suite from the command line

You can also run the test suite from the command line.

#### Running a single module

All test modules run by default. Run a single module by specifying the module in a "flag":

### Repo organization

The jDoc source is organized with ECMAScript modules and then compiled into one file at build time.

### Browser support

Remember that jDoc supports multiple browsers and their versions; any contributed code must work in all of them.

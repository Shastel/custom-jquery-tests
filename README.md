# custom-jquery-tests

This repository contains the tests for a 'custom' version of the jquery library.
You can find [task here](https://github.com/rolling-scopes-school/RS-Short-Track/wiki/4.-Custom-Jquery).
Follow the recommendations below.

## How to run tests

To run this tests clone this repository
```sh
git clone git@github.com:Shastel/custom-jquery-tests.git
```

Open directory
```sh
cd custom-jquery-tests
```

Install dependencies
```sh
npm install
```

Then you should create `.env` file and add relative path to your implementation.
For example (change it to your local relative path)
```sh
ROOT_PATH='relative/path/to/your/custom-jquery'.
```

When file is created you can run tests with
```sh
npm test
```
## Troubleshooting guide

1. If the command 'git clone git@github.comShastelcustom-jquery-tests.git' fails, 
you need to create a SHH key [according to this guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

2. If you get an error like `jest: command not found' or 'cannot find module jest` when you try to run the tests, 
you need to run `npm install` and check jest version in package.json dependencies. 

3. If you get an error like `cannot find module '/wrong/path/to/custom-jquery'`, you need to check 
`ROOT_PATH` value in `.env` file.

4. If you get an error like `TypeError: require(...) is not a function`, please note that your ```index.js``` 
file contains an export of the correct function.


## LICENSE

MIT

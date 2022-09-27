# ematura-web

This is the main repository for the eMatura website.

# Dependencies

The website depends on TypeScript (v4.8), Node.js, React (v18.2) and Material UI (v5.9) components for React.

# Local installation and setup

To locally install the website, clone this repository and then run `npm install`.

Before starting the website, you will need to do a few preparatory steps:

- In case you don't want to use the public [ematura-api](https://github.com/eMatura/ematura-api),
you will have to use install it and run it locally as well. Make sure you note its port.
- In the cloned directory, create a `.env` file and inside of it set the `REACT_APP_API_URL` property to either the public ematura-api URL or `https://localhost:<port>/`. *Note that the URL has to end with a /*

Once that has been taken care of, simply use `npm start` to run the website on your `localhost`.

# TypeScript config

I have intentionally enabled stricter type checks, including `strictNullChecks`, `noUnusedLocals`, `noUnusedParameters` and `noImplicitReturns`.
Feel free to disable them, but do not attempt to merge `tsconfig.json` changes into the main branch.

# Code and content licence

All code belonging to this website (barring dependencies) is released under the [MIT licence](./LICENCE).

All textual content on this website, including (but not limited to) tests, questions, answers and lectures 
is hereby released into the public domain for the benefit of all, excepting content explicitly released under other terms.
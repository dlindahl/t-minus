module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "standard",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "arrow-body-style": "error",
    "arrow-parens": "error",
    "arrow-spacing": "error",
    "generator-star-spacing": "error",
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-confusing-arrow": "error",
    "no-console": [
      "warn",
      {
        "allow": [
          "error",
          "warn"
        ]
      }
    ],
    "no-duplicate-imports": "error",
    "no-useless-computed-key": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "react/forbid-component-props": "warn",
    "react/jsx-handler-names": "error",
    "react/jsx-indent": [
      "error",
      2
    ],
    "react/jsx-indent-props": [
      "error",
      2
    ],
    "react/jsx-max-props-per-line": [
      "warn",
      {
        "maximum": 5
      }
    ],
    "react/jsx-no-bind": "error",
    "react/jsx-no-comment-textnodes": "error",
    "react/jsx-no-target-blank": "error",
    "react/jsx-pascal-case": "error",
    "react/jsx-sort-props": "error",
    "react/jsx-space-before-closing": [
      "warn",
      "never"
    ],
    "react/jsx-tag-spacing": [
      "error",
      {
        "closingSlash": "never",
        "beforeSelfClosing": "never",
        "afterOpening": "never"
      }
    ],
    "react/jsx-wrap-multilines": "error",
    "react/no-children-prop": "warn",
    "react/no-multi-comp": [
      "error",
      {
        "ignoreStateless": true
      }
    ],
    "react/no-string-refs": "error",
    "react/no-unescaped-entities": "error",
    "react/no-unused-prop-types": "warn",
    "react/prefer-es6-class": "error",
    "react/prefer-stateless-function": "warn",
    "react/react-in-jsx-scope": "off",
    "react/require-optimization": "off", // TODO: Enable
    "react/self-closing-comp": "error",
    "react/sort-comp": "warn",
    "react/sort-prop-types": "warn",
    "react/style-prop-object": "error",
    "rest-spread-spacing": "error",
    "sort-imports": "off", // TODO: Enable (with pull request)
    "sort-keys": "error",
    "sort-vars": "error",
    "spaced-comment": "error",
    "template-curly-spacing": "error"
  }
};

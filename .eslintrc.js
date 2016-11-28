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
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/react"
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
    "import",
    "react"
  ],
  "rules": {
    "array-callback-return": "error",
    "arrow-body-style": "error",
    "arrow-parens": "error",
    "arrow-spacing": "error",
    "capitalized-comments": "warn",
    "computed-property-spacing": "warn",
    "consistent-return": "warn",
    "curly": "warn",
    "default-case": "error",
    "dot-location": "error",
    "dot-notation": "warn",
    "func-names": "error",
    "func-style": [
      "warn",
      "declaration",
      {
        "allowArrowFunctions": true
      }
    ],
    "generator-star-spacing": "error",
    "import/no-dynamic-require": "error",
    "import/no-internal-modules": [
      "error",
      {
        "allow": [
          "empty/*",
          "react-icons/**/*",
          "**/config/*",
          "**/src/**/*"
        ]
      }
    ],
    "import/no-webpack-loader-syntax": "error",
    "import/first": "warn",
    "import/newline-after-import": "warn",
    "import/order": [
      "warn",
      {
        "groups": [
          // Treat all module types equally in regards to order
          [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ]
        ]
      }
    ],
    "import/no-unassigned-import": "warn",
    "import/no-named-default": "warn",
    "jsx-quotes": "warn",
    "linebreak-style": [
      "error",
      "unix"
    ],
    "max-len": [
      "warn",
      {
        "code": 120,
        "comments": 80
      }
    ],
    "max-params": "warn",
    "newline-per-chained-call": "warn",
    "no-alert": "error",
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
    "no-delete-var": "error",
    "no-duplicate-imports": "error",
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-lonely-if": "error",
    "no-magic-numbers": [
      "error",
      {
        "enforceConst": true,
        "ignoreArrayIndexes": true
      }
    ],
    "no-negated-condition": "error",
    "no-path-concat": "error",
    "no-process-env": "warn",
    "no-return-assign": "warn",
    "no-shadow": "error",
    "no-ternary": "warn",
    "no-useless-computed-key": "error",
    "no-useless-concat": "warn",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-useless-return": "warn",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "quote-props": [
      "warn",
      "as-needed"
    ],
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
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "config/webpack.config.js"
      }
    }
  }
};

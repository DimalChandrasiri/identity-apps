module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    plugins: [
        "unused-imports"
    ],
    parserOptions: {
        ecmaVersion: 9,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: "detect"
        },
    },
    rules: {
        "eol-last": "error",
        "react/jsx-curly-spacing": [2, "always", {
            "allowMultiline": true,
            "spacing": {"objectLiterals": "always"}
        }],
        "no-unused-vars": "off",
        "unused-imports/no-unused-imports": 2,
        "unused-imports/no-unused-vars": 2
    },
    root: true,
    overrides: [
        {
            files: ["**/*.tsx"],
            rules: {
                "react/prop-types": "off"
            }
        }
    ]
};

import globals from "globals";
import { parser as typescriptParser } from "typescript-eslint";

export default {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.node, parser: typescriptParser, ecmaVersion: 2020, sourceType: "commonjs" },
    rules: {
        strict: "off",
        indent: ["error", 4],
        "no-import-assign": "error",
        "no-console": ["error", { allow: ["clear", "error", "trace"] }],
        "no-use-before-define": "error",
        "no-unused-vars": [
            "error",
            {
                vars: "all",
                args: "after-used",
                argsIgnorePattern: "^_",
                caughtErrors: "all",
                caughtErrorsIgnorePattern: "^_",
                destructuredArrayIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                ignoreRestSiblings: true
            }
        ]
    }
};

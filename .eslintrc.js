module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "node": true
  },
  "globals": {
    "cy": true
  },
  "overrides": [
    {
      "files": ["*.ts", "*.vue"],
      "parserOptions": {
        "project": ["tsconfig.json"],
        "createDefaultProgram": true
      },
      "extends": [
        "@vue/typescript/recommended",
        "eslint:recommended",
      ],
      "rules": {
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/ban-types": "off"
      }
    },
    {
      "files": [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      "env": {
        "jest": true
      }
    }
  ]
};

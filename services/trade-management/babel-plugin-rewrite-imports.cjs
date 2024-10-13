const path = require("path");

module.exports = function () {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const currentFile = state.file.opts.filename;

        let source = path.node.source.value;

        // Apply the ../lib -> ./lib and ../utils -> ./utils transformation only in 'src' files
        if (currentFile.includes("/src/app/src")) {
          if (source.startsWith("../lib/")) {
            source = source.replace("../lib/", "./lib/");
          }

          if (source.startsWith("../utils/")) {
            source = source.replace("../utils/", "./utils/");
          }
        }

        // Apply the .js -> .cjs renaming globally (in all files)
        if (source.endsWith(".js")) {
          source = source.replace(".js", ".cjs");
        }

        path.node.source.value = source;
      },
      CallExpression(path, state) {
        const currentFile = state.file.opts.filename;

        if (
          path.node.callee.name === "require" &&
          path.node.arguments.length > 0 &&
          typeof path.node.arguments[0].value === "string"
        ) {
          let source = path.node.arguments[0].value;

          // Apply the ../lib -> ./lib and ../utils -> ./utils transformation only in 'src' files
          if (currentFile.includes("/src/app/src")) {
            if (source.startsWith("../lib/")) {
              source = source.replace("../lib/", "./lib/");
            }

            if (source.startsWith("../utils/")) {
              source = source.replace("../utils/", "./utils/");
            }
          }

          // Apply the .js -> .cjs renaming globally (in all files)
          if (source.endsWith(".js")) {
            source = source.replace(".js", ".cjs");
          }

          path.node.arguments[0].value = source;
        }
      },
    },
  };
};

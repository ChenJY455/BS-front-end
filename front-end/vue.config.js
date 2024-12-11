const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const IconsResolver = require("unplugin-icons/resolver");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",
      },
    },
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: "Icon",
          }),
        ],
      }),
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ["ep"],
          }),
          ElementPlusResolver(),
        ],
      }),
    ],
  },
};

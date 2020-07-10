/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  resolver: {
    /* resolver options */
    sourceExts: ['jsx', 'js', 'tsx', 'ts']
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  },
  serializer: {
    /* serializer options */
  },
  server: {
    /* server options */
  }

  /* general options */
};
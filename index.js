// The `filename` is required and necessary for error reporting and logging
exports.name = 'babel';

exports.install = function (pluginContext) {
  const BabelConfig = pluginContext.models.Model.extend({
    properties: {
      extensions: [String]
    }
  });

  Object.assign(pluginContext.Project.properties, {
    babelConfig: {
      type: BabelConfig,
      description: 'Babel configuration'
    }
  });
};

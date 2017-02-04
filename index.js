// The `filename` is required and necessary for error reporting and logging
exports.name = 'babel';

exports.install = function (pluginContext) {
  const BabelConfig = pluginContext.models.Model.extend({
    properties: {
      extensions: [String]
    }
  });

  Object.assign(pluginContext.models.Project.properties, {
    babelConfig: {
      type: BabelConfig,
      description: 'Babel configuration'
    }
  });
};

exports.projectCreated = (project) => {
  let logger = project.logger('babel');
  let lassoConfig = project.getLassoConfig();

  if (!lassoConfig) {
    lassoConfig = {};
    project.setLassoConfig(lassoConfig);
  }

  let lassoConfigRequire = lassoConfig.require || (lassoConfig.require = {});
  let transforms = lassoConfigRequire.transforms || (lassoConfigRequire.transforms = []);

  transforms.push({
    transform: require('lasso-babel-transform'),
    config: {
      extensions: ['.js', '.es6']
    }
  });

  logger.info(`Installed lasso-babel-transform into project "${project.getName()}"`);
};

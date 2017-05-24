const defaultFileExtensions = ['.js', '.es6', '.marko'];

// The `filename` is required and necessary for error reporting and logging
exports.name = 'babel';

exports.install = function (pluginContext) {
  const BabelConfig = pluginContext.models.Model.extend({
    properties: {
      extensions: [String],
      babelOptions: Object
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

  let babelConfig = project.getBabelConfig();

  if (babelConfig) {
    let extensions = babelConfig.getExtensions();

    if (extensions) {
      if (!extensions.includes('.marko')) {
        extensions.push('.marko');
      }
    } else {
      babelConfig.setExtensions(defaultFileExtensions);
    }

    babelConfig = babelConfig.clean();
  } else {
    babelConfig = {
      extensions: defaultFileExtensions
    };
  }

  transforms.push({
    transform: require('lasso-babel-transform'),
    config: babelConfig
  });

  logger.info(`Installed lasso-babel-transform into project "${project.getName()}"`);
};

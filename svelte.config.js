var sass = require('sass');

module.exports = {
  preprocess: {
    style: ({content, filename}) => {
      return new Promise((success, failure) => {
        sass.render({
          data: content,
          file: filename,
        }, (err, result) => {
          if (err)
            failure(err);
          else
            success(result);
        });
      })
    },
  }
};
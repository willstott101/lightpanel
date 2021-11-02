var sass = require('sass');

console.log("BEFORE SASS EXPORTED");

module.exports = {
  preprocess: {
    style: ({content, filename}) => {
      console.log("BEFORE SASS", arguments);
      return new Promise((success, failure) => {
        console.log("STARTING SASS", err, result);
        sass.render({
          data: content,
          file: filename,
        }, (err, result) => {
          console.log("AFTER SASS", err, result);
          if (err)
            failure(err);
          else
            success(result);
        });
      })
    },
  }
};
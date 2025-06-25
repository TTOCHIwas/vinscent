const { binaryToUuid } = require('../../utils/uuid.js');

function convertUUID(fieldName, target = 'posts') {
  return (req, res, next) => {
    const data = res.locals[target];
    if (Array.isArray(data)) {
      res.locals[target] = data.map(item => ({
        ...item,
        [fieldName]: binaryToUuid(item[fieldName])
      }));
    } else if (data && data[fieldName]) {
      res.locals[target] = {
        ...data,
        [fieldName]: binaryToUuid(data[fieldName])
      };
    }
    next();
  };
}

module.exports = convertUUID;
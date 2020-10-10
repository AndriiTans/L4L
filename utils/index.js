const getParsedError = (error) => {
  try {
    const parsedError = (error || {}).data;

    if (Array.isArray(parsedError)) return parsedError.join(', ');
    if (parsedError instanceof Object)
      return Object.values(parsedError).join(', ');

    return parsedError;
  } catch (e) {
    console.log('Error is not JSON type');
  }

  return error;
};

exports.getParsedResponseError = (err) => {
  const error = err.response;
  const errMessage = getParsedError(error);
  const errStatus = (error || {}).status || '';
  const statusText = (error || {}).statusText || '';

  const message = `Error status ${errStatus} Message: ${errMessage}`;

  return { message: errMessage, status: errStatus };
};

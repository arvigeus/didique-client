const normalizeErrors = errors =>
  errors.reduce((acc, cv) => {
    if (cv.path in acc) {
      acc[cv.path].push(cv.message);
    } else {
      acc[undefined] = [cv];
    }

    return acc;
  }, {});

const stringifyError = error =>
  error.path ? `${error.path}: ${error.message}` : error;

export const normalizeErrorsAsMarkup = errors => ({
  __html:
    errors.length === 1
      ? stringifyError(errors[0])
      : "<ul>" +
        errors.map(err => `<li>${stringifyError(err)}</li>`).join() +
        "</ul>"
});

export default normalizeErrors;

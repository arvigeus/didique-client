const normalizeErrors = errors =>
  errors.reduce
    ? errors.reduce((acc, cv) => {
        if (cv.path in acc) {
          if (!acc[cv.path]) acc[cv.path] = [];
          acc[cv.path].push(cv.message);
        } else {
          if (!acc[undefined]) acc[undefined] = [];
          acc[undefined].push(cv);
        }

        return acc;
      }, {})
    : { [undefined]: [errors.message || errors + ""] };

export default normalizeErrors;

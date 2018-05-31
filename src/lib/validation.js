export const rules = {
  isRequired: ({ type, message }) => value =>
    !!value || { type: type || "error", message },
  isEmail: ({ type, message, allowEmpty }) => value =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ||
    (!value && allowEmpty) || { type: type || "error", message },
  hasLength: ({ type, message, min, max }) => value =>
    ((!min || value.length >= min) && (!max || value.length <= max)) || {
      type: type || "error",
      message
    },
  isSlug: ({ type, message }) => value =>
    /[A-Z0-9._-]/i.test(value) || { type: type || "error", message },
  custom: (func, { type, message }) => value =>
    func(value) || { type: type || "error", message }
};

class ProjectNameValidator {
  static isValid(name) {
    const regex = /^[a-zA-Z0-9-_]+$/;
    if (!regex.test(name))
      return false;

    if (name.length < 4)
      return false;

    if (name.length > 20)
      return false;

    return true;
  }
};

module.exports = ProjectNameValidator;

const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['stats']);
roleRights.set(roles[1], []);

module.exports = {
  roles,
  roleRights,
};

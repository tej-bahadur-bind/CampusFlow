export function requireRole(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.headers['x-user-role'] || req.body?.userRole || 'Student';

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: `Access denied. Requires one of the following roles: ${allowedRoles.join(', ')}`,
      });
    }

    next();
  };
}
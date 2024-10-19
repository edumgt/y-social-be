const { _PERMISSIONS } = require("../utils/permissions");

const checkPermissions = (req, res, next) => {
    const userPermissions = req.user.role;
    const hasPermission = 
        userPermissions === _PERMISSIONS.ADMIN || 
        userPermissions === _PERMISSIONS.SUPER_ADMIN;

    if (!hasPermission) {
        return res.status(403).json({ message: "Forbidden: You don't have permission to do this." });
    }

    next();
};

module.exports = {
    checkPermissions
}

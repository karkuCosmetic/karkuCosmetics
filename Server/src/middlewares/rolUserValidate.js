export const userRole = async (req, res, next) => {
    // if (!req.user) {
    //     return res.status(500).json({
    //         error: 'Check token first',
    //     });
    // }

    const { rol } = req.body;
    if (rol !== 'ROL_User') {
        return res.status(401).json({
            error: `Unauthorized -  has invalid role`,
        });
    }
    next();
};
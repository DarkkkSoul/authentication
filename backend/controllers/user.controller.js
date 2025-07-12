export const userController = async (req, res, next) => {
    try {
        req.user = user;
        res.json({ user }).status(200);
    } catch (error) {
        next(error);
    }
}
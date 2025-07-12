export const userController = async (req, res, next) => {
    try {
        const user = req.user;
        res.json({ username: user.username, message: 'You are authorized' }).status(200);
    } catch (error) {
        next(error);
    }
}
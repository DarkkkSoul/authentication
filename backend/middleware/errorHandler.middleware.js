const errorHandler = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;

        res.status(error.statusCode || 500).json({ sucess: false, errorMessage: error.message });
    } catch (error) {
        next(error);
    }
}
export default errorHandler
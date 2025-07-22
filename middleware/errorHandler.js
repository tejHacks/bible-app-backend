const errorHandler = (err, req, res, next) => { 
    console.error(err.stack);
    res.status(500).json({
        error: {
        message: err.message || 'Internal Server Error',
        status: 500,
        },
    });
    }
    module.exports = errorHandler;
const { GeneralError } = require('../utils/error');

const handleErrors = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {}; 

    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
        status: 'error',
        message: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: err.message
    });
}


module.exports = handleErrors;
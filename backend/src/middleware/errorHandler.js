import ApiError from "../utils/apiError.js";

const errorHandler = (err, _, res, next) => {
    console.error("Unexpected Error:", err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            statusCode: err.statusCode,
            message: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Internal Server Error",
    });
};

export default errorHandler;

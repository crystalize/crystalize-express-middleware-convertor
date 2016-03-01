const crystalizePromise = require("crystalize-promise");

const convertExpressMiddleware = function (name, middleware, PromiseImpl) {
    if (typeof PromiseImpl === "undefined") {
        PromiseImpl = convertExpressMiddleware.Promise;
    }

    return {
        name,
        respondsTo: "then",
        callback: (req, res) => new PromiseImpl((fulfill, reject) => {
            middleware(req, res, (error) => {
                if (error) {
                    reject(error);
                } else {
                    fulfill();
                }
            });
        }),
    };
};
convertExpressMiddleware.Promise = crystalizePromise.Promise;

module.exports = convertExpressMiddleware;

export var MIRAI_HTTP_CODE_ENUM;
(function (MIRAI_HTTP_CODE_ENUM) {
    MIRAI_HTTP_CODE_ENUM[MIRAI_HTTP_CODE_ENUM["success"] = 0] = "success";
    MIRAI_HTTP_CODE_ENUM[MIRAI_HTTP_CODE_ENUM["verifyError"] = 1] = "verifyError";
    MIRAI_HTTP_CODE_ENUM[MIRAI_HTTP_CODE_ENUM["noBot"] = 2] = "noBot";
    MIRAI_HTTP_CODE_ENUM[MIRAI_HTTP_CODE_ENUM["noSession"] = 3] = "noSession";
    MIRAI_HTTP_CODE_ENUM[MIRAI_HTTP_CODE_ENUM["sessionNoAuth"] = 4] = "sessionNoAuth";
    MIRAI_HTTP_CODE_ENUM[MIRAI_HTTP_CODE_ENUM["noTarget"] = 5] = "noTarget";
    MIRAI_HTTP_CODE_ENUM[MIRAI_HTTP_CODE_ENUM["noFile"] = 6] = "noFile";
    MIRAI_HTTP_CODE_ENUM[MIRAI_HTTP_CODE_ENUM["botNoPermission"] = 10] = "botNoPermission";
    MIRAI_HTTP_CODE_ENUM[MIRAI_HTTP_CODE_ENUM["botBaned"] = 10] = "botBaned";
    MIRAI_HTTP_CODE_ENUM[MIRAI_HTTP_CODE_ENUM["longMsg"] = 30] = "longMsg";
    MIRAI_HTTP_CODE_ENUM[MIRAI_HTTP_CODE_ENUM["badRequest"] = 400] = "badRequest";
})(MIRAI_HTTP_CODE_ENUM || (MIRAI_HTTP_CODE_ENUM = {}));

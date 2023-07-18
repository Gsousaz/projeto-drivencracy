import joi from "joi";

export const schemaPoll = joi.object({
    title: joi.string().min(1).required(),
    expireAt: joi.string().allow(null, "")
});

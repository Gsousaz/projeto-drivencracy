import joi from "joi";

export const schemaChoice = joi.object({
    title: joi.string().min(1).required(),
    pollId: joi.string().allow(null, "")
});



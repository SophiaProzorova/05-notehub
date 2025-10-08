import * as Yup from "yup";

export const Schema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Title must be at least 5 character")
        .max(50, "Title is too long")
        .required("Title is required"),
    content: Yup.string()
        .max(500, "Content is too long"),
    tag: Yup.string()
        .required("Tag should be selected")
})
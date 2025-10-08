import { useId } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import { type NoteFormValues } from "../../types/note";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { Schema } from "./FormSchema";

import css from "./NoteForm.module.css";

export interface NoteFormProps {
    onClose: () => void,
}

const initialValues: NoteFormValues = {
    title: "",           
    content: "",
    tag: "Todo",
}

const NoteForm = (props: NoteFormProps) => {
    const fieldId = useId();
    const queryClient = useQueryClient();

    const addNewNoteMutation = useMutation({
        mutationFn: async ({...note}: NoteFormValues) => createNote(note),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['note']});
            props.onClose();
        },
        onError(error) {
            toast.error(error.message)
        },
    })

    return (
        <Formik 
            initialValues={initialValues} 
            validationSchema={Schema}
            onSubmit={(values)=>addNewNoteMutation.mutate(values)}
        >
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-title`}>Title</label>
                    <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
                    <ErrorMessage component="span" name="title" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-content`}>Content</label>
                    <Field
                        as="textarea"
                        id={`${fieldId}-content`}
                        name="content"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage component="span" name="content" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage component="span" name="tag" className={css.error} />
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={props.onClose}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={false}
                    >
                        Create note
                    </button>
                </div>
            </Form>
        </Formik>
    )
}

export default NoteForm
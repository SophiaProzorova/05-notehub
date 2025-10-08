import { useId } from "react";
import { type NoteFormValues } from "../../types/note";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Schema } from "./FormSchema";
import css from "./NoteForm.module.css";

export interface NoteFormProps {
    onCancel: () => void,
    onFormSubmit: ({title, content, tag}: NoteFormValues) => Promise<void>
}

const initialValues: NoteFormValues = {
    title: "",           
    content: "",
    tag: "Todo",
}

const NoteForm = ({ onCancel, onFormSubmit }: NoteFormProps) => {
    const fieldId = useId();

    return (
        <Formik 
            initialValues={initialValues} 
            validationSchema={Schema}
            onSubmit={onFormSubmit}
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
                        id="content"
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
                    <button type="button" className={css.cancelButton} onClick={onCancel}>
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
import * as yup from "yup";

export const addTaskValidationSchema = yup.object({
  id: yup.string().required(),
  parentId: yup.string().notRequired(),
  title: yup.string().required(),
  subtitle: yup.string().required(),
  priority: yup.number().required().min(1),
  done: yup.boolean(),
  dateTime: yup.date().notRequired(),
});
export const addNoteValidationSchema = yup.object({
  id: yup.string().required(),
  detail: yup.string().required(),
  date: yup.string().notRequired(),
});

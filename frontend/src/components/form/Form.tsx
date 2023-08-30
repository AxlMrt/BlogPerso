/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import Input from "./form_input/Input";

interface Props {
  id: string;
  formClass: string;
  handleSubmit: UseFormHandleSubmit<any>;
  submitForm: (data: any) => Promise<void>;
  fields: any;
  register: UseFormRegister<any>;
}

export default function Form({
  id,
  formClass,
  handleSubmit,
  submitForm,
  fields,
  register,
}: Props) {
  return (
    <form id={id} className={formClass} onSubmit={handleSubmit(submitForm)}>
      {fields.map(
        (field: {
          id: string;
          labelText: string;
          labelFor: string;
          name: string;
          type: string;
          placeholder: string;
          isRequired: boolean;
        }) => (
          <Input
            key={field.id}
            register={register}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            holder={field.placeholder}
            isRequired={field.isRequired}
          />
        ),
      )}
    </form>
  );
}

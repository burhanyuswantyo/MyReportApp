import {useState} from 'react';

interface FormState {
  [key: string]: any;
}

type FormAction = 'reset' | string;

type UseFormReturn = [
  FormState,
  (formType: FormAction, formValue: any) => void,
];

const useForm = (initialValue: FormState): UseFormReturn => {
  const [form, setForm] = useState<FormState>(initialValue);
  return [
    form,
    (formType: FormAction, formValue: any) => {
      if (formType === 'reset') {
        return setForm(initialValue);
      }
      return setForm({...form, [formType]: formValue});
    },
  ];
};
export default useForm;

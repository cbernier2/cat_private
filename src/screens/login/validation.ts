import * as yup from 'yup';
import i18n from 'i18next';

export const LoginValidation = yup.object({
  username: yup.string().required(i18n.t('cat.login_username_blank_error')),
  password: yup.string().required(i18n.t('cat.login_password_blank_error')),
});

export interface LoginFormType extends yup.InferType<typeof LoginValidation> {}

"use client";

import { z } from 'zod';
import { Formik, Form } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { Field, Button } from '@/components/form/formItems';
import { loginUser } from '@/utils/cognito';
import { loginErrorMessage } from '@/utils/authErrors';
import { useTranslations } from 'next-intl';
import { signInWithRedirect } from "aws-amplify/auth";

function LoginForm() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale;
  const t = useTranslations('LoginForm');

  const loginSchema = z.object({
    email: z.string().email(t('invalidEmail')),
    password: z.string().min(8, t('passwordMinLength')),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const {email, password} = values;
    try {
      // signIn("credentials", { email, password , callbackUrl: `/${locale}/` });
      await loginUser(email, password);
      toast.success("Login successful");
      router.push(`/${locale}/`);
    } catch (error) {
      toast.error(loginErrorMessage(error))
      console.error('Login error', error);
    }
    setSubmitting(false)
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(loginSchema)}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <Field 
                label={t('emailAddress')}
                name="email"
                type="email"
                autoComplete="email"
              />
              
              <Field 
                label={t('password')}
                name="password"
                type="password"
                autoComplete="current-password"
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('loggingIn') : t('login')}
              </Button>
            </Form>
          )}
        </Formik>
      
        <Button
          onClick={()=>signInWithRedirect({
            provider: "Google",
          })}
          className="mt-2 bg-red-600 hover:bg-red-700 focus:ring-red-500"
        >
          {t("loginWithGoogle")}
        </Button>


        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {t('dontHaveAccount')}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={`/${locale}/register`}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-200"
            >
              {t('register')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
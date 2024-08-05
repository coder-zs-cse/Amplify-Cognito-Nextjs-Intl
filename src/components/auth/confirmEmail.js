"use client";

import { z } from 'zod';
import { Formik, Form } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { Field, Button } from '@/components/form/formItems';
import { confirmEmailErrorMessage } from '@/utils/authErrors';
import { confirmUser, resendConfirmationCode } from '@/utils/cognito';
import { useTranslations } from 'next-intl';

function ConfirmEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params.locale;
  const t = useTranslations('ConfirmEmail');
  const email = searchParams.get("email");

  const confirmSchema = z.object({
    verificationCode: z.string().length(6, t('verificationCodeLength')),
  });

  const handleSubmitUpdated = async (values, { setSubmitting }) => {
    try {
      await confirmUser(email, values.verificationCode);
      toast.success(t('emailConfirmed'));
      toast(t('redirectingToLogin'));
      router.push(`/${locale}/login`);
    } catch (error) {
      toast.error(confirmEmailErrorMessage(error))
      console.error("Confirmation error", error);
    }
  }

  const handleResendCode = async () => {
    try {
      await resendConfirmationCode(email)
      toast.success(t('verificationCodeResent'));
    } catch (error) {
      console.log(error);
      toast.error(t('resendCodeFailed'));
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Formik
          initialValues={{ verificationCode: '' }}
          validationSchema={toFormikValidationSchema(confirmSchema)}
          onSubmit={handleSubmitUpdated}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <Field
                label={t('enterVerificationCode')}
                name="verificationCode"
                type="text"
                autoComplete="off"
                placeholder="123456"
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('submitting') : t('submit')}
              </Button>
            </Form>
          )}
        </Formik>
        
        <div className="w-full flex justify-end text-blue-800">
          <Button onClick={handleResendCode} className="ml-auto mt-2 bg-transparent text-blue-800 hover:bg-blue-100">
            {t('resendVerificationCode')}
          </Button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {t('alreadyVerified')}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={`/${locale}/login`}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-200"
            >
              {t('login')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmail;
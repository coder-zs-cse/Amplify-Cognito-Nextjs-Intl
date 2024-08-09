"use client";

import Link from "next/link";
import { Formik, Form } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Field, Button } from "@/components/form/formItems";
import { registerUser } from "@/utils/cognito";
import { registerErrorMessage } from "@/utils/authErrors";
import { useTranslations } from "next-intl";
import { signInWithRedirect } from "aws-amplify/auth";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterForm() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale;
  const t = useTranslations("RegisterForm");

  const validationSchema = z
    .object({
      name: z.string().min(1, t("fullNameRequired")),
      email: z.string().email(t("invalidEmail")),
      password: z.string().min(8, t("passwordMinLength")),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsMustMatch"),
      path: ["confirmPassword"],
    });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { name, email, password } = values;
    try {
      await registerUser(email, password, name);
      router.push(`/${locale}/login`);
      toast.success("Registration successful");
      toast("Redirecting to login page");
      resetForm();
      router.push(`/${locale}/confirm?email=${values.email}`);
    } catch (error) {
      toast.error(registerErrorMessage(error));
      console.error("Registration error", error);
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(validationSchema)}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <Field
                label={t("fullName")}
                name="name"
                type="text"
                autoComplete="name"
              />
              <Field
                label={t("emailAddress")}
                name="email"
                type="email"
                autoComplete="email"
              />
              <Field
                label={t("password")}
                name="password"
                type="password"
                autoComplete="new-password"
              />
              <Field
                label={t("confirmPassword")}
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t("registering") : t("register")}
              </Button>
            </Form>
          )}
        </Formik>

        <Button
          onClick={signInWithRedirect({
            provider: "Google",
          })}
          className="mt-2 bg-red-600 hover:bg-red-700 focus:ring-red-500"
        >
          {t("registerWithGoogle")}
        </Button>


        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {t("alreadyHaveAccount")}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href={`/${locale}/login`}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-200"
            >
              {t("login")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;

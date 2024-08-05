"use client";

import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from 'next-intl';

function ResetPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const params = useParams();
  const locale = params.locale;
  const t = useTranslations('ResetPassword');

  const handleRegistration = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/password/reset`,
        {
          email,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        toast(t('redirectingToLogin'));
        router.push(`/${locale}/login`);
      } else {
        throw new Error(t('resetFailed'));
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        t('resetError');
      toast.error(errorMessage);
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/resend`,
        {
          email,
        }
      );
      toast.success(t('codeSent'));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        t('resendError');
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleRegistration}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t('emailAddress')}
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('submit')}
            </button>
          </div>
        </form>
        <div className="w-full flex justify-end text-blue-800">
          <button className="ml-auto mt-2" onClick={handleResendCode}>{t('resendCode')}</button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {t('knowPassword')}
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

export default ResetPassword;
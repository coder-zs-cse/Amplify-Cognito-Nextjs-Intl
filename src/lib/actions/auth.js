'use server'

import { signIn } from "next-auth/react";
// import { signIn } from "next-auth/react";

export async function registerUser(formData) {

  console.log("data", formData);
  return { message: "Hello World" };
}

export async function loginUser(formData) {
  console.log("data", formData);
  await new Promise((resolve, reject) => {setTimeout(resolve, 5000)});
  const data = Object.fromEntries(formData);
  console.log("mydata", data);
  signIn("credentials", { ...data, callbackUrl: "/" });
  return { message: "Hello World" };
}

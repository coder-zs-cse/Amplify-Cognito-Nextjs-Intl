import ResetPassword from "@/components/auth/resetPassword";

function Register() {
  return (
    <div className=" bg-gray-100 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className=" text-center text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
      </div>
      <ResetPassword />
    </div>
  );
}

export default Register;

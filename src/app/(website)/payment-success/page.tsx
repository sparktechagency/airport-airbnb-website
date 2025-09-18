
import getProfile from "@/helpers/getProfile";
import Link from "next/link";
import { BsCheck2Square } from "react-icons/bs";

const PaymentSuccess = async () => {
  const profile = await getProfile()
  const userId = profile ? profile?._id : ""

  return (
    <div className="flex h-screen items-center justify-center   font-sans bg-green-50/40">
      <div className="relative w-full max-w-lg flex flex-col items-center justify-center ">

        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 ">
          <BsCheck2Square className="h-12 w-12 text-green-600" />
        </div>

        <h1 className="mb-6 text-4xl font-semibold text-green-600">
          Payment Successful!
        </h1>

        <p className="mb-8 text-gray-600 leading-relaxed text-xl text-center font-medium">
          Thank you for your purchase. We’ve received your order and will send you a confirmation email shortly.
        </p>

        {
          userId ?
            <Link
              href="/"
              className="inline-block rounded-lg  bg-primary px-8 py-3 text-white font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:from-blue-800 hover:to-indigo-800"
            >
              Go to Home Page
            </Link>
            :
            <Link
              href="/login"
              className="inline-block rounded-lg  bg-primary px-8 py-3 text-white font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:from-blue-800 hover:to-indigo-800"
            >
              Go to Login Page
            </Link>
        }

      </div>
    </div>
  );
};

export default PaymentSuccess;

import Link from "next/link";
import { IoMdClose } from "react-icons/io";

const PaymentCancel = () => {
  return (
    <div className="flex h-screen items-center justify-center   font-sans bg-red-50/40">
      <div className="relative w-full max-w-lg flex flex-col items-center justify-center ">
        {/* Animated Check Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 ">
          <IoMdClose className="h-12 w-12 text-red-600" />
        </div>

        <h1 className="mb-6 text-4xl font-semibold text-red-600">
          Order Cancelled
        </h1>

        <p className="mb-8 text-gray-600 leading-relaxed text-xl text-center font-medium">
        It looks like your payment was not completed or was canceled. If this was a mistake, you can try again.
        </p>

        <Link
          href="/"
          className="inline-block rounded-lg  bg-primary px-8 py-3 text-white font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:from-blue-800 hover:to-indigo-800"
        >
          Go Back To Home
        </Link>

      </div>
    </div>
  );
};

export default PaymentCancel;

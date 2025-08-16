import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#fbfbfb]">
      <div className="container lg:py-14 py-8 min-h-[calc(100vh-100px)]">
        <p className="lg:text-[32px] text-2xl font-normal text-primary lg:pb-8 pb-4">
          Privacy Policy
        </p>

        <p className="lg:text-[16px] text-sm font-normal text-[#767676] pb-5 leading-7">
          <span className="font-semibold">Privacy Policy</span> Effective Date: September 1, 2025.
          FlightDelayStays.com Management respects your privacy and is committed to protecting your
          personal information. This Privacy Policy explains how we collect, use, store, and protect your
          information when you visit our website and use our services.
        </p>

        <div className="lg:text-[16px] text-sm font-normal text-[#767676] space-y-5">
          <ol className="list-decimal list-inside space-y-4">
            <li>
              <span className="font-semibold mb-3">Information We Collect</span>
              <ol className="list-[lower-alpha] list-inside ml-5 space-y-4">

                <li className=' mt-2'>
                  <span className="font-medium">Information You Provide:</span> Name, email address,
                  phone number, mailing address, payment information, booking details, inquiries.
                </li>

                <li>
                  <span className="font-medium">Automatically Collected:</span> IP address, browser
                  type, device information, pages visited, cookies.
                </li>

                <li>
                  <span className="font-medium">Third-Party Information:</span> Data from airlines,
                  travel agencies, booking partners.
                </li>

              </ol>
            </li>

            <li>
              <span className="font-semibold">How We Use Information:</span> To process bookings,
              communicate with you, improve services, send offers (opt-in), ensure security, comply with
              laws.
            </li>


            <li>
              <span className="font-semibold">How We Share Information:</span> We do not sell data.
              Shared with service providers, partners, legal authorities, successors in business transfers.
            </li>

            <li>
              <span className="font-semibold">Data Retention:</span> Retained as long as necessary for
              services, legal obligations, dispute resolution.
            </li>

            <li>
              <span className="font-semibold">Security:</span> We use encryption, secure servers, and
              access controls but cannot guarantee absolute security.
            </li>

            <li>
              <span className="font-semibold">Cookies:</span> Used for site functionality, preferences,
              analytics. You can control via browser settings.
            </li>

            <li>
              <span className="font-semibold">Your Rights:</span> Access, correct, delete, opt-out,
              restrict processing. Contact <a href='mailto:info@FlightDelayStays.com' className="underline text-primary">info@FlightDelayStays.com</a>.
            </li>

            <li>
              <span className="font-semibold">Third-Party Links:</span> We are not responsible for privacy
              practices of other sites.
            </li>

            <li>
              <span className="font-semibold">Children’s Privacy:</span> Not directed to under 18. No
              knowing collection of children&#39;s data.
            </li>

            <li>
              <span className="font-semibold">Policy Changes:</span> We may update and post changes
              with new effective date.
            </li>

            <li>
              <span className="font-semibold">Contact Us:</span> Email: info@flightdelaystays.com | Phone:
              1-877-489-9689 ECT 7
            </li>
            
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

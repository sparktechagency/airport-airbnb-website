import React from 'react';

const Disclaimer = () => {
  return (
    <div className='bg-[#fbfbfb]'>
      <div className='container mx-auto lg:py-14 py-8 min-h-[calc(100vh-100px)]'>
        <h1 className='lg:text-[32px] text-2xl font-normal  text-primary pb-4'>Website Disclaimer for FlightDelayStay.com</h1>
        <p className='text-sm font-normal text-[#767676] pb-4'> <span className=" font-semibold"> Effective Date: </span> September 1,2025</p>
        <p className='text-sm font-normal text-[#767676] pb-4'>
          Welcome to <span className=" font-semibold text-primary"> FlightDelayStay.com </span> . By using this website, you acknowledge and agree to the following terms and conditions:
        </p>

        <h2 className='text-[16px] font-semibold text-[#767676] pt-4 pb-2'>1. Platform Purpose & Responsibility</h2>
        <p className='text-sm font-normal text-[#767676] pb-4'>
          FlightDelayStay.com acts solely as an independent communication platform that connects individuals seeking temporary lodging (&quot;Visitors&quot;) with those offering accommodations (&quot;Hosts&quot;). We do not own, operate, or control any of the properties listed on this website, and we are not a party to any rental agreements or transactions entered into between Hosts and Visitors.
        </p>
        <p className='text-sm font-normal text-[#767676] pb-4'>
          As such, FlightDelayStay.com is not responsible or liable for any interactions, disputes, conduct, agreements, cancellations, injuries, damages, losses, or other issues that may arise before, during, or after a stay arranged through this platform.
        </p>

        <h2 className='text-[16px] font-semibold text-[#767676] pt-4 pb-2'>2. Verification System</h2>
        <p className='text-sm font-normal text-[#767676] pb-4'>
          FlightDelayStay.com offers a Verified Badge System, which identifies Hosts and Visitors who have completed our internal verification process. While this system adds a layer of security, it does not guarantee safety, accuracy, or trustworthiness, and we advise all users to exercise their own judgment and discretion when engaging with others.
        </p>

        <h2 className='text-[16px] font-semibold text-[#767676] pt-4 pb-2'>3. Background Check Services</h2>
        <p className='text-sm font-normal text-[#767676] pb-4'>
          As an added option, users may access external background check services through provided weblinks on this site. These services are offered by third-party providers, and if you choose to use them, you acknowledge that:
        </p>
        <ul className='list-disc pl-5 text-sm font-normal text-[#767676] pb-4'>
          <li>You do so voluntarily;</li>
          <li>You are responsible for all associated costs;</li>
          <li>FlightDelayStay.com is not affiliated with, compensated by, or liable for the results or experiences related to such services.</li>
        </ul>

        <h2 className='text-[16px] font-semibold text-[#767676] pt-4 pb-2'>4. No Guarantees or Endorsements</h2>
        <p className='text-sm font-normal text-[#767676] pb-4'>
          FlightDelayStay.com does not guarantee:
        </p>
        <ul className='list-disc pl-5 text-sm font-normal text-[#767676] pb-4'>
          <li>The availability, quality, cleanliness, legality, or condition of listed properties;</li>
          <li>The behavior, communication, or background of any user;</li>
          <li>The accuracy of user-generated content or listings.</li>
        </ul>
        <p className='text-sm font-normal text-[#767676] pb-4'>
          We do not endorse any user or listing and recommend that all parties communicate clearly, vet each other carefully, and consider safety precautions when meeting or booking a stay.
        </p>

        <h2 className='text-[16px] font-semibold text-[#767676] pt-4 pb-2'>5. Use at Your Own Risk</h2>
        <p className='text-sm font-normal text-[#767676] pb-4'>
          By continuing to use this website, you understand and accept that you do so entirely at your own risk. We disclaim all warranties, express or implied, to the maximum extent permitted by law.
        </p>

        <p className='text-sm font-semibold text-[#767676] pt-4 pb-2'>Questions or Concerns?</p>
        <p className='text-sm font-normal text-[#767676] pb-4'>
          If you have any questions about this disclaimer, please contact us at:
        </p>
        <ul className='list-none pl-0 text-sm font-normal text-[#767676] pb-4'>
          <li><a href='mailto:customercare@flightdelayload.com' className='text-primary font-medium'>customercare@flightdelayload.com</a></li>
          <li><a href='https://www.FlightDelayStay.com' className='text-primary font-medium'>FlightDelayStay.com Management</a></li>
        </ul>
      
      </div>
    </div>
  );
};

export default Disclaimer;
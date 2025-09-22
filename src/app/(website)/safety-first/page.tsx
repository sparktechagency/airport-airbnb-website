import React from 'react';

const SafetyPage = () => {
    return (
        <div>
            <div className="container mx-auto p-6 bg-white text-gray-800 text-[16px]">
                <h1 className="text-lg font-semibold mb-4">Safety First at FlightDelayStay.com</h1>
                <p className="mb-6">Your well-being is our top priority. Whether you&apos;re renting a room for just one night or a longer stay, we want to ensure you feel safe and secure throughout your journey.</p>

                <h2 className=" font-semibold mt-6 mb-4">Before Booking a Room</h2>
                <ul className="list-disc pl-6 mb-6">
                    <li>Verify Host Information: Only book through our secure FlightDelayStay.com platform. Avoid sending money or communicating outside our system.</li>
                    <li>Check Reviews & Ratings: Read past guest feedback carefully. Consistent positive reviews are a good sign of reliability.</li>
                    <li>Ask Questions: A legitimate host will be happy to answer questions about the room, location, and amenities.</li>
                </ul>

                <h2 className=" font-semibold mt-6 mb-4">When You Arrive</h2>
                <ul className="list-disc pl-6 mb-6">
                    <li>Inspect the Space: Make sure doors and windows lock properly. Note all exits.</li>
                    <li>Trust Your Instincts: If something feels wrong—whether it’s the neighborhood, the property, or the interaction—step away and contact us immediately.</li>
                    <li>Secure Valuables: Keep passports, cash, and electronics in a locked bag or safe whenever possible.</li>
                </ul>

                <h2 className=" font-semibold mt-6 mb-4">During Your Stay</h2>
                <ul className="list-disc pl-6 mb-6">
                    <li>Share Your Location: Let a friend or family member know where you&apos;re staying.</li>
                    <li>Stay Aware: Avoid opening the door to strangers. Always ask who is there before unlocking.</li>
                    <li>Know Emergency Contacts: Familiarize yourself with local emergency numbers in addition to 911 in the U.S.</li>
                </ul>

                <h2 className=" font-semibold mt-6 mb-4">If You Ever Feel Unsafe</h2>
                <p className="mb-4">Here’s what to do immediately:</p>
                <ol className="list-decimal pl-6 mb-6">
                    <li>Leave the Property: Your safety comes first. Do not hesitate.</li>
                    <li>Call Local Authorities: Dial 911 (U.S.) or the local emergency number.</li>
                </ol>

                <h2 className=" font-semibold mt-6 mb-4">Notify FlightDelayStay.com</h2>
                <ul className="list-disc pl-6 mb-6">
                    <li>Call our 24/7 Safety Hotline: [insert Hotline Number]</li>
                    <li>Email: safety@flightdelaystay.com</li>
                    <li>Use the &quot;Report an Issue&quot; button in your account dashboard.</li>
                </ul>
                <p className="mb-4">Our team will:</p>
                <ul className="list-disc pl-6 mb-6">
                    <li>Provide immediate guidance.</li>
                    <li>Contact the host if needed.</li>
                    <li>Help you find alternate accommodations.</li>
                    <li>Work with local authorities if necessary.</li>
                </ul>

                <h2 className=" font-semibold mt-6 mb-4">Simple Safety Illustrations</h2>
                <p className="mb-4">(These can be shown as icons or infographics on the webpage)</p>
                <ul className="list-disc pl-6 mb-6">
                    <li> <span className='font-medium'>Red Flag: </span> Host asks you to pay outside the platform.</li>
                    <li> <span className='font-medium'>Check Locks: </span>  Test doors and windows right after check-in.</li>
                    <li> <span className='font-medium'>Stay Connected: </span>  Share your live location with a trusted contact.</li>
                    <li> <span className='font-medium'>Know Who to Call: </span>  911 for emergencies, and FlightDelayStay.com support for issues.</li>
                </ul>

                <p className="mt-6">Our Commitment</p>
                <p className="mb-4">At FlightDelayStay.com, we are committed to safe, reliable, and trustworthy stays. Your comfort is important—but   <span className="font-semibold">your safety always comes first.</span> </p>
              <p> Management of FlightDelayStay.com </p>
            </div>
        </div>
    );
};

export default SafetyPage;
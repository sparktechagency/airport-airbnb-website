import WhyUse from '@/components/shared/WhyUse';
import Image from 'next/image';
import React from 'react';

const About = () => {
    return (
        <div>
            <p className='lg:text-[32px] text-2xl font-normal  text-primary  container pt-14'> About FlightDelayStays.com </p>
            <div className=' grid grid-cols-1 md:grid-cols-2  gap-9 px-4 lg:pt-8 pt-4 container'>
                <div>
                    <p className='text-[16px] text-[#5C5C5C] font-semibold pb-2 '> Turning Flight Delays into Moments of Comfort  </p>
                    <p className='text-sm text-[#5C5C5C] font-normal  pb-1'> At FlightDelayStays.com, we believe that an unexpected delay doesn’t have to mean an uncomfortable night in an airport chair or hours of stress searching for a last-minute room. We exist to connect stranded airline passengers and also airline staff with caring hosts who have safe, comfortable accommodations available—often just minutes from the airport. We offer a SPECIAL DISCOUNT for VERIFIED AIRLINE STAFF EMPLOYEES that use our site daily. </p>


                    <p className='text-[16px] text-[#5C5C5C] font-semibold pt-5 pb-2 '> Our Story </p>
                    <p className='text-sm text-[#5C5C5C] font-normal  pb-2 flex flex-col gap-3'>
                        <span> Flight delays and cancellations happen every day, leaving travelers tired, frustrated, and often with limited options. Traditional last-minute hotel bookings can be expensive, fully booked, or far from the airport. </span>

                        <span>Our Founder, Alan Cousin, used to work for Delta Airlines from 1996 to 2001 as a Delta Airlines Customer Supervisor. He was also part of the Delta Irregular Operations Team (DELTA IROP TEAM) and recall the many times and customers he assisted with daily cancellations. Alan always wanted to find a proper solution to better serve customers due to the shortage of Airline Staff available with every Airline Cancellation. Now years later, FlightDelayStays.com is the solution that that problem. </span>

                        <span>FlightDelayStays.com was born from the idea that people helping people can change the travel experience for the better. Our founder envisioned a community where hosts could offer their available rooms to travelers in need—creating a faster, fairer, and friendlier way to find a place to rest during life’s travel hiccups. </span>
                    </p>

                </div>

                <div>
                    <Image src={"https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt='' height={700} width={1200} className='h-full w-full' />
                </div>
            </div>
            <div className=' container lg:pb-20 pb-14 pt-10 '>

                {/* Mission Section */}
                <div className=" mb-6">
                    <h2 className="text-[16px] text-[#5C5C5C] font-semibold mb-2">Our Mission</h2>
                    <p className="text-sm text-[#5C5C5C] font-normal">
                        To build a trusted, global network that makes it easy for stranded passengers to find a safe, peaceful stay while fostering genuine connections between hosts and guests.
                    </p>
                  
                </div>

                {/* Vision Section */}
                <div className=" mb-6">
                    <h2 className="text-[16px] text-[#5C5C5C] font-semibold mb-2">Our Vision</h2>
                    <p className="text-sm text-[#5C5C5C] font-normal">
                        A world where no traveler feels stranded, and where unexpected delays lead to new experiences, friendships, and peace of mind.
                    </p>
           
                </div>

                {/* What We Do Section */}
                <div className=" mb-6">
                    <h2 className="text-[16px] text-[#5C5C5C] font-semibold mb-2">What We Do</h2>
                    <ul className="list-disc pl-5 text-sm text-[#5C5C5C] font-normal space-y-2">
                        <li>For Travelers: We provide a simple, secure platform to find short-term accommodations near airports—fast.</li>
                        <li>For Airline Staff: We provide a secondary option for Airline Pilots, Flight Attendants, and other Airline Staff that would like a short term stay at a closer location to the airport versus the current hotels and hotel prices.</li>
                        <li>For Hosts: We offer an opportunity to fill unused rooms while helping travelers in need.</li>
                        <li>For the Community: We bring people together in a way that’s built on respect, trust, and kindness.</li>
                    </ul>
           
                </div>

                {/* Our Values Section */}
                <div className=" mb-6">
                    <h2 className="text-[16px] text-[#5C5C5C] font-semibold mb-2">Our Values</h2>
                    <ul className="list-disc pl-5 text-sm text-[#5C5C5C] font-normal space-y-2">
                        <li>Safety First – Verified hosts, secure payments, and clear communication.</li>
                        <li>Respect & Kindness – Every interaction matters, and every guest deserves to feel welcome.</li>
                        <li>Transparency – No hidden fees, no surprises—just honest listings and fair terms.</li>
                        <li>Speed & Reliability – Our system is designed for urgent situations, getting travelers booked in minutes.</li>
                    </ul>
           
                </div>

                {/* Why Choose Us Section */}
                <div className=" mb-6">
                    <h2 className="text-[16px] text-[#5C5C5C] font-semibold mb-2">Why Choose FlightDelayStays.com?</h2>
                    <p className="text-sm text-[#5C5C5C] font-normal">
                        Because we understand that travel disruptions can be stressful. We’re here to replace that stress with solutions—helping you find a warm bed, a friendly face, and peace of mind, no matter what the airline schedule says.
                    </p>
           
                </div>

                {/* Join Our Community Section */}
                <div className=" mb-6">
                    <h2 className="text-[16px] text-[#5C5C5C] font-semibold mb-2">Join Our Community</h2>
                    <p className="text-sm text-[#5C5C5C] font-normal">
                        Whether you’re a traveler looking for a safe place to rest or a host ready to open your doors, FlightDelayStays.com is more than just a booking site—it’s a community built on trust, connection, and compassion.
                    </p>
                    <p className="text-sm text-[#5C5C5C] font-normal mt-2">
                        Together, we can make travel delays a little easier, one stay at a time. Just like Alan Cousin always went “ABOVE AND BEYOND” as a Delta Airlines Customer Supervisor, He plans on doing the same in assisting customers with comfort and ease of locating a place to rest when stranded by unexpected situations.
                    </p>
           
                </div>

                {/* Turning Flight Delays Section */}
                <div className="">
                    <p className="text-[16px] text-gray-700 font-semibold pb-2">
                        Turning Flight Delays into Moments of Comfort
                    </p>
                    <p className="text-sm text-gray-600 font-normal pb-1">
                        At FlightDelayStays.com, we believe that an unexpected delay doesn’t have to mean an uncomfortable night in an airport chair or hours of stress searching for a last-minute room. We exist to connect stranded airline passengers and also airline staff with caring hosts who have safe, comfortable accommodations available—often just minutes from the airport. We offer a SPECIAL DISCOUNT for VERIFIED AIRLINE STAFF EMPLOYEES that use our site daily.
                    </p>
                </div>
            </div>

            <div>
                <WhyUse />
            </div>
        </div>
    );
};

export default About;
import WhyUse from '@/components/shared/WhyUse';
import Image from 'next/image';
import React from 'react';

const About = () => {
    return (
        <div>
            <p className='lg:text-[32px] text-2xl font-normal  text-primary  container pt-14'> AIRPORT AIRBNB’s Story </p>
            <div className=' grid grid-cols-1 md:grid-cols-2  gap-9 px-4 lg:pt-8 pt-4 lg:pb-20 pb-14 container'>
                <div>

                    <div className='text-sm font-normal text-[#5C5C5C] flex flex-col gap-4'>
                        <span>
                            scelerisque convallis. Sed faucibus dui. sit tincidunt eu placerat. eget Ut nisi cursus venenatis tortor. leo. faucibus dui diam est. Ut at sed tincidunt eget consectetur non, tincidunt In efficitur. laoreet non felis, faucibus Praesent id id diam elementum Donec ex venenatis id porta ex tincidunt dui. sodales. Sed tempor eget Vestibulum Quisque luctus dui lacus sed gravida facilisis adipiscing id sed Ut vitae odio gravida In venenatis felis, tempor faucibus amet, Nunc sapien vitae ex convallis. tortor. dolor nisi massa amet, urna tincidunt ac eget sed nulla, eu nec malesuada venenatis convallis. quam nisl. Donec In sed quis urna. ullamcorper elementum gravida enim. sit nisl. sollicitudin. hendrerit fringilla lacus dui. consectetur venenatis placerat. placerat lacus, at viverra
                        </span>

                        <span>
                            tincidunt dui fringilla tortor. ipsum tempor Praesent laoreet luctus tempor id quam ipsum ullamcorper ultrices Nunc convallis. scelerisque sollicitudin. venenatis Lorem orci massa massa Morbi sit hendrerit volutpat placerat nec at non hendrerit Morbi ex nec amet, Nunc fringilla Nunc Donec at tempor luctus ex Nunc varius Quisque sit in facilisis at libero, quis adipiscing maximus felis, amet, turpis quis at urna diam Praesent Cras libero, lacus tempor elementum Lorem vitae elementum tincidunt lorem. nec Vestibulum lacus Ut tincidunt orci est. nec lacus, risus enim. laoreet cursus ipsum nec ultrices Donec urna. diam ullamcorper vel consectetur libero, Nunc In cursus odio faucibus
                        </span>
                    </div>
                </div>

                <div>
                    <Image src={"https://images.unsplash.com/photo-1522071901873-411886a10004?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt='' height={700} width={1200} className='h-full w-full' />
                </div>
            </div> 

            <div> 
                <WhyUse/>
            </div>
        </div>
    );
};

export default About;
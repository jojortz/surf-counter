'use client';

import Container from "../Container";
import NavbarMenu from "./NavbarMenu";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    return (  
        <div
        className={`fixed w-full z-50 flex flex-col justify-center h-[60px] lg:h-[80px] py-4 bg-gradient-to-r from-purple-600 to-blue-500 shadow-md shadow-blue-500/50`}
        >
            <div className="
            py-4
            "
            >
                <Container>
                    <div className="flex items-center justify-between">
                        <div 
                            className="text-2xl lg:text-4xl font-semibold cursor-pointer"
                            onClick={() => router.push('/')}
                            >
                            Surf Counter
                        </div>
                        <NavbarMenu/>
                    </div>
                </Container>
            </div>
        </div>
    )

};

export default Navbar;
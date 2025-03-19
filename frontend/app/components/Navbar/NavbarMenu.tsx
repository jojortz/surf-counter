'use client';
import { useRouter } from 'next/navigation';
import NavbarMenuItem from './NavbarMenuItem';

const NavbarMenu = () => {
    const router = useRouter();
    return (
        <div className="flex gap-8">
            <NavbarMenuItem text="Demo" onClick={() => router.push('/')}/>
            <NavbarMenuItem text="About"onClick={() => router.push('/about')}/>
        </div>
    )
};

export default NavbarMenu;
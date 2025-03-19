interface NavbarMenuItemProps {
    text: string;
    onClick: () => void;
}

const NavbarMenuItem = ({text, onClick}: NavbarMenuItemProps) => {
    return (
        <div onClick={onClick} className="cursor-pointer font-semibold hover:text-purple-500">{text}</div>
    )
}

export default NavbarMenuItem;
interface NavbarMenuItemProps {
    text: string;
    onClick: () => void;
}

const NavbarMenuItem = ({text, onClick}: NavbarMenuItemProps) => {
    return (
        <div onClick={onClick} className="text-lg cursor-pointer font-semibold hover:text-purple-600">{text}</div>
    )
}

export default NavbarMenuItem;
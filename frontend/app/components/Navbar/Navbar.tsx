import Container from "../Container";
import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
    return (  
        <div
        className={`fixed w-full z-50 flex flex-col justify-center h-[100px] pt-10`}
        >
            <div className="
            py-4
            "
            >
                <Container>
                    <div className="flex items-center justify-between">
                        <div className="text-4xl font-semibold">
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
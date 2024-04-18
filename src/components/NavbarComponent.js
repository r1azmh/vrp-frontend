import {Navbar} from 'flowbite-react';

export default function NavbarComponent() {
    return (
        <Navbar fluid className="px-4">
            <Navbar.Brand as={'a'} href="/">

                <span
                    className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">VRP Solutions</span>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Navbar.Link href="/" active>
                    Home
                </Navbar.Link>
                <Navbar.Link as={'a'} href="about">
                    About
                </Navbar.Link>
                <Navbar.Link href="contact">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

// import {Navbar} from 'flowbite-react';
import {Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle} from "flowbite-react";

export default function NavbarComponent() {
    return (
        <Navbar fluid className="px-4">
            <NavbarBrand as={'a'} href="/">

                <span
                    className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">VRP Solutions</span>
            </NavbarBrand>
            <NavbarToggle/>
            <NavbarCollapse>
                <NavbarLink href="/" active>
                    Home
                </NavbarLink>
                <NavbarLink as={'a'} href="/about/">
                    About
                </NavbarLink>
                <NavbarLink as={'a'} href="/contact/">Contact</NavbarLink>
                <NavbarLink as={'a'} href="/dashboard/">Dashboard</NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
}

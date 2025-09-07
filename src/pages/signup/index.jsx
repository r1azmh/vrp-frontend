import {Button, Label, TextInput} from "flowbite-react";
import {PiGoogleLogoDuotone} from "react-icons/pi";

export default function Signup() {
    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-4 py-10 lg:px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="image-wrapper flex w-full justify-center mb-4">
                    <img
                        src="/logo.png"
                        alt="brand logo"
                        className="h-auto w-24"
                    />
                </div>

                <h3 className="text-center text-xl font-semibold text-foreground">
                    Create your account
                </h3>

                <form className="mt-6 space-y-4">
                    <div>
                        <Label htmlFor="email" value="Email"/>
                        <TextInput
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            placeholder="john@company.com"
                            className="mt-2"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="password" value="Password"/>
                        <TextInput
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            placeholder="password"
                            className="mt-2"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="confirm-password" value="Confirm Password"/>
                        <TextInput
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            autoComplete="new-password"
                            placeholder="confirm password"
                            className="mt-2"
                            required
                        />
                    </div>

                    <Button type="submit" className="mt-4 w-full">
                        Sign up
                    </Button>
                </form>

            </div>
        </div>
    );
}

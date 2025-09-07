import { useEffect, useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";


export default function Login() {
    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        if (window.CSRF_TOKEN) {
            setCsrfToken(window.CSRF_TOKEN);
        }
    }, []);

    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-4 py-10 lg:px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="image-wrapper flex w-full justify-center mb-4">
                    <img
                        src="/src/assets/logo/anymate_logo.svg"
                        alt="brand logo"
                        className="h-auto w-24"
                    />
                </div>

                <h3 className="text-center text-xl font-semibold text-foreground">
                    Log in or create account
                </h3>

                <form method="POST" className="mt-6 space-y-4">
                    {/* CSRF token from Django */}
                    <input
                        type="hidden"
                        name="csrfmiddlewaretoken"
                        value={csrfToken}
                    />

                    <div>
                        <Label htmlFor="username" value="Username" />
                        <TextInput
                            type="text"
                            id="username"
                            name="username"
                            autoComplete="username"
                            placeholder="username"
                            className="mt-2"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="password" value="Password" />
                        <TextInput
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            placeholder="password"
                            className="mt-2"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" name="remember" />
                            <Label htmlFor="remember" className="text-sm">
                                Remember me
                            </Label>
                        </div>
                        <a
                            href="{% url 'password_reset' %}"
                            className="text-sm text-indigo-600 hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </form>

                <p className="mt-4 text-xs text-muted-foreground text-center">
                    By signing in, you agree to our{" "}
                    <a
                        href="#"
                        className="underline underline-offset-4 hover:text-foreground transition-colors"
                    >
                        terms of service
                    </a>{" "}
                    and{" "}
                    <a
                        href="#"
                        className="underline underline-offset-4 hover:text-foreground transition-colors"
                    >
                        privacy policy
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}

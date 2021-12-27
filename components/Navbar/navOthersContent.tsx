import Link from "next/link";
import { NavAuthPageOthersContentRoutes } from "../../interfaces/types";

export const NavOthersContent = (route: NavAuthPageOthersContentRoutes) => {
    console.log({ route });

    switch (route) {
        case "/signup":
            return (
                <p>
                    Already have an account? <Link href="/signin">Sign in</Link>
                </p>
            );

        case "/signin":
        case "/reset":
            return (
                <p>
                    Don’t have an account?{" "}
                    <Link href="/signup">
                        <a>Sign up</a>
                    </Link>
                </p>
            );

        case "/verify":
            return null;
    }
};

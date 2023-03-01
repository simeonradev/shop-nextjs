import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Loader } from "./Loader";

const UNPROTECTED_ROUTES = ["/login", "/"];

export const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "loading") return <Loader />;

  if (
    status === "unauthenticated" &&
    !UNPROTECTED_ROUTES.includes(router.asPath)
  ) {
    router?.push("/login");
    return <Loader />;
  }

  return children;
};

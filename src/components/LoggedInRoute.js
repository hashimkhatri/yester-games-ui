import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoggedInRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authResponse");
    if (token !== null) {
      setIsAuthenticated(true);
      router.push("/lobby");
    }
  }, []);

  if (isAuthenticated) return <div></div>;

  return <>{children}</>;
}

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchData, postData, updateData, deleteData }  from "@/utils/ApiUtils";
import { useLoader } from "@/utils/LoaderManager";


export default function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const token = localStorage.getItem('authResponse');
    if (token === null) {
      hideLoader(false);
      router.push('/');
    }
    const checkTokenValidity = async () => {
      try {
        const response = await fetchData(
          "profile",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response) {
          setIsAuthenticated(true);
        }
        else {
          localStorage.removeItem('authResponse');
          router.push('/');
        }
      } catch (error) {
        localStorage.removeItem('authResponse');
        router.push('/');
      } finally {
        setLoading(false);
        hideLoader(false);
      }
    };

    checkTokenValidity();
  }, [router]);

  if (loading) return <div></div>;

  return <>{isAuthenticated && children}</>;
}

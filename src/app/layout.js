import Header from "@/components/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleSignInProvider } from "@/context/GoogleSignInContext";
import { LoaderProvider } from "@/utils/LoaderManager";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import "./globals.css";

export const metadata = {
  title: "Yester Game",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-main">
        <GoogleOAuthProvider clientId="372029074880-3p219cju3fama53qj253mnmdgokrdmd8.apps.googleusercontent.com">
          <GoogleSignInProvider>
            <LoaderProvider>
            <Header />

            {children}
            </LoaderProvider>
          </GoogleSignInProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

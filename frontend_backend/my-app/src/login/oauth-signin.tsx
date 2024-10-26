"use client";
import { Button } from "../components/ui/button";
import { Provider } from "@supabase/supabase-js";
import { Github} from "lucide-react";
import { oAuthSignIn } from "./actions";
// import GoogleIcon from "../app/utils/assets/google.svg" ;
type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OAuthButtons() {
  const oAuthProviders: OAuthProvider[] = [
    {
      name: "github",
      displayName: "GitHub",
      icon: <Github className="size-5" />,
    },
    {
      name: "google",
      displayName: "Google",
      // icon: <GoogleIcon className="size-5" />,
    },
  ];

  return (
    <>
      {oAuthProviders.map((provider) => (
        <></>
        // <Button
        //   className="w-full flex items-center justify-center gap-2"
        //   variant="outline"
        //   onClick={async () => {
        //     await oAuthSignIn(provider.name);
        //   }}
        // >
        //   {provider.icon}
        //   Login with {provider.displayName}
        // </Button>
      ))}
    </>
  );
}

import { useRouter } from "next/router";
import { useEffect } from "react";
import { RouteAuthentication } from "../hooks/RouteAuthentication";

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    RouteAuthentication(router)
  }, []);

}

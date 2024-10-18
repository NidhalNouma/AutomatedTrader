import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../lib/users";
import { checkUser } from "../lib/auth";
import { getPlanById, checkTSlifetime } from "../utils/pricing";
import axios from "axios";
import { useRouter } from "next/router";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [fullUser, setFullUser] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const getFullUser = async (userId, onComplete) => {
    if (!userId) return;

    const user = await getUser(userId);
    if (user) {
      if (user.subscriptionActive) {
        // const sub = await axios.get(
        //   `/api/chargebee/get?id=${user.subscriptionId}`
        // );
        // user.subscription = sub.data;
        user.hasAccessTo = getPlanById(
          user.subscriptionPID,
          user.lifetimeAccess
        );
        // console.log(user, "access User ....");
        // user.hasAccessTo = null;
      } else if (user.lifetimeAccess) {
        user.hasAccessTo = getPlanById(null, user.lifetimeAccess);
      }

      // if (!user.hasAccessTo) {
      //   const ts = await checkTSlifetime(user.email);
      //   if (ts?.length > 0 && ts.find((v) => v.Email === user.email)) {
      //     user.hasAccessTo = getPlanById(null, true);
      //   }
      // }
    }

    console.log(user);

    setFullUser(user);
    if (onComplete) onComplete();
    return user;
  };

  useEffect(() => {
    checkUser(
      setUser,
      getFullUser,
      () => setLoading(false),
      () => setLoading(false)
    );
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, fullUser, setFullUser, getFullUser, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export const withAuth = (WrappedComponent, frontend = false) => {
  return (props) => {
    const router = useRouter();
    const { pathname } = router;
    const { subscription } = router.query;
    const { user, fullUser, loading } = useContext(UserContext);

    useEffect(() => {
      if (!loading) {
        if (frontend) {
          if (user && fullUser) {
            if (subscription) router.push("/membership?m=" + subscription);
            else router.replace("/home");
          }
        } else if (!user && !fullUser) {
          router.replace("/signup");
        }

        // if (user && fullUser) {
        //   if (!fullUser.hasAccessTo) router.push("/welcome");
        // }
      }
    }, [user, router, loading]);

    return <WrappedComponent {...props} />;
  };
};

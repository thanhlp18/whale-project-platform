import { useSession } from "next-auth/react";
import React, { createContext, useContext } from "react";

export type AuthContextProps = {
  userId: string | null;
};
export const AuthContext = createContext<AuthContextProps>({
  userId: null,
});

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { data: session, status } = useSession();

  return (
    <AuthContext.Provider
      value={{
        userId: status === "authenticated" ? (session as any)?.id : null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { userId } = useContext(AuthContext);
  return {
    userId,
    authenticated: !!userId,
  };
};

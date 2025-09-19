import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  // cookies() is sync, no await
  const cookieStore = await cookies();

  // Prod uses "__Secure-next-auth.session-token"
  const prodToken = cookieStore.get("__Secure-next-auth.session-token")?.value;

  // Local dev uses "next-auth.session-token"
  const devToken = cookieStore.get("next-auth.session-token")?.value;

  const encryptedToken = prodToken || devToken;
  console.log("Encrypted Token:", encryptedToken);

  if (!encryptedToken) return null;

  // Decode JWT (this is async)
  const decodedToken = await decode({
    token: encryptedToken,
    secret: process.env.NEXTAUTH_SECRET as string, // ⚡ use NEXTAUTH_SECRET, not AUTH_SECRET
  });

  console.log("Decoded Token:", decodedToken);

  return decodedToken?.token || null;
}

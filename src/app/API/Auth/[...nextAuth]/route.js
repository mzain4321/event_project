
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import userLogin from "@/app/Models/userLogin";
import Admin from "@/app/Models/adminLogin";

const handler = NextAuth({
    // Providers array: Defines the authentication methods (in this case, Credentials-based authentication).
    providers: [
        CredentialsProvider({
            // Name of the authentication provider (used for display).
            name: "Credentials",
            // The fields for entering credentials (email and password).
            credentials: {
                email: { label: "Email", type: "email" },  // Email field
                password: { label: "Password", type: "password" },  // Password field
            },

            async authorize(credentials) {
                await connectDB();
                const user = await userLogin.findOne({
                    email: credentials?.email,
                }).select("+password");

                // user = await Admin.findOne({
                //     email: credentials?.email,
                // }).select("+password");

                if (!user) throw new Error("Wrong Email");

                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!passwordMatch) throw new Error("Wrong Password");

                return user;

            },
        }),
    ],

    // Session management using JWT (JSON Web Token).
    session: {
        strategy: "jwt",  // Use JWT for session management instead of a database session.
        // Set the session maxAge (in seconds)
        maxAge: 30 * 24 * 60 * 60, // 30 days (in seconds)

        // Optionally, you can also set an expiry for refresh tokens if you're using JWT
        updateAge: 24 * 60 * 60, // 24 hours (how often the session will be updated)
    },


    callbacks: {

        async jwt({ token, user }) {
            // If a user object is returned (during login), add user information to the token.
            if (user) {
                token.id = user.id;  // Add user ID to the token.
                token.email = user.email;  // Add user email to the token.
            }
            // Return the updated token object.
            return token;
        },

        async session({ session, token }) {
            session.id = token.id;  // Pass user ID to the session.
            session.email = token.email;  // Pass user email to the session.
            session.token = token;  // Store the full token object in the session (optional).
            return session;  // Return the modified session.
        },
    },
});

// Export the handler for both GET and POST requests.
export { handler as GET, handler as POST };
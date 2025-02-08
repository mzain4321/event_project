"use client";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Mail } from "../lib/send-mail";

export default function Page() {
  const [signUpUser, setSignUpUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signInUser, setSignInUser] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true);

  const route = useRouter();

  const emailValidation = (em) => {
    if (isSignUp) {
      setSignUpUser({ ...signUpUser, email: em });
    } else {
      setSignInUser({ ...signInUser, email: em });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(em)) {
      setEmailError("Email is valid");
      setIsEmailValid(true);
    } else {
      setEmailError("Email is Invalid");
      setIsEmailValid(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Check if email is valid
    if (emailError === "Email is valid") {
      if (signInUser.email && signInUser.password) {
        try {
          const response = await fetch(
            `/API/Auth/SignIn?email=${signInUser.email}&password=${signInUser.password}`,
            {
              method: "GET", // GET request
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();

          if (response.ok) {
            toast.success(`${data["data"].role === "admin" ? "Admin" : "User"} Sign In  Successfully!`);
            localStorage.setItem('signedInUser',JSON.stringify(data["data"]));
            setSignInUser({ email: "", password: "" });
            setEmailError("");

            if (data["data"].role === "admin") {
              route.push("/Dashboard");
            } else if (data["data"].role === "user") {
              route.push("/Home");
            } else {
              toast.error("User role not found.");
            }
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Error during Sign In:", error);
          toast.error("An error occurred during Sign In");
        }
      } else {
        toast.error("Please fill in all fields.");
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (emailError === "Email is valid") {
      if (
        signUpUser.name &&
        signUpUser.email &&
        signUpUser.password &&
        signUpUser.confirmPassword
      ) {
        if (signUpUser.password === signUpUser.confirmPassword) {
          try {
            const response = await fetch("/API/Auth/SignUp", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(signUpUser),
            });

            const data = await response.json();

            if (response.ok) {
              toast.success(`${data.role === "admin" ? "Admin" : "User"} Registered Successfully!`);
              setIsSignUp(false);
              setSignUpUser({ name:"", email: "", password: "", confirmPassword: ""});
              setEmailError("");
              const resp = await Mail({
                to: signUpUser.email,
                subject: ` Welcome to EventSphere, ${signUpUser.name}! 🚀`,
                message: `<p>Dear ${signUpUser.name},</p>
                <p>Thank you for joining EventSpher! We’re thrilled to have you as a part of our community.</p>
                <p>With EventSpher, you can explore, create, and share amazing events tailored to your interests. Whether you’re here to host or attend events, we’re here to make your experience smooth and exciting.</p>
              <p>Here’s what you can do next:</p>
              <ul>
             <li>Complete your profile to get personalized recommendations.</li>
              <li>Start browsing events and discover what’s happening near you.</li>
              <li>Create your own event and share it with the community.</li>
              </ul>
              <p>If you have any questions, feel free to reply to this email or visit our <a href="https://eventspher.com/support">Support Page</a>.</p>
              <p>We’re excited to see the events you’ll create and join!</p>
              <p>Best regards,</p>
              <p><strong>The EventSpher Team</strong></p>`,
              });
              
            } else {
              toast.error(data.message);
            }
          } catch (error) {
            console.error("Error during Sign Up:", error);
            toast.error("An error occurred during Sign Up");
          }
        }
      } else {
        toast.error("Please fill in all fields.");
      }
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setEmailError("");
    setIsEmailValid(null);
  };

  return (
    <div className="w-full flex justify-center bg-[#fff000]">
      <div className="w-[80%] flex flex-col lg:flex-row mb-20 mt-28 bg-white rounded-2xl shadow-xl">
        <div className="w-full lg:w-1/2 hidden lg:block">
          <Image
            src="/Images/loginSideImg.jpg"
            width={300}
            height={300}
            alt="Login Side Image"
            className="w-full h-full rounded-l-2xl"
          />
        </div>
        <div className="w-full lg:w-1/2">
          {isSignUp ? (
            <form
              onSubmit={handleSignUp}
              className="w-full px-5 lg:px-8 flex flex-col py-14"
            >
              <label className="text-2xl lg:text-4xl font-serif text-center tracking-wide my-5">
                Sign Up Form
              </label>
              <div className="w-full grid grid-cols-1 gap-8 my-10">
                <div>
                  <h1 className="mb-3 ml-1 font-semibold">Name:</h1>
                  <TextField
                    className="w-full bg-white"
                    variant="outlined"
                    value={signUpUser.name}
                    onChange={(e) =>
                      setSignUpUser({ ...signUpUser, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <h1 className="mb-3 ml-1 font-semibold">Email:</h1>
                  <TextField
                    type="email"
                    className="w-full bg-white"
                    variant="outlined"
                    value={signUpUser.email}
                    onChange={(e) => emailValidation(e.target.value)}
                    required
                  />
                  <p
                    className={`text-md tracking-wider font-serif ${
                      isEmailValid === true
                        ? "text-green-500"
                        : isEmailValid === false
                          ? "text-red-500"
                          : ""
                    }`}
                  >
                    {emailError}
                  </p>
                </div>
                <div>
                  <h1 className="mb-3 ml-1 font-semibold">Password:</h1>
                  <TextField
                    type="password"
                    className="w-full bg-white"
                    variant="outlined"
                    value={signUpUser.password}
                    onChange={(e) =>
                      setSignUpUser({ ...signUpUser, password: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <h1 className="mb-3 ml-1 font-semibold">Confirm Password:</h1>
                  <TextField
                    type="password"
                    className="w-full bg-white"
                    variant="outlined"
                    value={signUpUser.confirmPassword}
                    onChange={(e) =>
                      setSignUpUser({
                        ...signUpUser,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="py-3 px-8 border-black text-white bg-black tracking-wider rounded-xl hover:scale-95"
                >
                  Sign Up
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleSignIn}
              className="w-full px-5 lg:px-8 flex flex-col py-14"
            >
              <label className="text-2xl lg:text-4xl font-serif text-center tracking-wide my-5">
                Sign In Form
              </label>
              <div className="w-full grid grid-cols-1 gap-8 my-10">
                <div>
                  <h1 className="mb-3 ml-1 font-semibold">Email:</h1>
                  <TextField
                    type="email"
                    className="w-full bg-white"
                    variant="outlined"
                    value={signInUser.email}
                    onChange={(e) => emailValidation(e.target.value)}
                    required
                  />
                  <p
                    className={`text-md tracking-wider font-serif ${
                      isEmailValid === true
                        ? "text-green-500"
                        : isEmailValid === false
                          ? "text-red-500"
                          : ""
                    }`}
                  >
                    {emailError}
                  </p>
                </div>
                <div>
                  <h1 className="mb-3 ml-1 font-semibold">Password:</h1>
                  <TextField
                    type="password"
                    className="w-full bg-white"
                    variant="outlined"
                    value={signInUser.password}
                    onChange={(e) =>
                      setSignInUser({ ...signInUser, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="py-3 px-8 border-black text-white bg-black tracking-wider rounded-xl hover:scale-95"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}
          <div className="text-center mb-5">
            {isSignUp ? (
              <div>
                <p onClick={toggleForm}>
                  Have an Account? Click here to{" "}
                  <b className="hover:cursor-pointer">Sign In</b>
                </p>
              </div>
            ) : (
              <div>
                <p onClick={toggleForm}>
                  Did not have an Account? Click here to{" "}
                  <b className="hover:cursor-pointer">Sign Up</b>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
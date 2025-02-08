"use client";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page() {
  const [signInUser, setSignInUser] = useState({
    Email: "",
    Password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);

  const route = useRouter();

  const emailValidation = (em) => {
    setSignInUser({ ...signInUser, Email: em });
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

    try {
      const response = await fetch("/API/Auth/SignIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInUser),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signed In Successfully!");
        setSignInUser({ Email: "", Password: "" });
        route.push("/Home");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error during Sign In:", error);
      toast.error("An error occurred during Sign In");
    }
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
                  value={signInUser.Email}
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
                  value={signInUser.Password}
                  onChange={(e) =>
                    setSignInUser({ ...signInUser, Password: e.target.value })
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
        </div>
      </div>
    </div>
  );
}

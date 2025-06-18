import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import AuthContext from "../../AuthContext";
import { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoMdArrowBack } from "react-icons/io";

const SignModal = () => {
  const axiosPublic = useAxiosPublic();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isResetPasswordMode, setIsResetPasswordMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const {
    createUser,
    updateUserProfileName,
    signInUser,
    googleSigIn,
    isModalOpen,
    setIsModalOpen,
    passwordResetEmail,
    sendEmailVerification,
    logout,
  } = useContext(AuthContext);

  const toggleSignUpMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const handleResetPassword = () => {
    console.log("reset password hit ");
    setIsResetPasswordMode(!isResetPasswordMode);
  };

  const handleGoogleSignIn = () => {
    setLoadingGoogle(true);
    googleSigIn().then(async (result) => {
      console.log(result.user);
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        photoUrl: result.user?.photoURL,
        role: "member",
        userType: "normal",
        // add Account creation Time
      };
      await axiosPublic.post("/users", userInfo).then(() => {});

      const userLastLoinTime = {
        lastSignInTime: result.user?.metadata?.lastSignInTime,
        // lastSignInTimeNotUseOnlyForDatabase: result.user?.metadata?.lastLoginAt,
      };

      await axiosPublic
        .put(`/users/${result.user?.email}`, userLastLoinTime)
        .then(() => {
          toast.success("Google Sign In successful.");
          setIsModalOpen(false);
        });
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    try {
      const result = await signInUser(email, password);
      const userLastLoginTime = {
        lastSignInTime: result.user?.metadata?.lastSignInTime,
        lastLoginAt: result.user?.metadata?.lastLoginAt,
      };
      await axiosPublic.put(`/users/${result.user?.email}`, userLastLoginTime);

      if (!result.user.emailVerified) {
        console.log("Email is not verified.");
        toast.error("Please verify your email before signing in.");
        setLoading(false);
        logout();
        setIsModalOpen(false);
        return;
      }

      toast.success("Sign In successful.");
      setIsModalOpen(false);
    } catch {
      toast.error("Sign In failed. Please check your Email and Password.");
      setLoading(false);
      setShowPassword(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    } else if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    try {
      const newUser = {
        name,
        email,
        password,
        role: "member",
        userType: "normal",
        // add account creation time
      };

      console.log("newUser", newUser);

      const result = await createUser(email, password);

      console.log(result);

      const userLastLoginTime = {
        lastSignInTime: result.user?.metadata?.lastSignInTime,
        lastLoginAt: result.user?.metadata?.lastLoginAt,
      };

      console.log("userLastLoginTime", userLastLoginTime);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to save user to database");
      }

      await updateUserProfileName(name);
      await axiosPublic.put(`/users/${result.user?.email}`, userLastLoginTime);

      await sendEmailVerification(result.user).then(() =>
        toast.success(
          "Verified email sent successfully, Please check your email",
        ),
      );

      await logout();

      // toast.success("Registered Successfully");

      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
      setIsModalOpen(false);
    }
  };

  const handleResetPasswordFunction = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    console.log(email);

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}user/${email}`);
      const user = await response.json();

      if (!user || user.length === 0) {
        toast.error(
          "User Not Found. Please register first or input the correct email",
        );
        return;
      }

      await passwordResetEmail(email);
      toast.success("Reset Password Email sent successfully.");
      setIsResetPasswordMode(false);
    } catch (error) {
      toast.error("Failed to send password reset email: " + error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "modal-overlay") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [setIsModalOpen]);

  return (
    <div className="flex w-full items-center justify-center">
      {isModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-2 backdrop-blur-sm md:p-10"
        >
          <div className="relative rounded-2xl border border-white bg-gray-800 p-4 text-white/90 shadow-xl backdrop-blur-xl md:p-10">
            {/* Back And Cross Button */}
            <div className="flex justify-between">
              {isModalOpen && isResetPasswordMode && (
                <button
                  onClick={() => setIsResetPasswordMode(!isResetPasswordMode)}
                  className="absolute top-5 left-5 flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-200"
                >
                  <IoMdArrowBack className="flex items-center justify-center text-3xl text-blue-600"></IoMdArrowBack>
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-200 text-red-600"
              >
                <ImCross></ImCross>
              </button>
            </div>
            {/* Modal Heading */}
            <h2 className="mb-4 pt-5 text-3xl font-semibold dark:text-white">
              {!isSignUpMode && !isResetPasswordMode && <div> Sign In</div>}
              {isSignUpMode && !isResetPasswordMode && <div> Sign Up</div>}
              {isModalOpen && isResetPasswordMode && (
                <div>Reset Your Password</div>
              )}
            </h2>
            {/* Modal Description */}
            {!isResetPasswordMode ? (
              <p className="max-w-md text-wrap">
                By continuing, you agree to our{" "}
                <a
                  href="/userAgreement"
                  className="font-semibold text-blue-500"
                >
                  User Agreement
                </a>{" "}
                and acknowledge that you understand the{" "}
                <a
                  href="/userAgreement"
                  className="font-semibold text-blue-500"
                >
                  Privacy Policy
                </a>
                .
              </p>
            ) : (
              <div className="max-w-md text-wrap">
                Enter your email address and we’ll send you a link to reset your
                password
              </div>
            )}
            {/* Sign In */}
            {!isSignUpMode && !isResetPasswordMode && (
              <>
                <div className="my-4 flex flex-col gap-2">
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={loadingGoogle}
                    className={`flex items-center rounded-full border-2 p-2 ${
                      loadingGoogle ? "cursor-not-allowed bg-gray-400" : ""
                    }`}
                  >
                    <FcGoogle className="size-6" />
                    <span className="flex flex-grow justify-center">
                      {loadingGoogle ? "Loading..." : "Continue With Google"}
                    </span>
                  </button>
                </div>

                <div className="flex items-center">
                  <hr className="flex-grow" />
                  <span className="mx-5">OR</span> <hr className="flex-grow" />
                </div>

                <form onSubmit={handleSignIn}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white/90">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-white placeholder:text-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-white placeholder:text-white"
                        placeholder="Enter your password"
                        required
                      />
                      <span
                        className="absolute top-3 right-3 ml-2 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                      >
                        {!showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                  </div>
                  <p className="text-blue-500">
                    <span
                      className="cursor-pointer"
                      onClick={handleResetPassword}
                    >
                      Forgot Password?
                    </span>
                  </p>
                  <p className="my-2">
                    New to CodesRaft?{" "}
                    <span
                      className="cursor-pointer text-blue-500"
                      onClick={toggleSignUpMode}
                    >
                      Sign Up
                    </span>
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`mt-4 w-full rounded-xl px-4 py-2 text-lg text-white ${
                      loading
                        ? "cursor-not-allowed bg-gray-400"
                        : "btn btn-primary"
                    }`}
                  >
                    {loading ? "Loading..." : "Sign In"}
                  </button>
                </form>
              </>
            )}
            {/* Sign Up */}
            {isSignUpMode && !isResetPasswordMode && (
              <>
                <div className="mt-4">
                  <form onSubmit={handleRegister}>
                    <div className="mb-4 pt-1">
                      <label className="block text-sm font-medium text-white/90">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-white/90 placeholder:text-white/90"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="mb-4 pt-1">
                      <label className="block text-sm font-medium text-white/90">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-white/90 placeholder:text-white/90"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="mb-4 pt-1">
                      <label className="block text-sm font-medium text-white/90">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-white/90 placeholder:text-white/90"
                          placeholder="Enter your password"
                          required
                        />
                        <span
                          className="absolute top-3 right-3 ml-2 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword);
                          }}
                        >
                          {!showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      </div>
                    </div>

                    <p className="my-2">
                      Have An Account?
                      <span
                        className="cursor-pointer text-blue-500"
                        onClick={toggleSignUpMode}
                      >
                        Sign In
                      </span>
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`mt-4 w-full rounded-xl px-4 py-2 text-lg text-white/90 ${
                        loading
                          ? "cursor-not-allowed bg-gray-400"
                          : "btn btn-primary"
                      }`}
                    >
                      {loading ? "Loading..." : "Sign Up"}
                    </button>
                  </form>
                </div>
              </>
            )}
            {/* Reset Password */}
            {isModalOpen && isResetPasswordMode && (
              <form
                onSubmit={handleResetPasswordFunction}
                className="flex h-[440px] flex-col justify-between pt-4"
              >
                <div className="mb-4 flex-shrink-0">
                  <label className="block text-sm font-medium text-white/90">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-white/90 placeholder:text-white/90"
                    placeholder="Enter your email"
                    required
                  />
                  <div className="mt-6">
                    <span className="flex h-full cursor-pointer text-blue-500">
                      Need Help?
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-4 w-full rounded-xl px-4 py-2 text-lg text-white ${
                    loading
                      ? "cursor-not-allowed bg-gray-400"
                      : "btn btn-primary"
                  }`}
                >
                  {loading ? "Loading..." : "Reset Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignModal;

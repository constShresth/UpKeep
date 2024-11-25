import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className=" min-h-screen bg-[#F2F2F2] flex justify-center items-center ">
      <div className="bg-white p-8 rounded-lg mb-12  shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-[#008080] mb-6 text-center">
          Login
        </h2>
        <LoginForm/>
      </div>
    </div>
  );
};

export default LoginPage;

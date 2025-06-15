import React from "react";
import Form from "./Form";
import About from "./About";
import CoursePlan from "./CoursePlan";

const Home = () => {
  return (
    <>
      <div className="flex h-[50vh] bg-slate-200">
        <div className="container mx-auto flex items-center justify-center">
          this is home
        </div>
      </div>
      <CoursePlan></CoursePlan>
      <About></About>
      <Form></Form>
    </>
  );
};

export default Home;

import React from "react";
import Form from "./Form";
import About from "./About";
import CoursePlan from "./CoursePlan";
import CourseDetails from "./CourseDetails";
import Hero from "./Hero";

const Home = () => {
  return (
    <>
      <Hero></Hero>
      <CourseDetails></CourseDetails>
      <CoursePlan></CoursePlan>
      <About></About>
      <Form></Form>
    </>
  );
};

export default Home;

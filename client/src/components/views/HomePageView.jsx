import React from "react";
import { Link } from "react-router-dom";
import homeBg from "../../../public/homeBg.png";

function HomePageView() {
  return (
    <main className="opacity-85">
      <div className="flex row justify-between pt-16">
        <section className="basis-1/2 ml-20">
          <div className="mb-20">
            <h1 className="text-4xl uppercase mb-2 font-extrabold">
              Connect. <span className="text-primary">Share.</span> Empower.
            </h1>
            <h3 className="text-xl uppercase mb-2 font-light">
              Where College Voices Thrive.
            </h3>
          </div>
          <p className="mb-4 font-normal">
            UniXchange is anonymous social platform for college students.
            <p>
              Share your challenges, find support, and empower each other to
              thrive in academia and beyond.
            </p>
          </p>
          <p className="">Join our community today!</p>
          <div className="mt-10">
            <Link to="../login" className="button-5">
              Login
            </Link>
            <Link to="../signup" className="button-6">
              Sign Up
            </Link>
          </div>
        </section>
        <section>
          <img src={homeBg} className="w-[420px] mt-8 mr-20" />
        </section>
      </div>
    </main>
  );
}

export default HomePageView;

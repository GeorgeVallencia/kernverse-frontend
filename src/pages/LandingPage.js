import { Link } from "react-router-dom";

function LandingPage() {
  return(
    <div className=" max-w-5xl mx-auto px-3 items-center">
       <div className="mx-auto sm:grid grid-cols-2 px-10 gap-4 justify-between items-center max-w-5xl mt-20 mb-2">
        <div className="">
          <p className="text-teal-500 font-bold text-4xl p-3 tracking-wider">Read, comment and even earn a little bit of money on the side with <span className="lowercase">KERNVERSE.</span></p>
          <p className="p-3 tracking-wide">There's no other place that combines such an excellent level of writing with a truly engaged and active community. With Kernverse you get to decide what and how you are going to write and read. All for a dollar!</p>
        </div>
        <div>
          <img className="rounded-lg" src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="description image" />
        </div>
      </div>
      <div className="flex justify-center mx-auto items-center max-w-5xl mt-24 ">
        <Link to='/register' className="border rounded-lg bg-teal-500 text-white py-3 px-7 font-bold text-xl">Get Started</Link>
      </div>
    </div>
  );
}

export default LandingPage;
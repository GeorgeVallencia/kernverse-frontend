import { GoBook, GoCheck, GoCheckCircle } from "react-icons/go";
// import { Link } from "react-router-dom";
// import { useState } from "react";

function PaymentsPage() {

  // const member = <p className="mb-2"><span className="text-gray-500 line-through mr-1">$7.99</span>$3.89 USD/year</p>
  // const premium = <p className="mb-2"><span className="text-gray-500 line-through mr-1">$23.89</span>$11.99 USD/year</p>
  // const monthly = <p className="mb-2">$0.99 USD/month</p> 
  // const annual = <p className="mb-2">$2.99 USD/month</p>

  // const [memberPrice, setMemberPrice] = useState(member);
  // const [premiumPrice, setPremiumPrice] = useState(premium);
  // const [activeMonthly, setActiveMonthly] = useState(false);
  // const [activeAnnual, setActiveAnnual] = useState(false);

  // let monthlyBtnClassName = 'border max-w-32 flex cursor-pointer items-center px-4 py-2 hover:hover:text-teal-500';
  // let annualBtnClassName = 'border max-w-32 flex cursor-pointer items-center px-4 py-2 flex-col hover:hover:text-teal-500';

  // const handleMonthlyClick = () => {
    
  //   setActiveMonthly(true);
  //   setActiveAnnual(false);
  //   setMemberPrice(monthly);
  //   setPremiumPrice(annual);
  // }

  // const handleAnnualClick = () => {
    
  //   setActiveMonthly(false);
  //   setActiveAnnual(true);
  //   setMemberPrice(member);
  //   setPremiumPrice(premium);
  // }

  function handleSubscribe(planId) {

    const plans = {
      premium: { id: 1, quantity: 1 },
      business: { id: 2, quantity: 1 },
      partner: { id: 3, quantity: 1 }
    };

    fetch('https://kernverse-backend.onrender.com/payment-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        items: [plans[planId]]
      })
    }).then(res => {
      if(res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
      // console.log(url);
      window.location = url
    }).catch(e => {
      console.error(e.error)
    })
  }

  return(
//     <div className="flex items-center tracking-wide mx-auto max-w-5xl my-2 py-3 px-3">
//       {/* <Link className="border border-teal-400 rounded-lg text-teal-500 px-3 py-2 text-lg items-center">Subscribe</Link> */}
//       <div className="mx-auto max-w-2xl text-center mt-10 px-4">
//       <div className="font-bold text-teal-500 text-2xl my-6">
//         <p>Kernverse</p>
//       </div>  
//       <div className="mx-auto max-w-lg mb-6">
//         <p className="text-2xl font-serif font-normal px-20">Support great writing and access all stories on Kernverse Post.</p>
//       </div>
//       <div className="flex max-w-64 mx-auto justify-center mb-6">
//         <button onClick={handleMonthlyClick} className={monthlyBtnClassName}>Pay monthly</button>
//         <button onClick={handleAnnualClick} className={annualBtnClassName}>Pay annually<span className="text-xs">Save up to $20</span></button>
//       </div>
//       <div className="flex mx-auto max-w-2xl justify-between">
//         <div className="border w-80 rounded">
//           <div>
//             <p className="font-bold text-xl my-2">Member</p>
//             {memberPrice || member}
//             <p className="text-sm text-gray-400">Access member-only stories and enjoy an enhanced reading and writing experience.
// Cancel anytime.</p>
//             <button onClick={handleSubscribe} className="my-4 border bg-teal-500 py-1 px-6 rounded text-white cursor-pointer hover:bg-teal-600 mb-4">Subscribe</button>
//             <hr className="mb-3 mx-3"></hr>
//             <div className="text-left ml-5 font-light">
//               <div className="flex items-center mb-2">
//                 <GoCheck  className="text-teal-500 mr-2 font-bold" />
//                 <p>Read member-only stories</p>
//               </div>
//               <div className="flex items-center mb-2">
//                 <GoCheck  className="text-teal-500 mr-2 font-bold" />
//                 <p>Support writers you read most</p>
//               </div>
//               <div className="flex items-center mb-2">
//                 <GoCheck  className="text-teal-500 mr-2 font-bold" />
//                 <p>Earn money for your reading</p>
//               </div>
//               <div className="flex items-center mb-2">
//                 <GoCheck  className="text-teal-500 mr-2 font-bold" />
//                 <p>Listen to audio narrations</p>
//               </div>
//               <div className="flex items-center mb-2">
//                 <GoCheck  className="text-teal-500 mr-2 font-bold" />
//                 <p>Read offline with the app</p>
//               </div>
//               <div className="flex items-center mb-2">
//                 <GoCheck  className="text-teal-500 mr-2 font-bold" />
//                 <p>Access to our community</p>
//               </div>
//               <div className="flex items-center mb-2">
//                 <GoCheck  className="text-teal-500 mr-2 font-bold" />
//                 <p>Connect your custom domain</p> 
//               </div>
//               <div className="flex items-center mb-2">
//                 <GoCheck  className="text-teal-500 mr-2 font-bold" />
//               <p>Create your own publications</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="border w-80 rounded">
//           <div>
//             <p className="font-bold text-xl my-2">Premium</p>
//             {premiumPrice || premium}
//             <p className="text-sm text-gray-400 px-2">Contribute more to writers and strengthen your support for the Kernverse community.
// Cancel anytime.</p>
//             <button className="my-4 border bg-teal-500 py-1 px-6 rounded text-white cursor-pointer hover:bg-teal-600 mb-4">Subscribe</button>
//             <hr className="mb-3 mx-3"></hr>
//             <div className="flex items-center font-light ml-5 my-5">
//               <GoBook className="mr-2 text-teal-500"/>
//               <p>All Kernverse Member benefits </p>
//             </div>
//             <div className="flex items-center mx-auto justify-center mb-3">
//               <GoCheckCircle className="text-teal-500 mr-2" />
//               <p className="items-center">PLUS</p>
//             </div>
//             <div className="flex items-center ml-5 mb-2">
//               <GoCheck className="text-teal-500 mr-2" />
//               <p className="font-light">Avid readers earn 4x</p>
//             </div>
//             <div className="flex items-center ml-5">
//               <GoCheck size={21} className="text-teal-500 mr-2" />
//               <p className="font-light">Share stories with anyone and drive more earnings</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <hr className="my-20"></hr>
//       <div className="flex flex-col justify-between mt-20">
//             <div className="space-x-5">
//               <Link to='/Articles' className="hover:text-teal-500">Articles</Link>
//               <Link to='/Products' className="hover:text-teal-500">Products</Link>
//               {/* <Link to='/Packages' className="hover:text-teal-500">Packages</Link> */}
//             </div>
//             <div className="text-gray-500 my-4">© 2024 George Valencia. All rights reserved.</div>
//           </div>
//     </div>
//     </div>
<div className="max-w-5xl mx-auto px-3 items-center">
      <div className="mt-10 text-teal-900 font-bold text-2xl flex items-center justify-center">
        <p className="">Pick your perfect plan</p>
      </div>
      <div className="text-teal-800 my-8 flex justify-center items-center text-center">
        <p>Get started in complete confidence. Our 30-day money-back guarantee means it's risk-free.</p>
      </div>
      <div className="sm:flex justify-evenly items-stretch gap-4 mt-10">
        <div className="border rounded-lg border-teal-600 p-4 bg-white flex flex-col justify-center items-center w-80 min-h-[400px] mx-auto mb-5">
          <p className="text-teal-900 font-bold mb-4">Premium</p>
          <p className="text-sm">Everything you need to create your website.</p>
          <div className="flex items-center">
            <p className="line-through mr-4 text-gray-400 my-4">US$ 79.69/year</p>
            <p className="text-teal-800 font-bold">85% OFF</p>
          </div>
          <p className="">US$ <span className="font-bold">0.99</span>/month</p>
          <p className="">US$ <span className="font-bold text-5xl">11.95</span>/year</p>
          <button onClick={() => handleSubscribe('premium')} className="my-8 border border-teal-400 py-2 px-4 rounded text-teal-500 font-bold cursor-pointer hover:bg-teal-100">Choose Plan</button>
          <hr className="mb-3"></hr>
              <div className="text-left ml-5 font-light">
              <div className="flex items-center mb-2">
                <GoCheck  className="text-teal-500 mr-2 font-bold" />
                <p>Read member-only stories</p>
              </div>
              <div className="flex items-center mb-2">
                <GoCheck  className="text-teal-500 mr-2 font-bold" />
                <p>Support writers you read most</p>
              </div>
              <div className="flex items-center mb-2">
                <GoCheck  className="text-teal-500 mr-2 font-bold" />
                <p>Earn money for your reading</p>
              </div>
              <div className="flex items-center mb-2">
                <GoCheck  className="text-teal-500 mr-2 font-bold" />
                <p>Listen to audio narrations</p>
              </div>
              <div className="flex items-center mb-2">
                <GoCheck  className="text-teal-500 mr-2 font-bold" />
                <p>Read offline with the app</p>
              </div>
              <div className="flex items-center mb-2">
                <GoCheck  className="text-teal-500 mr-2 font-bold" />
                <p>Access to our community</p>
              </div>
              <div className="flex items-center mb-2">
                <GoCheck  className="text-teal-500 mr-2 font-bold" />
                <p>Connect your custom domain</p> 
              </div>
              <div className="flex items-center mb-2">
                <GoCheck  className="text-teal-500 mr-2 font-bold" />
              <p>Create your own publications</p>
              </div>
            </div>
        </div>
        <div className="border rounded-lg border-teal-600 p-4 bg-teal-200 flex flex-col justify-center items-center w-80 min-h-[400px] mx-auto mb-5">
          {/* <div className="bg-teal-700 w-80">
            <p className="flex items-center justify-center">Popular</p>
          </div> */}
          <p className="text-teal-900 font-bold mb-4">Business</p>
          <p className="text-sm">Level up with more power and enhanced features.</p>
          <div className="flex items-center">
            <p className="line-through mr-4 text-gray-400 my-4">US$ 89.79/year</p>
            <p className="text-teal-800 font-bold">80% OFF</p>
          </div>
          <p className="">US$ <span className="font-bold">1.69</span>/month</p>
          <p className="">US$ <span className="font-bold text-5xl">17.95</span>/year</p>
          <button onClick={() => handleSubscribe('business')} className="my-8 border border-teal-400 py-2 px-4 rounded bg-teal-500 text-white font-bold cursor-pointer hover:bg-teal-700">Choose Plan</button>
          <hr className="mb-3 mx-3"></hr>
          <div className="text-left ml-5 font-light">
            <div className="flex items-center font-light ml-5 my-5">
              <GoBook className="mr-2 text-teal-500"/>
              <p>All Premium Member benefits </p>
            </div>
            <div className="flex items-center mx-auto justify-center mb-3">
              <GoCheckCircle className="text-teal-500 mr-2" />
              <p className="items-center">PLUS</p>
            </div>
            <div className="flex items-center ml-5 mb-2">
              <GoCheck className="text-teal-500 mr-2" />
              <p className="font-light">Avid readers earn 4x</p>
            </div>
            <div className="flex items-center ml-5">
              <GoCheck size={21} className="text-teal-500 mr-2" />
              <p className="font-light">Share stories with anyone and drive more earnings</p>
            </div>
          </div>
        </div>
        <div className="border rounded-lg border-teal-600 p-4 bg-white flex flex-col justify-center items-center w-80 min-h-[400px] mx-auto mb-5">
          <p className="text-teal-900 font-bold mb-4">Partner</p>
          <p className="text-sm">Enjoy optimized performance & powerful resources.</p>
          <div className="flex items-center">
            <p className="line-through mr-4 text-gray-400 my-4">US$ 159.99/year</p>
            <p className="text-teal-800 font-bold">70% OFF</p>
          </div>
          <p className="items-center">US$ <span className="font-bold">3.99</span>/month</p>
          <p className="items-center">US$ <span className="font-bold text-5xl">47.59</span>/year</p>
          <button onClick={() => handleSubscribe('partner')} className="my-8 border border-teal-400 py-2 px-4 rounded text-teal-500 font-bold cursor-pointer hover:bg-teal-100">Choose Plan</button>
          {/* <hr className="mb-3 mx-3"></hr> */}
        </div>
      </div>
    </div>
  );
}

export default PaymentsPage;
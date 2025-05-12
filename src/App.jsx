// import { Routes, Route } from "react-router-dom";
// import NavBar from "./components/Navbar";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Features from "./components/Features";
// import Story from "./components/Story";
// import Contact from "./components/Contact";
// import Footer from "./components/Footer";
// import Dashboard from "./components/stateRepresentative/Dashboard";
// import Login from "./components/Login";
// import PrivateRoute from "./components/PrivateRoute";
// import EventHostLogin from "./components/eventHost/EventHostLogin";
// import EventHostRegistration from "./components/eventHost/EventHostRegistration";
// import EventCreationProcess from "./components/eventHost/EventCreationProcess";
// import BuyerLogin from "./components/buyer/BuyerLogin";
// import BuyerRegistration from "./components/buyer/BuyerRegistration";
// import ProductsPage from "./components/eventHost/EventHostProducts";
// import BuyerEventListings from "./components/buyer/BuyerEventListings";
// import EventDetailsPageTailwind from './components/buyer/EventDetailsPageTailwind.jsx';
// import BuyerPersonalEvents from './components/buyer/BuyerPersonalEvents.jsx';

// function App() {
//   return (
//     <main className="relative min-h-screen w-screen overflow-x-hidden">
//       <NavBar />

//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               <Hero />
//               <About />
//               <Features />
//               <Story />
//               <Contact />
//               <Footer />
//             </>
//           }
//         />
//         <Route path="/login" element={<Login />} />
//         <Route path="/event-host-login" element={<EventHostLogin />} />
//         <Route path="/register" element={<EventHostRegistration />} />
//         <Route path="/create-event" element={<EventCreationProcess />} />
//         <Route element={<PrivateRoute />}>
//           <Route
//             path="/state-representative-dashboard"
//             element={<Dashboard />}
//           />
//         </Route>
//         <Route path="/buyerlogin" element={<BuyerLogin />} />
//         <Route path="/buyerregistration" element={<BuyerRegistration />} />
//         <Route path="/productshost" element={<ProductsPage />} />
//         <Route path="/buyerEventListings" element={<BuyerEventListings />} />
//         <Route path="/buyerEventListings/:eventId" element={<EventDetailsPageTailwind />} />
//         <Route path="/BuyerPersonalEvents" element={<BuyerPersonalEvents />} />

//       </Routes>
//     </main>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Dashboard from "./components/stateRepresentative/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import EventHostLogin from "./components/eventHost/EventHostLogin";
import EventHostRegistration from "./components/eventHost/EventHostRegistration";
import EventCreationProcess from "./components/eventHost/EventCreationProcess";
import BuyerLogin from "./components/buyer/BuyerLogin";
import BuyerRegistration from "./components/buyer/BuyerRegistration";
import ProductsPage from "./components/eventHost/EventHostProducts";
import BuyerEventListings from "./components/buyer/BuyerEventListings";
import EventDetailsPageTailwind from "./components/buyer/EventDetailsPageTailwind.jsx";
import BuyerPersonalEvents from "./components/buyer/BuyerPersonalEvents.jsx";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Features />
              <Story />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/event-host-login" element={<EventHostLogin />} />
        <Route path="/register" element={<EventHostRegistration />} />
        <Route path="/create-event" element={<EventCreationProcess />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/state-representative-dashboard"
            element={<Dashboard />}
          />
        </Route>
        <Route path="/buyerlogin" element={<BuyerLogin />} />
        <Route path="/buyerregistration" element={<BuyerRegistration />} />
        <Route path="/productshost" element={<ProductsPage />} />
        <Route path="/buyerEventListings" element={<BuyerEventListings />} />
        <Route
          path="/buyerEventListings/:eventId"
          element={<EventDetailsPageTailwind />}
        />
        <Route path="/BuyerPersonalEvents" element={<BuyerPersonalEvents />} />
      </Routes>
    </main>
  );
}

export default App;
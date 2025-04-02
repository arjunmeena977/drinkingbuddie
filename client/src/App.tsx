import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Home from "@/pages/home";
import Clubs from "@/pages/clubs";
import Events from "@/pages/events";
import Partners from "@/pages/partners";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import SignIn from "@/pages/signin";
import SignUp from "@/pages/signup";
import ClubDetails from "@/pages/club-details";
import EventDetails from "@/pages/event-details";
import NotFound from "@/pages/not-found";

// Layout
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/clubs" component={Clubs} />
          <Route path="/clubs/:id" component={ClubDetails} />
          <Route path="/events" component={Events} />
          <Route path="/events/:id" component={EventDetails} />
          <Route path="/partners" component={Partners} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;

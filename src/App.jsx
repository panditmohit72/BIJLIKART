import Brands from "./components/Brands";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
function App() {
   return ( 
   <div style={{
      fontFamily: "Arial, sans-serif",
      background: "#f5f7fb",
      minHeight: "100vh"
    }}>

      <Navbar />
       <Hero />
      <Brands />
      <Categories />
      <Products />
      </div>
  );
}

export default App;
import React, { ReactNode } from "react"; // Import React and ReactNode type from "react" library
import Navbar from "./Navbar"; // Import the Navbar component
import Footer from "./Footer"; // Import the Footer component

interface LayoutProps {
  children: ReactNode; // Define a prop interface with a single "children" prop of type ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Define the Layout functional component with the specified prop type
  return (
    <>
      <Navbar /> {/* Render the Navbar component */}
      <main>{children}</main> {/* Render the main content (children) */}
      <Footer /> {/* Render the Footer component */}
    </>
  );
}

export default Layout; // Export the Layout component

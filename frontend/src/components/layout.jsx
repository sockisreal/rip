import { Container } from "react-bootstrap";

import Navbar from "./navbar";

const Component = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default Component;

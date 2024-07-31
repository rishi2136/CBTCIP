import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light pt-4 sticky-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
            <p className="mb-0">
              5678 Elm Street, Suite 100
              <br />
              San Francisco, CA 94103
              <br />
              United States
            </p>
          </div>
          <div className="col-md-6 text-center text-md-right d-flex align-items-center justify-content-center">
            <a href="https://www.facebook.com" className="text-light mx-2">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" className="text-light mx-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.whatsapp.com" className="text-light mx-2">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.instagram.com" className="text-light mx-2">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

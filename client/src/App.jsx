import Bikes from "./components/Bikes";
import Form from "./components/Form";
import Stats from "./components/Stats";

function App() {
  return (
    <>
      <div className="header">
        <p className="header__sitename">ADMIN.BIKE-BOOKING.COM</p>
      </div>
      <div className="content">
        <Bikes />
        <Form />
        <Stats />
      </div>
      <div className="footer">
        <p className="footer__info">
          <span className="footer__developer">Developer:</span> Vladislav
          Dmitrenko
        </p>
      </div>
    </>
  );
}

export default App;

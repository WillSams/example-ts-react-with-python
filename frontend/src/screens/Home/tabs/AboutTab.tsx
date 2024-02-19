import React from 'react';

const AboutTab: React.FC = () => {
  return (
    <div data-name="about-tab">
      <div className="col-lg-12 bg-dark mx-auto">
        <h3>ABOUT</h3>
        <p>
          This is a web application that allows you to view existing
          reservations and to create new ones.
        </p>

        <div className="container w-1000 d-flex flex-column">
          <img
            width={1000}
            height={750}
            src="/img/default-bkg.jpg"
            alt="Thumbnail [1000x750]"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutTab;

import React from 'react';

/** A simple static component to render some text for the landing page. */
class AboutPage extends React.Component {
  render() {
    return (
        <div className="seafoam-bg pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div>
                {/* eslint-disable-next-line max-len */}
                <h1 className="h1 text-center d-block">At HEI, our family of Hawaii-based companies provides the energy and financial infrastructure that empowers much of the economic and community activity of our state.</h1>
              </div>
              <div>
                <p className="lead text-center d-block">Accelerating a Sustainable Future for Hawaii, Enhancing the Lives of Our Communities and Creating Value for Our Shareholders</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="text-center">
                  <img src="/images/HE.png"/>
                </div>
                <p className="text-center">For 130 years, Hawaiian Electric has provided the energy that fuels our islands growth and prosperity.
                  Now, we are spearheading the way toward a 100 clean energy, carbon neutral future.
                  Hawaiian Electric serves 95 of Hawaii, creating a strong partnership with our communities, and sustainable economics for our shareholders and stakeholders.</p>
                <button>Learn more</button>
              </div>

              <div>
                <div className="text-center">
                  <img src="/images/ASB.jpg"/>
                </div>
                <p className="text-center">American Savings Bank provides the capital to help Hawaii grow. It has been serving and investing in Hawaii’s families,
                  businesses and communities since 1925.
                  Our ability to finance a sustainable Hawaii economy supports Hawaiian Electric’s efforts to create clean, energy-efficient communities.</p>
                <button>Learn more</button>
              </div>

              <div>
                <div className="text-center">
                  <img src="/images/CE.png"/>
                </div>
                <p className="text-center">Pacific Current is our newest subsidiary, and a powerful investment platform focused on accelerating
                  Hawaii’s sustainable future.
                  Through Pacific Current we are able to invest in projects that advance Hawaii’s ambitious environmental and economic goals.</p>
                <button>Learn more</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default AboutPage;

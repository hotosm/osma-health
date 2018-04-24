import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <section className='page_body'>
                <div className=''>
                    <h1>HOT Analytics for Health</h1>
                    <p>HOT Analytics for Health is one of the OSM Analytics projects focussed on data quality and mapping progress for Malaria campaigns.</p>

                    <p>HOT Analytics for Health uses <a href='http://osmlab.github.io/osm-qa-tiles/' >OSM QA Tiles</a> and <a href='http://www.worldpop.org.uk/'>Worldpop</a> for analysis in the following areas:</p>

                    <h2>Attribute completeness</h2>
                    <p>
                        For Malaria campaigns, it's important to identify living structures on the map with use of the building, roof and wall type
                    </p>

                    <p>
                        The analysis uses OSMLint to find `buildings=residential` that does not have `roof=*` or `wall=*` attributes.
                    </p>

                    <h2>Relative completeness</h2>
                    <p>
                        The most effective Malaria campaign requires all buildings to be mapped in an area. We use Worldpop to predict area of buildings based on a distribution of population per pixel.
                    </p>
                    <p>

                    </p>
                    <h2>Data errors</h2>
                    <h2>Documentation</h2>                    
                </div>
            </section>
        )
    }
}

export default About;
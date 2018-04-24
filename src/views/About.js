import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div className='about-page'>
                <header className='section__header'>
                	<div className='inner'>
                    <h2>HOT Analytics for Health</h2>
                   </div>
                </header>
                <section className='section__body'>
                    <div className='inner'>
                        <p>HOT Analytics for Health is one of the OSM Analytics projects focussed on data quality and mapping progress for Malaria campaigns. HOT Analytics for Health uses <a href='http://osmlab.github.io/osm-qa-tiles/' >OSM QA Tiles</a> and <a href='http://www.worldpop.org.uk/'>Worldpop</a> for analysis in the following areas:</p>
    
                        <h3>Attribute completeness</h3>
                        <p>For Malaria campaigns, it's important to identify living structures on the map with use of the building, roof and wall type. The analysis uses OSMLint to find `buildings=residential` that does not have `roof=*` or `wall=*` attributes.</p>
    
                        <h3>Relative completeness</h3>
                        <p>The most effective Malaria campaign requires all buildings to be mapped in an area. We use Worldpop to predict area of buildings based on a distribution of population per pixel. The machine learning model is trained using rural and urban areas that are identified with good quality residential buildings in OSM. The model computes the following two measures:</p>
                        <ul className='prose-list'>
                            <li>Total area of the buildings in a tile.</li>
                            <li>Total population estimate for the area, derived from Worldpop.</li>
                        </ul>

                        <p>While WorldPop is last updated in 2015 from census, and potentially outdated in many parts of the world it still presents a relatively good way of understanding populated areas on the map. The model makes assumptions on quality of distribution of population, and the lack of granularity in Worldpop implies that we can only generate meaningful analyses over large aggregate areas, and not at the pixel level. This model is used to predict the following map completeness metrics:</p>
                        <ul className='prose-list'>
                          <li>OSM coverage is poor, however population density is present</li>
                          <li>OSM coverage is great, better than population density would imply</li>
                          <li>OSM coverage is OK, about what population density would imply</li>
                        </ul>
                        <h3>Data errors</h3>
                        <h3>Documentation</h3>                    
                    </div>
                </section>
            </div>
        )
    }
}

export default About;
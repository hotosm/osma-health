import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div className='about-page'>
                <div className='section__header'>
                	<div className='inner'>
                    <h2>HOT Analytics for Health</h2>
                   </div>
                </div>
                <section className='section__body'>
                    <div className='inner'>
                        <img width='90%' height='90%' src='images/chobe.png' alt="Analytics for Chobe District, Botswana"></img>
                        <p>HOT Analytics for Health is one of the OSM Analytics projects focussed on data quality and mapping progress for Malaria campaigns. HOT Analytics for Health uses <a href='http://osmlab.github.io/osm-qa-tiles/' >OSM QA Tiles</a> and <a href='http://www.worldpop.org.uk/'>Worldpop</a> for analysis in the following areas:</p>
    
                        <h3>Malaria Mapping</h3>
                        <div className='prose'>
                            <p>With support of the Bill and Melinda Gates Foundation and the Clinton Health Access Initiative, we have designed an analysis tool to evaluate the accuracy and precision of OpenStreetMap field data. This credential scoring of OpenStreetMap feature completeness provides a more complete understanding of OpenStreetMap data in a specific area.</p>

                            <p>This work features OpenStreetMap analysis for improved malaria prevention but can be applied to any use case to understand OSM data. Check out our github documentation to learn more. Key features are highlighted below.</p>
                        </div>

                        <h3>1. Attribute Completeness</h3>
                        <img width='50%' height='50%' src='images/attribute.png' alt="Attribute Completeness"></img>

                        <div className='prose'>
                            <p>For Malaria campaigns, it's important to identify residential structures on the map with use of the building, roof and wall type. The analysis uses <a href='https://github.com/osmlab/osmlint'>OSMLint</a> to find `buildings=residential` that does not have `roof=*` or `wall=*` attributes.</p>
                            <p>These numbers directly inform how completely we can identify a building on OSM. If roof or wall attributes are missing, they can be inferred from satellite imagery or a field mission.</p>
                        </div>

                        <h3>2. Relative Completeness</h3>
                        <img width='50%' height='50%' src='images/completeness.png' alt="Relative Completeness"></img>

                        <div className='prose'>
                            <p>The most effective Malaria campaign requires all buildings to be mapped in an area. We use <a href='http://www.worldpop.org.uk'>Worldpop</a> to predict area of buildings based on a distribution of population per pixel. The machine learning model is trained using rural and urban areas that are identified with good quality residential buildings in OSM. For more information on the model see <a href='https://github.com/azavea/hot-osm-population'>the repository</a>. The model helps to arrive at the following conclusions:</p>
                            <ul className='prose-list'>
                            <li>OSM coverage is poor, however population density is present</li>
                            <li>OSM coverage is fair, about what population density would imply</li>
                            <li>OSM coverage is good, better than population density would imply</li>
                            </ul>
                            <p>While WorldPop is last updated in 2015 from census, and potentially outdated in many parts of the world it still presents a relatively good way of understanding populated areas on the map. The model makes assumptions on quality of distribution of population, and the lack of granularity in Worldpop implies that we can only generate meaningful analyses over large aggregate areas, and not at the pixel level.</p>
                        </div>

                        <h3>3. Data Errors</h3>
                            <div className='prose'>
                                <p>Duplicate buildings are also highlighted as part of the report. A higher number of duplicate buildings will lead to wrong estimation of resources.</p>
                            </div>
                            <hr></hr>
                            <div className='footer'>
                                <img src='images/logo.png' alt="Relative Completeness"></img>
                                <p>
                                    This service is created the <a href='http://hotosm.org/'>Humanitarian OpenStreetMap Team</a> and is open source. If you are interested in getting involved don’t hesitate <a href='https://github.com/hotosm/osma-health'>reach out!</a>
                                </p>
                            </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default About;
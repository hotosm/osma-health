# OSM Analytics Health Module

osma-health is an independent extension of OSM Analytics for health campaigns run by HOT. The current phase is to understand the progress and completeness of Malaria campaigns.

This repository will be the main ticket tracker, as well as the front-end code. Other repos are:

* [osma-health-infra](https://github.com/hotosm/osma-health-infra) - private infrastructure code.
* [osma-health-workers](https://github.com/hotosm/osma-health-workers) - workers to prepare data for analysis.
* [osmlint](https://github.com/hotosm/osmlint) - fork of OSMLint with validators specific for this project.

osma-health is being built by [Development Seed](https://developmentseed.org/).

## Setup
_work in progress_

## Background

OSM Analytics for Health aims to help field-based, academic and governmental organizations to improve their prevention strategies by tracking where the map is incomplete. `hotosm/osma-health` is a web application developed by HOT and Development Seed to assess the quality and accuracy of OpenStreetMap data. 

By combining Worldpop and completely mapped areas in OSM, we can train a model to estimate gaps in building density. We overlay this with other metrics to provide a report of coverage area.

The purpose of this document is to outline the metrics required by the application and the underlying infrastructure that produces them. At a high level our approach involves a periodic generation of vector spatial datasets from primary sources.

## Infrastructure Requirements
- Periodic updating of metrics
- Use of AWS technologies
- Static frontend with minimal API infrastructure
## Data requirements

**Data sources**
Sources of data that will be used to generate the metrics and the map layers


- [**WorldPop**](http://www.worldpop.org.uk/): a raster spatial layer of population counts per 100x100m pixel
- [**OpenStreetMap QA Tiles**](http://osmlab.github.io/osm-qa-tiles): a vector tile dataset containing all OSM data
- **Areas of Interest**: A list of vector geometries for each area where the report is generated

**Derived metrics**
Metrics displayed alongside an area of interest


- **Overall quality indicator**: A qualitative measure of the completeness of the area of interest. 
- **Last time of update:** When was the report last generated?
- **Estimated population**: Population in the area of interest
- **Relative completeness**: A quantitative measure of completeness based on Worldpop and building density
- **Attribute completeness**: A measure of what percentage of missing tags such as ‘residential building’ in OSM building data
- **Recency of edits**: A histogram of how fresh the data in the area of interest is
- **Number of duplicate buildings**: The number of buildings that were mapped multiple times
- **Logical consistency errors**: The number of features that are misaligned or overlapping illogically with other features

**Map layers**

- **Area of interest geometry**: A bounding perimeter around the report area
- **Recency layer**: A spatial gradient layer that displays recency of data
- **Completeness layer**: A spatial category layer that displays relative completeness
## Implementation Overview

Our approach will be two-fold, using a one-time job to generate the “relative completeness” metric and associated tile layer, alongside periodic jobs to generate the other metrics. The output of these jobs is spatial vector data stored in AWS S3, either in GeoJSON or Mapbox Vector Tile format.


![osma-health architecture](https://kamicut-monosnap.s3.amazonaws.com/1._bash_2018-03-28_17-34-09.png)


**One-time ML job**
Azavea is leading the task of building a relative completess metric for a given area of interest. Given WorldPop and the OSM QA tiles, a machine learning training process will generate a model that can fit population counts to OSM building coverage. It will then output geojson for each tile at zoom 12. These tiles will contain:


- Estimated population
- Actual OSM building coverage
- Expected building coverage
- A ratio of projected population to worldpop estimate

The last ratio is the measure of relative completeness. In perfectly mapped areas, it tends to 1, and in poor coverage areas it is less than 1. This 0 to 1 scale can be used for a heatmap layer.

**Periodic batch jobs**
For the other metrics, Development Seed is building an AWS Batch pipeline that takes in WorldPop and the OSM QA tiles and generates vector data. The AWS Batch pipeline is triggered weekly using a scheduled AWS Lambda function. At that time, a job will be scheduled for each country that covers the areas of interest. The underlying cluster for the jobs are spot instances that scale up to meet the demands of the batch then terminate at the end of all jobs in that batch.

The batch jobs will each trigger a series of [OSM Lint](https://github.com/osmlab/osmlint)  and aggregation tasks. The HOT organization has forked the osmlint repository to add additional tasks that suit `osma-health`'s purpose.

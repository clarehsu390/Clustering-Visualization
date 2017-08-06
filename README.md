## Clustering Visualization

### Background

### Functionality & MVP
- [ ] Display D3 visualization of k-means clustering algorithm in 2D and 3D diagrams
- [ ] Users can scroll through page to view different points in the algorithm
- [ ] Complete narrative/description of each point in the clustering algorithm
- [ ] Design a clean user interface including animations for the 2D and 3D diagrams

### Wireframes

![wireframes](wireframes/cluster.png)

### Technologies & Technical Challenges

This data visualization will be implemented using:
- Django as our backend framework
- PostgreSQL as our database
- D3 to create our 2D and 3D visualization
- CSS/HTML for styling the webpage

The primary technical challenges will be:
- Finding a suitable dataset for display (attributes must be as descriptive as possible)
- Learning to create animated diagrams using D3

The data visualization will be created on our own k-means clustering algorithm, in 2 dimensions and 3 dimensions. We will be displaying intermediate steps in the algorithm to show the process. Our final goal is to have our algorithm group all the data points into clusters based on similar attributes.

### Things We Accomplished Over the Weekend
1. Prepared the sample data set to learn how to use D3
- Followed online tutorials to help guide us through the process
2. Used D3 to visualized our sample data set in 2D
3. Learned basic Python and Django to prepare for the week's work
4. Setup our flex project repo on Github

### Implementation Timeline
To allow this project to be productive as well as a successful learning experience, we have to rotate roles during the week. All of us will help in the frontend design of the project as well as participate in writing the algorithm. This way, by the end of the week, we will all have an understanding and know how to use Python, Django, and D3.

**Day 1**: Get started on the infrastructure of the project and begin implementing our cluster algorithm
- Will have the dataset finalized which we will be representing for our project (Hui)
- Begin implementation of k-means clustering algorithm (Wen)
- Setup the PostgreSQL database/seed database and help with clustering algorithm (Clare)

**Day 2**: Work on Django backend and 2D clustering visualization
- Setting up the backbone of Django and writing necessary methods
- Begin using D3 to create 2D visualization
- Start working on the narrative/description of our webpage - outline
- Setup basic webpage design

**Day 3**: Continue working on 2D visualization and begin 3D visualization
- Finish 2D visualization if incomplete from day 2
- Begin 3D clustering display using D3
- Should be able to show the final result of the clustering algorithm in our visualizations
- Continue working narrative/description - hopefully finish that by the end of the day

**Day 4**: Dedicate to designing/finalizing the webpage
- The narrative will match up with different points of the clustering algorithm
- Continue 3D clustering visualization and include on webpage

**Day 5**: Final touchups/Production README
- Work on production README.md and push to Github
- Setup Github Pages to have live link
- Implement edits as needed for final webpage

### Bonus features:
- Compare and contrast time complexity with other clustering algorithms
- 

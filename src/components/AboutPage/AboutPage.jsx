import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (

        <center>
          <h2>Tech Stack</h2>
            <ul style="list-style-type:none;">
              <li>HTML</li>
              <li>CSS</li>
              <li>Bootstrap</li>
              <li>React</li>
              <li>Redux</li>
              <li>Redux-Saga</li>
              <li>Node.js</li>
              <li>Express</li>
              <li>PostgreSQL</li>
              <li>Spoonacular's API</li>
            </ul>
          <h2>Largest Challenge</h2>
          <ul style="list-style-type:none;">
            <li>Synchronizing the search results, the cart, and the favorites page</li>
          </ul>
          <h2>What's Next?</h2>
          <ul style="list-style-type:none;">
            <li>Add advanced search and user settings and nutritional informaiton</li>
          </ul>
          <h2>A Special Thanks To</h2>
          <ul style="list-style-type:none;">
            <li>Edan, Matt, and the staff of Prime Digital Academy</li>
            <li>My Cohort</li>
            <li>My girlfriend Cate</li>
          </ul>

        </center>

  );
}

export default AboutPage;

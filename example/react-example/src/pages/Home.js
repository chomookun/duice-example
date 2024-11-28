import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return ( 
    <main>
      <h1>React example</h1>
      <Link to="/master-detail">Master Detail Pattern</Link>
    </main>
  );
}

export default Home;


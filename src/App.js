import React, { useState, useEffect } from 'react'

const url = 'https://course-api.com/react-tours-project'

function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readInfo, setReadInfo] = useState(false);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };


  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } 
  };

  useEffect(() => {
    fetchTours();
  }, []);
  
  if (loading) {
    return (
      <main>
        <div className='loading'>
          <h1>Loading...</h1>
        </div>
      </main>
    )
  } else if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>No Tours</h2>
          <button className='btn' onClick={() => fetchTours()}>Refresh</button>
        </div>
      </main>
    )
  }
  return(
    <main>
      <section>
        <div className="title">
          <h2> Our trips</h2>
          <div className="underline"></div>
        </div>
        <div>
          {tours.map((tour) => {
            return (
              <article key={tour.id} className="single-tour">
                <img src={tour.image} alt={tour.name} />
                <footer>
                  <div className="tour-info">
                    <h4>{tour.name}</h4>
                    <h4 className="tour-price">${tour.price}</h4>
                  </div>
                  <p>
                    {readInfo ? tour.info : `${tour.info.substring(0, 200)}...`}
                    <button onClick={() => setReadInfo(!readInfo)}>
                      {readInfo ? 'Show Less' : 'Show More'}
                    </button>
                  </p>
                  <button className="delete-btn" onClick={() => removeTour(tour.id)}>Not Interested</button>
                </footer>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
} 

export default App;

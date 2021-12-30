import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
function Index() {
  const [count, setcount] = useState(0);
  const [post, setpost] = useState();
  const [data, setdata] = useState();
  const [options, setoptions] = useState();
  useEffect(() => {
    document.title = "Covid Statastics";
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((response) => {
        setpost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    //console.log(post);
  }, [post]);

  useEffect(() => {
    let country = [];
    let confirmCase = [];
    let deaths = [];
    let recover = [];
    for (let i = count; i < count + 5; i++) {
      post && country.push(post[i].country);
      post && confirmCase.push(post[i].cases);
      post && deaths.push(post[i].deaths);
      post && recover.push(post[i].recovered);
    }
    setdata({
      labels: country,
      datasets: [
        {
          label: "Confirm Cases",
          data: confirmCase,
          borderColor: ["rgb(165, 0, 0)"],
          backgroundColor: ["rgba(165, 0, 0 ,0.5)"],
        },
        {
          label: "Total Recovery",
          data: recover,
          borderColor: ["rgb(0, 82, 7)"],
          backgroundColor: ["rgba(0, 82, 7,0.5)"],
        },
        {
          label: "Total Deaths",
          data: deaths,
          borderColor: ["rgb(0, 0, 0)"],
          backgroundColor: ["rgb(0, 0, 0)"],
        },
      ],
    });
  }, [post, count]);
  useEffect(() => {
    //if (!post) return;
    //console.log("hi title");
    setoptions({
      plugins: {
        title: {
          display: true,
          text: "CovidStats",
        },

        scale: {
          min: 0,
        },
        maintainAspectRatio: false,
      },
    });
  }, [post]);

  const prevHandler = () => {
    if (count - 5 < 0) return;
    setcount((prevCount) => prevCount - 1);
  };

  const nextHandler = () => {
    if (count + 10 > post.length) return;
    setcount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <div className='container'>
        {post && <Bar data={data} height={130} options={options} />}
      </div>
      <br />
      {post ? (
        <div>
          <button
            onClick={() => {
              prevHandler();
            }}>
            prev
          </button>
          <button
            onClick={() => {
              nextHandler();
            }}>
            next
          </button>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default Index;

import React, { Component, useEffect } from 'react';
import './LandingPage.css';

const homeSlider = [
  { slideIndex: 1, slideName: 'test1' },
  { slideIndex: 2, slideName: 'test2' },
  { slideIndex: 3, slideName: 'test3' },
  { slideIndex: 4, slideName: 'test4' },
  { slideIndex: 5, slideName: 'test5' }
];

export default function LandingPage() {
  var slideIndex = 1;

  useEffect(() => {
    showSlides(slideIndex);

  }, [slideIndex])

  const plusSlides = (n) => {
    showSlides(slideIndex += n);
  }

  const currentSlide = (n) => {
    showSlides(slideIndex = n);
  }

  const showSlides = (n) => {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    if (slides && slides.length) {
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  }

  return (
    <section>

      <div className="slideshow-container">
        {
          (homeSlider && homeSlider.length > 0) ?
            homeSlider.map((item, index) => {
              return (<div className="mySlides fade" key={index}>
                <div className="numbertext">{item.slideIndex} / {homeSlider.length}</div>
                <img src={require('../../../assets/home-' + item.slideIndex + '.jpg').default} />
                <div className="text">{item.slideName}</div>
              </div>)
            })
            :
            null
        }

        <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
        <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>

      </div>
      <br />

      <div style={{ textAlign: 'center' }}>
        {
          (homeSlider && homeSlider.length > 0) ?
            homeSlider.map((item, index) => {
              return <span key={index} className="dot" onClick={() => currentSlide(item.slideIndex)}></span>
            })
            : null
        }
        {/* <span className="dot" onClick={() => currentSlide(2)}></span>
        <span className="dot" onClick={() => currentSlide(3)}></span> */}
      </div>
    </section>
  )
}

import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import { Autoplay } from 'swiper/modules'
import "./Home.css"
import gsap from 'gsap'

// IMPORTAÇÕES MANUAIS
import CenarioCharizard from "../../assets/img/Cenario/CenarioCharizard.png"
import CenarioBlastoise from '../../assets/img/Cenario/CenarioBlastoise.png'
import CenarioVenozauro from '../../assets/img/Cenario/CenarioVenozauro.png'

import CharizardImg from '../../assets/img/Pokemons/Charizard.png'
import BlastoiseImg from '../../assets/img/Pokemons/Blastoise.png'
import VenozauroImg from '../../assets/img/Pokemons/Venozauro.png'
import Header from '../../components/Header'

function Home() {
  const mockupRef = useRef(null)
  const homeRef = useRef(null)

  const slides = [
    {
      bg: CenarioCharizard,
      img: CharizardImg,
    },
    {
      bg: CenarioBlastoise,
      img: BlastoiseImg,
    },
    {
      bg: CenarioVenozauro,
      img: VenozauroImg,
    }
  ]

  useEffect(() => {
    gsap.from('.home-title', {
      opacity: 0,
      y: -5,
      duration: 1,
      ease: 'power2.out',
    })
  }, [])

  return (
    <>
      <Header/>

       <main>
        <section className="home" id="home" ref={homeRef}>
          <Swiper
            className="first-swiper"
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            speed={1000}
            loop={false}
          >
            {slides.map((slide, idx) => (
              <SwiperSlide
                key={idx}
                className={`swiper-slide home-slide slide${idx + 1}`}
                style={{
                  backgroundImage: `url(${slide.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <h1 className="home-title">{slide.name}</h1>
                <img
                  src={slide.img}
                  alt={slide.name}
                  className="pokemon-img"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="home-mockup" id="home-mockup" ref={mockupRef}></div>
          <Link to="/Cadastro" className="home-button">Jogar</Link>
        </section>
       </main>
    </>
  )
}

export default Home

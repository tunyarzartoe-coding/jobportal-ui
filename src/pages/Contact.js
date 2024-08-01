import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "../components/css/Contact.css"
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const Contact = () => {
  return (
    <>
    <Navbar/>
<Box class="container py-2" id="contact">


<div class="container py-5 bg-dark contact-header mb-2  ">
        <div class="container my-5 pt-5 pb-4">
          <h1 class="display-3 text-white mb-3 ">
            Contact Page
          </h1>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb text-uppercase">
              <li class="breadcrumb-item text-white">
                <Link href="#">Home</Link>
              </li>
              <li class="breadcrumb-item text-white">
                <Link href="#">Pages</Link>
              </li>
              <li class="breadcrumb-item  active" aria-current="page">
                Contact Us
              </li>
            </ol>
          </nav>
        </div>
      </div>

            <div class="container py-5 px-lg-5">
                <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h1 class="mb-5">Get In Touch!</h1>
                </div>
                <div class="row justify-content-center">
                    <div class="col-lg-9">
                        <div class="wow fadeInUp" data-wow-delay="0.3s">
                            <p class="text-center mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done.</p>
                            <form>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="name" placeholder="Your Name"/>
                                            <label for="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="email" class="form-control" id="email" placeholder="Your Email"/>
                                            <label for="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="subject" placeholder="Subject"/>
                                            <label for="subject">Subject</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <textarea class="form-control" placeholder="Leave a message here" id="message" style={{height: "150px"}}></textarea>
                                            <label for="message">Message</label>
                                        </div>
                                    </div>
                                    <div class="col-12 text-center">
                                        <button class="btn btn-primary rounded-pill py-3 px-5" type="submit">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
        <Footer/>
    </>

  )
}

export default Contact
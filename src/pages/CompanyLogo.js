import { Container } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import brand1 from '../images/brand-01.png'
import brand2 from '../images/brand-02.png'
import brand3 from '../images/brand-03.png'
import brand4 from '../images/brand-04.png'
import brand5 from '../images/brand-05.png'
import brand6 from '../images/brand-06.png'
import brand7 from '../images/brand-07.png'
import brand8 from '../images/brand-08.png'
import Aos from "aos";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";


const CompanyLogo = () => {
  const { palette } = useTheme();


  useEffect(()=>{
    Aos.init({duration: 500});
  },[])

  return (
    <Container class1="marque-wrapper home-wrapper-2 mb-4" data-aos="fade-up" style={{backgroundColor:palette.background.default,marginBottom:"20px"}} >
      <Box >
        <div className="row" >
          <div className="col-12 h-25">
            <div className="marquee-inner-wrapper card-wrapper ">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src={brand1} alt="logo" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand2} alt="logo" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand3} alt="logo" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand4} alt="logo" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand5} alt="logo" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand6} alt="logo" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand7} alt="logo" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand8} alt="logo" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
        </Box>
      </Container>
  )
}

export default CompanyLogo
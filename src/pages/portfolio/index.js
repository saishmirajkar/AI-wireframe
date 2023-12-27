import React, { useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";

export const Portfolio = () => {
  const API_TOKEN = "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";

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
     
    const input = "generate a full screen  figma wireframe in black and white, focusing on innovative wireframe and functionality. Pay special attention to the following elements: 1. Header: Design an attention-grabbing header with a dynamic title, seamlessly integrated navigation menu, and a visually search bar. 2. Hero Section: Create a captivating hero section using typographic elements and a bold and inviting headline to make it visually appealing without images. 3. Main Content Area: Organize posts in a visually dynamic grid or layout, incorporating creative typography and concise, enticing post summaries. 4. Sidebar: Integrate a sleek and dynamic sidebar with interactive widgets for categories, trending posts, and social media links to enhance user engagement. 5.Information: Elevate the details using stylized text and layout at the end of each post. 6. Typography: Optimize typography choices for a contemporary feel, ensuring an elegant and readable presentation in black and white. 7. Interactive Elements: Include innovative and user-friendly interactive elements, such as scroll-triggered or personalized recommendations, to enhance the user experience. 8. Footer: Design a visually appealing footer with strategically placed links to important pages, copyright information, and seamlessly integrated social media icons, for 1:1 aspect ratio  screen, generate a full screen  figma wireframe for " + event.target.elements.input.value;
    console.log (input);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Generate </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="container al-c mt-3">
          <h1> Blowing <span>Mind Section</span></h1>
          
          <p>Hey strawhats, enhance your AI creativity by adding your prompt </p>
          <form className="gen-form" onSubmit={handleSubmit}>
            <input className= "form__field" type="text" name="input" placeholder="Type your prompt here..." />
            <br></br>
            
           <button className= "ac_btn" type="submit">Generate</button>
            <hr className="t_border my-4 ml-0 text-left" />
            <br></br>
          </form>
          <div>
            {loading && <div className="loading">Loading...</div>}
            {!loading && output && (
              <div className="result-image">
                <img src={output} alt="art" />
              </div>
            )}
          </div>
        </div>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
            
          </Col>
        </Row>
        <div className="mb-5 po_items_ho">
          {dataportfolio.map((data, i) => {
            return (
              <div key={i} className="po_item">
                <img src={data.img} alt="" />
                <div className="content">
                  <p>{data.description}</p>
                  
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </HelmetProvider>
  );
};

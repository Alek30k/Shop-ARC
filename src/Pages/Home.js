import React, { useEffect, useState } from "react";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { BiSearch } from "react-icons/bi";
import SearchFilter from "react-filter-search";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [theme] = useThemeHook();
  const [searchInput, setSearchInput] = useState("");
  const [productData, setProductData] = useState([]);

  async function getResponse() {
    const res = await fetch("https://fakestoreapi.com/products").then((res) =>
      res.json()
    );
    setProductData(await res);
  }

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center">
          <InputGroup className="mb-3 my-5">
            <InputGroup.Text
              className={
                theme
                  ? "bg-black text-dark-primary"
                  : "bg-light text-light-primary"
              }
            >
              <BiSearch />
            </InputGroup.Text>
            <FormControl
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={
                theme ? "bg-light-black text-light" : "bg-light text-black"
              }
            />
          </InputGroup>
        </Col>
        <SearchFilter
          value={searchInput}
          data={productData}
          renderResults={(results) => (
            <Row className="justify-content-center">
              {results.map((item, i) => (
                <ProductCard data={item} key={i} />
              ))}
            </Row>
          )}
        />
      </Row>
    </Container>
  );
};

export default Home;

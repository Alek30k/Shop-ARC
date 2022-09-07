import React from "react";
import { Button, Card } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { useCart } from "react-use-cart";
import { BsCartPlus } from "react-icons/bs";
import Swal from "sweetalert2";

const ProductCard = (props) => {
  let { image, price, title } = props.data;
  const [theme] = useThemeHook();
  const { addItem } = useCart();

  const addToCart = () => {
    addItem(props.data);

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "The product was added to the cart!",
    });
  };
  return (
    <Card
      style={{ width: "18rem", height: "auto" }}
      className={`${
        theme ? "bg-light-black text-light" : "bg-lihgt text-black"
      } text-center p-0 overflow-hidden shadow mx-auto mb-4`}
    >
      <div
        style={{
          background: "white",
          height: "15rem",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "inherit",
        }}
      >
        <div style={{ width: "9rem" }}>
          <Card.Img
            variant="top"
            src={image}
            className="img-fluid bg-image hover-zoom"
          />
        </div>
      </div>

      <Card.Body>
        <Card.Title
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Card.Title>
        <Card.Title>
          $ <span className="h4">{price}</span>
        </Card.Title>
        <Button
          onClick={() => addToCart()}
          className={`${
            theme ? "bg-dark-primary text-black" : "bg-light-primary"
          } d-flex align-item-center m-auto border-0`}
        >
          <BsCartPlus size="1.8rem" />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

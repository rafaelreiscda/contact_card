import react, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal({ show, onClose = () => {}, id = "overlay" }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleOutsideClick = (e) => {
    if (e.target.id === id) {
      e.stopPropagation();
      onClose();
    }
  };

  function handleCloseModal(e) {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  }

  const modalContent = show ? (
    <div id={id} className="overlay" onClick={handleOutsideClick}>
      <div className="modal">
        <div className="closebutton">
          <a href="#" onClick={handleCloseModal}>
            <FontAwesomeIcon
              icon={("fab", "xmark")}
              size="2x"
              style={{ width: 25, height: 25 }}
            />
          </a>
        </div>

        <div className="headerr">
          <p>Entre em contato conosco!</p>
        </div>
        <div className="body">
          <Image
            src="/images/qr-code.png"
            alt="qr-code-contato"
            width={250}
            height={250}
          />
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDom.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

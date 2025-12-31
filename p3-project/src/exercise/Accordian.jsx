import { useState } from "react";
import "./Accordian.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
   {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  }

];

function Accordian() {

    const [currentOpen, setCurrentOpen] = useState(null);

  return (
    <div className="accordion">
      {faqs.map((faq, inx) => (
        <AccordianItem currentOpen={currentOpen} onOpen={setCurrentOpen} faq={faq} key={inx + 1} id={inx + 1} > 
        {faq.text}

        </AccordianItem>
      ))}
    </div>
  );
}

export default Accordian;

function AccordianItem({ faq, id ,currentOpen,onOpen,children}) {


  const isOpen = currentOpen === id;

  // const toggleOpen = () => {
  //   setIsOpen((open) => !open);
  // };

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={()=> onOpen(id === currentOpen ? null : id)}>
      <p className="number">{id <= 9 ? `0${id}` : id}</p>
      <p className="title">{faq.title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

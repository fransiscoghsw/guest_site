import React, { useState } from "react";
import FaqItem from "./FaqItem";

const FaqList = (props) => {
  const { faqs } = props;

  const [openQuestionId, setOpenQuestionId] = useState(1);

  const handleToggle = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <div
      className="accordion-group p-5 sm:p-4 md:p-5 lg:p-0"
      data-accordion="default-accordion"
    >
      {faqs.map((faq) => (
        <FaqItem
          key={faq.id}
          {...faq}
          isOpen={openQuestionId === faq.id}
          onToggle={() => handleToggle(faq.id)}
        />
      ))}
    </div>
  );
};

export default FaqList;

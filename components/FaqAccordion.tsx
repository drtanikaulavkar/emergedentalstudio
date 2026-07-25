import {ChevronDown} from "lucide-react";
import {cn} from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
  defaultOpenFirst?: boolean;
};

export function FaqAccordion({items, className, defaultOpenFirst = false}: FaqAccordionProps) {
  return (
    <div className={cn("faq-list faq-accordion", className)}>
      {items.map((item, index) => (
        <details className="faq-item" key={item.question} open={defaultOpenFirst && index === 0}>
          <summary>
            <span className="faq-question-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="faq-question">{item.question}</span>
            <ChevronDown className="faq-chevron" aria-hidden="true" />
          </summary>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

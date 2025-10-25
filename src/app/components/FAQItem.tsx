import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="py-4">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center text-left focus:outline-none hover:text-primary transition-all duration-300"
            >
                <span className="font-medium text-lg">{question}</span>
                <ChevronUp className={`w-5 h-5 transation-all duration-300 ${open ? "text-primary" : "rotate-180"}`} />
            </button>
            <div
                className={`mt-2 text-foreground/60 text-sm transition-all duration-300 overflow-hidden ${
                    open ? 'max-h-96' : 'max-h-0'
                }`}
            >
                <p>{answer}</p>
            </div>
        </div>
    );
}

export default FAQItem;

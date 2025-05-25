import { useState, useEffect, useRef } from "react";

import "./App.css";

function ControlButton({
  isSpeaking,
  onToggleClick,
}: {
  isSpeaking: boolean;
  onToggleClick: () => void;
}) {
  if (isSpeaking) {
    return <button onClick={onToggleClick}>Stop</button>;
  }

  return <button onClick={onToggleClick}>Start</button>;
}

function App() {
  const articleRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [textList, setTextList] = useState<string[]>([]);

  function toggleSpeaking() {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      for (let paragraph of textList) {
        const utterThis = new SpeechSynthesisUtterance(paragraph);
        window.speechSynthesis.speak(utterThis);
      }
      setIsSpeaking(true);
    }
  }

  useEffect(() => {
    if (!articleRef.current) return;

    const treeWalker = document.createTreeWalker(
      articleRef.current,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parentNode = node.parentNode;
          if (
            parentNode instanceof HTMLElement &&
            parentNode.style.display === "none"
          ) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const texts: string[] = [];
    while (treeWalker.nextNode()) {
      if (treeWalker.currentNode.textContent) {
        texts.push(treeWalker.currentNode.textContent);
      }
    }
    setTextList(texts);
  }, []);

  return (
    <>
      <article ref={articleRef}>
        <p>
          An excavator destroys several buildings on land in Pondok Betung
          Village, South Tangerang City, Banten, Saturday (5/24/2025) afternoon.
          For almost three years, the GRIB Jaya mass organization has been
          suspected of renting the land illegally. In fact, the land belongs to
          the Meteorology, Climatology and Geophysics Agency.
        </p>
        <p>
          In addition to excavators, a total of 426 personnel were also deployed
          to demolish permanent and semi-permanent structures standing on the
          land covering an area of 127,780 square meters. This action is an
          effort to dismantle the arbitrary control of thugs who have freely
          occupied state-owned land.
        </p>
        <p>
          "The state must not be defeated by thugs," said the Head of Public
          Relations of the Metro Jaya Police, Commissioner Ade Ary Syam Indradi,
          while witnessing the demolition process of the building firsthand,
          Saturday (24/5) afternoon.
        </p>
        <p>
          Starting from catfish pecel businesses, the sale of sacrificial
          animals, and sometimes being turned into a night market. "They (mass
          organizations) also rent out parking spaces by providing parking
          tickets," he said.
        </p>
        <p>
          From this activity, the members of GRIB Jaya collect monthly fees. For
          example, in the catfish pecel business, they charge up to Rp 3.5
          million per month. Meanwhile, for the sale of sacrificial animals, a
          fee of up to Rp 22 million per month is imposed. This does not include
          costs for night markets and parking.
        </p>
        <p>
          The money was transferred to Y, the Chairman of the GRIB Jaya
          Organization in South Tangerang. The transfer evidence will also serve
          as evidence. In addition to the transaction, officers also confiscated
          several items such as parking ticket records, organization flags, and
          even sharp weapons. "We found several bamboo sticks with nails at the
          ends," revealed Ade.
        </p>
        <p style={{ display: "none" }}>Hide me!</p>
      </article>
      <section>
        <ControlButton isSpeaking={isSpeaking} onToggleClick={toggleSpeaking} />
      </section>
    </>
  );
}

export default App;

import React from "react";
import Sidebar from "./components/Sidebar";
import PreviewArea from "./components/PreviewArea";
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import { useState, createContext } from "react";
import  Context  from "./components/Context";
import { Midsection } from "./components/Midsection";

export default function App() {
  const sprite = {name: "cat", sequence:[],url: "https://www.seekpng.com/png/full/19-191322_scratch-cat-the-game-pose-as-you-know.png"}
  const [keyVal, setKeyVal] = useState({index:-1, block:-1})
  const [flow, setFlow] = useState([sprite])


  return (
    <DndProvider backend={HTML5Backend}>
      <Context.Provider value={[keyVal, setKeyVal]}>
        <div className="bg-blue-100 pt-6 font-sans">
          <div className="h-screen overflow-hidden flex flex-row  antialiased ">
            <div className="flex h-screen w-3/5 overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
              <Sidebar />

              <Midsection flow={flow} setFlow={setFlow} />
              {/* <Description/> */}
            </div>
            <div className="w-2/5 overflow-x-auto overflow-y-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
              <PreviewArea flow={flow} />
            </div>
          </div>
        </div>
      </Context.Provider>
    </DndProvider>
  );
}

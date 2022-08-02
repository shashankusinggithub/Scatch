import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import { useState, createContext } from "react";
import  Context  from "./components/Context";
import Description from "./components/Description";




export default function App() {
  const [keyVal, setKeyVal] = useState(-1)
  const [flow, setFlow] = useState([])

  return (
    <DndProvider backend={HTML5Backend}>
      <Context.Provider value={[keyVal, setKeyVal]}>
        <div className="bg-blue-100 pt-6 font-sans" >
          <div className="h-screen overflow-hidden flex flex-row  antialiased ">
            <div className="flex h-screen w-3/5 overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
              <Sidebar />
              <MidArea flow={flow} setFlow={setFlow} />
              <Description />
            </div>
            <div className="w-2/5 overflow-x-auto flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
              <PreviewArea flow={flow} />
            </div>
          </div>
        </div>
      </Context.Provider>
    </DndProvider>
  );
}

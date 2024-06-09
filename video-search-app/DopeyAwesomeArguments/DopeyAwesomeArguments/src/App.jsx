import "./App.css";
import React from "react";
import sceneData from "./sceneData.json";
import montageData from "./montageData.json";

const TimelineItem = ({ item }) => {
  const itemWidth = (item.end - item.start) * 100; // Calculate width based on duration
  const itemLeft = item.start * 100; // Calculate left position based on start time

  return (
    <div
      className={`${item.type === "thumbnails" ? "h-40" : "h-15"} bg-gray-700 rounded flex items-center justify-center`}
      style={{ width: `${itemWidth}px`, left: `${itemLeft}px`, position: "relative" }}
    >
      {item.type === "thumbnails" ? (
        <div className="bg-gray-100 flex justify-center items-center">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {item.thumbnails.map((thumbnail, index) => (
                <div key={index} className="bg-white shadow-md m-2">
                  <img 
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-auto" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2 text-white">{item.label}</div>
      )}
    </div>
  );
};

const TimelineSection = ({sceneData}) => (
  <div className="mb-8">
    <div className="h-8 bg-gray-800">
      <div className="h-full w-full flex justify-between text-gray-400">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1/5 text-center">
            {i}
          </div>
        ))}
      </div>
    </div>
    <div className="flex overflow-x-auto relative">
      {Object.keys(sceneData).map((sceneKey) => {
        const sceneThumbnails = sceneData[sceneKey].map(item => item.thumbnail_url);

        return (
          <div key={sceneKey} className="flex-shrink-0">
            <TimelineItem
              item={{
                id: "scene1",
                type: "scene",
                label: sceneKey,
                start: 0,
                end: 4,
              }}
            />
            <TimelineItem
              item={{
                id: "bucket1",
                type: "bucket",
                label: `Bucket items: ${sceneData[sceneKey].length}`,
                start: 0,
                end: 4,
              }}
            />
            <TimelineItem
              item={{
                id: "thumbnail1",
                type: "thumbnails",
                label: `Thumbnails for ${sceneKey}`,
                thumbnails: sceneThumbnails,
                start: 0,
                end: 4,
              }}
            />
          </div>
        );
      })}
    </div>
  </div>
);

const TimelineEditor = ({sceneData}) => {
  return (
    <div className="container mx-auto my-8 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <TimelineSection sceneData={sceneData} />
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-3xl">Video Timeline Editor</h1>
      </header>
      <main className="p-4">
        <div>Output</div>
        <TimelineEditor sceneData={sceneData} />
        <div>MONTAGE</div>
        <TimelineEditor sceneData={montageData} />
      </main>
    </div>
  );
}

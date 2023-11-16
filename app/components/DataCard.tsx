import React from "react";
import Modal from "./Modal";

interface DataProps {
  id: number;
  name: string;
  nip: string;
  division: string;
  status: string;
}

const DataCard: React.FC<{ data: DataProps[] }> = ({ data }) => {
  const getColor = (status: string) => {
    if (status === "alpha") {
      return "#F97444";
    } else if (status === "waiting") {
      return "#0C2240";
    } else {
      return "#007C00";
    }
  };

  const updateColor = (status: string) => {
    return getColor(status);
  };

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-5">
      {Array.isArray(data) &&
        data.map((item) => (
          <div
            className="card bg-white card-compact border h-36 w-full shadow-sm flex gap-4 flex-row "
            key={item.id}
          >
            <div className="p-5 w-full">
              <div className="flex justify-between">
                <p className="card-title text-gray-400 text-[14px] ">
                  {item.name}
                </p>
                <div className="card-actions">
                  <Modal item={item} />
                </div>
              </div>
              <p className="text-black font-[500] grow-0 pb-2 text-[14px] ">
                {item.nip}
              </p>
              <div className="flex justify-between">
                <p
                  className="grow-0 "
                  style={{
                    color: updateColor(item.status),
                  }}
                >
                  Divisi {item.division}
                </p>
                <p className="grow-0 text-[12px]  text-gray-300">
                  {item.status}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DataCard;

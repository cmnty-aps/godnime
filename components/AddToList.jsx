"use client";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useWatchContext } from "@/context/Watch";

const AddToList = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { animeid, episode } = useWatchContext();

  const categories = [
    { title: "Watching", id: "CURRENT" },
    { title: "To Watch", id: "PLANNING" },
    { title: "Watched", id: "COMPLETED" },
    { title: "On Hold", id: "PAUSED" },
    { title: "Dropped", id: "DROPPED" },
  ];

  const handleSubmit = (status) => {
    try {
      if (!animeid) {
        toast.info("Select an episode to track progress");
        return;
      }

      const rawLists = localStorage.getItem("cmnty_anime_user_list");
      const listData = rawLists ? JSON.parse(rawLists) : {};

      listData[animeid] = {
        mediaId: animeid,
        status: status || "CURRENT",
        progress: episode || 1,
        updatedAt: Date.now(),
      };

      localStorage.setItem("cmnty_anime_user_list", JSON.stringify(listData));
      const cat = categories.find((c) => c.id === status);
      toast.success(`Anime saved to ${cat?.title || "your list"}`);
      setIsOpened(false);
    } catch (error) {
      toast.error("Failed to save to list");
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-1 cursor-pointer hover:text-[#e26bbd] transition focus:outline-none"
        onClick={() => setIsOpened((prev) => !prev)}
      >
        <span className="text-xl">
          <GoPlus />
        </span>
        Add to List
      </button>

      {isOpened && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bg-[#282638] border border-[#5c5778] w-36 text-center left-0 top-8 py-1 rounded-lg overflow-hidden shadow-xl z-50"
        >
          {categories.map((item) => (
            <div
              key={item.id}
              className="px-3 py-1.5 text-sm cursor-pointer hover:bg-[#3d3856] text-white transition text-left"
              onClick={() => handleSubmit(item?.id)}
            >
              {item.title}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AddToList;

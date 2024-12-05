import React, { useState } from "react";

const MessMenu = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  // Mess menu data
  const menu = {
    Monday: {
      Breakfast: "Tea , Aloo , Puri",
      Lunch: "Arhar Daal, Chapati , Vegetable , Rice ",
      Snacks: "Samosa, Tea",
      Dinner: "Aloo tamatar,Raita,Roti,Rice",
    },
    Tuesday: {
      Breakfast: "Sandwich , Tea",
      Lunch: "Rajma,Roti,Rice,vegetable",
      Snacks: "Parmal chane , Tea",
      Dinner: "Malka daal,vegetable,Roti,Rice",
    },
    Wednesday: {
      Breakfast: "Methi Paratha,Achaar,Tea",
      Lunch: "Mix daal,vegetable,Rice, Roti",
      Snacks: "Chawmeine, Tea",
      Dinner: "Chane,vegetable,Roti,Rice",
    },
    Thursday: {
      Breakfast: "Ajwain Puri,Achaar,Tea",
      Lunch: "Curry,Methi aloo,Rice,Roti",
      Snacks: "Tikki or Burger,Tea",
      Dinner: "Urad+Chana daal,vegetable,Roti,Rice",
    },
    Friday: {
      Breakfast: "Paratha,Aloo,Tea",
      Lunch: "Arhar daal,vegetable,Roti,Rice",
      Snacks: "Microni,Tea",
      Dinner: "Chana daal,Roti,vegetable,Rice",
    },
    Saturday: {
      Breakfast: "Jam Bread,Tea",
      Lunch: "Urad Rajma,vegetable,Roti,Rice",
      Snacks: "Jave or cutlets, Tea",
      Dinner: "Tamatar Aloo or Soyabean,Roti,Rice,Gulab Jamun",
    },
    Sunday: {
      Breakfast: "Chhole Bhature,Tea",
      Lunch: "Tehri,Chutney",
      Snacks: "Poha, Tea",
      Dinner: "Paneer/Rajma/Copte,Roti,Rice",
    },
  };

  // Generate the meal sections
  const renderMeals = () => {
    const meals = menu[selectedDay];
    return Object.entries(meals).map(([mealType, items]) => (
      <div key={mealType} className="p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-indigo-600">{mealType}</h3>
        <p className="text-gray-700">{items}</p>
      </div>
    ));
  };

  return (
    <div className="p-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Mess Menu</h1>

      {/* Day Selector */}
      <div className="flex justify-center mb-8 space-x-4">
        {Object.keys(menu).map((day) => (
          <button
            key={day}
            className={`px-4 py-2 font-semibold rounded-lg transition-colors ${
              selectedDay === day
                ? "bg-white text-indigo-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Menu Display */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg text-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">
          {selectedDay}'s Menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{renderMeals()}</div>
      </div>
    </div>
  );
};

export default MessMenu;

import React, { useState } from "react";

const MessMenu = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");

  // Mess menu data
  const menu = {
    Monday: {
      Breakfast: "Tea , Aloo , Paratha",
      Lunch: "Daal, Chapati , Vegetable , Rice ",
      Snacks: "Samosa, Tea",
      Dinner: "Butter Naan, Paneer Butter Masala, Gulab Jamun",
    },
    Tuesday: {
      Breakfast: "Idli, Sambar, Coconut Chutney",
      Lunch: "Jeera Rice, Rajma, Veg Pulao, Raita",
      Snacks: "Veg Sandwich, Coffee",
      Dinner: "Chapati, Chicken Curry, Kheer",
    },
    Wednesday: {
      Breakfast: "Poha, Boiled Eggs, Lassi",
      Lunch: "Fried Rice, Manchurian, Salad",
      Snacks: "Pakora, Tea",
      Dinner: "Paratha, Dal Makhani, Halwa",
    },
    Thursday: {
      Breakfast: "Aloo Paratha, Yogurt, Pickle",
      Lunch: "Plain Rice, Chole, Mix Veg Curry",
      Snacks: "Muffins, Juice",
      Dinner: "Pulao, Chicken Tikka, Custard",
    },
    Friday: {
      Breakfast: "Dosa, Sambar, Chutney",
      Lunch: "Veg Biryani, Raita, Salad",
      Snacks: "Fries, Cold Coffee",
      Dinner: "Roti, Palak Paneer, Ice Cream",
    },
    Saturday: {
      Breakfast: "Upma, Tea, Fruits",
      Lunch: "Khichdi, Aloo Fry, Pickle",
      Snacks: "Veg Puffs, Tea",
      Dinner: "Fried Rice, Chili Paneer, Rasgulla",
    },
    Sunday: {
      Breakfast: "Poori, Bhaji, Coffee",
      Lunch: "Chicken Biryani, Raita, Salad",
      Snacks: "Cutlets, Lemonade",
      Dinner: "Chapati, Veg Korma, Brownie",
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

# 🍽️ Foodiary App

The **Foodiary App** is the mobile frontend for the [Foodiary API](https://github.com/VitinhoSouza/foodiary-api).  
It allows users to track their diet and nutrition through photos or audio of their meals.  
The app connects to the backend, which uses **Artificial Intelligence** to analyze meals and calculate macronutrients (calories, proteins, carbohydrates, and fats).

---
## 📱 Demo

https://github.com/user-attachments/assets/063c93ba-069e-4eac-9a56-7c570fc12078



---

## 🛠 Technologies Used

- **React Native (Expo)** — Cross-platform mobile development (iOS, Android, Web)  
- **Expo Router** — File-based routing for React Native apps  
- **NativeWind (TailwindCSS)** — Styling with utility-first classes  
- **React Query (@tanstack/react-query)** — Data fetching and caching  
- **Axios** — API requests to the Foodiary backend  
- **React Hook Form + Zod** — Form management and validation  
- **AsyncStorage** — Persistent storage for user tokens and settings  
- **Expo Camera & Audio** — Capture of meal photos and audio input  
- **Lucide React Native** — Icon set  

---

## ✨ Features

- **Authentication & Access Control**  
  - User registration and login  
  - Token-based authentication (persisted with AsyncStorage)  
  - Manage user profile data:  
    - Weight  
    - Height  
    - Physical activity level  
    - Nutritional goals  

- **Meal Management**  
  - Upload meal **photos** for automatic macronutrient calculation (**calories, carbs, proteins, fats**)  
  - Record **audio descriptions** of meals, transcribed into text and analyzed via AI  
  - Add meals manually with text descriptions  

- **Meal Tracking**  
  - List all registered meals  
  - View detailed macronutrient breakdown for each meal  

---

## ⚙️ How to Clone and Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/VitinhoSouza/foodiary-app.git
cd foodiary-app
```

2. **Install the dependencies**

```
npm install
```

3. **Start the Expo development server**

```
npm run start
```

4. **Open the app in your preferred environment**:

```
Android → npm run android

iOS → npm run ios

Web → npm run web
```
Obs: You can also use the **expo go** app.

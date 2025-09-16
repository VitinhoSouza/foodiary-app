import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { Button } from "../../../components/Button";
import { Logo } from "../../../components/Logo";
import { httpClient } from "../../../services/httpClient";
import { useQuery } from "@tanstack/react-query";
import { formatMealDate } from "../../../utils/formatMealDate";

type Meal = {
  id: string;
  createdAt: string;
  icon: string;
  name: string;
  status: "uploading" | "processing" | "success" | "failed";
  foods: {
    name: string;
    quantity: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  }[];
};

export default function MealDetails() {
  const { mealId } = useLocalSearchParams();

  const { data: meal, isFetching } = useQuery({
    queryKey: ["meal", mealId],
    staleTime: Infinity,
    queryFn: async () => {
      const { data } = await httpClient.get<{ meal: Meal }>(`/meals/${mealId}`);

      return data.meal;
    },
    refetchInterval: (query) => {
      if (query.state.data?.status === "success") {
        return false;
      }

      return 2_000;
    },
  });

  if (isFetching || meal?.status !== "success") {
    return (
      <View className="bg-lime-700 flex-1 items-center justify-center gap-12">
        <Logo width={187} height={60} />
        <ActivityIndicator color="#fff" />
      </View>
    );
  }
  const totals = meal.foods.reduce(
    (acc, food) => {
      acc.calories += food.calories;
      acc.proteins += food.proteins;
      acc.carbohydrates += food.carbohydrates;
      acc.fats += food.fats;
      return acc;
    },
    { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 }
  );

  return (
    <View className="flex-1 items-center justify-center">
      <Button onPress={router.back}>Voltar</Button>
      <ScrollView className="flex-1 px-6 py-8 bg-white">
        {/* Cabeçalho */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-gray-600 text-base font-sans-regular">
            {formatMealDate(new Date(meal.createdAt))}
          </Text>
          <Button onPress={router.back}>Voltar</Button>
        </View>

        {/* Card principal */}
        <View className="px-5 py-6 border border-gray-300 rounded-2xl gap-4 mb-6">
          <View className="flex-row items-center gap-4">
            <View className="size-14 bg-gray-200 rounded-full items-center justify-center">
              <Text className="text-lg">{meal.icon}</Text>
            </View>

            <View className="flex-1">
              <Text className="text-xl font-sans-medium text-gray-800">
                {meal.name}
              </Text>
              <Text className="text-sm text-gray-600">
                {meal.foods.length} alimentos
              </Text>
            </View>
          </View>

          {/* Resumo nutricional */}
          <View className="flex-row flex-wrap gap-x-4 gap-y-1 mt-2">
            <Text className="text-sm text-gray-700">
              🔥 {totals.calories} kcal
            </Text>
            <Text className="text-sm text-gray-700">
              🥩 {totals.proteins}g proteínas
            </Text>
            <Text className="text-sm text-gray-700">
              🍞 {totals.carbohydrates}g carbos
            </Text>
            <Text className="text-sm text-gray-700">
              🥑 {totals.fats}g gorduras
            </Text>
          </View>
        </View>

        {/* Lista de comidas */}
        <View className="gap-4">
          {meal.foods.map((food, index) => (
            <View
              key={`${food.name}-${index}`}
              className="p-4 border border-gray-200 rounded-xl bg-gray-50"
            >
              <Text className="text-base font-sans-medium text-gray-800 mb-1">
                {food.name}{" "}
                <Text className="text-sm text-gray-600">({food.quantity})</Text>
              </Text>

              <View className="flex-row flex-wrap gap-x-4 gap-y-1">
                <Text className="text-sm text-gray-700">
                  {food.calories} kcal
                </Text>
                <Text className="text-sm text-gray-700">
                  {food.proteins}g proteínas
                </Text>
                <Text className="text-sm text-gray-700">
                  {food.carbohydrates}g carbos
                </Text>
                <Text className="text-sm text-gray-700">
                  {food.fats}g gorduras
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

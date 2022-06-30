/* eslint-disable react/jsx-no-bind */
import { Accordion, Card, Group, Image, SimpleGrid, Text } from "@mantine/core";
import type { Item } from "../types/recipes";
import { HF_AVATAR_IMAGE_URL } from "../constants";

export const IngredientCard = ({ recipe }: { recipe: Item }) => {
  const yields = recipe?.yields?.map((y) => y.ingredients).flat();

  return (
    <Card p="lg" shadow="sm">
      <Accordion offsetIcon={false}>
        <Accordion.Item
          label={
            <Text size="lg" weight="bold">
              Ingredients
            </Text>
          }
        >
          <SimpleGrid
            breakpoints={[
              { minWidth: "sm", cols: 1 },
              { minWidth: "lg", cols: 2 },
            ]}
          >
            {recipe?.ingredients.map((ingredient) => {
              const ingredientYield = yields.filter(
                (y) => y.id === ingredient.id
              );
              return (
                <Group key={ingredient.id}>
                  <Image
                    alt={ingredient.description}
                    height={60}
                    src={`${HF_AVATAR_IMAGE_URL}/${ingredient.imagePath}`}
                    width={60}
                  />
                  <Group spacing={0} direction="column">
                    <Text>
                      {ingredientYield[0].amount} {ingredientYield[0].unit}
                    </Text>
                    <Text>{ingredient.name}</Text>
                  </Group>
                </Group>
              );
            })}
          </SimpleGrid>
        </Accordion.Item>
      </Accordion>
    </Card>
  );
};

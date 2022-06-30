import { Grid, Title } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPopularRecipes } from "~/api/getPopularRecipes";
import { RecipeCard } from "~/components/RecipeCard";
import type { RecipeQuery } from "~/types/recipes";

export const loader: LoaderFunction = async () => {
  return json(await getPopularRecipes());
};

export default function Index() {
  const popularRecipes = useLoaderData<RecipeQuery>();

  return (
    <>
      <Title mb={10} align="center" order={1}>
        Popular Recipes
      </Title>

      <Grid columns={4} justify="center">
        {popularRecipes.items.length > 0 &&
          popularRecipes?.items.map((recipe) => {
            return (
              <Grid.Col key={recipe.id} md={1} sm={2}>
                <RecipeCard recipe={recipe} />
              </Grid.Col>
            );
          })}
      </Grid>
    </>
  );
}
